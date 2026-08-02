"use client";

import { forwardRef, useState, useRef, useEffect } from "react";

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  onClear: () => void;
  shortcut?: string;
  recentSearches?: string[];
  onRecentClick?: (search: string) => void;
  className?: string;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      value,
      onChange,
      placeholder,
      onClear,
      shortcut,
      recentSearches,
      onRecentClick,
      className = "",
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handler = (e: MouseEvent) => {
        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(e.target as Node)
        ) {
          setFocused(false);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
      <div ref={wrapperRef} className={`relative ${className}`}>
        <div
          className={`flex items-center gap-2 rounded-xl border bg-background px-3 py-2.5 transition-colors ${
            focused
              ? "border-ring"
              : "border-border"
          }`}
        >
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
            ref={ref}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            placeholder={placeholder}
            className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-subtle"
          />
          {value && (
            <button
              onClick={() => {
                onClear();
                onChange("");
              }}
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <svg
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
          {!value && shortcut && (
            <span className="shrink-0 rounded-md border border-border bg-muted px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">
              {shortcut}
            </span>
          )}
        </div>
        {focused && recentSearches && recentSearches.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-xl border border-border bg-surface py-1 shadow-popover">
            <div className="px-3 py-1.5 text-xs font-medium text-muted-foreground">
              Recent searches
            </div>
            {recentSearches.map((search) => (
              <button
                key={search}
                onClick={() => onRecentClick?.(search)}
                className="flex w-full items-center gap-2 px-3 py-1.5 text-sm text-foreground hover:bg-muted"
              >
                <svg
                  className="h-3.5 w-3.5 shrink-0 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {search}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";

export default SearchInput;
