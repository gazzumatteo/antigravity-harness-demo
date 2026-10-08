# Antigravity harness demo — ACME Inc

Companion repository for the talk **"What's Left for Developers When Agents Write the Code"** (DevFest Milano 2026).

A coding agent gets a real task on a small, deliberately broken project. The point is not the tool: it is the process around it.

1. **Specification**: current state, requirements, constraints, verification.
2. **Harness and plan**: the agent reads the context, splits the work across two sub-agents and asks for approval before writing.
3. **Permission on every write**: every file change is shown and approved one by one.
4. **Proofs before the commit**: three checks that can fail, not a "done".
5. **Human verdict**: the agent stops; a person reads the diff and makes the commit.

Agent used in the talk: Antigravity CLI (`agy`) with Gemini 3.8 Flash (High). The same workflow applies to any coding agent.

## Watch it

The talk shows a single continuous run, cut into short clips. Waits (installs, checks) are sped up; prompts, permission requests, reports and outcomes are shown as they happened.

| Step | Clip |
|---|---|
| Harness and plan (0:52) | [harness-and-plan.mp4](https://github.com/gazzumatteo/antigravity-harness-demo/releases/download/v1.0/harness-and-plan.mp4) |
| Permission on every write (0:41) | [permission-on-every-write.mp4](https://github.com/gazzumatteo/antigravity-harness-demo/releases/download/v1.0/permission-on-every-write.mp4) |
| Proofs before the commit (0:26) | [proofs-before-commit.mp4](https://github.com/gazzumatteo/antigravity-harness-demo/releases/download/v1.0/proofs-before-commit.mp4) |

## What's in here

```
project/                 the project you hand to the agent — nothing else
  PROMPT.md              the task, exactly as used in the talk
  DESIGN.md              ACME Inc design system: the source of truth for the UI
  antigravity.json       a project description the agent reads (a demo file, not a standard)
  frontend/              Vite + React page that breaks DESIGN.md (wrong name, banned copy, shadows, old deps)
    scripts/check-brand.mjs   fails on "ACME Corp", banned copy, forbidden box-shadows, font weights > 500
    scripts/check-deps.mjs    fails if a dependency is behind the latest major on npm — declared *and installed*
  backend/               Express API with outdated dependencies (only versions may change)
```

`project/` contains no hints about the solution, on purpose: during rehearsals the agent went looking for anything that resembled one.

## Run it yourself

Requirements: Node.js 20+, git, Antigravity CLI ≥ 1.2.14 signed in, and a Google Cloud project with the Gemini Enterprise Agent Platform API enabled. Expect 10–15 minutes and some model usage.

**1. Work on a clean copy, outside this repository.**

```bash
cp -R project ~/acme-demo && cd ~/acme-demo
git init -q && git add -A && git commit -qm "initial state"
(cd frontend && npm install)
```

**2. Check the starting point.** The first two checks must fail, the build must pass:

```bash
cd frontend
node scripts/check-brand.mjs   # fails: 17 violations
node scripts/check-deps.mjs    # fails: 6 outdated majors
npm run build                  # passes (Vite 2)
cd ..
```

**3. Keep the agent inside the folder.** In `~/.gemini/antigravity-cli/settings.json` set `"allowNonWorkspaceAccess": false` for the duration of the run (and restore it afterwards). The real limits live in the tool configuration, not in the prompt.

**4. Run the agent in plan mode:**

```bash
agy --add-dir frontend --add-dir backend \
    --model 'Gemini 3.8 Flash (High)' --mode plan \
    -i "$(cat PROMPT.md)"
```

Then, as in the talk:

- approve read-only commands (`find`, `git grep`, `npm view`, the checks);
- before approving the plan, run `git status --short` in another terminal: it must be empty;
- approve **each** write (`index.html`, `index.css`, both `package.json`) after reading the change;
- deny any command that touches paths outside the folder;
- read the final report, then check yourself: `git diff --stat`, `git log --oneline` (no commit from the agent);
- re-run the three checks, then commit — you, not the agent.

## Verified on 8 October 2026

A fresh copy of `project/` was run through `agy` 1.2.14 with Gemini 3.8 Flash (High), non-interactively and with permissions pre-approved inside the workspace. Run time: about 10 minutes. Results, re-checked independently afterwards:

- `check-brand`: passed — no "ACME Corp", banned copy or box-shadows left;
- `check-deps`: passed — React 19.3, Vite 8.3.4, lucide-react 1.53 installed; Express 5.2, dotenv 18 declared;
- `npm run build`: passed with Vite 8;
- backend code untouched (only `backend/package.json`), no commit made by the agent.

Outputs are not deterministic: another run may choose a different layout or wording. The checks are what makes two different results comparable.

## Two things that went wrong while preparing it

- **A green check that proved nothing.** In an earlier run the build passed while the old Vite was still installed: the agent had changed `package.json` without reinstalling. `check-deps.mjs` now checks installed versions too. When you find a false green, don't just fix the code: add the check that would have caught it.
- **An agent looking for shortcuts.** In a rehearsal the agent searched outside the project folder for something that looked like a solution. A sentence in the prompt did not stop it; the permission request did. That is why the clean copy and `allowNonWorkspaceAccess: false` are part of the setup.

`--sandbox` would be the cleaner isolation, but with `agy` 1.2.14 it also blocks the network (npm cannot reach the registry) and breaks the Vite 8 build, so it is not used here.

## More

- The written version of the talk: [What's Left for Developers When Agents Write the Code](https://medium.com/google-cloud/whats-left-for-developers-when-agents-write-the-code-809a1e86be94)
- Blog: [gazzurelli.com/blog](https://gazzurelli.com/blog)
- LinkedIn: [linkedin.com/in/matteogazzurelli](https://www.linkedin.com/in/matteogazzurelli)

MIT License — Matteo Gazzurelli.
