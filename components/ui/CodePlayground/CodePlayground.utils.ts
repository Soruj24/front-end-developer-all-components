import type { PlaygroundFile } from "./CodePlayground.types";

export function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function highlightCode(code: string): string {
  const re = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|\b(import|export|default|from|const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|class|extends|super|async|await|typeof|instanceof|in|of|try|catch|finally|throw|this|void|null|undefined|true|false|interface|type|enum|number|string|boolean|any|readonly)\b|\b(\d+(?:\.\d+)?)\b|\b([A-Z][A-Za-z0-9_$]*)\b|\b([a-zA-Z_$][\w$]*)(?=\()|(<\/?)([a-zA-Z][\w.-]*)|([{}()[\].,;:<>+\-*/%!&|?=^~@])/g;
  const tokens: string[] = [];
  let last = 0; let match: RegExpExecArray | null;
  while ((match = re.exec(code))) {
    if (match.index > last) tokens.push(escapeHtml(code.slice(last, match.index)));
    const [, comment, str, keyword, num, component, fn, , tagName, punct] = match;
    let cls = "tok-plain";
    if (comment) cls = "tok-comment"; else if (str) cls = "tok-string"; else if (keyword) cls = "tok-keyword";
    else if (num) cls = "tok-number"; else if (component) cls = "tok-component"; else if (fn) cls = "tok-function";
    else if (tagName) cls = "tok-tag"; else if (punct) cls = "tok-punct";
    tokens.push(`<span class="${cls}">${escapeHtml(match[0])}</span>`);
    last = match.index + match[0].length;
  }
  if (last < code.length) tokens.push(escapeHtml(code.slice(last)));
  return tokens.join("");
}

export function loadEsbuild(): Promise<typeof import("esbuild-wasm")> {
  let esbuildPromise: Promise<typeof import("esbuild-wasm")> | null = null;
  if (!esbuildPromise) esbuildPromise = import("esbuild-wasm").then(async (mod) => { await mod.initialize({ wasmURL: "/esbuild.wasm" }); return mod; });
  return esbuildPromise;
}

export async function transformFile(source: string, name: string, esbuild: typeof import("esbuild-wasm")): Promise<string> {
  const loader = name.endsWith(".tsx") ? "tsx" : name.endsWith(".ts") ? "ts" : "jsx";
  const result = await esbuild.transform(source, { loader, jsx: "automatic", jsxDev: false, format: "cjs", target: "es2020" });
  return result.code;
}

export function resolveRelative(fromFile: string, id: string, available: Map<string, PlaygroundFile>): string | null {
  if (!id.startsWith(".")) return null;
  const dir = fromFile.includes("/") ? fromFile.slice(0, fromFile.lastIndexOf("/") + 1) : "";
  const base = id.replace(/^\.\//, "").replace(/^\.\.\//, "");
  for (const candidate of [`${dir}${base}`, `${dir}${base}.tsx`, `${dir}${base}.ts`, `${dir}${base}.jsx`, `${dir}${base}.js`, `${dir}${base}/index.tsx`, `${dir}${base}/index.ts`]) {
    if (available.has(candidate)) return candidate;
  }
  return null;
}

export function formatConsoleArg(arg: unknown): string {
  if (typeof arg === "string") return arg;
  if (arg instanceof Error) return arg.message;
  try { const value = JSON.stringify(arg); return value === undefined ? String(arg) : value; } catch { return String(arg); }
}

export function isConsoleNoise(args: unknown[]): boolean {
  const first = args[0];
  if (typeof first !== "string") return false;
  return first.startsWith("%c") || first.startsWith("Warning:") || first.startsWith("Download the React DevTools") || first.startsWith("An error occurred in");
}

export function readSharedFiles(shareKey: string): PlaygroundFile[] | null {
  if (typeof window === "undefined") return null;
  const encoded = new URLSearchParams(window.location.search).get(shareKey);
  if (!encoded) return null;
  try {
    const parsed: unknown = JSON.parse(decodeURIComponent(atob(encoded)));
    if (Array.isArray(parsed) && parsed.length > 0 && parsed.every((f): f is PlaygroundFile => typeof f === "object" && f !== null && typeof (f as PlaygroundFile).name === "string" && typeof (f as PlaygroundFile).source === "string")) return parsed;
  } catch { /* fall through */ }
  return null;
}

export function downloadBlob(name: string, content: string, type: string) {
  const blob = new Blob([content], { type }); const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a"); anchor.href = url; anchor.download = name; anchor.click(); URL.revokeObjectURL(url);
}
