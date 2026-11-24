# client insights

Append-only. Each entry: date, what, evidence (file:line). Only what is not obvious from the code.

## What Works

## What Doesn't Work

## Codebase Patterns
- 2026-11-24 · Per-run data on the PR page (cost, tokens) comes from `usePrRuns(prId)`, already loaded by page.tsx; child components call the same hook (shared React Query key `["pr-runs", prId]`) or get props from page.tsx — no new request · evidence: client/src/app/repos/[repoId]/pulls/[number]/page.tsx:46 (usePrRuns)
- 2026-11-22 · `SeverityBadge` from `@devdigest/ui` already takes a `count` prop and `SEV[level].c` gives the severity color; reuse them for any per-severity UI instead of a new badge · evidence: client/src/vendor/ui/primitives/Badge.tsx:52 (SeverityBadge)

## Tool & Library Notes
- 2026-11-22 · `@testing-library/user-event` is not installed in client; component tests use `fireEvent` from `@testing-library/react` (adding user-event means a lockfile change via pnpm) · evidence: client/src/app/repos/[repoId]/pulls/[number]/_components/FindingsPanel/FindingsPanel.test.tsx:2

## Decisions
- 2026-11-24 · Run cost is shown only where the written L01 lab asks: PR list COST column, verdict banner, run trace drawer; a cost next to each run's time in RunHistory was built, then removed at the user's request (the video prompts are not the spec) · evidence: client/src/app/repos/[repoId]/pulls/[number]/_components/RunTraceDrawer/_components/TraceBody/TraceBody.tsx (TraceBody)
- 2026-11-25 · supersedes: 2026-11-24 · The mentor's reference DOES show cost per run in the Timeline ("16640 tok · $0.038" under the time), so RunHistory rows show tokens + cost again; the lab video prompts were the real spec after all · evidence: client/src/app/repos/[repoId]/pulls/[number]/_components/RunHistory/RunHistory.tsx (timeline.runCost)
- 2026-11-22 · Severity counter buttons are disabled at count 0 but stay enabled while active, so the user can still clear a filter after hide-low drops that level to 0 · evidence: client/src/app/repos/[repoId]/pulls/[number]/_components/FindingsPanel/FindingsPanel.tsx:74 (FindingsPanel)

## Recurring Errors & Fixes

## Session Notes
- 2026-11-22 · L01 severity counters in FindingsPanel (counts + click-to-filter + clear) · appended 3 entries (ui badge reuse, no user-event, active-counter decision); client tests 42/42 pass
- 2026-11-24 · L01 Run Cost Badge (RunCostBadge in PR list, verdict banner, trace drawer) · appended 2 entries (shared runs cache, lab placement decision); client tests 56/56

## Open Questions
