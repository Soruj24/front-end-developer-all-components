"use client";

import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import { SparkleIcon, CopyIcon, CheckIcon, RefreshIcon, StopIcon, ArrowDownIcon, ImageIcon } from "./StreamingResponse/icons";
import {
  StatusBadge,
  ThinkingIndicator,
  StreamingSkeleton,
  CitationList,
  ErrorBanner,
  ActionButton,
} from "./StreamingResponse/parts";
import { ToolCallBlock } from "./StreamingResponse/ToolCallBlock";
import { createDemoStream } from "./StreamingResponse/demoStream";

export { createDemoStream };

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type StreamStatus =
  | "idle"
  | "thinking"
  | "streaming"
  | "done"
  | "error"
  | "stopped";

export interface ToolCall {
  id: string;
  name: string;
  arguments: string;
  status: "running" | "success" | "error";
  result?: string;
}

export interface Citation {
  id: number;
  title?: string;
  text?: string;
  url?: string;
}

export type StreamChunk =
  | { type: "thinking"; content: string }
  | { type: "text"; content: string }
  | { type: "tool"; tool: ToolCall }
  | { type: "citation"; citation: Citation }
  | { type: "error"; message: string }
  | { type: "done" };

/** An async generator of chunks, or a factory that returns one (so retry can replay). */
export type StreamSource = AsyncGenerator<StreamChunk> | (() => AsyncGenerator<StreamChunk>);

export interface DemoStreamOptions {
  /** Text shown in the thinking indicator before the first token. */
  thinking?: string;
  /** Tool calls to replay, in order, before the text streams. */
  tools?: Array<Omit<ToolCall, "status">>;
  citations?: Citation[];
  /** Delay between emitted chunks (ms). Default 18. */
  tokenDelay?: number;
  /** Chunk by character instead of by word. */
  charMode?: boolean;
  /** Pause before the first chunk so loading skeletons are visible. Default 700. */
  startDelay?: number;
}

export interface StreamingResponseProps {
  /** Async generator of stream chunks. Preferred over `content`. */
  stream?: StreamSource;
  /** Convenience: auto-streams this markdown via `createDemoStream`. */
  content?: string;
  /** Force the loading skeleton regardless of status. */
  loading?: boolean;
  /** Auto-scroll to the latest token while streaming. Default true. */
  autoScroll?: boolean;
  /** Scroll area height. Default 420 (px). */
  maxHeight?: number | string;
  /** Show the header bar with status and controls. Default true. */
  showHeader?: boolean;
  /** "card" (bordered surface) or "plain" (headless, transparent). Default "card". */
  variant?: "card" | "plain";
  title?: string;
  /** Label for the thinking indicator. Default "Thinking". */
  thinkingLabel?: string;
  className?: string;
  onDone?: (text: string) => void;
  onError?: (message: string) => void;
  onRetry?: () => void;
}

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

type IconProps = { className?: string };
/* ------------------------------------------------------------------ */

const GREEK: Record<string, string> = {
  alpha: "α",
  beta: "β",
  gamma: "γ",
  delta: "δ",
  epsilon: "ϵ",
  varepsilon: "ε",
  zeta: "ζ",
  eta: "η",
  theta: "θ",
  vartheta: "ϑ",
  iota: "ι",
  kappa: "κ",
  lambda: "λ",
  mu: "μ",
  nu: "ν",
  xi: "ξ",
  omicron: "ο",
  pi: "π",
  varpi: "ϖ",
  rho: "ρ",
  varrho: "ϱ",
  sigma: "σ",
  varsigma: "ς",
  tau: "τ",
  upsilon: "υ",
  phi: "φ",
  varphi: "ϕ",
  chi: "χ",
  psi: "ψ",
  omega: "ω",
  Gamma: "Γ",
  Delta: "Δ",
  Theta: "Θ",
  Lambda: "Λ",
  Xi: "Ξ",
  Pi: "Π",
  Sigma: "Σ",
  Upsilon: "Υ",
  Phi: "Φ",
  Psi: "Ψ",
  Omega: "Ω",
};

const LATEX_SYMBOLS: Record<string, string> = {
  infty: "∞",
  sum: "∑",
  int: "∫",
  prod: "∏",
  partial: "∂",
  nabla: "∇",
  forall: "∀",
  exists: "∃",
  neg: "¬",
  ldots: "…",
  cdots: "⋯",
  prime: "′",
  degree: "°",
  angle: "∠",
  emptyset: "∅",
  in: "∈",
  notin: "∉",
  subset: "⊂",
  supset: "⊃",
  subseteq: "⊆",
  supseteq: "⊇",
  cup: "∪",
  cap: "∩",
  land: "∧",
  lor: "∨",
  leftrightarrow: "↔",
  Leftarrow: "⇐",
  Rightarrow: "⇒",
  leftarrow: "←",
  rightarrow: "→",
  uparrow: "↑",
  downarrow: "↓",
};

