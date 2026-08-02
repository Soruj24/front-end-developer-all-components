import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { z } from "zod";
import { tool, type McpToolSpec } from "../types";

const execFileAsync = promisify(execFile);

const GIT_WRITE_COMMANDS = new Set(["commit", "checkout", "reset", "stash", "add", "rm", "mv"]);

async function git(args: string[]): Promise<string> {
  const { stdout, stderr } = await execFileAsync("git", args, {
    cwd: process.cwd(),
    maxBuffer: 10 * 1024 * 1024,
  });
  return `${stdout}${stderr}`.trim();
}

export function gitTools(): McpToolSpec[] {
  return [
    tool(
      "git.status",
      "Show the current git status (read-only).",
      z.object({}),
      async () => ({ status: await git(["status", "--short"]) })
    ),
    tool(
      "git.log",
      "Show recent commit history.",
      z.object({
        limit: z.number().int().min(1).max(100).default(20),
      }),
      async ({ limit }) => ({
        commits: await git(["log", `--max-count=${limit}`, "--oneline"]),
      })
    ),
    tool(
      "git.diff",
      "Show the working-tree diff for a path (read-only).",
      z.object({
        path: z.string().optional(),
      }),
      async ({ path }) => ({
        diff: await git(path ? ["diff", "--", path] : ["diff"]),
      })
    ),
    tool(
      "git.branch",
      "List git branches and the current branch.",
      z.object({}),
      async () => ({ branches: await git(["branch", "-a"]) })
    ),
    tool(
      "git.execute",
      "Run a non-destructive git command. Write commands (commit, checkout, reset, stash, add, rm, mv) are rejected.",
      z.object({
        args: z.array(z.string().min(1).max(200)).min(1).max(20),
      }),
      async ({ args }) => {
        const head = args[0].toLowerCase();
        if (GIT_WRITE_COMMANDS.has(head)) {
          throw new Error(`Write command 'git ${head}' is not allowed.`);
        }
        const output = await git(args);
        return { output };
      }
    ),
  ];
}
