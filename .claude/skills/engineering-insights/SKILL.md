---
name: engineering-insights
description: Use when a coding task is done or wrapping up ("done", "wrap up", "retro", "what did we learn", before a commit or PR), right after a fix that took more than one try, after the user corrected you, or when /engineering-insights is invoked. Appends non-obvious, confirmed findings to the touched package's INSIGHTS.md (client, server, reviewer-core, e2e). Append-only - never overwrites.
---

# engineering-insights

Goal: the next session starts already knowing what this one learned.

## Steps
0. Gate check: did this session solve a problem, make a decision or discover
   something non-obvious? If not, write only the Session Notes line and stop.
1. List the packages this task touched: client/, server/, reviewer-core/, e2e/.
   (repo-intel lives in server/.)
2. Collect candidate findings. Look for these signals, most important first:
   - the user corrected you;
   - an error fixed only after a failed try;
   - an approach you dropped, and why;
   - "it turned out that..." - the code did not work the way it looked;
   - a surprising library or tool behaviour.
   Keep a finding only if it passes all three:
   - Not obvious: someone reading the code would not see it at once.
   - Actionable cold: an agent reading only this line knows what to do.
   - Confirmed: you saw it work or fail, not a guess.
   If it applies to all packages or is a standing rule, do not write it here -
   propose it for CLAUDE.md in step 6.
3. Read that package's INSIGHTS.md. Skip anything already there.
   If a new finding contradicts an old one, add a new entry with
   `supersedes: <date of old entry>`. Never edit or delete old entries.
4. Append each finding under the right section, one line, max 2 sentences:
   `- YYYY-MM-DD · <finding> · evidence: <path>:<line> (<symbolName>)`
5. Add one line under "Session Notes": date, task, what you appended (or "nothing new").
6. Tell the user in one line per package what you appended. Also list any
   CLAUDE.md proposals, and suggest a cleanup if the file has more than ~80 entries
   (only suggest - do not clean up yourself).

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
