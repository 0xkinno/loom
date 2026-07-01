/**
 * LOOM seed — builds a real, on-chain social graph on a local Canopy node.
 * Every node, vouch, guild, quest, proof and vote below is a genuine BLS-signed
 * transaction submitted to RPC :50002 — there is no mocked data anywhere.
 *
 * Run:  VALIDATOR_ADDRESS=<hex from `canopy admin ks`> npm run seed
 *
 * Prereqs: local Canopy running with "plugin": "typescript" (LOOM), ports
 * 50002 (tx/query) and 50003 (admin keystore) reachable.
 */

import { randomBytes } from 'crypto';
import { bls12_381 } from '@noble/curves/bls12-381.js';
// @ts-ignore - generated CommonJS protobuf bundle
import protoRoot from '../proto-gen/index.cjs';
const types = (protoRoot as any).types;
const google = (protoRoot as any).google;

// ---------- config ----------
const QUERY_RPC = process.env.QUERY_RPC || 'http://localhost:50002';
const ADMIN_RPC = process.env.ADMIN_RPC || 'http://localhost:50003';
const NETWORK_ID = BigInt(process.env.NETWORK_ID || '1');
const CHAIN_ID = BigInt(process.env.CHAIN_ID || '1');
const FEE = BigInt(process.env.FEE || '10000');
const PASSWORD = process.env.KEY_PASSWORD || 'loomseed';
const VALIDATOR_ADDRESS = (process.env.VALIDATOR_ADDRESS || '').toLowerCase();
const VALIDATOR_PASSWORD = process.env.VALIDATOR_PASSWORD || '';
const FUND_PER_IDENTITY = BigInt(process.env.FUND || '50000000'); // uCNPY sent to each identity
const uCNPY = 1_000_000;

interface KeyGroup { address: string; publicKey: string; privateKey: string; }

// ---------- helpers ----------
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const hexToBytes = (h: string) => new Uint8Array(Buffer.from(h, 'hex'));
const bytesToHex = (b: Uint8Array) => Buffer.from(b).toString('hex');
const hexToB64 = (h: string) => Buffer.from(h, 'hex').toString('base64');

async function post(url: string, body: unknown): Promise<string> {
  const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const t = await r.text();
  if (r.status >= 400) throw new Error(`HTTP ${r.status} @ ${url}: ${t}`);
  return t;
}
async function newKey(nickname: string): Promise<string> {
  return JSON.parse(await post(`${ADMIN_RPC}/v1/admin/keystore-new-key`, { nickname, password: PASSWORD })) as string;
}
async function getKey(address: string, password: string): Promise<KeyGroup> {
  const p = JSON.parse(await post(`${ADMIN_RPC}/v1/admin/keystore-get`, { address, password }));
  return {
    address: p.address || p.Address || address,
    publicKey: p.publicKey || p.PublicKey || p.public_key,
    privateKey: p.privateKey || p.PrivateKey || p.private_key
  };
}
async function height(): Promise<bigint> {
  return BigInt((JSON.parse(await post(`${QUERY_RPC}/v1/query/height`, {})) as { height: number }).height);
}
async function balance(address: string): Promise<bigint> {
  try {
    const a = JSON.parse(await post(`${QUERY_RPC}/v1/query/account`, { address })) as { amount?: number };
    return BigInt(a.amount || 0);
  } catch { return 0n; }
}
async function waitBlocks(n: number) {
  const start = await height();
  while ((await height()) < start + BigInt(n)) await sleep(1500);
}

