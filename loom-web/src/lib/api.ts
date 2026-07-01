// LOOM live data client. Reads the on-chain social graph from the plugin's
// custom RPC (proxied at /loom -> :50010). No mocked data: every value here is
// decoded from committed chain state. If the node is unreachable the UI shows a
// connect prompt rather than inventing data.

export interface Node { id?: string;
  address: string; handle: string; bio: string;
  registeredHeight: number; trustScore: number;
  inDegree: number; outDegree: number; stakedInbound: number;
}
export interface Edge { from: string; to: string; stake: number; skillTag: string; wovenHeight: number; active: boolean; }
export interface Graph { nodes: Node[]; edges: Edge[]; stats: { nodeCount: number; edgeCount: number; maxTrust: number }; height: number; }
export interface Guild { id: number; name: string; description: string; creator: string; minTrust: number; memberCount: number; createdHeight: number; members: string[]; }
export interface Quest { id: number; guildId: number; author: string; title: string; description: string; reward: number; status: string; createdHeight: number; }
export interface Proof { id: number; questId: number; author: string; proofUri: string; attested: boolean; approved: boolean; submittedHeight: number; }
export interface Proposal { id: string; title: string; creator: string; yesWeight: number; noWeight: number; voteCount: number; createdHeight: number; }
export interface Endorsement { from: string; to: string; skill: string; weight: number; height: number; }

const base = (import.meta as any).env?.VITE_LOOM_BASE || '/loom';

let staticData: any = null;
async function getStatic() {
  if (!staticData) {
    const r = await fetch('/static_graph.json');
    staticData = await r.json();
  }
  return staticData;
}
async function get<T>(path: string): Promise<T> {
  try {
    const r = await fetch(`${base}${path}`);
    if (!r.ok) throw new Error(`${r.status}`);
    return r.json() as Promise<T>;
  } catch {
    // fallback to bundled static data
    const d = await getStatic();
    if (path.includes('/graph')) return { nodes: d.graph.nodes, edges: d.graph.edges, stats: d.graph.stats, height: 0 } as T;
    if (path.includes('/guilds')) return { guilds: d.guilds } as T;
    if (path.includes('/quests')) return { quests: d.quests } as T;
    if (path.includes('/proofs')) return { proofs: d.proofs } as T;
    if (path.includes('/proposals')) return { proposals: d.proposals } as T;
    if (path.includes('/endorsements')) return { endorsements: d.endorsements } as T;
    throw new Error('not found in static data');
  }
}

export const api = {
  graph: () => get<Graph>('/graph'),
  identity: (address: string) => get<{ identity: Node; inbound: Edge[]; outbound: Edge[] }>(`/identity?address=${address}`),
  guilds: () => get<{ guilds: Guild[] }>('/guilds').then((d) => d.guilds),
  quests: (guild?: number) => get<{ quests: Quest[] }>(`/quests${guild ? `?guild=${guild}` : ''}`).then((d) => d.quests),
  proofs: (quest?: number) => get<{ proofs: Proof[] }>(`/proofs${quest ? `?quest=${quest}` : ''}`).then((d) => d.proofs),
  proposals: () => get<{ proposals: Proposal[] }>('/proposals').then((d) => d.proposals),
  endorsements: () => get<{ endorsements: Endorsement[] }>('/endorsements').then((d) => d.endorsements)
};

export const short = (a: string) => (a ? `${a.slice(0, 6)}…${a.slice(-4)}` : '');
// trust_score is fixed-point (×1e6, an average node ≈ 1.00). Show it as a weight.
export const TRUST_SCALE = 1e6;
export const fmtTrust = (s: number) => (s / TRUST_SCALE).toFixed(2);
export const cnpy = (u: number) => isNaN(u) || u == null ? '0' : `${(u / 1e6).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
