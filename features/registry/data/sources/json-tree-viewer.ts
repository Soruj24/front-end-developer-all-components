export const jsonTreeViewerSource: string = `"use client";

import { useDeferredValue, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import {
  Search,
  X,
  Copy,
  Check,
  ChevronRight,
  ChevronsDown,
  ChevronsUp,
  Sun,
  Moon,
  Braces,
} from "lucide-react";

export type JsonType = "object" | "array" | "string" | "number" | "boolean" | "null" | "undefined";

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
  data: unknown;
  title?: string;
  className?: string;
  height?: number | string;
  defaultExpandedDepth?: number;
  maxItems?: number;
  defaultTheme?: "light" | "dark";
  searchable?: boolean;
}

const IDENT = /^[A-Za-z_$][\\w$]*$/;

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
    if (typeof seg === "number") path += "[" + seg + "]";
    else if (IDENT.test(seg)) path += "." + seg;
    else path += "[" + JSON.stringify(seg) + "]";
  }
  return path;
}

function valueText(type: JsonType, raw: unknown): string {
  switch (type) {
    case "array": return (raw as unknown[]).length + " items";
    case "object": return Object.keys(raw as Record<string, unknown>).length + " keys";
    case "string": return raw as string;
    case "number":
    case "boolean": return String(raw);
    case "null":
    case "undefined": return type;
  }
}

function buildNode(value: unknown, key: string, segments: (string | number)[], depth: number, isRoot: boolean): JsonNode {
  const type = getType(value);
  let children: JsonNode[] = [];
  if (type === "object" || type === "array") {
    const entries: [string, unknown][] = type === "array"
      ? (value as unknown[]).map((v, i) => [String(i), v] as const)
      : Object.entries(value as Record<string, unknown>);
    children = entries.map(([k, v]) =>
      buildNode(v, k, [...segments, type === "array" ? Number(k) : k], depth + 1, false),
    );
  }
  return { key, path: buildPath(segments), type, raw: value, children, size: children.length, depth, isRoot, selfMatch: false, hasMatch: false };
}

function applyQuery(node: JsonNode, query: string): JsonNode {
  if (!query.trim()) return node;
  const q = query.trim().toLowerCase();
  const selfMatch = (node.key + " " + valueText(node.type, node.raw)).toLowerCase().includes(q);
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
      const entries: [string, unknown][] = type === "array"
        ? (value as unknown[]).map((v, i) => [String(i), v] as const)
        : Object.entries(value as Record<string, unknown>);
      for (const [k, v] of entries) visit(v, [...segments, type === "array" ? Number(k) : k], d + 1);
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

function prettyJson(value: unknown): string {
  if (value === undefined) return "";
  try { return JSON.stringify(value, null, 2); } catch { return String(value); }
}

function formatLeaf(node: JsonNode): string {
  switch (node.type) {
    case "string": return JSON.stringify(node.raw);
    case "number":
    case "boolean": return String(node.raw);
    case "null": return "null";
    case "undefined": return "undefined";
    default: return "";
  }
}

const LEAF_CLASS: Partial<Record<JsonType, string>> = {
  string: "text-emerald-600 dark:text-emerald-400",
  number: "text-sky-600 dark:text-sky-400",
  boolean: "text-amber-600 dark:text-amber-400",
  null: "text-muted-foreground italic",
  undefined: "text-muted-foreground italic",
};

function IconBtn({ title, onClick, children }: { title: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onClick={onClick}
      className={cn(
        "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-muted-foreground",
        "transition-colors duration-150",
        "hover:bg-muted hover:text-foreground",
        "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
      )}
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
      <mark className="rounded bg-primary/20 px-0.5 text-inherit">{text.slice(idx, idx + q.length)}</mark>
      {text.slice(idx + q.length)}
    </>
  );
}

interface TreeRowProps {
  node: JsonNode;
  expanded: Set<string>;
  revealed: Set<string>;
  searching: boolean;
  query: string;
  maxItems: number;
  copied: string | null;
  isRoot: boolean;
  toggle: (path: string) => void;
  revealAll: (path: string) => void;
  copy: (text: string, label: string) => void;
}

function TreeRow({ node, expanded, revealed, searching, query, maxItems, copied, isRoot, toggle, revealAll, copy }: TreeRowProps) {
  const isContainer = node.type === "object" || node.type === "array";
  const isExpanded = isContainer && (expanded.has(node.path) || (searching && node.hasMatch && !node.selfMatch));
  const isRevealed = revealed.has(node.path);
  const leafClass = LEAF_CLASS[node.type];

  const copyButtons = (path: string, value: string) => (
    <span className="ml-auto hidden shrink-0 items-center gap-0.5 opacity-0 transition-opacity duration-150 group-hover/row:opacity-100 sm:flex">
      <button type="button" title="Copy path" aria-label="Copy path" onClick={() => copy(path, "path:" + node.path)}
        className="rounded-md p-0.5 text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground">
        {copied === "path:" + node.path ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
      <button type="button" title="Copy value" aria-label="Copy value" onClick={() => copy(value, "value:" + node.path)}
        className="rounded-md p-0.5 text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground">
        {copied === "value:" + node.path ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 rotate-180" />}
      </button>
    </span>
  );

  if (isContainer) {
    const shown = isRevealed ? node.children : node.children.slice(0, maxItems);
    const hidden = node.children.length - shown.length;
    const openToken = node.type === "array" ? "[" : "{";
    const closeToken = node.type === "array" ? "]" : "}";
    return (
      <div key={node.path} className="group/row">
        <div className="flex items-center gap-1.5 rounded-lg px-2 py-[3px] font-mono text-[12.5px] leading-5 transition-colors duration-150 hover:bg-muted/60">
          {!isRoot ? (
            <button type="button" onClick={() => toggle(node.path)} aria-expanded={isExpanded} className="flex min-w-0 flex-1 items-center gap-1.5 text-left">
              <ChevronRight className={cn("h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200", isExpanded && "rotate-90")} />
              <span className={cn("truncate", node.type === "array" ? "text-muted-foreground" : "text-primary")}>
                <Highlight text={node.key} query={query} />
              </span>
              <span className="text-muted-foreground">:</span>
              <span className="text-muted-foreground">{isExpanded ? openToken : openToken + " … " + closeToken}</span>
              {!isExpanded && <span className="truncate text-muted-foreground">{childrenCountLabel(node)}</span>}
            </button>
          ) : (
            <span className="flex min-w-0 flex-1 items-center gap-1.5 text-muted-foreground">
              {isExpanded ? openToken : openToken + " … " + closeToken}
              {!isExpanded && <span className="truncate">{childrenCountLabel(node)}</span>}
            </span>
          )}
          {copyButtons(node.path, prettyJson(node.raw))}
        </div>
        {isExpanded && (
          <div className="ml-[15px] border-l-2 border-border/50 pl-2">
            {shown.map((child) => (
              <TreeRow key={child.path} node={child} expanded={expanded} revealed={revealed} searching={searching} query={query} maxItems={maxItems} copied={copied} isRoot={false} toggle={toggle} revealAll={revealAll} copy={copy} />
            ))}
            {hidden > 0 && (
              <button type="button" onClick={() => revealAll(node.path)} className="flex items-center gap-1 rounded-lg px-2 py-1 font-mono text-[11.5px] text-muted-foreground transition-colors duration-150 hover:bg-muted/60 hover:text-foreground">
                … {hidden} more {node.type === "array" ? "items" : "keys"}
              </button>
            )}
            <div className="px-2 py-[1px] font-mono text-[12.5px] leading-5 text-muted-foreground">{closeToken}</div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div key={node.path} className="group/row flex items-center gap-1.5 rounded-lg px-2 py-[3px] font-mono text-[12.5px] leading-5 transition-colors duration-150 hover:bg-muted/60">
      {!isRoot && (
        <>
          <span className="w-4 shrink-0" />
          <span className="truncate text-primary"><Highlight text={node.key} query={query} /></span>
          <span className="text-muted-foreground">:</span>
        </>
      )}
      <span className={cn("max-w-[65%] truncate", leafClass)} title={typeof node.raw === "string" ? node.raw : undefined}>
        <Highlight text={formatLeaf(node)} query={query} />
      </span>
      <span className="hidden shrink-0 rounded-md bg-muted px-1.5 py-px text-[10px] text-muted-foreground sm:inline-block">{node.type}</span>
      {copyButtons(node.path, formatLeaf(node))}
    </div>
  );
}

function childrenCountLabel(node: JsonNode): string {
  return node.type === "array" ? node.children.length + " items" : node.children.length + " keys";
}

export function JsonTreeViewer({ data, title = "JSON", className, height = 560, defaultExpandedDepth = 2, maxItems = 100, defaultTheme = "dark", searchable = true }: JsonTreeViewerProps) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [expanded, setExpanded] = useState<Set<string>>(() => computeInitialExpanded(data, defaultExpandedDepth));
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [theme, setTheme] = useState<"light" | "dark">(defaultTheme);
  const [copied, setCopied] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const parsedData = useMemo(() => {
    if (typeof data === "string") {
      const trimmed = data.trim();
      if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
        try { return JSON.parse(trimmed); } catch { /* keep raw */ }
      }
    }
    return data;
  }, [data]);

  const structural = useMemo(() => buildNode(parsedData, "$", [], 0, true), [parsedData]);
  const tree = useMemo(() => applyQuery(structural, deferredQuery), [structural, deferredQuery]);
  const searching = deferredQuery.trim().length > 0;
  const containerPaths = useMemo(() => collectContainerPaths(structural), [structural]);

  const rootShape = structural.type === "array"
    ? "[ " + structural.size + " items ]"
    : structural.type === "object"
      ? "{ " + structural.size + " keys }"
      : structural.type;

  const toggle = (path: string) => setExpanded((prev) => {
    const next = new Set(prev);
    if (next.has(path)) next.delete(path);
    else next.add(path);
    return next;
  });
  const revealAll = (path: string) => setRevealed((prev) => {
    const next = new Set(prev);
    next.add(path);
    return next;
  });
  const copy = (text: string, label: string) => {
    if (navigator.clipboard?.writeText) void navigator.clipboard.writeText(text);
    setCopied(label);
    window.setTimeout(() => setCopied(null), 1400);
  };

  const hasResults = !searching || tree.hasMatch || tree.selfMatch;

  return (
    <div className={cn("overflow-hidden rounded-2xl border border-border bg-card shadow-sm", className)}>
      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-muted/30 px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Braces className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold leading-none text-foreground">{title}</p>
            <p className="mt-1 truncate text-[11px] text-muted-foreground">{rootShape}</p>
          </div>
        </div>
        <div className="flex min-w-[140px] flex-1 items-center gap-2 sm:min-w-0 sm:justify-end">
          {searchable && (
            <div className="relative w-full max-w-[240px] flex-1">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search keys and values"
                className="w-full rounded-xl border border-border bg-card py-1.5 pl-8 pr-7 text-[12.5px] text-foreground placeholder:text-muted-foreground outline-none transition-colors duration-200 hover:border-muted-foreground/30 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              {query && (
                <button type="button" aria-label="Clear search" onClick={() => setQuery("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors duration-150 hover:text-foreground">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          )}
          <div className="flex shrink-0 items-center gap-0.5">
            <IconBtn title="Expand all" onClick={() => setExpanded(new Set(containerPaths))}>
              <ChevronsDown className="h-4 w-4" />
            </IconBtn>
            <IconBtn title="Collapse all" onClick={() => setExpanded(new Set())}>
              <ChevronsUp className="h-4 w-4" />
            </IconBtn>
            <span className="mx-1 h-4 w-px bg-border" />
            <IconBtn title={theme === "dark" ? "Light mode" : "Dark mode"} onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}>
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </IconBtn>
          </div>
        </div>
      </div>
      <div onKeyDown={(e) => { if (e.key === "Escape") setQuery(""); }} tabIndex={0} className="cursor-default overflow-auto p-2 outline-none" style={{ height }}>
        {hasResults ? (
          <TreeRow node={tree} expanded={expanded} revealed={revealed} searching={searching} query={deferredQuery} maxItems={maxItems} copied={copied} isRoot={true} toggle={toggle} revealAll={revealAll} copy={copy} />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 py-10 text-muted-foreground">
            <Search className="h-6 w-6" />
            <p className="text-[13px]">No matches found</p>
            <button type="button" onClick={() => setQuery("")} className="text-[12px] text-primary transition-colors duration-150 hover:underline">Clear search</button>
          </div>
        )}
      </div>
    </div>
  );
}
// Requires the cn() utility from "@/lib/cn" (clsx + tailwind-merge).`;
