"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import { Highlight } from "./Highlight";
import {
  docCategories,
  docItems,
  getPopularComponents,
  searchDocs,
  type DocCategory,
  type DocItem,
  type SearchGroup,
} from "./data";

const RECENT_KEY = "docs:recent-searches";
const MAX_RECENT = 5;

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function HotIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 1-5 3-7 4 4 8 8 8 12a8 8 0 01-2.343 4.657z" />
    </svg>
  );
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [copied, setCopied] = useState(false);

  const [recents, setRecents] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(RECENT_KEY);
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  });

  /* ------------------------------- effects ------------------------------ */

  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement as HTMLElement | null;
      const raf = requestAnimationFrame(() => {
        setVisible(true);
        setQuery("");
        setActiveIndex(-1);
        requestAnimationFrame(() => setAnimate(true));
      });
      return () => cancelAnimationFrame(raf);
    }
    const animTimer = setTimeout(() => setAnimate(false), 0);
    const closeTimer = setTimeout(() => setVisible(false), 200);
    return () => {
      clearTimeout(animTimer);
      clearTimeout(closeTimer);
    };
  }, [open]);

  useEffect(() => {
    if (!visible) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [visible]);

  useEffect(() => {
    if (open && visible) inputRef.current?.focus();
  }, [open, visible]);

  useEffect(() => {
    if (open || visible) return;
    triggerRef.current?.focus();
  }, [open, visible]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    try {
      localStorage.setItem(RECENT_KEY, JSON.stringify(recents));
    } catch {
      /* ignore storage errors */
    }
  }, [recents]);

  useEffect(() => {
    if (activeIndex < 0) return;
    const el = listRef.current?.querySelector(
      `[data-result-index="${activeIndex}"]`
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  /* -------------------------------- data -------------------------------- */

  const groups: SearchGroup[] = useMemo(
    () => (query.trim() ? searchDocs(docItems, query) : []),
    [query]
  );

  const flat = useMemo(
    () =>
      groups.flatMap((group) =>
        group.results.map((result) => ({ ...result, group }))
      ),
    [groups]
  );

  const flatIndexById = useMemo(() => {
    const map = new Map<string, number>();
    flat.forEach((result, index) => map.set(result.item.id, index));
    return map;
  }, [flat]);

  const popular = useMemo(() => getPopularComponents(docItems).slice(0, 12), []);

  /* ------------------------------ handlers ------------------------------ */

  const updateQuery = useCallback((value: string) => {
    setQuery(value);
    setActiveIndex(value.trim() ? 0 : -1);
  }, []);

  const addRecent = useCallback((value: string) => {
    const v = value.trim();
    if (!v) return;
    setRecents((prev) => [v, ...prev.filter((r) => r !== v)].slice(0, MAX_RECENT));
  }, []);

  const handleAction = useCallback(
    (item: DocItem) => {
      if (item.id === "action:toggle-theme") {
        const next = !document.documentElement.classList.contains("dark");
        document.documentElement.classList.toggle("dark", next);
        try {
          localStorage.setItem("theme", next ? "dark" : "light");
        } catch {
          /* ignore storage errors */
        }
        onClose();
        return;
      }
      if (item.id === "action:copy-url") {
        void navigator.clipboard?.writeText(window.location.href);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
        return;
      }
      if (item.id === "action:print") {
        onClose();
        window.setTimeout(() => window.print(), 60);
      }
    },
    [onClose]
  );

  const selectItem = useCallback(
    (item: DocItem) => {
      if (item.badge === "Category") {
        updateQuery(item.title);
        return;
      }
      if (item.badge === "Action") {
        handleAction(item);
        return;
      }
      addRecent(query.trim() || item.title);
      router.push(item.href);
      onClose();
    },
    [updateQuery, addRecent, handleAction, query, router, onClose]
  );

  const onInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const count = flat.length;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (count > 0) setActiveIndex((i) => (i + 1) % count);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (count > 0) setActiveIndex((i) => (i <= 0 ? count - 1 : i - 1));
      } else if (e.key === "Home") {
        e.preventDefault();
        if (count > 0) setActiveIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        if (count > 0) setActiveIndex(count - 1);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const active = flat[activeIndex];
        if (active) selectItem(active.item);
      }
    },
    [flat, activeIndex, selectItem]
  );

  const onPanelKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const els = Array.from(
      panelRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input, a[href], [tabindex]:not([tabindex="-1"])'
      )
    );
    if (els.length === 0) return;
    const first = els[0];
    const last = els[els.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  if (!visible) return null;

  const hasQuery = query.trim().length > 0;
  const activeId = flat[activeIndex]?.item.id
    ? `search-option-${activeIndex}`
    : undefined;

  /* ------------------------------ rendering ----------------------------- */

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[8vh] sm:pt-[14vh]" role="dialog" aria-modal="true" aria-label="Search documentation">
      <div
        className={cn(
          "absolute inset-0 bg-black/45 backdrop-blur-[2px] transition-opacity duration-200",
          animate ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />

      <div
        ref={panelRef}
        onKeyDown={onPanelKeyDown}
        className={cn(
          "relative z-10 flex w-full max-w-xl transform-gpu flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-modal shadow-black/10 transition-[opacity,transform] duration-200 ease-out dark:shadow-black/40",
          animate ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-[0.97] opacity-0"
        )}
      >
        {/* Search bar */}
        <div className="flex items-center gap-2.5 border-b border-border px-4">
          <SearchIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => updateQuery(e.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder="Search components, pages, topics..."
            aria-label="Search documentation"
            role="combobox"
            aria-expanded={hasQuery}
            aria-controls="search-results"
            aria-activedescendant={activeId}
            autoComplete="off"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent py-3.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                updateQuery("");
                inputRef.current?.focus();
              }}
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Clear search"
            >
              <XIcon className="h-3.5 w-3.5" />
            </button>
          ) : (
            <kbd className="hidden shrink-0 rounded-md border border-border bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground sm:inline-block">
              esc
            </kbd>
          )}
        </div>

        {/* Body */}
        <div
          ref={listRef}
          id="search-results"
          className="scrollbar-thin max-h-[min(70vh,28rem)] overflow-y-auto"
        >
          {!hasQuery ? (
            /* --------------------------- home view --------------------------- */
            <div className="flex flex-col gap-5 p-3">
              {recents.length > 0 && (
                <section aria-label="Recent searches">
                  <div className="flex items-center justify-between px-2 pb-1.5">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Recent searches
                    </h3>
                    <button
                      type="button"
                      onClick={() => setRecents([])}
                      className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Clear
                    </button>
                  </div>
                  <ul className="flex flex-col gap-0.5">
                    {recents.map((recent) => (
                      <li key={recent}>
                        <button
                          type="button"
                          onClick={() => updateQuery(recent)}
                          className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left text-sm text-foreground transition-[background-color,transform] duration-150 ease-out hover:bg-muted hover:translate-x-0.5 active:scale-[0.99]"
                        >
                          <ClockIcon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                          <span className="flex-1 truncate">{recent}</span>
                          <ArrowIcon className="h-3.5 w-3.5 shrink-0 text-muted-foreground/60" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <section aria-label="Popular components">
                <h3 className="flex items-center gap-1.5 px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <HotIcon className="h-3.5 w-3.5" />
                  Popular components
                </h3>
                <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                  {popular.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => selectItem(item)}
                      className="group flex items-center gap-2.5 rounded-lg border border-border px-2.5 py-2 text-left transition-[transform,border-color,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-ring/50 hover:bg-muted/60 active:scale-[0.98]"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-muted text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                        {item.icon}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-foreground">
                          {item.title}
                        </span>
                        <span className="block truncate text-[11px] text-muted-foreground">
                          {item.category}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </section>

              <section aria-label="Categories">
                <h3 className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Browse categories
                </h3>
                <div className="flex flex-wrap gap-1.5 px-1 pb-1">
                  {docCategories.map((cat: DocCategory) => (
                    <button
                      key={cat.title}
                      type="button"
                      onClick={() => updateQuery(cat.title)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs font-medium text-foreground transition-[transform,border-color,background-color] duration-150 ease-out hover:border-ring/50 hover:bg-muted active:scale-[0.97]"
                    >
                      <span className="text-muted-foreground">{cat.icon}</span>
                      {cat.title}
                      <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            </div>
          ) : groups.length === 0 ? (
            /* --------------------------- no results --------------------------- */
            <div className="flex flex-col items-center justify-center gap-2 px-6 py-14 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <SearchIcon className="h-5 w-5" />
              </div>
              <p className="mt-1 text-sm font-medium text-foreground">
                No results for &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-muted-foreground">
                Try a broader term like &ldquo;button&rdquo; or &ldquo;form&rdquo;
              </p>
              <button
                type="button"
                onClick={() => {
                  updateQuery("");
                  inputRef.current?.focus();
                }}
                className="mt-2 text-xs font-medium text-accent transition-colors hover:underline"
              >
                Clear search
              </button>
            </div>
          ) : (
            /* ---------------------------- results ---------------------------- */
            <div key={query} role="listbox" aria-label="Search results" className="flex flex-col gap-3 p-2 animate-fade-slide">
              {groups.map((group) => (
                <div key={group.category} className="flex flex-col">
                  <div className="flex items-center justify-between px-2 pb-1 pt-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {group.icon} {group.category}
                    </span>
                    <span className="text-[11px] text-muted-foreground/70">
                      {group.results.length}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    {group.results.map((result) => {
                      const index = flatIndexById.get(result.item.id) ?? -1;
                      return (
                        <button
                          key={result.item.id}
                          id={`search-option-${index}`}
                          type="button"
                          role="option"
                          aria-selected={index === activeIndex}
                          data-result-index={index}
                          onMouseEnter={() => setActiveIndex(index)}
                          onClick={() => selectItem(result.item)}
                          className={cn(
                            "group flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-[background-color,transform] duration-150 ease-out hover:translate-x-0.5 active:scale-[0.99]",
                            index === activeIndex
                              ? "bg-muted"
                              : "hover:bg-muted/50"
                          )}
                        >
                          <span
                            className={cn(
                              "flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-sm transition-colors",
                              index === activeIndex
                                ? "bg-foreground text-background"
                                : "bg-muted text-muted-foreground group-hover:text-foreground"
                            )}
                          >
                            {result.item.icon}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-medium text-foreground">
                              <Highlight text={result.item.title} indices={result.titleMatch.indices} />
                            </span>
                            {result.item.description && (
                              <span className="block truncate text-xs text-muted-foreground">
                                {result.item.description}
                              </span>
                            )}
                          </span>
                          {result.item.badge && result.item.badge !== "Page" && (
                            <span className="shrink-0 rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                              {result.item.badge}
                            </span>
                          )}
                          <ArrowIcon className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50 opacity-0 transition-opacity group-hover:opacity-100" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-2.5">
          <p className="flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="hidden sm:inline-flex items-center gap-1">
              <kbd className="rounded border border-border bg-muted px-1 py-0.5">↑↓</kbd>
              navigate
            </span>
            <span className="hidden sm:inline-flex items-center gap-1">
              <kbd className="rounded border border-border bg-muted px-1 py-0.5">↵</kbd>
              select
            </span>
            <span className="hidden sm:inline-flex items-center gap-1">
              <kbd className="rounded border border-border bg-muted px-1 py-0.5">esc</kbd>
              close
            </span>
            {!hasQuery && (
              <span className="sm:hidden text-muted-foreground/70">Type to search</span>
            )}
          </p>
          {copied ? (
            <p className="shrink-0 text-[11px] font-medium text-accent">
              Copied to clipboard
            </p>
          ) : (
            <p className="shrink-0 text-[11px] text-muted-foreground/70">
              {hasQuery ? `${flat.length} result${flat.length === 1 ? "" : "s"}` : ""}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
