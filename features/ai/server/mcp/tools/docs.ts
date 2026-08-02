import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { z } from "zod";
import { limitLength, workspaceRoot } from "../fs";
import { tool, type McpToolSpec } from "../types";

interface DocEntry {
  path: string;
  title: string;
}

export function docsTools(): McpToolSpec[] {
  return [
    tool(
      "docs.search",
      "Search documentation and markdown files in the repository for a query. Returns matching file paths with their headings.",
      z.object({
        query: z.string().min(1).max(200),
        maxResults: z.number().int().min(1).max(50).default(10),
      }),
      async ({ query, maxResults }) => {
        const root = await workspaceRoot();
        const docsDir = join(root, "docs");
        let files: string[] = [];
        try {
          const entries = await readdir(docsDir, { recursive: true, withFileTypes: true });
          files = entries
            .filter((e) => e.isFile() && /\.(md|mdx)$/i.test(e.name))
            .map((e) => join(e.parentPath ?? docsDir, e.name));
        } catch {
          files = [];
        }
        const needle = query.toLowerCase();
        const matches: DocEntry[] = [];
        for (const file of files) {
          const content = await readText(file);
          const lines = content.split("\n");
          const headingHits: string[] = [];
          const bodyHits: string[] = [];
          for (const line of lines) {
            const hit = line.toLowerCase().includes(needle);
            if (/^#{1,3}\s/.test(line.trim())) {
              if (hit) headingHits.push(line.trim());
            } else if (hit) {
              bodyHits.push(line.trim());
            }
            if (headingHits.length >= 5 && bodyHits.length >= 5) break;
          }
          if (headingHits.length || bodyHits.length) {
            matches.push({
              path: file,
              title: headingHits[0] ?? bodyHits[0] ?? file,
            });
          }
        }
        const ranked = matches
          .sort((a, b) => scoreDoc(b) - scoreDoc(a))
          .slice(0, maxResults);
        return {
          count: ranked.length,
          results: ranked.map((m) => ({
            path: m.path,
            title: limitLength(m.title, 120),
          })),
        };
      }
    ),
  ];
}

async function readText(file: string): Promise<string> {
  const { readFile } = await import("node:fs/promises");
  try {
    return await readFile(file, "utf8");
  } catch {
    return "";
  }
}

function scoreDoc(entry: DocEntry): number {
  const lower = entry.path.toLowerCase();
  let score = 0;
  if (lower.includes("readme")) score += 5;
  if (lower.includes("guide")) score += 3;
  if (lower.includes("api")) score += 3;
  return score;
}
