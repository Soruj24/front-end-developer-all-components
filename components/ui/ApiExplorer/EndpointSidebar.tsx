"use client";

import type { KeyboardEvent, RefObject } from "react";
import { EndpointList } from "./EndpointList";
import { SearchIcon } from "./Icons";
import type { ApiEndpoint } from "./types";

interface EndpointSidebarProps {
  query: string;
  searchRef: RefObject<HTMLInputElement | null>;
  listRef: RefObject<HTMLDivElement | null>;
  visible: ApiEndpoint[];
  cursor: number;
  selectedId: string;
  onQueryChange: (value: string) => void;
  onSelect: (endpoint: ApiEndpoint) => void;
  onListKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
}

export function EndpointSidebar({
  query,
  searchRef,
  listRef,
  visible,
  cursor,
  selectedId,
  onQueryChange,
  onSelect,
  onListKeyDown,
}: EndpointSidebarProps) {
  return (
    <div className="hidden min-h-0 flex-col border-r border-border lg:flex">
      <div className="border-b border-border p-2">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            ref={searchRef}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search endpointsâ€¦"
            className="h-8 w-full rounded-lg border border-border bg-background pl-8 pr-8 text-xs text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
          />
          <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded border border-border bg-muted px-1.5 text-[10px] text-muted-foreground">
            /
          </kbd>
        </div>
      </div>

      <div
        ref={listRef}
        tabIndex={0}
        role="listbox"
        aria-label="Endpoints"
        onKeyDown={onListKeyDown}
        className="scrollbar-thin min-h-0 flex-1 overflow-y-auto p-2 outline-none"
      >
        {visible.length === 0 ? (
          <p className="px-2 py-4 text-center text-xs text-muted-foreground">No endpoints match â€œ{query}â€.</p>
        ) : (
          <EndpointList
            endpoints={visible}
            cursor={cursor}
            selectedId={selectedId}
            onSelect={onSelect}
          />
        )}
      </div>
    </div>
  );
}
