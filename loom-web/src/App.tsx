import { useCallback, useEffect, useRef, useState } from 'react';
import { api } from './lib/api';
import type { Graph } from './lib/api';
import Weave from './screens/Weave';
import Vouch from './screens/Vouch';
import Guilds from './screens/Guilds';
import ThreadMap from './screens/ThreadMap';
import Governance from './screens/Governance';

type Screen = 'weave' | 'vouch' | 'guilds' | 'threadmap' | 'governance';
const NAV: { id: Screen; label: string }[] = [
  { id: 'weave', label: 'The Weave' },
  { id: 'vouch', label: 'Vouch' },
  { id: 'guilds', label: 'Guilds' },
  { id: 'threadmap', label: 'My Thread Map' },
  { id: 'governance', label: 'Governance' }
];

function useGraph(pollMs = 6000) {
  const [graph, setGraph] = useState<Graph | null>(null);
  const [online, setOnline] = useState<boolean | null>(null);
  const load = useCallback(async () => {
    try { const g = await api.graph(); setGraph(g); setOnline(true); return g; }
    catch { setOnline(false); return null; }
  }, []);
  useEffect(() => {
    load();
    const t = setInterval(load, pollMs);
    return () => clearInterval(t);
  }, [load, pollMs]);
  return { graph, online, reload: load };
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('weave');
  const [selected, setSelected] = useState<string | null>(null);
  const { graph, online, reload } = useGraph();
  const [toast, setToast] = useState<{ m: string; err?: boolean } | null>(null);
  const toastTimer = useRef<number | null>(null);
  const [wallet, setWallet] = useState<string | null>(null);
  const connectWallet = async () => {
    if (wallet) { setWallet(null); return; }
    const eth = (window as any).ethereum;
    if (!eth) { alert('No wallet detected. Install MetaMask or Rabby.'); return; }
    try {
      const accounts = await eth.request({ method: 'eth_requestAccounts' });
      if (accounts[0]) setWallet(accounts[0].slice(0,6) + '...' + accounts[0].slice(-4));
    } catch { setWallet(null); }
  };

  const showToast = useCallback((m: string, err?: boolean) => {
    setToast({ m, err });
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 4200);
  }, []);

  return (
    <div className="app">
      <aside className="rail">
        <div className="brand">
          <span className="dot" />
          <div>
            <h1>LOOM</h1>
            <small>recursive trust</small>
          </div>
        </div>
        {NAV.map((nv, i) => (
          <div key={nv.id} className={`navitem${screen === nv.id ? ' active' : ''}`} onClick={() => setScreen(nv.id)}>
            <span className="ix">{String(i + 1).padStart(2, '0')}</span>{nv.label}
          </div>
        ))}
        <div className="spacer" />
        <div
          onClick={connectWallet}
          style={{
            margin: '0 12px 8px', padding: '9px 14px',
            background: wallet ? 'rgba(78,255,160,0.12)' : 'rgba(78,255,160,0.06)',
            border: '1px solid rgba(78,255,160,0.25)',
            borderRadius: 10, color: 'var(--thread)', fontFamily: 'var(--mono)',
            fontSize: 10.5, textAlign: 'center', cursor: 'pointer',
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
          {wallet ? `● ${wallet}` : '⬡ Connect Wallet'}
        </div>
        <a href="https://testnet.app.canopynetwork.org/faucet" target="_blank" rel="noreferrer"
          style={{
            display: 'block', margin: '0 12px 10px', padding: '9px 14px',
            background: 'rgba(78,255,160,0.08)', border: '1px solid rgba(78,255,160,0.2)',
            borderRadius: 10, color: 'var(--thread)', fontFamily: 'var(--mono)',
            fontSize: 10.5, textDecoration: 'none', textAlign: 'center',
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
          ⛽ Get testnet CNPY
        </a>
        <div className="netbox">
          <div className="row"><span>node</span><span>{online === null ? '…' : online ? <><span className="pulse" /> live</> : <><span className="pulse off" /> offline</>}</span></div>
          <div className="row"><span>height</span><span>{graph?.height ?? '—'}</span></div>
          <div className="row"><span>identities</span><span>{graph?.stats.nodeCount ?? '—'}</span></div>
          <div className="row"><span>threads</span><span>{graph?.stats.edgeCount ?? '—'}</span></div>
        </div>
      </aside>

      {!graph ? (
        <div className="main">
          <div className="empty">
            <div className="muted">connecting to the weave…</div>
          </div>
        </div>
      ) : (
        <>
          {screen === 'weave' && <Weave graph={graph} selected={selected} onSelect={setSelected} />}
          {screen === 'vouch' && <Vouch graph={graph} toast={showToast} onDone={() => setTimeout(reload, 2500)} />}
          {screen === 'guilds' && <Guilds />}
          {screen === 'threadmap' && <ThreadMap graph={graph} />}
          {screen === 'governance' && <Governance />}
        </>
      )}

      {toast && <div className={`toast${toast.err ? ' err' : ''}`}>{toast.m}</div>}
    </div>
  );
}
