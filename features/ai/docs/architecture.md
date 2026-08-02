# AI Services Architecture

The AI feature is a self-contained service layer. UI never calls providers,
builds prompts, or manages conversation state — that all happens in services.

## Layout

```
features/ai/
  index.ts            public barrel (types, constants, hooks, actions, components)
  actions/            server actions (thin bridge → services)
  hooks/              client hooks (thin bridge → actions / SSE endpoint)
  components/         presentational UI (props only)
  types/              shared types
  schemas/            zod validation
  constants/          model catalog + defaults
  utils/              pure helpers (tokens, SSE, ids)
  server/             INTERNAL — never imported outside this module
    providers/        model registry, OpenRouter + Groq, model switching, fallbacks
    prompts/          prompt template engine + named registry
    memory/           memory store + conversation history helpers
    tools/            tool registry + LangChain adapter
    rag/              chunking + retriever pipeline
    vector/           embeddings + vector store
    cache/            TTL cache store
    analytics/        usage records + token tracking
    streaming/        SSE encoder for server streams
    errors/           typed errors + retry
    agents/           Deep Agents (`deepagents`) adapter built on the model registry
    services/         ChatService facade (orchestrates everything)
    mcp/              transport-agnostic MCP tools, registry, actions, adapter
    database.ts       read-only aggregation access for db.query
```

## Rules

- `features/ai/server/` is internal and never exported through the public barrel.
- Services are constructor-configured. Use `createChatService(deps)` for defaults.
- Secrets come from `lib/env.ts` at request time.
- Every call records usage analytics (tokens, model, provider, latency, cache hit).

## Adding a model

1. Add an entry to `constants/models.ts` (`groq/<id>` or `openrouter/<id>`).
2. Provider factories live in `server/providers/{groq,openrouter}.ts`.
3. Model switching and fallback are configuration-driven — no feature code changes.

## Streaming contract

`POST /api/ai/chat` with `{ stream: true }` returns an SSE stream:

```
event: start  → { type, conversationId, messageId, model }
event: delta  → { type, messageId, delta }
event: done   → { type, messageId, usage, cached }
event: error  → { type, messageId, code, message }
```

With `stream: false` it returns `{ ok, data: ChatResponse }`.

## Tool calling

Tools are defined as `AiToolDefinition` (`name`, `description`, zod `schema`,
`handler`) and registered in a `ToolRegistry`. `ChatRequest.tools` lists tool
names; the service binds them and loops up to 2 rounds. RAG retrieval is
injected into the system prompt when a `Retriever` is configured.

`createChatService()` seeds its `ToolRegistry` from the default MCP tool set via
`createMcpAgentToolRegistry()`, so every AI agent can discover and call the
platform's MCP capabilities.

## MCP (Model Context Protocol)

The MCP layer under `server/mcp/` is transport-agnostic: tools are plain
`McpToolSpec` objects (`name`, `description`, zod `schema`, `handler`) and never
reference the SDK.

- `types.ts` — `McpToolSpec` + the typed `tool()` factory.
- `registry.ts` — `McpToolRegistry` (register/unregister/discovery) with
  `toAgentTools()` bridging to `AiToolDefinition`.
- `actions.ts` — `ActionRegistry` for AI agent actions (`agent.run`).
- `server.ts` — `createMcpServer(registry)` wires specs onto the SDK
  `McpServer` using `registerTool` (zod input schemas).
- `tools/` — capability modules: discovery (`mcp.list_tools`, `mcp.tool_info`),
  registration (`mcp.register`, `mcp.unregister`), registry search,
  docs search, `db.query`, `fs.*`, `git.*`, `agent.*`.
- `result.ts` — maps handler returns to the JSON-RPC `CallToolResult` wire format.

Exposed over streamable HTTP at `GET/POST /api/mcp` using
`WebStandardStreamableHTTPServerTransport` (stateless, `enableJsonResponse`).
`@modelcontextprotocol/sdk` is in `next.config.ts` `serverExternalPackages`.

Adding a capability = add a `tool(...)` entry in a module under `tools/` and
register it in `createDefaultMcpRegistry()`.

## Persistence

In-memory stores are the default (memory, cache, vector, usage). Each store is
behind an interface (`MemoryStore`, `CacheStore`, `VectorStore`,
`UsageTracker`) so a MongoDB-backed implementation can be swapped in without
touching the service.

`createChatService()` automatically uses MongoDB-backed stores
(`server/db/`) when `MONGODB_URI` is set: `MongoMemoryStore`, `MongoCacheStore`,
`MongoUsageTracker`. Models live in `server/db/models.ts` (`ai_conversations`,
`ai_usage`, `ai_cache` collections). The MCP layer exposes them via
`memory.conversations`, `memory.get_conversation`, `usage.totals`, and
`usage.recent` tools.
