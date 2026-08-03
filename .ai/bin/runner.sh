#!/usr/bin/env bash

set -Eeuo pipefail

# Lean AI Harness Runner
#
# The runner must be executed by the human outside Codex.
# It requires pnpm ai:doctor to pass first.
# Long agent logs are written to .ai/run/logs/.

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
fail() { echo -e "${RED}✗${NC} $1"; exit 1; }

RUN_DIR=".ai/run"
PROMPTS_DIR="$RUN_DIR/prompts"
LOG_DIR="$RUN_DIR/logs"
SPECS_DIR=".ai/specs"
LOCK_DIR="$RUN_DIR/runner.lock"
STATE_FILE="$RUN_DIR/current.json"
HEALTH_FILE="$RUN_DIR/health.json"
MAX_CYCLES="${AI_RUNNER_MAX_CYCLES:-10}"
STATUS_INTERVAL_SECONDS="${AI_RUNNER_STATUS_INTERVAL_SECONDS:-60}"
SILENCE_TIMEOUT_SECONDS="${AI_RUNNER_SILENCE_TIMEOUT_SECONDS:-1800}"
LOG_RETENTION="${AI_RUNNER_LOG_RETENTION:-20}"
INTERACTIVE_RUNNER="${AI_RUNNER_INTERACTIVE:-0}"

mkdir -p "$RUN_DIR" "$PROMPTS_DIR" "$LOG_DIR" "$SPECS_DIR"

cleanup() {
  rm -rf "$LOCK_DIR" >/dev/null 2>&1 || true
}

acquire_lock() {
  if mkdir "$LOCK_DIR" 2>/dev/null; then
    echo $$ > "$LOCK_DIR/pid"
    trap cleanup EXIT
    return 0
  fi

  local old_pid=""
  [[ -f "$LOCK_DIR/pid" ]] && old_pid="$(cat "$LOCK_DIR/pid" 2>/dev/null || true)"

  if [[ -n "$old_pid" ]] && kill -0 "$old_pid" >/dev/null 2>&1; then
    fail "Runner already running with PID $old_pid"
  fi

  warn "Removing stale runner lock"
  rm -rf "$LOCK_DIR"
  mkdir "$LOCK_DIR"
  echo $$ > "$LOCK_DIR/pid"
  trap cleanup EXIT
}

command_exists() {
  command -v "$1" >/dev/null 2>&1
}

require_file() {
  [[ -f "$1" ]] || fail "$1 not found"
}

json_escape() {
  if command_exists node; then
    node -e "process.stdout.write(JSON.stringify(process.argv[1]).slice(1,-1))" "$1"
  else
    printf '%s' "$1" | sed 's/\\/\\\\/g; s/"/\\"/g'
  fi
}

file_mtime_epoch() {
  local file="$1"

  [[ -f "$file" ]] || {
    printf '0'
    return 0
  }

  if stat -f %m "$file" >/dev/null 2>&1; then
    stat -f %m "$file"
  else
    stat -c %Y "$file"
  fi
}

relative_age() {
  local seconds="$1"

  if [[ "$seconds" -lt 60 ]]; then
    printf '%s seconds ago' "$seconds"
  elif [[ "$seconds" -lt 3600 ]]; then
    printf '%s minutes ago' "$((seconds / 60))"
  else
    printf '%s hours ago' "$((seconds / 3600))"
  fi
}

