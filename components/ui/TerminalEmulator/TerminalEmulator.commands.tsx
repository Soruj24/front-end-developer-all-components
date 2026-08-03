import type { TerminalCommand } from "./TerminalEmulator.types";
import { span } from "./TerminalEmulator.fs";
import { TERMINAL_THEMES } from "./TerminalEmulator.themes";

export const DEFAULT_COMMANDS: TerminalCommand[] = [
  {
    name: "help", description: "List available commands", usage: "help [command]",
    run: (args) => {
      const all = buildCommandIndex().filter((c) => !c.hidden);
      if (args[0]) {
        const cmd = all.find((c) => c.name === args[0]);
        if (!cmd) return [{ spans: [span(`help: no such command: ${args[0]}`, "error")] }];
        return [
          { spans: [span(cmd.name, "accent", { bold: true }), span(`  ${cmd.description}`)] },
          { spans: [span(`  usage: ${cmd.usage ?? cmd.name}`, "dim")] },
        ];
      }
      const width = Math.max(...all.map((c) => c.name.length)) + 2;
      const lines = all.map((cmd) => ({ spans: [span(`  ${cmd.name.padEnd(width)}`, "accent"), span(cmd.description)] }));
      lines.push({ spans: [span("\n  Tip: ", "dim"), span("Tab", "accent", { bold: true }), span(" autocompletes commands and paths. ", undefined), span("↑/↓", "accent", { bold: true }), span(" walk history. ", undefined), span("Ctrl+C", "accent", { bold: true }), span(" interrupts, ", undefined), span("Ctrl+L", "accent", { bold: true }), span(" clears.", undefined)] });
      return lines;
    },
  },
  { name: "clear", description: "Clear the screen", usage: "clear", run: (_args, ctx) => { ctx.clear(); return []; } },
  { name: "cls", description: "Alias for clear", usage: "cls", hidden: true, run: (_args, ctx) => { ctx.clear(); return []; } },
  { name: "whoami", description: "Print the current user", usage: "whoami", run: () => [{ spans: [span("ada", "accent")] }] },
  { name: "pwd", description: "Print the working directory", usage: "pwd", run: (_args, ctx) => [{ spans: [span(ctx.cwd(), "accent")] }] },
  { name: "ls", description: "List directory contents", usage: "ls [path]", run: (args, ctx) => {
    const target = args[0] ? ctx.resolve(args[0]) : ctx.cwd();
    const entries = ctx.list(target);
    if (!entries) return [{ spans: [span(`ls: cannot access '${args[0] ?? ""}': No such file or directory`, "error")] }];
    if (entries.length === 0) return [{ spans: [span("(empty)", "dim")] }];
    const row = entries.map((entry, i) => [i > 0 ? span("  ") : null, entry.isDir ? span(`${entry.name}/`, "accent") : span(entry.name)].filter(Boolean)).flat() as import("./TerminalEmulator.types").TermSpan[];
    return [{ spans: row }];
  } },
  { name: "cd", description: "Change directory", usage: "cd <path>", run: (args, ctx) => {
    const target = args[0] ?? "/home/ada";
    const abs = ctx.resolve(target);
    if (!ctx.cd(abs)) return [{ spans: [span(`cd: no such directory: ${target}`, "error")] }];
    return [];
  } },
  { name: "cat", description: "Print file contents", usage: "cat <file>", run: (args, ctx) => {
    if (!args[0]) return [{ spans: [span("usage: cat <file>", "warn")] }];
    const content = ctx.read(ctx.resolve(args[0]));
    if (content === null) return [{ spans: [span(`cat: ${args[0]}: No such file`, "error")] }];
    return content.split("\n");
  } },
  { name: "echo", description: "Echo text to the screen", usage: "echo <text>", run: (args) => [{ spans: [span(args.join(" "))], type: "chars", delay: 12 }] },
  { name: "date", description: "Show the current date and time", usage: "date", run: () => [{ spans: [span(new Date().toString())] }] },
  { name: "history", description: "Show command history", usage: "history", run: (_args, ctx) => ctx.history().map((h, i) => ({ spans: [span(`${String(i + 1).padStart(3)}  ${h}`, undefined, { dim: true })] })) },
];

export function buildCommandIndex(): TerminalCommand[] {
  const index = new Map<string, TerminalCommand>();
  for (const cmd of DEFAULT_COMMANDS) { if (!index.has(cmd.name)) index.set(cmd.name, cmd); }
  return [...index.values()];
}

export function longestCommonPrefix(values: string[]): string {
  if (values.length === 0) return "";
  let prefix = values[0];
  for (const value of values.slice(1)) { while (!value.startsWith(prefix)) prefix = prefix.slice(0, -1); }
  return prefix;
}
