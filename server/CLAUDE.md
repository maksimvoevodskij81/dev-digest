# server (@devdigest/api)

Fastify 5 + Drizzle + Postgres. Imports repos and PRs, indexes repos, runs reviews.

## Commands (run in server/)
- pnpm dev - API on :3001
- pnpm typecheck
- Unit tests, no Docker: pnpm exec vitest run --exclude '**/*.it.test.ts'
- Integration tests, needs Docker: pnpm exec vitest run .it.test
- New migration: change src/db/schema/, then pnpm db:generate, then pnpm db:migrate

## Conventions
- One feature = one Fastify plugin in src/modules/<name>/routes.ts
  (+ service.ts, repository.ts). Register it in src/modules/index.ts (static import).
- Imports use the .js extension (ESM), also for .ts files.
- Route schemas are the Zod contracts from src/vendor/shared. Contract first, then route.
  New contract = new file in vendor/shared (and the same file in client/); never edit existing ones.
- External services (LLM, GitHub, git) sit behind the DI container (src/platform/container.ts).
  Tests use src/adapters/mocks.ts, never real keys.
- A test that touches the DB must end in *.it.test.ts.
- The DB schema already has tables for later milestones. Look in src/db/schema/
  before you add a new table.

## Do not touch
- Existing files in src/db/migrations/. Never edit them; generate a new one.
- clones/ - runtime data.

## Read when
- Adding or changing a route, or DI wiring -> README.md (API map, request & DI flow)
- Working on a bigger feature -> specs/ (acceptance criteria) and docs/
- Before any change here -> INSIGHTS.md
