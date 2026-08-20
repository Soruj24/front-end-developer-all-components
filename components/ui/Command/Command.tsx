"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { cn } from "@/lib/cn";
import type { CommandProps } from "./Command.types";

function SearchIcon() {
  return (
    <svg className="h-4 w-4 shrink-0 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function LoaderIcon() {
  return (
    <svg className="h-4 w-4 shrink-0 animate-spin text-muted-foreground" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

export function Command({
  placeholder = "Type a command...",
  loading = false,
  className,
  children,
}: CommandProps) {
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const clear = useCallback(() => {
    setSearch("");
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-lg",
        className,
      )}
    >
      {/* Search bar */}
      <div className="flex items-center gap-2.5 border-b border-border px-3.5 py-2.5">
        {loading ? <LoaderIcon /> : <SearchIcon />}
        <input
          ref={inputRef}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={placeholder}
          aria-label="Search commands"
          className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
        {search && (
          <button
            type="button"
            onClick={clear}
            aria-label="Clear search"
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <XIcon />
          </button>
        )}
      </div>

      {/* Results */}
      <div className="max-h-80 overflow-y-auto p-1.5 scrollbar-thin">
        {typeof children === "function"
          ? (children as (search: string) => React.ReactNode)(search)
          : children}
      </div>
    </div>
  );
}
