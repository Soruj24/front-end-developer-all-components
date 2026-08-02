import { z } from "zod";
import type { McpToolRegistry } from "../registry";
import { tool, type McpToolSpec } from "../types";

export function discoveryTools(registry: McpToolRegistry): McpToolSpec[] {
  return [
    tool(
      "mcp.list_tools",
      "List all MCP tools currently available, optionally filtered by capability. Use this first to discover what the agent can do.",
      z.object({
        capability: z
          .enum(["component", "registry", "docs", "database", "fs", "git", "agent", "mcp"])
          .optional(),
      }),
      ({ capability }) => {
        let tools = registry.list().map((spec) => ({
          name: spec.name,
          description: spec.description,
        }));
        if (capability) {
          const prefix = capability.toLowerCase();
          tools = tools.filter(
            (item) => item.name.startsWith(`${prefix}.`) || item.name.includes(`.${prefix}.`)
          );
        }
        return { count: tools.length, tools };
      }
    ),
    tool(
      "mcp.tool_info",
      "Return details for a single tool: description and parameter names.",
      z.object({ name: z.string().min(1) }),
      ({ name }) => {
        const spec = registry.get(name);
        if (!spec) throw new Error(`Unknown tool: ${name}`);
        return {
          name: spec.name,
          description: spec.description,
          params: Object.keys(spec.schema.shape),
        };
      }
    ),
  ];
}