// ---------- transaction codec ----------
type Built = { typeUrl: string; bytes: Uint8Array };
const TX: Record<string, (m: any) => Built> = {
  send: (m) => ({ typeUrl: 'type.googleapis.com/types.MessageSend', bytes: types.MessageSend.encode(types.MessageSend.create(m)).finish() }),
  register_identity: (m) => ({ typeUrl: 'type.googleapis.com/types.MessageRegisterIdentity', bytes: types.MessageRegisterIdentity.encode(types.MessageRegisterIdentity.create(m)).finish() }),
  weave_thread: (m) => ({ typeUrl: 'type.googleapis.com/types.MessageWeaveThread', bytes: types.MessageWeaveThread.encode(types.MessageWeaveThread.create(m)).finish() }),
  break_thread: (m) => ({ typeUrl: 'type.googleapis.com/types.MessageBreakThread', bytes: types.MessageBreakThread.encode(types.MessageBreakThread.create(m)).finish() }),
  endorse_skill: (m) => ({ typeUrl: 'type.googleapis.com/types.MessageEndorseSkill', bytes: types.MessageEndorseSkill.encode(types.MessageEndorseSkill.create(m)).finish() }),
  form_guild: (m) => ({ typeUrl: 'type.googleapis.com/types.MessageFormGuild', bytes: types.MessageFormGuild.encode(types.MessageFormGuild.create(m)).finish() }),
  join_guild: (m) => ({ typeUrl: 'type.googleapis.com/types.MessageJoinGuild', bytes: types.MessageJoinGuild.encode(types.MessageJoinGuild.create(m)).finish() }),
  post_quest: (m) => ({ typeUrl: 'type.googleapis.com/types.MessagePostQuest', bytes: types.MessagePostQuest.encode(types.MessagePostQuest.create(m)).finish() }),
  submit_proof: (m) => ({ typeUrl: 'type.googleapis.com/types.MessageSubmitProof', bytes: types.MessageSubmitProof.encode(types.MessageSubmitProof.create(m)).finish() }),
  attest_contribution: (m) => ({ typeUrl: 'type.googleapis.com/types.MessageAttestContribution', bytes: types.MessageAttestContribution.encode(types.MessageAttestContribution.create(m)).finish() }),
  cast_weighted_vote: (m) => ({ typeUrl: 'type.googleapis.com/types.MessageCastWeightedVote', bytes: types.MessageCastWeightedVote.encode(types.MessageCastWeightedVote.create(m)).finish() })
};

function signBytes(shortType: string, typeUrl: string, msgBytes: Uint8Array, time: bigint, h: bigint): Uint8Array {
  const any = google.protobuf.Any.create({ type_url: typeUrl, value: msgBytes });
  const tx = types.Transaction.create({
    messageType: shortType, msg: any, signature: null,
    createdHeight: Number(h), time: Number(time), fee: Number(FEE),
    networkId: Number(NETWORK_ID), chainId: Number(CHAIN_ID)
  });
  return types.Transaction.encode(tx).finish();
}
function signBLS(privHex: string, message: Uint8Array): Uint8Array {
  const point = bls12_381.longSignatures.sign(bls12_381.longSignatures.hash(message), hexToBytes(privHex));
  return bls12_381.longSignatures.Signature.toBytes(point);
}

// build, sign, submit one tx. returns tx hash.
async function send(signer: KeyGroup, shortType: string, msg: any): Promise<string> {
  const built = TX[shortType](msg);
  const time = BigInt(Date.now()) * 1000n;
  const h = await height();
  const sb = signBytes(shortType, built.typeUrl, built.bytes, time, h);
  const sig = signBLS(signer.privateKey, sb);
  const tx: Record<string, unknown> = {
    type: shortType,
    msgTypeUrl: built.typeUrl,
    msgBytes: bytesToHex(built.bytes),
    signature: { publicKey: signer.publicKey, signature: bytesToHex(sig) },
    time: Number(time), createdHeight: Number(h), fee: Number(FEE), memo: '',
    networkID: Number(NETWORK_ID), chainID: Number(CHAIN_ID)
  };
  // 'send' is a core RegisteredMessage; it expects the structured msg form
  if (shortType === 'send') { delete tx.msgTypeUrl; delete tx.msgBytes; tx.msg = msg; }
  const resp = await post(`${QUERY_RPC}/v1/tx`, tx);
  return JSON.parse(resp) as string;
}

