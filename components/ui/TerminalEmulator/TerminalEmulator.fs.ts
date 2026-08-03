import type { FsNode, TermSpan } from "./TerminalEmulator.types";

export const HOME = "/home/ada";

export const DEFAULT_TERMINAL_FS: FsNode = {
  type: "dir",
  children: {
    home: { type: "dir", children: { ada: { type: "dir", children: {
      "notes.txt": { type: "file", content: "Todo:\n- Ship the terminal emulator\n- Hide a secret somewhere\n- Profit" },
      projects: { type: "dir", children: {
        "terminal.tsx": { type: "file", content: "// A browser terminal with zero backend." },
        "readme.md": { type: "file", content: "# playground-terminal\n\nAn interactive, no-backend terminal demo." },
      } },
    } } } },
    etc: { type: "dir", children: { "config.yaml": { type: "file", content: "theme: terminal\nuser: ada\nmotd: enabled" } } },
    usr: { type: "dir", children: { bin: { type: "dir", children: {} } } },
    tmp: { type: "dir", children: {} },
    var: { type: "dir", children: { log: { type: "dir", children: { "app.log": { type: "file", content: "[info] boot ok\n[info] terminal ready" } } } } },
  },
};

export function normalizePath(cwd: string, input: string): string {
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

export function resolveNode(root: FsNode, abs: string): FsNode | null {
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

export function shortCwd(cwd: string): string {
  if (cwd === HOME) return "~";
  if (cwd.startsWith(`${HOME}/`)) return `~/${cwd.slice(HOME.length + 1)}`;
  return cwd;
}

export function span(text: string, color?: TermSpan["color"], opts?: { dim?: boolean; bold?: boolean }): TermSpan {
  return { text, color, dim: opts?.dim, bold: opts?.bold };
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

export function copyToClipboard(text: string): void {
  if (navigator.clipboard?.writeText) { void navigator.clipboard.writeText(text); return; }
  const textarea = document.createElement("textarea");
  textarea.value = text; textarea.style.position = "fixed"; textarea.style.opacity = "0";
  document.body.appendChild(textarea); textarea.select();
  try { document.execCommand("copy"); } catch { /* ignore */ }
  document.body.removeChild(textarea);
}

const RANDOM_GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=|<>アカサタナハマヤラワ";

export function randomLine(length: number): string {
  let out = "";
  for (let i = 0; i < length; i += 1) { out += RANDOM_GLYPHS[Math.floor(Math.random() * RANDOM_GLYPHS.length)]; }
  return out;
}