const LATEX_BINOP: Record<string, string> = {
  cdot: "·",
  times: "×",
  div: "÷",
  pm: "±",
  mp: "∓",
  le: "≤",
  ge: "≥",
  ne: "≠",
  approx: "≈",
  equiv: "≡",
  sim: "∼",
  propto: "∝",
  oplus: "⊕",
  otimes: "⊗",
  ast: "∗",
  star: "⋆",
  bullet: "•",
};

function Fraction({ num, den }: { num: ReactNode; den: ReactNode }) {
  return (
    <span
      className="mx-0.5 inline-flex flex-col items-center self-center leading-none"
      style={{ verticalAlign: "middle" }}
    >
      <span className="px-1 pb-0.5">{num}</span>
      <span className="w-full border-t border-current px-1 pt-0.5">{den}</span>
    </span>
  );
}

function SqrtRoot({ index, body }: { index?: string; body: ReactNode }) {
  return (
    <span className="mx-0.5 inline-flex items-end">
      {index ? <span className="mr-0.5 self-start text-[0.7em]">{index}</span> : null}
      <span className="text-[1.05em]">√</span>
      <span className="border-t border-current px-1 leading-none">{body}</span>
    </span>
  );
}

function Matrix({ env, content }: { env: string; content: string }) {
  const rows = content
    .split("\\\\")
    .map((row) => row.split("&").map((cell) => cell.trim()))
    .filter((row) => row.some((cell) => cell.length > 0));
  const cols = Math.max(1, ...rows.map((row) => row.length));
  const wrappers: Record<string, [string, string]> = {
    pmatrix: ["(", ")"],
    bmatrix: ["[", "]"],
    Bmatrix: ["{", "}"],
    vmatrix: ["|", "|"],
    Vmatrix: ["‖", "‖"],
    matrix: ["", ""],
    cases: ["{", ""],
    align: ["", ""],
    aligned: ["", ""],
    array: ["", ""],
    equation: ["", ""],
    gather: ["", ""],
  };
  const [open, close] = wrappers[env] ?? ["", ""];
  const isStacked = env === "align" || env === "aligned" || env === "gather" || env === "equation";
  return (
    <span className="mx-0.5 inline-flex items-center align-middle">
      <span className={cn("select-none text-[1.2em]", !open && "hidden")}>{open}</span>
      <span
        className="mx-1 inline-grid items-center"
        style={
          isStacked
            ? { rowGap: "0.15em" }
            : { gridTemplateColumns: `repeat(${cols}, auto)`, rowGap: "0.15em", columnGap: "0.7em" }
        }
      >
        {isStacked
          ? rows.map((row, ri) => (
              <span key={ri} className="text-center">
                {renderLatex(row.join(" = "))}
              </span>
            ))
          : rows.flatMap((row, ri) =>
              row.map((cell, ci) => (
                <Fragment key={`${ri}-${ci}`}>
                  <span className="text-center">{renderLatex(cell)}</span>
                </Fragment>
              ))
            )}
      </span>
      <span className={cn("select-none text-[1.2em]", !close && "hidden")}>{close}</span>
    </span>
  );
}

