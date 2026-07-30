#!/usr/bin/env bash

set -Eeuo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT_DIR"

RUN_DIR=".ai/run"
LOG_DIR="$RUN_DIR/logs"
PID_DIR="$RUN_DIR/pids"
PID_FILE="$PID_DIR/dev-server.pid"
LOG_FILE="$LOG_DIR/dev-server.log"

mkdir -p "$LOG_DIR" "$PID_DIR"

command_exists() {
  command -v "$1" >/dev/null 2>&1
}

has_script() {
  node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
process.exit(pkg.scripts && pkg.scripts[process.argv[1]] ? 0 : 1);
" "$1" >/dev/null 2>&1
}

is_running() {
  [[ -f "$PID_FILE" ]] || return 1
  local pid
  pid="$(cat "$PID_FILE" 2>/dev/null || true)"
  [[ -n "$pid" ]] && kill -0 "$pid" >/dev/null 2>&1
}

start_server() {
  command_exists node || { echo "Node.js not found" >&2; exit 1; }
  command_exists pnpm || { echo "pnpm not found" >&2; exit 1; }
  has_script dev || { echo "No pnpm dev script found" >&2; exit 1; }

  if is_running; then
    echo "Dev server already running. PID: $(cat "$PID_FILE")"
    echo "Log: $LOG_FILE"
    return 0
  fi

  echo "Starting dev server..."
  nohup pnpm dev >"$LOG_FILE" 2>&1 &
  echo $! > "$PID_FILE"
  echo "PID: $(cat "$PID_FILE")"
  echo "Log: $LOG_FILE"
}

stop_server() {
  if ! is_running; then
    echo "Dev server is not running."
    rm -f "$PID_FILE"
    return 0
  fi

  local pid
  pid="$(cat "$PID_FILE")"
  kill "$pid" >/dev/null 2>&1 || true
  rm -f "$PID_FILE"
  echo "Dev server stopped."
}

status_server() {
  if is_running; then
    echo "Dev server running. PID: $(cat "$PID_FILE")"
    echo "Log: $LOG_FILE"
  else
    echo "Dev server not running."
    [[ -f "$LOG_FILE" ]] && echo "Last log: $LOG_FILE"
  fi
}

case "${1:-status}" in
  start)
    start_server
    ;;
  stop)
    stop_server
    ;;
  restart)
    stop_server
    start_server
    ;;
  status)
    status_server
    ;;
  *)
    echo "Usage: .ai/bin/dev-server.sh start|stop|restart|status" >&2
    exit 2
    ;;
esac
