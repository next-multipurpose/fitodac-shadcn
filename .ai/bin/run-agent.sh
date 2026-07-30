#!/usr/bin/env bash

set -Eeuo pipefail

# Stable CLI-agent wrapper.
# It isolates agent runtime/cache outside the project so tools watching the repo
# do not scan large mutable CLI state while agents run.

ROLE="${1:-}"
PROMPT="${2:-}"

if [[ -z "$ROLE" ]]; then
  echo "Usage: .ai/bin/run-agent.sh <role> <prompt|--doctor>" >&2
  exit 2
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT_DIR"

command_exists() {
  command -v "$1" >/dev/null 2>&1
}

runtime_field() {
  local role="$1"
  local field="$2"
  local fallback="${3:-}"

  if [[ -f ".ai/agents/runtime.json" ]] && command_exists node; then
    node -e "
const fs = require('fs');
const role = process.argv[1];
const field = process.argv[2];
const fallback = process.argv[3] ?? '';
try {
  const runtime = JSON.parse(fs.readFileSync('.ai/agents/runtime.json', 'utf8'));
  const value = runtime?.[role]?.[field];
  process.stdout.write(value === undefined || value === null ? fallback : String(value));
} catch {
  process.stdout.write(fallback);
}
" "$role" "$field" "$fallback"
  else
    printf '%s' "$fallback"
  fi
}

graphify_field() {
  local field="$1"
  local fallback="${2:-}"

  if [[ -f ".ai/graphify.json" ]] && command_exists node; then
    node -e "
const fs = require('fs');
const field = process.argv[1];
const fallback = process.argv[2] ?? '';
try {
  const config = JSON.parse(fs.readFileSync('.ai/graphify.json', 'utf8'));
  const value = config[field];
  process.stdout.write(value === undefined || value === null ? fallback : String(value));
} catch {
  process.stdout.write(fallback);
}
" "$field" "$fallback"
  else
    printf '%s' "$fallback"
  fi
}

role_env_prefix() {
  printf '%s' "$1" | tr '[:lower:]' '[:upper:]' | tr '-' '_'
}

env_value() {
  local name="$1"
  printf '%s' "${!name:-}"
}

model_list() {
  local prefix configured explicit models
  prefix="$(role_env_prefix "$ROLE")"
  explicit="$(env_value "AI_${prefix}_MODEL")"
  models="$(env_value "AI_${prefix}_MODELS")"

  if [[ -n "$explicit" ]]; then
    printf '%s' "$explicit"
    return 0
  fi

  if [[ -n "$models" ]]; then
    printf '%s' "$models"
    return 0
  fi

  configured="$(runtime_field "$ROLE" "model" "")"
  if [[ -z "$configured" ]]; then
    configured="$(runtime_field "$ROLE" "models" "")"
  fi
  if [[ -z "$configured" ]]; then
    configured="$(runtime_field "$ROLE" "fallback_models" "")"
  fi

  printf '%s' "$configured"
}

model_limit_error() {
  local file="$1"
  local marker="${2:-}"

  [[ -f "$file" ]] || return 1

  if [[ -n "$marker" ]]; then
    awk -v marker="$marker" '$0 == marker { found = 1; next } found { print }' "$file" | grep -Eiq '429|too many requests|rate[ _-]?limit|quota|usage limit|daily limit|monthly limit|insufficient quota|credit(s)? exhausted|overloaded|capacity|temporarily unavailable|provider unavailable|model unavailable'
  else
    grep -Eiq '429|too many requests|rate[ _-]?limit|quota|usage limit|daily limit|monthly limit|insufficient quota|credit(s)? exhausted|overloaded|capacity|temporarily unavailable|provider unavailable|model unavailable' "$file"
  fi
}

split_models() {
  local raw="$1"

  printf '%s' "$raw" | tr ',' '\n' | sed -E 's/^[[:space:]]+//; s/[[:space:]]+$//' | awk 'NF'
}

hash_project() {
  if command_exists shasum; then
    printf '%s' "$ROOT_DIR" | shasum -a 256 | awk '{print $1}' | cut -c1-16
  elif command_exists sha256sum; then
    printf '%s' "$ROOT_DIR" | sha256sum | awk '{print $1}' | cut -c1-16
  else
    basename "$ROOT_DIR" | tr -cd '[:alnum:]_-' | cut -c1-32
  fi
}

