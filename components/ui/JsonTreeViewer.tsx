"use client";

import * as React from "react";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type JsonType =
  | "object"
  | "array"
  | "string"
  | "number"
  | "boolean"
  | "null"
  | "undefined";

export interface JsonNode {
  key: string;
  path: string;
  type: JsonType;
  raw: unknown;
  children: JsonNode[];
  size: number;
  depth: number;
  isRoot: boolean;
  selfMatch: boolean;
  hasMatch: boolean;
}

export interface JsonTreeViewerProps {
  /** Object, array, or a JSON string that gets parsed automatically. */
  data: unknown;
  title?: string;
  className?: string;
  /** Height of the scrollable tree body. */
  height?: number | string;
  /** How many nesting levels are expanded on mount (root = depth 0). */
  defaultExpandedDepth?: number;
  /**
   * Large-JSON optimization: containers render at most this many children.
   * The remainder is reachable through a “N more” reveal row.
   */
  maxItems?: number;
  defaultTheme?: "light" | "dark";
  /** Show the search box. */
  searchable?: boolean;
}

interface TypeStats {
  object: number;
  array: number;
  string: number;
  number: number;
  boolean: number;
  null: number;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const IDENT = /^[A-Za-z_$][\w$]*$/;

function getType(value: unknown): JsonType {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  const t = typeof value;
  if (t === "object") return "object";
  if (t === "string") return "string";
  if (t === "number") return "number";
  if (t === "boolean") return "boolean";
  if (t === "undefined") return "undefined";
  return "string";
}

function buildPath(segments: (string | number)[]): string {
  let path = "$";
  for (const seg of segments) {
    if (typeof seg === "number") path += `[${seg}]`;
    else if (IDENT.test(seg)) path += `.${seg}`;
    else path += `[${JSON.stringify(seg)}]`;
  }
  return path;
}

function valueText(type: JsonType, raw: unknown): string {
  switch (type) {
    case "array":
      return `${(raw as unknown[]).length} items`;
    case "object":
      return `${Object.keys(raw as Record<string, unknown>).length} keys`;
    case "string":
      return raw as string;
    case "number":
      return String(raw);
    case "boolean":
      return String(raw);
    case "null":
      return "null";
    case "undefined":
      return "undefined";
  }
}

function buildNode(
  value: unknown,
  key: string,
  segments: (string | number)[],
  depth: number,
  isRoot: boolean
): JsonNode {
  const type = getType(value);
  let children: JsonNode[] = [];
  if (type === "object" || type === "array") {
    const entries: [string, unknown][] =
      type === "array"
        ? (value as unknown[]).map((v, i) => [String(i), v] as const)
        : Object.entries(value as Record<string, unknown>);
    children = entries.map(([k, v]) =>
      buildNode(v, k, [...segments, type === "array" ? Number(k) : k], depth + 1, false)
    );
  }
  return {
    key,
    path: buildPath(segments),
    type,
    raw: value,
    children,
    size: children.length,
    depth,
    isRoot,
    selfMatch: false,
    hasMatch: false,
  };
}

/** Second pass — annotate the structural tree with search matches (no re-parse). */
function applyQuery(node: JsonNode, query: string): JsonNode {
  if (!query.trim()) return node;
  const q = query.trim().toLowerCase();
  const selfMatch = `${node.key} ${valueText(node.type, node.raw)}`.toLowerCase().includes(q);
  let hasMatch = false;
  const children = node.children.map((child) => {
    const c = applyQuery(child, query);
    if (c.selfMatch || c.hasMatch) hasMatch = true;
    return c;
  });
  if (selfMatch) hasMatch = true;
  return { ...node, selfMatch, hasMatch, children };
}

function computeInitialExpanded(data: unknown, depth: number): Set<string> {
  const result = new Set<string>();
  if (depth <= 0) return result;
  const visit = (value: unknown, segments: (string | number)[], d: number) => {
    const type = getType(value);
    if ((type === "object" || type === "array") && d < depth) {
      result.add(buildPath(segments));
      const entries: [string, unknown][] =
        type === "array"
          ? (value as unknown[]).map((v, i) => [String(i), v] as const)
          : Object.entries(value as Record<string, unknown>);
      for (const [k, v] of entries) {
        visit(v, [...segments, type === "array" ? Number(k) : k], d + 1);
      }
    }
  };
  visit(data, [], 0);
  return result;
}

function collectContainerPaths(node: JsonNode): string[] {
  const paths: string[] = [];
  const visit = (n: JsonNode) => {
    if (n.type === "object" || n.type === "array") {
      paths.push(n.path);
      n.children.forEach(visit);
    }
  };
  visit(node);
  return paths;
}

function computeStats(node: JsonNode): TypeStats {
  const stats: TypeStats = { object: 0, array: 0, string: 0, number: 0, boolean: 0, null: 0 };
  const visit = (n: JsonNode) => {
    if (n.type === "object" || n.type === "array") {
      stats[n.type] += 1;
      n.children.forEach(visit);
    } else if (n.type in stats) {
      stats[n.type as keyof TypeStats] += 1;
    }
  };
  visit(node);
  return stats;
}

function countNodes(node: JsonNode): number {
  let count = 1;
  for (const child of node.children) count += countNodes(child);
  return count;
}

function prettyJson(value: unknown): string {
  if (value === undefined) return "";
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
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

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

const icon = (path: string) =>
  function Icon({ className = "h-4 w-4" }: { className?: string }) {
    return (
      <svg
        className={className}
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

const SearchIcon = icon("m21 21-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z");
const CloseIcon = icon("M6 18L18 6M6 6l12 12");
const CopyIcon = icon("M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75");
const CheckIcon = icon("m4.5 12.75 6 6 9-13.5");
const ChevronIcon = icon("m8.25 4.5 7.5 7.5-7.5 7.5");
const ChevronsDownIcon = icon("m19.5 5.25-7.5 7.5-7.5-7.5m15 6-7.5 7.5-7.5-7.5");
const ChevronsUpIcon = icon("m4.5 18.75 7.5-7.5 7.5 7.5m-15-6 7.5-7.5 7.5 7.5");
const SunIcon = icon("M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0z");
const MoonIcon = icon("M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998z");
const BracesIcon = icon("M8 9l-3 3 3 3m8-6 3 3-3 3M13.5 5l-3 14");
const BracketIcon = icon("M15 6l6 6-6 6M9 6l-6 6 6 6");

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

const LEAF_CLASS: Partial<Record<JsonType, string>> = {
  string: "text-success",
  number: "text-info",
  boolean: "text-warning",
  null: "text-subtle italic",
  undefined: "text-subtle italic",
};

function IconBtn({
  title,
  onClick,
  children,
}: {
  title: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onClick={onClick}
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-subtle transition-colors hover:bg-muted hover:text-foreground"
    >
      {children}
    </button>
  );
}

function ActionBtn({
  title,
  onClick,
  children,
}: {
  title: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onClick={onClick}
      className="rounded p-0.5 text-subtle transition-colors hover:bg-muted hover:text-foreground"
    >
      {children}
    </button>
  );
}

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const q = query.trim();
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded-[2px] bg-primary-soft px-0.5 text-inherit">
        {text.slice(idx, idx + q.length)}
      </mark>
      {text.slice(idx + q.length)}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* JsonTreeViewer                                                      */
/* ------------------------------------------------------------------ */

export function JsonTreeViewer({
  data,
  title = "JSON",
  className,
  height = 560,
  defaultExpandedDepth = 2,
  maxItems = 100,
  defaultTheme = "dark",
  searchable = true,
}: JsonTreeViewerProps) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [expanded, setExpanded] = useState<Set<string>>(() =>
    computeInitialExpanded(data, defaultExpandedDepth)
  );
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [theme, setTheme] = useState<"light" | "dark">(defaultTheme);
  const [copied, setCopied] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const parsedData = useMemo(() => {
    if (typeof data === "string") {
      const trimmed = data.trim();
      if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
        try {
          return JSON.parse(trimmed);
        } catch {
          /* keep the raw string */
        }
      }
    }
    return data;
  }, [data]);

  const structural = useMemo(
    () => buildNode(parsedData, "$", [], 0, true),
    [parsedData]
  );

  const tree = useMemo(() => applyQuery(structural, deferredQuery), [structural, deferredQuery]);
  const searching = deferredQuery.trim().length > 0;

  const stats = useMemo(() => computeStats(structural), [structural]);
  const totalNodes = useMemo(() => countNodes(structural), [structural]);
  const containerPaths = useMemo(() => collectContainerPaths(structural), [structural]);

  const rootShape =
    structural.type === "array"
      ? `[ ${structural.size} items ]`
      : structural.type === "object"
        ? `{ ${structural.size} keys }`
        : structural.type;

  const statsLine = [
    `${totalNodes} values`,
    stats.object ? `${stats.object} obj` : "",
    stats.array ? `${stats.array} arr` : "",
    stats.string ? `${stats.string} str` : "",
    stats.number ? `${stats.number} num` : "",
    stats.boolean ? `${stats.boolean} bool` : "",
    stats.null ? `${stats.null} null` : "",
  ]
    .filter(Boolean)
    .join(" · ");

  const matchCount = useMemo(() => {
    let count = 0;
    const visit = (n: JsonNode) => {
      if (n.selfMatch) count += 1;
      n.children.forEach(visit);
    };
    visit(tree);
    return count;
  }, [tree]);

  const handleExpandAll = () => setExpanded(new Set(containerPaths));
  const handleCollapseAll = () => setExpanded(new Set());
  const handleToggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const toggle = (path: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });

  const revealAll = (path: string) =>
    setRevealed((prev) => {
      const next = new Set(prev);
      next.add(path);
      return next;
    });

  const copy = (text: string, label: string) => {
    copyToClipboard(text);
    setCopied(label);
    window.setTimeout(() => setCopied(null), 1400);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "/") {
      const target = event.target as HTMLElement;
      if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    }
    if (event.key === "Escape") {
      setQuery("");
    }
  };

