# DevDigest - agent guide

Local-first AI PR reviewer. Course starter: the base flow works end to end; each lesson adds one feature.

## Before answering
Always search the relevant package's `docs/`, `specs/` and `INSIGHTS.md` for what the
user asks about FIRST - they are curated and may already answer it - then read code.

## Conventions (not obvious from code)
- NOT a monorepo workspace - each package has its own package.json/lockfile; cross-package
  code is shared via tsconfig path aliases.
- `@devdigest/shared` contracts live in two copies: `server/src/vendor/shared/` and
  `client/src/vendor/shared/`. Extend with NEW files; never edit existing ones.
- Before you say "done": typecheck + unit tests in every package you touched.
- When a code task is done, run /engineering-insights to update INSIGHTS.md. Do not skip this.

## Do-not-touch
- Existing files in `vendor/shared/` and `server/src/db/migrations/` - never hand-edit.
- Lock files (pnpm-lock.yaml, package-lock.json) - only via the package manager.
- `server/clones/` - runtime data. `.env` files and `~/.devdigest/secrets.json` - never print keys.

## Use when
- Stack, commands, architecture, how to run -> read `README.md`
- Working inside a package -> read that package's CLAUDE.md: `server/CLAUDE.md`,
  `client/CLAUDE.md`, `reviewer-core/CLAUDE.md`, `e2e/CLAUDE.md`
- Tests -> read `TESTING.md`
- Agent prompt templates -> read `docs/agent-prompts/`