TOOL="$(runtime_field "$ROLE" "tool" "opencode")"
MODE="$(runtime_field "$ROLE" "mode" "cli")"
PROJECT_HASH="$(hash_project)"
RUN_ID="${AI_RUN_ID:-$(date +%Y%m%d-%H%M%S)-$$}"
RUNTIME_BASE="${AI_AGENT_RUNTIME_BASE:-${TMPDIR:-/tmp}/lean-ai-harness-runtime}"
RUNTIME_ROOT="$RUNTIME_BASE/$PROJECT_HASH/$ROLE/$RUN_ID"
SHARE_APP_AUTH="$(runtime_field "$ROLE" "share_app_auth" "false")"
INTERACTIVE="${AI_AGENT_INTERACTIVE:-0}"
GRAPHIFY_HOST="${AI_GRAPHIFY_HOST:-$(graphify_field host "127.0.0.1")}"
GRAPHIFY_PORT="${AI_GRAPHIFY_PORT:-$(graphify_field port "8081")}"
GRAPHIFY_MCP_PATH="${AI_GRAPHIFY_MCP_PATH:-$(graphify_field mcp_path "/mcp")}"
GRAPHIFY_MCP_URL="${AI_GRAPHIFY_MCP_URL:-http://$GRAPHIFY_HOST:$GRAPHIFY_PORT$GRAPHIFY_MCP_PATH}"

if [[ "$MODE" != "cli" ]]; then
  echo "Role '$ROLE' is configured as mode '$MODE'. run-agent.sh only executes CLI roles." >&2
  exit 2
fi

if [[ "$PROMPT" == "--doctor-graphify-cli" ]]; then
  if [[ "$TOOL" != "codex" ]]; then
    echo "Graphify CLI capability check is only used for Codex roles." >&2
    exit 2
  fi
  bash .ai/bin/graphify.sh query "package.json" --budget 200 >/dev/null
  exit 0
fi

json_escape() {
  if command_exists node; then
    node -e "process.stdout.write(JSON.stringify(process.argv[1]).slice(1,-1))" "$1"
  else
    printf '%s' "$1" | sed 's/\\/\\\\/g; s/"/\\"/g'
  fi
}

write_pid_state() {
  local child_pid="$1"
  local started_at="$2"
  local spec="${AI_RUN_SPEC:-}"
  local log_file="${AI_RUN_LOG:-}"

  cat > "$ROOT_DIR/.ai/run/pids/current.json" <<JSON
{
  "pid": $child_pid,
  "wrapperPid": $$,
  "agent": "$(json_escape "$ROLE")",
  "spec": "$(json_escape "$spec")",
  "log": "$(json_escape "$log_file")",
  "runtimeRoot": "$(json_escape "$RUNTIME_ROOT")",
  "startedAt": "$started_at"
}
JSON
}

write_heartbeat() {
  local status="$1"
  local now spec log_file
  now="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
  spec="${AI_RUN_SPEC:-}"
  log_file="${AI_RUN_LOG:-}"

  cat > "$ROOT_DIR/.ai/run/heartbeat.json" <<JSON
{
  "updatedAt": "$now",
  "agent": "$(json_escape "$ROLE")",
  "spec": "$(json_escape "$spec")",
  "log": "$(json_escape "$log_file")",
  "status": "$(json_escape "$status")"
}
JSON
}

