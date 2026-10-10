import type { ComponentProp } from "../../types/props";

export const spotlightSearchProps: ComponentProp[] = [
  {
    name: "items",
    type: "SpotlightItem[]",
    required: true,
    description:
      "Searchable entries. Each item has id, label, category, plus optional subtitle, keywords, icon, popular, shortcut, and onSelect.",
  },
  {
    name: "open",
    type: "boolean",
    description: "Controlled open state. Falls back to internal state when omitted.",
  },
  {
    name: "defaultOpen",
    type: "boolean",
    default: "false",
    description: "Initial open state for uncontrolled usage.",
  },
  {
    name: "onOpenChange",
    type: "function",
    description: "Called with the next open state (shortcut toggle, Escape, backdrop click, selection).",
  },
  {
    name: "placeholder",
    type: "string",
    default: "Search files, apps, actions...",
    description: "Placeholder text for the search input.",
  },
  {
    name: "emptyMessage",
    type: "string",
    default: "No results found",
    description: "Message shown when no entry matches the query.",
  },
  {
    name: "storageKey",
    type: "string",
    default: "spotlight-search",
    description: "localStorage key prefix for persisted recent selections.",
  },
  {
    name: "recentLimit",
    type: "number",
    default: "5",
    description: "Maximum number of recent entries shown.",
  },
  {
    name: "width",
    type: "number | string",
    default: "560",
    description: "Panel width in pixels or any CSS width.",
  },
  {
    name: "maxHeight",
    type: "number | string",
    default: "420",
    description: "Max height of the results list.",
  },
  {
    name: "bindShortcut",
    type: "boolean",
    default: "true",
    description:
      "Toggles the panel with Cmd/Ctrl+K. Renders role=dialog with aria-modal, a Tab focus trap, and arrow-key navigation.",
  },
  {
    name: "className",
    type: "string",
    description: "Additional classes merged onto the overlay wrapper.",
  },
];

