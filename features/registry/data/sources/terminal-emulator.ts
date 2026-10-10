export const terminalEmulatorSource: string = `"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface FsNode {
  type: "dir" | "file";
  children?: Record<string, FsNode>;
  content?: string;
}

export interface TerminalEmulatorProps {
  className?: string;
  height?: number;
  theme?: string;
  username?: string;
  hostname?: string;
  commands?: Array<{ name: string; description: string; run: (args: string[]) => string | string[] }>;
  boot?: boolean;
  bootScript?: string[];
  welcome?: string[];
  fs?: FsNode;
  autoFocus?: boolean;
}

interface Line {
  id: number;
  kind: "output" | "prompt";
  text: string;
}

const DEFAULT_FS: FsNode = {
  type: "dir",
  children: {
    components: { type: "dir", children: { Button: { type: "file", content: "export function Button() { /* ... */ }" } } },
    "README.md": { type: "file", content: "# Component Library\\n\\nRun help to list commands." },
  },
};

function splitArgs(input: string): string[] {
  return input.trim().split(/\\s+/).filter(Boolean);
}

export function TerminalEmulator({
  className,
  height = 320,
  theme = "dark",
  username = "developer",
  hostname = "component-library",
  commands = [],
  boot = false,
  bootScript = [],
  welcome = ["Type help to list available commands."],
  fs = DEFAULT_FS,
  autoFocus = false,
}: TerminalEmulatorProps) {
  const [lines, setLines] = useState<Line[]>(() => [
    ...(boot ? ["Booting terminal…"] : welcome),
    ...bootScript.map((s) => "$ " + s),
  ].map((text, i) => ({ id: i, kind: text.startsWith("$ ") ? "prompt" : "output", text })));
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [cwd, setCwd] = useState<string[]>([]);
  const idRef = useRef(100);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const prompt = username + "@" + hostname + ":~" + (cwd.length ? "/" + cwd.join("/") : "") + "$";

  const nodeAt = (path: string[]): FsNode | null => {
    let node: FsNode = fs;
    for (const seg of path) {
      if (node.type !== "dir") return null;
      const next = node.children?.[seg];
      if (!next) return null;
      node = next;
    }
    return node;
  };

  const custom = useMemo(() => new Map(commands.map((c) => [c.name, c])), [commands]);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const push = (entries: Array<{ kind: Line["kind"]; text: string }>) =>
    setLines((prev) => [
      ...prev,
      ...entries.map((e) => ({ ...e, id: ++idRef.current })),
    ]);

  const run = (raw: string) => {
    const trimmed = raw.trim();
    push([{ kind: "prompt", text: prompt + " " + raw }]);
    if (!trimmed) return;
    setHistory((h) => [trimmed, ...h].slice(0, 100));
    setHistoryIdx(-1);
    const [name, ...args] = splitArgs(trimmed);
    const customCmd = custom.get(name);
    if (customCmd) {
      const out = customCmd.run(args);
      push((Array.isArray(out) ? out : [out]).map((text) => ({ kind: "output" as const, text })));
      return;
    }
    switch (name) {
      case "help":
        push([
          { kind: "output", text: "Available commands:" },
          ...[...custom.values()].map((c) => ({ kind: "output" as const, text: "  " + c.name + " — " + c.description })),
          { kind: "output", text: "  help — list commands" },
          { kind: "output", text: "  echo — print arguments" },
          { kind: "output", text: "  whoami — print current user" },
          { kind: "output", text: "  pwd — print working directory" },
          { kind: "output", text: "  ls — list directory" },
          { kind: "output", text: "  cd — change directory" },
          { kind: "output", text: "  cat — print file contents" },
          { kind: "output", text: "  clear — clear the transcript" },
        ]);
        break;
      case "echo":
        push([{ kind: "output", text: args.join(" ") }]);
        break;
      case "whoami":
        push([{ kind: "output", text: username }]);
        break;
      case "pwd":
        push([{ kind: "output", text: "/~" + (cwd.length ? "/" + cwd.join("/") : "") }]);
        break;
      case "ls": {
        const node = nodeAt(cwd);
        if (!node || node.type !== "dir") push([{ kind: "output", text: "ls: cannot access directory" }]);
        else {
          const names = Object.keys(node.children ?? {});
          push([{ kind: "output", text: names.length ? names.join("  ") : "(empty)" }]);
        }
        break;
      }
      case "cd": {
        const target = args[0];
        if (!target || target === "~") setCwd([]);
        else if (target === "..") setCwd((c) => c.slice(0, -1));
        else {
          const next = [...cwd, target];
          const node = nodeAt(next);
          if (node && node.type === "dir") setCwd(next);
          else push([{ kind: "output", text: "cd: no such directory: " + target }]);
        }
        break;
      }
      case "cat": {
        const target = args[0];
        if (!target) push([{ kind: "output", text: "usage: cat <file>" }]);
        else {
          const node = nodeAt([...cwd, target]);
          if (node && node.type === "file") push([{ kind: "output", text: node.content ?? "" }]);
          else push([{ kind: "output", text: "cat: no such file: " + target }]);
        }
        break;
      }
      case "clear":
        setLines([]);
        break;
      default:
        push([{ kind: "output", text: name + ": command not found. Type help for a list." }]);
    }
  };

  const complete = () => {
    const parts = value.split(/\\s+/);
    const last = parts[parts.length - 1] ?? "";
    const builtins = ["help", "echo", "whoami", "pwd", "ls", "cd", "cat", "clear"];
    const names = [...builtins, ...custom.keys()];
    if (parts.length <= 1) {
      const match = names.find((n) => n.startsWith(last) && n !== last);
      if (match) {
        parts[parts.length - 1] = match;
        setValue(parts.join(" "));
      }
      return;
    }
    const node = nodeAt(cwd);
    const entries = node?.type === "dir" ? Object.keys(node.children ?? {}) : [];
    const match = entries.find((e) => e.startsWith(last) && e !== last);
    if (match) {
      parts[parts.length - 1] = match;
      setValue(parts.join(" "));
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-border font-mono text-[13px] leading-relaxed shadow-card",
        theme === "light" ? "bg-white text-zinc-900" : "bg-zinc-950 text-zinc-100",
        className
      )}
      style={{ height }}
      role="term"
      aria-label="Terminal emulator"
    >
      <div
        className={cn(
          "flex items-center gap-2 border-b px-3 py-2",
          theme === "light" ? "border-zinc-200 bg-zinc-50" : "border-white/10 bg-white/5"
        )}
      >
        <span className="flex gap-1.5" aria-hidden>
          <i className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <i className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
          <i className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
        </span>
        <span className="truncate text-xs opacity-70">
          {username}@{hostname}
        </span>
      </div>
      <div ref={scrollRef} className="scrollbar-thin min-h-0 flex-1 overflow-y-auto p-3">
        {lines.length === 0 && (
          <p className="opacity-50">Terminal cleared. Type help to begin.</p>
        )}
        {lines.map((l) =>
          l.kind === "prompt" ? (
            <p key={l.id} className="whitespace-pre-wrap break-words font-semibold">
              {l.text}
            </p>
          ) : (
            <p key={l.id} className="whitespace-pre-wrap break-words opacity-90">
              {l.text}
            </p>
          )
        )}
        <form
          className="mt-1 flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            run(value);
            setValue("");
          }}
        >
          <span className="shrink-0 font-semibold text-emerald-500">{prompt}</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp") {
                e.preventDefault();
                const next = Math.min(history.length - 1, historyIdx + 1);
                if (history[next] !== undefined) {
                  setHistoryIdx(next);
                  setValue(history[next]);
                }
              } else if (e.key === "ArrowDown") {
                e.preventDefault();
                const next = historyIdx - 1;
                setHistoryIdx(Math.max(-1, next));
                setValue(next >= 0 ? history[next] : "");
              } else if (e.key === "Tab") {
                e.preventDefault();
                complete();
              } else if (e.key === "l" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setLines([]);
              }
            }}
            aria-label="Terminal input"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent outline-none placeholder:opacity-40"
            placeholder="Type help…"
          />
        </form>
      </div>
    </div>
  );
}
`;