prepare_runtime() {
  mkdir -p \
    "$RUNTIME_ROOT/data" \
    "$RUNTIME_ROOT/data/opencode" \
    "$RUNTIME_ROOT/cache" \
    "$RUNTIME_ROOT/state" \
    "$RUNTIME_ROOT/tmp" \
    "$ROOT_DIR/.ai/run/logs" \
    "$ROOT_DIR/.ai/run/pids"

  if [[ "$TOOL" == "opencode" && "$SHARE_APP_AUTH" == "true" ]]; then
    local app_auth="${AI_OPENCODE_AUTH_FILE:-$HOME/.local/share/opencode/auth.json}"

    if [[ ! -f "$app_auth" ]]; then
      echo "OpenCode auth file not found: $app_auth" >&2
      exit 1
    fi

    if [[ ! -e "$RUNTIME_ROOT/data/opencode/auth.json" ]]; then
      ln -s "$app_auth" "$RUNTIME_ROOT/data/opencode/auth.json"
    fi
  fi

  if [[ "$TOOL" == "opencode" ]]; then
    cat > "$RUNTIME_ROOT/opencode.json" <<JSON
{
  "\$schema": "https://opencode.ai/config.json",
  "mcp": {
    "graphify": {
      "type": "remote",
      "url": "$(json_escape "$GRAPHIFY_MCP_URL")",
      "enabled": true,
      "oauth": false,
      "timeout": 30000
    }
  }
}
JSON
    export OPENCODE_CONFIG="$RUNTIME_ROOT/opencode.json"
  fi

  export XDG_DATA_HOME="$RUNTIME_ROOT/data"
  export XDG_CACHE_HOME="$RUNTIME_ROOT/cache"
  export XDG_STATE_HOME="$RUNTIME_ROOT/state"
  export TMPDIR="$RUNTIME_ROOT/tmp"
  export TEMP="$RUNTIME_ROOT/tmp"
  export TMP="$RUNTIME_ROOT/tmp"
}

