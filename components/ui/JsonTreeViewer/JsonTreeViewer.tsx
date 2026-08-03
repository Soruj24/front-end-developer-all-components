"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { JsonTreeViewerProps, JsonNode } from "./JsonTreeViewer.types";
import { buildNode, applyQuery, computeInitialExpanded, collectContainerPaths, computeStats, countNodes } from "./JsonTreeViewer.utils";
import { SearchIcon, CloseIcon, ChevronsDownIcon, ChevronsUpIcon, SunIcon, MoonIcon, BracesIcon } from "./JsonTreeViewer.icons";
import { IconBtn } from "./JsonTreeViewerPieces";
import { TreeRow } from "./JsonTreeViewerRow";

export function JsonTreeViewer({ data, title = "JSON", className, height = 560, defaultExpandedDepth = 2, maxItems = 100, defaultTheme = "dark", searchable = true }: JsonTreeViewerProps) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [expanded, setExpanded] = useState<Set<string>>(() => computeInitialExpanded(data, defaultExpandedDepth));
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [theme, setTheme] = useState<"light" | "dark">(defaultTheme);
  const [copied, setCopied] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => { document.documentElement.classList.toggle("dark", theme === "dark"); }, [theme]);

  const parsedData = useMemo(() => {
    if (typeof data === "string") { const trimmed = data.trim(); if (trimmed.startsWith("{") || trimmed.startsWith("[")) { try { return JSON.parse(trimmed); } catch { /* keep raw */ } } }
    return data;
  }, [data]);

  const structural = useMemo(() => buildNode(parsedData, "$", [], 0, true), [parsedData]);
  const tree = useMemo(() => applyQuery(structural, deferredQuery), [structural, deferredQuery]);
  const searching = deferredQuery.trim().length > 0;
  const stats = useMemo(() => computeStats(structural), [structural]);
  const totalNodes = useMemo(() => countNodes(structural), [structural]);
  const containerPaths = useMemo(() => collectContainerPaths(structural), [structural]);

  const rootShape = structural.type === "array" ? `[ ${structural.size} items ]` : structural.type === "object" ? `{ ${structural.size} keys }` : structural.type;
  const statsLine = [`${totalNodes} values`, stats.object ? `${stats.object} obj` : "", stats.array ? `${stats.array} arr` : "", stats.string ? `${stats.string} str` : "", stats.number ? `${stats.number} num` : "", stats.boolean ? `${stats.boolean} bool` : "", stats.null ? `${stats.null} null` : ""].filter(Boolean).join(" · ");

  const matchCount = useMemo(() => { let count = 0; const visit = (n: JsonNode) => { if (n.selfMatch) count += 1; n.children.forEach(visit); }; visit(tree); return count; }, [tree]);

  const handleExpandAll = () => setExpanded(new Set(containerPaths));
  const handleCollapseAll = () => setExpanded(new Set());
  const handleToggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  const toggle = (path: string) => setExpanded((prev) => { const next = new Set(prev); if (next.has(path)) next.delete(path); else next.add(path); return next; });
  const revealAll = (path: string) => setRevealed((prev) => { const next = new Set(prev); next.add(path); return next; });
  const copy = (text: string, label: string) => { if (navigator.clipboard?.writeText) void navigator.clipboard.writeText(text); setCopied(label); window.setTimeout(() => setCopied(null), 1400); };
  const handleKeyDown = (event: React.KeyboardEvent) => { if (event.key === "/") { const target = event.target as HTMLElement; if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") { event.preventDefault(); searchRef.current?.focus(); } } if (event.key === "Escape") setQuery(""); };

  const hasResults = !searching || tree.hasMatch || tree.selfMatch;

  return (
    <div className={cn("overflow-hidden rounded-xl border border-border bg-surface shadow-sm", className)}>
      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-muted/40 px-3 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary"><BracesIcon className="h-4 w-4" /></span>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold leading-none text-foreground">{title}</p>
            <p className="mt-1 truncate text-[10.5px] text-subtle">{rootShape}</p>
          </div>
        </div>
        <div className="flex min-w-[140px] flex-1 items-center gap-2 sm:min-w-0 sm:justify-end">
          {searchable && (
            <div className="relative w-full max-w-[240px] flex-1">
              <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-subtle" />
              <input ref={searchRef} value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.stopPropagation()} placeholder="Search keys & values"
                className="w-full rounded-md border border-border bg-surface py-1.5 pl-8 pr-7 text-[12.5px] text-foreground outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-primary/20" />
              {query && <button type="button" aria-label="Clear search" onClick={() => setQuery("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-subtle transition-colors hover:text-foreground"><CloseIcon className="h-3.5 w-3.5" /></button>}
              {searching && <span className="pointer-events-none absolute -right-1 top-1/2 hidden -translate-y-1/2 translate-x-full rounded bg-primary-soft px-1.5 py-0.5 text-[10px] font-medium text-primary sm:block">{matchCount} match{matchCount === 1 ? "" : "es"}</span>}
            </div>
          )}
          <div className="flex shrink-0 items-center gap-0.5">
            <IconBtn title="Expand all" onClick={handleExpandAll}><ChevronsDownIcon className="h-4 w-4" /></IconBtn>
            <IconBtn title="Collapse all" onClick={handleCollapseAll}><ChevronsUpIcon className="h-4 w-4" /></IconBtn>
            <span className="mx-1 h-4 w-px bg-border" />
            <IconBtn title={theme === "dark" ? "Light mode" : "Dark mode"} onClick={handleToggleTheme}>
              {theme === "dark" ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
            </IconBtn>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 border-b border-border px-3 py-1.5 text-[10.5px] text-subtle">
        <span className="truncate">{statsLine}</span>
      </div>
      <div onKeyDown={handleKeyDown} tabIndex={0} className="scrollbar-thin cursor-default overflow-auto p-2 outline-none" style={{ height }}>
        {hasResults ? (
          <TreeRow node={tree} expanded={expanded} revealed={revealed} searching={searching} query={deferredQuery} maxItems={maxItems} copied={copied} isRoot={true} toggle={toggle} revealAll={revealAll} copy={copy} />
        ) : (
          <div className="animate-fade-in flex h-full flex-col items-center justify-center gap-2 py-10 text-subtle">
            <SearchIcon className="h-6 w-6" />
            <p className="text-[13px]">No matches for &ldquo;{deferredQuery.trim()}&rdquo;</p>
            <button type="button" onClick={() => setQuery("")} className="text-[12px] text-primary transition-colors hover:underline">Clear search</button>
          </div>
        )}
      </div>
    </div>
  );
}
