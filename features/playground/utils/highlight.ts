import type { LanguageId } from "../types";

export interface Token {
  text: string;
  cls: string;
}

const esc = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const JS_REGEX =
  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|\b(import|export|default|from|const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|class|extends|super|async|await|typeof|instanceof|in|of|try|catch|finally|throw|this|void|null|undefined|true|false|interface|type|enum|readonly|keyof|satisfies|as)\b|\b(\d+(?:\.\d+)?(?:px|rem|em|%|vh|vw)?)\b|\b([A-Z][A-Za-z0-9_$]*)\b|\b([a-zA-Z_$][\w$]*)(?=\()|(<\/?)([a-zA-Z][\w.-]*)|([{}()[\].,;:<>+\-*/%!&|?=^~@])/g;

const CSS_REGEX =
  /(\/\*[\s\S]*?\*\/)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|\b(@import|@media|@keyframes|@supports|@font-face|@layer|@apply)\b|\b(display|flex|grid|position|top|right|bottom|left|margin|padding|color|background|border|border-radius|width|height|max-width|min-width|gap|align-items|justify-content|font-size|font-weight|line-height|text-transform|text-align|opacity|z-index|transform|transition|box-shadow|overflow|object-fit|cursor|pointer-events|user-select|aspect-ratio|content|space-between)\b|\b(\d+(?:\.\d+)?(?:px|rem|em|%|vh|vw|s|ms|fr|deg)?)\b|(#[0-9a-fA-F]{3,8}\b)|([.#]?[a-zA-Z][\w-]*)(?=\s*\{)|([{}():,;])/g;

const JSON_REGEX =
  /("(?:[^"\\]|\\.)*")|\b(true|false|null)\b|\b(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\b|([{}[\],:])/g;

const MD_REGEX =
  /(^#{1,6}\s.*$)|(\*\*[^*]+\*\*|__[^_]+__|\*[^*]+\*|_`[^`]+`_|`[^`]+`)|(\[.*?\]\(.*?\))|(^[-*+]\s.*$)|(^\s*\d+\.\s.*$)/gm;

function regexTokens(code: string, re: RegExp, map: (m: RegExpExecArray) => string): Token[] {
  const out: Token[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  re.lastIndex = 0;
  while ((match = re.exec(code))) {
    if (match.index > last) out.push({ text: code.slice(last, match.index), cls: "tok-plain" });
    out.push({ text: match[0], cls: map(match) });
    last = match.index + match[0].length;
  }
  if (last < code.length) out.push({ text: code.slice(last), cls: "tok-plain" });
  return out;
}

function jsTokens(code: string): Token[] {
  const tokens = regexTokens(code, JS_REGEX, (m) => {
    if (m[1]) return "tok-comment";
    if (m[2]) return "tok-string";
    if (m[3]) return "tok-keyword";
    if (m[4]) return "tok-number";
    if (m[5]) return "tok-component";
    if (m[6]) return "tok-function";
    if (m[8]) return "tok-tag";
    return "tok-punct";
  });
  return colorizeBrackets(tokens);
}

/** Alternate color for nested bracket pairs so matching depth is readable. */
function colorizeBrackets(tokens: Token[]): Token[] {
  const OPEN = "([{";
  const CLOSE = ")]}";
  let depth = 0;
  const out: Token[] = [];
  for (const token of tokens) {
    if (token.cls === "tok-punct" && token.text.length === 1) {
      const ch = token.text;
      if (OPEN.includes(ch)) {
        out.push({ text: ch, cls: `tok-bracket-${(depth % 3) + 1}` });
        depth += 1;
        continue;
      }
      if (CLOSE.includes(ch)) {
        depth = Math.max(0, depth - 1);
        out.push({ text: ch, cls: `tok-bracket-${(depth % 3) + 1}` });
        continue;
      }
    }
    out.push(token);
  }
  return out;
}

function cssTokens(code: string): Token[] {
  return regexTokens(code, CSS_REGEX, (m) => {
    if (m[1]) return "tok-comment";
    if (m[2]) return "tok-string";
    if (m[3]) return "tok-keyword";
    if (m[4]) return "tok-property";
    if (m[5]) return "tok-number";
    if (m[6]) return "tok-hex";
    if (m[7]) return "tok-selector";
    return "tok-punct";
  });
}

function jsonTokens(code: string): Token[] {
  return regexTokens(code, JSON_REGEX, (m) => {
    if (m[1]) {
      const after = code.slice(m.index + m[1].length, m.index + m[1].length + 1);
      return after === ":" ? "tok-property" : "tok-string";
    }
    if (m[2]) return "tok-keyword";
    if (m[3]) return "tok-number";
    return "tok-punct";
  });
}

function mdTokens(code: string): Token[] {
  return regexTokens(code, MD_REGEX, (m) => {
    if (m[1]) return "tok-heading";
    if (m[2]) return "tok-string";
    if (m[3]) return "tok-link";
    if (m[4] || m[5]) return "tok-list";
    return "tok-plain";
  });
}

export function tokenize(code: string, language: LanguageId): Token[] {
  switch (language) {
    case "css":
      return cssTokens(code);
    case "json":
      return jsonTokens(code);
    case "md":
      return mdTokens(code);
    default:
      return jsTokens(code);
  }
}

export function highlight(code: string, language: LanguageId): string {
  const tokens = tokenize(code, language);
  let html = "";
  for (const token of tokens) {
    html += `<span class="${token.cls}">${esc(token.text)}</span>`;
  }
  return html;
}

/** Per-line HTML, preserving multiline tokens (strings, comments). */
export function highlightLines(code: string, language: LanguageId): string[] {
  const tokens = tokenize(code, language);
  const lines: string[] = [""];
  for (const token of tokens) {
    const parts = token.text.split("\n");
    for (let i = 0; i < parts.length; i++) {
      lines[lines.length - 1] += `<span class="${token.cls}">${esc(parts[i])}</span>`;
      if (i < parts.length - 1) lines.push("");
    }
  }
  const trailing = code.split("\n").length - lines.length;
  for (let i = 0; i < trailing; i++) lines.push("");
  return lines;
}

const CLASS_WEIGHT: Array<[string, number]> = [
  ["tok-keyword", 6],
  ["tok-component", 5],
  ["tok-string", 4],
  ["tok-number", 3],
  ["tok-comment", 2],
  ["tok-function", 2],
  ["tok-selector", 4],
  ["tok-property", 3],
  ["tok-heading", 5],
];

/** Dominant token class per line, used by the minimap. */
export function lineClasses(code: string, language: LanguageId): string[] {
  const tokens = tokenize(code, language);
  const lines: string[] = [];
  let best = "tok-plain";
  let bestWeight = 0;
  for (const token of tokens) {
    for (const ch of token.text) {
      if (ch === "\n") {
        lines.push(best);
        best = "tok-plain";
        bestWeight = 0;
        continue;
      }
      if (token.cls !== "tok-punct" && token.cls !== "tok-plain") {
        const weight = CLASS_WEIGHT.find(([c]) => c === token.cls)?.[1] ?? 1;
        if (weight > bestWeight) {
          best = token.cls;
          bestWeight = weight;
        }
      }
    }
  }
  lines.push(best);
  return lines;
}

/** Line numbers of foldable block starts (lines whose next sibling opens a block). */
export function foldStarts(code: string, language: LanguageId, markers: Record<string, RegExp>): number[] {
  const lines = code.split("\n");
  const re = markers[language];
  if (!re) return [];
  const starts: number[] = [];
  for (let i = 0; i < lines.length; i++) {
    if (re.test(lines[i])) starts.push(i);
  }
  return starts;
}

export const TOKEN_COLORS: Record<string, string> = {
  "tok-plain": "#9ca3af",
  "tok-keyword": "#c678dd",
  "tok-string": "#98c379",
  "tok-number": "#d19a66",
  "tok-comment": "#5c6370",
  "tok-component": "#61afef",
  "tok-function": "#61afef",
  "tok-tag": "#e06c75",
  "tok-punct": "#abb2bf",
  "tok-bracket-1": "#e5c07b",
  "tok-bracket-2": "#61afef",
  "tok-bracket-3": "#c678dd",
  "tok-property": "#56b6c2",
  "tok-hex": "#d19a66",
  "tok-selector": "#e06c75",
  "tok-heading": "#61afef",
  "tok-link": "#98c379",
  "tok-list": "#c678dd",
};
