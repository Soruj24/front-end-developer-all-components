"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { cn } from "@/lib/cn";
import type { CommandItem, CommandPaletteProps, Row } from "./CommandPalette.types";
import { readList, writeList, buildSections } from "./CommandPalette.utils";
import { PaletteSearchBar, PaletteBreadcrumb, PaletteResults, PaletteFooter } from "./CommandPalettePieces2";

export function CommandPalette({ items, open: openProp, defaultOpen = false, onOpenChange, placeholder = "Search commands or type a command...", emptyMessage = "No results found", storageKey = "command-palette", recentLimit = 5, width = 560, maxHeight = 460, bindShortcut = true, closeOnSelect = true, className }: CommandPaletteProps) {
  const [open, setOpen] = useState(openProp ?? defaultOpen);
  const isOpen = openProp ?? open;
  const setOpenState = useCallback((next: boolean) => { if (openProp === undefined) setOpen(next); onOpenChange?.(next); }, [openProp, onOpenChange]);

  const [query, setQuery] = useState("");
  const [stack, setStack] = useState<CommandItem[]>([]);
  const [selected, setSelected] = useState(0);
  const [recents, setRecents] = useState<string[]>(() => typeof window === "undefined" ? [] : readList(`${storageKey}:recents`) ?? []);
  const [favorites, setFavorites] = useState<string[]>(() => typeof window === "undefined" ? [] : readList(`${storageKey}:favorites`) ?? []);
  const [pinned, setPinned] = useState<string[]>(() => { const seeded = items.filter((i) => i.pinned).map((i) => i.id); const stored = typeof window === "undefined" ? null : readList(`${storageKey}:pinned`); return Array.from(new Set([...(stored ?? []), ...seeded])); });
  const listRef = useRef<HTMLDivElement>(null);

  const [prevOpen, setPrevOpen] = useState(isOpen);
  if (prevOpen !== isOpen) { setPrevOpen(isOpen); if (isOpen) { setQuery(""); setStack([]); setSelected(0); } }

  const toggleFavorite = useCallback((id: string) => { const next = favorites.includes(id) ? favorites.filter((x) => x !== id) : [...favorites, id]; setFavorites(next); if (typeof window !== "undefined") writeList(`${storageKey}:favorites`, next); }, [favorites, storageKey]);
  const togglePinned = useCallback((id: string) => { const next = pinned.includes(id) ? pinned.filter((x) => x !== id) : [...pinned, id]; setPinned(next); if (typeof window !== "undefined") writeList(`${storageKey}:pinned`, next); }, [pinned, storageKey]);
  const recordRecent = useCallback((id: string) => { const next = [id, ...recents.filter((x) => x !== id)].slice(0, recentLimit); setRecents(next); if (typeof window !== "undefined") writeList(`${storageKey}:recents`, next); }, [recents, recentLimit, storageKey]);
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
  useEffect(() => { if (!isOpen) return; const el = listRef.current?.querySelector(`[data-row-index="${safeSelected}"]`); el?.scrollIntoView({ block: "nearest" }); }, [safeSelected, isOpen, rows.length]);

  if (!isOpen) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label="Command palette" className={cn("fixed inset-0 z-50 flex items-start justify-center px-4 pb-8 pt-[14vh]", className)}>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px]" style={{ animation: "fade-in 150ms ease both" }} onClick={() => setOpenState(false)} aria-hidden="true" />
      <div className="relative z-10 w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-popover" style={{ width, maxWidth: "100%", animation: "fade-slide 200ms cubic-bezier(0.16, 1, 0.3, 1) both" }}>
        <PaletteSearchBar query={query} setQuery={setQuery} setSelected={setSelected} stack={stack} placeholder={placeholder} handleKeyDown={handleKeyDown} goBack={goBack} />
        {stack.length > 0 && <PaletteBreadcrumb stack={stack} setStack={setStack} setSelected={setSelected} />}
        <PaletteResults listRef={listRef} sections={sections} safeSelected={safeSelected} query={query} favorites={favorites} pinned={pinned} emptyMessage={emptyMessage} maxHeight={maxHeight} selectRow={selectRow} toggleFavorite={toggleFavorite} togglePinned={togglePinned} setSelected={setSelected} />
        <PaletteFooter stackLength={stack.length} />
      </div>
    </div>
  );
}
