"use client";

import { cn } from "@/lib/cn";
import type { SearchRecent } from "../types/header.types";

interface SiteHeaderSearchRecentProps {
  searches: SearchRecent[];
  onSelect: (query: string) => void;
  className?: string;
}

export function SiteHeaderSearchRecent({
  searches,
  onSelect,
  className,
}: SiteHeaderSearchRecentProps) {
  if (searches.length === 0) {
    return null;
  }

  return (
    <div className={cn("p-2", className)}>
      <p className="px-2 py-1.5 text-[11px] font-medium uppercase text-muted-foreground">
        Recent searches
      </p>
      {searches.map((search) => (
        <button
          key={search.id}
          type="button"
          onClick={() => onSelect(search.query)}
          className={cn(
            "flex w-full items-center gap-2 rounded-lg px-3 py-2",
            "text-[13px] text-muted-foreground",
            "transition-colors hover:bg-muted hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
        >
          <svg
            className="h-3.5 w-3.5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {search.query}
        </button>
      ))}
    </div>
  );
}
