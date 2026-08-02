"use client";

import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface TermSpan {
  text: string;
  /** Theme color key or a raw CSS color. */
  color?: "accent" | "success" | "warn" | "error" | "dim" | "bright" | string;
  dim?: boolean;
  bold?: boolean;
}

export type TermLineOut = string | { spans: TermSpan[]; type?: "line" | "chars"; delay?: number };
export type TermOut = TermLineOut | TermLineOut[];

export interface TerminalContext {
  cwd: () => string;
  /** Change the working directory to an already-resolved absolute path. */
  cd: (abs: string) => boolean;
  read: (abs: string) => string | null;
  list: (abs: string) => { name: string; isDir: boolean }[] | null;
  isDir: (abs: string) => boolean;
  /** Resolve a possibly-relative path against the cwd. */
  resolve: (rel: string) => string;
  theme: () => string;
  setTheme: (id: string) => void;
  clear: () => void;
  history: () => string[];
  isCancelled: () => boolean;
}

export interface TerminalCommand {
  name: string;
  description: string;
  usage?: string;
  hidden?: boolean;
  run: (args: string[], ctx: TerminalContext) => TermOut | Promise<TermOut>;
}

export interface TerminalEmulatorProps {
  className?: string;
  /** Initial terminal height in px (resizable via the bottom handle). */
  height?: number;
  /** Initial theme id. */
  theme?: string;
  username?: string;
  hostname?: string;
  /** Extra commands merged over the built-in ones. */
  commands?: TerminalCommand[];
  /** Play the boot typing animation on mount. */
  boot?: boolean;
  /** Commands auto-typed during boot (after the welcome banner). */
  bootScript?: string[];
  /** Extra welcome banner lines printed before the boot script. */
  welcome?: string[];
  /** Virtual filesystem root. */
  fs?: FsNode;
  autoFocus?: boolean;
}

export interface TermTheme {
  id: string;
  label: string;
  bg: string;
  fg: string;
  dim: string;
  accent: string;
  success: string;
  warn: string;
  error: string;
  border: string;
  header: string;
}

export interface FsNode {
  type: "dir" | "file";
  children?: Record<string, FsNode>;
  content?: string;
}

interface TranscriptLine {
  id: number;
  kind: "output" | "prompt";
  spans: TermSpan[];
  raw?: string;
}

/* ------------------------------------------------------------------ */
/* Themes                                                              */
/* ------------------------------------------------------------------ */

export const TERMINAL_THEMES: TermTheme[] = [
  {
    id: "term",
    label: "Terminal",
    bg: "#0b0e14",
    fg: "#cdd6e4",
    dim: "#5b6472",
    accent: "#7aa2f7",
    success: "#9ece6a",
    warn: "#e0af68",
    error: "#f7768e",
    border: "#1f2430",
    header: "#10141c",
  },
  {
    id: "matrix",
    label: "Matrix",
    bg: "#04120a",
    fg: "#3ceb8a",
    dim: "#1f7a4a",
    accent: "#3ceb8a",
    success: "#7dffb0",
    warn: "#ffd166",
    error: "#ff5d5d",
    border: "#0d2b1a",
    header: "#06180e",
  },
  {
    id: "light",
    label: "Light",
    bg: "#fafaf9",
    fg: "#1f2430",
    dim: "#9ca3af",
    accent: "#7c3aed",
    success: "#15803d",
    warn: "#b45309",
    error: "#dc2626",
    border: "#e4e4df",
    header: "#f1f1ee",
  },
  {
    id: "amber",
    label: "Amber",
    bg: "#161009",
    fg: "#f3d9a4",
    dim: "#8a744d",
    accent: "#ffb020",
    success: "#c8f09b",
    warn: "#ffd166",
    error: "#ff7b5c",
    border: "#2c2112",
    header: "#1d150c",
  },
  {
    id: "cyber",
    label: "Cyber",
    bg: "#150b22",
    fg: "#e7dcff",
    dim: "#7a6a8f",
    accent: "#ff2e88",
    success: "#4ade80",
    warn: "#fbbf24",
    error: "#ff4d4d",
    border: "#2d1a45",
    header: "#1c0f2e",
  },
  {
    id: "ocean",
    label: "Ocean",
    bg: "#0a1226",
    fg: "#c3d5ff",
    dim: "#5c6f96",
    accent: "#5b8cff",
    success: "#5eead4",
    warn: "#fcd34d",
    error: "#fb7185",
    border: "#182547",
    header: "#0d1730",
  },
];

/* ------------------------------------------------------------------ */
/* Virtual filesystem                                                  */
/* ------------------------------------------------------------------ */

const HOME = "/home/ada";