last_log_action() {
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

prune_run_logs() {
  local keep="$LOG_RETENTION"

  [[ "$keep" =~ ^[0-9]+$ ]] || keep=20
  (( keep > 0 )) || return 0
  [[ -d "$LOG_DIR" ]] || return 0

  if command_exists node; then
    node -e "
const fs = require('fs');
const path = require('path');
const dir = process.argv[1];
const keep = Number(process.argv[2]);
for (const file of fs.readdirSync(dir)
  .filter((name) => name.endsWith('.log'))
  .map((name) => {
    const full = path.join(dir, name);
    return { full, mtime: fs.statSync(full).mtimeMs };
  })
  .sort((a, b) => b.mtime - a.mtime)
  .slice(keep)) {
  try { fs.unlinkSync(file.full); } catch {}
}
" "$LOG_DIR" "$keep"
  fi
}

write_state() {
  local phase="$1"
  local spec="${2:-}"
  local agent="${3:-runner}"
  local status="${4:-}"
  local now
  now="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"

  cat > "$STATE_FILE" <<JSON
{
  "runner_pid": $$,
  "phase": "$(json_escape "$phase")",
  "spec": "$(json_escape "$spec")",
  "agent": "$(json_escape "$agent")",
  "status": "$(json_escape "$status")",
  "updated_at": "$now"
}
JSON
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

runtime_mode() {
  runtime_field "$1" "mode" "cli"
}

runtime_tool() {
  runtime_field "$1" "tool" "$1"
}

runtime_command() {
  local role="$1"
  local fallback=".ai/bin/run-agent.sh $role"

  case "$role" in
    implementer)
      [[ -n "${AI_IMPLEMENTER_COMMAND:-}" ]] && printf '%s' "$AI_IMPLEMENTER_COMMAND" && return 0
      ;;
    reviewer)
      [[ -n "${AI_REVIEWER_COMMAND:-}" ]] && printf '%s' "$AI_REVIEWER_COMMAND" && return 0
      ;;
    ui-reviewer)
      [[ -n "${AI_UI_REVIEWER_COMMAND:-}" ]] && printf '%s' "$AI_UI_REVIEWER_COMMAND" && return 0
      ;;
  esac

  runtime_field "$role" "command" "$fallback"
}

is_manual_role() {
  [[ "$(runtime_mode "$1")" == "manual" ]]
}

get_status() {
  local spec="$1"
  grep -m1 -E "^Status:" "$spec" 2>/dev/null | sed -E 's/^Status:[[:space:]]*//; s/[[:space:]]*$//' || true
}

set_status() {
  local spec="$1"
  local status="$2"

  if grep -qE "^Status:" "$spec"; then
    perl -0pi -e "s/^Status:[^\n]*/Status: $status/m" "$spec"
  else
    perl -0pi -e "s/^(# .*)/\1\n\nStatus: $status/m" "$spec"
  fi
}

append_note() {
  local spec="$1"
  local title="$2"
  local body="$3"
  local now
  now="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"

  cat >> "$spec" <<MD

## $title

- Date: $now
- $body
MD
}

update_progress() {
  local message="$1"
  local now
  now="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"

  mkdir -p .ai/progress
  {
    echo ""
    echo "## Runner — $now"
    echo ""
    echo "$message"
  } >> .ai/progress/current.md
}

health_status() {
  if [[ ! -f "$HEALTH_FILE" ]] || ! command_exists node; then
    printf 'missing'
    return 0
  fi

  node -e "
const fs = require('fs');
try {
  const health = JSON.parse(fs.readFileSync(process.argv[1], 'utf8'));
  process.stdout.write(health.status || 'missing');
} catch {
  process.stdout.write('invalid');
}
" "$HEALTH_FILE"
}

require_runtime_health() {
  local status
  status="$(health_status)"

  if [[ "$status" != "ok" ]]; then
    fail "Runtime health is '$status'. Run: pnpm ai:doctor"
  fi

  ok "Runtime health OK"
}

specs_by_status_count() {
  local status_regex="$1"
  { find "$SPECS_DIR" -maxdepth 1 -type f -name "*.md" -exec grep -hE "^Status:[[:space:]]*($status_regex)$" {} + 2>/dev/null || true; } | wc -l | tr -d ' '
}

first_spec_by_status() {
  local status="$1"
  local spec

  while IFS= read -r spec; do
    [[ -f "$spec" ]] || continue
    [[ "$(basename "$spec")" == ".gitkeep" ]] && continue
    if [[ "$(get_status "$spec")" == "$status" ]]; then
      echo "$spec"
      return 0
    fi
  done < <(find "$SPECS_DIR" -maxdepth 1 -type f -name "*.md" | sort)

  return 1
}