// ---------- graph blueprint ----------
// handle, skills they get endorsed for. Order matters: earlier = founder cohort.
const PEOPLE = [
  { h: 'mara.sol',     bio: 'core protocol, trust topology',     skills: ['solidity', 'consensus'] },
  { h: 'kai.dev',      bio: 'graph viz + frontend systems',      skills: ['react', 'd3'] },
  { h: 'noor.research',bio: 'mechanism design, governance',      skills: ['mechdesign', 'governance'] },
  { h: 'eze.builds',   bio: 'fullstack, indexer infra',          skills: ['typescript', 'infra'] },
  { h: 'lin.audits',   bio: 'security review, formal methods',   skills: ['audit', 'fuzzing'] },
  { h: 'tobi.ops',     bio: 'devrel, community ops',             skills: ['devrel'] },
  { h: 'sade.design',  bio: 'product + brand systems',           skills: ['design'] },
  { h: 'ravi.data',    bio: 'analytics, onchain data',           skills: ['data'] },
  { h: 'amara.gov',    bio: 'DAO steward',                       skills: ['governance'] },
  { h: 'juno.fresh',   bio: 'new joiner, learning the ropes',    skills: [] },
  { h: 'priya.ml',     bio: 'applied ML, agents',                skills: ['ml'] },
  { h: 'deji.node',    bio: 'validator ops',                     skills: ['infra'] },
  { h: 'wren.write',   bio: 'docs + technical writing',          skills: ['writing'] },
  { h: 'zo.spark',     bio: 'early contributor',                 skills: [] }
];

// directed vouches (from -> to, stake in CNPY, skill). High-trust hubs: mara, kai, noor.
const VOUCHES: [number, number, number, string][] = [
  [1, 0, 12, 'consensus'], [2, 0, 10, 'mechdesign'], [3, 0, 8, 'infra'], [4, 0, 9, 'audit'],
  [0, 1, 10, 'react'], [2, 1, 7, 'd3'], [3, 1, 6, 'typescript'], [6, 1, 5, 'design'],
  [0, 2, 9, 'governance'], [1, 2, 6, 'mechdesign'], [8, 2, 7, 'governance'],
  [0, 3, 6, 'infra'], [1, 3, 5, 'typescript'], [11, 3, 4, 'infra'],
  [0, 4, 5, 'audit'], [3, 4, 4, 'fuzzing'],
  [1, 5, 3, 'devrel'], [6, 5, 3, 'devrel'],
  [1, 6, 6, 'design'], [3, 6, 4, 'design'],
  [3, 7, 4, 'data'], [10, 7, 3, 'data'],
  [2, 8, 6, 'governance'], [5, 8, 3, 'governance'],
  [5, 9, 2, 'devrel'], [3, 9, 2, 'typescript'],          // juno: vouched by mid-trust only
  [3, 10, 4, 'ml'], [7, 10, 3, 'data'],
  [3, 11, 4, 'infra'], [0, 11, 5, 'consensus'],
  [5, 12, 3, 'writing'], [2, 12, 3, 'writing'],
  [9, 13, 1, 'react']                                     // zo: vouched only by fresh juno -> low recursive trust
];