function renderLatex(src: string): ReactNode[] {
  const out: ReactNode[] = [];
  let i = 0;
  let k = 0;

  const push = (node: ReactNode) => {
    if (node != null) out.push(node);
  };
  const pushStr = (text: string) => {
    out.push(text);
  };

  const peek = () => (i < src.length ? src[i] : "");
  const isLetter = (c: string) => /[a-zA-Z]/.test(c);

  const readGroup = (): string => {
    if (src[i] !== "{") return "";
    i++;
    const start = i;
    let depth = 1;
    while (i < src.length && depth > 0) {
      if (src[i] === "{") depth++;
      else if (src[i] === "}") {
        depth--;
        if (depth === 0) break;
      }
      i++;
    }
    const content = src.slice(start, i);
    i++;
    return content;
  };

  const readAtomRaw = (): string => {
    if (i >= src.length) return "";
    const c = src[i];
    if (c === "{") return readGroup();
    if (c === "\\") {
      const start = i;
      i++;
      if (i < src.length && /[0-9]/.test(src[i])) return src.slice(start, ++i);
      while (i < src.length && isLetter(src[i])) i++;
      return src.slice(start, i);
    }
    i++;
    return c;
  };

  const renderCommand = (name: string): ReactNode => {
    switch (name) {
      case "frac":
      case "dfrac":
      case "tfrac": {
        const num = readGroup();
        const den = readGroup();
        return <Fraction key={k++} num={renderLatex(num)} den={renderLatex(den)} />;
      }
      case "sqrt": {
        if (peek() === "[") {
          i++;
          const start = i;
          while (i < src.length && src[i] !== "]") i++;
          const index = src.slice(start, i);
          i++;
          const body = readGroup();
          return <SqrtRoot key={k++} index={index} body={renderLatex(body)} />;
        }
        const body = readGroup();
        return <SqrtRoot key={k++} body={renderLatex(body)} />;
      }
      case "text":
        return <span key={k++} className="font-sans not-italic">{readGroup()}</span>;
      case "mathrm":
        return <span key={k++} className="font-sans not-italic">{renderLatex(readGroup())}</span>;
      case "mathbf":
        return <span key={k++} className="font-bold not-italic">{renderLatex(readGroup())}</span>;
      case "mathit":
        return <span key={k++}>{renderLatex(readGroup())}</span>;
      case "mathbb":
        return <span key={k++} className="font-serif not-italic">{renderLatex(readGroup())}</span>;
      case "operatorname":
        return <span key={k++} className="font-sans not-italic">{readGroup()}</span>;
      case "overline":
        return <span key={k++} className="border-t border-current px-0.5">{renderLatex(readGroup())}</span>;
      case "underline":
        return <span key={k++} className="border-b border-current px-0.5">{renderLatex(readGroup())}</span>;
      case "hat":
      case "widehat":
        return (
          <span key={k++} className="inline-flex flex-col items-center leading-none">
            <span className="text-[0.65em]">^</span>
            <span>{renderLatex(readGroup())}</span>
          </span>
        );
      case "bar":
        return (
          <span key={k++} className="inline-flex flex-col items-center leading-none">
            <span className="text-[0.65em]">¯</span>
            <span>{renderLatex(readGroup())}</span>
          </span>
        );
      case "left":
      case "right":
      case "big":
      case "Big":
      case "bigg":
      case "Bigg": {
        let delim = peek();
        if (delim === "\\") {
          delim = src[i + 1] ?? "";
          i += 2;
        } else {
          i++;
        }
        const map: Record<string, string> = {
          "(": "(",
          ")": ")",
          "[": "[",
          "]": "]",
          "{": "{",
          "}": "}",
          "|": "|",
          ".": "",
        };
        return <span key={k++} className="text-[1.15em]">{map[delim] ?? delim}</span>;
      }
      case "begin": {
        const env = readGroup();
        if (
          ["matrix", "pmatrix", "bmatrix", "Bmatrix", "vmatrix", "Vmatrix", "cases", "align", "aligned", "array", "equation", "gather"].includes(
            env
          )
        ) {
          const endTag = `\\end{${env}}`;
          const endIdx = src.indexOf(endTag, i);
          const body = endIdx === -1 ? src.slice(i) : src.slice(i, endIdx);
          if (endIdx !== -1) i = endIdx + endTag.length;
          return <Matrix key={k++} env={env} content={body} />;
        }
        const endIdx = src.indexOf("\\end{", i);
        if (endIdx !== -1) i = endIdx;
        return <span key={k++} className="font-sans text-[0.85em] opacity-70">[{env}]</span>;
      }
      case "end": {
        readGroup();
        return null;
      }
      case ",":
        return " ";
      case ";":
        return " ";
      case "quad":
        return "  ";
      case "qquad":
        return "    ";
      default:
        if (GREEK[name]) return GREEK[name];
        if (LATEX_SYMBOLS[name]) return LATEX_SYMBOLS[name];
        if (LATEX_BINOP[name]) return LATEX_BINOP[name];
        return name;
    }
  };

  while (i < src.length) {
    const c = src[i];
    if (c === " " || c === "\t" || c === "\n") {
      i++;
      continue;
    }
    if (c === "^" || c === "_") {
      const sup = c === "^";
      i++;
      const atom = readAtomRaw();
      const inner: ReactNode = atom.startsWith("\\") ? renderCommand(atom.slice(1)) : renderLatex(atom);
      push(
        <span
          key={k++}
          className="mx-[1px] inline-block text-[0.72em] leading-none"
          style={{ verticalAlign: sup ? "super" : "sub" }}
        >
          {inner}
        </span>
      );
      continue;
    }
    if (c === "{") {
      const content = readGroup();
      push(<span key={k++}>{renderLatex(content)}</span>);
      continue;
    }
    if (c === "\\") {
      i++;
      let name = "";
      if (i < src.length && /[0-9]/.test(src[i])) name = src[i++];
      else while (i < src.length && isLetter(src[i])) name += src[i++];
      if (name === "") {
        const esc = src[i] ?? "";
        i++;
        const map: Record<string, string> = { "{": "{", "}": "}", "\\": "\\", "%": "%", "&": "&", "#": "#", "_": "_", "$": "$" };
        pushStr(map[esc] ?? esc);
      } else {
        push(renderCommand(name));
      }
      continue;
    }
    pushStr(c);
    i++;
  }

  return out;
}