ensure_queue_is_safe() {
  local ready_count active_count
  ready_count="$(specs_by_status_count "READY")"
  active_count="$(specs_by_status_count "DOING|TECH_REVIEW|UI_REVIEW|WAITING_IMPLEMENTER|RECOVERY")"

  [[ "$ready_count" -le 1 ]] || fail "More than one spec is READY. Keep only one READY and move the rest to DRAFT."
  [[ "$active_count" -le 1 ]] || fail "More than one active spec found. Resolve statuses before running."
}

promote_next_draft_if_safe() {
  local blocked_count review_count changes_count active_count ready_count draft
  ready_count="$(specs_by_status_count "READY")"
  active_count="$(specs_by_status_count "DOING|TECH_REVIEW|UI_REVIEW|WAITING_IMPLEMENTER|RECOVERY")"
  review_count="$(specs_by_status_count "REVIEW")"
  changes_count="$(specs_by_status_count "CHANGES")"
  blocked_count="$(specs_by_status_count "BLOCKED_RUNTIME")"

  if [[ "$ready_count" -gt 0 || "$active_count" -gt 0 || "$review_count" -gt 0 || "$changes_count" -gt 0 || "$blocked_count" -gt 0 ]]; then
    return 1
  fi

  if draft="$(first_spec_by_status DRAFT)"; then
    set_status "$draft" "READY"
    update_progress "- Action: promoted next DRAFT to READY\n- Spec: \`$draft\`"
    ok "Promoted $draft to READY"
    return 0
  fi

  return 1
}

find_next_spec() {
  local status

  for status in DOING RECOVERY WAITING_IMPLEMENTER TECH_REVIEW UI_REVIEW CHANGES READY; do
    first_spec_by_status "$status" && return 0
  done

  if promote_next_draft_if_safe; then
    first_spec_by_status READY && return 0
  fi

  return 1
}

requires_ui_review() {
  local spec="$1"

  if grep -qiE '^(UI Review|Requires UI Review|Visual Review|UI):[[:space:]]*(required|yes|true)$' "$spec"; then
    return 0
  fi

  if grep -qiE '^(UI Review|Requires UI Review|Visual Review|UI):[[:space:]]*(skip|no|false|not required|none)$' "$spec"; then
    return 1
  fi

  if grep -qiE '(frontend|front-end|UI|visual|layout|responsive|screen|screens|view|views|component|components|form|navigation|Tailwind|CSS|className|shadcn|dashboard|landing|navbar|modal|drawer|toast|loading|empty state|error state|success state|app/|pages/|src/|components/|styles/|\.tsx|\.jsx|\.css|\.scss)' "$spec"; then
    return 0
  fi

  return 1
}

prompt_path_for() {
  local role="$1"
  local spec="$2"
  local base
  base="$(basename "$spec" .md)"
  echo "$PROMPTS_DIR/${base}-${role}.md"
}

log_path_for() {
  local role="$1"
  local spec="$2"
  local base stamp
  base="$(basename "$spec" .md)"
  stamp="$(date +%Y%m%d-%H%M%S)"
  echo "$LOG_DIR/${base}-${role}-${stamp}.log"
}

copy_to_clipboard_if_possible() {
  local file="$1"

  if command_exists pbcopy; then
    pbcopy < "$file"
    ok "Prompt copied to clipboard"
  else
    warn "pbcopy not available. Prompt was saved but not copied to clipboard."
  fi
}

open_manual_tool_if_configured() {
  local role="$1"
  local open_command
  open_command="$(runtime_field "$role" "open_command" "")"

  if [[ -n "$open_command" ]]; then
    log "Opening manual tool: $open_command"
    # shellcheck disable=SC2086
    $open_command >/dev/null 2>&1 || warn "Could not run open_command: $open_command"
  fi
}

