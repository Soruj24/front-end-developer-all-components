import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { McpToolRegistry } from "./registry";
import { toMcpError, toMcpResult } from "./result";

export function createMcpServer(registry: McpToolRegistry): McpServer {
  const server = new McpServer(
    {
      name: "component-ai-mcp",
      version: "1.0.0",
    },
    {
      capabilities: { tools: {} },
    }
  );

  for (const spec of registry.list()) {
    server.registerTool(
      spec.name,
      {
        description: spec.description,
        inputSchema: spec.schema,
      },
      async (args) => {
        try {
          const parsed = spec.schema.safeParse(args ?? {});
          if (!parsed.success) {
            return toMcpError(`Invalid arguments: ${parsed.error.message}`);
          }
          const value = await spec.handler(parsed.data);
          return toMcpResult(value);
        } catch (error) {
          return toMcpError(error instanceof Error ? error.message : String(error));
        }
      }
    );
  }

  return server;
}
