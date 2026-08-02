import { z } from "zod";
import type { ActionRegistry } from "../actions";
import { tool, type McpToolSpec } from "../types";

export function agentActionTools(registry: ActionRegistry): McpToolSpec[] {
  return [
    tool(
      "agent.actions",
      "List the available AI agent actions and their identifiers.",
      z.object({}),
      () => ({
        actions: registry.list().map((a) => ({
          id: a.id,
          description: a.description,
        })),
      })
    ),
    tool(
      "agent.run",
      "Execute an AI agent action by identifier with its arguments.",
      z.object({
        id: z.string().min(1),
        args: z.record(z.string(), z.unknown()).default({}),
      }),
      async ({ id, args }) => {
        const result = await registry.execute(id, args);
        return { id, result };
      }
    ),
  ];
}
