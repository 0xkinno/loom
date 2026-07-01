import { useMemo } from 'react';
import GraphCanvas from '../components/GraphCanvas';
import type { Graph, Node } from '../lib/api';
import { short, fmtTrust, cnpy } from '../lib/api';

export default function Weave({ graph, selected, onSelect }: {
  graph: Graph; selected: string | null; onSelect: (a: string | null) => void;
}) {
  const node = useMemo<Node | null>(
    () => graph.nodes.find((n) => ((n as any).id || n.address) === selected) || null,
    [graph, selected]
  );
  const maxTrust = Math.max(1, graph.stats.maxTrust);
  const gold = node ? node.trustScore >= maxTrust * 0.78 : false;

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
    }}>
      {/* GRAPH fills entire canvas behind everything */}
      <GraphCanvas graph={graph} selected={selected} onSelect={onSelect} />

      {/* HERO TEXT — top-left, pointer-events:none so graph is still clickable */}
      <div style={{
        position: 'absolute', left: 40, top: 36, zIndex: 10,
        pointerEvents: 'none', maxWidth: 580,
      }}>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.24em',
          textTransform: 'uppercase', color: 'var(--thread)', marginBottom: 14,
          display: 'flex', alignItems: 'center', gap: 10, opacity: 0.85,
        }}>
          <span style={{ width: 24, height: 1, background: 'var(--thread)', display: 'inline-block' }} />
          The Weave · {graph.stats.nodeCount} identities · {graph.stats.edgeCount} threads
        </div>
        <div style={{
          fontFamily: 'var(--display)',
          fontWeight: 900,
          fontSize: 'clamp(40px, 5.5vw, 72px)',
          letterSpacing: '-0.04em',
          lineHeight: 0.95,
          textTransform: 'uppercase',
          background: 'linear-gradient(140deg, #FFFFFF 0%, #A8FFD4 45%, #4EFFA0 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 0 80px rgba(78,255,160,0.35))',
        }}>
          Trust isn&apos;t a<br />score. It&apos;s a<br />shape.
        </div>
      </div>

      {/* LEGEND — bottom */}
      <div style={{
        position: 'absolute', left: 40, bottom: 28, zIndex: 10,
        display: 'flex', gap: 18, alignItems: 'center',
        fontFamily: 'var(--mono)', fontSize: 10.5,
        color: 'rgba(78,255,160,0.55)',
        background: 'rgba(4,13,7,0.82)',
        padding: '9px 18px', borderRadius: 999,
        border: '1px solid rgba(78,255,160,0.14)',
        backdropFilter: 'blur(12px)',
      }}>
        {[
          { c: 'var(--gold)', l: 'high trust' },
          { c: 'var(--thread)', l: 'woven thread' },
          { c: 'var(--danger)', l: 'broken' },
        ].map(({ c, l }) => (
          <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{ width: 14, height: 3, background: c, borderRadius: 2, display: 'inline-block', boxShadow: `0 0 6px ${c}` }} />
            {l}
          </span>
        ))}
        <span style={{ opacity: 0.5 }}>node = trust · edge = stake</span>
      </div>

      {/* NODE DETAIL CARD */}
      {node && (
        <div style={{
          position: 'absolute', right: 28, top: 28, width: 300, zIndex: 20,
          background: 'linear-gradient(155deg, rgba(18,38,28,0.97), rgba(6,16,10,0.99))',
          border: '1px solid rgba(78,255,160,0.25)',
          borderRadius: 20, padding: 24,
          boxShadow: '0 40px 100px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
        }}>
          <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: 21, letterSpacing: '-0.02em' }}>
            {node.handle}
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text-faint)', marginTop: 4, wordBreak: 'break-all' }}>
            {short(node.address)}
          </div>
          <div style={{ color: 'var(--text-dim)', fontSize: 13, margin: '14px 0', lineHeight: 1.6, paddingTop: 14, borderTop: '1px solid var(--line)' }}>
            {node.bio || 'No bio on-chain yet.'}
          </div>
          <div style={{
            fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 38,
            color: gold ? 'var(--gold)' : 'var(--thread)',
            letterSpacing: '-0.03em', lineHeight: 1,
            textShadow: gold ? '0 0 30px rgba(255,209,102,0.5)' : '0 0 30px rgba(78,255,160,0.4)',
          }}>
            {fmtTrust(node.trustScore)}
          </div>
          <div style={{ color: 'var(--text-faint)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 4 }}>
            recursive trust weight
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            {[
              { v: String(node.inDegree), l: 'vouches in' },
              { v: String(node.outDegree), l: 'vouches out' },
              { v: cnpy(node.stakedInbound), l: 'CNPY staked' },
            ].map(({ v, l }) => (
              <div key={l} style={{ flex: 1, border: '1px solid var(--line)', borderRadius: 10, padding: '10px 12px', background: 'rgba(0,0,0,0.35)' }}>
                <div style={{ fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 16, color: 'var(--text)' }}>{v}</div>
                <div style={{ fontSize: 9, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ color: 'var(--text-faint)', fontSize: 11, marginTop: 14, lineHeight: 1.5 }}>
            Block {node.registeredHeight} · Click elsewhere to dismiss.
          </div>
        </div>
      )}
    </div>
  );
}