function MathTeX({ value, block = false }: { value: string; block?: boolean }) {
  const rendered = useMemo(() => renderLatex(value), [value]);
  const content = (
    <span className="font-serif italic text-foreground [text-rendering:optimizeLegibility]">{rendered}</span>
  );
  if (!block) return content;
  return (
    <div className="my-4 overflow-x-auto rounded-xl border border-border bg-muted/40 px-4 py-3.5">
      <div className="flex min-h-[2.25rem] items-center justify-center overflow-x-auto text-[16px]">{content}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Markdown block parser                                               */
/* ------------------------------------------------------------------ */

type Block =
  | { type: "h"; level: number; content: string }
  | { type: "p"; content: string }
  | { type: "code"; lang: string; code: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "ul"; items: ListItem[] }
  | { type: "ol"; items: ListItem[] }
  | { type: "quote"; blocks: Block[] }
  | { type: "hr" }
  | { type: "math"; content: string };

interface ListItem {
  text: string;
  children: Block[];
}

function splitRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function parseList(lines: string[], start: number, ordered: boolean): { blocks: Block[]; nextIndex: number } {
  const markerRe = ordered ? /^(\s*)\d+[.)]\s+(.*)$/ : /^(\s*)[-*+]\s+(.*)$/;
  const first = markerRe.exec(lines[start]);
  if (!first) return { blocks: [], nextIndex: start };
  const baseIndent = first[1].length;
  const items: ListItem[] = [];
  let i = start;

  while (i < lines.length) {
    const m = markerRe.exec(lines[i]);
    if (!m || m[1].length !== baseIndent) break;
    const text = m[2];
    i++;
    const childLines: string[] = [];
    while (i < lines.length) {
      const raw = lines[i];
      if (raw.trim() === "") break;
      const leading = raw.match(/^\s*/)?.[0].length ?? 0;
      if (leading <= baseIndent) break;
      childLines.push(raw);
      i++;
    }
    items.push({ text, children: childLines.length ? parseMarkdown(childLines.join("\n")) : [] });
  }

  return { blocks: [{ type: ordered ? "ol" : "ul", items }], nextIndex: i };
}

function parseMarkdown(source: string): Block[] {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const trimmed = lines[i].trim();

    if (!trimmed) {
      i++;
      continue;
    }

    const fence = /^```([\w+#.-]*)\s*$/.exec(trimmed);
    if (fence) {
      const lang = fence[1];
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !/^\s*```\s*$/.test(lines[i])) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      blocks.push({ type: "code", lang, code: codeLines.join("\n") });
      continue;
    }

    if (/^\$\$/.test(trimmed)) {
      const mathLines: string[] = [];
      if (/\$\$$/.test(trimmed) && trimmed.length > 4) {
        mathLines.push(trimmed.replace(/^\$\$/, "").replace(/\$\$$/, ""));
        i++;
      } else {
        i++;
        while (i < lines.length && !/\$\$/.test(lines[i])) {
          mathLines.push(lines[i]);
          i++;
        }
        i++;
      }
      blocks.push({ type: "math", content: mathLines.join("\n").trim() });
      continue;
    }

    if (/^\\\[/.test(trimmed)) {
      const mathLines: string[] = [];
      if (/\\\]$/.test(trimmed)) {
        mathLines.push(trimmed.replace(/^\\\[/, "").replace(/\\\]$/, ""));
        i++;
      } else {
        i++;
        while (i < lines.length && !/\\\]$/.test(lines[i])) {
          mathLines.push(lines[i]);
          i++;
        }
        if (i < lines.length) {
          mathLines.push(lines[i].replace(/\\\]$/, ""));
          i++;
        }
      }
      blocks.push({ type: "math", content: mathLines.join("\n").trim() });
      continue;
    }

    const heading = /^(#{1,6})\s+(.*)$/.exec(trimmed);
    if (heading) {
      blocks.push({ type: "h", level: heading[1].length, content: heading[2] });
      i++;
      continue;
    }

    if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(trimmed)) {
      blocks.push({ type: "hr" });
      i++;
      continue;
    }

    if (/^>\s?/.test(trimmed)) {
      const quoteLines: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i].trimStart())) {
        quoteLines.push(lines[i].trimStart().replace(/^>\s?/, ""));
        i++;
      }
      blocks.push({ type: "quote", blocks: parseMarkdown(quoteLines.join("\n")) });
      continue;
    }

    if (trimmed.includes("|") && /^\|.*\|\s*$/.test(trimmed)) {
      const next = lines[i + 1]?.trim() ?? "";
      if (/-{3,}/.test(next) && /^\|?[\s:|-]*\|?$/.test(next)) {
        const headers = splitRow(trimmed);
        i += 2;
        const rows: string[][] = [];
        while (i < lines.length && lines[i].trim() && lines[i].includes("|")) {
          rows.push(splitRow(lines[i]));
          i++;
        }
        blocks.push({ type: "table", headers, rows });
        continue;
      }
    }

    if (/^[-*+]\s/.test(trimmed) || /^\d+[.)]\s/.test(trimmed)) {
      const ordered = /^\d+[.)]\s/.test(trimmed);
      const parsed = parseList(lines, i, ordered);
      blocks.push(...parsed.blocks);
      i = parsed.nextIndex;
      continue;
    }

    const paraLines: string[] = [];
    while (i < lines.length) {
      const t = lines[i].trim();
      if (!t) break;
      if (
        /^#{1,6}\s/.test(t) ||
        /^```/.test(t) ||
        /^\$\$/.test(t) ||
        /^\\\[/.test(t) ||
        /^>\s?/.test(t) ||
        /^(-{3,}|\*{3,}|_{3,})$/.test(t) ||
        /^[-*+]\s/.test(t) ||
        /^\d+[.)]\s/.test(t)
      ) {
        break;
      }
      paraLines.push(t);
      i++;
    }
    blocks.push({ type: "p", content: paraLines.join(" ") });
  }

  return blocks;
}

/* ------------------------------------------------------------------ */
/* Inline renderer                                                     */
/* ------------------------------------------------------------------ */

const INLINE_PATTERNS: Array<[string, string]> = [
  ["image", "!\\[(?<imgAlt>[^\\]]*)\\]\\((?<imgSrc>[^)\\s]+)(?:\\s+[\"'](?<imgTitle>[^\"']*)[\"'])?\\)"],
  ["link", "\\[(?<linkText>[^\\]]+)\\]\\((?<linkHref>[^)\\s]+)(?:\\s+[\"'][^\"']*[\"'])?\\)"],
  ["cite2", "\\[\\[(?<cite2Id>\\d+)\\]\\]"],
  ["code", "(?<code>[^`]+)"],
  ["cite1", "\\[(?<cite1Id>\\d+)\\]"],
  ["mathBlock", "\\$\\$(?<mathBlockSrc>[^$]+)\\$\\$"],
  ["math", "\\$(?<mathSrc>[^$]+)\\$"],
  ["bold", "\\*\\*(?<boldSrc>[^*]+)\\*\\*"],
  ["bold2", "__(?<bold2Src>[^_]+)__"],
  ["italic", "\\*(?<italicSrc>[^*]+)\\*"],
  ["italic2", "_(?<italic2Src>[^_]+)_"],
  ["strike", "~~(?<strikeSrc>[^~]+)~~"],
];

