# e2e (@devdigest/e2e)

Browser flows driven by the agent-browser CLI. No Playwright, no LLM, no API key.

## Commands (run in e2e/)
- npm install && npm test - needs the full stack running on a freshly seeded DB
- One-time: npm i -g agent-browser && agent-browser install

## Rules
- specs/ here = test flows (specs/NN-name.flow.json), the acceptance checks for the UI.
- Locators are deterministic only: --url, --text, find role|text|label.
  Never use the AI `chat` command.
- Flows read seeded data only (acme/payments-api, PR #482, seeded agents).
  Nothing may trigger a model call.
- Flow 02 assumes the seeded demo repo is the only repo.

## Read when
- Writing or changing a flow -> README.md (how a flow works)
- Before any change here -> INSIGHTS.md
