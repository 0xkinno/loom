import type { Graph } from '../lib/api';

const W = 1200;
const H = 800;

// Pre-calculated positions for 14 nodes in an organic cluster layout
const FIXED_POS = [
  { x: 640, y: 200 }, // 0 mara.sol
  { x: 860, y: 280 }, // 1 kai.dev
  { x: 990, y: 420 }, // 2 noor.research
  { x: 920, y: 580 }, // 3 eze.builds
  { x: 740, y: 660 }, // 4 lin.audits
  { x: 540, y: 680 }, // 5 tobi.ops
  { x: 370, y: 600 }, // 6 sade.design
  { x: 280, y: 450 }, // 7 ren.data
  { x: 330, y: 290 }, // 8 yuki.protocol
  { x: 470, y: 180 }, // 9 juno.writes
  { x: 790, y: 420 }, // 10 ada.ml
  { x: 600, y: 380 }, // 11 cleo.infra
  { x: 660, y: 520 }, // 12 felix.writing
  { x: 500, y: 500 }, // 13 zo.react
];

export default function GraphCanvas({ graph, onSelect, selected }: {
  graph: Graph; onSelect: (a: string | null) => void; selected: string | null;
}) {
  const maxTrust = Math.max(1, ...graph.nodes.map(x => x.trustScore));

  const positions: Record<string, { x: number; y: number; r: number }> = {};
  graph.nodes.forEach((node, i) => {
    const p = FIXED_POS[i] || { x: W/2, y: H/2 };
    const r = 10 + 18 * Math.sqrt(node.trustScore / maxTrust);
    positions[node.id || (node as any).address] = { x: p.x, y: p.y, r };
  });

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      onClick={() => onSelect(null)}
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <radialGradient id="bggrad" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#0d3320" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="#040D07" stopOpacity="0"/>
        </radialGradient>
      </defs>

      <ellipse cx={W/2} cy={H/2} rx={W*0.42} ry={H*0.42} fill="url(#bggrad)"/>

      {/* edges */}
      {graph.edges.filter(e => e.active).map((e, i) => {
        const s = positions[(e as any).from || (e as any).source];
        const t = positions[(e as any).to || (e as any).target];
        if (!s || !t) return null;
        const isHot = selected && (
          (e as any).from === selected || (e as any).source === selected ||
          (e as any).to === selected || (e as any).target === selected
        );
        return (
          <line key={i} x1={s.x} y1={s.y} x2={t.x} y2={t.y}
            stroke={isHot ? '#ffffff' : '#4EFFA0'}
            strokeWidth={isHot ? 2.5 : 1}
            strokeOpacity={isHot ? 0.95 : 0.22}/>
        );
      })}

      {/* nodes */}
      {graph.nodes.map((node) => {
        const p = positions[node.id || (node as any).address];
        if (!p) return null;
        const sel = node.address === selected;
        const color = node.trustScore >= maxTrust * 0.78 ? '#FFD166' : '#4EFFA0';
        return (
          <g key={(node as any).id || (node as any).address} transform={`translate(${p.x},${p.y})`}
            style={{ cursor: 'pointer' }}
            onClick={ev => { ev.stopPropagation(); const nid = (node as any).id || (node as any).address; onSelect(nid === selected ? null : nid); }}>
            {sel && <circle r={p.r * 3.5} fill={color} fillOpacity={0.12}>
              <animate attributeName="r" values={`${p.r*3};${p.r*4};${p.r*3}`} dur="1.5s" repeatCount="indefinite"/>
              <animate attributeName="fill-opacity" values="0.12;0.04;0.12" dur="1.5s" repeatCount="indefinite"/>
            </circle>}
            <circle r={p.r * 2.8} fill={color} fillOpacity={sel ? 0.18 : 0.06}/>
            <circle r={p.r} fill={color} fillOpacity={sel ? 1 : 0.85} filter="url(#glow)"/>
            <circle r={p.r + 5} fill="none" stroke={color}
              strokeOpacity={sel ? 0.9 : 0.25} strokeWidth={sel ? 2.5 : 1}/>
            <text y={p.r + 17} textAnchor="middle"
              fontFamily="Space Mono, monospace" fontSize={11}
              fill={sel ? '#F0FAF4' : 'rgba(94,200,130,0.75)'}
              style={{ pointerEvents: 'none' }}>{node.handle}</text>
          </g>
        );
      })}
    </svg>
  );
}
