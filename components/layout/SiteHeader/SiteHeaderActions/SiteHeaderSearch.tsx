"use client";

import { cn } from "@/lib/cn";
import { SearchIcon, CommandIcon } from "../icons";

interface SiteHeaderSearchProps {
  onClick: () => void;
  isMac: boolean;
  className?: string;
}

export function SiteHeaderSearch({
  onClick,
  isMac,
  className,
}: SiteHeaderSearchProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group hidden h-9 w-40 items-center gap-2.5",
        "rounded-xl border border-zinc-800 bg-zinc-800/40 px-3",
        "text-left text-[13px] text-zinc-400",
        "transition-all duration-200",
        "hover:border-zinc-700 hover:bg-zinc-800/60 hover:text-zinc-200",
        "active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500",
        "sm:flex xl:w-44",
        className
      )}
      aria-label="Search (Ctrl+K)"
    >
      <SearchIcon className="h-3.5 w-3.5 shrink-0" />
      <span className="flex-1 truncate">Search...</span>
      <kbd
        className={cn(
          "pointer-events-none inline-flex h-5 select-none items-center gap-0.5",
          "rounded border border-zinc-700 bg-zinc-800 px-1.5",
          "font-mono text-[10px] font-medium text-zinc-400"
        )}
      >
        {isMac ? (
          <>
            <CommandIcon className="h-2.5 w-2.5" />K
          </>
        ) : (
          "Ctrl K"
        )}
      </kbd>
    </button>
  );
}
