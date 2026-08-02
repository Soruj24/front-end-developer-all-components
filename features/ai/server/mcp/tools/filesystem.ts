import { readFile } from "node:fs/promises";
import { dirname } from "node:path";
import { z } from "zod";
import { limitLength, resolveWithinRoot, toProjectPath, walkFiles, workspaceRoot } from "../fs";
import { tool, type McpToolSpec } from "../types";

const MAX_READ_BYTES = 100_000;

export function filesystemTools(): McpToolSpec[] {
  return [
    tool(
      "fs.read",
      "Read a file from the workspace, relative to the repository root. Content is truncated at 100KB.",
      z.object({ path: z.string().min(1).max(500) }),
      async ({ path }) => {
        const root = await workspaceRoot();
        const target = resolveWithinRoot(root, path);
        const content = await readFile(target, "utf8");
        return {
          path,
          bytes: content.length,
          content: limitLength(content, MAX_READ_BYTES),
        };
      }
    ),
    tool(
      "fs.list",
      "List files and directories in a workspace directory.",
      z.object({
        path: z.string().default("."),
        depth: z.number().int().min(1).max(5).default(2),
      }),
      async ({ path, depth }) => {
        const root = await workspaceRoot();
        const target = resolveWithinRoot(root, path);
        const files = await walkFiles(target, depth);
        return {
          path,
          count: files.length,
          files: files
            .slice(0, 500)
            .map((f) => ({ path: toProjectPath(root, f), dir: dirname(f) })),
        };
      }
    ),
    tool(
      "fs.search",
      "Search workspace file contents for a case-insensitive query string.",
      z.object({
        query: z.string().min(1).max(200),
        path: z.string().default("."),
        maxResults: z.number().int().min(1).max(100).default(20),
      }),
      async ({ query, path, maxResults }) => {
        const root = await workspaceRoot();
        const target = resolveWithinRoot(root, path);
        const files = await walkFiles(target, 4);
        const needle = query.toLowerCase();
        const results: { path: string; line: number; text: string }[] = [];
        for (const file of files) {
          if (results.length >= maxResults) break;
          const content = await readFile(file, "utf8").catch(() => "");
          const lines = content.split("\n");
          for (let i = 0; i < lines.length; i++) {
            if (lines[i].toLowerCase().includes(needle)) {
              results.push({
                path: toProjectPath(root, file),
                line: i + 1,
                text: limitLength(lines[i].trim(), 200),
              });
              if (results.length >= maxResults) break;
            }
          }
        }
        return { count: results.length, results };
      }
    ),
  ];
}
