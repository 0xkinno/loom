import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import { Plugin, PLUGIN_BUILD } from './plugin.js';

// Load static graph JSON at startup — built from real on-chain seed transactions
const STATIC_PATH = path.join(path.dirname(new URL(import.meta.url).pathname), 'static_graph.json');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let GRAPH_DATA: any = null;
try {
    GRAPH_DATA = JSON.parse(fs.readFileSync(STATIC_PATH, 'utf8'));
    console.log(`LOOM static graph loaded: ${GRAPH_DATA.graph.stats.nodeCount} nodes, ${GRAPH_DATA.graph.stats.edgeCount} edges`);
} catch (e) {
    console.error(`Failed to load static graph: ${e}`);
}

function writeJSON(res: http.ServerResponse, body: unknown): void {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify(body));
}
function writeJSONError(res: http.ServerResponse, status: number, message: string): void {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end(JSON.stringify({ error: message }));
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function StartRPCServer(plugin: Plugin): void {
    const addr = plugin.config.rpcAddress;
    if (!addr) { console.log('plugin RPC disabled'); return; }

    const server = http.createServer((req, res) => {
        const url = new URL(req.url || '', 'http://localhost');
        const p = url.pathname;
        const d = GRAPH_DATA;
        if (!d) return void writeJSONError(res, 503, 'graph data not loaded');

        if (p === '/v1/loom/graph') return void writeJSON(res, d.graph);
        if (p === '/v1/loom/identities') return void writeJSON(res, { identities: d.identities, count: d.identities.length });
        if (p === '/v1/loom/identity') {
            const a = url.searchParams.get('address');
            const identity = d.identities.find((i: any) => i.address === a);
            if (!identity) return void writeJSONError(res, 404, 'not found');
            const inbound = d.threads.filter((t: any) => t.to === a && t.active);
            const outbound = d.threads.filter((t: any) => t.from === a && t.active);
            return void writeJSON(res, { identity, inbound, outbound });
        }
        if (p === '/v1/loom/threads') return void writeJSON(res, { threads: d.threads, count: d.threads.length });
        if (p === '/v1/loom/endorsements') return void writeJSON(res, { endorsements: d.endorsements });
        if (p === '/v1/loom/guilds') return void writeJSON(res, { guilds: d.guilds });
        if (p === '/v1/loom/quests') return void writeJSON(res, { quests: d.quests });
        if (p === '/v1/loom/proofs') return void writeJSON(res, { proofs: d.proofs });
        if (p === '/v1/loom/proposals') return void writeJSON(res, { proposals: d.proposals });
        if (p === '/v1/loom/votes') return void writeJSON(res, { votes: d.votes });
        writeJSONError(res, 404, 'not found');
    });

    const idx = addr.lastIndexOf(':');
    const host = idx >= 0 ? addr.slice(0, idx) : '0.0.0.0';
    const port = idx >= 0 ? Number(addr.slice(idx + 1)) : Number(addr);
    server.listen(port, host, () => {
        console.log(`LOOM RPC (${PLUGIN_BUILD}) listening on ${addr} [static-graph mode]`);
    });
    server.on('error', (err) => console.error(`RPC error: ${err.message}`));
}
