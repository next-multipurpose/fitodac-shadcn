#!/usr/bin/env bash

set -Eeuo pipefail

# Runtime gate for Lean AI Harness.
# Run this before pnpm ai:runner. It must pass before the runner mutates specs.

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT_DIR"

RED="\033[0;31m"
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
BLUE="\033[0;34m"
NC="\033[0m"

log() { echo -e "${BLUE}➜${NC} $1"; }
ok() { echo -e "${GREEN}✓${NC} $1"; }
warn() { echo -e "${YELLOW}⚠${NC} $1"; }
fail_msg() { echo -e "${RED}✗${NC} $1"; }

RUN_DIR=".ai/run"
LOG_DIR="$RUN_DIR/logs"
HEALTH_FILE="$RUN_DIR/health.json"
SMOKE_PROMPT="Reply only with: ok"
CLI_TIMEOUT_SECONDS="${AI_DOCTOR_CLI_TIMEOUT_SECONDS:-20}"
SMOKE_TIMEOUT_SECONDS="${AI_DOCTOR_SMOKE_TIMEOUT_SECONDS:-120}"
STATUS_INTERVAL_SECONDS="${AI_DOCTOR_STATUS_INTERVAL_SECONDS:-10}"

mkdir -p "$RUN_DIR" "$LOG_DIR" "$RUN_DIR/prompts" "$RUN_DIR/pids"

command_exists() {
  command -v "$1" >/dev/null 2>&1
}

