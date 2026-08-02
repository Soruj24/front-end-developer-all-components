"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
  KeyboardEvent,
} from "react";

interface CommandItem {
  id: string;
  label: string;
  icon?: ReactNode;
  shortcut?: string;
  onSelect: () => void;
  danger?: boolean;
}

interface CommandGroup {
  group: string;
  items: CommandItem[];
}

export interface CommandMenuProps {
  open: boolean;
  onClose: () => void;
  groups: CommandGroup[];
  placeholder?: string;
}

const CommandMenu = ({
  open,
  onClose,
  groups,
  placeholder = "Type a command...",
}: CommandMenuProps) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const flatItems = groups.flatMap((g) =>
    g.items.filter(
      (item) =>
        !query ||
        item.label.toLowerCase().includes(query.toLowerCase())
    )
  );

  useEffect(() => {
    if (!open) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler as unknown as EventListener);
    return () =>
      document.removeEventListener(
        "keydown",
        handler as unknown as EventListener
      );
  }, [open, onClose]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(flatItems.length, 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev <= 0 ? Math.max(flatItems.length - 1, 0) : prev - 1
        );
      } else if (e.key === "Enter" && flatItems[selectedIndex]) {
        e.preventDefault();
        flatItems[selectedIndex].onSelect();
        onClose();
      }
    },
    [flatItems, selectedIndex, onClose]
  );

  if (!open) return null;

  let globalIndex = -1;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[15vh]">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-surface shadow-popover">
        <div className="flex items-center gap-2 border-b border-border px-4">
          <svg
            className="h-4 w-4 shrink-0 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1 bg-transparent py-3.5 text-sm text-foreground outline-none placeholder:text-subtle"
          />
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {flatItems.length === 0 && (
            <div className="flex flex-col items-center gap-1 py-8 text-center">
              <svg
                className="h-8 w-8 text-subtle"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm text-muted-foreground">
                No results found
              </span>
              <span className="text-xs text-muted-foreground">
                Try a different search term
              </span>
            </div>
          )}
          {groups.map((group) => {
            const filtered = group.items.filter(
              (item) =>
                !query ||
                item.label.toLowerCase().includes(query.toLowerCase())
            );
            if (filtered.length === 0) return null;
            return (
              <div key={group.group}>
                <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                  {group.group}
                </div>
                {filtered.map((item) => {
                  globalIndex++;
                  const idx = globalIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        item.onSelect();
                        onClose();
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm ${
                        idx === selectedIndex
                          ? "bg-muted"
                          : ""
                      } ${
                        item.danger
                          ? "text-danger"
                          : "text-foreground"
                      }`}
                    >
                      {item.icon && (
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                          {item.icon}
                        </span>
                      )}
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.shortcut && (
                        <span className="shrink-0 rounded-md border border-border bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                          {item.shortcut}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CommandMenu;