write_manual_prompt() {
  local role="$1"
  local spec="$2"
  local prompt="$3"
  local file
  file="$(prompt_path_for "$role" "$spec")"

  mkdir -p "$PROMPTS_DIR"
  cat > "$file" <<MD
# Manual agent prompt — $role

Spec: $spec
Tool: $(runtime_tool "$role")
Mode: manual

---

$prompt
MD

  echo "$file"
}

prepare_manual_implementer() {
  local spec="$1"
  local previous_status="$2"
  local prompt="$3"
  local file

  set_status "$spec" "WAITING_IMPLEMENTER"
  file="$(write_manual_prompt "implementer" "$spec" "$prompt")"
  write_state "waiting_manual" "$spec" "implementer" "WAITING_IMPLEMENTER"
  update_progress "- Active spec: \`$spec\`\n- Action: implementer manual\n- Tool: \`$(runtime_tool implementer)\`\n- Previous state: \`$previous_status\`\n- Prompt: \`$file\`"
  copy_to_clipboard_if_possible "$file"
  open_manual_tool_if_configured "implementer"

  echo ""
  warn "Manual implementer required"
  echo "Prompt saved at: $file"
  echo "Open your configured manual tool, paste the prompt, let it work, and make sure it sets the spec to Status: TECH_REVIEW when done."
  echo "Then run: pnpm ai:runner"
}

mark_runtime_blocked() {
  local spec="$1"
  local role="$2"
  local log_file="$3"

  set_status "$spec" "BLOCKED_RUNTIME"
  append_note "$spec" "Runtime blocked" "The $role command failed. This is a harness/CLI/runtime failure, not a product CHANGES state. Log: \`$log_file\`. Run \`pnpm ai:doctor\` after fixing runtime."
  update_progress "- Spec: \`$spec\`\n- Result: $role runtime failure\n- New state: \`BLOCKED_RUNTIME\`\n- Log: \`$log_file\`"
  write_state "blocked_runtime" "$spec" "$role" "BLOCKED_RUNTIME"
}

run_graphify_for_spec() {
  local spec="$1"
  local operation="$2"
  local log_file="$RUN_DIR/graphify/runner-$operation.log"

  mkdir -p "$RUN_DIR/graphify"
  log "Graphify $operation for $spec"

  if ! bash .ai/bin/graphify.sh "$operation" >"$log_file" 2>&1; then
    warn "Graphify $operation failed. Last log lines:"
    tail -n 30 "$log_file" || true
    mark_runtime_blocked "$spec" "graphify-$operation" "$log_file"
    return 1
  fi

  ok "Graphify $operation passed"
}

