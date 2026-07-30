#!/usr/bin/env bash

set -Eeuo pipefail

# Lean AI Harness — Project Health Check
#
# Goal:
# - validate that the harness is complete
# - validate that the environment is healthy
# - run project checks if they exist
# - prevent agents from moving forward on a broken base

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

RED="\033[0;31m"
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
BLUE="\033[0;34m"
NC="\033[0m"

log() {
  echo -e "${BLUE}➜${NC} $1"
}

ok() {
  echo -e "${GREEN}✓${NC} $1"
}

warn() {
  echo -e "${YELLOW}⚠${NC} $1"
}

fail() {
  echo -e "${RED}✗${NC} $1"
  exit 1
}

command_exists() {
  command -v "$1" >/dev/null 2>&1
}

require_file() {
  [[ -f "$1" ]] || fail "$1 not found"
  ok "$1 found"
}

require_dir() {
  [[ -d "$1" ]] || fail "$1 not found"
  ok "$1 found"
}

has_script() {
  node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
process.exit(pkg.scripts && pkg.scripts['$1'] ? 0 : 1);
" >/dev/null 2>&1
}

run_script_if_exists() {
  local script="$1"

  if has_script "$script"; then
    log "Running pnpm run $script"
    pnpm run "$script"
    ok "pnpm run $script passed"
  else
    warn "No script found: $script"
  fi
}

get_spec_status_lines() {
  find .ai/specs -type f -name "*.md" -exec grep -hE "^Status:" {} + 2>/dev/null || true
}

echo ""
echo "=== Lean AI Harness Init ==="
echo ""

# --------------------------------------------------
# 1. Project files
# --------------------------------------------------

log "Checking project files"

require_file "package.json"
require_file "AGENTS.md"
require_file "init.sh"

# --------------------------------------------------
# 2. Harness files
# --------------------------------------------------

log "Checking harness files"

require_file ".ai/rules.md"
require_file ".ai/progress/current.md"

require_dir ".ai/specs"
require_dir ".ai/archive"
require_dir ".ai/agents"
require_dir ".ai/bin"
require_dir ".ai/run"
mkdir -p .ai/run/logs .ai/run/prompts .ai/run/runtime .ai/run/pids

require_file ".ai/bin/runner.sh"
require_file ".ai/bin/doctor.sh"
require_file ".ai/bin/run-agent.sh"
require_file ".ai/bin/dev-server.sh"
require_file ".ai/bin/graphify.sh"
require_file ".ai/bin/graphify-mcp-check.mjs"
require_file ".ai/graphify.json"
require_file ".ai/agents/leader.md"
require_file ".ai/agents/implementer.md"
require_file ".ai/agents/reviewer.md"
require_file ".ai/agents/ui-reviewer.md"

# --------------------------------------------------
# 3. Docs files
# --------------------------------------------------

log "Checking docs files"

require_file "docs/architecture.md"
require_file "docs/conventions.md"
require_file "docs/verification.md"
require_file "docs/database.md"
require_file "docs/deploy.md"
require_file "docs/graphify.md"

# --------------------------------------------------
# 4. Required tools
# --------------------------------------------------

log "Checking required tools"

command_exists node || fail "Node.js is not installed"
command_exists pnpm || fail "pnpm is not installed"

ok "Node: $(node -v)"
ok "pnpm: $(pnpm -v)"

if [[ -d "supabase" || -f "supabase/config.toml" ]]; then
  command_exists docker || fail "Docker is required because this project uses Supabase"
  command_exists supabase || fail "Supabase CLI is required because this project uses Supabase"

  ok "Docker CLI found"
  ok "Supabase CLI found"
else
  warn "Supabase folder not found. Skipping Docker/Supabase tool requirements."
fi

# --------------------------------------------------
# 5. Docker / Supabase local
# --------------------------------------------------

if [[ -f "supabase/config.toml" ]]; then
  log "Checking Docker"

  docker info >/dev/null 2>&1 || fail "Docker is not running. Open Docker Desktop."
  ok "Docker is running"

  log "Checking Supabase local stack"

  if supabase status >/dev/null 2>&1; then
    ok "Supabase local stack is running"
  else
    warn "Supabase is not running. Starting Supabase..."
    supabase start
    ok "Supabase started"
  fi
else
  warn "supabase/config.toml not found. Skipping Supabase local stack check."
fi

# --------------------------------------------------
# 6. Environment files
# --------------------------------------------------

log "Checking env files"

if [[ -f ".env.local" ]]; then
  ok ".env.local found"
else
  warn ".env.local not found"
fi

if [[ -f ".env" ]]; then
  warn ".env found. Make sure no secrets are committed."
fi

# --------------------------------------------------
# 7. Dependencies
# --------------------------------------------------

log "Checking dependencies"

if [[ ! -d "node_modules" ]]; then
  warn "node_modules not found. Installing dependencies..."

  if [[ -f "pnpm-lock.yaml" ]]; then
    pnpm install --frozen-lockfile
  else
    pnpm install
  fi

  ok "Dependencies installed"
else
  ok "node_modules found"
fi

# --------------------------------------------------
# 8. Harness sanity
# --------------------------------------------------

log "Checking spec status"

ACTIVE_COUNT=$(get_spec_status_lines | grep -cE "^Status:[[:space:]]*(DOING|TECH_REVIEW|UI_REVIEW|WAITING_IMPLEMENTER|RECOVERY)$" || true)
READY_COUNT=$(get_spec_status_lines | grep -cE "^Status:[[:space:]]*READY$" || true)
ACTIVE_COUNT="$(echo "$ACTIVE_COUNT" | tr -d " ")"
READY_COUNT="$(echo "$READY_COUNT" | tr -d " ")"

if [[ "$READY_COUNT" -gt 1 ]]; then
  fail "More than one spec is marked as READY"
fi

if [[ "$ACTIVE_COUNT" -gt 1 ]]; then
  fail "More than one spec is marked as DOING, TECH_REVIEW, UI_REVIEW, WAITING_IMPLEMENTER or RECOVERY"
fi

INVALID_STATUS=$(
  get_spec_status_lines \
    | grep -vE "^Status:[[:space:]]*(DRAFT|READY|DOING|TECH_REVIEW|UI_REVIEW|WAITING_IMPLEMENTER|CHANGES|RECOVERY|BLOCKED_RUNTIME|REVIEW|DONE)$" \
    || true
)

if [[ -n "$INVALID_STATUS" ]]; then
  echo "$INVALID_STATUS"
  fail "Invalid spec status found"
fi

ok "Spec status is valid"
warn "Runtime agent validation is not part of ./init.sh. Run pnpm ai:doctor before pnpm ai:runner."

# --------------------------------------------------
# 9. Project checks
# --------------------------------------------------

log "Running project checks"

run_script_if_exists "lint"
run_script_if_exists "typecheck"
run_script_if_exists "test"

if [[ "${RUN_BUILD:-0}" == "1" ]]; then
  run_script_if_exists "build"
else
  warn "Build skipped. Run with RUN_BUILD=1 ./init.sh to include build."
fi

# --------------------------------------------------
# 10. Optional UI checks
# --------------------------------------------------

if [[ "${RUN_UI:-0}" == "1" ]]; then
  log "Running optional UI/E2E checks"

  run_script_if_exists "test:e2e"
  run_script_if_exists "test:ui"
else
  warn "UI/E2E checks skipped. Run with RUN_UI=1 ./init.sh to include them."
fi

echo ""
ok "Project health check completed"
echo ""
