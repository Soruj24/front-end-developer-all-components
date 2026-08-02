import { z } from "zod";
import {
  getComponents,
  getComponentBySlug,
  type ComponentQuery,
} from "@/features/registry/server/service";
import { tool, type McpToolSpec } from "../types";

export function registryTools(): McpToolSpec[] {
  return [
    tool(
      "registry.search",
      "Search the component registry by query, category, tag, or status. Returns matching component summaries.",
      z.object({
        query: z.string().optional(),
        category: z.string().optional(),
        tag: z.string().optional(),
        status: z.enum(["stable", "beta", "new", "deprecated"]).optional(),
        limit: z.number().int().min(1).max(100).default(20),
      }),
      async ({ query, category, tag, status, limit }) => {
        const queryArgs: ComponentQuery = { query, category, tag, pageSize: limit };
        const result = await getComponents(queryArgs);
        const components = result
          .filter((c) => !status || c.status === status)
          .map((c) => ({
            slug: c.slug,
            name: c.name,
            category: c.category,
            status: c.status,
            version: c.version,
            description: c.description,
          }));
        return { count: components.length, components };
      }
    ),
    tool(
      "registry.get_component",
      "Get a single component by slug from the registry.",
      z.object({ slug: z.string().min(1) }),
      async ({ slug }) => {
        const result = await getComponentBySlug(slug);
        if (!result) throw new Error(`Component not found: ${slug}`);
        return {
          slug: result.slug,
          name: result.name,
          description: result.description,
          longDescription: result.longDescription,
          category: result.category,
          tags: result.tags,
          status: result.status,
          version: result.version,
          install: result.install,
          cli: result.cli,
          files: result.files,
          variants: result.variants,
        };
      }
    ),
    tool(
      "registry.list_components",
      "List component slugs grouped by category.",
      z.object({
        category: z.string().optional(),
        limit: z.number().int().min(1).max(500).default(100),
      }),
      async ({ category, limit }) => {
        const queryArgs: ComponentQuery = { category, pageSize: limit };
        const result = await getComponents(queryArgs);
        const byCategory = new Map<string, string[]>();
        for (const c of result) {
          const list = byCategory.get(c.category) ?? [];
          list.push(c.slug);
          byCategory.set(c.category, list);
        }
        return {
          count: result.length,
          categories: Object.fromEntries(byCategory),
        };
      }
    ),
  ];
}
