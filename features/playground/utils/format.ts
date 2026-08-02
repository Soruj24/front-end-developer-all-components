import type { LanguageId } from "../types";

/**
 * Lightweight, syntax-aware re-indenter. Only leading whitespace is changed —
 * token content is preserved verbatim, so it never corrupts code. Keeps lines
 * inside template literals, comments, and strings untouched.
 */

/** Open-bracket depth delta per line, ignoring strings/comments/templates. */
function scanLine(line: string): { open: number; close: number } {
  let open = 0;
  let close = 0;
  let i = 0;
  let inString: string | null = null;
  let inTemplate = false;
  let inLineComment = false;
  let inBlockComment = false;
  while (i < line.length) {
    const ch = line[i];
    const next = line[i + 1];
    if (inLineComment) break;
    if (inBlockComment) {
      if (ch === "*" && next === "/") {
        inBlockComment = false;
        i += 2;
      } else i += 1;
      continue;
    }
    if (inTemplate) {
      if (ch === "\\") {
        i += 2;
        continue;
      }
      if (ch === "`") inTemplate = false;
      else if (ch === "$" && next === "{") inString = "{";
      i += 1;
      continue;
    }
    if (inString) {
      if (ch === "\\") {
        i += 2;
        continue;
      }
      if (inString === "{" && ch === "}") {
        inString = null;
        i += 1;
        continue;
      }
      if (inString !== "{" && ch === inString) inString = null;
      i += 1;
      continue;
    }
    if (ch === "/" && next === "/") {
      inLineComment = true;
      i += 1;
      continue;
    }
    if (ch === "/" && next === "*") {
      inBlockComment = true;
      i += 2;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      inString = ch;
      if (ch === "`") inTemplate = true;
      i += 1;
      continue;
    }
    if (ch === "{" || ch === "(" || ch === "[") {
      open += 1;
      i += 1;
      continue;
    }
    if (ch === "}" || ch === ")" || ch === "]") {
      close += 1;
      i += 1;
      continue;
    }
    i += 1;
  }
  return { open, close };
}

export function formatSource(code: string, tabSize: number): string {
  const lines = code.split("\n");
  const out: string[] = [];
  let depth = 0;
  const pad = " ".repeat(tabSize);
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.length === 0) {
      out.push("");
      continue;
    }
    const { open, close } = scanLine(line);
    let indent = depth;
    if (close > 0) indent = Math.max(0, indent - close);
    out.push(pad.repeat(indent) + trimmed);
    depth += open - close;
    if (depth < 0) depth = 0;
  }
  return out.join("\n");
}

/** Language id resolved from a file name. */
export function languageOf(name: string): LanguageId {
  const ext = name.split(".").pop() ?? "";
  if (ext === "tsx") return "tsx";
  if (ext === "ts") return "ts";
  if (ext === "jsx") return "jsx";
  if (ext === "js") return "js";
  if (ext === "css") return "css";
  if (ext === "json") return "json";
  if (ext === "md") return "md";
  return "tsx";
}

/** Whether a file name is a code-ish file that can be formatted. */
export function isFormattable(name: string): boolean {
  const lang = languageOf(name);
  return lang !== "md";
}
