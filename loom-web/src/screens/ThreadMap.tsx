import { useState } from 'react';
import { fmtTrust, cnpy } from '../lib/api';
import type { Graph } from '../lib/api';

const THREAD_DATA: Record<string, {
  inbound: { from: string; skill: string; stake: number; trust: number }[];
  outbound: { to: string; skill: string; stake: number }[];
}> = {
  'mara.sol':      { inbound: [{ from: 'lin.audits', skill: 'consensus', stake: 5000000, trust: 1480000 }, { from: 'cleo.infra', skill: 'solidity', stake: 3000000, trust: 1360000 }], outbound: [{ to: 'kai.dev', skill: 'react', stake: 5000000 }, { to: 'noor.research', skill: 'mechdesign', stake: 5000000 }, { to: 'eze.builds', skill: 'typescript', stake: 5000000 }, { to: 'lin.audits', skill: 'audit', stake: 5000000 }, { to: 'cleo.infra', skill: 'consensus', stake: 5000000 }] },
  'kai.dev':       { inbound: [{ from: 'mara.sol', skill: 'react', stake: 5000000, trust: 1420000 }, { from: 'noor.research', skill: 'd3', stake: 4000000, trust: 1540000 }], outbound: [{ to: 'eze.builds', skill: 'infra', stake: 5000000 }, { to: 'noor.research', skill: 'governance', stake: 5000000 }] },
  'noor.research': { inbound: [{ from: 'mara.sol', skill: 'mechdesign', stake: 5000000, trust: 1420000 }, { from: 'kai.dev', skill: 'governance', stake: 5000000, trust: 1300000 }, { from: 'eze.builds', skill: 'typescript', stake: 4000000, trust: 1480000 }, { from: 'felix.writing', skill: 'governance', stake: 3000000, trust: 1240000 }], outbound: [{ to: 'eze.builds', skill: 'typescript', stake: 5000000 }, { to: 'lin.audits', skill: 'fuzzing', stake: 5000000 }, { to: 'yuki.protocol', skill: 'consensus', stake: 5000000 }] },
  'eze.builds':    { inbound: [{ from: 'mara.sol', skill: 'typescript', stake: 5000000, trust: 1420000 }, { from: 'kai.dev', skill: 'infra', stake: 5000000, trust: 1300000 }, { from: 'noor.research', skill: 'typescript', stake: 5000000, trust: 1540000 }], outbound: [{ to: 'lin.audits', skill: 'audit', stake: 5000000 }, { to: 'tobi.ops', skill: 'devrel', stake: 5000000 }, { to: 'ada.ml', skill: 'ml', stake: 5000000 }] },
  'lin.audits':    { inbound: [{ from: 'mara.sol', skill: 'audit', stake: 5000000, trust: 1420000 }, { from: 'noor.research', skill: 'fuzzing', stake: 5000000, trust: 1540000 }, { from: 'eze.builds', skill: 'audit', stake: 5000000, trust: 1480000 }], outbound: [{ to: 'tobi.ops', skill: 'devrel', stake: 5000000 }, { to: 'sade.design', skill: 'design', stake: 5000000 }] },
  'tobi.ops':      { inbound: [{ from: 'eze.builds', skill: 'devrel', stake: 5000000, trust: 1480000 }, { from: 'lin.audits', skill: 'devrel', stake: 5000000, trust: 1480000 }, { from: 'yuki.protocol', skill: 'consensus', stake: 4000000, trust: 1600000 }], outbound: [{ to: 'sade.design', skill: 'design', stake: 5000000 }, { to: 'ren.data', skill: 'data', stake: 5000000 }, { to: 'yuki.protocol', skill: 'consensus', stake: 4000000 }] },
  'sade.design':   { inbound: [{ from: 'lin.audits', skill: 'design', stake: 5000000, trust: 1480000 }, { from: 'tobi.ops', skill: 'design', stake: 5000000, trust: 1180000 }], outbound: [{ to: 'ren.data', skill: 'ml', stake: 5000000 }, { to: 'yuki.protocol', skill: 'consensus', stake: 5000000 }] },
  'ren.data':      { inbound: [{ from: 'tobi.ops', skill: 'data', stake: 5000000, trust: 1180000 }, { from: 'sade.design', skill: 'ml', stake: 5000000, trust: 1060000 }], outbound: [{ to: 'yuki.protocol', skill: 'p2p', stake: 5000000 }, { to: 'juno.writes', skill: 'writing', stake: 5000000 }] },
  'yuki.protocol': { inbound: [{ from: 'sade.design', skill: 'consensus', stake: 5000000, trust: 1060000 }, { from: 'ren.data', skill: 'p2p', stake: 5000000, trust: 1120000 }, { from: 'tobi.ops', skill: 'consensus', stake: 4000000, trust: 1180000 }], outbound: [{ to: 'juno.writes', skill: 'writing', stake: 5000000 }, { to: 'ada.ml', skill: 'ml', stake: 5000000 }] },
  'juno.writes':   { inbound: [{ from: 'ren.data', skill: 'writing', stake: 5000000, trust: 1120000 }, { from: 'yuki.protocol', skill: 'writing', stake: 5000000, trust: 1600000 }, { from: 'ada.ml', skill: 'zk', stake: 3000000, trust: 1360000 }], outbound: [{ to: 'ada.ml', skill: 'zk', stake: 5000000 }, { to: 'cleo.infra', skill: 'infra', stake: 5000000 }] },
  'ada.ml':        { inbound: [{ from: 'yuki.protocol', skill: 'ml', stake: 5000000, trust: 1600000 }, { from: 'juno.writes', skill: 'zk', stake: 5000000, trust: 1480000 }, { from: 'eze.builds', skill: 'ml', stake: 5000000, trust: 1480000 }], outbound: [{ to: 'cleo.infra', skill: 'devops', stake: 5000000 }, { to: 'felix.writing', skill: 'writing', stake: 5000000 }] },
  'cleo.infra':    { inbound: [{ from: 'juno.writes', skill: 'infra', stake: 5000000, trust: 1480000 }, { from: 'ada.ml', skill: 'devops', stake: 5000000, trust: 1360000 }, { from: 'mara.sol', skill: 'consensus', stake: 5000000, trust: 1420000 }], outbound: [{ to: 'felix.writing', skill: 'writing', stake: 5000000 }, { to: 'mara.sol', skill: 'solidity', stake: 3000000 }] },
  'felix.writing': { inbound: [{ from: 'ada.ml', skill: 'writing', stake: 5000000, trust: 1360000 }, { from: 'cleo.infra', skill: 'writing', stake: 5000000, trust: 1360000 }, { from: 'noor.research', skill: 'governance', stake: 3000000, trust: 1540000 }], outbound: [{ to: 'zo.react', skill: 'react', stake: 5000000 }, { to: 'noor.research', skill: 'governance', stake: 3000000 }] },
  'zo.react':      { inbound: [{ from: 'felix.writing', skill: 'react', stake: 5000000, trust: 1240000 }], outbound: [] },
};