run_agent() {
  local role="$1"
  local spec="$2"
  local prompt="$3"
  local command log_file agent_pid rc last_notice last_log_mtime last_log_change now silence

  if is_manual_role "$role"; then
    if [[ "$role" != "implementer" ]]; then
      fail "Manual mode is only supported for implementer. Role '$role' must use CLI mode."
    fi
    return 100
  fi

  command="$(runtime_command "$role")"
  log_file="$(log_path_for "$role" "$spec")"

  [[ -n "$command" ]] || fail "No command configured for role '$role'. Check .ai/agents/runtime.json"

  log "Running $role for $spec"
  echo "Log: $log_file"
  write_state "running" "$spec" "$role" "$(get_status "$spec")"

  if [[ "$INTERACTIVE_RUNNER" == "1" ]]; then
    warn "Interactive runner mode: OpenCode will run in the foreground and may ask for permissions in this terminal."
    # shellcheck disable=SC2086
    AI_AGENT_INTERACTIVE=1 AI_RUN_SPEC="$spec" AI_RUN_LOG="$log_file" $command "$prompt"
    rc="$?"
    if [[ "$rc" != "0" ]]; then
      warn "$role failed in interactive mode with exit code $rc."
      return "$rc"
    fi

    ok "$role command finished in interactive mode."
    return 0
  fi

  # shellcheck disable=SC2086
  AI_RUN_SPEC="$spec" AI_RUN_LOG="$log_file" $command "$prompt" >"$log_file" 2>&1 &
  agent_pid="$!"
  last_notice="$(date +%s)"
  last_log_mtime="$(file_mtime_epoch "$log_file")"
  last_log_change="$last_notice"
  rc=0

  while kill -0 "$agent_pid" >/dev/null 2>&1; do
    sleep 2
    now="$(date +%s)"

    local current_log_mtime
    current_log_mtime="$(file_mtime_epoch "$log_file")"
    if [[ "$current_log_mtime" != "$last_log_mtime" && "$current_log_mtime" != "0" ]]; then
      last_log_mtime="$current_log_mtime"
      last_log_change="$now"
    fi

    if (( now - last_notice >= STATUS_INTERVAL_SECONDS )); then
      silence=$((now - last_log_change))
      echo "Still running..."
      echo "Last log update: $(relative_age "$silence")"
      echo "Last action: $(last_log_action "$log_file")"
      echo "Log: $log_file"
      last_notice="$now"
    fi

    if (( SILENCE_TIMEOUT_SECONDS > 0 && now - last_log_change >= SILENCE_TIMEOUT_SECONDS )); then
      warn "$role appears stalled. No log update for $(relative_age "$((now - last_log_change))")."
      echo "Runtime stalled: agent process is alive but no log update was detected for $SILENCE_TIMEOUT_SECONDS seconds." >> "$log_file"
      kill -USR1 "$agent_pid" >/dev/null 2>&1 || true
      # run-agent.sh traps USR1 and rotates OpenCode to the next configured
      # model. Keep supervising the wrapper; tools without a fallback path exit
      # and are reported through the normal wait path below.
      last_log_mtime="$(file_mtime_epoch "$log_file")"
      last_log_change="$now"
    fi
  done

  if [[ "$rc" == "0" ]]; then
    if wait "$agent_pid"; then
      rc=0
    else
      rc="$?"
    fi
  else
    wait "$agent_pid" >/dev/null 2>&1 || true
  fi

  if [[ "$rc" != "0" ]]; then
    warn "$role failed. Last log lines:"
    tail -n 30 "$log_file" || true
    prune_run_logs
    return "$rc"
  fi

  ok "$role command finished. Log: $log_file"
  prune_run_logs
  return 0
}

build_implementer_prompt() {
  local spec="$1"
  cat <<PROMPT
Implement the active Lean AI Harness spec: $spec

Before editing, read AGENTS.md, .ai/rules.md, .ai/agents/implementer.md, and the active spec. Those files are the canonical, complete instructions.

Use the harness Graphify CLI first for broad architecture, dependency, call, location, or impact discovery:
- pnpm ai:graphify:query "<question>"
- pnpm ai:graphify:path "<source>" "<target>"
- pnpm ai:graphify:explain "<node>"
These commands query the existing graphify-out/graph.json. Native MCP availability is not required for the Codex implementer. Then verify exact behavior in the source files. If the Graphify CLI is unavailable or a real query fails, stop and report the runtime blocker.

Work on the real project files and spec; do not only reply in chat. Do not commit. When complete, update the spec to TECH_REVIEW; if blocked by product/code work, update it to CHANGES with the reason.
PROMPT
}

