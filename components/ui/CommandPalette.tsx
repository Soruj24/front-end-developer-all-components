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

export interface CommandItem {
  id: string;
  label: string;
  /** Extra search terms (not shown). */
  keywords?: string[];
  icon?: ReactNode;
  shortcut?: string;
  group?: string;
  danger?: boolean;
  disabled?: boolean;
  /** Always shown near the top until unpinned. */
  pinned?: boolean;
  /** Nested commands — Enter / ArrowRight drills into them. */
  children?: CommandItem[];
  onSelect?: () => void;
}

export interface CommandPaletteProps {
  /** Commands shown at the root level. */
  items: CommandItem[];
  /** Controlled open state. */
  open?: boolean;
  /** Uncontrolled initial open state. Default false. */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
  emptyMessage?: string;
  /** Namespace for recents / favorites / pinned persistence. */
  storageKey?: string;
  recentLimit?: number;
  width?: number | string;
  maxHeight?: number | string;
  /** Bind the global ⌘K / Ctrl+K shortcut. Default true. */
  bindShortcut?: boolean;
  closeOnSelect?: boolean;
  className?: string;
}

interface Row {
  key: string;
  item: CommandItem;
  parents: CommandItem[];
  section: string;
}

interface Section {
  title: string | null;
  rows: Row[];
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
function scoreItem(item: CommandItem, query: string): number {
  const label = item.label.toLowerCase();
  const keywords = (item.keywords ?? []).join(" ").toLowerCase();
  const group = (item.group ?? "").toLowerCase();
  let score = 0;
  for (const term of query.split(/\s+/).filter(Boolean)) {
    const li = label.indexOf(term);
    const ki = keywords.indexOf(term);
    const gi = group.indexOf(term);
    if (li < 0 && ki < 0 && gi < 0) return -1;
    score += li >= 0 ? 1000 - li : ki >= 0 ? 600 - ki : 300 - gi;
  }
  return score;
}

interface FlatCommand {
  item: CommandItem;
  parents: CommandItem[];
}

/** Flattens the tree so global search can find nested commands too. */
function flattenTree(items: CommandItem[], parents: CommandItem[] = []): FlatCommand[] {
  const out: FlatCommand[] = [];
  for (const item of items) {
    out.push({ item, parents });
    if (item.children && item.children.length > 0) {
      out.push(...flattenTree(item.children, [...parents, item]));
    }
  }
  return out;
}

function makeRow(item: CommandItem, parents: CommandItem[], section: string): Row {
  return {
    key: [...parents.map((parent) => parent.id), item.id].join("/"),
    item,
    parents,
    section,
  };
}

function groupRows<T extends FlatCommand>(rows: T[], rowsToSection: (row: T) => string): Section[] {
  const groups = new Map<string, T[]>();
  for (const row of rows) {
    const title = rowsToSection(row);
    const list = groups.get(title);
    if (list) list.push(row);
    else groups.set(title, [row]);
  }
  const sections: Section[] = [];
  for (const [title, list] of groups) {
    sections.push({ title, rows: list.map((row) => makeRow(row.item, row.parents, title)) });
  }
  return sections;
}

interface BuildOptions {
  items: CommandItem[];
  stack: CommandItem[];
  query: string;
  recents: string[];
  favorites: string[];
  pinned: string[];
}

function buildSections({
  items,
  stack,
  query,
  recents,
  favorites,
  pinned,
}: BuildOptions): Section[] {
  const q = query.trim().toLowerCase();

  /* Inside a nested command list — only the current level is visible. */
  if (stack.length > 0) {
    const parent = stack[stack.length - 1];
    const children = parent.children ?? [];
    if (!q) {
      return [{ title: null, rows: children.map((item) => makeRow(item, stack, "Commands")) }];
    }
    const scored = children
      .map((item) => ({ item, score: scoreItem(item, q) }))
      .filter((m) => m.score >= 0)
      .sort((a, b) => b.score - a.score);
    return [{ title: null, rows: scored.map((m) => makeRow(m.item, stack, "Commands")) }];
  }

  /* Root level with a query — global search across the whole tree. */
  if (q) {
    const scored = flattenTree(items)
      .map((flat) => ({ ...flat, score: scoreItem(flat.item, q) }))
      .filter((m) => m.score >= 0)
      .sort((a, b) => b.score - a.score);
    const isPinned = (flat: FlatCommand) =>
      pinned.includes(flat.item.id) || favorites.includes(flat.item.id);
    const pinnedRows = scored.filter(isPinned);
    const rest = scored.filter((flat) => !isPinned(flat));
    const sections: Section[] = [];
    if (pinnedRows.length > 0) {
      sections.push({
        title: "Pinned",
        rows: pinnedRows.map((row) => makeRow(row.item, row.parents, "Pinned")),
      });
    }
    sections.push(...groupRows(rest, (row) => row.item.group ?? "Results"));
    return sections;
  }

  /* Root level, no query — favorites, pinned, recents, then groups. */
  const root = items;
  const sections: Section[] = [];

  const favoriteRows = root.filter((item) => favorites.includes(item.id));
  if (favoriteRows.length > 0) {
    sections.push({
      title: "Favorites",
      rows: favoriteRows.map((item) => makeRow(item, [], "Favorites")),
    });
  }

  const pinnedRows = root.filter(
    (item) => pinned.includes(item.id) && !favorites.includes(item.id)
  );
  if (pinnedRows.length > 0) {
    sections.push({
      title: "Pinned",
      rows: pinnedRows.map((item) => makeRow(item, [], "Pinned")),
    });
  }

  const recentRows = recents
    .map((id) => root.find((item) => item.id === id))
    .filter((item): item is CommandItem => Boolean(item));
  if (recentRows.length > 0) {
    sections.push({
      title: "Recent",
      rows: recentRows.map((item) => makeRow(item, [], "Recent")),
    });
  }

  const groups = new Map<string, CommandItem[]>();
  for (const item of root) {
    const title = item.group ?? "Commands";
    const list = groups.get(title);
    if (list) list.push(item);
    else groups.set(title, [item]);
  }
  for (const [title, groupItems] of groups) {
    sections.push({ title, rows: groupItems.map((item) => makeRow(item, [], title)) });
  }
  return sections;
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

function ArrowLeftIcon({ className }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7 7-7-7 7-7" />
    </svg>
  );
}

function ChevronRightIcon({ className }: IconProps) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
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

function StarIcon({ className, filled }: IconProps & { filled?: boolean }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.6}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 0 0 .95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 0 0-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 0 0-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 0 0-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 0 0 .951-.69l1.519-4.674z"
      />
    </svg>
  );
}

