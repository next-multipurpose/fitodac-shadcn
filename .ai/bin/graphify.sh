#!/usr/bin/env bash

set -Eeuo pipefail

SCRIPT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
ROOT_DIR="${AI_GRAPHIFY_PROJECT_DIR:-$SCRIPT_ROOT}"
CONFIG_FILE="${AI_GRAPHIFY_CONFIG:-$SCRIPT_ROOT/.ai/graphify.json}"
GRAPHIFY_BIN="${AI_GRAPHIFY_BIN:-graphify}"
GRAPHIFY_MCP_BIN="${AI_GRAPHIFY_MCP_BIN:-graphify-mcp}"

config_value() {
  node -e "
const fs = require('fs');
const config = JSON.parse(fs.readFileSync(process.argv[1], 'utf8'));
const value = config[process.argv[2]];
if (value === undefined || value === null) process.exit(2);
process.stdout.write(String(value));
" "$CONFIG_FILE" "$1"
}

EXPECTED_VERSION="$(config_value version)"
GRAPH_PATH_VALUE="${AI_GRAPHIFY_GRAPH_PATH:-$(config_value graph_path)}"
HOST="${AI_GRAPHIFY_HOST:-$(config_value host)}"
PORT="${AI_GRAPHIFY_PORT:-$(config_value port)}"
MCP_PATH="${AI_GRAPHIFY_MCP_PATH:-$(config_value mcp_path)}"
RUN_DIR="${AI_GRAPHIFY_RUN_DIR:-$SCRIPT_ROOT/.ai/run/graphify}"
PID_FILE="$RUN_DIR/server.pid"
LOG_FILE="$RUN_DIR/server.log"
MCP_URL="http://$HOST:$PORT$MCP_PATH"

