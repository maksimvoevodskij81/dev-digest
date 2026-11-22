# client insights

Append-only. Each entry: date, what, evidence (file:line). Only what is not obvious from the code.

## What Works

## What Doesn't Work

## Codebase Patterns
- 2026-11-22 · `SeverityBadge` from `@devdigest/ui` already takes a `count` prop and `SEV[level].c` gives the severity color; reuse them for any per-severity UI instead of a new badge · evidence: client/src/vendor/ui/primitives/Badge.tsx:52 (SeverityBadge)

## Tool & Library Notes
- 2026-11-22 · `@testing-library/user-event` is not installed in client; component tests use `fireEvent` from `@testing-library/react` (adding user-event means a lockfile change via pnpm) · evidence: client/src/app/repos/[repoId]/pulls/[number]/_components/FindingsPanel/FindingsPanel.test.tsx:2

## Decisions
- 2026-11-22 · Severity counter buttons are disabled at count 0 but stay enabled while active, so the user can still clear a filter after hide-low drops that level to 0 · evidence: client/src/app/repos/[repoId]/pulls/[number]/_components/FindingsPanel/FindingsPanel.tsx:74 (FindingsPanel)

## Recurring Errors & Fixes

## Session Notes
- 2026-11-22 · L01 severity counters in FindingsPanel (counts + click-to-filter + clear) · appended 3 entries (ui badge reuse, no user-event, active-counter decision); client tests 42/42 pass

## Open Questions
