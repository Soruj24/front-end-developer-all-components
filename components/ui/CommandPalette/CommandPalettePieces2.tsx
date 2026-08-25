import { Fragment, type RefObject } from "react";
import type { Section, CommandItem } from "./CommandPalette.types";
import { SearchIcon, ArrowLeftIcon, XIcon } from "./CommandPalette.icons";
import { Kbd, PaletteRow } from "./CommandPalettePieces";

interface PaletteSearchBarProps {
  query: string; setQuery: (q: string) => void; setSelected: (n: number) => void; stack: CommandItem[];
  placeholder: string; handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void; goBack: () => void;
}

export function PaletteSearchBar({ query, setQuery, setSelected, stack, placeholder, handleKeyDown, goBack }: PaletteSearchBarProps) {
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

interface PaletteBreadcrumbProps {
  stack: CommandItem[]; setStack: (s: CommandItem[]) => void; setSelected: (n: number) => void;
}

export function PaletteBreadcrumb({ stack, setStack, setSelected }: PaletteBreadcrumbProps) {
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

interface PaletteResultsProps {
  listRef: RefObject<HTMLDivElement | null>; sections: Section[]; safeSelected: number; query: string;
  favorites: string[]; pinned: string[]; emptyMessage: string; maxHeight: number | string;
  selectRow: (row: import("./CommandPalette.types").Row) => void; toggleFavorite: (id: string) => void;
  togglePinned: (id: string) => void; setSelected: (n: number) => void;
}

export function PaletteResults({ listRef, sections, safeSelected, query, favorites, pinned, emptyMessage, maxHeight, selectRow, toggleFavorite, togglePinned, setSelected }: PaletteResultsProps) {
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

export function PaletteFooter({ stackLength }: { stackLength: number }) {
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
