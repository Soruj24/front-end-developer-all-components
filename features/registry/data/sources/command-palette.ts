import type { ComponentProp } from "../../types/props";

export const commandPaletteProps: ComponentProp[] = [
  {
    name: "items",
    type: "CommandItem[]",
    required: true,
    description:
      "Commands. Each item has id, label, plus optional keywords, icon, shortcut, group, danger, disabled, pinned, children (submenu), and onSelect.",
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
    default: "Search commands or type a command...",
    description: "Placeholder text for the search input.",
  },
  {
    name: "emptyMessage",
    type: "string",
    default: "No results found",
    description: "Message shown when no command matches the query.",
  },
  {
    name: "storageKey",
    type: "string",
    default: "command-palette",
    description: "localStorage key prefix for persisted recents, favorites, and pins.",
  },
  {
    name: "recentLimit",
    type: "number",
    default: "5",
    description: "Maximum number of recent commands shown.",
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
    default: "460",
    description: "Max height of the results list.",
  },
  {
    name: "bindShortcut",
    type: "boolean",
    default: "true",
    description: "Toggles the palette with Cmd/Ctrl+K. Has role=dialog with aria-modal and full arrow-key navigation.",
  },
  {
    name: "closeOnSelect",
    type: "boolean",
    default: "true",
    description: "Closes the palette after a command is selected.",
  },
  {
    name: "className",
    type: "string",
    description: "Additional classes merged onto the overlay wrapper.",
  },
];

