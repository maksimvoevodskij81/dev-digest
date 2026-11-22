# reviewer-core (@devdigest/reviewer-core)

Pure review engine: diff -> prompt -> LLM -> grounded findings.

## Commands (run in reviewer-core/)
- npm test (this package uses npm, not pnpm)
- npm run typecheck
- There is no build output: server imports the TypeScript source via a tsconfig
  path alias. A change here is live in server at once, and runs server-unit CI too.

## Rules
- Stay pure: no database, GitHub, filesystem or network here. The only side effect
  is the LLM call through the injected LLMProvider.
- The grounding gate (src/grounding.ts) is mandatory. Never let a finding skip it,
  and never trust the model's score: it is recomputed from surviving findings.
- Untrusted content (diff, repo code) goes through wrapUntrusted() in src/prompt.ts.
- Public API is only what src/index.ts exports.

## Read when
- Changing the pipeline or prompt slots -> README.md (pipeline, public API)
- Working on a bigger feature -> specs/ (acceptance criteria) and docs/
- Before any change here -> INSIGHTS.md
