"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  href: string;
}

interface SiteHeaderSearchResultsProps {
  results: SearchResult[];
  onSelect: () => void;
  className?: string;
}

export function SiteHeaderSearchResults({
  results,
  onSelect,
  className,
}: SiteHeaderSearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className={cn("px-4 py-6 text-center", className)}>
        <p className="text-[13px] text-zinc-500">No results found</p>
      </div>
    );
  }

  return (
    <div className={cn("max-h-64 overflow-y-auto p-2", className)}>
      <p className="px-2 py-1.5 text-[11px] font-medium uppercase text-zinc-500">
        Suggestions
      </p>
      {results.map((result) => (
        <Link
          key={result.id}
          href={result.href}
          onClick={onSelect}
          className={cn(
            "flex flex-col gap-0.5 rounded-lg px-3 py-2.5",
            "transition-colors hover:bg-zinc-800/60",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"
          )}
        >
          <span className="text-[13px] font-medium text-zinc-200">
            {result.title}
          </span>
          <span className="text-[12px] text-zinc-500">
            {result.description}
          </span>
        </Link>
      ))}
    </div>
  );
}
