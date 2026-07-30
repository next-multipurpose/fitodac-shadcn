# AGENTS.md — Lean AI Harness

Entry point for any agent working in this repository.

Main rule:

```txt
Agents do not talk to each other.
Agents read and write state in specs.
The runner executes the technical workflow.
Codex/Leader does not run the runner by default.
```

---

## 1. Roles

```txt
Leader      = understands the task, creates lean specs, and stops
Runner      = local technical orchestrator executed by the human
Implementer = writes tests first and develops
Reviewer    = verifies behavior + technical quality
UI Reviewer = visual QA when the task touches frontend/UI
Human       = validates runtime, runs runner, reviews diff/spec, commits, and marks DONE
```

The runner does not make product decisions.
The implementer does not approve its own work.
The reviewer does not implement.
The leader does not operate long-running execution.
The human is the only one who commits.
The human is the only authority for new architecture decisions.

---

## 2. Codex-minimal workflow

The default workflow is designed to avoid wasting Codex tokens.

```txt
1. Human runs pnpm ai:doctor outside Codex.
2. If runtime is OK, Human asks Codex/Leader to create or refine specs.
3. Leader creates specs and stops.
4. Human runs pnpm ai:runner outside Codex.
5. Runner executes OpenCode/Trae according to runtime.json.
6. Human returns to Codex only for ambiguity, architecture decisions, repeated failures, or final audit.
```

Hard rule:

```txt
Codex may suggest pnpm ai:runner.
Codex must not execute pnpm ai:runner unless the human explicitly accepts that token cost.
```

If OpenCode, Trae, permissions, cache, auth, or CLI runtime fails, Codex must not repair it during the spec cycle. The runtime must be fixed outside Codex and validated again with `pnpm ai:doctor`.

---

## 3. Important files

| Path                         | Use                                      |
| ---------------------------- | ---------------------------------------- |
| `.ai/rules.md`               | Stable project rules                     |
| `.ai/specs/`                 | Executable specs and task state          |
| `.ai/progress/current.md`    | Operational session log                  |
| `.ai/agents/`                | Role instructions                        |
| `.ai/agents/runtime.json`    | Agent runtime configuration              |
| `.ai/bin/doctor.sh`          | Runtime gate before running agents       |
| `.ai/bin/runner.sh`          | Technical runner                         |
| `.ai/bin/run-agent.sh`       | Stable wrapper for CLI agents            |
| `.ai/bin/graphify.sh`        | Shared code graph lifecycle               |
| `.ai/bin/dev-server.sh`      | Helper for UI/browser review             |
| `.ai/run/health.json`        | Last runtime validation result           |
| `.ai/run/logs/`              | Long logs outside agent context          |
| `.ai/run/prompts/`           | Prompts for manual agents                |
| `docs/architecture.md`       | Architecture quality criteria            |
| `docs/conventions.md`        | Code conventions                         |
| `docs/verification.md`       | Required verification                    |
| `docs/database.md`           | Supabase, DB, Auth, RLS, migrations      |
| `docs/deploy.md`             | Build, deploy, envs, Vercel              |
| `docs/graphify.md`           | Graphify setup, lifecycle, and usage      |

---

## 4. Valid states

```txt
DRAFT       = spec is prepared but not active
READY       = the only spec ready to implement
DOING       = implementer is working
TECH_REVIEW = ready for technical/functional QA
UI_REVIEW   = ready for visual QA
WAITING_IMPLEMENTER = waiting for manual implementation
CHANGES     = product/code changes are needed
RECOVERY    = interrupted task, must be resumed
BLOCKED_RUNTIME = harness/CLI/runtime failed, not a product failure
REVIEW      = automatic QA passed, ready for human review
DONE        = reviewed, committed, and closed by a human
```

`CHANGES` means the implementation needs correction.
`BLOCKED_RUNTIME` means the runner or agent CLI failed before reliable product work could continue.

---

## 5. Spec queue rule

Only one spec can be active.

```txt
One READY spec maximum.
Later specs stay in DRAFT.
The runner may promote the next DRAFT to READY only when there are no active, REVIEW, CHANGES, or BLOCKED_RUNTIME specs.
```

This avoids Codex supervising a long batch of specs and keeps the workflow easy to resume.

---

## 6. Standard runner workflow