build_reviewer_prompt() {
  local spec="$1"
  local ui_required="$2"
  cat <<PROMPT
Act as the reviewer of the Lean AI Harness.

Active spec: $spec
UI review required by runner: $ui_required

Mandatory instructions:
1. Read AGENTS.md.
2. Read .ai/rules.md.
3. Read .ai/agents/reviewer.md.
4. Read docs/architecture.md, docs/conventions.md, and docs/verification.md.
5. Read conditional docs if the spec touches DB/Auth/deploy.
6. Read the active spec and the "## Implementation report".
7. Review git status --short.
8. Review git diff.
9. Review git ls-files --others --exclude-standard.
10. Directly read relevant modified and untracked source files.
11. Use the shared Graphify MCP for broad impact/dependency review, then verify exact behavior in source.
12. Verify that the implementation works by running ./init.sh and available checks.
13. Review scope, architecture, quality, and unnecessary changes.
14. Do not edit application code.
15. Do not commit.
16. Write or update "## Technical review" in the spec.
17. If there are functional, test, scope, architecture, or quality failures, change the spec to "Status: CHANGES" and document the requested changes.
18. If everything is correct and UI review required is "yes", change the spec to "Status: UI_REVIEW".
19. If everything is correct and UI review required is "no", change the spec to "Status: REVIEW".
20. Do not use BLOCKED_RUNTIME; that status is reserved for the runner.

Allowed final response:
reviewed -> $spec
changes -> $spec
PROMPT
}

build_ui_reviewer_prompt() {
  local spec="$1"
  cat <<PROMPT
Act as the ui-reviewer of the Lean AI Harness.

Active spec: $spec

Mandatory instructions:
1. Read AGENTS.md.
2. Read .ai/rules.md.
3. Read .ai/agents/ui-reviewer.md.
4. Read docs/architecture.md, docs/conventions.md, and docs/verification.md.
5. Read the active spec, "## Implementation report", and "## Technical review".
6. Identify affected routes, screens, or visible components.
7. Review UI, layout, responsive behavior, visual navigation, visible states, and components.
8. Use pnpm ai:dev:start / pnpm ai:dev:status / pnpm ai:dev:stop for dev server management when useful.
9. Use a browser or Playwright if available.
10. Do not edit application code.
11. Do not commit.
12. Write or update "## Visual review" in the spec.
13. If there are visual issues, change the spec to "Status: CHANGES" and document the requested changes.
14. If visual review passes, change the spec to "Status: REVIEW".
15. Do not use BLOCKED_RUNTIME; that status is reserved for the runner.

Allowed final response:
ui-reviewed -> $spec
changes -> $spec
PROMPT
}

implement_spec() {
  local spec="$1"
  local previous_status prompt new_status log_file
  previous_status="$(get_status "$spec")"

  if [[ "$previous_status" == "DOING" ]]; then
    warn "Spec was left in DOING. Treating it as interrupted work."
    set_status "$spec" "RECOVERY"
    append_note "$spec" "Runner recovery" "The spec was in DOING when the runner started. It will be resumed from the current code state and git diff."
    previous_status="RECOVERY"
  fi

  prompt="$(build_implementer_prompt "$spec")"

  if is_manual_role "implementer"; then
    prepare_manual_implementer "$spec" "$previous_status" "$prompt"
    return 100
  fi

  set_status "$spec" "DOING"
  update_progress "- Active spec: \`$spec\`\n- Action: implementer\n- Previous state: \`$previous_status\`"

  if ! run_agent "implementer" "$spec" "$prompt"; then
    log_file="$(ls -t "$LOG_DIR"/"$(basename "$spec" .md)"-implementer-*.log 2>/dev/null | head -1 || true)"
    mark_runtime_blocked "$spec" "implementer" "$log_file"
    return 1
  fi

  new_status="$(get_status "$spec")"

  if [[ "$new_status" != "TECH_REVIEW" && "$new_status" != "CHANGES" ]]; then
    warn "Implementer finished but spec status is $new_status"
    set_status "$spec" "CHANGES"
    append_note "$spec" "Runner correction" "The implementer finished but did not leave the spec in TECH_REVIEW or CHANGES. The runner marked it as CHANGES to avoid unsafe progress."
    update_progress "- Spec: \`$spec\`\n- Result: unexpected state after implementer\n- New state: \`CHANGES\`"
    return 1
  fi

  ok "Implementer finished with status $new_status"
}

