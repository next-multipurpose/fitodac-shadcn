# runtime.json examples

## Automatic workflow with OpenCode

Use the wrapper. Do not call `opencode run` directly from `runtime.json`.

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

The wrapper creates isolated per-project runtime/cache folders outside the repo.

## Automatic implementer with Codex CLI

Keep the wrapper as the configured command. The wrapper invokes `codex exec`
without recursively executing itself, reuses Codex's normal `CODEX_HOME`
authentication, runs ephemerally without persisting a Codex session, and keeps
temporary runtime data outside the repository.

```json
{
  "implementer": {
    "tool": "codex",
    "mode": "cli",
    "command": ".ai/bin/run-agent.sh implementer",
    "share_app_auth": false,
    "model": "gpt-5.6-sol",
    "reasoning_effort": "low",
    "sandbox": "workspace-write",
    "approval_policy": "never"
  }
}
```

`share_app_auth` is OpenCode-specific. Codex CLI reads its own authentication
from `CODEX_HOME`; the harness does not copy or link those credentials.

Before running the runner:

```bash
pnpm ai:doctor
```

Then execute the runner outside Codex:

```bash
pnpm ai:runner
```

## Hybrid mode with Trae Solo as manual implementer

Use this only if you want Trae Solo to implement manually inside the IDE/visual app:

```json
{
  "leader": {
    "tool": "codex",
    "mode": "manual"
  },
  "implementer": {
    "tool": "trae-solo",
    "mode": "manual",
    "open_command": "open -a Trae ."
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

With `mode: manual`, the runner does not execute a CLI for the implementer.
It generates a prompt in `.ai/run/prompts/`, copies it to the clipboard if possible, and leaves the spec in `WAITING_IMPLEMENTER`.

When Trae finishes, it must update the spec to:

```txt
Status: TECH_REVIEW
```

Then run again outside Codex:

```bash
pnpm ai:runner
```

## Smoke test cost

`pnpm ai:doctor` runs a small smoke test for CLI agents by default.
If you only want to check binaries and skip the smoke call:

```bash
AI_DOCTOR_SKIP_SMOKE=1 pnpm ai:doctor
```

## OpenCode model order and simple fallback

For OpenCode roles, you can specify one model or an ordered model list.

```json
{
  "implementer": {
    "tool": "opencode",
    "mode": "cli",
    "command": ".ai/bin/run-agent.sh implementer",
    "models": [
      "provider/code-model",
      "provider/fallback-code-model"
    ]
  }
}
```

The wrapper runs the first model with:

```bash
opencode run --model provider/model "$PROMPT"
```

If a provider is configured in the OpenCode app and does not appear in the
default isolated harness runtime, allow the role to link the app auth file:

```json
{
  "reviewer": {
    "tool": "opencode",
    "mode": "cli",
    "command": ".ai/bin/run-agent.sh reviewer",
    "share_app_auth": true,
    "models": [
      "cloudflare-workers-ai/@cf/zai-org/glm-5.2",
      "opencode/deepseek-v4-flash-free"
    ]
  }
}
```

This keeps the harness database/cache isolated while letting OpenCode use the
same provider auth as the app. Do not point the harness at the full app state;
that can couple runner execution to the app database.

If OpenCode exits with a provider/model limit or availability error, the wrapper tries the next configured model. It does not retry for local errors that do not look like quota/rate/capacity failures.

You can override models without editing `runtime.json`:

```bash
AI_IMPLEMENTER_MODELS="provider/code-model,provider/fallback-code-model" pnpm ai:runner
AI_REVIEWER_MODEL="provider/review-model" pnpm ai:runner
AI_UI_REVIEWER_MODELS="provider/ui-model,provider/fallback-ui-model" pnpm ai:runner
```

Supported fields per role:

```json
{
  "model": "provider/model",
  "models": ["provider/model-a", "provider/model-b"],
  "fallback_models": ["provider/model-a", "provider/model-b"]
}
```

Keep the list short. The harness is an orchestrator, not a provider scheduler.
