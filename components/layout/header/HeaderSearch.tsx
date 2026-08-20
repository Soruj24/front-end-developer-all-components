"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/cn";
import {
  BORDER,
  BG,
  Z,
  RADIUS,
  TRANSITION,
  FOCUS,
  TEXT,
  COLOR,
} from "@/constants/tokens";

interface HeaderSearchProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  className?: string;
}

const RECENT = ["button", "dialog", "form", "navbar"];

const SUGGESTIONS = [
  { query: "button", category: "Components" },
  { query: "dialog", category: "Components" },
  { query: "navigation", category: "Components" },
  { query: "landing-page", category: "Templates" },
  { query: "getting-started", category: "Docs" },
];

export function HeaderSearch({ isOpen, onToggle, onClose, className }: HeaderSearchProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  const filtered = SUGGESTIONS.filter((s) =>
    s.query.toLowerCase().includes(query.toLowerCase()),
  );

  const handleSelect = useCallback(
    (q: string) => {
      setQuery(q);
      onClose();
    },
    [onClose],
  );

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "hidden items-center gap-2 border",
          RADIUS.sm,
          BORDER.default,
          BG.mutedSoft,
          "px-3 py-1.5",
          TEXT.brand,
          COLOR.muted,
          TRANSITION.colors,
          "hover:text-foreground",
          FOCUS.ring,
          "lg:flex",
        )}
        aria-label="Search (Ctrl+K)"
      >
        <svg
          className="h-3.5 w-3.5 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <span className="min-w-0 truncate">Search components, templates, docs...</span>
        <kbd
          className={cn(
            "pointer-events-none ml-4 hidden h-5 select-none items-center gap-1",
            "border bg-background px-1.5 font-mono",
            BORDER.default,
            TEXT.tiny,
            COLOR.muted,
            "sm:flex",
            RADIUS.sm,
          )}
        >
          <span className="text-xs">Ctrl</span>
          <span className="text-xs">K</span>
        </kbd>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search"
          className={cn(
            "fixed left-1/2 top-[15vh] w-full max-w-lg",
            "-translate-x-1/2",
            Z.toast,
            RADIUS.lg,
            BORDER.default,
            "bg-popover shadow-2xl",
            "animate-in fade-in-0 zoom-in-95",
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={cn("flex items-center gap-3 border-b px-4", BORDER.default)}>
            <svg
              className="h-4 w-4 shrink-0 text-muted-foreground"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") onClose();
              }}
              placeholder="Search components, templates, docs..."
              className={cn(
                "flex-1 bg-transparent py-3 text-foreground",
                "placeholder:text-muted-foreground",
                "focus:outline-none",
                TEXT.body,
              )}
            />
            <kbd
              className={cn(
                "hidden h-5 items-center border bg-background px-1.5 font-mono",
                BORDER.default,
                TEXT.tiny,
                COLOR.muted,
                "sm:flex",
                RADIUS.sm,
              )}
            >
              Esc
            </kbd>
          </div>

          <div className="max-h-[300px] overflow-y-auto p-2">
            {query.length === 0 && RECENT.length > 0 && (
              <div className="mb-1">
                <p className={cn("px-2 py-1.5 font-medium", TEXT.small, COLOR.muted)}>
                  Recent
                </p>
                {RECENT.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => handleSelect(q)}
                    className={cn(
                      "flex w-full items-center gap-2 px-2 py-1.5",
                      RADIUS.sm,
                      TEXT.body,
                      COLOR.muted,
                      "hover:text-foreground",
                      TRANSITION.colors,
                    )}
                  >
                    <svg
                      className="h-3 w-3 shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {q}
                  </button>
                ))}
              </div>
            )}

            {query.length > 0 && filtered.length > 0 && (
              <div>
                <p className={cn("px-2 py-1.5 font-medium", TEXT.small, COLOR.muted)}>
                  Suggestions
                </p>
                {filtered.map((item) => (
                  <button
                    key={item.query}
                    type="button"
                    onClick={() => handleSelect(item.query)}
                    className={cn(
                      "flex w-full items-center justify-between px-2 py-1.5",
                      RADIUS.sm,
                      TEXT.body,
                      COLOR.muted,
                      "hover:text-foreground",
                      TRANSITION.colors,
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <svg
                        className="h-3 w-3 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                      </svg>
                      {item.query}
                    </span>
                    <span className={cn("text-muted-foreground/60", TEXT.small)}>
                      {item.category}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {query.length > 0 && filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <p className={cn("text-muted-foreground", TEXT.body)}>
                  No results for &quot;{query}&quot;
                </p>
              </div>
            )}
          </div>

          <div className={cn("flex items-center justify-between border-t px-4 py-2", BORDER.default)}>
            <div className={cn("flex items-center gap-3 text-muted-foreground/60", TEXT.small)}>
              <span className="flex items-center gap-1">
                <kbd className={cn("border bg-background px-1 font-mono", BORDER.default, TEXT.tiny)}>
                  &uarr;
                </kbd>
                <kbd className={cn("border bg-background px-1 font-mono", BORDER.default, TEXT.tiny)}>
                  &darr;
                </kbd>
                navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className={cn("border bg-background px-1 font-mono", BORDER.default, TEXT.tiny)}>
                  Enter
                </kbd>
                select
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
