# LOOM — submission content

## One-line pitch
LOOM turns reputation into a living shape — a stake-weighted recursive trust graph computed on-chain, where the value of a vouch scales with the voucher's own earned trust.

## Short description (DoraHacks)
LOOM is a SocialFi protocol on Canopy where trust is recursive. A vouch (`WEAVE_THREAD`) is a staked, directed edge — and its pull on your reputation scales with the *voucher's* own recursive trust, computed live on-chain as a stake-weighted PageRank over the whole identity graph. Backing from a hub moves you far more than backing from a fresh wallet, and Sybils get nowhere because trust has to flow in from already-trusted nodes. The homepage is the live force-directed graph itself. Ten custom transaction types power identities, staked vouches, skill endorsements, trust-gated guilds, a quest→proof→attestation reputation loop, and trust-weighted governance — all against a local Canopy chain with zero mocked data.

## Why it fits the theme (SocialFi)
Social capital with real stake behind it, and a trust primitive that's composable: guild gates, governance weight, and reputation threads all read the same on-chain recursive score. Trust isn't a number you self-assign — it's a shape the network draws around you.

## Tech
- **Chain:** local Canopy node, TypeScript plugin template.
- **Custom tx types (10):** REGISTER_IDENTITY, WEAVE_THREAD, BREAK_THREAD, ENDORSE_SKILL, FORM_GUILD, JOIN_GUILD, POST_QUEST, SUBMIT_PROOF, ATTEST_CONTRIBUTION, CAST_WEIGHTED_VOTE.
- **Trust engine:** fixed-point stake-weighted PageRank (damping 0.85, 40 iters, dangling redistribution), recomputed inside async deliver handlers and written to chain state.
- **Custom read RPC** at `:50010/v1/loom/*` (graph, identity, threads, endorsements, guilds, quests, proofs, proposals, votes).
- **Frontend:** Vite + React + TS, d3-force live graph, in-browser BLS tx signing (@noble/curves) for live vouches.
- **Seed:** real BLS-signed transactions only — no mocks.

## Repo layout
- `loom-plugin/` — modified Canopy TS template (4 drop-in files)
- `loom-seed/` — on-chain graph seeder (real signed txs)
- `loom-web/` — frontend
- `README.md` — full local runbook

## Links to fill in before posting
- GitHub: `github.com/0xkinno/loom` (push this package)
- Demo video: <link>
- Discord build channel: #1445423487106809918
