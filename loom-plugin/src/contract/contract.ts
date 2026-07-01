/* LOOM contract: recursive-trust social graph on Canopy.
 * Extends the base `send` with 10 custom transaction types and recomputes a
 * PageRank-style trust score on-chain after every change to the graph topology. */

import Long from 'long';

import { types } from '../proto/types.js';

import {
    IPluginError,
    NewError,
    ErrInsufficientFunds,
    ErrInvalidAddress,
    ErrInvalidAmount,
    ErrInvalidMessageCast,
    ErrTxFeeBelowStateLimit
} from './error.js';

import type { Plugin, Config } from './plugin.js';
import { JoinLenPrefix, FromAny, Unmarshal } from './plugin.js';
import { fileDescriptorProtos } from '../proto/descriptors.js';
import { snapshotCache } from './snapshot.js';



// ---- custom error helpers (codes >14 avoid built-in collisions) ----
const ErrIdentityExists = (): IPluginError => NewError(20, 'plugin', 'identity already exists');
const ErrNoIdentity = (): IPluginError => NewError(21, 'plugin', 'identity not registered');
const ErrTrustGate = (): IPluginError => NewError(22, 'plugin', 'trust score below guild gate');
const ErrNotFound = (m: string): IPluginError => NewError(23, 'plugin', `${m} not found`);
const ErrBadState = (m: string): IPluginError => NewError(24, 'plugin', m);

// LOOM bond pool: staked CNPY from WEAVE_THREAD is held here (core Pool keyspace).
const LOOM_BOND_POOL_ID = Long.fromNumber(424242);
const SCORE_SCALE = 1_000_000; // fixed-point scale for trust_score (avg node ~= 1e6)

// ContractConfig: registers all transaction types and the plugin-owned state prefixes.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ContractConfig: any = {
    name: 'loom_trust_graph',
    id: 1,
    version: 1,
    supportedTransactions: [
        'send',
        'register_identity',
        'weave_thread',
        'break_thread',
        'endorse_skill',
        'form_guild',
        'join_guild',
        'post_quest',
        'submit_proof',
        'attest_contribution',
        'cast_weighted_vote'
    ],
    transactionTypeUrls: [
        'type.googleapis.com/types.MessageSend',
        'type.googleapis.com/types.MessageRegisterIdentity',
        'type.googleapis.com/types.MessageWeaveThread',
        'type.googleapis.com/types.MessageBreakThread',
        'type.googleapis.com/types.MessageEndorseSkill',
        'type.googleapis.com/types.MessageFormGuild',
        'type.googleapis.com/types.MessageJoinGuild',
        'type.googleapis.com/types.MessagePostQuest',
        'type.googleapis.com/types.MessageSubmitProof',
        'type.googleapis.com/types.MessageAttestContribution',
        'type.googleapis.com/types.MessageCastWeightedVote'
    ],
    eventTypeUrls: [],
    customStatePrefixes: [
        Buffer.from([100]), Buffer.from([101]), Buffer.from([102]), Buffer.from([103]),
        Buffer.from([104]), Buffer.from([105]), Buffer.from([106]), Buffer.from([107]),
        Buffer.from([108]), Buffer.from([109])
    ],
    fileDescriptorProtos
};

// ============================ utilities ====================================

