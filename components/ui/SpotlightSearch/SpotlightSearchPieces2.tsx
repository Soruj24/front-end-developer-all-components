import type { RefObject } from "react";
import type { SpotlightItem, Section } from "./SpotlightSearch.types";
import { SearchIcon, XIcon } from "./SpotlightSearch.icons";
import { Kbd, OptionRow } from "./SpotlightSearchPieces";

interface SpotlightSearchBarProps {
  query: string;
  setQuery: (q: string) => void;
  setSelected: (n: number) => void;
  inputRef: RefObject<HTMLInputElement | null>;
  placeholder: string;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function SpotlightSearchBar({
  query,
  setQuery,
  setSelected,
  inputRef,
  placeholder,
  handleKeyDown,
}: SpotlightSearchBarProps) {
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

interface SpotlightResultsProps {
  listRef: RefObject<HTMLDivElement | null>;
  sections: Section[];
  rows: SpotlightItem[];
  safeSelected: number;
  query: string;
  emptyMessage: string;
  maxHeight: number | string;
  selectItem: (item: SpotlightItem) => void;
  setSelected: (n: number) => void;
}

export function SpotlightResults({
  listRef,
  sections,
  rows,
  safeSelected,
  query,
  emptyMessage,
  maxHeight,
  selectItem,
  setSelected,
}: SpotlightResultsProps) {
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

export function SpotlightFooter() {
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
