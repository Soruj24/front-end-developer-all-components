import { z } from "zod";
import type { McpToolRegistry } from "../registry";
import { tool, type McpToolSpec } from "../types";

export function registrationTools(registry: McpToolRegistry): McpToolSpec[] {
  return [
    tool(
      "mcp.register",
      "Register a new dynamic MCP tool at runtime. The handler is not executable; registration is for discovery.",
      z.object({
        name: z
          .string()
          .min(1)
          .max(64)
          .regex(/^[a-z0-9._-]+$/),
        description: z.string().min(1).max(2000),
      }),
      ({ name, description }) => {
        if (registry.has(name)) {
          throw new Error(`Tool already registered: ${name}`);
        }
        registry.register({
          name,
          description,
          schema: z.object({}),
          handler: () => "Dynamic tool registered; handler not executable.",
        });
        return { registered: name, count: registry.count() };
      }
    ),
    tool(
      "mcp.unregister",
      "Remove a previously registered dynamic MCP tool.",
      z.object({ name: z.string().min(1).max(64) }),
      ({ name }) => {
        const removed = registry.unregister(name);
        if (!removed) throw new Error(`Tool not found: ${name}`);
        return { unregistered: name, count: registry.count() };
      }
    ),
  ];
}
