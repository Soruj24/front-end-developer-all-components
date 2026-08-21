"use client";

import { forwardRef, useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/cn";
import type { SearchInputProps } from "./SearchInput.types";

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      value,
      onChange,
      placeholder = "Search...",
      onClear,
      shortcut,
      recentSearches,
      onRecentClick,
      className,
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleBlur = useCallback((e: FocusEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.relatedTarget as Node)) {
        setFocused(false);
      }
    }, []);

    useEffect(() => {
      const el = wrapperRef.current;
      if (!el) return;
      el.addEventListener("focusout", handleBlur);
      return () => el.removeEventListener("focusout", handleBlur);
  }, [handleBlur]);

    return (
      <div ref={wrapperRef} className={cn("relative", className)}>
        <div
          className={cn(
            "flex items-center gap-2.5 rounded-xl border bg-card px-3.5 py-2.5",
            "transition-all duration-150",
            "hover:border-muted-foreground/30",
            focused
              ? "border-primary/50 ring-2 ring-primary/10"
              : "border-border",
          )}
        >
          <svg
            className="h-4 w-4 shrink-0 text-muted-foreground/60"
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
            ref={ref}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            placeholder={placeholder}
            className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/40"
          />
          {value && onClear && (
            <button
              type="button"
              onClick={() => {
                onClear();
                onChange("");
              }}
              aria-label="Clear search"
              className={cn(
                "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                "text-muted-foreground/60 transition-colors duration-150",
                "hover:bg-muted hover:text-foreground",
                "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
              )}
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          {!value && shortcut && (
            <kbd className="shrink-0 rounded-md border border-border bg-muted/50 px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground/60">
              {shortcut}
            </kbd>
          )}
        </div>

        {focused && recentSearches && recentSearches.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-xl border border-border bg-card py-1 shadow-lg shadow-black/5">
            <div className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/50">
              Recent searches
            </div>
            {recentSearches.map((search) => (
              <button
                key={search}
                type="button"
                onClick={() => onRecentClick?.(search)}
                className={cn(
                  "flex w-full items-center gap-2.5 px-3 py-2 text-sm text-muted-foreground",
                  "transition-colors duration-150",
                  "hover:bg-muted hover:text-foreground",
                  "focus-visible:bg-muted focus-visible:outline-none",
                )}
              >
                <svg className="h-3.5 w-3.5 shrink-0 text-muted-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {search}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  },
);
SearchInput.displayName = "SearchInput";