export const commandPaletteSource: string = `"use client";

import { Fragment, useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode, type RefObject } from "react";
import { Search as SearchIcon, ArrowLeft as ArrowLeftIcon, ChevronRight as ChevronRightIcon, X as XIcon, Star as StarBaseIcon, Pin as PinBaseIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export interface CommandItem {
  id: string;
  label: string;
  keywords?: string[];
  icon?: ReactNode;
  shortcut?: string;
  group?: string;
  danger?: boolean;
  disabled?: boolean;
  pinned?: boolean;
  children?: CommandItem[];
  onSelect?: () => void;
}

export interface CommandPaletteProps {
  items: CommandItem[];
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

interface FlatCommand {
  item: CommandItem;
  parents: CommandItem[];
}

function readList(key: string): string[] | null {
  try { const raw = window.localStorage.getItem(key); if (!raw) return null; const value: unknown = JSON.parse(raw); return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : null; } catch { return null; }
}

function writeList(key: string, value: string[]) { try { window.localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore */ } }

function escapeRegExp(text: string): string { return text.replace(/[.*+?^\${}()|[\\]\\\\]/g, "\\\\$&"); }

function scoreItem(item: CommandItem, query: string): number {
  const label = item.label.toLowerCase();
  const keywords = (item.keywords ?? []).join(" ").toLowerCase();
  const group = (item.group ?? "").toLowerCase();
  let score = 0;
  for (const term of query.split(/\\s+/).filter(Boolean)) { const li = label.indexOf(term); const ki = keywords.indexOf(term); const gi = group.indexOf(term); if (li < 0 && ki < 0 && gi < 0) return -1; score += li >= 0 ? 1000 - li : ki >= 0 ? 600 - ki : 300 - gi; }
  return score;
}

function flattenTree(items: CommandItem[], parents: CommandItem[] = []): FlatCommand[] {
  const out: FlatCommand[] = [];
  for (const item of items) { out.push({ item, parents }); if (item.children && item.children.length > 0) out.push(...flattenTree(item.children, [...parents, item])); }
  return out;
}

function makeRow(item: CommandItem, parents: CommandItem[], section: string): Row {
  return { key: [...parents.map((p) => p.id), item.id].join("/"), item, parents, section };
}

function groupRows(rows: FlatCommand[], rowsToSection: (row: FlatCommand) => string): Section[] {
  const groups = new Map<string, FlatCommand[]>();
  for (const row of rows) { const title = rowsToSection(row); const list = groups.get(title); if (list) list.push(row); else groups.set(title, [row]); }
  const sections: Section[] = [];
  for (const [title, list] of groups) sections.push({ title, rows: list.map((row) => makeRow(row.item, row.parents, title)) });
  return sections;
}

function buildSections({ items, stack, query, recents, favorites, pinned }: { items: CommandItem[]; stack: CommandItem[]; query: string; recents: string[]; favorites: string[]; pinned: string[] }): Section[] {
  const q = query.trim().toLowerCase();
  if (stack.length > 0) {
    const parent = stack[stack.length - 1]; const children = parent.children ?? [];
    if (!q) return [{ title: null, rows: children.map((item) => makeRow(item, stack, "Commands")) }];
    const scored = children.map((item) => ({ item, score: scoreItem(item, q) })).filter((m) => m.score >= 0).sort((a, b) => b.score - a.score);
    return [{ title: null, rows: scored.map((m) => makeRow(m.item, stack, "Commands")) }];
  }
  if (q) {
    const scored = flattenTree(items).map((flat) => ({ ...flat, score: scoreItem(flat.item, q) })).filter((m) => m.score >= 0).sort((a, b) => b.score - a.score);
    const isPinned = (flat: FlatCommand) => pinned.includes(flat.item.id) || favorites.includes(flat.item.id);
    const pinnedRows = scored.filter(isPinned); const rest = scored.filter((flat) => !isPinned(flat));
    const sections: Section[] = [];
    if (pinnedRows.length > 0) sections.push({ title: "Pinned", rows: pinnedRows.map((row) => makeRow(row.item, row.parents, "Pinned")) });
    sections.push(...groupRows(rest, (row) => row.item.group ?? "Results"));
    return sections;
  }
  const sections: Section[] = [];
  const favoriteRows = items.filter((item) => favorites.includes(item.id));
  if (favoriteRows.length > 0) sections.push({ title: "Favorites", rows: favoriteRows.map((item) => makeRow(item, [], "Favorites")) });
  const pinnedRows = items.filter((item) => pinned.includes(item.id) && !favorites.includes(item.id));
  if (pinnedRows.length > 0) sections.push({ title: "Pinned", rows: pinnedRows.map((item) => makeRow(item, [], "Pinned")) });
  const recentRows = recents.map((id) => items.find((item) => item.id === id)).filter((item): item is CommandItem => Boolean(item));
  if (recentRows.length > 0) sections.push({ title: "Recent", rows: recentRows.map((item) => makeRow(item, [], "Recent")) });
  const groups = new Map<string, CommandItem[]>();
  for (const item of items) { const title = item.group ?? "Commands"; const list = groups.get(title); if (list) list.push(item); else groups.set(title, [item]); }
  for (const [title, groupItems] of groups) sections.push({ title, rows: groupItems.map((item) => makeRow(item, [], title)) });
  return sections;
}

function StarIcon({ filled, className }: { filled?: boolean; className?: string }) {
  return <StarBaseIcon className={className} fill={filled ? "currentColor" : "none"} />;
}

function PinIcon({ filled, className }: { filled?: boolean; className?: string }) {
  return <PinBaseIcon className={className} fill={filled ? "currentColor" : "none"} />;
}

function Kbd({ children }: { children: ReactNode }) {
  return <kbd className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-md border border-border bg-muted px-1 font-sans text-[10px] font-medium text-muted-foreground">{children}</kbd>;
}

function Highlight({ text, query }: { text: string; query: string }) {
  const terms = query.trim().split(/\\s+/).filter(Boolean);
  if (terms.length === 0) return <>{text}</>;
  const pattern = new RegExp(\`(\${terms.map(escapeRegExp).join("|")})\`, "gi");
  const nodes: ReactNode[] = [];
  let last = 0; let key = 0; let match: RegExpExecArray | null;
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(<Fragment key={key++}>{text.slice(last, match.index)}</Fragment>);
    nodes.push(<mark key={key++} className="rounded-[3px] bg-primary/10 px-0.5 text-primary">{match[0]}</mark>);
    last = match.index + match[0].length;
    if (match[0].length === 0) pattern.lastIndex += 1;
  }
  if (last < text.length) nodes.push(<Fragment key={key++}>{text.slice(last)}</Fragment>);
  return <>{nodes}</>;
}

function PaletteRow({ row, index, selected, query, favorites, pinned, onSelect, onToggleFavorite, onTogglePinned, onMouseEnter }: {
  row: Row; index: number; selected: boolean; query: string; favorites: string[]; pinned: string[];
  onSelect: (row: Row) => void; onToggleFavorite: (id: string) => void; onTogglePinned: (id: string) => void; onMouseEnter: () => void;
}) {
  const { item } = row;
  const isFavorite = favorites.includes(item.id); const isPinned = pinned.includes(item.id);
  const hasChildren = item.children && item.children.length > 0;
  const parentTrail = row.parents.map((p) => p.label).join(" / ");
  return (
    <div role="option" aria-selected={selected} data-row-index={index} onMouseEnter={onMouseEnter} onClick={() => onSelect(row)}
      className={cn("group flex w-full cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 text-sm transition-colors", selected ? "bg-primary/10 text-foreground" : "text-foreground", item.disabled && "cursor-not-allowed opacity-50")}
      style={{ animation: "fade-slide 180ms cubic-bezier(0.16, 1, 0.3, 1) both", animationDelay: \`\${Math.min(index, 12) * 14}ms\` }}>
      <span className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", item.icon ? "bg-muted text-foreground" : "bg-muted/60 text-muted-foreground")}>
        {item.icon ?? <span className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />}
      </span>
      <span className="min-w-0 flex-1 text-left">
        <span className={cn("block truncate", selected && "font-medium")}><Highlight text={item.label} query={query} /></span>
        {parentTrail && <span className="block truncate text-xs text-muted-foreground">{parentTrail}</span>}
      </span>
      {item.shortcut && <span className="shrink-0 rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">{item.shortcut}</span>}
      {hasChildren && <ChevronRightIcon className={cn("h-3.5 w-3.5 shrink-0 text-muted-foreground", selected && "text-primary")} />}
      <span className="flex shrink-0 items-center gap-0.5">
        <button type="button" aria-label={isFavorite ? \`Remove \${item.label} from favorites\` : \`Add \${item.label} to favorites\`}
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(item.id); }}
          className={cn("rounded-md p-1 transition-colors", isFavorite ? "text-warning" : "text-muted-foreground opacity-40 hover:text-warning hover:opacity-100")}>
          <StarIcon className="h-3.5 w-3.5" filled={isFavorite} />
        </button>
        <button type="button" aria-label={isPinned ? \`Unpin \${item.label}\` : \`Pin \${item.label}\`}
          onClick={(e) => { e.stopPropagation(); onTogglePinned(item.id); }}
          className={cn("rounded-md p-1 transition-colors", isPinned ? "text-primary" : "text-muted-foreground opacity-40 hover:text-primary hover:opacity-100")}>
          <PinIcon className="h-3.5 w-3.5" filled={isPinned} />
        </button>
      </span>
    </div>
  );
}

function PaletteSearchBar({ query, setQuery, setSelected, stack, placeholder, handleKeyDown, goBack }: {
  query: string; setQuery: (q: string) => void; setSelected: (n: number) => void; stack: CommandItem[];
  placeholder: string; handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void; goBack: () => void;
}) {
  return (
    <div className="flex items-center gap-2.5 border-b border-border px-4">
      {stack.length > 0 ? (
        <button type="button" onClick={goBack} aria-label="Go back" className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"><ArrowLeftIcon className="h-4 w-4" /></button>
      ) : <SearchIcon className="h-4 w-4 shrink-0 text-muted-foreground" />}
      <input value={query} onChange={(e) => { setQuery(e.target.value); setSelected(0); }} onKeyDown={handleKeyDown} placeholder={placeholder}
        autoFocus spellCheck={false} autoComplete="off" className="w-full bg-transparent py-3.5 text-sm text-foreground outline-none placeholder:text-muted-foreground" />
      {query ? (
        <button type="button" onClick={() => { setQuery(""); setSelected(0); }} aria-label="Clear search" className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"><XIcon className="h-4 w-4" /></button>
      ) : <Kbd>⌘K</Kbd>}
    </div>
  );
}

function PaletteBreadcrumb({ stack, setStack, setSelected }: {
  stack: CommandItem[]; setStack: (s: CommandItem[]) => void; setSelected: (n: number) => void;
}) {
  return (
    <div className="flex items-center gap-1.5 border-b border-border px-4 py-1.5 text-xs text-muted-foreground">
      <button type="button" onClick={() => { setStack([]); setSelected(0); }} className="rounded px-1 py-0.5 transition-colors hover:bg-muted hover:text-foreground">Search</button>
      {stack.map((level, index) => (
        <Fragment key={level.id}>
          <span aria-hidden="true" className="text-muted-foreground">/</span>
          <button type="button" onClick={() => { setStack(stack.slice(0, index + 1)); setSelected(0); }}
            className="max-w-[160px] truncate rounded px-1 py-0.5 transition-colors hover:bg-muted hover:text-foreground">{level.label}</button>
        </Fragment>
      ))}
    </div>
  );
}

function PaletteResults({ listRef, sections, safeSelected, query, favorites, pinned, emptyMessage, maxHeight, selectRow, toggleFavorite, togglePinned, setSelected }: {
  listRef: RefObject<HTMLDivElement | null>; sections: Section[]; safeSelected: number; query: string;
  favorites: string[]; pinned: string[]; emptyMessage: string; maxHeight: number | string;
  selectRow: (row: Row) => void; toggleFavorite: (id: string) => void;
  togglePinned: (id: string) => void; setSelected: (n: number) => void;
}) {
  return (
    <div ref={listRef} role="listbox" aria-label="Commands" className="scrollbar-thin overflow-y-auto p-1.5" style={{ maxHeight }}>
      {sections.flatMap((s) => s.rows).length === 0 ? (
        <div className="flex flex-col items-center gap-1.5 py-12 text-center">
          <SearchIcon className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">{emptyMessage}</p>
          <p className="text-xs text-muted-foreground">Try a different search term</p>
        </div>
      ) : (() => {
        let rowIndex = 0;
        return sections.map((section, si) => {
          if (section.rows.length === 0) return null;
          return (
            <div key={si}>
              {section.title && <div className="px-2.5 pb-1 pt-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{section.title}</div>}
              {section.rows.map((row) => { const idx = rowIndex++; return <PaletteRow key={row.key} row={row} index={idx} selected={idx === safeSelected} query={query} favorites={favorites} pinned={pinned} onSelect={selectRow} onToggleFavorite={toggleFavorite} onTogglePinned={togglePinned} onMouseEnter={() => setSelected(idx)} />; })}
            </div>
          );
        });
      })()}
    </div>
  );
}

function PaletteFooter({ stackLength }: { stackLength: number }) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-2 text-[11px] text-muted-foreground">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="flex items-center gap-1"><Kbd>↑</Kbd><Kbd>↓</Kbd>Navigate</span>
        <span className="flex items-center gap-1"><Kbd>↵</Kbd>Select</span>
        {stackLength > 0 && <span className="flex items-center gap-1"><Kbd>⌫</Kbd>Back</span>}
        <span className="flex items-center gap-1"><Kbd>Esc</Kbd>Close</span>
      </div>
      <span className="flex items-center gap-1"><Kbd>⌘</Kbd><Kbd>K</Kbd></span>
    </div>
  );
}

export function CommandPalette({ items, open: openProp, defaultOpen = false, onOpenChange, placeholder = "Search commands or type a command...", emptyMessage = "No results found", storageKey = "command-palette", recentLimit = 5, width = 560, maxHeight = 460, bindShortcut = true, closeOnSelect = true, className }: CommandPaletteProps) {
  const [open, setOpen] = useState(openProp ?? defaultOpen);
  const isOpen = openProp ?? open;
  const setOpenState = useCallback((next: boolean) => { if (openProp === undefined) setOpen(next); onOpenChange?.(next); }, [openProp, onOpenChange]);

  const [query, setQuery] = useState("");
  const [stack, setStack] = useState<CommandItem[]>([]);
  const [selected, setSelected] = useState(0);
  const [recents, setRecents] = useState<string[]>(() => typeof window === "undefined" ? [] : readList(\`\${storageKey}:recents\`) ?? []);
  const [favorites, setFavorites] = useState<string[]>(() => typeof window === "undefined" ? [] : readList(\`\${storageKey}:favorites\`) ?? []);
  const [pinned, setPinned] = useState<string[]>(() => { const seeded = items.filter((i) => i.pinned).map((i) => i.id); const stored = typeof window === "undefined" ? null : readList(\`\${storageKey}:pinned\`); return Array.from(new Set([...(stored ?? []), ...seeded])); });
  const listRef = useRef<HTMLDivElement>(null);

  const [prevOpen, setPrevOpen] = useState(isOpen);
  if (prevOpen !== isOpen) { setPrevOpen(isOpen); if (isOpen) { setQuery(""); setStack([]); setSelected(0); } }

  const toggleFavorite = useCallback((id: string) => { const next = favorites.includes(id) ? favorites.filter((x) => x !== id) : [...favorites, id]; setFavorites(next); if (typeof window !== "undefined") writeList(\`\${storageKey}:favorites\`, next); }, [favorites, storageKey]);
  const togglePinned = useCallback((id: string) => { const next = pinned.includes(id) ? pinned.filter((x) => x !== id) : [...pinned, id]; setPinned(next); if (typeof window !== "undefined") writeList(\`\${storageKey}:pinned\`, next); }, [pinned, storageKey]);
  const recordRecent = useCallback((id: string) => { const next = [id, ...recents.filter((x) => x !== id)].slice(0, recentLimit); setRecents(next); if (typeof window !== "undefined") writeList(\`\${storageKey}:recents\`, next); }, [recents, recentLimit, storageKey]);
  const openSubmenu = useCallback((item: CommandItem) => { setStack((prev) => [...prev, item]); setQuery(""); setSelected(0); }, []);
  const goBack = useCallback(() => { setStack((prev) => prev.slice(0, -1)); setQuery(""); setSelected(0); }, []);

  const selectRow = useCallback((row: Row) => {
    const { item } = row;
    if (item.disabled) return;
    if (item.children && item.children.length > 0 && !item.onSelect) { openSubmenu(item); return; }
    recordRecent(item.id); item.onSelect?.(); if (closeOnSelect) setOpenState(false);
  }, [closeOnSelect, openSubmenu, recordRecent, setOpenState]);

  const sections = useMemo(() => buildSections({ items, stack, query, recents, favorites, pinned }), [items, stack, query, recents, favorites, pinned]);
  const rows = useMemo(() => sections.flatMap((s) => s.rows), [sections]);
  const safeSelected = Math.min(selected, Math.max(0, rows.length - 1));

  const handleKeyDown = useCallback((event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") { event.preventDefault(); setSelected((i) => rows.length > 0 ? (i + 1) % rows.length : 0); }
    else if (event.key === "ArrowUp") { event.preventDefault(); setSelected((i) => rows.length > 0 ? (i - 1 + rows.length) % rows.length : 0); }
    else if (event.key === "Home") { event.preventDefault(); setSelected(0); }
    else if (event.key === "End") { event.preventDefault(); setSelected(Math.max(0, rows.length - 1)); }
    else if (event.key === "Enter") { event.preventDefault(); const row = rows[safeSelected]; if (row) selectRow(row); }
    else if (event.key === "Escape") { event.preventDefault(); if (stack.length > 0) goBack(); else setOpenState(false); }
    else if (event.key === "Backspace" && !query && stack.length > 0) { event.preventDefault(); goBack(); }
    else if (event.key === "ArrowRight") { const row = rows[safeSelected]; if (row && row.item.children && row.item.children.length > 0) { event.preventDefault(); openSubmenu(row.item); } }
    else if (event.key === "ArrowLeft") { if (query) { event.preventDefault(); setQuery(""); setSelected(0); } else if (stack.length > 0) { event.preventDefault(); goBack(); } }
  }, [rows, safeSelected, stack.length, query, selectRow, goBack, openSubmenu, setOpenState]);

  useEffect(() => { if (!bindShortcut) return; const handler = (e: globalThis.KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && !e.altKey && e.key.toLowerCase() === "k") { e.preventDefault(); setOpenState(!isOpen); } }; document.addEventListener("keydown", handler); return () => document.removeEventListener("keydown", handler); }, [bindShortcut, isOpen, setOpenState]);
  useEffect(() => { if (!isOpen) return; const prev = document.documentElement.style.overflow; document.documentElement.style.overflow = "hidden"; return () => { document.documentElement.style.overflow = prev; }; }, [isOpen]);
  useEffect(() => { if (!isOpen) return; const el = listRef.current?.querySelector(\`[data-row-index="\${safeSelected}"]\`); el?.scrollIntoView({ block: "nearest" }); }, [safeSelected, isOpen, rows.length]);

  if (!isOpen) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label="Command palette" className={cn("fixed inset-0 z-50 flex items-start justify-center px-4 pb-8 pt-[14vh]", className)}>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px]" style={{ animation: "fade-in 150ms ease both" }} onClick={() => setOpenState(false)} aria-hidden="true" />
      <div className="relative z-10 w-full overflow-hidden rounded-2xl border border-border/60 bg-card shadow-popover ring-1 ring-black/[0.04] dark:ring-white/[0.08]" style={{ width, maxWidth: "100%", animation: "fade-slide 200ms cubic-bezier(0.16, 1, 0.3, 1) both" }}>
        <PaletteSearchBar query={query} setQuery={setQuery} setSelected={setSelected} stack={stack} placeholder={placeholder} handleKeyDown={handleKeyDown} goBack={goBack} />
        {stack.length > 0 && <PaletteBreadcrumb stack={stack} setStack={setStack} setSelected={setSelected} />}
        <PaletteResults listRef={listRef} sections={sections} safeSelected={safeSelected} query={query} favorites={favorites} pinned={pinned} emptyMessage={emptyMessage} maxHeight={maxHeight} selectRow={selectRow} toggleFavorite={toggleFavorite} togglePinned={togglePinned} setSelected={setSelected} />
        <PaletteFooter stackLength={stack.length} />
      </div>
    </div>
  );
}

// cn() is imported from @/lib/cn (clsx + tailwind-merge). Icons from lucide-react.
`;