export default function ThreadMap({ graph }: { graph: Graph }) {
  const people = [...graph.nodes].sort((a, b) => b.trustScore - a.trustScore);
  const [handle, setHandle] = useState((people[0] as any)?.handle || 'mara.sol');
  const me = people.find(p => (p as any).handle === handle);
  const data = THREAD_DATA[handle] || { inbound: [], outbound: [] };
  const totalWeight = data.inbound.reduce((s, t) => s + (t.trust / 1e6) * (t.stake / 1e6), 0) || 1;
  const stakedInbound = data.inbound.reduce((s, t) => s + t.stake, 0);

  return (
    <div className="main">
      <div className="head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="eyebrow">Personal subgraph</div>
          <h2>My Thread Map</h2>
          <p>See exactly which threads hold any identity up — and how each backer's standing amplifies their vouch.</p>
        </div>
        <select style={{ width: 280, flexShrink: 0 }} value={handle} onChange={e => setHandle(e.target.value)}>
          {people.map(p => <option key={(p as any).handle} value={(p as any).handle}>{(p as any).handle} · trust {fmtTrust(p.trustScore)}</option>)}
        </select>
      </div>
      <div className="body">
        {me && (
          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', alignItems: 'start', gap: 14 }}>
            <div className="card" style={{ background: 'linear-gradient(155deg, rgba(20,40,28,0.95), rgba(10,22,14,0.98))', border: '1px solid rgba(78,255,160,0.22)' }}>
              <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 22 }}>{(me as any).handle}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-faint)', marginTop: 3 }}>{((me as any).id || '').slice(0,8)}...{((me as any).id || '').slice(-6)}</div>
              <div style={{ fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 40, color: me.trustScore >= graph.stats.maxTrust * 0.78 ? 'var(--gold)' : 'var(--thread)', letterSpacing: '-0.03em', marginTop: 14, lineHeight: 1 }}>
                {fmtTrust(me.trustScore)}
              </div>
              <div style={{ color: 'var(--text-faint)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 4 }}>recursive trust weight</div>
              <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                {[{ v: String(data.inbound.length), l: 'backers' }, { v: String(data.outbound.length), l: 'backing' }, { v: cnpy(stakedInbound), l: 'CNPY staked' }].map(({ v, l }) => (
                  <div key={l} style={{ flex: 1, border: '1px solid var(--line)', borderRadius: 9, padding: '10px 12px', background: 'rgba(0,0,0,0.3)' }}>
                    <div style={{ fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 18, color: 'var(--text)' }}>{v}</div>
                    <div style={{ fontSize: 9, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 3 }}>{l}</div>
                  </div>
                ))}
              </div>
              <div style={{ color: 'var(--text-dim)', fontSize: 13, marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--line)', lineHeight: 1.6 }}>{me.bio}</div>
            </div>

            <div className="card">
              <div className="eyebrow-s" style={{ marginTop: 0 }}>Where the trust comes from</div>
              {data.inbound.length ? data.inbound.map((t, i) => {
                const w = (t.trust / 1e6) * (t.stake / 1e6);
                return (
                  <div key={i} style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 5 }}>
                      <span style={{ fontWeight: 600 }}>{t.from} <span className="tag muted">{t.skill}</span></span>
                      <span style={{ fontFamily: 'var(--mono)', color: 'var(--thread2)', fontWeight: 700 }}>{((w / totalWeight) * 100).toFixed(0)}%</span>
                    </div>
                    <div className="barwrap"><div className="bar" style={{ width: `${(w / totalWeight) * 100}%` }} /></div>
                    <div className="muted" style={{ fontSize: 11, marginTop: 4 }}>voucher trust {(t.trust / 1e6).toFixed(2)} × {cnpy(t.stake)} CNPY staked</div>
                  </div>
                );
              }) : <div className="muted">No inbound threads yet — base trust only.</div>}
            </div>

            <div className="card">
              <div className="eyebrow-s" style={{ marginTop: 0 }}>Inbound threads ({data.inbound.length})</div>
              {data.inbound.length ? data.inbound.map((t, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '8px 0', borderBottom: '1px solid var(--line)' }}>
                  <span><span style={{ fontWeight: 600 }}>{t.from}</span> <span style={{ color: 'var(--text-dim)' }}>→ {handle}</span></span>
                  <span style={{ fontFamily: 'var(--mono)', color: 'var(--text-dim)', fontSize: 11 }}>{cnpy(t.stake)} · <span className="tag" style={{ fontSize: 9 }}>{t.skill}</span></span>
                </div>
              )) : <div className="muted">No inbound threads.</div>}
            </div>

            <div className="card">
              <div className="eyebrow-s" style={{ marginTop: 0 }}>Outbound threads ({data.outbound.length})</div>
              {data.outbound.length ? data.outbound.map((t, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '8px 0', borderBottom: '1px solid var(--line)' }}>
                  <span><span style={{ color: 'var(--text-dim)' }}>{handle} →</span> <span style={{ fontWeight: 600 }}>{t.to}</span></span>
                  <span style={{ fontFamily: 'var(--mono)', color: 'var(--text-dim)', fontSize: 11 }}>{cnpy(t.stake)} · <span className="tag" style={{ fontSize: 9 }}>{t.skill}</span></span>
                </div>
              )) : <div className="muted">No outbound threads.</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
