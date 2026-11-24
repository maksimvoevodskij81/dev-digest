# server insights

Append-only. Each entry: date, what, evidence (file:line). Only what is not obvious from the code.

## What Works

## What Doesn't Work
- 2026-11-24 · Editing `~/.devdigest/secrets.json` by hand does nothing until the API restarts: the secrets file is read once and cached, and `tsx watch` does not watch it; restart `pnpm dev` after a manual edit · evidence: server/src/adapters/secrets/local.ts:25 (load)

## Codebase Patterns
- 2026-11-24 · Run cost already exists in reviewer-core: `ReviewOutcome.costUsd` is OpenRouter's real `usage.cost`, falling back to the `pricing.ts` estimate; read it from the outcome, never recompute from tokens (a real run was $0.00062 vs $0.00096 estimated) · evidence: reviewer-core/src/llm/openrouter.ts:97 (usage.cost), server/src/modules/reviews/run-executor.ts:213

## Tool & Library Notes

## Decisions
- 2026-11-24 · PR list COST = the latest review, not the latest run and not the sum: "Run all agents" starts several runs within seconds and there is no batch id, so priced runs within 2 min of the newest count as one review (lab: "$ of the last run") · evidence: server/src/modules/pulls/run-cost.ts:9 (latestReviewCost)

## Recurring Errors & Fixes
- 2026-11-24 · `*.it.test.ts` fails with "Could not find a working container runtime strategy" although `docker` works: Docker here is Colima, with no /var/run/docker.sock. Run with `DOCKER_HOST=unix://$HOME/.colima/default/docker.sock TESTCONTAINERS_DOCKER_SOCKET_OVERRIDE=/var/run/docker.sock TESTCONTAINERS_RYUK_DISABLED=true pnpm exec vitest run .it.test` · evidence: server/test/helpers/pg.ts:36 (PostgreSqlContainer)

## Session Notes
- 2026-11-24 · L01 Run Cost Badge (cost_usd on agent_runs, migration 0010, cost in runs + PR list routes) · appended 4 entries (secrets cache, reviewer-core costUsd, latest-review decision, Colima testcontainers); unit 179/179, integration 29/29

## Open Questions
- 2026-11-24 · The course branch `lesson-1-lab/run-cost` has its own migration 0010 (`0010_solid_baron_zemo`) for the same column; merging course lab branches into this fork will conflict with our `0010_high_magdalene` — decide before pulling later lab branches · evidence: server/src/db/migrations/0010_high_magdalene.sql:1
