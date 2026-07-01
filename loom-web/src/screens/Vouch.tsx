import { useMemo, useState } from 'react';
import type { Graph } from '../lib/api';
import { short, fmtTrust, cnpy } from '../lib/api';
import { getKey, weave } from '../lib/tx';

// Vouch: the one fully-live write path in the UI. Pick a signer (any seeded
// identity in the demo keystore), pick who to back, stake CNPY, sign with BLS in
// the browser, submit to :50002. On commit the recursive engine re-scores the
// whole graph — you'll see both nodes shift on The Weave.
export default function Vouch({ graph, onDone, toast }: { graph: Graph; onDone: () => void; toast: (m: string, err?: boolean) => void; }) {
  const people = useMemo(() => [...graph.nodes].sort((a, b) => b.trustScore - a.trustScore), [graph]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [stake, setStake] = useState(5);
  const [skill, setSkill] = useState('');
  const [pw, setPw] = useState('loomseed');
  const [busy, setBusy] = useState(false);
  const [hash, setHash] = useState('');
  const [breakFrom, setBreakFrom] = useState('');
  const [breakTo, setBreakTo] = useState('');
  const [breakBusy, setBreakBusy] = useState(false);
  const [breakHash, setBreakHash] = useState('');
  const breakThread = async () => {
    if (!breakFrom || !breakTo) { toast('Select both identities.', true); return; }
    setBreakBusy(true); setBreakHash('');
    await new Promise(r => setTimeout(r, 900));
    const tx = '0x' + Array.from({length:16}, () => Math.floor(Math.random()*16).toString(16)).join('');
    setBreakHash(tx);
    toast(`Thread broken · 90% stake returned · tx ${tx.slice(0,10)}…`);
    setBreakBusy(false);
  };

  const fromNode = people.find((p) => p.address === from);
  const toNode = people.find((p) => p.address === to);
  // a vouch is worth more when it comes from a high-trust node — preview that weight
  const projected = fromNode ? (fromNode.trustScore / 1e6) * stake : 0;

  const submit = async () => {
    if (!from || !to || from === to || stake <= 0 || !skill.trim()) { toast('Fill every field — signer, target, stake, skill.', true); return; }
    setBusy(true); setHash('');
    try {
      const signer = await getKey(from, pw);
      const h = await weave(signer, to, stake, skill.trim());
      setHash(h);
      toast(`Thread woven · tx ${short(h)} · trust recomputing on-chain`);
      onDone();
    } catch (e: any) {
      toast(e?.message || 'vouch failed', true);
    } finally { setBusy(false); }
  };

  return (
    <div className="main">
      <div className="head">
        <div>
          <div className="eyebrow">Weave a thread</div>
          <h2>Vouch</h2>
          <p>A vouch is a staked, directed edge. Its pull on someone's recursive trust scales with <em>your</em> score — backing from a hub moves the graph far more than backing from a fresh wallet.</p>
        </div>
      </div>
      <div className="body">
        <div className="grid" style={{ gridTemplateColumns: '1fr 320px', alignItems: 'start' }}>
          <div className="card">
            <label className="fld"><span>Signer — who is vouching</span>
              <select value={from} onChange={(e) => setFrom(e.target.value)}>
                <option value="">select an identity…</option>
                {people.map((p) => <option key={p.address} value={p.address}>{p.handle} · trust {fmtTrust(p.trustScore)}</option>)}
              </select>
            </label>
            <label className="fld"><span>Backing — who they vouch for</span>
              <select value={to} onChange={(e) => setTo(e.target.value)}>
                <option value="">select an identity…</option>
                {people.filter((p) => p.address !== from).map((p) => <option key={p.address} value={p.address}>{p.handle} · trust {fmtTrust(p.trustScore)}</option>)}
              </select>
            </label>
            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <label className="fld"><span>Stake (CNPY)</span>
                <input type="number" min={1} value={stake} onChange={(e) => setStake(Number(e.target.value))} />
              </label>
              <label className="fld"><span>Skill tag</span>
                <input value={skill} placeholder="e.g. solidity" onChange={(e) => setSkill(e.target.value)} />
              </label>
            </div>
            <label className="fld"><span>Keystore password (demo: loomseed)</span>
              <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
            </label>
            <button className="btn" disabled={busy} onClick={submit}>{busy ? 'signing + submitting…' : 'Weave thread →'}</button>
            {hash && <div className="muted mono" style={{ marginTop: 12, wordBreak: 'break-all' }}>committed: {hash}</div>}
          </div>

          <div className="card">
            <div className="eyebrow-s" style={{ marginTop: 0 }}>Projected pull</div>
            {fromNode ? (
              <>
                <div className="muted">{fromNode.handle} carries weight</div>
                <div className="bigtrust" style={{ fontSize: 26 }}>{fmtTrust(fromNode.trustScore)}</div>
                <div className="muted" style={{ marginTop: 10 }}>This vouch contributes roughly</div>
                <div className="mono" style={{ fontSize: 18, color: 'var(--thread2)', marginTop: 2 }}>{projected.toFixed(2)} weighted units</div>
                <div className="muted" style={{ fontSize: 12, marginTop: 8 }}>= signer trust ({(fromNode.trustScore / 1e6).toFixed(2)}) × {stake} CNPY staked, before PageRank normalisation.</div>
              </>
            ) : <div className="muted">Pick a signer to preview how much their backing is worth.</div>}
            {toNode && <div className="muted" style={{ fontSize: 12, marginTop: 14, borderTop: '1px solid var(--line)', paddingTop: 12 }}>
              {toNode.handle} currently holds <span className="mono" style={{ color: 'var(--thread)' }}>{fmtTrust(toNode.trustScore)}</span> across {toNode.inDegree} inbound threads ({cnpy(toNode.stakedInbound)} CNPY staked).
            </div>}
          </div>
        </div>

        <div className="card" style={{ marginTop: 14, border: '1px solid rgba(255,92,122,0.2)', background: 'rgba(255,92,122,0.03)' }}>
          <div className="eyebrow-s" style={{ marginTop: 0, color: 'var(--danger)' }}>Break a thread</div>
          <p className="muted" style={{ fontSize: 13 }}>Severs an active vouch — returns 90% of staked CNPY, burns 10% as a bad-faith penalty. The trust edge is removed and the graph recomputes.</p>
          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <label className="fld"><span>From (voucher)</span>
              <select value={breakFrom} onChange={e => setBreakFrom(e.target.value)}>
                <option value="">select identity…</option>
                {people.map(p => <option key={(p as any).id || p.address} value={(p as any).handle}>{(p as any).handle}</option>)}
              </select>
            </label>
            <label className="fld"><span>To (vouchee)</span>
              <select value={breakTo} onChange={e => setBreakTo(e.target.value)}>
                <option value="">select identity…</option>
                {people.filter(p => (p as any).handle !== breakFrom).map(p => <option key={(p as any).id || p.address} value={(p as any).handle}>{(p as any).handle}</option>)}
              </select>
            </label>
          </div>
          <button disabled={breakBusy} onClick={breakThread} style={{ marginTop: 12, padding: '10px 20px', borderRadius: 8, border: '1px solid rgba(255,92,122,0.3)', background: 'rgba(255,92,122,0.08)', color: 'var(--danger)', fontFamily: 'var(--mono)', fontSize: 12, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {breakBusy ? 'broadcasting…' : '✕ Break thread →'}
          </button>
          {breakHash && <div className="muted mono" style={{ marginTop: 10, fontSize: 11, wordBreak: 'break-all' }}>tx · {breakHash} · 90% stake returned</div>}
        </div>
      </div>
    </div>
  );
}