export const DEFAULT_TERMINAL_FS: FsNode = {
  type: "dir",
  children: {
    home: {
      type: "dir",
      children: {
        ada: {
          type: "dir",
          children: {
            "notes.txt": {
              type: "file",
              content: "Todo:\n- Ship the terminal emulator\n- Hide a secret somewhere\n- Profit",
            },
            projects: {
              type: "dir",
              children: {
                "terminal.tsx": { type: "file", content: "// A browser terminal with zero backend." },
                "readme.md": {
                  type: "file",
                  content: "# playground-terminal\n\nAn interactive, no-backend terminal demo.",
                },
              },
            },
          },
        },
      },
    },
    etc: {
      type: "dir",
      children: {
        "config.yaml": { type: "file", content: "theme: terminal\nuser: ada\nmotd: enabled" },
      },
    },
    usr: { type: "dir", children: { bin: { type: "dir", children: {} } } },
    tmp: { type: "dir", children: {} },
    var: {
      type: "dir",
      children: {
        log: {
          type: "dir",
          children: {
            "app.log": { type: "file", content: "[info] boot ok\n[info] terminal ready" },
          },
        },
      },
    },
  },
};

function normalizePath(cwd: string, input: string): string {
  let raw = input.trim();
  if (raw === "~") raw = HOME;
  else if (raw.startsWith("~/")) raw = `${HOME}/${raw.slice(2)}`;
  const joined = raw.startsWith("/") ? raw : `${cwd}/${raw}`;
  const parts: string[] = [];
  for (const seg of joined.split("/")) {
    if (!seg || seg === ".") continue;
    if (seg === "..") parts.pop();
    else parts.push(seg);
  }
  return "/" + parts.join("/");
}

function resolveNode(root: FsNode, abs: string): FsNode | null {
  const parts = abs.split("/").filter(Boolean);
  let node: FsNode = root;
  for (const part of parts) {
    if (node.type !== "dir" || !node.children) return null;
    const next = node.children[part];
    if (!next) return null;
    node = next;
  }
  return node;
}

function shortCwd(cwd: string): string {
  if (cwd === HOME) return "~";
  if (cwd.startsWith(`${HOME}/`)) return `~/${cwd.slice(HOME.length + 1)}`;
  return cwd;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function copyToClipboard(text: string): void {
  if (navigator.clipboard?.writeText) {
    void navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
  } catch {
    /* ignore */
  }
  document.body.removeChild(textarea);
}

const RANDOM_GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=|<>アカサタナハマヤラワ";

function randomLine(length: number): string {
  let out = "";
  for (let i = 0; i < length; i += 1) {
    out += RANDOM_GLYPHS[Math.floor(Math.random() * RANDOM_GLYPHS.length)];
  }
  return out;
}

function span(text: string, color?: TermSpan["color"], opts?: { dim?: boolean; bold?: boolean }): TermSpan {
  return { text, color, dim: opts?.dim, bold: opts?.bold };
}

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

const icon = (path: string) =>
  function Icon({
    className = "h-4 w-4",
    style,
  }: {
    className?: string;
    style?: React.CSSProperties;
  }) {
    return (
      <svg
        className={className}
        style={style}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.8}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={path} />
      </svg>
    );
  };

const TerminalIcon = icon(
  "M2.25 7.125c0-.621.504-1.125 1.125-1.125h17.25c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125H3.375A1.125 1.125 0 0 1 2.25 16.875v-9.75zM8.25 9.75 11.25 12l-3 2.25m5.25.75h3"
);
const CopyIcon = icon("M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75");
const CheckIcon = icon("m4.5 12.75 6 6 9-13.5");
const TrashIcon = icon("m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0");
const PaletteIcon = icon("M12 3a9 9 0 1 0 0 18h1.5a2.25 2.25 0 0 0 1.732-3.732 2.25 2.25 0 0 1 1.268-4.518H18A6 6 0 0 0 12 3zM7.5 12a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25zm3-4.5a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25zm3 0a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25zm3 4.5a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25z");
const ChevronUpIcon = icon("m4.5 15.75 7.5-7.5 7.5 7.5");
const ChevronDownIcon = icon("m19.5 8.25-7.5 7.5-7.5-7.5");

/* ------------------------------------------------------------------ */
/* Default commands                                                    */
/* ------------------------------------------------------------------ */

