import { z } from "zod";
import type { AiToolDefinition } from "../../types";
import { runReadOnlyQuery } from "../database";
import { ToolRegistry } from "./registry";

interface RegistryDoc {
  slug?: string;
  title?: string;
  description?: string;
}

/** Read-only registry search: finds existing components by keyword. */
export const searchComponentsTool: AiToolDefinition = {
  name: "search_components",
  description:
    "Search the component registry for existing components by keyword. " +
    "Returns id, title, and description so agents can reuse conventions.",
  schema: z.object({
    query: z.string().min(1),
    limit: z.number().int().min(1).max(20).default(5),
  }),
  handler: async (args: unknown) => {
    const { query, limit } = args as { query: string; limit?: number };
    try {
      const docs = await runReadOnlyQuery(
        "components",
        [{ $match: { title: { $regex: query, $options: "i" } } }],
        limit ?? 5
      );
      return docs.map((doc) => {
        const d = doc as RegistryDoc;
        return { id: d.slug ?? "", title: d.title ?? "", description: d.description ?? "" };
      });
    } catch {
      return { note: "Registry unavailable; no matches found.", results: [] };
    }
  },
};

/**
 * Builds the ToolRegistry used by generation-pipeline agents. Pre-registers
 * shared read-only tools; callers add domain tools per phase.
 */
export function createAgentToolRegistry(extra: AiToolDefinition[] = []): ToolRegistry {
  return new ToolRegistry().register(searchComponentsTool).registerMany(extra);
}