async function main() {
  console.log('LOOM seed starting ->', QUERY_RPC);
  if (!VALIDATOR_ADDRESS) throw new Error('Set VALIDATOR_ADDRESS=<hex> (run `canopy admin ks` to find it).');
  const validator = await getKey(VALIDATOR_ADDRESS, VALIDATOR_PASSWORD);
  console.log('validator funded balance:', (await balance(VALIDATOR_ADDRESS)).toString());

  // 1. create + fund identity keys
  const keys: KeyGroup[] = [];
  for (let i = 0; i < PEOPLE.length; i++) {
    const addr = await newKey(`loom-${i}-${randomBytes(2).toString('hex')}`);
    keys.push(await getKey(addr, PASSWORD));
  }
  console.log('created', keys.length, 'identity keys. funding...');
  for (const k of keys) {
    await send(validator, 'send', { fromAddress: validator.address, toAddress: k.address, amount: Number(FUND_PER_IDENTITY) });
  }
  // wait until everyone is funded
  for (let tries = 0; tries < 20; tries++) {
    const bals = await Promise.all(keys.map((k) => balance(k.address)));
    if (bals.every((b) => b > 0n)) break;
    await sleep(2000);
  }
  console.log('all identities funded.');

  // 2. register identities
  for (let i = 0; i < keys.length; i++) {
    await send(keys[i], 'register_identity', { authorAddress: hexToB64(keys[i].address), handle: PEOPLE[i].h, bio: PEOPLE[i].bio });
  }
  await waitBlocks(2);
  console.log('registered', keys.length, 'identities.');

  // 3. weave the trust graph (staked vouches)
  for (const [from, to, cnpy, skill] of VOUCHES) {
    await send(keys[from], 'weave_thread', {
      fromAddress: hexToB64(keys[from].address), toAddress: hexToB64(keys[to].address),
      stakeAmount: cnpy * uCNPY, skillTag: skill
    });
  }
  await waitBlocks(2);
  console.log('wove', VOUCHES.length, 'threads. trust recomputed on-chain.');

  // 4. skill endorsements (weight snapshots endorser recursive trust)
  for (let i = 0; i < PEOPLE.length; i++) {
    for (const skill of PEOPLE[i].skills.slice(0, 2)) {
      const endorser = keys[(i + 1) % keys.length];
      await send(endorser, 'endorse_skill', { fromAddress: hexToB64(endorser.address), toAddress: hexToB64(keys[i].address), skill });
    }
  }
  await waitBlocks(1);
  console.log('endorsements posted.');

  // 5. guild + quest + proof + attestation loop
  const guildName = 'Weavers Guild';
  await send(keys[0], 'form_guild', { creatorAddress: hexToB64(keys[0].address), name: guildName, description: 'Builders maintaining the trust graph.', minTrust: 800000 });
  await waitBlocks(2);
  const guildId = 1; // first guild
  for (const j of [1, 2, 3, 4, 6]) {
    await send(keys[j], 'join_guild', { memberAddress: hexToB64(keys[j].address), guildId });
  }
  await waitBlocks(2);
  await send(keys[0], 'post_quest', { authorAddress: hexToB64(keys[0].address), guildId, title: 'Ship the live force-graph view', description: 'Render the trust topology with animated edges.', reward: 25 * uCNPY });
  await waitBlocks(2);
  const questId = 1;
  await send(keys[1], 'submit_proof', { authorAddress: hexToB64(keys[1].address), questId, proofUri: 'https://github.com/0xkinno/loom/pull/12' });
  await waitBlocks(2);
  await send(keys[0], 'attest_contribution', { reviewerAddress: hexToB64(keys[0].address), proofId: 1, approved: true });
  await waitBlocks(2);
  console.log('guild quest loop complete (attested).');

  // 6. trust-weighted governance
  const proposalId = 'loom-prop-1';
  const votes: [number, boolean][] = [[0, true], [1, true], [2, true], [3, false], [4, true], [8, true], [9, false], [13, false]];
  for (const [i, choice] of votes) {
    await send(keys[i], 'cast_weighted_vote', { voterAddress: hexToB64(keys[i].address), proposalId, title: 'Launch LOOM trust scores on mainnet', choice });
  }
  await waitBlocks(2);
  console.log('governance proposal seeded with trust-weighted votes.');

  console.log('\nDONE. Verify:');
  console.log(`  curl ${process.env.LOOM_RPC || 'http://localhost:50010'}/v1/loom/graph | jq '.stats'`);
}

main().catch((e) => { console.error('seed failed:', e); process.exit(1); });