const INLINE_SOURCE = INLINE_PATTERNS.map(([name, pattern]) => `(?<${name}>${pattern})`).join("|");

function buildInlineRegex() {
  return new RegExp(INLINE_SOURCE, "g");
}

function SmartImage({ src, alt, title }: { src: string; alt: string; title?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="my-3 flex h-32 w-full flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-border bg-muted/40 text-muted-foreground">
        <ImageIcon className="h-6 w-6" />
        <span className="px-3 text-center text-xs">{alt || "Image unavailable"}</span>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      title={title}
      loading="lazy"
      onError={() => setFailed(true)}
      className="my-3 max-h-80 w-full rounded-xl border border-border object-cover shadow-card"
    />
  );
}

function CitationChip({ id }: { id: number }) {
  return (
    <a
      href={`#streaming-cite-${id}`}
      aria-label={`Source ${id}`}
      className="mx-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary-soft px-1 align-super text-[10px] font-semibold leading-none text-primary no-underline transition-colors hover:bg-primary hover:text-primary-foreground"
    >
      {id}
    </a>
  );
}

function renderInline(source: string, prefix = "k"): ReactNode[] {
  const nodes: ReactNode[] = [];
  const re = buildInlineRegex();
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(source))) {
    const before = source.slice(last, m.index);
    if (before) nodes.push(before);
    last = m.index + m[0].length;
    const g = m.groups as Record<string, string | undefined>;

    if (g.image) {
      nodes.push(
        <SmartImage key={`${prefix}-${key++}`} src={g.imgSrc ?? ""} alt={g.imgAlt ?? ""} title={g.imgTitle} />
      );
      continue;
    }
    if (g.link) {
      nodes.push(
        <a
          key={`${prefix}-${key++}`}
          href={g.linkHref}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-primary underline decoration-primary/30 underline-offset-2 transition-colors hover:decoration-primary"
        >
          {renderInline(g.linkText ?? "", `${prefix}-link-${key}`)}
        </a>
      );
      continue;
    }
    if (g.cite2 || g.cite1) {
      const id = Number(g.cite2Id ?? g.cite1Id);
      nodes.push(<CitationChip key={`${prefix}-${key++}`} id={id} />);
      continue;
    }
    if (g.code) {
      nodes.push(
        <code
          key={`${prefix}-${key++}`}
          className="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.875em] text-foreground"
        >
          {g.code}
        </code>
      );
      continue;
    }
    if (g.mathBlock) {
      nodes.push(<MathTeX key={`${prefix}-${key++}`} value={g.mathBlockSrc ?? ""} block />);
      continue;
    }
    if (g.math) {
      nodes.push(<MathTeX key={`${prefix}-${key++}`} value={g.mathSrc ?? ""} />);
      continue;
    }
    if (g.bold || g.bold2) {
      nodes.push(
        <strong key={`${prefix}-${key++}`} className="font-semibold text-foreground">
          {renderInline(g.boldSrc ?? g.bold2Src ?? "", `${prefix}-b-${key}`)}
        </strong>
      );
      continue;
    }
    if (g.italic || g.italic2) {
      nodes.push(
        <em key={`${prefix}-${key++}`}>{renderInline(g.italicSrc ?? g.italic2Src ?? "", `${prefix}-i-${key}`)}</em>
      );
      continue;
    }
    if (g.strike) {
      nodes.push(
        <s key={`${prefix}-${key++}`} className="text-muted-foreground">
          {renderInline(g.strikeSrc ?? "", `${prefix}-s-${key}`)}
        </s>
      );
    }
  }

  const rest = source.slice(last);
  if (rest) nodes.push(rest);
  return nodes;
}