function PinIcon({ className, filled }: IconProps & { filled?: boolean }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.6}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 3v6.5a2 2 0 0 0 .59 1.42l2.37 2.37a2 2 0 0 1 .59 1.42V16a1 1 0 0 1-1 1H5.45a1 1 0 0 1-1-1v-1.29a2 2 0 0 1 .59-1.42l2.37-2.37A2 2 0 0 0 8 9.5V3m4 9v8"
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

interface PaletteRowProps {
  row: Row;
  index: number;
  selected: boolean;
  query: string;
  favorites: string[];
  pinned: string[];
  onSelect: (row: Row) => void;
  onToggleFavorite: (id: string) => void;
  onTogglePinned: (id: string) => void;
  onMouseEnter: () => void;
}

function PaletteRow({
  row,
  index,
  selected,
  query,
  favorites,
  pinned,
  onSelect,
  onToggleFavorite,
  onTogglePinned,
  onMouseEnter,
}: PaletteRowProps) {
  const { item } = row;
  const isFavorite = favorites.includes(item.id);
  const isPinned = pinned.includes(item.id);
  const hasChildren = item.children && item.children.length > 0;
  const parentTrail = row.parents.map((parent) => parent.label).join(" / ");

  return (
    <div
      role="option"
      aria-selected={selected}
      data-row-index={index}
      onMouseEnter={onMouseEnter}
      onClick={() => onSelect(row)}
      className={cn(
        "group flex w-full cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors",
        selected ? "bg-primary-soft text-foreground" : "text-foreground",
        item.disabled && "cursor-not-allowed opacity-50"
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

      <span className="min-w-0 flex-1 text-left">
        <span className={cn("block truncate", selected && "font-medium")}>
          <Highlight text={item.label} query={query} />
        </span>
        {parentTrail && <span className="block truncate text-xs text-subtle">{parentTrail}</span>}
      </span>

      {item.shortcut && (
        <span className="shrink-0 rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
          {item.shortcut}
        </span>
      )}

      {hasChildren && (
        <ChevronRightIcon
          className={cn("h-3.5 w-3.5 shrink-0 text-subtle", selected && "text-primary")}
        />
      )}

      <span className="flex shrink-0 items-center gap-0.5">
        <button
          type="button"
          aria-label={
            isFavorite ? `Remove ${item.label} from favorites` : `Add ${item.label} to favorites`
          }
          onClick={(event) => {
            event.stopPropagation();
            onToggleFavorite(item.id);
          }}
          className={cn(
            "rounded-md p-1 transition-colors",
            isFavorite
              ? "text-warning"
              : "text-subtle opacity-40 hover:text-warning hover:opacity-100"
          )}
        >
          <StarIcon className="h-3.5 w-3.5" filled={isFavorite} />
        </button>
        <button
          type="button"
          aria-label={isPinned ? `Unpin ${item.label}` : `Pin ${item.label}`}
          onClick={(event) => {
            event.stopPropagation();
            onTogglePinned(item.id);
          }}
          className={cn(
            "rounded-md p-1 transition-colors",
            isPinned ? "text-primary" : "text-subtle opacity-40 hover:text-primary hover:opacity-100"
          )}
        >
          <PinIcon className="h-3.5 w-3.5" filled={isPinned} />
        </button>
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

export function CommandPalette({
  items,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  placeholder = "Search commands or type a command...",
  emptyMessage = "No results found",
  storageKey = "command-palette",
  recentLimit = 5,
  width = 560,
  maxHeight = 460,
  bindShortcut = true,
  closeOnSelect = true,
  className,
}: CommandPaletteProps) {
  const [open, setOpen] = useState(openProp ?? defaultOpen);
  const isOpen = openProp ?? open;

  const setOpenState = useCallback(
    (next: boolean) => {
      if (openProp === undefined) setOpen(next);
      onOpenChange?.(next);
    },
    [openProp, onOpenChange]
  );

  const [query, setQuery] = useState("");
  const [stack, setStack] = useState<CommandItem[]>([]);
  const [selected, setSelected] = useState(0);
  const [recents, setRecents] = useState<string[]>(() =>
    typeof window === "undefined" ? [] : readList(`${storageKey}:recents`) ?? []
  );
  const [favorites, setFavorites] = useState<string[]>(() =>
    typeof window === "undefined" ? [] : readList(`${storageKey}:favorites`) ?? []
  );
  const [pinned, setPinned] = useState<string[]>(() => {
    const seeded = items.filter((item) => item.pinned).map((item) => item.id);
    const stored = typeof window === "undefined" ? null : readList(`${storageKey}:pinned`);
    return Array.from(new Set([...(stored ?? []), ...seeded]));
  });

  const listRef = useRef<HTMLDivElement>(null);

  /* Reset transient state whenever the palette opens. */
  const [prevOpen, setPrevOpen] = useState(isOpen);
  if (prevOpen !== isOpen) {
    setPrevOpen(isOpen);
    if (isOpen) {
      setQuery("");
      setStack([]);
      setSelected(0);
    }
  }

  const toggleFavorite = useCallback(
    (id: string) => {
      const next = favorites.includes(id) ? favorites.filter((x) => x !== id) : [...favorites, id];
      setFavorites(next);
      if (typeof window !== "undefined") writeList(`${storageKey}:favorites`, next);
    },
    [favorites, storageKey]
  );

  const togglePinned = useCallback(
    (id: string) => {
      const next = pinned.includes(id) ? pinned.filter((x) => x !== id) : [...pinned, id];
      setPinned(next);
      if (typeof window !== "undefined") writeList(`${storageKey}:pinned`, next);
    },
    [pinned, storageKey]
  );

  const recordRecent = useCallback(
    (id: string) => {
      const next = [id, ...recents.filter((x) => x !== id)].slice(0, recentLimit);
      setRecents(next);
      if (typeof window !== "undefined") writeList(`${storageKey}:recents`, next);
    },
    [recents, recentLimit, storageKey]
  );

  const openSubmenu = useCallback((item: CommandItem) => {
    setStack((prev) => [...prev, item]);
    setQuery("");
    setSelected(0);
  }, []);

  const goBack = useCallback(() => {
    setStack((prev) => prev.slice(0, -1));
    setQuery("");
    setSelected(0);
  }, []);

  const selectRow = useCallback(
    (row: Row) => {
      const { item } = row;
      if (item.disabled) return;
      if (item.children && item.children.length > 0 && !item.onSelect) {
        openSubmenu(item);
        return;
      }
      recordRecent(item.id);
      item.onSelect?.();
      if (closeOnSelect) setOpenState(false);
    },
    [closeOnSelect, openSubmenu, recordRecent, setOpenState]
  );

  const sections = useMemo(
    () => buildSections({ items, stack, query, recents, favorites, pinned }),
    [items, stack, query, recents, favorites, pinned]
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
        if (row) selectRow(row);
      } else if (event.key === "Escape") {
        event.preventDefault();
        if (stack.length > 0) goBack();
        else setOpenState(false);
      } else if (event.key === "Backspace" && !query && stack.length > 0) {
        event.preventDefault();
        goBack();
      } else if (event.key === "ArrowRight") {
        const row = rows[safeSelected];
        if (row && row.item.children && row.item.children.length > 0) {
          event.preventDefault();
          openSubmenu(row.item);
        }
      } else if (event.key === "ArrowLeft") {
        if (query) {
          event.preventDefault();
          setQuery("");
          setSelected(0);
        } else if (stack.length > 0) {
          event.preventDefault();
          goBack();
        }
      }
    },
    [rows, safeSelected, stack.length, query, selectRow, goBack, openSubmenu, setOpenState]
  );

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

  /* Lock body scroll while the palette is open. */
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previous;
    };
  }, [isOpen]);

  /* Keep the active row visible. */
  useEffect(() => {
    if (!isOpen) return;
    const el = listRef.current?.querySelector(`[data-row-index="${safeSelected}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [safeSelected, isOpen, rows.length]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      className={cn("fixed inset-0 z-50 flex items-start justify-center px-4 pb-8 pt-[14vh]", className)}
    >
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px]"
        style={{ animation: "fade-in 150ms ease both" }}
        onClick={() => setOpenState(false)}
        aria-hidden="true"
      />

      <div
        className="relative z-10 w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-popover"
        style={{
          width,
          maxWidth: "100%",
          animation: "fade-slide 200ms cubic-bezier(0.16, 1, 0.3, 1) both",
        }}
      >
        {/* Search bar */}
        <div className="flex items-center gap-2.5 border-b border-border px-4">
          {stack.length > 0 ? (
            <button
              type="button"
              onClick={goBack}
              aria-label="Go back"
              className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <ArrowLeftIcon className="h-4 w-4" />
            </button>
          ) : (
            <SearchIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
          )}
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSelected(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            autoFocus
            spellCheck={false}
            autoComplete="off"
            className="w-full bg-transparent py-3.5 text-sm text-foreground outline-none placeholder:text-subtle"
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSelected(0);
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

        {/* Breadcrumb */}
        {stack.length > 0 && (
          <div className="flex items-center gap-1.5 border-b border-border px-4 py-1.5 text-xs text-muted-foreground">
            <button
              type="button"
              onClick={() => {
                setStack([]);
                setSelected(0);
              }}
              className="rounded px-1 py-0.5 transition-colors hover:bg-muted hover:text-foreground"
            >
              Search
            </button>
            {stack.map((level, index) => (
              <Fragment key={level.id}>
                <span aria-hidden="true" className="text-subtle">
                  /
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setStack(stack.slice(0, index + 1));
                    setSelected(0);
                  }}
                  className="max-w-[160px] truncate rounded px-1 py-0.5 transition-colors hover:bg-muted hover:text-foreground"
                >
                  {level.label}
                </button>
              </Fragment>
            ))}
          </div>
        )}

        {/* Results */}
        <div
          ref={listRef}
          role="listbox"
          aria-label="Commands"
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
                    {section.title && (
                      <div className="px-2.5 pb-1 pt-2.5 text-[11px] font-semibold uppercase tracking-wider text-subtle">
                        {section.title}
                      </div>
                    )}
                    {section.rows.map((row) => {
                      const index = rowIndex;
                      rowIndex += 1;
                      return (
                        <PaletteRow
                          key={row.key}
                          row={row}
                          index={index}
                          selected={index === safeSelected}
                          query={query}
                          favorites={favorites}
                          pinned={pinned}
                          onSelect={selectRow}
                          onToggleFavorite={toggleFavorite}
                          onTogglePinned={togglePinned}
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
              Select
            </span>
            {stack.length > 0 && (
              <span className="flex items-center gap-1">
                <Kbd>⌫</Kbd>
                Back
              </span>
            )}
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
