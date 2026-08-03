"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import type { CommandProps } from "./Command.types";

export function Command({
  placeholder = "Type a command...",
  className,
  children,
}: CommandProps) {
  const [search, setSearch] = useState("");

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-lg border bg-white dark:bg-zinc-900",
        className
      )}
    >
      <div className="flex items-center border-b px-3">
        <svg className="h-4 w-4 shrink-0 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-zinc-400"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="rounded p-1 text-zinc-400 hover:text-zinc-600"
          >
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      <div className="max-h-80 overflow-y-auto p-1">
        {typeof children === "function"
          ? (children as (search: string) => React.ReactNode)(search)
          : children}
      </div>
    </div>
  );
}
