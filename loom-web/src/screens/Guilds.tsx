import { useState } from 'react';
import { fmtTrust, cnpy } from '../lib/api';

const GUILDS = [
  {
    id: 1, name: 'Protocol Guild', minTrust: 1000000, memberCount: 5,
    steward: 'mara.sol',
    description: 'Core builders advancing the LOOM trust graph protocol.',
    members: ['mara.sol', 'kai.dev', 'noor.research', 'lin.audits', 'yuki.protocol'],
    quests: [
      { id: 1, title: 'Build the trust graph visualizer', reward: 10000000, status: 'attested',
        description: 'Create a force-directed d3 visualization of the LOOM trust graph with real-time updates.',
        proof: { author: 'kai.dev', uri: 'ipfs://QmLoomGraphViz', approved: true } },
      { id: 2, title: 'Write LOOM protocol specification v1', reward: 8000000, status: 'open',
        description: 'Document the full plugin ABI, tx types, trust-score algorithm, and fee model for external developers.', proof: null },
      { id: 3, title: 'Formal verification of PageRank convergence', reward: 15000000, status: 'submitted',
        description: 'Prove mathematically that the stake-weighted PageRank converges for any finite connected LOOM graph.',
        proof: { author: 'noor.research', uri: 'ipfs://QmPageRankProof', approved: false } },
    ]
  },
  {
    id: 2, name: 'Builders Collective', minTrust: 800000, memberCount: 8,
    steward: 'eze.builds',
    description: 'Fullstack engineers shipping LOOM tooling, indexers, and SDKs.',
    members: ['eze.builds', 'cleo.infra', 'ren.data', 'ada.ml', 'felix.writing', 'tobi.ops', 'zo.react', 'juno.writes'],
    quests: [
      { id: 4, title: 'Build a LOOM indexer for historical trust scores', reward: 12000000, status: 'open',
        description: 'Index all LOOM state changes from genesis and expose a REST API for trust score history per identity.', proof: null },
      { id: 5, title: 'TypeScript SDK for LOOM tx construction', reward: 7000000, status: 'open',
        description: 'Ship a typed npm package wrapping all 10 LOOM transaction types with BLS signing support.', proof: null },
    ]
  },
  {
    id: 3, name: 'Auditors Circle', minTrust: 1200000, memberCount: 3,
    steward: 'lin.audits',
    description: 'Security researchers auditing LOOM contracts and reviewing proofs before attestation.',
    members: ['lin.audits', 'mara.sol', 'noor.research'],
    quests: [
      { id: 6, title: 'Audit LOOM plugin contract v1', reward: 20000000, status: 'open',
        description: 'Full security review of all 10 tx handlers in contract.ts — check fee logic, access control, and trust recompute.', proof: null },
    ]
  },
];

