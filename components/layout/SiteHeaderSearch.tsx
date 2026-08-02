"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { navigationSections } from "@/constants/navigation";
import { cn } from "@/lib/cn";
import { CommandIcon, SearchIcon } from "./icons";

interface SiteHeaderSearchProps {
  open: boolean;
  onClose: () => void;
}

interface SearchResult {
  label: string;
  href: string;
  section: string;
}

/** Command-palette style search overlay opened from the header (Ctrl/Cmd + K). */
export function SiteHeaderSearch({ open, onClose }: SiteHeaderSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const allResults = useMemo<SearchResult[]>(
    () =>
      navigationSections.flatMap((section) =>
        section.links.map((link) => ({
          label: link.label,
          href: link.href,
          section: section.title,
        }))
      ),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allResults;
    return allResults.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.href.toLowerCase().includes(q) ||
        item.section.toLowerCase().includes(q)
    );
  }, [allResults, query]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => {
        setQuery("");
        setActiveIndex(0);
        inputRef.current?.focus();
      }, 0);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    const active = listRef.current?.querySelector<HTMLElement>(
      `[data-index="${activeIndex}"]`
    );
    active?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const navigate = useCallback(
    (href: string) => {
      router.push(href);
      onClose();
    },
    [router, onClose]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[activeIndex]) {
      e.preventDefault();
      navigate(filtered[activeIndex].href);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh]">
      <div
        className="absolute inset-0 bg-background/60 backdrop-blur-sm animate-[fade-in_0.15s_ease-out]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search the documentation"
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-background shadow-modal animate-[fade-in-down_0.2s_cubic-bezier(0.16,1,0.3,1)]"
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <SearchIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search components, templates, pages..."
            className="h-12 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            aria-label="Search the documentation"
          />
          <kbd className="hidden shrink-0 items-center gap-1 rounded-md border border-border bg-muted/50 px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
            <CommandIcon className="h-2.5 w-2.5" />
            K
          </kbd>
        </div>

        <div ref={listRef} className="max-h-[45vh] overflow-y-auto p-2">
          {filtered.length === 0 && (
            <div className="flex flex-col items-center gap-1 py-10 text-center">
              <SearchIcon className="h-6 w-6 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">
                No results for &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-muted-foreground/70">
                Try searching for a component or page name.
              </p>
            </div>
          )}
          {filtered.map((item, index) => {
            const firstInSection =
              index === 0 || filtered[index - 1].section !== item.section;
            return (
              <div key={item.href}>
                {firstInSection && (
                  <div className="px-2.5 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                    {item.section}
                  </div>
                )}
                <button
                  type="button"
                  data-index={index}
                  onClick={() => navigate(item.href)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors",
                    activeIndex === index
                      ? "bg-accent-soft text-foreground"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  )}
                >
                  <span className="flex-1 truncate">{item.label}</span>
                  <span className="shrink-0 font-mono text-[11px] text-muted-foreground/60">
                    {item.href}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-4 border-t border-border px-4 py-2 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <kbd className="rounded border border-border bg-muted/50 px-1 py-0.5 font-mono">↑↓</kbd>
            Navigate
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="rounded border border-border bg-muted/50 px-1 py-0.5 font-mono">↵</kbd>
            Select
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="rounded border border-border bg-muted/50 px-1 py-0.5 font-mono">Esc</kbd>
            Close
          </span>
          <span className="ml-auto hidden font-mono sm:block">{filtered.length} results</span>
        </div>
      </div>
    </div>
  );
}
