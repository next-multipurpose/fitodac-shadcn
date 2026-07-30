#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const ACTIVE_STATUSES = new Set([
  "READY",
  "DOING",
  "TECH_REVIEW",
  "UI_REVIEW",
  "WAITING_IMPLEMENTER",
  "CHANGES",
  "RECOVERY",
  "BLOCKED_RUNTIME",
])

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"))
  } catch {
    return null
  }
}

function statFile(file) {
  try {
    return fs.statSync(file)
  } catch {
    return null
  }
}

function processAlive(pid) {
  if (!Number.isInteger(pid) || pid <= 0) {
    return false
  }

  try {
    process.kill(pid, 0)
    return true
  } catch {
    return false
  }
}

function parseStatus(file) {
  const content = fs.readFileSync(file, "utf8")
  const match = content.match(/^Status:\s*(.+?)\s*$/m)
  return match ? match[1] : ""
}

function findActiveSpec(root) {
  const specsDir = path.join(root, ".ai", "specs")
  let specs = []

  try {
    specs = fs
      .readdirSync(specsDir)
      .filter((name) => name.endsWith(".md"))
      .sort()
  } catch {
    return { spec: "", status: "" }
  }

  for (const name of specs) {
    const relative = path.posix.join(".ai/specs", name)
    const absolute = path.join(specsDir, name)
    const status = parseStatus(absolute)
    if (ACTIVE_STATUSES.has(status)) {
      return { spec: relative, status }
    }
  }

  return { spec: "", status: "" }
}

function formatAgeFromDate(date, now) {
  if (!date || Number.isNaN(date.getTime())) {
    return "unknown"
  }

  const seconds = Math.max(0, Math.floor((now.getTime() - date.getTime()) / 1000))
  if (seconds < 60) {
    return `${seconds} seconds ago`
  }

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`
  }

  const hours = Math.floor(minutes / 60)
  if (hours < 48) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`
  }

  const days = Math.floor(hours / 24)
  return `${days} day${days === 1 ? "" : "s"} ago`
}

function findLastAction(root, logPath) {
  if (!logPath) {
    return "unknown"
  }

  const absoluteLog = path.resolve(root, logPath)
  let lines = []

  try {
    lines = fs.readFileSync(absoluteLog, "utf8").split(/\r?\n/)
  } catch {
    return "unknown"
  }

  for (let index = lines.length - 1; index >= 0; index -= 1) {
    const line = lines[index].replace(/\x1B\[[0-9;]*m/g, "").trim()
    if (line) {
      return line.length > 160 ? `${line.slice(0, 157)}...` : line
    }
  }

  return "unknown"
}

export function buildStatusReport(root = process.cwd(), now = new Date()) {
  const pidFile = path.join(root, ".ai", "run", "pids", "current.json")
  const heartbeatFile = path.join(root, ".ai", "run", "heartbeat.json")
  const runnerStateFile = path.join(root, ".ai", "run", "current.json")
  const pidState = readJson(pidFile)
  const heartbeat = readJson(heartbeatFile)
  const runnerState = readJson(runnerStateFile)
  const active = findActiveSpec(root)

  const activeSpec = pidState?.spec || active.spec || runnerState?.spec || "none"
  const status = active.status || runnerState?.status || "none"
  const agent = pidState?.agent || heartbeat?.agent || runnerState?.agent || "none"
  const pid = Number(pidState?.pid)
  const alive = processAlive(pid)
  const logPath = pidState?.log || runnerState?.log || ""
  const runtimeRoot = pidState?.runtimeRoot || "none"
  const logStat = logPath ? statFile(path.resolve(root, logPath)) : null
  const heartbeatDate = heartbeat?.updatedAt ? new Date(heartbeat.updatedAt) : null
  const lastAction = findLastAction(root, logPath)

  const lines = [
    "=== Lean AI Harness Status ===",
    `Active spec: ${activeSpec}`,
    `Status: ${status}`,
    `Agent: ${agent}`,
    `PID: ${Number.isInteger(pid) ? pid : "none"}`,
    `Process alive: ${alive ? "yes" : "no"}`,
    `Log: ${logPath || "none"}`,
    `Runtime root: ${runtimeRoot}`,
    `Last log update: ${logStat ? formatAgeFromDate(logStat.mtime, now) : "unknown"}`,
    `Heartbeat update: ${heartbeatDate ? formatAgeFromDate(heartbeatDate, now) : "unknown"}`,
    `Last known action: ${lastAction}`,
  ]

  if (status === "DOING" && pidState && !alive) {
    lines.push("Likely state: crashed or interrupted")
    lines.push("Recommended action: inspect log and move spec to RECOVERY or BLOCKED_RUNTIME")
  } else if (status === "DOING" && !pidState) {
    lines.push("Likely state: interrupted before PID tracking was written")
    lines.push("Recommended action: inspect log and move spec to RECOVERY or BLOCKED_RUNTIME")
  } else if (alive) {
    lines.push("Likely state: running")
  }

  return `${lines.join("\n")}\n`
}

if (import.meta.url === `file://${process.argv[1]}`) {
  process.stdout.write(buildStatusReport(process.cwd()))
}
