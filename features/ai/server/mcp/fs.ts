import { execFile } from "node:child_process";
import { readdir } from "node:fs/promises";
import { join, resolve, sep } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const IGNORED_DIRS = new Set(["node_modules", ".next", ".git", ".turbo", "dist", "build", "coverage"]);

let cachedRoot: string | undefined;

export async function workspaceRoot(): Promise<string> {
  if (cachedRoot) return cachedRoot;
  try {
    const { stdout } = await execFileAsync("git", ["rev-parse", "--show-toplevel"], {
      cwd: process.cwd(),
    });
    cachedRoot = resolve(String(stdout).trim());
  } catch {
    cachedRoot = process.cwd();
  }
  return cachedRoot;
}

export function resolveWithinRoot(root: string, target: string): string {
  const resolved = resolve(root, target);
  if (resolved !== root && !resolved.startsWith(root + sep)) {
    throw new Error(`Path escapes workspace root: ${target}`);
  }
  return resolved;
}

export async function walkFiles(root: string, maxDepth = 5): Promise<string[]> {
  const files: string[] = [];
  const visit = async (dir: string, depth: number): Promise<void> => {
    if (depth > maxDepth) return;
    let entries;
    try {
      entries = await readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (IGNORED_DIRS.has(entry.name)) continue;
        await visit(join(dir, entry.name), depth + 1);
      } else if (entry.isFile()) {
        files.push(join(dir, entry.name));
      }
    }
  };
  await visit(root, 0);
  return files;
}

export function toProjectPath(root: string, absolute: string): string {
  const relative = absolute.startsWith(root) ? absolute.slice(root.length) : absolute;
  return relative.replace(/\\/g, "/").replace(/^\//, "");
}

export function limitLength(text: string, max: number): string {
  return text.length <= max ? text : `${text.slice(0, max)}…`;
}
