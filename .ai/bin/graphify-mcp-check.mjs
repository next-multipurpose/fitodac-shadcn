#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.env.AI_GRAPHIFY_PROJECT_DIR || process.cwd();
const configPath = process.env.AI_GRAPHIFY_CONFIG || path.join(root, ".ai/graphify.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
const endpoint =
  process.env.AI_GRAPHIFY_MCP_URL ||
  `http://${config.host}:${config.port}${config.mcp_path}`;
const timeoutMs = Number(process.env.AI_GRAPHIFY_MCP_TIMEOUT_MS || 5000);

function parsePayload(text) {
  const trimmed = text.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    return JSON.parse(trimmed);
  }

  const data = trimmed
    .split(/\r?\n/)
    .filter((line) => line.startsWith("data:"))
    .map((line) => line.slice(5).trim())
    .join("");

  if (!data) {
    throw new Error(`MCP returned an unsupported response: ${trimmed.slice(0, 160)}`);
  }

  return JSON.parse(data);
}

async function request(message, sessionId = "") {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const headers = {
      accept: "application/json, text/event-stream",
      "content-type": "application/json",
    };
    if (sessionId) headers["mcp-session-id"] = sessionId;

    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(message),
      signal: controller.signal,
    });
    const text = await response.text();

    if (!response.ok) {
      throw new Error(`MCP HTTP ${response.status}: ${text.slice(0, 200)}`);
    }

    return {
      payload: parsePayload(text),
      sessionId: response.headers.get("mcp-session-id") || sessionId,
    };
  } finally {
    clearTimeout(timer);
  }
}

async function notify(message, sessionId) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const headers = {
      accept: "application/json, text/event-stream",
      "content-type": "application/json",
    };
    if (sessionId) headers["mcp-session-id"] = sessionId;

    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(message),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`MCP notification failed with HTTP ${response.status}`);
    }
  } finally {
    clearTimeout(timer);
  }
}

try {
  const initialized = await request({
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
    params: {
      protocolVersion: "2025-06-18",
      capabilities: {},
      clientInfo: { name: "lean-ai-harness-doctor", version: "1.0.0" },
    },
  });

  if (!initialized.payload?.result?.serverInfo) {
    throw new Error("MCP initialize response is missing serverInfo");
  }

  await notify(
    { jsonrpc: "2.0", method: "notifications/initialized", params: {} },
    initialized.sessionId,
  );

  const catalog = await request(
    { jsonrpc: "2.0", id: 2, method: "tools/list", params: {} },
    initialized.sessionId,
  );
  const names = new Set((catalog.payload?.result?.tools || []).map((tool) => tool.name));
  const missing = config.required_tools.filter((name) => !names.has(name));

  if (missing.length) {
    throw new Error(`Graphify MCP is missing required tools: ${missing.join(", ")}`);
  }

  const stats = await request(
    {
      jsonrpc: "2.0",
      id: 3,
      method: "tools/call",
      params: { name: "graph_stats", arguments: {} },
    },
    initialized.sessionId,
  );

  if (stats.payload?.error || !stats.payload?.result?.content?.length) {
    throw new Error("Graphify graph_stats did not return graph content");
  }

  const query = await request(
    {
      jsonrpc: "2.0",
      id: 4,
      method: "tools/call",
      params: {
        name: "query_graph",
        arguments: {
          question: "Lean AI Harness runner and agent wrapper",
          mode: "bfs",
          depth: 1,
          token_budget: 300,
        },
      },
    },
    initialized.sessionId,
  );

  if (query.payload?.error || !query.payload?.result?.content?.length) {
    throw new Error("Graphify query_graph did not return structural context");
  }

  process.stdout.write(
    `Graphify MCP healthy at ${endpoint} (${names.size} tools)\n`,
  );
} catch (error) {
  const message =
    error?.name === "AbortError"
      ? `Graphify MCP timed out at ${endpoint}`
      : error?.message || String(error);
  process.stderr.write(`${message}\n`);
  process.exit(1);
}
