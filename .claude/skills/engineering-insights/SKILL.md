---
name: engineering-insights
description: Records non-obvious findings from a finished coding task into the INSIGHTS.md of the package that was touched (client, server, reviewer-core, e2e). Use at the end of any task that changed code and hit something a reader of the code would not guess - a hidden dependency, a fix for a confusing error, a measured fact, a dead end. Also use mid-task right after such a discovery is confirmed, on "wrap up" / "retro", or when /engineering-insights is invoked. Append-only - never overwrites.
---

# engineering-insights

Goal: the next session starts already knowing what this one learned.

## Steps
0. Gate check: did this session solve a problem, make a decision or discover
   something non-obvious? If not, write only the Session Notes line and stop.
1. List the packages this task touched: client/, server/, reviewer-core/, e2e/.
   (repo-intel lives in server/.)
2. For each, collect candidate findings from this session. Keep a finding only if
   it passes all three:
   - Not obvious: someone reading the code would not see it at once.
   - Actionable cold: an agent reading only this line knows what to do.
   - Confirmed: you saw it work or fail, not a guess.
3. Read that package's INSIGHTS.md. Skip anything already there.
   If a new finding contradicts an old one, add a new dated entry that says so.
   Never edit or delete old entries.
4. Append each finding under the right section, in this format:
   `- YYYY-MM-DD · <finding> · evidence: <path>:<line>`
5. Add one line under "Session Notes": date, task, what you appended (or "nothing new").
6. Tell the user in one line per package what you appended.

## Write safely (hard rule)
- Re-read the target INSIGHTS.md right before writing; it may have changed.
- Add entries only with an anchored Edit under the right `##` heading.
  NEVER use the Write tool on an existing INSIGHTS.md - it replaces the whole file.
- Keep every existing heading and entry exactly as it is.

## Sections
- What Works - an approach that worked here
- What Doesn't Work - dead ends and anti-patterns (do not skip this one)
- Codebase Patterns - conventions you had to discover
- Tool & Library Notes - quirks of a library or tool in this repo
- Decisions - a choice made and why
- Recurring Errors & Fixes - error text + the fix
- Session Notes - dated one-line summaries
- Open Questions - unclear things left for later

## Bad vs good
- Bad: "Be careful with async."
- Good: "2026-11-22 · reviewer-core uses npm, not pnpm; pnpm install there creates
  a second lockfile · evidence: reviewer-core/package-lock.json:1"
- Bad: "Tests can be slow." Good: name the test, the cause, and the fix.

## Do not write
- Trivial edits with nothing learned. Then write only the Session Notes line.
- Things already in README.md, CLAUDE.md or the code comments.
- Secrets, tokens, or personal data.