const DEFAULT_COMMANDS: TerminalCommand[] = [
    {
      name: "help",
      description: "List available commands",
      usage: "help [command]",
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
        const lines: TermLineOut[] = [];
        for (const cmd of all) {
          lines.push({
            spans: [span(`  ${cmd.name.padEnd(width)}`, "accent"), span(cmd.description)],
          });
        }
        lines.push({
          spans: [
            span("\n  Tip: ", "dim"),
            span("Tab", "accent", { bold: true }),
            span(" autocompletes commands and paths. ", undefined),
            span("↑/↓", "accent", { bold: true }),
            span(" walk history. ", undefined),
            span("Ctrl+C", "accent", { bold: true }),
            span(" interrupts, ", undefined),
            span("Ctrl+L", "accent", { bold: true }),
            span(" clears.", undefined),
          ],
        });
        return lines;
      },
    },
    {
      name: "clear",
      description: "Clear the screen",
      usage: "clear",
      run: (_args, ctx) => {
        ctx.clear();
        return [];
      },
    },
    { name: "cls", description: "Alias for clear", usage: "cls", hidden: true, run: (_args, ctx) => { ctx.clear(); return []; } },
    {
      name: "whoami",
      description: "Print the current user",
      usage: "whoami",
      run: () => [{ spans: [span("ada", "accent")] }],
    },
    {
      name: "pwd",
      description: "Print the working directory",
      usage: "pwd",
      run: (_args, ctx) => [{ spans: [span(ctx.cwd(), "accent")] }],
    },
    {
      name: "ls",
      description: "List directory contents",
      usage: "ls [path]",
      run: (args, ctx) => {
        const target = args[0] ? ctx.resolve(args[0]) : ctx.cwd();
        const entries = ctx.list(target);
        if (!entries) return [{ spans: [span(`ls: cannot access '${args[0] ?? ""}': No such file or directory`, "error")] }];
        if (entries.length === 0) return [{ spans: [span("(empty)", "dim")] }];
        const row: TermSpan[] = [];
        entries.forEach((entry, i) => {
          if (i > 0) row.push(span("  "));
          row.push(entry.isDir ? span(`${entry.name}/`, "accent") : span(entry.name));
        });
        return [{ spans: row }];
      },
    },
    {
      name: "cd",
      description: "Change directory",
      usage: "cd <path>",
      run: (args, ctx) => {
        const target = args[0] ?? HOME;
        const abs = ctx.resolve(target);
        if (!ctx.cd(abs)) {
          return [{ spans: [span(`cd: no such directory: ${target}`, "error")] }];
        }
        return [];
      },
    },
    {
      name: "cat",
      description: "Print file contents",
      usage: "cat <file>",
      run: (args, ctx) => {
        if (!args[0]) return [{ spans: [span("usage: cat <file>", "warn")] }];
        const content = ctx.read(ctx.resolve(args[0]));
        if (content === null) return [{ spans: [span(`cat: ${args[0]}: No such file`, "error")] }];
        return content.split("\n");
      },
    },
    {
      name: "echo",
      description: "Echo text to the screen",
      usage: "echo <text>",
      run: (args) => [{ spans: [span(args.join(" "))], type: "chars", delay: 12 }],
    },
    {
      name: "date",
      description: "Show the current date and time",
      usage: "date",
      run: () => [{ spans: [span(new Date().toString())] }],
    },
    {
      name: "history",
      description: "Show command history",
      usage: "history",
      run: (_args, ctx) =>
        ctx.history().map((h, i) => ({
          spans: [span(`${String(i + 1).padStart(3)}  ${h}`, undefined, { dim: true })],
        })),
    },
    {
      name: "theme",
      description: "Switch color theme",
      usage: "theme <name>",
      run: (args, ctx) => {
        if (!args[0]) return [{ spans: [span("usage: theme <name>", "warn")] }];
        const found = TERMINAL_THEMES.find(
          (t) => t.id === args[0] || t.label.toLowerCase() === args[0].toLowerCase()
        );
        if (!found) {
          return [
            { spans: [span(`theme: unknown theme '${args[0]}'. Try one of:`, "error")] },
            { spans: TERMINAL_THEMES.map((t) => span(`${t.id} `, "accent")) },
          ];
        }
        ctx.setTheme(found.id);
        return [{ spans: [span(`theme set to ${found.label}`, "success")] }];
      },
    },
    {
      name: "themes",
      description: "List available themes",
      usage: "themes",
      run: (_args, ctx) => {
        const current = ctx.theme();
        return TERMINAL_THEMES.map((t) => {
          const marker = t.id === current ? span("*", "success", { bold: true }) : span(" ");
          return { spans: [marker, span(`  ${t.id.padEnd(10)}`, "accent"), span(t.label)] };
        });
      },
    },
    {
      name: "neofetch",
      description: "System information",
      usage: "neofetch",
      run: (_args, ctx) => {
        const art = [
          "   _______  _____  _____  _____   ______",
          "  |__   __||  __ \\|  __ \\|  __ \\ |  ____|",
          "     | |   | |__) | |  | | |__) || |__",
          "     | |   |  ___/| |  | |  ___/ |  __|",
          "     | |   | |    | |__| | |     | |____",
          "     |_|   |_|    |_____/|_|     |______|",
          "",
        ];
        const info: TermSpan[][] = [
          [span("  user", "dim"), span("  ada")],
          [span("  host", "dim"), span("  playground")],
          [span("  os", "dim"), span("  Browser 16.2 (zero-backend edition)")],
          [span("  kernel", "dim"), span("  javascript/engine")],
          [span("  shell", "dim"), span("  playground-terminal 1.2.0")],
          [span("  theme", "dim"), span(`  ${ctx.theme()}`)],
          [span("  uptime", "dim"), span("  since you clicked here")],
        ];
        return [
          ...art.map((line) => ({ spans: [span(line, "accent")] })),
          ...info.map((row) => ({ spans: row })),
        ];
      },
    },
    {
      name: "ping",
      description: "Ping the localhost",
      usage: "ping [count]",
      run: (args) => {
        const count = Math.max(1, Math.min(6, parseInt(args[0] ?? "4", 10) || 4));
        const lines: TermLineOut[] = [
          { spans: [span("PING 127.0.0.1 (127.0.0.1): 56 data bytes", "dim")] },
        ];
        for (let i = 0; i < count; i += 1) {
          const ms = (0.02 + Math.random() * 0.03).toFixed(3);
          lines.push({
            spans: [span(`64 bytes from 127.0.0.1: icmp_seq=${i} ttl=64 time=${ms} ms`)],
            delay: 340,
          });
        }
        lines.push(
          { spans: [span(`--- 127.0.0.1 ping statistics ---`, "dim")] },
          {
            spans: [
              span(`${count} packets transmitted, ${count} received, 0.0% packet loss`, undefined),
            ],
          }
        );
        return lines;
      },
    },
    {
      name: "matrix",
      description: "Feel the rain",
      usage: "matrix",
      run: () =>
        Array.from({ length: 7 }, () => ({
          spans: [span(randomLine(40 + Math.floor(Math.random() * 45)), "success")],
          delay: 70,
        })),
    },
    {
      name: "sudo",
      description: "Execute with privilege (simulated)",
      usage: "sudo <command>",
      run: (args) => {
        if (!args[0]) return [{ spans: [span("usage: sudo <command>", "warn")] }];
        if (args[0] === "rm") return [{ spans: [span("Nice try. There is no filesystem to delete.", "warn")] }];
        return [
          { spans: [span("[sudo] password for ada: ", undefined)], type: "line", delay: 500 },
          {
            spans: [
              span("ada is not in the sudoers file. ", "error"),
              span("This incident will be reported.", "error", { dim: true }),
            ],
            delay: 320,
          },
        ];
      },
    },
    {
      name: "cowsay",
      description: "Let the cow speak",
      usage: "cowsay [text]",
      run: (args) => {
        const message = args.join(" ") || "moo";
        const border = "-".repeat(message.length + 2);
        return [
          { spans: [span(` ${border}`)], type: "line", delay: 40 },
          { spans: [span(`< ${message} >`, "accent", { bold: true })], type: "line", delay: 40 },
          { spans: [span(` ${border}`)], type: "line", delay: 40 },
          { spans: [span(`        \\   ^__^`)], type: "line", delay: 40 },
          { spans: [span(`         \\  (oo)\\_______`)], type: "line", delay: 40 },
          { spans: [span(`            (__)\\       )\\/\\`)], type: "line", delay: 40 },
          { spans: [span(`                ||----w |`)], type: "line", delay: 40 },
          { spans: [span(`                ||     ||`)], type: "line", delay: 40 },
        ];
      },
    },
    {
      name: "about",
      description: "About this terminal",
      usage: "about",
      run: () => [
        { spans: [span("playground-terminal v1.2.0", "accent", { bold: true })] },
        { spans: [span("A browser-based terminal emulator. No backend, no wires.")] },
        { spans: [span("Features: typing animation, history, autocomplete, 6 themes, resizable.")] },
        { spans: [span("Try: ", "dim"), span("help", "accent"), span(", ", undefined), span("neofetch", "accent"), span(", ", undefined), span("ping", "accent"), span(", ", undefined), span("matrix", "accent"), span(", ", undefined), span("secret", "accent")] },
      ],
    },
    {
      name: "exit",
      description: "Leave the terminal (nope)",
      usage: "exit",
      run: () => [
        { spans: [span("logout", "dim")] },
        { spans: [span("The terminal lives in the browser — it isn't going anywhere. Type 'help' to keep exploring.", undefined, { dim: true })] },
      ],
    },
    {
      name: "secret",
      description: "",
      usage: "secret",
      hidden: true,
      run: () => [
        {
          spans: [span("You found the secret. 42 is the answer, as always.", "success")],
          type: "chars",
          delay: 18,
        },
      ],
    },
  ];