json_escape() {
  if command_exists node; then
    node -e "process.stdout.write(JSON.stringify(process.argv[1]).slice(1,-1))" "$1"
  else
    printf '%s' "$1" | sed 's/\\/\\\\/g; s/"/\\"/g'
  fi
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

get_spec_status_lines() {
  find .ai/specs -type f -name "*.md" -exec grep -hE "^Status:" {} + 2>/dev/null || true
}

write_health() {
  local status="$1"
  local message="$2"
  local now
  now="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"

  cat > "$HEALTH_FILE" <<JSON
{
  "status": "$(json_escape "$status")",
  "message": "$(json_escape "$message")",
  "checked_at": "$now"
}
JSON
}

ERRORS=0
SMOKE_ALREADY_RAN=0
DOCTOR_LOGS=()

check_file() {
  local path="$1"
  if [[ -f "$path" ]]; then
    ok "$path found"
  else
    fail_msg "$path not found"
    ERRORS=$((ERRORS + 1))
  fi
}

check_dir() {
  local path="$1"
  if [[ -d "$path" ]]; then
    ok "$path found"
  else
    fail_msg "$path not found"
    ERRORS=$((ERRORS + 1))
  fi
}

check_command() {
  local cmd="$1"
  if command_exists "$cmd"; then
    ok "$cmd found"
  else
    fail_msg "$cmd not found"
    ERRORS=$((ERRORS + 1))
  fi
}

last_log_line() {
  local file="$1"
  local line

  [[ -f "$file" ]] || {
    printf 'unknown'
    return 0
  }

  line="$(tail -n 40 "$file" 2>/dev/null | sed -E 's/\x1B\[[0-9;]*m//g' | awk 'NF { last=$0 } END { print last }')"
  if [[ -z "$line" ]]; then
    printf 'unknown'
    return 0
  fi

  printf '%s' "$line" | cut -c1-180
}

run_with_progress() {
  local label="$1"
  local timeout_seconds="$2"
  local log_file="$3"
  shift 3

  local child_pid start now last_notice rc elapsed
  start="$(date +%s)"
  last_notice="$start"

  "$@" >>"$log_file" 2>&1 &
  child_pid="$!"

  while kill -0 "$child_pid" >/dev/null 2>&1; do
    sleep 1
    now="$(date +%s)"
    elapsed=$((now - start))

    if (( elapsed >= timeout_seconds )); then
      warn "$label timed out after ${timeout_seconds}s"
      echo "Timed out after ${timeout_seconds}s: $label" >> "$log_file"
      kill "$child_pid" >/dev/null 2>&1 || true
      wait "$child_pid" >/dev/null 2>&1 || true
      echo "Log: $log_file"
      echo "Last output: $(last_log_line "$log_file")"
      return 124
    fi

    if (( now - last_notice >= STATUS_INTERVAL_SECONDS )); then
      echo "Still checking $label..."
      echo "Elapsed: ${elapsed}s"
      echo "Log: $log_file"
      echo "Last output: $(last_log_line "$log_file")"
      last_notice="$now"
    fi
  done

  if wait "$child_pid"; then
    rc=0
  else
    rc="$?"
  fi

  return "$rc"
}

remember_doctor_log() {
  DOCTOR_LOGS+=("$1")
}

cleanup_doctor_logs_on_success() {
  local log_file

  for log_file in "$LOG_DIR"/doctor-*.log; do
    [[ -e "$log_file" ]] || continue
    rm -f "$log_file" >/dev/null 2>&1 || true
  done
}

cleanup_doctor_logs_on_failure() {
  local log_file keep_file should_keep

  for log_file in "$LOG_DIR"/doctor-*.log; do
    [[ -e "$log_file" ]] || continue
    should_keep=0
    for keep_file in "${DOCTOR_LOGS[@]}"; do
      if [[ "$log_file" == "$keep_file" ]]; then
        should_keep=1
        break
      fi
    done
    if [[ "$should_keep" == "0" ]]; then
      rm -f "$log_file" >/dev/null 2>&1 || true
    fi
  done
}

check_role() {
  local role="$1"
  local mode tool log_file
  mode="$(runtime_field "$role" "mode" "cli")"
  tool="$(runtime_field "$role" "tool" "$role")"
  log_file="$LOG_DIR/doctor-$role-$(date +%Y%m%d-%H%M%S).log"
  remember_doctor_log "$log_file"

  if [[ "$mode" == "manual" ]]; then
    warn "$role is manual. Skipping CLI smoke test."
    return 0
  fi

  log "Checking $role ($tool)"
  : > "$log_file"

  if ! run_with_progress "$role CLI startup" "$CLI_TIMEOUT_SECONDS" "$log_file" .ai/bin/run-agent.sh "$role" --doctor; then
    fail_msg "$role CLI check failed. Log: $log_file"
    echo "Last output: $(last_log_line "$log_file")"
    ERRORS=$((ERRORS + 1))
    return 1
  fi

  if [[ "${AI_DOCTOR_SKIP_SMOKE:-0}" == "1" ]]; then
    ok "$role CLI starts"
    return 0
  fi

  if [[ "$SMOKE_ALREADY_RAN" == "1" && "${AI_DOCTOR_FULL_SMOKE:-0}" != "1" ]]; then
    ok "$role CLI starts. Smoke already passed for another CLI role."
    return 0
  fi

  if ! run_with_progress "$role smoke run" "$SMOKE_TIMEOUT_SECONDS" "$log_file" .ai/bin/run-agent.sh "$role" "$SMOKE_PROMPT"; then
    fail_msg "$role smoke run failed. Log: $log_file"
    echo "Last output: $(last_log_line "$log_file")"
    ERRORS=$((ERRORS + 1))
    return 1
  fi

  SMOKE_ALREADY_RAN=1
  ok "$role smoke run passed. Log: $log_file"
}

echo ""
echo "=== Lean AI Harness Doctor ==="
echo ""

log "Checking required files"
check_file "AGENTS.md"
check_file "package.json"
check_file ".ai/rules.md"
check_file ".ai/agents/runtime.json"
check_file ".ai/bin/runner.sh"
check_file ".ai/bin/run-agent.sh"
check_file ".ai/bin/dev-server.sh"
check_dir ".ai/specs"
check_dir ".ai/run"
check_dir "$LOG_DIR"

log "Checking required local tools"
check_command "node"
check_command "pnpm"

log "Checking spec queue"
READY_COUNT="$(get_spec_status_lines | grep -cE "^Status:[[:space:]]*READY$" || true)"
ACTIVE_COUNT="$(get_spec_status_lines | grep -cE "^Status:[[:space:]]*(DOING|TECH_REVIEW|UI_REVIEW|WAITING_IMPLEMENTER|RECOVERY)$" || true)"
BLOCKED_COUNT="$(get_spec_status_lines | grep -cE "^Status:[[:space:]]*BLOCKED_RUNTIME$" || true)"

if [[ "$READY_COUNT" -gt 1 ]]; then
  fail_msg "More than one spec is READY"
  ERRORS=$((ERRORS + 1))
else
  ok "READY specs: $READY_COUNT"
fi

if [[ "$ACTIVE_COUNT" -gt 1 ]]; then
  fail_msg "More than one active spec found"
  ERRORS=$((ERRORS + 1))
else
  ok "Active specs: $ACTIVE_COUNT"
fi

if [[ "$BLOCKED_COUNT" -gt 0 ]]; then
  warn "There are BLOCKED_RUNTIME specs. Fix runtime and decide how to recover them."
fi

INVALID_STATUS=$(get_spec_status_lines | grep -vE "^Status:[[:space:]]*(DRAFT|READY|DOING|TECH_REVIEW|UI_REVIEW|WAITING_IMPLEMENTER|CHANGES|RECOVERY|BLOCKED_RUNTIME|REVIEW|DONE)$" || true)
if [[ -n "$INVALID_STATUS" ]]; then
  echo "$INVALID_STATUS"
  fail_msg "Invalid spec status found"
  ERRORS=$((ERRORS + 1))
else
  ok "Spec statuses are valid"
fi

if [[ "$ERRORS" -eq 0 ]]; then
  log "Checking configured CLI agents"
  check_role "implementer" || true
  if [[ "$ERRORS" -eq 0 ]]; then
    check_role "reviewer" || true
  fi
  if [[ "$ERRORS" -eq 0 ]]; then
    check_role "ui-reviewer" || true
  fi
fi

if [[ "$ERRORS" -gt 0 ]]; then
  cleanup_doctor_logs_on_failure
  write_health "failed" "Doctor found $ERRORS problem(s)."
  echo ""
  fail_msg "Doctor failed. Runtime is not safe for pnpm ai:runner."
  exit 1
fi

cleanup_doctor_logs_on_success
write_health "ok" "Runtime checks passed."
echo ""
ok "Doctor passed. Runtime is safe for pnpm ai:runner."
echo "Health: $HEALTH_FILE"
