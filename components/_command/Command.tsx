"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import type { CommandProps, CommandItemProps } from "./Command.types";
import { COMMAND_STYLES } from "./Command.constants";

export function Command({ placeholder = "Search...", items, emptyMessage = "No results found.", searchPlaceholder, maxResults, onValueChange, onSelect, className, variant = "default" }: CommandProps) {
  const [search, setSearch] = React.useState("");
  const [highlightedIndex, setHighlightedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const filteredItems = React.useMemo(() => {
    const s = search.toLowerCase();
    return items
      .filter((item) => !item.disabled && (item.label?.toString().toLowerCase().includes(s) || item.value.toLowerCase().includes(s) || item.keywords?.some((k) => k.toLowerCase().includes(s))))
      .slice(0, maxResults ?? items.length);
  }, [items, search, maxResults]);

  React.useEffect(() => {
    onValueChange?.(search);
  }, [search, onValueChange]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((p) => Math.min(p + 1, filteredItems.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((p) => Math.max(p - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = filteredItems[highlightedIndex];
      if (item) handleSelect(item);
    }
  };

  const handleSelect = (item: CommandItemProps) => {
    onSelect?.(item);
    onValueChange?.("");
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData?.getData("text");
    if (pasted) setSearch(pasted);
  };

  return (
    <div className={cn(COMMAND_STYLES.base, className)}>
      <div className="p-2">
        <input
          ref={inputRef}
          className={cn(COMMAND_STYLES.input, variant === "dialog" && "border-0 focus:ring-0")}
          placeholder={searchPlaceholder ?? placeholder}
          value={search}
          onChange={(e) => { setSearch(e.target.value); setHighlightedIndex(0); }}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
        />
      </div>
      <div className={COMMAND_STYLES.list}>
        {filteredItems.length === 0 ? (
          <div className={COMMAND_STYLES.empty}>{emptyMessage}</div>
        ) : (
          filteredItems.map((item, idx) => (
            <div
              key={item.value}
              className={cn(
                COMMAND_STYLES.item,
                idx === highlightedIndex && COMMAND_STYLES.itemSelected,
                item.disabled && COMMAND_STYLES.itemDisabled,
              )}
              onMouseEnter={() => setHighlightedIndex(idx)}
              onClick={() => !item.disabled && handleSelect(item)}
            >
              {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
              <span className="flex-1">{item.label ?? item.value}</span>
              {item.shortcut && <span className={COMMAND_STYLES.shortcut}>{item.shortcut}</span>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
