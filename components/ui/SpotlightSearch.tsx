"use client";

import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface SpotlightItem {
  id: string;
  label: string;
  /** Secondary line shown under the label. */
  subtitle?: string;
  /** Extra search terms (not shown). */
  keywords?: string[];
  /** Grouping label — drives the section headers. */
  category: string;
  icon?: ReactNode;
  /** Shown in the "Popular" section when there is no query. */
  popular?: boolean;
  shortcut?: string;
  onSelect?: () => void;
}

export interface SpotlightSearchProps {
  items: SpotlightItem[];
  /** Controlled open state. */
  open?: boolean;
  /** Uncontrolled initial open state. Default false. */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
  emptyMessage?: string;
  /** Namespace for recents persistence. */
  storageKey?: string;
  recentLimit?: number;
  width?: number | string;
  maxHeight?: number | string;
  /** Bind the global ⌘K / Ctrl+K shortcut. Default true. */
  bindShortcut?: boolean;
  className?: string;
}

interface Section {
  title: string;
  rows: SpotlightItem[];
}

/* ------------------------------------------------------------------ */
/* Storage helpers                                                     */
/* ------------------------------------------------------------------ */

function readList(key: string): string[] | null {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const value: unknown = JSON.parse(raw);
    return Array.isArray(value)
      ? value.filter((v): v is string => typeof v === "string")
      : null;
  } catch {
    return null;
  }
}

function writeList(key: string, value: string[]) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — ignore */
  }
}

/* ------------------------------------------------------------------ */
/* Matching & section building                                         */
/* ------------------------------------------------------------------ */

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Higher is better. Returns -1 when the item does not match. */
function scoreItem(item: SpotlightItem, query: string): number {
  const label = item.label.toLowerCase();
  const keywords = (item.keywords ?? []).join(" ").toLowerCase();
  const category = item.category.toLowerCase();
  const subtitle = (item.subtitle ?? "").toLowerCase();
  let score = 0;
  for (const term of query.split(/\s+/).filter(Boolean)) {
    const li = label.indexOf(term);
    const ki = keywords.indexOf(term);
    const ci = category.indexOf(term);
    const si = subtitle.indexOf(term);
    if (li < 0 && ki < 0 && ci < 0 && si < 0) return -1;
    score += li >= 0 ? 1000 - li : ki >= 0 ? 600 - ki : ci >= 0 ? 350 - ci : 300 - si;
  }
  return score;
}

function buildSections(items: SpotlightItem[], query: string, recents: string[]): Section[] {
  const q = query.trim().toLowerCase();

  if (!q) {
    const sections: Section[] = [];

    const recentRows = recents
      .map((id) => items.find((item) => item.id === id))
      .filter((item): item is SpotlightItem => Boolean(item));
    if (recentRows.length > 0) sections.push({ title: "Recent", rows: recentRows });

    const popularRows = items.filter((item) => item.popular);
    if (popularRows.length > 0) sections.push({ title: "Popular", rows: popularRows });

    const groups = new Map<string, SpotlightItem[]>();
    for (const item of items) {
      const list = groups.get(item.category);
      if (list) list.push(item);
      else groups.set(item.category, [item]);
    }
    for (const [title, rows] of groups) sections.push({ title, rows });
    return sections;
  }

  const scored = items
    .map((item) => ({ item, score: scoreItem(item, q) }))
    .filter((m) => m.score >= 0)
    .sort((a, b) => b.score - a.score);

  const groups = new Map<string, SpotlightItem[]>();
  for (const { item } of scored) {
    const list = groups.get(item.category);
    if (list) list.push(item);
    else groups.set(item.category, [item]);
  }
  return Array.from(groups, ([title, rows]) => ({ title, rows }));
}

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

type IconProps = { className?: string };

function SearchIcon({ className }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m21 21-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
      />
    </svg>
  );
}

function XIcon({ className }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}

function FlameIcon({ className }: IconProps) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a.75.75 0 0 0-1.06-.183l-1.222.827a.75.75 0 0 0-.435-.892z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Small presentational pieces                                         */
/* ------------------------------------------------------------------ */

function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-md border border-border bg-muted px-1 font-sans text-[10px] font-medium text-muted-foreground">
      {children}
    </kbd>
  );
}

/** Wraps every query match in a highlighted <mark>. */
function Highlight({ text, query }: { text: string; query: string }) {
  const terms = query.trim().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return <>{text}</>;
  const pattern = new RegExp(`(${terms.map(escapeRegExp).join("|")})`, "gi");
  const nodes: ReactNode[] = [];
  let last = 0;
  let key = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(<Fragment key={key++}>{text.slice(last, match.index)}</Fragment>);
    }
    nodes.push(
      <mark key={key++} className="rounded-[3px] bg-primary-soft px-0.5 text-primary">
        {match[0]}
      </mark>
    );
    last = match.index + match[0].length;
    if (match[0].length === 0) pattern.lastIndex += 1;
  }
  if (last < text.length) {
    nodes.push(<Fragment key={key++}>{text.slice(last)}</Fragment>);
  }
  return <>{nodes}</>;
}