```txt
1. Human runs pnpm ai:doctor.
2. Human runs pnpm ai:runner.
3. Runner refuses to start if health.json is not OK.
4. Runner finds the active spec.
5. READY / CHANGES / DOING / RECOVERY -> implementer.
6. If implementer is CLI-based, runner runs it through .ai/bin/run-agent.sh.
7. If implementer is manual, runner generates a prompt, marks WAITING_IMPLEMENTER, and stops.
8. Implementer writes tests first when appropriate.
9. Implementer develops and marks TECH_REVIEW.
10. Runner runs reviewer.
11. Reviewer verifies behavior + technical quality.
12. If product/code fails, reviewer marks CHANGES.
13. If runtime/CLI fails, runner marks BLOCKED_RUNTIME.
14. If it passes and the task touches UI, reviewer marks UI_REVIEW.
15. If it passes and the task does not touch UI, reviewer marks REVIEW.
16. Runner runs ui-reviewer only if the spec is in UI_REVIEW.
17. UI Reviewer runs visual QA.
18. If it fails visually, UI Reviewer marks CHANGES.
19. If it passes, UI Reviewer marks REVIEW.
20. Human reviews diff/spec, commits, and marks DONE.
```

---

## 7. Commands

```bash
./init.sh
pnpm ai:doctor
pnpm ai:graphify:status
pnpm ai:graphify:update
pnpm ai:graphify:query "<question>"
pnpm ai:graphify:path "<source>" "<target>"
pnpm ai:graphify:explain "<node>"
pnpm ai:runner
pnpm ai:runner:once
pnpm ai:dev:start
pnpm ai:dev:status
pnpm ai:dev:stop
```

`pnpm ai:doctor` is the runtime gate.
`pnpm ai:runner` is idempotent and can be run many times.

Graphify is required harness infrastructure. The doctor validates the graph and
shared MCP before agents run. See `docs/graphify.md`.

The Codex implementer queries Graphify through the harness CLI commands.
OpenCode reviewer roles consume the same graph through the shared MCP.

---

## 8. When UI Review applies

A spec must explicitly use `UI Review: required` if it modifies or affects:

```txt
screens
layout
responsive behavior
forms
visual navigation
visible components
Tailwind / CSS
shadcn/ui
dashboard
landing pages
visual states: loading, empty, error, success
```

Use `UI Review: skip` only when the task does not touch visible UI.
Use `UI Review: auto` only when there is a strong reason to let the runner infer it.

---

## 9. Hard rules

- Codex/Leader does not run `pnpm ai:runner` by default.
- `pnpm ai:doctor` must pass before the runner executes CLI agents.
- Only one `READY` spec at a time.
- Do not work outside the scope.
- Do not commit.
- Do not add dependencies without justification.
- Do not install system tools unless the spec or rules explicitly allow it.
- Do not refactor unless the spec asks for it.
- Do not write a spec that requires an architecture decision until the human has approved that decision explicitly.
- Record every required architecture decision and its constraints in the spec.
- Reuse existing frontend components and backend methods before creating parallel implementations.
- Keep reusable page layouts in a clearly differentiated layouts directory.
- Do not mark `DONE`; only the human can do that.
- Do not mark `REVIEW` if automatic QA is missing.
- Do not hide errors just to make everything green.
- If the spec touches UI, it must go through `UI_REVIEW`.
- If the spec touches Supabase, document DB/Auth/migrations and local verification.
- Do not require agents to read `.env*` files. Put readable local defaults in docs such as `docs/local-env.example.md`.
- Use Graphify first for broad architecture, dependency, call, location, and impact questions.
- Read the identified source files directly before making or approving implementation claims.
- Source code remains authoritative; Graphify is an ignored, rebuildable index.
- Automatic Graphify commands must remain code-only and must not invoke an LLM.

---

## 10. Minimal spec

```md
# 001 — Task name

Status: READY
Role: implementer
UI Review: required / skip
Tooling policy: stop-with-blocker

## Goal

...

## Scope

- ...

## Out of scope

- ...

## Acceptance criteria

- ...

## Architecture

Decision required: no

The task follows the existing approved architecture without introducing a new boundary or pattern.

## Relevant files

- ...

## Verification

- ./init.sh

## Implementation report

Pending.

## Technical review

Pending.

## Visual review

Not applicable / Pending.
```

---

## 11. Closure

A spec can be left in `REVIEW` only if:

```txt
scope completed
reviewer approved behavior + technical quality
ui-reviewer approved if applicable
reports written
no commits
```

`DONE` is reserved for the human after reviewing and committing.

---

## 12. Hybrid mode with Trae Solo

If `.ai/agents/runtime.json` declares:

```json
"implementer": {
  "tool": "trae-solo",
  "mode": "manual"
}
```

The runner does not try to run a CLI.

It does this:

```txt
1. Generates a prompt in .ai/run/prompts/.
2. Copies it to the clipboard if possible.
3. Marks the spec as WAITING_IMPLEMENTER.
4. Stops.
```

Trae Solo must work on the real project files and leave the spec in `TECH_REVIEW` when finished.