  const clearQuery = () => setQuery("");

  const renderNode = (node: JsonNode): React.ReactNode => {
    const isContainer = node.type === "object" || node.type === "array";
    const isExpanded =
      isContainer &&
      (expanded.has(node.path) || (searching && node.hasMatch && !node.selfMatch));
    const isRevealed = revealed.has(node.path);
    const isRoot = node.isRoot;
    const copiedPath = copied === `path:${node.path}`;
    const copiedValue = copied === `value:${node.path}`;
    const leafClass = LEAF_CLASS[node.type];

    if (isContainer) {
      const children = node.children;
      const shown = isRevealed ? children : children.slice(0, maxItems);
      const hidden = children.length - shown.length;
      const openToken = node.type === "array" ? "[" : "{";
      const closeToken = node.type === "array" ? "]" : "}";
      const isArray = node.type === "array";
      const keyClass = isArray ? "text-muted-foreground" : "text-primary";

      return (
        <div key={node.path} className="group/row">
          <div className="flex items-center gap-1.5 rounded-md px-1.5 py-[2px] font-mono text-[12.5px] leading-5 hover:bg-muted/50">
            {!isRoot && (
              <button
                type="button"
                onClick={() => toggle(node.path)}
                aria-expanded={isExpanded}
                className="flex min-w-0 flex-1 items-center gap-1.5 text-left"
              >
                <ChevronIcon
                  className={cn(
                    "h-3.5 w-3.5 shrink-0 text-subtle transition-transform duration-200",
                    isExpanded && "rotate-90"
                  )}
                />
                <span className={cn("truncate", keyClass)}>
                  <Highlight text={node.key} query={deferredQuery} />
                </span>
                <span className="text-subtle">:</span>
                <span className="text-subtle">{isExpanded ? openToken : `${openToken} … ${closeToken}`}</span>
                {!isExpanded && (
                  <span className="truncate text-subtle">
                    {isArray
                      ? `${children.length} items`
                      : `${children.length} keys`}
                  </span>
                )}
                {!isExpanded && (
                  <span className="hidden shrink-0 rounded bg-muted px-1 py-px text-[10px] text-subtle sm:inline-block">
                    {node.type}
                  </span>
                )}
              </button>
            )}
            {isRoot && (
              <span className="flex min-w-0 flex-1 items-center gap-1.5 text-subtle">
                {isExpanded ? openToken : `${openToken} … ${closeToken}`}
                {!isExpanded && (
                  <span className="truncate">
                    {isArray ? `${children.length} items` : `${children.length} keys`}
                  </span>
                )}
              </span>
            )}
            <span className="ml-auto hidden shrink-0 items-center gap-0.5 opacity-0 transition-opacity duration-150 group-hover/row:opacity-100 sm:flex">
              <ActionBtn title="Copy path" onClick={() => copy(node.path, `path:${node.path}`)}>
                {copiedPath ? <CheckIcon className="h-3.5 w-3.5 text-success" /> : <CopyIcon className="h-3.5 w-3.5" />}
              </ActionBtn>
              <ActionBtn title="Copy value" onClick={() => copy(prettyJson(node.raw), `value:${node.path}`)}>
                {copiedValue ? <CheckIcon className="h-3.5 w-3.5 text-success" /> : <CopyIcon className="h-3.5 w-3.5 rotate-180" />}
              </ActionBtn>
            </span>
          </div>

          {isExpanded && (
            <div className="animate-fade-in ml-[15px] border-l border-border/70 pl-2">
              {shown.map(renderNode)}
              {hidden > 0 && (
                <button
                  type="button"
                  onClick={() => revealAll(node.path)}
                  className="animate-fade-in flex items-center gap-1 rounded-md px-1.5 py-1 font-mono text-[11.5px] text-subtle transition-colors hover:bg-muted/60 hover:text-foreground"
                >
                  <BracketIcon className="h-3 w-3" />
                  … {hidden} more {isArray ? "items" : "keys"}
                </button>
              )}
              <div className="px-1.5 py-[1px] font-mono text-[12.5px] leading-5 text-subtle">
                {closeToken}
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        key={node.path}
        className="group/row flex items-center gap-1.5 rounded-md px-1.5 py-[2px] font-mono text-[12.5px] leading-5 hover:bg-muted/50"
      >
        {!isRoot && (
          <>
            <span className="w-4 shrink-0" />
            <span className="truncate text-primary">
              <Highlight text={node.key} query={deferredQuery} />
            </span>
            <span className="text-subtle">:</span>
          </>
        )}
        <span
          className={cn("max-w-[65%] truncate", leafClass)}
          title={typeof node.raw === "string" ? node.raw : undefined}
        >
          <Highlight text={formatLeaf(node)} query={deferredQuery} />
        </span>
        <span className="hidden shrink-0 rounded bg-muted px-1 py-px text-[10px] text-subtle sm:inline-block">
          {node.type}
        </span>
        <span className="ml-auto hidden shrink-0 items-center gap-0.5 opacity-0 transition-opacity duration-150 group-hover/row:opacity-100 sm:flex">
          <ActionBtn title="Copy path" onClick={() => copy(node.path, `path:${node.path}`)}>
            {copiedPath ? <CheckIcon className="h-3.5 w-3.5 text-success" /> : <CopyIcon className="h-3.5 w-3.5" />}
          </ActionBtn>
          <ActionBtn title="Copy value" onClick={() => copy(formatLeaf(node), `value:${node.path}`)}>
            {copiedValue ? <CheckIcon className="h-3.5 w-3.5 text-success" /> : <CopyIcon className="h-3.5 w-3.5 rotate-180" />}
          </ActionBtn>
        </span>
      </div>
    );
  };

  const hasResults = !searching || tree.hasMatch || tree.selfMatch;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-surface shadow-sm",
        className
      )}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-muted/40 px-3 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary">
            <BracesIcon className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold leading-none text-foreground">{title}</p>
            <p className="mt-1 truncate text-[10.5px] text-subtle">{rootShape}</p>
          </div>
        </div>

        <div className="flex min-w-[140px] flex-1 items-center gap-2 sm:min-w-0 sm:justify-end">
          {searchable && (
            <div className="relative w-full max-w-[240px] flex-1">
              <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-subtle" />
              <input
                ref={searchRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => event.stopPropagation()}
                placeholder="Search keys & values"
                className="w-full rounded-md border border-border bg-surface py-1.5 pl-8 pr-7 text-[12.5px] text-foreground outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
              />
              {query && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={clearQuery}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-subtle transition-colors hover:text-foreground"
                >
                  <CloseIcon className="h-3.5 w-3.5" />
                </button>
              )}
              {searching && (
                <span className="pointer-events-none absolute -right-1 top-1/2 hidden -translate-y-1/2 translate-x-full rounded bg-primary-soft px-1.5 py-0.5 text-[10px] font-medium text-primary sm:block">
                  {matchCount} match{matchCount === 1 ? "" : "es"}
                </span>
              )}
            </div>
          )}
          <div className="flex shrink-0 items-center gap-0.5">
            <IconBtn title="Expand all" onClick={handleExpandAll}>
              <ChevronsDownIcon className="h-4 w-4" />
            </IconBtn>
            <IconBtn title="Collapse all" onClick={handleCollapseAll}>
              <ChevronsUpIcon className="h-4 w-4" />
            </IconBtn>
            <span className="mx-1 h-4 w-px bg-border" />
            <IconBtn
              title={theme === "dark" ? "Light mode" : "Dark mode"}
              onClick={handleToggleTheme}
            >
              {theme === "dark" ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
            </IconBtn>
          </div>
        </div>
      </div>

      {/* Type stats strip */}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 border-b border-border px-3 py-1.5 text-[10.5px] text-subtle">
        <span className="truncate">{statsLine}</span>
      </div>

      {/* Tree body */}
      <div
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className="scrollbar-thin cursor-default overflow-auto p-2 outline-none"
        style={{ height }}
      >
        {hasResults ? (
          renderNode(tree)
        ) : (
          <div className="animate-fade-in flex h-full flex-col items-center justify-center gap-2 py-10 text-subtle">
            <SearchIcon className="h-6 w-6" />
            <p className="text-[13px]">
              No matches for “{deferredQuery.trim()}”
            </p>
            <button
              type="button"
              onClick={clearQuery}
              className="text-[12px] text-primary transition-colors hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function formatLeaf(node: JsonNode): string {
  switch (node.type) {
    case "string":
      return JSON.stringify(node.raw);
    case "number":
      return String(node.raw);
    case "boolean":
      return String(node.raw);
    case "null":
      return "null";
    case "undefined":
      return "undefined";
    default:
      return "";
  }
}