if [[ "$GRAPH_PATH_VALUE" = /* ]]; then
  GRAPH_PATH="$GRAPH_PATH_VALUE"
else
  GRAPH_PATH="$ROOT_DIR/$GRAPH_PATH_VALUE"
fi

mkdir -p "$RUN_DIR"

log() { printf '➜ %s\n' "$1"; }
ok() { printf '✓ %s\n' "$1"; }
warn() { printf '⚠ %s\n' "$1" >&2; }
fail() { printf '✗ %s\n' "$1" >&2; exit 1; }

command_exists() {
  command -v "$1" >/dev/null 2>&1
}

graphify_python() {
  local executable shebang
  executable="$(command -v "$GRAPHIFY_BIN" 2>/dev/null || true)"
  [[ -n "$executable" ]] || return 1
  shebang="$(head -n 1 "$executable" 2>/dev/null || true)"
  shebang="${shebang#\#!}"
  [[ -x "$shebang" ]] || return 1
  printf '%s' "$shebang"
}

validate_install() {
  local actual_version python_bin

  command_exists node || fail "Node.js is required by the Graphify harness integration"
  command_exists "$GRAPHIFY_BIN" || fail "Graphify is not installed. See docs/graphify.md"
  command_exists "$GRAPHIFY_MCP_BIN" || fail "graphify-mcp is not installed. See docs/graphify.md"

  actual_version="$("$GRAPHIFY_BIN" --version 2>/dev/null | awk '{print $NF}' | tail -n 1)"
  [[ "$actual_version" == "$EXPECTED_VERSION" ]] ||
    fail "Graphify $EXPECTED_VERSION is required; found ${actual_version:-unknown}"

  python_bin="$(graphify_python)" ||
    fail "Could not resolve the Python environment used by Graphify"

  "$python_bin" - <<'PY' >/dev/null 2>&1 || fail "Graphify SQL support or compatible MCP dependency is missing"
from importlib.metadata import version
import tree_sitter_sql
import mcp

major = int(version("mcp").split(".", 1)[0])
if major >= 2:
    raise SystemExit("mcp>=2 is not supported")
PY

  ok "Graphify $actual_version with SQL and mcp<2"
}

graph_is_valid() {
  [[ -s "$GRAPH_PATH" ]] || return 1
  node -e "
const fs = require('fs');
const graph = JSON.parse(fs.readFileSync(process.argv[1], 'utf8'));
if (!Array.isArray(graph.nodes) || !Array.isArray(graph.links)) process.exit(1);
" "$GRAPH_PATH" >/dev/null 2>&1
}

extract_and_cluster() {
  (
    cd "$ROOT_DIR"
    "$GRAPHIFY_BIN" extract . --code-only --no-cluster
    "$GRAPHIFY_BIN" cluster-only . --no-label
  )
}

init_graph() {
  validate_install
  if graph_is_valid; then
    ok "Graph already initialized at $GRAPH_PATH"
    return 0
  fi

  log "Initializing Graphify without AI"
  extract_and_cluster
  graph_is_valid || fail "Graphify initialization did not produce a valid graph"
  ok "Graph initialized at $GRAPH_PATH"
}

update_graph() {
  validate_install
  if ! graph_is_valid; then
    warn "Graph is missing or corrupt; rebuilding derived state"
    rebuild_graph
    return 0
  fi

  log "Updating Graphify incrementally without AI"
  extract_and_cluster
  graph_is_valid || fail "Graphify update produced an invalid graph"
  ok "Graph updated"
}

rebuild_graph() {
  validate_install

  local expected_parent
  expected_parent="$ROOT_DIR/graphify-out"
  [[ "$GRAPH_PATH" == "$expected_parent/graph.json" ]] ||
    fail "Refusing to rebuild unexpected graph path: $GRAPH_PATH"

  log "Rebuilding derived Graphify state without AI"
  rm -rf "$expected_parent"
  extract_and_cluster
  graph_is_valid || fail "Graphify rebuild did not produce a valid graph"
  ok "Graph rebuilt"
}

pid_is_alive() {
  local pid="$1"
  [[ "$pid" =~ ^[0-9]+$ ]] && kill -0 "$pid" >/dev/null 2>&1
}

mcp_is_healthy() {
  AI_GRAPHIFY_CONFIG="$CONFIG_FILE" \
    AI_GRAPHIFY_PROJECT_DIR="$ROOT_DIR" \
    AI_GRAPHIFY_MCP_URL="$MCP_URL" \
    node "$SCRIPT_ROOT/.ai/bin/graphify-mcp-check.mjs" >/dev/null 2>&1
}

port_is_open() {
  node -e "
const net = require('net');
const socket = net.createConnection({host: process.argv[1], port: Number(process.argv[2])});
const done = (code) => { socket.destroy(); process.exit(code); };
socket.setTimeout(800, () => done(1));
socket.once('connect', () => done(0));
socket.once('error', () => done(1));
" "$HOST" "$PORT" >/dev/null 2>&1
}

start_server() {
  validate_install
  graph_is_valid || fail "Graph is missing or corrupt. Run: pnpm ai:graphify:rebuild"

  if mcp_is_healthy; then
    if [[ -f "$PID_FILE" ]]; then
      local recorded_pid
      recorded_pid="$(cat "$PID_FILE" 2>/dev/null || true)"
      pid_is_alive "$recorded_pid" || rm -f "$PID_FILE"
    fi
    ok "Graphify MCP already healthy at $MCP_URL"
    return 0
  fi

  if [[ -f "$PID_FILE" ]]; then
    local stale_pid
    stale_pid="$(cat "$PID_FILE" 2>/dev/null || true)"
    if pid_is_alive "$stale_pid"; then
      warn "Stopping unhealthy Graphify process $stale_pid"
      kill "$stale_pid" >/dev/null 2>&1 || true
      wait "$stale_pid" 2>/dev/null || true
    fi
    rm -f "$PID_FILE"
  fi

  if port_is_open; then
    fail "Port $HOST:$PORT is occupied by a non-Graphify or unhealthy service"
  fi

  log "Starting shared Graphify MCP at $MCP_URL"
  nohup "$GRAPHIFY_MCP_BIN" "$GRAPH_PATH" \
    --transport http \
    --host "$HOST" \
    --port "$PORT" \
    --path "$MCP_PATH" \
    --json-response \
    </dev/null >"$LOG_FILE" 2>&1 &
  local server_pid="$!"
  printf '%s\n' "$server_pid" > "$PID_FILE"

  local attempt
  for attempt in {1..50}; do
    if mcp_is_healthy; then
      ok "Graphify MCP started with PID $server_pid"
      return 0
    fi
    if ! pid_is_alive "$server_pid"; then
      tail -n 30 "$LOG_FILE" >&2 || true
      rm -f "$PID_FILE"
      fail "Graphify MCP exited during startup"
    fi
    sleep 0.1
  done

  kill "$server_pid" >/dev/null 2>&1 || true
  rm -f "$PID_FILE"
  tail -n 30 "$LOG_FILE" >&2 || true
  fail "Graphify MCP did not become healthy"
}

status_server() {
  validate_install

  if ! graph_is_valid; then
    fail "Graphify graph is missing or corrupt: $GRAPH_PATH"
  fi

  if mcp_is_healthy; then
    AI_GRAPHIFY_CONFIG="$CONFIG_FILE" \
      AI_GRAPHIFY_PROJECT_DIR="$ROOT_DIR" \
      AI_GRAPHIFY_MCP_URL="$MCP_URL" \
      node "$SCRIPT_ROOT/.ai/bin/graphify-mcp-check.mjs"
    return 0
  fi

  fail "Graphify MCP is not healthy at $MCP_URL"
}

stop_server() {
  if [[ ! -f "$PID_FILE" ]]; then
    if mcp_is_healthy; then
      warn "Graphify MCP is externally managed; leaving it running"
    else
      ok "Graphify MCP is already stopped"
    fi
    return 0
  fi

  local pid
  pid="$(cat "$PID_FILE" 2>/dev/null || true)"
  if pid_is_alive "$pid"; then
    kill "$pid"
    local attempt
    for attempt in {1..30}; do
      pid_is_alive "$pid" || break
      sleep 0.1
    done
    if pid_is_alive "$pid"; then
      kill -9 "$pid" >/dev/null 2>&1 || true
    fi
  fi
  rm -f "$PID_FILE"
  ok "Graphify MCP stopped"
}

ensure_runtime() {
  validate_install
  if ! graph_is_valid; then
    rebuild_graph
  else
    update_graph
  fi
  start_server
  status_server
}

label_communities() {
  validate_install
  graph_is_valid || fail "Graph is missing or corrupt"
  warn "This manual command may consume AI tokens through Graphify's configured backend"
  (
    cd "$ROOT_DIR"
    "$GRAPHIFY_BIN" label .
  )
}

usage() {
  cat <<'TXT'
Usage: .ai/bin/graphify.sh <init|update|rebuild|start|status|stop|ensure|label>

Automatic commands use code-only extraction and --no-label clustering.
Only the explicit label command may use an AI backend.
TXT
}

case "${1:-}" in
  init) init_graph ;;
  update) update_graph ;;
  rebuild) rebuild_graph ;;
  start) start_server ;;
  status) status_server ;;
  stop) stop_server ;;
  ensure) ensure_runtime ;;
  label) label_communities ;;
  *) usage; exit 2 ;;
esac
