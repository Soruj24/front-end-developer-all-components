import { z } from "zod";
import { runReadOnlyQuery } from "../../database";
import { tool, type McpToolSpec } from "../types";

export function databaseTools(): McpToolSpec[] {
  return [
    tool(
      "db.query",
      "Run a read-only MongoDB aggregation pipeline against the registry database. Returns a subset of documents to bound response size.",
      z.object({
        collection: z.enum(["components", "categories", "tags", "navitems", "sessions"]),
        pipeline: z.array(z.record(z.string(), z.unknown())).max(20),
        limit: z.number().int().min(1).max(100).default(10),
      }),
      async ({ collection, pipeline, limit }) => {
        const docs = await runReadOnlyQuery(collection, pipeline, limit);
        return { count: docs.length, docs };
      }
    ),
  ];
}
