# Lean AI Harness

Minimal file-based spec harness.

```txt
Codex plans and writes specs.
Codex does not run the runner.
OpenCode/Trae execute.
Runner orchestrates locally.
Human starts, reviews, commits, and closes work.
```

## Workflow

### 1. Validate runtime

Run before asking Codex for work:

```bash
pnpm ai:doctor
```

If it fails, fix environment/auth/permissions/CLI issues before creating specs.

Doctor behavior:

```txt
success -> delete doctor-*.log
failure -> keep logs from failed run only
```

Env:

```txt
AI_DOCTOR_CLI_TIMEOUT_SECONDS
AI_DOCTOR_SMOKE_TIMEOUT_SECONDS
AI_DOCTOR_STATUS_INTERVAL_SECONDS
AI_DOCTOR_SKIP_SMOKE
```

### 2. Ask Codex for specs

Example:

```txt
Create specs for this feature.
Do not run the runner.
```

Codex must:

```txt
- understand the task
- split it into small specs
- set exactly one spec to READY
- set later specs to DRAFT
- set UI Review: required|skip
- stop
```

Rule:

```txt
Codex may tell the human which command to run.
Codex must not run pnpm ai:runner in normal workflow.
```

### 3. Run locally

```bash
pnpm ai:runner
```

Flow:

```txt
READY -> implementer
TECH_REVIEW -> reviewer
UI_REVIEW -> ui-reviewer
REVIEW -> human review
DONE -> human-closed
```

If implementer uses OpenCode, runner executes it automatically.

If implementer uses manual Trae Solo, runner writes a prompt to:

```txt
.ai/run/prompts/
```

Run it in Trae Solo. Trae must finish with:

```txt
Status: TECH_REVIEW
```

Then run:

```bash
pnpm ai:runner
```

### 3.1 Runner status

```bash
pnpm ai:status
```

Shows:

```txt
Active spec
Status
Agent
PID
Process alive
Log
Last log update
Heartbeat update
Last known action
Likely state / Recommended action
```

Runtime signals:

```txt
.ai/run/current.json
.ai/run/pids/current.json
.ai/run/heartbeat.json
.ai/run/logs/
```

Agent runtime/cache lives outside the repo by default:

```txt
${TMPDIR}/lean-ai-harness-runtime/
```

It is deleted after the agent exits.

Keep it for debugging:

```bash
AI_KEEP_AGENT_RUNTIME=1 pnpm ai:runner
```

Interpretation:

```txt
Process alive: yes -> agent is running
Process alive: no + DOING -> agent likely died/interrupted
stale Last log update -> possible hang
stale Heartbeat update -> inspect wrapper/runtime
```

Runner prints short progress summaries instead of long logs.

Interactive OpenCode mode:

```bash
pnpm ai:runner:interactive
```

Uses `opencode run --interactive`. Use only for permission/debug issues. Normal flow is `pnpm ai:runner`.
The isolated interactive runtime registers the configured `opencode/*` model IDs explicitly, so newly added Zen models remain selectable even when OpenCode's bundled interactive catalog is stale.

If agent is alive but log stays unchanged too long:

```txt
Status: BLOCKED_RUNTIME
```

Env:

```txt
AI_RUNNER_STATUS_INTERVAL_SECONDS
AI_RUNNER_SILENCE_TIMEOUT_SECONDS
AI_HEARTBEAT_INTERVAL_SECONDS
AI_AGENT_RUNTIME_BASE
AI_KEEP_AGENT_RUNTIME
AI_RUNNER_LOG_RETENTION
```

### 4. Review and close

When:

```txt
Status: REVIEW
```

Review:

```bash
git status --short
git diff
git ls-files --others --exclude-standard
```

If approved:

```txt
1. commit
2. set spec to Status: DONE
3. run pnpm ai:runner
```

Runner may promote the next `DRAFT` to `READY` only if no spec is in:

```txt
REVIEW
CHANGES
BLOCKED_RUNTIME
```

## States

```txt
DRAFT               prepared, inactive
READY               only spec ready for implementation
DOING               implementer working
TECH_REVIEW          ready for technical review
UI_REVIEW            ready for visual review
WAITING_IMPLEMENTER  waiting for manual Trae Solo
CHANGES              implementation/product changes required
RECOVERY             interrupted work
BLOCKED_RUNTIME      runner/CLI/runtime failure
REVIEW               automated QA passed; human review required
DONE                 human-reviewed, committed, closed
```

Key distinction:

```txt
CHANGES         = implementation problem
BLOCKED_RUNTIME = environment/CLI/permissions/cache/runner problem
```

On `BLOCKED_RUNTIME`:

```bash
pnpm ai:doctor
```

## Commands

```bash
./init.sh                    # project health
pnpm ai:doctor               # validate runtime/agents
pnpm ai:status               # active spec/runtime status
pnpm ai:runner               # run local workflow
pnpm ai:runner:interactive   # foreground OpenCode for permissions/debug
pnpm ai:runner:once          # run one cycle
pnpm ai:dev:start            # start dev server in background
pnpm ai:dev:status           # dev server status
pnpm ai:dev:stop             # stop dev server
```

## Automatic OpenCode

`.ai/agents/runtime.json`

```json
{
  "leader": {
    "tool": "codex",
    "mode": "manual"
  },
  "implementer": {
    "tool": "opencode",
    "mode": "cli",
    "command": ".ai/bin/run-agent.sh implementer"
  },
  "reviewer": {
    "tool": "opencode",
    "mode": "cli",
    "command": ".ai/bin/run-agent.sh reviewer"
  },
  "ui-reviewer": {
    "tool": "opencode",
    "mode": "cli",
    "command": ".ai/bin/run-agent.sh ui-reviewer"
  }
}
```

`.ai/bin/run-agent.sh` isolates mutable CLI cache/runtime outside the repo, defaulting to:

```txt
${TMPDIR}/lean-ai-harness-runtime/
```

## Manual Trae Solo

```json
{
  "implementer": {
    "tool": "trae-solo",
    "mode": "manual",
    "open_command": "open -a Trae ."
  }
}
```

Runner does not execute Trae via CLI. It writes the prompt and waits.

## Use Codex only for

```txt
- creating specs
- fixing ambiguous specs
- architecture decisions
- repeated-failure analysis
- important final audits
```

Do not use Codex for:

```txt
- running pnpm ai:runner
- reading long logs
- repairing OpenCode
- supervising every spec
```

## Token rule

```txt
Codex designs.
Runner orchestrates.
OpenCode/Trae executes.
Human closes.
```
