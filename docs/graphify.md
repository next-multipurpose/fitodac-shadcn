# Graphify in the Lean AI Harness

Graphify is required harness infrastructure. It is a derived structural index
of the repository, not a source of truth. Source code, specs, project rules,
documentation, and progress files remain authoritative.

## Validated installation

The harness validates Graphify `0.9.34`, SQL parsing, and `mcp<2`. Installation
is a one-time machine action and is never performed automatically:

```bash
uv tool install --force "graphifyy[mcp,sql]==0.9.34" --with "mcp<2"
```

## Harness commands

```bash
pnpm ai:graphify:init
pnpm ai:graphify:update
pnpm ai:graphify:start
pnpm ai:graphify:status
pnpm ai:graphify:stop
pnpm ai:graphify:query "<question>"
pnpm ai:graphify:path "<source>" "<target>"
pnpm ai:graphify:explain "<node>"
pnpm ai:graphify:rebuild
```

Initialization and updates use local AST extraction and community clustering
without labels. They do not invoke an LLM. `pnpm ai:graphify:label` is the only
command that may use an AI backend and must be run manually and intentionally.

`pnpm ai:doctor` initializes or repairs the graph, updates it, starts the shared
MCP server, and verifies its tool catalog. The runner rechecks it before agents
and refreshes the graph before technical review.

Generated state lives in `graphify-out/` and is ignored by Git. Runtime PID and
logs live in `.ai/run/graphify/`.

## Shared MCP

The local endpoint is:

```text
http://127.0.0.1:8081/mcp
```

OpenCode CLI roles launched by the harness receive a temporary runtime config
automatically. The harness does not modify personal configurations.

The Codex implementer does not depend on native MCP tool exposure. It queries
the same graph through the harness CLI commands above. Reviewer and UI reviewer
roles keep using this shared HTTP MCP. The CLI commands only read the existing
`graphify-out/graph.json`; they do not duplicate the graph or start another
Graphify server.

The doctor validates these capabilities by role: a real harness CLI query for
Codex and the shared MCP configuration for OpenCode.

For manually launched clients, add the endpoint once:

### Codex

```bash
codex mcp add graphify --url http://127.0.0.1:8081/mcp
```

### Cursor

Add a remote MCP server named `graphify` with the URL above in Cursor's MCP
settings.

### Trae Solo

Add a remote HTTP MCP server named `graphify` with the URL above in Trae's MCP
settings. The manual implementer prompt assumes this one-time setup is done.

These commands/settings configure clients only; they do not install Graphify in
the clients.

## Agent usage

Use Graphify first for broad structural questions:

- architecture discovery
- dependency and call tracing
- locating an implementation
- impact analysis

Start with a narrow query and a small output budget. Then read the identified
source files directly. Do not use Graphify as authoritative evidence for exact
implementation behavior, official decisions, or task state.

## Recovery

If the graph is empty, corrupt, or inconsistent:

```bash
pnpm ai:graphify:rebuild
```

The command only removes and reconstructs ignored derived state. If port `8081`
is occupied by a different service, Graphify fails explicitly instead of
terminating that process.

## Token benchmark

The measurement is informative, not an acceptance gate:

```bash
graphify benchmark graphify-out/graph.json
```

On the graph refreshed on 2026-07-30, Graphify reported approximately 141,533
tokens for a naive corpus read versus 4,431 tokens per representative graph
query, or 31.9 times less query context. Actual task savings vary, and MCP tool
schemas also consume some context.