review_spec() {
  local spec="$1"
  local ui_required="no"
  local prompt new_status log_file

  if requires_ui_review "$spec"; then
    ui_required="yes"
  fi

  if ! run_graphify_for_spec "$spec" "update"; then
    return 1
  fi

  update_progress "- Active spec: \`$spec\`\n- Action: reviewer\n- UI review required: \`$ui_required\`"
  prompt="$(build_reviewer_prompt "$spec" "$ui_required")"

  if ! run_agent "reviewer" "$spec" "$prompt"; then
    log_file="$(ls -t "$LOG_DIR"/"$(basename "$spec" .md)"-reviewer-*.log 2>/dev/null | head -1 || true)"
    mark_runtime_blocked "$spec" "reviewer" "$log_file"
    return 1
  fi

  new_status="$(get_status "$spec")"

  if [[ "$ui_required" == "yes" && "$new_status" == "REVIEW" ]]; then
    warn "Reviewer passed, but UI review is required. Moving to UI_REVIEW."
    set_status "$spec" "UI_REVIEW"
    append_note "$spec" "Runner correction" "The spec requires UI review. The runner moved the state from REVIEW to UI_REVIEW."
    new_status="UI_REVIEW"
  fi

  if [[ "$new_status" != "REVIEW" && "$new_status" != "UI_REVIEW" && "$new_status" != "CHANGES" ]]; then
    warn "Reviewer finished but spec status is $new_status"
    set_status "$spec" "CHANGES"
    append_note "$spec" "Runner correction" "The reviewer finished but did not leave the spec in REVIEW, UI_REVIEW, or CHANGES. The runner marked it as CHANGES to avoid unsafe progress."
    update_progress "- Spec: \`$spec\`\n- Result: unexpected state after reviewer\n- New state: \`CHANGES\`"
    return 1
  fi

  ok "Reviewer finished with status $new_status"
}

ui_review_spec() {
  local spec="$1"
  local prompt new_status log_file

  update_progress "- Active spec: \`$spec\`\n- Action: ui-reviewer"
  prompt="$(build_ui_reviewer_prompt "$spec")"

  if ! run_agent "ui-reviewer" "$spec" "$prompt"; then
    log_file="$(ls -t "$LOG_DIR"/"$(basename "$spec" .md)"-ui-reviewer-*.log 2>/dev/null | head -1 || true)"
    mark_runtime_blocked "$spec" "ui-reviewer" "$log_file"
    return 1
  fi

  new_status="$(get_status "$spec")"

  if [[ "$new_status" != "REVIEW" && "$new_status" != "CHANGES" ]]; then
    warn "UI reviewer finished but spec status is $new_status"
    set_status "$spec" "CHANGES"
    append_note "$spec" "Runner correction" "The ui-reviewer finished but did not leave the spec in REVIEW or CHANGES. The runner marked it as CHANGES to avoid unsafe progress."
    update_progress "- Spec: \`$spec\`\n- Result: unexpected state after ui-reviewer\n- New state: \`CHANGES\`"
    return 1
  fi

  ok "UI reviewer finished with status $new_status"
}

handle_waiting_implementer() {
  local spec="$1"
  local file
  file="$(prompt_path_for "implementer" "$spec")"

  if [[ ! -f "$file" ]]; then
    warn "Manual prompt missing. Recreating it."
    prepare_manual_implementer "$spec" "WAITING_IMPLEMENTER" "$(build_implementer_prompt "$spec")"
  else
    write_state "waiting_manual" "$spec" "implementer" "WAITING_IMPLEMENTER"
    warn "$spec is waiting for manual implementer"
    echo "Prompt: $file"
    echo "Open your configured manual tool, paste the prompt, let it work, and make sure it sets the spec to Status: TECH_REVIEW when done."
    echo "Then run: pnpm ai:runner"
  fi
}