/* ------------------------------------------------------------------ */
/* Block renderer                                                      */
/* ------------------------------------------------------------------ */

function CodeBlock({ lang, code }: { lang: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard unavailable; ignore.
    }
  };

  return (
    <div className="group my-3 overflow-hidden rounded-xl border border-border bg-muted/40">
      <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/50 px-3 py-1.5">
        <span className="min-w-0 truncate text-xs text-muted-foreground">
          {lang ? (
            <span className="rounded-md bg-primary-soft px-1.5 py-0.5 font-mono text-[11px] font-medium text-primary">
              {lang}
            </span>
          ) : (
            <span className="font-mono text-[11px]">code</span>
          )}
        </span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-1 text-xs font-medium text-muted-foreground opacity-70 transition-colors hover:bg-muted hover:text-foreground group-hover:opacity-100"
        >
          {copied ? <CheckIcon className="h-3.5 w-3.5 text-success" /> : <CopyIcon className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="scrollbar-thin max-h-80 overflow-auto p-3.5 font-mono text-[13px] leading-relaxed text-foreground">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function HeadingBlock({ level, content, prefix }: { level: number; content: string; prefix: string }) {
  const className = cn(
    "scroll-mt-24 text-foreground first:mt-0",
    level === 1 && "mt-5 mb-2 text-xl font-semibold tracking-tight",
    level === 2 && "mt-5 mb-2 text-lg font-semibold tracking-tight",
    level === 3 && "mt-5 mb-2 text-base font-semibold",
    level >= 4 && "mt-4 mb-1.5 text-[15px] font-semibold"
  );
  if (level === 1) return <h2 className={className}>{renderInline(content, prefix)}</h2>;
  if (level === 2) return <h3 className={className}>{renderInline(content, prefix)}</h3>;
  if (level === 3) return <h4 className={className}>{renderInline(content, prefix)}</h4>;
  return <h5 className={className}>{renderInline(content, prefix)}</h5>;
}

function TableBlock({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="my-3 overflow-x-auto rounded-xl border border-border scrollbar-thin">
      <table className="w-full min-w-[24rem] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            {headers.map((cell, ci) => (
              <th key={ci} className="px-3 py-2.5 text-[13px] font-semibold text-foreground">
                {renderInline(cell, `th-${ci}`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className="border-b border-border/70 transition-colors last:border-0 hover:bg-muted/40"
            >
              {row.map((cell, ci) => (
                <td key={ci} className="px-3 py-2 text-[13.5px] text-foreground/85">
                  {renderInline(cell, `td-${ri}-${ci}`)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderListItems(items: ListItem[], prefix: string): ReactNode {
  return items.map((item, index) => (
    <li key={`${prefix}-li-${index}`}>
      <span>{renderInline(item.text, `${prefix}-t-${index}`)}</span>
      {item.children.length > 0 && <div className="mt-1.5">{renderBlocks(item.children)}</div>}
    </li>
  ));
}

function renderBlocks(blocks: Block[]): ReactNode {
  return (
    <Fragment>
      {blocks.map((block, index) => {
        const prefix = `b${index}`;
        switch (block.type) {
          case "h":
            return <HeadingBlock key={prefix} level={block.level} content={block.content} prefix={prefix} />;
          case "p":
            return (
              <p
                key={prefix}
                className="my-3 text-[15px] leading-7 text-foreground/90 first:mt-0 last:mb-0"
              >
                {renderInline(block.content, prefix)}
              </p>
            );
          case "code":
            return <CodeBlock key={prefix} lang={block.lang} code={block.code} />;
          case "table":
            return <TableBlock key={prefix} headers={block.headers} rows={block.rows} />;
          case "ul":
            return (
              <ul
                key={prefix}
                className="my-3 list-disc space-y-1.5 pl-5 text-[15px] leading-7 text-foreground/90 [&::marker]:text-primary"
              >
                {renderListItems(block.items, prefix)}
              </ul>
            );
          case "ol":
            return (
              <ol
                key={prefix}
                className="my-3 list-decimal space-y-1.5 pl-5 text-[15px] leading-7 text-foreground/90 [&::marker]:text-primary"
              >
                {renderListItems(block.items, prefix)}
              </ol>
            );
          case "quote":
            return (
              <blockquote
                key={prefix}
                className="my-3 rounded-r-xl border-l-[3px] border-primary bg-primary-soft px-4 py-3 text-[15px] leading-7 text-foreground/90"
              >
                {renderBlocks(block.blocks)}
              </blockquote>
            );
          case "hr":
            return <hr key={prefix} className="my-5 border-border" />;
          case "math":
            return <MathTeX key={prefix} value={block.content} block />;
          default:
            return null;
        }
      })}
    </Fragment>
  );
}

function Markdown({ source }: { source: string }) {
  const blocks = useMemo(() => parseMarkdown(source), [source]);
  return (
    <div className="min-w-0 text-[15px] leading-7 text-foreground [overflow-wrap:anywhere]">
      {renderBlocks(blocks)}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Status + indicator subcomponents                                    */
/* ------------------------------------------------------------------ */

export function StreamingResponse({
  stream,
  content,
  loading = false,
  autoScroll = true,
  maxHeight = 420,
  showHeader = true,
  variant = "card",
  title = "Assistant",
  thinkingLabel = "Thinking",
  className,
  onDone,
  onError,
  onRetry,
}: StreamingResponseProps) {
  const streamRef = useRef(stream);
  streamRef.current = stream;
  const contentRef = useRef(content);
  contentRef.current = content;
  const lastContentRef = useRef(content);
  const callbacksRef = useRef({ onDone, onError, onRetry });
  callbacksRef.current = { onDone, onError, onRetry };

  const [status, setStatus] = useState<StreamStatus>("idle");
  const [displayText, setDisplayText] = useState("");
  const [thinking, setThinking] = useState("");
  const [tools, setTools] = useState<ToolCall[]>([]);
  const [citations, setCitations] = useState<Citation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);
  const [copied, setCopied] = useState(false);

  const runIdRef = useRef(0);
  const cancelledRef = useRef(false);
  const genRef = useRef<AsyncGenerator<StreamChunk> | null>(null);
  const pendingRef = useRef("");
  const textRef = useRef("");
  const flushTimerRef = useRef<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const atBottomRef = useRef(true);

  const flush = useCallback(() => {
    flushTimerRef.current = null;
    if (!pendingRef.current) return;
    setDisplayText((prev) => prev + pendingRef.current);
    pendingRef.current = "";
  }, []);

  const scheduleFlush = useCallback(() => {
    if (flushTimerRef.current) return;
    flushTimerRef.current = window.setTimeout(flush, 40);
  }, [flush]);

  const processChunk = useCallback(
    (chunk: StreamChunk, id: number) => {
      switch (chunk.type) {
        case "thinking":
          if (runIdRef.current === id) {
            setThinking(chunk.content);
            setStatus("thinking");
          }
          break;
        case "text":
          pendingRef.current += chunk.content;
          textRef.current += chunk.content;
          if (runIdRef.current === id) {
            setStatus("streaming");
            scheduleFlush();
          }
          break;
        case "tool":
          setTools((prev) => {
            const idx = prev.findIndex((tool) => tool.id === chunk.tool.id);
            if (idx === -1) return [...prev, chunk.tool];
            const next = [...prev];
            next[idx] = chunk.tool;
            return next;
          });
          break;
        case "citation":
          setCitations((prev) =>
            prev.some((citation) => citation.id === chunk.citation.id)
              ? prev
              : [...prev, chunk.citation]
          );
          break;
        case "error":
          if (runIdRef.current === id) {
            setError(chunk.message);
            setStatus("error");
            callbacksRef.current.onError?.(chunk.message);
          }
          break;
        case "done":
          break;
      }
    },
    [scheduleFlush]
  );

  const resolveStream = useCallback((): AsyncGenerator<StreamChunk> | null => {
    const source = streamRef.current;
    if (source) {
      const gen = typeof source === "function" ? source() : source;
      if (gen && typeof gen.next === "function") return gen;
      return null;
    }
    if (contentRef.current) return createDemoStream(contentRef.current);
    return null;
  }, []);

  const startRun = useCallback(() => {
    runIdRef.current += 1;
    const id = runIdRef.current;
    cancelledRef.current = false;
    setStatus("idle");
    setThinking("");
    setDisplayText("");
    setTools([]);
    setCitations([]);
    setError(null);
    setLocked(false);
    setCopied(false);
    pendingRef.current = "";
    textRef.current = "";
    atBottomRef.current = true;
    if (flushTimerRef.current) {
      clearTimeout(flushTimerRef.current);
      flushTimerRef.current = null;
    }

    const run = async () => {
      const gen = resolveStream();
      if (!gen) return;
      genRef.current = gen;
      try {
        while (true) {
          if (cancelledRef.current) break;
          const { value, done } = await gen.next();
          if (done) break;
          if (runIdRef.current !== id) break;
          processChunk(value, id);
        }
        if (runIdRef.current !== id) return;
        flush();
        if (cancelledRef.current) {
          setStatus("stopped");
        } else {
          setStatus("done");
          callbacksRef.current.onDone?.(textRef.current);
        }
      } catch (err) {
        if (runIdRef.current !== id) return;
        flush();
        const message =
          err instanceof Error ? err.message : "Something went wrong while generating the response.";
        setError(message);
        setStatus("error");
        callbacksRef.current.onError?.(message);
      } finally {
        if (genRef.current === gen) genRef.current = null;
        if (flushTimerRef.current) {
          clearTimeout(flushTimerRef.current);
          flushTimerRef.current = null;
        }
      }
    };
    void run();
  }, [flush, resolveStream]);

  useEffect(() => {
    startRun();
  }, [startRun]);

  useEffect(() => {
    if (content !== lastContentRef.current) {
      lastContentRef.current = content;
      startRun();
    }
  }, [content, startRun]);

  useEffect(() => {
    return () => {
      cancelledRef.current = true;
      const gen = genRef.current;
      if (gen && typeof gen.return === "function") {
        void gen.return(undefined).catch(() => {});
      }
      if (flushTimerRef.current) clearTimeout(flushTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (autoScroll && atBottomRef.current) {
      el.scrollTop = el.scrollHeight;
    }
  }, [displayText, tools, status, autoScroll]);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 32;
    if (atBottom !== atBottomRef.current) {
      atBottomRef.current = atBottom;
      setLocked(!atBottom);
    }
  }, []);

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    atBottomRef.current = true;
    setLocked(false);
  }, []);

  const stop = useCallback(() => {
    cancelledRef.current = true;
    const gen = genRef.current;
    if (gen && typeof gen.return === "function") {
      void gen.return(undefined).catch(() => {});
    }
  }, []);

  const retry = useCallback(() => {
    callbacksRef.current.onRetry?.();
    startRun();
  }, [startRun]);

  const copy = useCallback(async () => {
    const text = textRef.current || displayText;
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard unavailable; ignore.
    }
  }, [displayText]);

  const busy = status === "streaming" || status === "thinking";
  const words = displayText ? displayText.split(/\s+/).filter(Boolean).length : 0;
  const subtitle =
    status === "streaming"
      ? `${words} ${words === 1 ? "word" : "words"} · streaming`
      : status === "thinking"
        ? "Thinking…"
        : status === "done"
          ? `${words} ${words === 1 ? "word" : "words"}`
          : status === "error"
            ? "Failed"
            : status === "stopped"
              ? "Stopped"
              : "AI response";

  const scrollStyle: CSSProperties = {
    maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-surface shadow-card",
        variant === "plain" && "rounded-none border-0 bg-transparent shadow-none",
        className
      )}
    >
      {showHeader && (
        <header className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-border px-4 py-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
            <SparkleIcon className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">{title}</p>
            <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
          </div>
          <StatusBadge status={status} />
          <div className="flex items-center gap-1.5">
            {busy ? (
              <ActionButton label="Stop generation" danger onClick={stop}>
                <StopIcon className="h-3 w-3" />
                Stop
              </ActionButton>
            ) : (
              <>
                <ActionButton label="Copy response" onClick={copy}>
                  {copied ? <CheckIcon className="h-3.5 w-3.5 text-success" /> : <CopyIcon className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </ActionButton>
                {(status === "done" || status === "error" || status === "stopped") && (
                  <ActionButton label="Retry generation" onClick={retry}>
                    <RefreshIcon className="h-3.5 w-3.5" />
                    Retry
                  </ActionButton>
                )}
              </>
            )}
          </div>
        </header>
      )}

      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="scrollbar-thin overflow-y-auto"
          style={scrollStyle}
        >
          <div className="flex flex-col gap-4 p-4 sm:p-5" aria-live="polite">
            {(status === "idle" || loading) && <StreamingSkeleton />}

            {status === "thinking" && <ThinkingIndicator label={thinkingLabel} content={thinking} />}

            {tools.map((tool) => (
              <ToolCallBlock key={tool.id} tool={tool} />
            ))}

            {displayText && (
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                  <SparkleIcon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <Markdown source={displayText} />
                  {status === "streaming" && (
                    <span
                      className="ml-1 inline-block h-4 w-[2px] animate-pulse rounded-full bg-primary align-middle"
                      aria-hidden="true"
                    />
                  )}
                </div>
              </div>
            )}

            {citations.length > 0 && status !== "idle" && status !== "error" && (
              <CitationList citations={citations} />
            )}

            {status === "error" && error && <ErrorBanner message={error} onRetry={retry} />}
          </div>
        </div>

        {locked && (
          <button
            type="button"
            onClick={scrollToBottom}
            className="absolute bottom-3 right-3 z-10 inline-flex h-8 items-center gap-1.5 rounded-full border border-border bg-background/90 px-3 text-xs font-medium text-muted-foreground shadow-card backdrop-blur transition-colors hover:bg-muted hover:text-foreground"
            style={{ animation: "fade-slide 0.2s ease-out both" }}
          >
            <ArrowDownIcon className="h-3.5 w-3.5" />
            Scroll to latest
          </button>
        )}
      </div>
    </div>
  );
}
