# client (@devdigest/web)

Next.js 15 App Router UI over the Fastify API.

## Commands (run in client/)
- pnpm dev - web on :3000 (API base: NEXT_PUBLIC_API_BASE, default http://localhost:3001)
- pnpm test - vitest + jsdom, fetch is mocked, no API needed
- pnpm typecheck

## Conventions
- Pages (src/app/**/page.tsx) stay thin. Feature logic goes in colocated
  _components/<Name>/ folders, each with its own *.test.tsx.
- Data access only through hooks in src/lib/hooks/* -> src/lib/api.ts. No fetch in components.
- All UI text goes into messages/en/<area>.json (next-intl). No hard-coded strings in TSX.
- UI primitives come from src/vendor/ui (@devdigest/ui). Use them before writing new ones.
- Contracts come from src/vendor/shared. Extend with new files (same file in server/);
  never edit existing ones.

## Read when
- Adding a page or finding which API a page uses -> README.md (UI route map)
- Working on a bigger feature -> specs/ (acceptance criteria) and docs/
- Before any change here -> INSIGHTS.md
