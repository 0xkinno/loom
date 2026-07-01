import { useState } from 'react';
import { cnpy } from '../lib/api';

const HARDCODED = [
  {
    id: 'loom-gov-001',
    title: 'Increase minimum trust threshold for guild formation',
    yesWeight: 7220000, noWeight: 2840000, voteCount: 7,
    passing: true, createdHeight: 60,
    detail: 'Raise the minimum recursive trust required to form a guild from 0.50 to 1.00, preventing low-trust actors from creating shell guilds.'
  },
  {
    id: 'loom-gov-002',
    title: 'Enable thread staking rewards for high-trust vouchers',
    yesWeight: 5100000, noWeight: 4800000, voteCount: 9,
    passing: true, createdHeight: 72,
    detail: 'Allocate 2% of fee pool per epoch to vouchers whose staked threads remain active and whose vouchees maintain trust above 1.20.'
  },
  {
    id: 'loom-gov-003',
    title: 'Slash 20% of stake on threads broken within 10 blocks',
    yesWeight: 3200000, noWeight: 5900000, voteCount: 8,
    passing: false, createdHeight: 88,
    detail: 'Increase the penalty for breaking a thread within 10 blocks of weaving from 10% to 20%, to deter opportunistic vouching.'
  },
  {
    id: 'loom-gov-004',
    title: 'Add endorsement weight decay after 500 blocks',
    yesWeight: 6400000, noWeight: 1200000, voteCount: 5,
    passing: true, createdHeight: 104,
    detail: 'Endorsements older than 500 blocks lose 10% weight per 100 blocks, encouraging active re-endorsement of trusted peers.'
  },
];

export default function Governance() {
  const [votes, setVotes] = useState<Record<string, 'yes' | 'no'>>({});
  const [proposals, setProposals] = useState(HARDCODED.map(p => ({ ...p })));

  const [txMap, setTxMap] = useState<Record<string, string>>({});
  const castVote = (id: string, choice: 'yes' | 'no') => {
    if (votes[id]) return;
    const tx = '0x' + Array.from({length: 16}, () => Math.floor(Math.random()*16).toString(16)).join('');
    setTxMap(t => ({ ...t, [id]: tx }));
    setVotes(v => ({ ...v, [id]: choice }));
    setProposals(ps => ps.map(p => p.id !== id ? p : {
      ...p,
      yesWeight: p.yesWeight + (choice === 'yes' ? 1000000 : 0),
      noWeight: p.noWeight + (choice === 'no' ? 1000000 : 0),
      voteCount: p.voteCount + 1,
      passing: choice === 'yes'
        ? (p.yesWeight + 1000000) >= p.noWeight
        : p.yesWeight >= (p.noWeight + 1000000)
    }));
  };

  return (
    <div className="main">
      <div className="head">
        <div>
          <div className="eyebrow">Trust-weighted</div>
          <h2>Governance</h2>
          <p>Votes are weighted by recursive trust at cast time. Sybils and fresh wallets carry almost nothing — influence has to be earned through the graph.</p>
        </div>
      </div>
      <div className="body">
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {proposals.map((p) => {
            const total = p.yesWeight + p.noWeight || 1;
            const yesPct = (p.yesWeight / total) * 100;
            const voted = votes[p.id];
            return (
              <div key={p.id} className="card" style={{
                background: 'linear-gradient(155deg, rgba(14,30,20,0.97), rgba(6,14,10,0.99))',
                border: `1px solid ${p.passing ? 'rgba(78,255,160,0.2)' : 'rgba(255,92,122,0.15)'}`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                  <h3 style={{ margin: 0, fontSize: 15, lineHeight: 1.4 }}>{p.title}</h3>
                  <span className={`tag ${p.passing ? 'gold' : 'muted'}`} style={{ flexShrink: 0 }}>
                    {p.passing ? 'passing' : 'failing'}
                  </span>
                </div>
                <div className="muted mono" style={{ fontSize: 10, marginTop: 5 }}>
                  {p.id} · block {p.createdHeight} · {p.voteCount} votes
                </div>
                <div style={{ color: 'var(--text-dim)', fontSize: 12, margin: '10px 0', lineHeight: 1.5 }}>
                  {p.detail}
                </div>
                <div style={{ marginTop: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                    <span style={{ color: 'var(--thread)' }}>YES · {cnpy(p.yesWeight)} weight</span>
                    <span>{yesPct.toFixed(1)}%</span>
                  </div>
                  <div className="barwrap"><div className="bar" style={{ width: `${yesPct}%` }} /></div>
                </div>
                <div style={{ marginTop: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                    <span style={{ color: 'var(--danger)' }}>NO · {cnpy(p.noWeight)} weight</span>
                    <span>{(100 - yesPct).toFixed(1)}%</span>
                  </div>
                  <div className="barwrap"><div className="bar no" style={{ width: `${100 - yesPct}%` }} /></div>
                </div>
                <div className="muted" style={{ fontSize: 11, marginTop: 10 }}>
                  {cnpy(total)} total trust weight across {p.voteCount} casters.
                </div>
                {!voted ? (
                  <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                    <button onClick={() => castVote(p.id, 'yes')} style={{
                      flex: 1, padding: '9px 0', borderRadius: 8, border: '1px solid rgba(78,255,160,0.3)',
                      background: 'rgba(78,255,160,0.08)', color: 'var(--thread)',
                      fontFamily: 'var(--mono)', fontSize: 11, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.08em'
                    }}>✓ Vote Yes</button>
                    <button onClick={() => castVote(p.id, 'no')} style={{
                      flex: 1, padding: '9px 0', borderRadius: 8, border: '1px solid rgba(255,92,122,0.3)',
                      background: 'rgba(255,92,122,0.08)', color: 'var(--danger)',
                      fontFamily: 'var(--mono)', fontSize: 11, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.08em'
                    }}>✗ Vote No</button>
                  </div>
                ) : (
                  <div style={{ marginTop: 14, padding: '9px 14px', borderRadius: 8, textAlign: 'center',
                    background: voted === 'yes' ? 'rgba(78,255,160,0.08)' : 'rgba(255,92,122,0.08)',
                    color: voted === 'yes' ? 'var(--thread)' : 'var(--danger)',
                    fontFamily: 'var(--mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em'
                  }}>
                    ● Voted {voted.toUpperCase()} · trust weight applied
                  </div>
                )}
                {txMap[p.id] && (
                  <div style={{ marginTop: 8, fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-faint)', wordBreak: 'break-all' }}>
                    tx · <span style={{ color: 'var(--thread)', opacity: 0.7 }}>{txMap[p.id]}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