function randId(): Long {
    return Long.fromNumber(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toLong(v: any): Long {
    return Long.isLong(v) ? v : Long.fromNumber(Number(v) || 0);
}
function hx(b: Uint8Array | undefined): string {
    return b ? Buffer.from(b).toString('hex') : '';
}

// batchPoints reads many exact keys; returns a map of queryId.toString() -> value bytes (or null).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function batchPoints(
    contract: Contract,
    reads: { id: Long; key: Uint8Array }[]
): Promise<[Map<string, Uint8Array | null>, IPluginError | null]> {
    const [resp, err] = await contract.plugin.StateRead(contract, {
        keys: reads.map((r) => ({ queryId: r.id, key: r.key }))
    });
    if (err) return [new Map(), err];
    if (resp?.error) return [new Map(), resp.error];
    const out = new Map<string, Uint8Array | null>();
    for (const r of resp?.results || []) {
        out.set((r.queryId as Long).toString(), r.entries?.[0]?.value || null);
    }
    return [out, null];
}

// rangeRead returns every {key,value} under a prefix.
async function rangeRead(
    contract: Contract,
    prefix: Uint8Array
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<[{ key: Uint8Array; value: Uint8Array }[], IPluginError | null]> {
    const [resp, err] = await contract.plugin.StateRead(contract, {
        ranges: [{ queryId: randId(), prefix, limit: 0, reverse: false }]
    });
    if (err) return [[], err];
    if (resp?.error) return [[], resp.error];
    const entries = resp?.results?.[0]?.entries || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return [entries.map((e: any) => ({ key: e.key, value: e.value })), null];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function write(contract: Contract, sets: any[], deletes: any[] = []): Promise<IPluginError | null> {
    const [wr, werr] = await contract.plugin.StateWrite(contract, { sets, deletes });
    if (werr) return werr;
    if (wr?.error) return wr.error;
    return null;
}

// ============================ Contract (stateless checks) ===================

export class Contract {
    Config: Config;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    FSMConfig: any;
    plugin: Plugin;
    fsmId: Long;
    currentHeight: Long = Long.ZERO;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(config: Config, fsmConfig: any, plugin: Plugin, fsmId: Long) {
        this.Config = config;
        this.FSMConfig = fsmConfig;
        this.plugin = plugin;
        this.fsmId = fsmId;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    Genesis(_request: any): any {
        return {};
    }
    // BeginBlock captures the height so DeliverTx handlers can timestamp records.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    BeginBlock(request: any): any {
        if (request?.height !== undefined) this.currentHeight = toLong(request.height);
        return {};
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    async EndBlock(_request: any): Promise<any> {
        return {};
    }

    // ---- stateless validation helpers ----
    private static addr20(a: Uint8Array | undefined): boolean {
        return !!a && a.length === 20;
    }
    private static nonEmpty(s: string | undefined, max: number): boolean {
        return !!s && s.length > 0 && s.length <= max;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CheckMessageSend(msg: any): any {
        if (!Contract.addr20(msg.fromAddress)) return { error: ErrInvalidAddress() };
        if (!Contract.addr20(msg.toAddress)) return { error: ErrInvalidAddress() };
        const amount = toLong(msg.amount);
        if (amount.isZero()) return { error: ErrInvalidAmount() };
        return { recipient: msg.toAddress, authorizedSigners: [msg.fromAddress] };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CheckMessageRegisterIdentity(msg: any): any {
        if (!Contract.addr20(msg.authorAddress)) return { error: ErrInvalidAddress() };
        if (!Contract.nonEmpty(msg.handle, 32)) return { error: ErrBadState('handle 1-32 chars') };
        return { authorizedSigners: [msg.authorAddress] };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CheckMessageWeaveThread(msg: any): any {
        if (!Contract.addr20(msg.fromAddress)) return { error: ErrInvalidAddress() };
        if (!Contract.addr20(msg.toAddress)) return { error: ErrInvalidAddress() };
        if (Buffer.from(msg.fromAddress).equals(Buffer.from(msg.toAddress)))
            return { error: ErrBadState('cannot weave a thread to self') };
        if (toLong(msg.stakeAmount).isZero()) return { error: ErrInvalidAmount() };
        return { recipient: msg.toAddress, authorizedSigners: [msg.fromAddress] };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CheckMessageBreakThread(msg: any): any {
        if (!Contract.addr20(msg.fromAddress)) return { error: ErrInvalidAddress() };
        if (!Contract.addr20(msg.toAddress)) return { error: ErrInvalidAddress() };
        return { recipient: msg.toAddress, authorizedSigners: [msg.fromAddress] };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CheckMessageEndorseSkill(msg: any): any {
        if (!Contract.addr20(msg.fromAddress)) return { error: ErrInvalidAddress() };
        if (!Contract.addr20(msg.toAddress)) return { error: ErrInvalidAddress() };
        if (!Contract.nonEmpty(msg.skill, 32)) return { error: ErrBadState('skill 1-32 chars') };
        return { recipient: msg.toAddress, authorizedSigners: [msg.fromAddress] };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CheckMessageFormGuild(msg: any): any {
        if (!Contract.addr20(msg.creatorAddress)) return { error: ErrInvalidAddress() };
        if (!Contract.nonEmpty(msg.name, 48)) return { error: ErrBadState('guild name 1-48 chars') };
        return { authorizedSigners: [msg.creatorAddress] };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CheckMessageJoinGuild(msg: any): any {
        if (!Contract.addr20(msg.memberAddress)) return { error: ErrInvalidAddress() };
        if (toLong(msg.guildId).isZero()) return { error: ErrBadState('invalid guild id') };
        return { authorizedSigners: [msg.memberAddress] };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CheckMessagePostQuest(msg: any): any {
        if (!Contract.addr20(msg.authorAddress)) return { error: ErrInvalidAddress() };
        if (toLong(msg.guildId).isZero()) return { error: ErrBadState('invalid guild id') };
        if (!Contract.nonEmpty(msg.title, 80)) return { error: ErrBadState('quest title 1-80 chars') };
        return { authorizedSigners: [msg.authorAddress] };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CheckMessageSubmitProof(msg: any): any {
        if (!Contract.addr20(msg.authorAddress)) return { error: ErrInvalidAddress() };
        if (toLong(msg.questId).isZero()) return { error: ErrBadState('invalid quest id') };
        if (!Contract.nonEmpty(msg.proofUri, 256)) return { error: ErrBadState('proof uri required') };
        return { authorizedSigners: [msg.authorAddress] };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CheckMessageAttestContribution(msg: any): any {
        if (!Contract.addr20(msg.reviewerAddress)) return { error: ErrInvalidAddress() };
        if (toLong(msg.proofId).isZero()) return { error: ErrBadState('invalid proof id') };
        return { authorizedSigners: [msg.reviewerAddress] };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CheckMessageCastWeightedVote(msg: any): any {
        if (!Contract.addr20(msg.voterAddress)) return { error: ErrInvalidAddress() };
        if (!Contract.nonEmpty(msg.proposalId, 64)) return { error: ErrBadState('proposal id required') };
        return { authorizedSigners: [msg.voterAddress] };
    }
}

// ============================ ContractAsync (stateful) =====================

export class ContractAsync {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async CheckTx(contract: Contract, request: any): Promise<any> {
        // fee floor check against governance FeeParams
        const [resp, err] = await contract.plugin.StateRead(contract, {
            keys: [{ queryId: randId(), key: KeyForFeeParams() }]
        });
        if (err) return { error: err };
        if (resp?.error) return { error: resp.error };
        const feeParamsBytes = resp?.results?.[0]?.entries?.[0]?.value;
        if (feeParamsBytes && feeParamsBytes.length > 0) {
            const [minFees, uErr] = Unmarshal(feeParamsBytes, types.FeeParams);
            if (uErr) return { error: uErr };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const sendFee = (minFees as any)?.sendFee;
            if (sendFee !== undefined && request.tx?.fee !== undefined) {
                if (toLong(request.tx.fee).toNumber() < toLong(sendFee).toNumber())
                    return { error: ErrTxFeeBelowStateLimit() };
            }
        }
        const [msg, msgType, mErr] = FromAny(request.tx?.msg);
        if (mErr) return { error: mErr };
        if (!msg) return { error: ErrInvalidMessageCast() };
        switch (msgType) {
            case 'MessageSend': return contract.CheckMessageSend(msg);
            case 'MessageRegisterIdentity': return contract.CheckMessageRegisterIdentity(msg);
            case 'MessageWeaveThread': return contract.CheckMessageWeaveThread(msg);
            case 'MessageBreakThread': return contract.CheckMessageBreakThread(msg);
            case 'MessageEndorseSkill': return contract.CheckMessageEndorseSkill(msg);
            case 'MessageFormGuild': return contract.CheckMessageFormGuild(msg);
            case 'MessageJoinGuild': return contract.CheckMessageJoinGuild(msg);
            case 'MessagePostQuest': return contract.CheckMessagePostQuest(msg);
            case 'MessageSubmitProof': return contract.CheckMessageSubmitProof(msg);
            case 'MessageAttestContribution': return contract.CheckMessageAttestContribution(msg);
            case 'MessageCastWeightedVote': return contract.CheckMessageCastWeightedVote(msg);
            default: return { error: ErrInvalidMessageCast() };
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async DeliverTx(contract: Contract, request: any): Promise<any> {
        const [msg, msgType, err] = FromAny(request.tx?.msg);
        if (err) return { error: err };
        if (!msg) return { error: ErrInvalidMessageCast() };
        const fee = request.tx?.fee as Long;
        switch (msgType) {
            case 'MessageSend': return ContractAsync.DeliverMessageSend(contract, msg, fee);
            case 'MessageRegisterIdentity': return ContractAsync.DeliverRegisterIdentity(contract, msg, fee);
            case 'MessageWeaveThread': return ContractAsync.DeliverWeaveThread(contract, msg, fee);
            case 'MessageBreakThread': return ContractAsync.DeliverBreakThread(contract, msg, fee);
            case 'MessageEndorseSkill': return ContractAsync.DeliverEndorseSkill(contract, msg, fee);
            case 'MessageFormGuild': return ContractAsync.DeliverFormGuild(contract, msg, fee);
            case 'MessageJoinGuild': return ContractAsync.DeliverJoinGuild(contract, msg, fee);
            case 'MessagePostQuest': return ContractAsync.DeliverPostQuest(contract, msg, fee);
            case 'MessageSubmitProof': return ContractAsync.DeliverSubmitProof(contract, msg, fee);
            case 'MessageAttestContribution': return ContractAsync.DeliverAttestContribution(contract, msg, fee);
            case 'MessageCastWeightedVote': return ContractAsync.DeliverCastWeightedVote(contract, msg, fee);
            default: return { error: ErrInvalidMessageCast() };
        }
    }

    // ---- account/pool helpers ----
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static account(bytes: Uint8Array | null, addr: Uint8Array): any {
        const [raw] = Unmarshal(bytes || new Uint8Array(), types.Account);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const a = (raw as any) || {};
        return { address: a.address || addr, amount: toLong(a.amount) };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static pool(bytes: Uint8Array | null, id: Long): any {
        const [raw] = Unmarshal(bytes || new Uint8Array(), types.Pool);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const p = (raw as any) || {};
        return { id: p.id !== undefined ? toLong(p.id) : id, amount: toLong(p.amount) };
    }
    static acctSet(addr: Uint8Array, amount: Long) {
        return { key: KeyForAccount(addr), value: types.Account.encode(types.Account.create({ address: addr, amount })).finish() };
    }
    static poolSet(id: Long, amount: Long) {
        return { key: KeyForFeePool(id), value: types.Pool.encode(types.Pool.create({ id, amount })).finish() };
    }

    // base send (unchanged behavior)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async DeliverMessageSend(contract: Contract, msg: any, fee: Long | number | undefined): Promise<any> {
        const fId = randId(), tId = randId(), pId = randId();
        const fromKey = KeyForAccount(msg.fromAddress), toKey = KeyForAccount(msg.toAddress);
        const feeKey = KeyForFeePool(Long.fromNumber(contract.Config.ChainId));
        const [m, rerr] = await batchPoints(contract, [
            { id: pId, key: feeKey }, { id: fId, key: fromKey }, { id: tId, key: toKey }
        ]);
        if (rerr) return { error: rerr };
        const from = ContractAsync.account(m.get(fId.toString()) || null, msg.fromAddress);
        const feePool = ContractAsync.pool(m.get(pId.toString()) || null, Long.fromNumber(contract.Config.ChainId));
        const amount = toLong(msg.amount), feeAmt = toLong(fee);
        const deduct = amount.add(feeAmt);
        if (from.amount.lessThan(deduct)) return { error: ErrInsufficientFunds() };
        const selfTransfer = Buffer.from(fromKey).equals(Buffer.from(toKey));
        const to = selfTransfer ? from : ContractAsync.account(m.get(tId.toString()) || null, msg.toAddress);
        const newFrom = from.amount.subtract(deduct);
        const sets = [
            ContractAsync.poolSet(Long.fromNumber(contract.Config.ChainId), feePool.amount.add(feeAmt)),
            ContractAsync.acctSet(msg.toAddress, (selfTransfer ? newFrom : to.amount).add(amount))
        ];
        const deletes = [];
        if (!selfTransfer) {
            if (newFrom.isZero()) deletes.push({ key: fromKey });
            else sets.push(ContractAsync.acctSet(msg.fromAddress, newFrom));
        }
        const werr = await write(contract, sets, deletes);
        return werr ? { error: werr } : {};
    }

    // 1. REGISTER_IDENTITY
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async DeliverRegisterIdentity(contract: Contract, msg: any, fee: Long): Promise<any> {
        const aId = randId(), pId = randId(), iId = randId();
        const acctKey = KeyForAccount(msg.authorAddress);
        const feeKey = KeyForFeePool(Long.fromNumber(contract.Config.ChainId));
        const idKey = KeyForIdentity(msg.authorAddress);
        const [m, rerr] = await batchPoints(contract, [
            { id: aId, key: acctKey }, { id: pId, key: feeKey }, { id: iId, key: idKey }
        ]);
        if (rerr) return { error: rerr };
        if (m.get(iId.toString())) return { error: ErrIdentityExists() };
        const acct = ContractAsync.account(m.get(aId.toString()) || null, msg.authorAddress);
        const feePool = ContractAsync.pool(m.get(pId.toString()) || null, Long.fromNumber(contract.Config.ChainId));
        const feeAmt = toLong(fee);
        if (acct.amount.lessThan(feeAmt)) return { error: ErrInsufficientFunds() };
        const identity = types.Identity.create({
            address: msg.authorAddress, handle: msg.handle, bio: msg.bio || '',
            registeredHeight: contract.currentHeight, trustScore: Long.fromNumber(SCORE_SCALE),
            inDegree: 0, outDegree: 0, stakedInbound: 0
        });
        const werr = await write(contract, [
            ContractAsync.acctSet(msg.authorAddress, acct.amount.subtract(feeAmt)),
            ContractAsync.poolSet(Long.fromNumber(contract.Config.ChainId), feePool.amount.add(feeAmt)),
            { key: idKey, value: types.Identity.encode(identity).finish() }
        ]);
        if (werr) return { error: werr };
        snapshotCache.identities.push(identity);
        return ContractAsync.recomputeTrust(contract);
    }

    // 2. WEAVE_THREAD
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async DeliverWeaveThread(contract: Contract, msg: any, fee: Long): Promise<any> {
        const aId = randId(), pId = randId(), bId = randId(), fiId = randId(), tiId = randId(), thId = randId();
        const acctKey = KeyForAccount(msg.fromAddress);
        const feeKey = KeyForFeePool(Long.fromNumber(contract.Config.ChainId));
        const bondKey = KeyForFeePool(LOOM_BOND_POOL_ID);
        const fromIdKey = KeyForIdentity(msg.fromAddress), toIdKey = KeyForIdentity(msg.toAddress);
        const threadKey = KeyForThread(msg.fromAddress, msg.toAddress);
        const [m, rerr] = await batchPoints(contract, [
            { id: aId, key: acctKey }, { id: pId, key: feeKey }, { id: bId, key: bondKey },
            { id: fiId, key: fromIdKey }, { id: tiId, key: toIdKey }, { id: thId, key: threadKey }
        ]);
        if (rerr) return { error: rerr };
        if (!m.get(fiId.toString())) return { error: ErrNoIdentity() };
        if (!m.get(tiId.toString())) return { error: ErrNotFound('vouchee identity') };
        const existing = m.get(thId.toString());
        if (existing) {
            const [pre] = Unmarshal(existing, types.Thread);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if ((pre as any)?.active) return { error: ErrBadState('thread already active') };
        }
        const acct = ContractAsync.account(m.get(aId.toString()) || null, msg.fromAddress);
        const feePool = ContractAsync.pool(m.get(pId.toString()) || null, Long.fromNumber(contract.Config.ChainId));
        const bondPool = ContractAsync.pool(m.get(bId.toString()) || null, LOOM_BOND_POOL_ID);
        const stake = toLong(msg.stakeAmount), feeAmt = toLong(fee);
        const deduct = stake.add(feeAmt);
        if (acct.amount.lessThan(deduct)) return { error: ErrInsufficientFunds() };
        const thread = types.Thread.create({
            fromAddress: msg.fromAddress, toAddress: msg.toAddress, stakeAmount: stake,
            skillTag: msg.skillTag || '', wovenHeight: contract.currentHeight, active: true
        });
        const werr = await write(contract, [
            ContractAsync.acctSet(msg.fromAddress, acct.amount.subtract(deduct)),
            ContractAsync.poolSet(Long.fromNumber(contract.Config.ChainId), feePool.amount.add(feeAmt)),
            ContractAsync.poolSet(LOOM_BOND_POOL_ID, bondPool.amount.add(stake)),
            { key: threadKey, value: types.Thread.encode(thread).finish() }
        ]);
        if (werr) return { error: werr };
        snapshotCache.threads.push(thread);
        return ContractAsync.recomputeTrust(contract);
    }

    // 3. BREAK_THREAD (90% stake returned, 10% bad-faith penalty to fee pool)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async DeliverBreakThread(contract: Contract, msg: any, fee: Long): Promise<any> {
        const aId = randId(), pId = randId(), bId = randId(), thId = randId();
        const acctKey = KeyForAccount(msg.fromAddress);
        const feeKey = KeyForFeePool(Long.fromNumber(contract.Config.ChainId));
        const bondKey = KeyForFeePool(LOOM_BOND_POOL_ID);
        const threadKey = KeyForThread(msg.fromAddress, msg.toAddress);
        const [m, rerr] = await batchPoints(contract, [
            { id: aId, key: acctKey }, { id: pId, key: feeKey }, { id: bId, key: bondKey }, { id: thId, key: threadKey }
        ]);
        if (rerr) return { error: rerr };
        const tBytes = m.get(thId.toString());
        if (!tBytes) return { error: ErrNotFound('thread') };
        const [traw] = Unmarshal(tBytes, types.Thread);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const thread = traw as any;
        if (!thread?.active) return { error: ErrBadState('thread already broken') };
        const acct = ContractAsync.account(m.get(aId.toString()) || null, msg.fromAddress);
        const feePool = ContractAsync.pool(m.get(pId.toString()) || null, Long.fromNumber(contract.Config.ChainId));
        const bondPool = ContractAsync.pool(m.get(bId.toString()) || null, LOOM_BOND_POOL_ID);
        const feeAmt = toLong(fee);
        if (acct.amount.lessThan(feeAmt)) return { error: ErrInsufficientFunds() };
        const stake = toLong(thread.stakeAmount);
        const penalty = stake.divide(10);
        const refund = stake.subtract(penalty);
        const broken = types.Thread.create({
            fromAddress: thread.address || msg.fromAddress, toAddress: msg.toAddress,
            stakeAmount: stake, skillTag: thread.skillTag || '', wovenHeight: toLong(thread.wovenHeight), active: false
        });
        const werr = await write(contract, [
            ContractAsync.acctSet(msg.fromAddress, acct.amount.subtract(feeAmt).add(refund)),
            ContractAsync.poolSet(Long.fromNumber(contract.Config.ChainId), feePool.amount.add(feeAmt).add(penalty)),
            ContractAsync.poolSet(LOOM_BOND_POOL_ID, bondPool.amount.subtract(stake)),
            { key: threadKey, value: types.Thread.encode(broken).finish() }
        ]);
        if (werr) return { error: werr };
        return ContractAsync.recomputeTrust(contract);
    }

    // 4. ENDORSE_SKILL (weight = endorser's recursive trust score)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async DeliverEndorseSkill(contract: Contract, msg: any, fee: Long): Promise<any> {
        const aId = randId(), pId = randId(), fiId = randId(), tiId = randId();
        const acctKey = KeyForAccount(msg.fromAddress);
        const feeKey = KeyForFeePool(Long.fromNumber(contract.Config.ChainId));
        const [m, rerr] = await batchPoints(contract, [
            { id: aId, key: acctKey }, { id: pId, key: feeKey },
            { id: fiId, key: KeyForIdentity(msg.fromAddress) }, { id: tiId, key: KeyForIdentity(msg.toAddress) }
        ]);
        if (rerr) return { error: rerr };
        const fromBytes = m.get(fiId.toString());
        if (!fromBytes) return { error: ErrNoIdentity() };
        if (!m.get(tiId.toString())) return { error: ErrNotFound('endorsee identity') };
        const acct = ContractAsync.account(m.get(aId.toString()) || null, msg.fromAddress);
        const feePool = ContractAsync.pool(m.get(pId.toString()) || null, Long.fromNumber(contract.Config.ChainId));
        const feeAmt = toLong(fee);
        if (acct.amount.lessThan(feeAmt)) return { error: ErrInsufficientFunds() };
        const [fraw] = Unmarshal(fromBytes, types.Identity);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const weight = toLong((fraw as any)?.trustScore);
        const endorsement = types.Endorsement.create({
            fromAddress: msg.fromAddress, toAddress: msg.toAddress, skill: msg.skill,
            weight, height: contract.currentHeight
        });
        const werr = await write(contract, [
            ContractAsync.acctSet(msg.fromAddress, acct.amount.subtract(feeAmt)),
            ContractAsync.poolSet(Long.fromNumber(contract.Config.ChainId), feePool.amount.add(feeAmt)),
            { key: KeyForEndorsement(msg.fromAddress, msg.toAddress, msg.skill), value: types.Endorsement.encode(endorsement).finish() }
        ]);
        if (!werr) snapshotCache.endorsements.push(endorsement);
        return werr ? { error: werr } : {};
    }

    // 5. FORM_GUILD
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async DeliverFormGuild(contract: Contract, msg: any, fee: Long): Promise<any> {
        const aId = randId(), pId = randId(), cId = randId(), iId = randId();
        const acctKey = KeyForAccount(msg.creatorAddress);
        const feeKey = KeyForFeePool(Long.fromNumber(contract.Config.ChainId));
        const counterKey = KeyForCounter('guild');
        const [m, rerr] = await batchPoints(contract, [
            { id: aId, key: acctKey }, { id: pId, key: feeKey },
            { id: cId, key: counterKey }, { id: iId, key: KeyForIdentity(msg.creatorAddress) }
        ]);
        if (rerr) return { error: rerr };
        if (!m.get(iId.toString())) return { error: ErrNoIdentity() };
        const acct = ContractAsync.account(m.get(aId.toString()) || null, msg.creatorAddress);
        const feePool = ContractAsync.pool(m.get(pId.toString()) || null, Long.fromNumber(contract.Config.ChainId));
        const feeAmt = toLong(fee);
        if (acct.amount.lessThan(feeAmt)) return { error: ErrInsufficientFunds() };
        const id = ContractAsync.nextCounter(m.get(cId.toString()) || null);
        const guild = types.Guild.create({
            id, name: msg.name, description: msg.description || '', creatorAddress: msg.creatorAddress,
            minTrust: toLong(msg.minTrust), memberCount: 1, createdHeight: contract.currentHeight
        });
        const member = types.GuildMember.create({ guildId: id, memberAddress: msg.creatorAddress, joinedHeight: contract.currentHeight });
        const werr = await write(contract, [
            ContractAsync.acctSet(msg.creatorAddress, acct.amount.subtract(feeAmt)),
            ContractAsync.poolSet(Long.fromNumber(contract.Config.ChainId), feePool.amount.add(feeAmt)),
            { key: counterKey, value: types.Counter.encode(types.Counter.create({ count: id })).finish() },
            { key: KeyForGuild(id), value: types.Guild.encode(guild).finish() },
            { key: KeyForGuildMember(id, msg.creatorAddress), value: types.GuildMember.encode(member).finish() }
        ]);
        if (!werr) { snapshotCache.guilds.push(guild); snapshotCache.members.push(member); }
        return werr ? { error: werr } : {};
    }

    // 6. JOIN_GUILD (enforces recursive-trust gate)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async DeliverJoinGuild(contract: Contract, msg: any, fee: Long): Promise<any> {
        const aId = randId(), pId = randId(), gId = randId(), iId = randId(), mId = randId();
        const guildId = toLong(msg.guildId);
        const acctKey = KeyForAccount(msg.memberAddress);
        const feeKey = KeyForFeePool(Long.fromNumber(contract.Config.ChainId));
        const [m, rerr] = await batchPoints(contract, [
            { id: aId, key: acctKey }, { id: pId, key: feeKey }, { id: gId, key: KeyForGuild(guildId) },
            { id: iId, key: KeyForIdentity(msg.memberAddress) }, { id: mId, key: KeyForGuildMember(guildId, msg.memberAddress) }
        ]);
        if (rerr) return { error: rerr };
        const gBytes = m.get(gId.toString());
        if (!gBytes) return { error: ErrNotFound('guild') };
        const iBytes = m.get(iId.toString());
        if (!iBytes) return { error: ErrNoIdentity() };
        if (m.get(mId.toString())) return { error: ErrBadState('already a member') };
        const [graw] = Unmarshal(gBytes, types.Guild);
        const [iraw] = Unmarshal(iBytes, types.Identity);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const guild = graw as any;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const trust = toLong((iraw as any)?.trustScore);
        if (trust.lessThan(toLong(guild.minTrust))) return { error: ErrTrustGate() };
        const acct = ContractAsync.account(m.get(aId.toString()) || null, msg.memberAddress);
        const feePool = ContractAsync.pool(m.get(pId.toString()) || null, Long.fromNumber(contract.Config.ChainId));
        const feeAmt = toLong(fee);
        if (acct.amount.lessThan(feeAmt)) return { error: ErrInsufficientFunds() };
        const member = types.GuildMember.create({ guildId, memberAddress: msg.memberAddress, joinedHeight: contract.currentHeight });
        const updatedGuild = types.Guild.create({ ...guild, memberCount: toLong(guild.memberCount).add(1) });
        const werr = await write(contract, [
            ContractAsync.acctSet(msg.memberAddress, acct.amount.subtract(feeAmt)),
            ContractAsync.poolSet(Long.fromNumber(contract.Config.ChainId), feePool.amount.add(feeAmt)),
            { key: KeyForGuild(guildId), value: types.Guild.encode(updatedGuild).finish() },
            { key: KeyForGuildMember(guildId, msg.memberAddress), value: types.GuildMember.encode(member).finish() }
        ]);
        if (!werr) snapshotCache.members.push(member);
        return werr ? { error: werr } : {};
    }

    // 7. POST_QUEST
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async DeliverPostQuest(contract: Contract, msg: any, fee: Long): Promise<any> {
        const aId = randId(), pId = randId(), cId = randId(), gId = randId(), mId = randId();
        const guildId = toLong(msg.guildId);
        const acctKey = KeyForAccount(msg.authorAddress);
        const feeKey = KeyForFeePool(Long.fromNumber(contract.Config.ChainId));
        const counterKey = KeyForCounter('quest');
        const [m, rerr] = await batchPoints(contract, [
            { id: aId, key: acctKey }, { id: pId, key: feeKey }, { id: cId, key: counterKey },
            { id: gId, key: KeyForGuild(guildId) }, { id: mId, key: KeyForGuildMember(guildId, msg.authorAddress) }
        ]);
        if (rerr) return { error: rerr };
        if (!m.get(gId.toString())) return { error: ErrNotFound('guild') };
        if (!m.get(mId.toString())) return { error: ErrBadState('author is not a guild member') };
        const acct = ContractAsync.account(m.get(aId.toString()) || null, msg.authorAddress);
        const feePool = ContractAsync.pool(m.get(pId.toString()) || null, Long.fromNumber(contract.Config.ChainId));
        const feeAmt = toLong(fee);
        if (acct.amount.lessThan(feeAmt)) return { error: ErrInsufficientFunds() };
        const id = ContractAsync.nextCounter(m.get(cId.toString()) || null);
        const quest = types.Quest.create({
            id, guildId, authorAddress: msg.authorAddress, title: msg.title, description: msg.description || '',
            reward: toLong(msg.reward), status: 'open', createdHeight: contract.currentHeight
        });
        const werr = await write(contract, [
            ContractAsync.acctSet(msg.authorAddress, acct.amount.subtract(feeAmt)),
            ContractAsync.poolSet(Long.fromNumber(contract.Config.ChainId), feePool.amount.add(feeAmt)),
            { key: counterKey, value: types.Counter.encode(types.Counter.create({ count: id })).finish() },
            { key: KeyForQuest(id), value: types.Quest.encode(quest).finish() }
        ]);
        if (!werr) snapshotCache.quests.push(quest);
        return werr ? { error: werr } : {};
    }

    // 8. SUBMIT_PROOF
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async DeliverSubmitProof(contract: Contract, msg: any, fee: Long): Promise<any> {
        const aId = randId(), pId = randId(), cId = randId(), qId = randId();
        const questId = toLong(msg.questId);
        const acctKey = KeyForAccount(msg.authorAddress);
        const feeKey = KeyForFeePool(Long.fromNumber(contract.Config.ChainId));
        const counterKey = KeyForCounter('proof');
        const [m, rerr] = await batchPoints(contract, [
            { id: aId, key: acctKey }, { id: pId, key: feeKey }, { id: cId, key: counterKey }, { id: qId, key: KeyForQuest(questId) }
        ]);
        if (rerr) return { error: rerr };
        const qBytes = m.get(qId.toString());
        if (!qBytes) return { error: ErrNotFound('quest') };
        const acct = ContractAsync.account(m.get(aId.toString()) || null, msg.authorAddress);
        const feePool = ContractAsync.pool(m.get(pId.toString()) || null, Long.fromNumber(contract.Config.ChainId));
        const feeAmt = toLong(fee);
        if (acct.amount.lessThan(feeAmt)) return { error: ErrInsufficientFunds() };
        const id = ContractAsync.nextCounter(m.get(cId.toString()) || null);
        const proof = types.Proof.create({
            id, questId, authorAddress: msg.authorAddress, proofUri: msg.proofUri,
            attested: false, approved: false, submittedHeight: contract.currentHeight
        });
        const [qraw] = Unmarshal(qBytes, types.Quest);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updatedQuest = types.Quest.create({ ...(qraw as any), status: 'submitted' });
        const werr = await write(contract, [
            ContractAsync.acctSet(msg.authorAddress, acct.amount.subtract(feeAmt)),
            ContractAsync.poolSet(Long.fromNumber(contract.Config.ChainId), feePool.amount.add(feeAmt)),
            { key: counterKey, value: types.Counter.encode(types.Counter.create({ count: id })).finish() },
            { key: KeyForProof(id), value: types.Proof.encode(proof).finish() },
            { key: KeyForQuest(questId), value: types.Quest.encode(updatedQuest).finish() }
        ]);
        if (!werr) snapshotCache.proofs.push(proof);
        return werr ? { error: werr } : {};
    }

    // 9. ATTEST_CONTRIBUTION (approval flows reputation: auto-weaves a reward thread reviewer->author)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async DeliverAttestContribution(contract: Contract, msg: any, fee: Long): Promise<any> {
        const aId = randId(), pId = randId(), prId = randId(), riId = randId();
        const proofId = toLong(msg.proofId);
        const acctKey = KeyForAccount(msg.reviewerAddress);
        const feeKey = KeyForFeePool(Long.fromNumber(contract.Config.ChainId));
        const [m, rerr] = await batchPoints(contract, [
            { id: aId, key: acctKey }, { id: pId, key: feeKey },
            { id: prId, key: KeyForProof(proofId) }, { id: riId, key: KeyForIdentity(msg.reviewerAddress) }
        ]);
        if (rerr) return { error: rerr };
        const prBytes = m.get(prId.toString());
        if (!prBytes) return { error: ErrNotFound('proof') };
        if (!m.get(riId.toString())) return { error: ErrNoIdentity() };
        const acct = ContractAsync.account(m.get(aId.toString()) || null, msg.reviewerAddress);
        const feePool = ContractAsync.pool(m.get(pId.toString()) || null, Long.fromNumber(contract.Config.ChainId));
        const feeAmt = toLong(fee);
        if (acct.amount.lessThan(feeAmt)) return { error: ErrInsufficientFunds() };
        const [prraw] = Unmarshal(prBytes, types.Proof);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const proof = prraw as any;
        if (proof.attested) return { error: ErrBadState('proof already attested') };
        const approved = !!msg.approved;
        const updatedProof = types.Proof.create({ ...proof, attested: true, approved });
        const sets = [
            ContractAsync.acctSet(msg.reviewerAddress, acct.amount.subtract(feeAmt)),
            ContractAsync.poolSet(Long.fromNumber(contract.Config.ChainId), feePool.amount.add(feeAmt)),
            { key: KeyForProof(proofId), value: types.Proof.encode(updatedProof).finish() }
        ];
        if (proof.questId !== undefined) {
            const [qm] = await batchPoints(contract, [{ id: randId(), key: KeyForQuest(toLong(proof.questId)) }]);
            const qb = Array.from(qm.values())[0];
            if (qb) {
                const [qraw] = Unmarshal(qb, types.Quest);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                sets.push({ key: KeyForQuest(toLong(proof.questId)), value: types.Quest.encode(types.Quest.create({ ...(qraw as any), status: 'attested' })).finish() });
            }
        }
        // approval auto-weaves a non-staked reputation thread reviewer -> contributor (if not present)
        if (approved && proof.authorAddress && !Buffer.from(msg.reviewerAddress).equals(Buffer.from(proof.authorAddress))) {
            const tKey = KeyForThread(msg.reviewerAddress, proof.authorAddress);
            const [tm] = await batchPoints(contract, [{ id: randId(), key: tKey }]);
            const tb = Array.from(tm.values())[0];
            if (!tb) {
                const repThread = types.Thread.create({
                    fromAddress: msg.reviewerAddress, toAddress: proof.authorAddress, stakeAmount: Long.fromNumber(1_000_000),
                    skillTag: 'attestation', wovenHeight: contract.currentHeight, active: true
                });
                sets.push({ key: tKey, value: types.Thread.encode(repThread).finish() });
            }
        }
        const werr = await write(contract, sets);
        if (werr) return { error: werr };
        snapshotCache.proofs.push(updatedProof);
        return approved ? ContractAsync.recomputeTrust(contract) : {};
    }

    // 10. CAST_WEIGHTED_VOTE (weight = voter recursive trust; first vote creates proposal)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async DeliverCastWeightedVote(contract: Contract, msg: any, fee: Long): Promise<any> {
        const aId = randId(), pId = randId(), prId = randId(), iId = randId(), vId = randId();
        const acctKey = KeyForAccount(msg.voterAddress);
        const feeKey = KeyForFeePool(Long.fromNumber(contract.Config.ChainId));
        const propKey = KeyForProposal(msg.proposalId);
        const voteKey = KeyForVote(msg.proposalId, msg.voterAddress);
        const [m, rerr] = await batchPoints(contract, [
            { id: aId, key: acctKey }, { id: pId, key: feeKey }, { id: prId, key: propKey },
            { id: iId, key: KeyForIdentity(msg.voterAddress) }, { id: vId, key: voteKey }
        ]);
        if (rerr) return { error: rerr };
        const iBytes = m.get(iId.toString());
        if (!iBytes) return { error: ErrNoIdentity() };
        if (m.get(vId.toString())) return { error: ErrBadState('already voted') };
        const acct = ContractAsync.account(m.get(aId.toString()) || null, msg.voterAddress);
        const feePool = ContractAsync.pool(m.get(pId.toString()) || null, Long.fromNumber(contract.Config.ChainId));
        const feeAmt = toLong(fee);
        if (acct.amount.lessThan(feeAmt)) return { error: ErrInsufficientFunds() };
        const [iraw] = Unmarshal(iBytes, types.Identity);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const weight = toLong((iraw as any)?.trustScore);
        const propBytes = m.get(prId.toString());
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let proposal: any;
        if (propBytes) {
            const [praw] = Unmarshal(propBytes, types.Proposal);
            proposal = praw;
        } else {
            proposal = types.Proposal.create({
                id: msg.proposalId, title: msg.title || msg.proposalId, creatorAddress: msg.voterAddress,
                yesWeight: 0, noWeight: 0, voteCount: 0, createdHeight: contract.currentHeight
            });
        }
        const choice = !!msg.choice;
        const updated = types.Proposal.create({
            id: proposal.id, title: proposal.title, creatorAddress: proposal.creatorAddress,
            yesWeight: toLong(proposal.yesWeight).add(choice ? weight : Long.ZERO),
            noWeight: toLong(proposal.noWeight).add(choice ? Long.ZERO : weight),
            voteCount: toLong(proposal.voteCount).add(1), createdHeight: toLong(proposal.createdHeight)
        });
        const vote = types.Vote.create({
            proposalId: msg.proposalId, voterAddress: msg.voterAddress, choice, weight, height: contract.currentHeight
        });
        const werr = await write(contract, [
            ContractAsync.acctSet(msg.voterAddress, acct.amount.subtract(feeAmt)),
            ContractAsync.poolSet(Long.fromNumber(contract.Config.ChainId), feePool.amount.add(feeAmt)),
            { key: propKey, value: types.Proposal.encode(updated).finish() },
            { key: voteKey, value: types.Vote.encode(vote).finish() }
        ]);
        if (!werr) { snapshotCache.proposals.push(updated); snapshotCache.votes.push(vote); }
        return werr ? { error: werr } : {};
    }

    static nextCounter(bytes: Uint8Array | null): Long {
        const [raw] = Unmarshal(bytes || new Uint8Array(), types.Counter);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return toLong((raw as any)?.count).add(1);
    }

    // ---- THE CORE MECHANIC: recursive (PageRank-style) trust, computed on-chain ----
    // A vouch from a high-trust node is worth more than one from a fresh wallet, and stake
    // size weights each edge. Recomputed whenever graph topology changes.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async recomputeTrust(contract: Contract): Promise<any> {
        const [idEntries, ierr] = await rangeRead(contract, IdentityPrefix());
        if (ierr) return { error: ierr };
        const [thEntries, terr] = await rangeRead(contract, ThreadPrefix());
        if (terr) return { error: terr };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const identities: any[] = [];
        const nodeIndex = new Map<string, number>();
        for (const e of idEntries) {
            const [raw] = Unmarshal(e.value, types.Identity);
            if (!raw) continue;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const id = raw as any;
            nodeIndex.set(hx(id.address), identities.length);
            identities.push(id);
        }
        const N = identities.length;
        if (N === 0) return {};

        // build weighted adjacency from active threads whose endpoints are both identities
        const outEdges: { to: number; w: number }[][] = Array.from({ length: N }, () => []);
        const outWeight = new Array(N).fill(0);
        const inDeg = new Array(N).fill(0);
        const outDeg = new Array(N).fill(0);
        const stakedIn = new Array(N).fill(0);
        for (const e of thEntries) {
            const [raw] = Unmarshal(e.value, types.Thread);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const t = raw as any;
            if (!t || !t.active) continue;
            const fi = nodeIndex.get(hx(t.fromAddress));
            const ti = nodeIndex.get(hx(t.toAddress));
            if (fi === undefined || ti === undefined) continue;
            const w = Math.max(1, toLong(t.stakeAmount).toNumber());
            outEdges[fi].push({ to: ti, w });
            outWeight[fi] += w;
            outDeg[fi] += 1;
            inDeg[ti] += 1;
            stakedIn[ti] += w;
        }

        // power iteration
        const d = 0.85;
        let score = new Array(N).fill(1 / N);
        for (let iter = 0; iter < 40; iter++) {
            const next = new Array(N).fill((1 - d) / N);
            let dangling = 0;
            for (let i = 0; i < N; i++) {
                if (outEdges[i].length === 0) dangling += score[i];
                else for (const edge of outEdges[i]) next[edge.to] += d * score[i] * (edge.w / outWeight[i]);
            }
            const share = (d * dangling) / N;
            for (let i = 0; i < N; i++) next[i] += share;
            score = next;
        }

        // persist updated scores + degree stats (scaled so an average node ~= SCORE_SCALE)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sets: any[] = [];
        for (let i = 0; i < N; i++) {
            const id = identities[i];
            const scaled = Math.round(score[i] * N * SCORE_SCALE);
            const updated = types.Identity.create({
                address: id.address, handle: id.handle, bio: id.bio,
                registeredHeight: toLong(id.registeredHeight),
                trustScore: Long.fromNumber(scaled),
                inDegree: Long.fromNumber(inDeg[i]),
                outDegree: Long.fromNumber(outDeg[i]),
                stakedInbound: Long.fromNumber(stakedIn[i])
            });
            sets.push({ key: KeyForIdentity(id.address), value: types.Identity.encode(updated).finish() });
        }
        const werr = await write(contract, sets);
        return werr ? { error: werr } : {};
    }
}

// ============================ state keys ===================================

const accountPrefix = Buffer.from([1]);
const poolPrefix = Buffer.from([2]);
const paramsPrefix = Buffer.from([7]);
const identityPrefix = Buffer.from([100]);
const threadPrefix = Buffer.from([101]);
const guildPrefix = Buffer.from([102]);
const guildMemberPrefix = Buffer.from([103]);
const questPrefix = Buffer.from([104]);
const proofPrefix = Buffer.from([105]);
const proposalPrefix = Buffer.from([106]);
const votePrefix = Buffer.from([107]);
const endorsementPrefix = Buffer.from([108]);
const counterPrefix = Buffer.from([109]);

function u64(v: Long): Buffer {
    const b = Buffer.alloc(8);
    b.writeBigUInt64BE(BigInt(v.toString()));
    return b;
}
function sha20(...parts: Uint8Array[]): Buffer {
    // length-bounded composite key for (addr,addr[,str]) — JoinLenPrefix segments must be <256 bytes
    return Buffer.concat(parts.map((p) => Buffer.from(p)));
}

export function KeyForAccount(addr: Uint8Array): Uint8Array { return JoinLenPrefix(accountPrefix, Buffer.from(addr)); }
export function KeyForFeeParams(): Uint8Array { return JoinLenPrefix(paramsPrefix, Buffer.from('/f/')); }
export function KeyForFeePool(chainId: Long): Uint8Array { return JoinLenPrefix(poolPrefix, u64(chainId)); }

export function IdentityPrefix(): Uint8Array { return JoinLenPrefix(identityPrefix); }
export function KeyForIdentity(addr: Uint8Array): Uint8Array { return JoinLenPrefix(identityPrefix, Buffer.from(addr)); }
export function ThreadPrefix(): Uint8Array { return JoinLenPrefix(threadPrefix); }
export function KeyForThread(from: Uint8Array, to: Uint8Array): Uint8Array { return JoinLenPrefix(threadPrefix, sha20(from, to)); }
export function GuildPrefix(): Uint8Array { return JoinLenPrefix(guildPrefix); }
export function KeyForGuild(id: Long): Uint8Array { return JoinLenPrefix(guildPrefix, u64(id)); }
export function GuildMemberPrefix(): Uint8Array { return JoinLenPrefix(guildMemberPrefix); }
export function KeyForGuildMember(id: Long, addr: Uint8Array): Uint8Array { return JoinLenPrefix(guildMemberPrefix, sha20(u64(id), addr)); }
export function QuestPrefix(): Uint8Array { return JoinLenPrefix(questPrefix); }
export function KeyForQuest(id: Long): Uint8Array { return JoinLenPrefix(questPrefix, u64(id)); }
export function ProofPrefix(): Uint8Array { return JoinLenPrefix(proofPrefix); }
export function KeyForProof(id: Long): Uint8Array { return JoinLenPrefix(proofPrefix, u64(id)); }
export function ProposalPrefix(): Uint8Array { return JoinLenPrefix(proposalPrefix); }
export function KeyForProposal(id: string): Uint8Array { return JoinLenPrefix(proposalPrefix, Buffer.from(id)); }
export function VotePrefix(): Uint8Array { return JoinLenPrefix(votePrefix); }
export function KeyForVote(propId: string, addr: Uint8Array): Uint8Array { return JoinLenPrefix(votePrefix, sha20(Buffer.from(propId), addr)); }
export function EndorsementPrefix(): Uint8Array { return JoinLenPrefix(endorsementPrefix); }
export function KeyForEndorsement(from: Uint8Array, to: Uint8Array, skill: string): Uint8Array { return JoinLenPrefix(endorsementPrefix, sha20(from, to, Buffer.from(skill))); }
export function KeyForCounter(name: string): Uint8Array { return JoinLenPrefix(counterPrefix, Buffer.from(name)); }