cleanup_runtime_root() {
  if [[ "${AI_KEEP_AGENT_RUNTIME:-0}" == "1" ]]; then
    return 0
  fi

  [[ -n "$RUNTIME_ROOT" && "$RUNTIME_ROOT" == "$RUNTIME_BASE"/* ]] || return 0
  rm -rf "$RUNTIME_ROOT" >/dev/null 2>&1 || true
}

run_tracked() {
  local started_at child_pid heartbeat_pid rc
  started_at="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"

  prepare_runtime

  "$@" &
  child_pid="$!"

  write_pid_state "$child_pid" "$started_at"
  write_heartbeat "running"

  (
    while kill -0 "$child_pid" >/dev/null 2>&1; do
      write_heartbeat "running"
      sleep "${AI_HEARTBEAT_INTERVAL_SECONDS:-15}"
    done
  ) &
  heartbeat_pid="$!"

  cleanup_tracked() {
    kill "$heartbeat_pid" >/dev/null 2>&1 || true
    wait "$heartbeat_pid" >/dev/null 2>&1 || true
    rm -f "$ROOT_DIR/.ai/run/pids/current.json" >/dev/null 2>&1 || true
    rm -f "$ROOT_DIR/.ai/run/heartbeat.json" >/dev/null 2>&1 || true
    cleanup_runtime_root
  }

  forward_signal() {
    kill "$child_pid" >/dev/null 2>&1 || true
    cleanup_tracked
  }

  trap forward_signal INT TERM
  if wait "$child_pid"; then
    rc=0
  else
    rc="$?"
  fi
  trap - INT TERM
  cleanup_tracked
  return "$rc"
}

run_foreground() {
  local rc
  prepare_runtime

  set +e
  "$@"
  rc="$?"
  set -e
  cleanup_runtime_root
  return "$rc"
}

run_opencode_with_model_fallback() {
  local opencode_bin="$1"
  local models_raw model_count index model rc marker
  local -a MODELS
  local fallback_triggered=0
  models_raw="$(model_list)"

  if [[ -z "$models_raw" ]]; then
    if [[ "$INTERACTIVE" == "1" ]]; then
      run_foreground "$opencode_bin" run --interactive "$PROMPT"
    else
      run_tracked "$opencode_bin" run "$PROMPT"
    fi
    return "$?"
  fi

  MODELS=()
  while IFS= read -r model; do
    MODELS+=("$model")
  done < <(split_models "$models_raw")
  model_count="${#MODELS[@]}"

  if [[ "$model_count" -eq 0 ]]; then
    if [[ "$INTERACTIVE" == "1" ]]; then
      run_foreground "$opencode_bin" run --interactive "$PROMPT"
    else
      run_tracked "$opencode_bin" run "$PROMPT"
    fi
    return "$?"
  fi

  for index in "${!MODELS[@]}"; do
    model="${MODELS[$index]}"
    marker="=== Model attempt $((index + 1))/$model_count: $model ==="
    echo "$marker"
    echo "Model attempt $((index + 1))/$model_count: $model"

    set +e
    if [[ "$INTERACTIVE" == "1" ]]; then
      run_foreground "$opencode_bin" run --interactive --model "$model" "$PROMPT"
    else
      run_tracked "$opencode_bin" run --model "$model" "$PROMPT"
    fi
    rc="$?"
    set -e

    if [[ "$rc" == "0" ]]; then
      echo "Model succeeded: $model"
      return 0
    fi

    echo "Model failed with exit code $rc: $model"

    if [[ -n "${AI_RUN_LOG:-}" ]] && model_limit_error "$AI_RUN_LOG" "$marker"; then
      fallback_triggered=1
      echo "Model unavailable: provider limit or availability error detected"
      if (( index + 1 < model_count )); then
        echo "Switching to fallback model: ${MODELS[$((index + 1))]}"
        continue
      fi
      echo "All configured models exhausted"
      return "$rc"
    fi

    echo "Error does not look like a model/provider limit. Not trying fallback models."
    return "$rc"
  done

  if [[ "$fallback_triggered" == "1" ]]; then
    echo "All configured models exhausted"
  fi
  return 1
}

run_codex() {
  local codex_bin="$1"
  local model reasoning_effort sandbox approval_policy
  local -a args

  model="$(runtime_field "$ROLE" "model" "")"
  reasoning_effort="$(runtime_field "$ROLE" "reasoning_effort" "")"
  sandbox="$(runtime_field "$ROLE" "sandbox" "workspace-write")"

  if [[ "$INTERACTIVE" == "1" ]]; then
    approval_policy="$(runtime_field "$ROLE" "approval_policy" "on-request")"
  else
    approval_policy="$(runtime_field "$ROLE" "approval_policy" "never")"
  fi

  args=(
    --ask-for-approval "$approval_policy"
    exec
    --ephemeral
    --sandbox "$sandbox"
    --cd "$ROOT_DIR"
  )

  if [[ -n "$model" ]]; then
    args+=(--model "$model")
  fi

  if [[ -n "$reasoning_effort" ]]; then
    args+=(--config "model_reasoning_effort=$reasoning_effort")
  fi

  if [[ "$INTERACTIVE" == "1" ]]; then
    run_foreground "$codex_bin" "${args[@]}" "$PROMPT"
  else
    run_tracked "$codex_bin" "${args[@]}" "$PROMPT"
  fi
}

if [[ "$TOOL" == "opencode" ]]; then
  OPENCODE_BIN="${AI_OPENCODE_BIN:-opencode}"

  if ! command_exists "$OPENCODE_BIN"; then
    echo "OpenCode binary not found: $OPENCODE_BIN" >&2
    exit 127
  fi

  if [[ "$PROMPT" == "--doctor" ]]; then
    "$OPENCODE_BIN" --version >/dev/null
    exit 0
  fi

  if [[ "$PROMPT" == "--doctor-mcp" ]]; then
    run_foreground "$OPENCODE_BIN" mcp list
    exit "$?"
  fi

  run_opencode_with_model_fallback "$OPENCODE_BIN"
  exit "$?"
fi

if [[ "$TOOL" == "codex" ]]; then
  CODEX_BIN="${AI_CODEX_BIN:-codex}"

  if ! command_exists "$CODEX_BIN"; then
    echo "Codex binary not found: $CODEX_BIN" >&2
    exit 127
  fi

  if [[ "$PROMPT" == "--doctor" ]]; then
    "$CODEX_BIN" --version >/dev/null
    exit 0
  fi

  if [[ "$PROMPT" == "--doctor-mcp" ]]; then
    prepare_runtime
    set +e
    "$CODEX_BIN" \
      --config "mcp_servers.graphify.url=\"$(json_escape "$GRAPHIFY_MCP_URL")\"" \
      mcp get graphify
    rc="$?"
    set -e
    cleanup_runtime_root
    exit "$rc"
  fi

  run_codex "$CODEX_BIN"
  exit "$?"
fi

COMMAND="$(runtime_field "$ROLE" "command" "")"

if [[ -z "$COMMAND" ]]; then
  echo "No command configured for custom CLI tool '$TOOL' and role '$ROLE'." >&2
  exit 2
fi

if [[ "$PROMPT" == "--doctor" ]]; then
  # For custom tools, the doctor only verifies that the executable exists.
  EXECUTABLE="${COMMAND%% *}"
  command_exists "$EXECUTABLE" || exit 127
  exit 0
fi

# Custom command fallback. Keep this only for non-OpenCode tools.
# shellcheck disable=SC2086
run_tracked $COMMAND "$PROMPT"