export default function Guilds() {
  const [sel, setSel] = useState(1);
  const [joined, setJoined] = useState<Record<number, boolean>>({});
  const [txMap, setTxMap] = useState<Record<number, string>>({});
  const [proofModal, setProofModal] = useState<number | null>(null);
  const [proofInput, setProofInput] = useState('');
  const [proofTx, setProofTx] = useState<Record<number, string>>({});

  const active = GUILDS.find(g => g.id === sel) || GUILDS[0];

  const joinGuild = (id: number) => {
    if (joined[id]) return;
    const tx = '0x' + Array.from({length: 16}, () => Math.floor(Math.random()*16).toString(16)).join('');
    setJoined(j => ({ ...j, [id]: true }));
    setTxMap(t => ({ ...t, [id]: tx }));
  };

  return (
    <div className="main">
      <div className="head">
        <div>
          <div className="eyebrow">Trust-gated collectives</div>
          <h2>Guilds</h2>
          <p>Join requires a minimum recursive trust. Inside, quests turn into proof-of-work, and a peer attestation auto-weaves a reputation thread back to the author.</p>
        </div>
      </div>
      <div className="body">
        <div className="grid" style={{ gridTemplateColumns: '280px 1fr', alignItems: 'start', gap: 14 }}>
          <div className="grid" style={{ gap: 10 }}>
            {GUILDS.map(g => (
              <div key={g.id} className="card" style={{ cursor: 'pointer', borderColor: g.id === sel ? 'rgba(78,255,160,0.4)' : undefined, background: g.id === sel ? 'rgba(78,255,160,0.05)' : undefined }} onClick={() => setSel(g.id)}>
                <h3 style={{ margin: 0 }}>{g.name}</h3>
                <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>{g.description}</div>
                <div style={{ marginTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <span className="tag gold">min trust {fmtTrust(g.minTrust)}</span>
                  <span className="tag muted">{g.memberCount} members</span>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="card" style={{ background: 'linear-gradient(155deg, rgba(14,30,20,0.97), rgba(6,14,10,0.99))', border: '1px solid rgba(78,255,160,0.2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ margin: 0 }}>{active.name}</h3>
                  <div className="muted" style={{ marginTop: 6 }}>{active.description}</div>
                </div>
                {!joined[active.id] ? (
                  <button onClick={() => joinGuild(active.id)} style={{
                    padding: '9px 18px', borderRadius: 8, border: '1px solid rgba(78,255,160,0.3)',
                    background: 'rgba(78,255,160,0.08)', color: 'var(--thread)',
                    fontFamily: 'var(--mono)', fontSize: 11, cursor: 'pointer',
                    textTransform: 'uppercase', letterSpacing: '0.08em', flexShrink: 0
                  }}>⬡ Join Guild</button>
                ) : (
                  <span className="tag gold">● Joined</span>
                )}
              </div>
              {txMap[active.id] && (
                <div style={{ marginTop: 8, fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-faint)' }}>
                  tx · <span style={{ color: 'var(--thread)', opacity: 0.7 }}>{txMap[active.id]}</span>
                </div>
              )}
              <div style={{ display: 'flex', gap: 16, marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--line)' }}>
                {[
                  { v: fmtTrust(active.minTrust), l: 'min trust gate' },
                  { v: String(active.memberCount), l: 'members' },
                  { v: active.steward, l: 'steward' },
                ].map(({ v, l }) => (
                  <div key={l} style={{ flex: 1, borderRight: '1px solid var(--line)', paddingRight: 16 }}>
                    <div style={{ fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>{v}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 3 }}>{l}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 14, fontSize: 12, color: 'var(--text-dim)' }}>
                Members: {active.members.join(' · ')}
              </div>
            </div>

            <div className="eyebrow-s">Quests</div>
            <div className="grid" style={{ gap: 12 }}>
              {active.quests.map(q => (
                <div key={q.id} className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ margin: 0, fontSize: 15 }}>{q.title}</h3>
                    <span className={`tag ${q.status === 'attested' ? 'gold' : q.status === 'submitted' ? '' : 'muted'}`}>{q.status}</span>
                  </div>
                  <div className="muted" style={{ marginTop: 6, fontSize: 13 }}>{q.description}</div>
                  <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                    <span className="tag">reward {cnpy(q.reward)} CNPY</span>
                    <span className="tag muted">by {active.steward}</span>
                  </div>
                  {q.proof && (
                    <div className="card" style={{ marginTop: 12, background: 'rgba(0,0,0,0.3)' }}>
                      <div className="muted mono" style={{ fontSize: 11 }}>proof · {q.proof.author}</div>
                      <div className="muted" style={{ fontSize: 12, marginTop: 4, wordBreak: 'break-all' }}>{q.proof.uri}</div>
                      <div style={{ marginTop: 8 }}>
                        <span className={`tag ${q.proof.approved ? 'gold' : 'muted'}`}>
                          {q.proof.approved ? '✓ attested — reputation thread woven' : '⏳ awaiting attestation'}
                        </span>
                      </div>
                    </div>
                  )}
                  {q.status === 'open' && joined[active.id] && (
                    <button style={{
                      marginTop: 12, padding: '8px 16px', borderRadius: 8, width: '100%',
                      border: '1px solid rgba(78,255,160,0.2)', background: 'rgba(78,255,160,0.05)',
                      color: 'var(--thread)', fontFamily: 'var(--mono)', fontSize: 11,
                      cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.08em'
                    }} onClick={() => { setProofModal(q.id); setProofInput(''); }}>
                      + Submit Proof
                    </button>
                  )}
                  {proofModal === q.id && (
                    <div style={{ marginTop: 12, padding: 14, borderRadius: 10, border: '1px solid rgba(78,255,160,0.2)', background: 'rgba(0,0,0,0.4)' }}>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text-faint)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Submit proof URI (IPFS CID or URL)</div>
                      <input value={proofInput} onChange={e => setProofInput(e.target.value)} placeholder="ipfs://Qm..." style={{ width: '100%', padding: '8px 12px', borderRadius: 7, border: '1px solid rgba(78,255,160,0.2)', background: 'rgba(0,0,0,0.5)', color: 'var(--text)', fontFamily: 'var(--mono)', fontSize: 12, boxSizing: 'border-box' }} />
                      <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                        <button onClick={() => {
                          if (!proofInput) return;
                          const tx = '0x' + Array.from({length:16}, () => Math.floor(Math.random()*16).toString(16)).join('');
                          setProofTx(t => ({ ...t, [q.id]: tx }));
                          setProofModal(null);
                        }} style={{ flex: 1, padding: '8px 0', borderRadius: 7, border: '1px solid rgba(78,255,160,0.3)', background: 'rgba(78,255,160,0.1)', color: 'var(--thread)', fontFamily: 'var(--mono)', fontSize: 11, cursor: 'pointer', textTransform: 'uppercase' }}>Submit on-chain</button>
                        <button onClick={() => setProofModal(null)} style={{ padding: '8px 14px', borderRadius: 7, border: '1px solid var(--line)', background: 'transparent', color: 'var(--text-faint)', fontFamily: 'var(--mono)', fontSize: 11, cursor: 'pointer' }}>Cancel</button>
                      </div>
                    </div>
                  )}
                  {proofTx[q.id] && (
                    <div style={{ marginTop: 10, padding: '10px 12px', borderRadius: 8, background: 'rgba(78,255,160,0.06)', border: '1px solid rgba(78,255,160,0.15)' }}>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--thread)' }}>✓ proof submitted on-chain</div>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-faint)', marginTop: 4 }}>tx · {proofTx[q.id]}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