export const spotlightSearchSource: string = `"use client";

import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { Search as SearchIcon, X as XIcon, Flame as FlameIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export interface SpotlightItem {
  id: string;
  label: string;
  subtitle?: string;
  keywords?: string[];
  category: string;
  icon?: ReactNode;
  popular?: boolean;
  shortcut?: string;
  onSelect?: () => void;
}

export interface SpotlightSearchProps {
  items: SpotlightItem[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
  emptyMessage?: string;
  storageKey?: string;
  recentLimit?: number;
  width?: number | string;
  maxHeight?: number | string;
  bindShortcut?: boolean;
  className?: string;
}

interface Section {
  title: string;
  rows: SpotlightItem[];
}

function readList(key: string): string[] | null {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const value: unknown = JSON.parse(raw);
    return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : null;
  } catch { return null; }
}

function writeList(key: string, value: string[]) {
  try { window.localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable */ }
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^\${}()|[\\]\\\\]/g, "\\\\$&");
}

function scoreItem(item: SpotlightItem, query: string): number {
  const label = item.label.toLowerCase();
  const keywords = (item.keywords ?? []).join(" ").toLowerCase();
  const category = item.category.toLowerCase();
  const subtitle = (item.subtitle ?? "").toLowerCase();
  let score = 0;
  for (const term of query.split(/\\s+/).filter(Boolean)) {
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
    const recentRows = recents.map((id) => items.find((item) => item.id === id)).filter((item): item is SpotlightItem => Boolean(item));
    if (recentRows.length > 0) sections.push({ title: "Recent", rows: recentRows });
    const popularRows = items.filter((item) => item.popular);
    if (popularRows.length > 0) sections.push({ title: "Popular", rows: popularRows });
    const groups = new Map<string, SpotlightItem[]>();
    for (const item of items) { const list = groups.get(item.category); if (list) list.push(item); else groups.set(item.category, [item]); }
    for (const [title, rows] of groups) sections.push({ title, rows });
    return sections;
  }
  const scored = items.map((item) => ({ item, score: scoreItem(item, q) })).filter((m) => m.score >= 0).sort((a, b) => b.score - a.score);
  const groups = new Map<string, SpotlightItem[]>();
  for (const { item } of scored) { const list = groups.get(item.category); if (list) list.push(item); else groups.set(item.category, [item]); }
  return Array.from(groups, ([title, rows]) => ({ title, rows }));
}

function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded-md border border-border/60 bg-muted/70 px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
      {children}
    </kbd>
  );
}

function Highlight({ text, query }: { text: string; query: string }) {
  const terms = query.trim().split(/\\s+/).filter(Boolean);
  if (terms.length === 0) return <>{text}</>;
  const pattern = new RegExp(\`(\${terms.map(escapeRegExp).join("|")})\`, "gi");
  const nodes: ReactNode[] = [];
  let last = 0;
  let key = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(<Fragment key={key++}>{text.slice(last, match.index)}</Fragment>);
    nodes.push(
      <mark
        key={key++}
        className="rounded-[3px] bg-primary/15 px-0.5 text-primary font-medium"
      >
        {match[0]}
      </mark>,
    );
    last = match.index + match[0].length;
    if (match[0].length === 0) pattern.lastIndex += 1;
  }
  if (last < text.length) nodes.push(<Fragment key={key++}>{text.slice(last)}</Fragment>);
  return <>{nodes}</>;
}

function OptionRow({
  item,
  index,
  selected,
  query,
  onSelect,
  onMouseEnter,
}: {
  item: SpotlightItem;
  index: number;
  selected: boolean;
  query: string;
  onSelect: (item: SpotlightItem) => void;
  onMouseEnter: () => void;
}) {
  return (
    <div
      id={\`spotlight-option-\${item.id}\`}
      role="option"
      aria-selected={selected}
      data-option-index={index}
      onMouseEnter={onMouseEnter}
      onClick={() => onSelect(item)}
      className={cn(
        "group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-all duration-100",
        selected
          ? "bg-primary/10 text-foreground shadow-sm shadow-primary/5"
          : "text-foreground hover:bg-muted/60",
      )}
      style={{
        animation: "fade-slide 180ms cubic-bezier(0.16, 1, 0.3, 1) both",
        animationDelay: \`\${Math.min(index, 12) * 14}ms\`,
      }}
    >
      <span
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-100",
          item.icon
            ? "bg-muted text-foreground group-hover:bg-muted/80"
            : "bg-muted/50 text-muted-foreground",
          selected && "bg-primary/15 text-primary",
        )}
      >
        {item.icon ?? (
          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-50" />
        )}
      </span>

      <span className="min-w-0 flex-1">
        <span
          className={cn(
            "block truncate text-sm",
            selected && "font-medium",
          )}
        >
          <Highlight text={item.label} query={query} />
        </span>
        {item.subtitle && (
          <span className="block truncate text-xs text-muted-foreground">
            <Highlight text={item.subtitle} query={query} />
          </span>
        )}
      </span>

      {item.popular && !query && (
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
          <FlameIcon className="h-2.5 w-2.5" />
          Popular
        </span>
      )}

      {item.shortcut && (
        <span className="shrink-0 rounded-lg border border-border/60 bg-muted/70 px-2 py-0.5 font-mono text-[10px] font-medium text-muted-foreground">
          {item.shortcut}
        </span>
      )}
    </div>
  );
}

function SpotlightSearchBar({
  query,
  setQuery,
  setSelected,
  inputRef,
  placeholder,
  handleKeyDown,
}: {
  query: string;
  setQuery: (q: string) => void;
  setSelected: (n: number) => void;
  inputRef: RefObject<HTMLInputElement | null>;
  placeholder: string;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-border/60 px-4">
      <SearchIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
      <input
        ref={inputRef}
        data-focusable
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
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
        className="w-full bg-transparent py-4 text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
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
          className="shrink-0 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <XIcon className="h-3.5 w-3.5" />
        </button>
      ) : (
        <Kbd>⌘K</Kbd>
      )}
    </div>
  );
}

function SpotlightResults({
  listRef,
  sections,
  rows,
  safeSelected,
  query,
  emptyMessage,
  maxHeight,
  selectItem,
  setSelected,
}: {
  listRef: RefObject<HTMLDivElement | null>;
  sections: Section[];
  rows: SpotlightItem[];
  safeSelected: number;
  query: string;
  emptyMessage: string;
  maxHeight: number | string;
  selectItem: (item: SpotlightItem) => void;
  setSelected: (n: number) => void;
}) {
  return (
    <div
      ref={listRef}
      id="spotlight-listbox"
      role="listbox"
      aria-label="Search results"
      className="overflow-y-auto p-2 scrollbar-thin"
      style={{ maxHeight }}
    >
      {rows.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-14 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/60">
            <SearchIcon className="h-5 w-5 text-muted-foreground/50" />
          </div>
          <p className="text-sm font-medium text-foreground">{emptyMessage}</p>
          <p className="text-xs text-muted-foreground">
            Try a different search term
          </p>
        </div>
      ) : (() => {
        let rowIndex = 0;
        return sections.map((section, si) => {
          if (section.rows.length === 0) return null;
          return (
            <div key={si}>
              <div className="flex items-center gap-1.5 px-3 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                {section.title}
                <span className="text-[10px] font-normal normal-case text-muted-foreground/40">
                  {section.rows.length}
                </span>
              </div>
              {section.rows.map((item) => {
                const idx = rowIndex++;
                return (
                  <OptionRow
                    key={item.id}
                    item={item}
                    index={idx}
                    selected={idx === safeSelected}
                    query={query}
                    onSelect={selectItem}
                    onMouseEnter={() => setSelected(idx)}
                  />
                );
              })}
            </div>
          );
        });
      })()}
    </div>
  );
}

function SpotlightFooter() {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-border/60 px-4 py-2.5 text-[11px] text-muted-foreground/70">
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
  );
}

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
    [openProp, onOpenChange],
  );

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
    typeof window === "undefined"
      ? []
      : readList(\`\${storageKey}:recents\`) ?? [],
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

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
      const next = [id, ...recents.filter((x) => x !== id)].slice(
        0,
        recentLimit,
      );
      setRecents(next);
      if (typeof window !== "undefined")
        writeList(\`\${storageKey}:recents\`, next);
    },
    [recents, recentLimit, storageKey],
  );

  const selectItem = useCallback(
    (item: SpotlightItem) => {
      recordRecent(item.id);
      item.onSelect?.();
      setOpenState(false);
    },
    [recordRecent, setOpenState],
  );

  const sections = useMemo(
    () => buildSections(items, query, recents),
    [items, query, recents],
  );
  const rows = useMemo(() => sections.flatMap((s) => s.rows), [sections]);
  const safeSelected = Math.min(selected, Math.max(0, rows.length - 1));

  const handleKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLInputElement>) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelected((i) => (rows.length > 0 ? (i + 1) % rows.length : 0));
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelected((i) =>
          rows.length > 0 ? (i - 1 + rows.length) % rows.length : 0,
        );
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
    [rows, safeSelected, selectItem, setOpenState],
  );

  const handlePanelKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      if (event.key !== "Tab") return;
      event.preventDefault();
      const focusables = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>("[data-focusable]") ??
          [],
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
    },
    [],
  );

  useEffect(() => {
    if (!bindShortcut) return;
    const handler = (e: globalThis.KeyboardEvent) => {
      if (
        (e.metaKey || e.ctrlKey) &&
        !e.altKey &&
        e.key.toLowerCase() === "k"
      ) {
        e.preventDefault();
        setOpenState(!isOpen);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [bindShortcut, isOpen, setOpenState]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && rendered && !closing) inputRef.current?.focus();
  }, [isOpen, rendered, closing]);

  useEffect(() => {
    if (!rendered || closing) return;
    const el = listRef.current?.querySelector(
      \`[data-option-index="\${safeSelected}"]\`,
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [safeSelected, rendered, closing, rows.length]);

  if (!rendered) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Spotlight search"
      className={cn(
        "fixed inset-0 z-50 flex items-end justify-center sm:items-start sm:px-4 sm:pb-8 sm:pt-[12vh]",
        className,
      )}
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        style={{
          animation: closing
            ? "fade-out 140ms ease both"
            : "fade-in 150ms ease both",
        }}
        onClick={() => setOpenState(false)}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        onKeyDown={handlePanelKeyDown}
        className={cn(
          "relative z-10 w-full overflow-hidden rounded-2xl border border-border/60 bg-background shadow-2xl shadow-black/10",
          "sm:rounded-2xl",
          "max-sm:rounded-b-none max-sm:rounded-t-2xl",
        )}
        style={{
          width,
          maxWidth: "100%",
          animation: closing
            ? "zoom-out 150ms ease both"
            : "pop 220ms cubic-bezier(0.34, 1.56, 0.64, 1) both",
        }}
      >
        <SpotlightSearchBar
          query={query}
          setQuery={setQuery}
          setSelected={setSelected}
          inputRef={inputRef}
          placeholder={placeholder}
          handleKeyDown={handleKeyDown}
        />
        <SpotlightResults
          listRef={listRef}
          sections={sections}
          rows={rows}
          safeSelected={safeSelected}
          query={query}
          emptyMessage={emptyMessage}
          maxHeight={maxHeight}
          selectItem={selectItem}
          setSelected={setSelected}
        />
        <SpotlightFooter />
      </div>
    </div>,
    document.body,
  );
}

// cn() is imported from @/lib/cn (clsx + tailwind-merge). Icons from lucide-react.
`;