interface OptionRowProps {
  item: SpotlightItem;
  index: number;
  selected: boolean;
  query: string;
  onSelect: (item: SpotlightItem) => void;
  onMouseEnter: () => void;
}

function OptionRow({ item, index, selected, query, onSelect, onMouseEnter }: OptionRowProps) {
  const id = `spotlight-option-${item.id}`;
  return (
    <div
      id={id}
      role="option"
      aria-selected={selected}
      data-option-index={index}
      onMouseEnter={onMouseEnter}
      onClick={() => onSelect(item)}
      className={cn(
        "group flex w-full cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 text-left text-sm transition-colors",
        selected ? "bg-primary-soft text-foreground" : "text-foreground"
      )}
      style={{
        animation: "fade-slide 180ms cubic-bezier(0.16, 1, 0.3, 1) both",
        animationDelay: `${Math.min(index, 12) * 14}ms`,
      }}
    >
      <span
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
          item.icon ? "bg-muted text-foreground" : "bg-muted/60 text-subtle"
        )}
      >
        {item.icon ?? <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />}
      </span>

      <span className="min-w-0 flex-1">
        <span className={cn("block truncate", selected && "font-medium")}>
          <Highlight text={item.label} query={query} />
        </span>
        {item.subtitle && (
          <span className="block truncate text-xs text-subtle">
            <Highlight text={item.subtitle} query={query} />
          </span>
        )}
      </span>

      {item.popular && !query && (
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-warning-soft px-1.5 py-0.5 text-[10px] font-medium text-warning">
          <FlameIcon className="h-2.5 w-2.5" />
          Popular
        </span>
      )}

      {item.shortcut && (
        <span className="shrink-0 rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
          {item.shortcut}
        </span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

export function SpotlightSearch({
  items,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  placeholder = "Search files, apps, actions...",
  emptyMessage = "No results found",
  storageKey = "spotlight-search",
  recentLimit = 5,
  width = 560,
  maxHeight = 420,
  bindShortcut = true,
  className,
}: SpotlightSearchProps) {
  const [open, setOpen] = useState(openProp ?? defaultOpen);
  const isOpen = openProp ?? open;

  const setOpenState = useCallback(
    (next: boolean) => {
      if (openProp === undefined) setOpen(next);
      onOpenChange?.(next);
    },
    [openProp, onOpenChange]
  );

  /* Mount lifecycle — keep the dialog mounted while it animates out. */
  const [rendered, setRendered] = useState(isOpen);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (isOpen || !rendered) return;
    const previous = document.activeElement as HTMLElement | null;
    const timer = window.setTimeout(() => {
      setRendered(false);
      setClosing(false);
      previous?.focus();
    }, 160);
    return () => window.clearTimeout(timer);
  }, [isOpen, rendered]);

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [recents, setRecents] = useState<string[]>(() =>
    typeof window === "undefined" ? [] : readList(`${storageKey}:recents`) ?? []
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  /* Reset transient state whenever the search opens or starts closing. */
  const [prevOpen, setPrevOpen] = useState(isOpen);
  if (prevOpen !== isOpen) {
    setPrevOpen(isOpen);
    if (isOpen) {
      setRendered(true);
      setClosing(false);
      setQuery("");
      setSelected(0);
    } else {
      setClosing(true);
    }
  }

  const recordRecent = useCallback(
    (id: string) => {
      const next = [id, ...recents.filter((x) => x !== id)].slice(0, recentLimit);
      setRecents(next);
      if (typeof window !== "undefined") writeList(`${storageKey}:recents`, next);
    },
    [recents, recentLimit, storageKey]
  );

  const selectItem = useCallback(
    (item: SpotlightItem) => {
      recordRecent(item.id);
      item.onSelect?.();
      setOpenState(false);
    },
    [recordRecent, setOpenState]
  );

  const sections = useMemo(
    () => buildSections(items, query, recents),
    [items, query, recents]
  );
  const rows = useMemo(() => sections.flatMap((section) => section.rows), [sections]);
  const safeSelected = Math.min(selected, Math.max(0, rows.length - 1));

  const handleKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLInputElement>) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelected((i) => (rows.length > 0 ? (i + 1) % rows.length : 0));
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelected((i) => (rows.length > 0 ? (i - 1 + rows.length) % rows.length : 0));
      } else if (event.key === "Home") {
        event.preventDefault();
        setSelected(0);
      } else if (event.key === "End") {
        event.preventDefault();
        setSelected(Math.max(0, rows.length - 1));
      } else if (event.key === "Enter") {
        event.preventDefault();
        const row = rows[safeSelected];
        if (row) selectItem(row);
      } else if (event.key === "Escape") {
        event.preventDefault();
        setOpenState(false);
      }
    },
    [rows, safeSelected, selectItem, setOpenState]
  );

  /* Keep Tab inside the dialog (input ↔ clear button). */
  const handlePanelKeyDown = useCallback((event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;
    event.preventDefault();
    const focusables = Array.from(
      panelRef.current?.querySelectorAll<HTMLElement>("[data-focusable]") ?? []
    );
    if (focusables.length === 0) return;
    const current = document.activeElement as HTMLElement | null;
    const index = focusables.indexOf(current as HTMLElement);
    const next = event.shiftKey
      ? index <= 0
        ? focusables[focusables.length - 1]
        : focusables[index - 1]
      : index >= focusables.length - 1
        ? focusables[0]
        : focusables[index + 1];
    next?.focus();
  }, []);

  /* Global ⌘K / Ctrl+K shortcut. */
  useEffect(() => {
    if (!bindShortcut) return;
    const handler = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && !event.altKey && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpenState(!isOpen);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [bindShortcut, isOpen, setOpenState]);

  /* Lock body scroll while the dialog is open. */
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previous;
    };
  }, [isOpen]);

  /* Focus the input as soon as the panel is on screen. */
  useEffect(() => {
    if (isOpen && rendered && !closing) inputRef.current?.focus();
  }, [isOpen, rendered, closing]);

  /* Keep the active option visible. */
  useEffect(() => {
    if (!rendered || closing) return;
    const el = listRef.current?.querySelector(`[data-option-index="${safeSelected}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [safeSelected, rendered, closing, rows.length]);

  if (!rendered) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Spotlight search"
      className={cn(
        "fixed inset-0 z-50 flex items-end justify-center sm:items-start sm:px-4 sm:pb-8 sm:pt-[12vh]",
        className
      )}
    >
      <div
        className="fixed inset-0 bg-black/45 backdrop-blur-[2px]"
        style={{ animation: closing ? "fade-out 140ms ease both" : "fade-in 150ms ease both" }}
        onClick={() => setOpenState(false)}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        onKeyDown={handlePanelKeyDown}
        className="relative z-10 w-full overflow-hidden rounded-t-2xl border border-border bg-surface shadow-modal sm:rounded-2xl"
        style={{
          width,
          maxWidth: "100%",
          animation: closing
            ? "zoom-out 150ms ease both"
            : "pop 220ms cubic-bezier(0.34, 1.56, 0.64, 1) both",
        }}
      >
        {/* Search bar */}
        <div className="flex items-center gap-2.5 border-b border-border px-4">
          <SearchIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            data-focusable
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSelected(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            spellCheck={false}
            autoComplete="off"
            role="combobox"
            aria-expanded="true"
            aria-autocomplete="list"
            aria-controls="spotlight-listbox"
            aria-activedescendant={
              rows.length > 0 ? `spotlight-option-${rows[safeSelected].id}` : undefined
            }
            className="w-full bg-transparent py-3.5 text-sm text-foreground outline-none placeholder:text-subtle"
          />
          {query ? (
            <button
              type="button"
              data-focusable
              onClick={() => {
                setQuery("");
                setSelected(0);
                inputRef.current?.focus();
              }}
              aria-label="Clear search"
              className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <XIcon className="h-4 w-4" />
            </button>
          ) : (
            <Kbd>⌘K</Kbd>
          )}
        </div>

        {/* Results */}
        <div
          ref={listRef}
          id="spotlight-listbox"
          role="listbox"
          aria-label="Search results"
          className="scrollbar-thin overflow-y-auto p-1.5"
          style={{ maxHeight }}
        >
          {rows.length === 0 ? (
            <div className="flex flex-col items-center gap-1.5 py-12 text-center">
              <SearchIcon className="h-8 w-8 text-subtle" />
              <p className="text-sm text-muted-foreground">{emptyMessage}</p>
              <p className="text-xs text-subtle">Try a different search term</p>
            </div>
          ) : (
            (() => {
              let rowIndex = 0;
              return sections.map((section, sectionIndex) => {
                if (section.rows.length === 0) return null;
                return (
                  <div key={sectionIndex}>
                    <div className="flex items-center gap-1.5 px-2.5 pb-1 pt-2.5 text-[11px] font-semibold uppercase tracking-wider text-subtle">
                      {section.title === "Popular" && <FlameIcon className="h-3 w-3 text-warning" />}
                      {section.title}
                      <span className="text-[10px] font-normal normal-case text-muted-foreground/60">
                        {section.rows.length}
                      </span>
                    </div>
                    {section.rows.map((item) => {
                      const index = rowIndex;
                      rowIndex += 1;
                      return (
                        <OptionRow
                          key={item.id}
                          item={item}
                          index={index}
                          selected={index === safeSelected}
                          query={query}
                          onSelect={selectItem}
                          onMouseEnter={() => setSelected(index)}
                        />
                      );
                    })}
                  </div>
                );
              });
            })()
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-2 text-[11px] text-muted-foreground">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="flex items-center gap-1">
              <Kbd>↑</Kbd>
              <Kbd>↓</Kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <Kbd>↵</Kbd>
              Open
            </span>
            <span className="flex items-center gap-1">
              <Kbd>Esc</Kbd>
              Close
            </span>
          </div>
          <span className="flex items-center gap-1">
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </span>
        </div>
      </div>
    </div>
  );
}