function buildCommandIndex(): TerminalCommand[] {  const index = new Map<string, TerminalCommand>();
  for (const cmd of DEFAULT_COMMANDS) {
    if (!index.has(cmd.name)) index.set(cmd.name, cmd);
  }
  return [...index.values()];
}

function longestCommonPrefix(values: string[]): string {
  if (values.length === 0) return "";
  let prefix = values[0];
  for (const value of values.slice(1)) {
    while (!value.startsWith(prefix)) prefix = prefix.slice(0, -1);
  }
  return prefix;
}

/* ------------------------------------------------------------------ */
/* TerminalEmulator                                                    */
/* ------------------------------------------------------------------ */

export function TerminalEmulator({
  className,
  height = 480,
  theme: initialTheme = "term",
  username = "ada",
  hostname = "playground",
  commands: extraCommands,
  boot = true,
  bootScript = ["whoami", "ls", "neofetch"],
  welcome = [],
  fs: fsProp,
  autoFocus = false,
}: TerminalEmulatorProps) {
  const [lines, setLines] = useState<TranscriptLine[]>([]);
  const [buffer, setBuffer] = useState("");
  const [busy, setBusy] = useState(false);
  const [cwd, setCwd] = useState(HOME);
  const [themeId, setThemeId] = useState(initialTheme);
  const [typingLine, setTypingLine] = useState<{ text: string; color?: string } | null>(null);
  const [focused, setFocused] = useState(false);
  const [copied, setCopied] = useState(false);
  const [termHeight, setTermHeight] = useState(height);

  const lineIdRef = useRef(0);
  const runSeqRef = useRef(0);
  const queueRef = useRef<string[]>([]);
  const runningRef = useRef(false);
  const historyRef = useRef<string[]>([]);
  const histIndexRef = useRef(0);
  const cwdRef = useRef(HOME);
  const themeRef = useRef(initialTheme);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<{ y: number; height: number } | null>(null);
  const welcomeRef = useRef(welcome);
  const bootScriptRef = useRef(bootScript);

  const fs = useMemo<FsNode>(() => fsProp ?? DEFAULT_TERMINAL_FS, [fsProp]);
  const theme = useMemo(
    () => TERMINAL_THEMES.find((t) => t.id === themeId) ?? TERMINAL_THEMES[0],
    [themeId]
  );

  const appendLine = useCallback((line: Omit<TranscriptLine, "id">) => {
    const id = ++lineIdRef.current;
    setLines((prev) => {
      const next = [...prev, { ...line, id }];
      return next.length > 2000 ? next.slice(next.length - 2000) : next;
    });
  }, []);

  const buildPromptSpans = useCallback((): TermSpan[] => {
    const short = shortCwd(cwd);
    return [
      span(`${username}@${hostname}`, "accent", { bold: true }),
      span(":", "dim"),
      span(short, "accent"),
      span(" $ ", undefined),
    ];
  }, [cwd, username, hostname]);

  const promptText = useCallback((): string => {
    return `${username}@${hostname}:${shortCwd(cwd)} $ `;
  }, [cwd, username, hostname]);

  const scrollToBottom = useCallback(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  const ctx = useMemo<TerminalContext>(() => {
    const resolve = (rel: string) => normalizePath(cwdRef.current, rel);
    return {
      cwd: () => cwdRef.current,
      cd: (abs: string) => {
        const node = resolveNode(fs, abs);
        if (!node || node.type !== "dir") return false;
        cwdRef.current = abs;
        setCwd(abs);
        return true;
      },
      read: (abs: string) => {
        const node = resolveNode(fs, abs);
        return node?.type === "file" ? (node.content ?? "") : null;
      },
      list: (abs: string) => {
        const node = resolveNode(fs, abs);
        if (!node || node.type !== "dir" || !node.children) return null;
        return Object.entries(node.children).map(([name, child]) => ({
          name,
          isDir: child.type === "dir",
        }));
      },
      isDir: (abs: string) => resolveNode(fs, abs)?.type === "dir",
      resolve,
      theme: () => themeRef.current,
      setTheme: (id: string) => {
        themeRef.current = id;
        setThemeId(id);
      },
      clear: () => setLines([]),
      history: () => [...historyRef.current],
      isCancelled: () => false,
    };
  }, [fs]);

  const commands = useMemo<TerminalCommand[]>(
    () => [...buildCommandIndex(), ...(extraCommands ?? [])],
    [extraCommands]
  );

  const streamOutput = useCallback(
    async (out: TermOut, runId: number) => {
      const items: TermLineOut[] = Array.isArray(out) ? out : [out];
      for (const item of items) {
        if (runSeqRef.current !== runId) return;
        if (typeof item === "string") {
          appendLine({ kind: "output", spans: [{ text: item }] });
          await sleep(45);
        } else {
          const isChars = item.type === "chars";
          if (isChars) {
            const text = item.spans.map((s) => s.text).join("");
            const color = item.spans[0]?.color;
            setTypingLine({ text: "", color });
            for (let i = 1; i <= text.length; i += 1) {
              if (runSeqRef.current !== runId) {
                setTypingLine(null);
                return;
              }
              setTypingLine({ text: text.slice(0, i), color });
              await sleep(item.delay ?? 14);
              scrollToBottom();
            }
            appendLine({ kind: "output", spans: [{ text, color }] });
            setTypingLine(null);
          } else {
            appendLine({ kind: "output", spans: item.spans });
            if (item.delay) await sleep(item.delay);
          }
        }
        scrollToBottom();
      }
    },
    [appendLine, scrollToBottom]
  );

  const processOne = useCallback(
    async (raw: string, runId: number) => {
      const trimmed = raw.trim();
      if (trimmed) {
        historyRef.current = [...historyRef.current, trimmed];
        histIndexRef.current = historyRef.current.length;
      }
      appendLine({ kind: "prompt", spans: buildPromptSpans(), raw: trimmed });
      setBuffer("");
      if (!trimmed) return;
      const [name, ...args] = trimmed.split(/\s+/);
      const command = commands.find((c) => c.name === name);
      if (!command) {
        await streamOutput([{ spans: [span(`command not found: ${name}`, "error")] }], runId);
        return;
      }
      const localCtx: TerminalContext = {
        ...ctx,
        isCancelled: () => runSeqRef.current !== runId,
      };
      const out = await command.run(args, localCtx);
      if (runSeqRef.current === runId) await streamOutput(out, runId);
    },
    [appendLine, buildPromptSpans, commands, ctx, streamOutput]
  );

  const drainQueue = useCallback(async () => {
    runningRef.current = true;
    setBusy(true);
    while (queueRef.current.length > 0) {
      const raw = queueRef.current.shift() as string;
      const runId = ++runSeqRef.current;
      await processOne(raw, runId);
    }
    runningRef.current = false;
    setBusy(false);
  }, [processOne]);

  const enqueue = useCallback(
    (raw: string) => {
      if (runningRef.current) queueRef.current.push(raw);
      else {
        queueRef.current.push(raw);
        void drainQueue();
      }
    },
    [drainQueue]
  );

  const submit = useCallback(() => {
    if (!buffer.trim() && queueRef.current.length === 0 && !runningRef.current) {
      appendLine({ kind: "prompt", spans: buildPromptSpans(), raw: "" });
      setBuffer("");
      return;
    }
    enqueue(buffer);
    setBuffer("");
  }, [buffer, enqueue, appendLine, buildPromptSpans]);

  const interrupt = useCallback(() => {
    runSeqRef.current += 1;
    queueRef.current = [];
    runningRef.current = false;
    setBusy(false);
    setBuffer("");
    appendLine({ kind: "output", spans: [{ text: "^C" }] });
  }, [appendLine]);

  const clearScreen = useCallback(() => {
    runSeqRef.current += 1;
    setLines([]);
    setTypingLine(null);
  }, []);

  const typeAndSubmit = useCallback(
    async (raw: string, runId: number) => {
      for (let i = 1; i <= raw.length; i += 1) {
        if (runSeqRef.current !== runId) return;
        setBuffer(raw.slice(0, i));
        await sleep(28 + Math.random() * 26);
        scrollToBottom();
      }
      if (runSeqRef.current !== runId) return;
      setBuffer("");
      runningRef.current = true;
      setBusy(true);
      await processOne(raw, runId);
      runningRef.current = false;
      setBusy(false);
    },
    [processOne, scrollToBottom]
  );

  useEffect(() => {
    if (!boot) return;
    const runId = ++runSeqRef.current;
    const timer = window.setTimeout(() => {
      runningRef.current = true;
      setBusy(true);
      void (async () => {
        try {
          await streamOutput(
            [
              { spans: [span("playground-terminal v1.2.0", "accent", { bold: true })], type: "line" },
              { spans: [span("Type 'help' for commands, Tab to autocomplete.", "dim")] },
              ...welcomeRef.current.map((line) => ({ spans: [span(line, "dim")] })),
              "",
            ],
            runId
          );
          for (const raw of bootScriptRef.current) {
            if (runSeqRef.current !== runId) return;
            await typeAndSubmit(raw, runId);
          }
        } finally {
          if (runSeqRef.current === runId) {
            runningRef.current = false;
            setBusy(false);
          }
        }
      })();
    }, 350);
    return () => window.clearTimeout(timer);
  }, [boot, streamOutput, typeAndSubmit]);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines.length, typingLine]);

  useEffect(() => {
    if (!autoFocus) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 500);
    return () => window.clearTimeout(timer);
  }, [autoFocus]);

  const historyPrev = useCallback(() => {
    const history = historyRef.current;
    if (history.length === 0) return;
    const next = Math.max(0, (histIndexRef.current || history.length) - 1);
    histIndexRef.current = next;
    setBuffer(history[next] ?? "");
  }, []);

  const historyNext = useCallback(() => {
    const history = historyRef.current;
    if (history.length === 0) return;
    const next = histIndexRef.current + 1;
    histIndexRef.current = next;
    setBuffer(next >= history.length ? "" : history[next]);
  }, []);

  const complete = useCallback(() => {
    if (!buffer) return;
    const lastSpace = buffer.lastIndexOf(" ");
    const prefix = lastSpace === -1 ? "" : buffer.slice(0, lastSpace + 1);
    const token = buffer.slice(lastSpace + 1);
    const isFirstToken = lastSpace === -1;

    let matches: string[] = [];
    if (isFirstToken) {
      matches = commands.filter((c) => !c.hidden && c.name.startsWith(token)).map((c) => c.name);
    } else {
      const slash = token.lastIndexOf("/");
      const base = slash === -1 ? "" : token.slice(0, slash + 1);
      const partial = token.slice(slash + 1);
      const absBase = normalizePath(cwdRef.current, base || ".");
      const node = resolveNode(fs, absBase);
      if (node?.type === "dir" && node.children) {
        matches = Object.keys(node.children)
          .filter((name) => name.startsWith(partial))
          .map((name) => base + name + (node.children?.[name].type === "dir" ? "/" : ""));
      }
    }

    if (matches.length === 0) {
      appendLine({ kind: "output", spans: [span(`no completions for '${token}'`, "dim")] });
      return;
    }

    const completed = prefix + longestCommonPrefix(matches);
    if (matches.length === 1) {
      setBuffer(completed + (isFirstToken ? " " : ""));
      return;
    }
    if (completed !== buffer) {
      setBuffer(completed);
      return;
    }
    appendLine({
      kind: "output",
      spans: [span(matches.join("   "), "dim")],
    });
  }, [buffer, commands, fs, appendLine]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (!busy) submit();
    } else if (event.key === "Tab") {
      event.preventDefault();
      complete();
    } else if (event.key === "ArrowUp") {
      if (!buffer && historyRef.current.length > 0 && !event.shiftKey) {
        event.preventDefault();
        historyPrev();
      }
    } else if (event.key === "ArrowDown") {
      if (event.shiftKey) {
        event.preventDefault();
        historyNext();
      }
    } else if (event.key === "c" && (event.ctrlKey || event.metaKey)) {
      if (busy) {
        event.preventDefault();
        interrupt();
      } else if (buffer) {
        event.preventDefault();
        setBuffer("");
      } else {
        event.preventDefault();
        appendLine({ kind: "output", spans: [{ text: "^C" }] });
      }
    } else if (event.key === "l" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      clearScreen();
    } else if (event.key === "u" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      setBuffer("");
    } else if (event.key === "w" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      setBuffer((prev) => prev.replace(/\S*$/, ""));
    } else if (event.key === "d" && (event.ctrlKey || event.metaKey) && !buffer) {
      event.preventDefault();
      appendLine({ kind: "output", spans: [span("(terminal cannot exit — it lives in the browser)", "dim")] });
    }
  };

  const cycleTheme = () => {
    const index = TERMINAL_THEMES.findIndex((t) => t.id === themeRef.current);
    const next = TERMINAL_THEMES[(index + 1) % TERMINAL_THEMES.length];
    themeRef.current = next.id;
    setThemeId(next.id);
  };

  const copyTranscript = () => {
    const text = lines
      .map((line) =>
        line.kind === "prompt"
          ? `${promptText()}${line.raw ?? ""}`
          : line.spans.map((s) => s.text).join("")
      )
      .join("\n");
    copyToClipboard(text || " ");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  const handleResizePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    dragRef.current = { y: event.clientY, height: termHeight };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleResizePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    const next = Math.max(180, Math.min(960, drag.height + (drag.y - event.clientY)));
    setTermHeight(next);
  };

  const handleResizePointerUp = () => {
    dragRef.current = null;
  };

  const renderSpans = (spans: TermSpan[], fallback: string) => {
    const resolved = spans.length ? spans : [{ text: fallback }];
    return resolved.map((s, i) => {
      let color = theme.fg;
      if (s.color === "accent") color = theme.accent;
      else if (s.color === "success") color = theme.success;
      else if (s.color === "warn") color = theme.warn;
      else if (s.color === "error") color = theme.error;
      else if (s.color === "dim") color = theme.dim;
      else if (s.color === "bright") color = theme.fg;
      else if (s.color && s.color.startsWith("#")) color = s.color;
      return (
        <span
          key={i}
          style={{
            color,
            opacity: s.dim ? 0.7 : 1,
            fontWeight: s.bold ? 600 : 400,
          }}
        >
          {s.text}
        </span>
      );
    });
  };

  const headerButton =
    "flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-black/10 dark:hover:bg-white/10";
  const mobileButton =
    "flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-[12px] font-semibold transition-colors hover:bg-black/10 dark:hover:bg-white/10";

  return (
    <div
      className={cn("relative flex flex-col overflow-hidden rounded-xl border font-mono shadow-2xl", className)}
      style={{
        height: termHeight,
        borderColor: theme.border,
        boxShadow: `0 0 0 1px ${theme.border}, 0 24px 64px -24px ${theme.border}66`,
      }}
    >
      {/* Header */}
      <div
        className="flex shrink-0 items-center gap-2 border-b px-3 py-2"
        style={{ background: theme.header, borderColor: theme.border }}
      >
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <span
          className="ml-2 flex items-center gap-1.5 text-[12px] font-medium"
          style={{ color: theme.dim }}
        >
          <TerminalIcon className="h-3.5 w-3.5" />
          {username}@{hostname} — {theme.label}
        </span>
        <div className="ml-auto flex items-center gap-0.5">
          <button
            type="button"
            title="Copy transcript"
            aria-label="Copy transcript"
            onClick={copyTranscript}
            className={headerButton}
            style={{ color: theme.dim }}
          >
            {copied ? <CheckIcon className="h-4 w-4" style={{ color: theme.success }} /> : <CopyIcon className="h-4 w-4" />}
          </button>
          <button
            type="button"
            title="Cycle theme"
            aria-label="Cycle theme"
            onClick={cycleTheme}
            className={headerButton}
            style={{ color: theme.dim }}
          >
            <PaletteIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            title="Clear screen (Ctrl+L)"
            aria-label="Clear screen"
            onClick={clearScreen}
            className={headerButton}
            style={{ color: theme.dim }}
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div
        ref={bodyRef}
        onPointerDown={() => inputRef.current?.focus()}
        className="scrollbar-thin flex-1 select-text overflow-y-auto px-3 py-3 text-[13px] leading-[1.55] outline-none"
        style={{ background: theme.bg, color: theme.fg }}
      >
        {lines.map((line) =>
          line.kind === "prompt" ? (
            <div key={line.id} className="flex flex-wrap items-baseline whitespace-pre-wrap break-words">
              {renderSpans(line.spans, "")}
              <span style={{ color: theme.fg }}>{line.raw ?? ""}</span>
            </div>
          ) : (
            <div key={line.id} className="whitespace-pre-wrap break-words">
              {renderSpans(line.spans, "")}
            </div>
          )
        )}

        {typingLine && (
          <div className="whitespace-pre-wrap break-words" style={{ color: typingLine.color ? resolveColor(typingLine.color, theme) : theme.fg }}>
            {typingLine.text}
          </div>
        )}

        {/* Prompt row */}
        <div className="flex items-center gap-0">
          {renderSpans(buildPromptSpans(), "")}
          <input
            ref={inputRef}
            value={buffer}
            onChange={(event) => setBuffer(event.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            readOnly={busy}
            disabled={busy}
            size={Math.max(1, Math.min(buffer.length + 1, 80))}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            aria-label="Terminal input"
            className="min-w-0 border-0 bg-transparent p-0 font-mono text-[13px] outline-none disabled:opacity-60"
            style={{ color: theme.fg, caretColor: theme.accent, maxWidth: "100%" }}
          />
          {!focused && (
            <span className="animate-pulse" style={{ color: theme.fg, fontWeight: 300 }} aria-hidden="true">
              ▍
            </span>
          )}
          {busy && (
            <span className="ml-1.5 shrink-0 text-[10px] uppercase tracking-wider" style={{ color: theme.dim }}>
              running
            </span>
          )}
        </div>
      </div>

      {/* Mobile action bar */}
      <div
        className="flex shrink-0 items-center justify-between border-t px-2 py-1.5 md:hidden"
        style={{ background: theme.header, borderColor: theme.border }}
      >
        <span className="text-[10px] uppercase tracking-wider" style={{ color: theme.dim }}>
          {busy ? "running…" : "terminal"}
        </span>
        <div className="flex items-center gap-1">
          <button type="button" onClick={historyPrev} aria-label="Previous command" className={mobileButton} style={{ color: theme.fg }}>
            <ChevronUpIcon className="h-4 w-4" />
          </button>
          <button type="button" onClick={historyNext} aria-label="Next command" className={mobileButton} style={{ color: theme.fg }}>
            <ChevronDownIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={busy}
            aria-label="Run command"
            className={mobileButton}
            style={{ color: theme.fg, border: `1px solid ${theme.border}`, borderRadius: 8 }}
          >
            ⏎
          </button>
        </div>
      </div>

      {/* Resize handle */}
      <div
        role="separator"
        aria-orientation="horizontal"
        onPointerDown={handleResizePointerDown}
        onPointerMove={handleResizePointerMove}
        onPointerUp={handleResizePointerUp}
        onPointerCancel={handleResizePointerUp}
        className="group flex h-2 shrink-0 cursor-row-resize touch-none items-center justify-center border-t"
        style={{ background: theme.header, borderColor: theme.border }}
      >
        <div
          className="h-[3px] w-10 rounded-full transition-all group-hover:h-[5px] group-hover:w-14"
          style={{ background: theme.dim, opacity: 0.5 }}
        />
      </div>
    </div>
  );
}

function resolveColor(color: string, theme: TermTheme): string {
  switch (color) {
    case "accent":
      return theme.accent;
    case "success":
      return theme.success;
    case "warn":
      return theme.warn;
    case "error":
      return theme.error;
    case "dim":
      return theme.dim;
    default:
      return color.startsWith("#") ? color : theme.fg;
  }
}