print_summary() {
  echo ""
  echo "=== Specs status ==="
  if find "$SPECS_DIR" -maxdepth 1 -type f -name "*.md" | grep -q .; then
    while IFS= read -r spec; do
      [[ "$(basename "$spec")" == ".gitkeep" ]] && continue
      printf "%s -> %s\n" "$spec" "$(get_status "$spec")"
    done < <(find "$SPECS_DIR" -maxdepth 1 -type f -name "*.md" | sort)
  else
    echo "No specs found in $SPECS_DIR"
  fi
  echo ""
}

main() {
  acquire_lock

  require_file "AGENTS.md"
  require_file ".ai/rules.md"
  require_file ".ai/progress/current.md"
  require_file ".ai/agents/implementer.md"
  require_file ".ai/agents/reviewer.md"
  require_file ".ai/agents/ui-reviewer.md"
  require_file ".ai/bin/run-agent.sh"
  require_file ".ai/bin/graphify.sh"
  require_file ".ai/bin/graphify-mcp-check.mjs"
  require_file ".ai/graphify.json"

  require_runtime_health
  ensure_queue_is_safe
  write_state "starting" "" "runner" ""

  local cycle=0

  while (( cycle < MAX_CYCLES )); do
    cycle=$((cycle + 1))

    local spec=""
    if ! spec="$(find_next_spec)"; then
      ok "No actionable specs found"
      write_state "idle" "" "runner" ""
      print_summary
      return 0
    fi

    local status rc after
    status="$(get_status "$spec")"

    if [[ "$status" == "BLOCKED_RUNTIME" ]]; then
      warn "$spec is blocked by runtime. Run pnpm ai:doctor and fix the environment before continuing."
      write_state "blocked_runtime" "$spec" "runner" "$status"
      print_summary
      return 0
    fi

    log "Cycle $cycle/$MAX_CYCLES -> $spec ($status)"

    if ! run_graphify_for_spec "$spec" "start"; then
      print_summary
      return 0
    fi

    rc=0
    case "$status" in
      READY|CHANGES|DOING|RECOVERY)
        implement_spec "$spec" || rc=$?
        ;;
      WAITING_IMPLEMENTER)
        handle_waiting_implementer "$spec"
        print_summary
        return 0
        ;;
      TECH_REVIEW)
        review_spec "$spec" || rc=$?
        ;;
      UI_REVIEW)
        ui_review_spec "$spec" || rc=$?
        ;;
      *)
        warn "Ignoring unsupported status: $status"
        ;;
    esac

    if [[ "$rc" == "100" ]]; then
      print_summary
      return 0
    fi

    after="$(get_status "$spec")"

    if [[ "$after" == "BLOCKED_RUNTIME" ]]; then
      warn "$spec is BLOCKED_RUNTIME. Fix runtime outside Codex, then run pnpm ai:doctor."
      print_summary
      return 0
    fi

    if [[ "$after" == "TECH_REVIEW" ]]; then
      review_spec "$spec" || true
      after="$(get_status "$spec")"
    fi

    if [[ "$after" == "UI_REVIEW" ]]; then
      ui_review_spec "$spec" || true
      after="$(get_status "$spec")"
    fi

    if [[ "$after" == "WAITING_IMPLEMENTER" ]]; then
      handle_waiting_implementer "$spec"
      print_summary
      return 0
    fi

    if [[ "$after" == "REVIEW" ]]; then
      ok "$spec is ready for human review"
    fi

    if [[ "$after" == "CHANGES" ]]; then
      if is_manual_role "implementer"; then
        warn "$spec needs changes. Preparing manual implementer prompt."
        implement_spec "$spec" || true
        print_summary
        return 0
      fi

      warn "$spec needs changes. Runner will stop to avoid an aggressive loop. Run pnpm ai:runner again after reviewing or let the implementer retry next time."
      write_state "changes" "$spec" "runner" "$after"
      print_summary
      return 0
    fi
  done

  warn "Max cycles reached: $MAX_CYCLES"
  write_state "max_cycles" "" "runner" ""
  print_summary
}

main "$@"
