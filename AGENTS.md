# Agent Rules

## File Size Limits (MANDATORY)
- Preferred: 100 lines. Hard ceiling: 200 lines.
- Any file over 200 lines MUST be split into smaller reusable modules.
- Split by concern, not by line count.

## Feature Module Structure
Every domain module uses this template:

```
features/<name>/
  components/
  hooks/
  types/
  constants/
  utils/
  actions/
  schemas/
  tests/
  docs/
  index.ts
```

- One concern per file. Colocate small related pieces when under size limits.
- `index.ts` is always required at the module root as the public barrel.

## Modularity Rules
- One component = one file.
- Modules communicate through their `index.ts` barrel. No deep imports across modules.
- Extract a reusable piece into a shared module as soon as a second consumer exists.

## Refactoring
- Existing files that violate these rules are migrated module by module, keeping the build green after each step.
- Migration splits by concern first (largest, most cohesive wins), then within-architecture deduplication.

## AI Architecture Rules

### AI features are independent services
- Every AI feature lives under `features/ai/` as a self-contained service layer.
- AI logic MUST never be tightly coupled with UI. The service layer lives under `features/ai/server/` (plus `actions/`, `hooks/`, `components/` as thin bridges). UI components consume services through props/hooks — never import service internals directly.
- UI files must not construct prompts, call providers, or manage conversation state on the client. All of that happens in services.

### Every AI module MUST support these concerns (each as its own module under `features/ai/server/`)
- Prompt Templates — `server/prompts/`
- Streaming — `server/streaming/`
- Memory — `server/memory/`
- Conversation History — `server/memory/`
- Tool Calling — `server/tools/`
- RAG — `server/rag/`
- Vector Search — `server/vector/`
- Caching — `server/cache/`
- Error Handling — `server/errors/`
- Fallback Models — `server/providers/`
- Usage Analytics — `server/analytics/`
- Token Tracking — `server/analytics/`
- Model Switching — `server/providers/`

### Providers & models
- Providers: LangGraph (`@langchain/langgraph`), Deep Agents (`deepagents`), OpenRouter (`@langchain/openai` over OpenAI-compatible baseURL), GROQ (`@langcode/groq`).
- All models are resolved through the provider registry (`server/providers/`). Never instantiate a model directly in feature code.
- Every provider is pluggable: add a provider without touching consumers.
- Model switching is configuration-driven (model id → provider + model name), never hard-coded per call.

### Service contract
- Services are constructor-configured (deps injected), not singletons that import globals.
- Services expose `invoke`/`stream` style methods and never leak provider internals to callers.
- Secrets come from `lib/env.ts` at request time — never read `process.env` inline in services.
- Errors surface as typed errors from `server/errors/`, never raw provider exceptions.
- Every AI call records usage analytics (prompt tokens, completion tokens, model, provider, latency, cache hit).

### Streaming
- Streaming is server-generated (SSE). Clients receive events; they never call providers.
- Use `server/streaming/` to encode/decode stream events. Route handlers wrap the service stream; UI consumes via a thin hook.

### MCP
- MCP lives under `features/ai/server/mcp/` and is transport-agnostic: tools are `McpToolSpec` (zod schema + handler), never the SDK type. The SDK adapter (`createMcpServer`) wires them via `registerTool`.
- Exposed over streamable HTTP at `GET/POST /api/mcp` (stateless). `@modelcontextprotocol/sdk` stays in `serverExternalPackages`.
- `createMcpAgentToolRegistry()` seeds the ChatService `ToolRegistry` so agents can call the platform's MCP capabilities.

### Scale
- One concern per file; hard ceiling 200 lines (see File size limits).
- `features/ai/index.ts` is the public barrel (types, hooks, actions, components). `features/ai/server/` is internal — never exported through the public barrel.