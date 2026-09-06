"use client";

import { cn } from "@/lib/cn";
import { FOCUS } from "@/constants/tokens";

interface HeaderSearchTriggerProps {
  onClick: () => void;
  className?: string;
}

export function HeaderSearch({ onClick, className }: HeaderSearchTriggerProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Search (Ctrl+K)"
      className={cn(
        "mr-1 hidden h-9 w-44 items-center gap-2 rounded-md border border-border/60 bg-muted/50 px-3 text-[13px] text-muted-foreground transition-colors hover:border-ring/40 hover:text-foreground md:flex xl:w-56",
        FOCUS.ring,
        className,
      )}
    >
      <svg
        className="h-4 w-4 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <span className="min-w-0 flex-1 truncate text-left">Search…</span>
      <kbd className="pointer-events-none hidden h-5 shrink-0 select-none items-center gap-0.5 rounded border border-border/60 bg-background px-1.5 font-mono text-[10px] text-muted-foreground lg:flex">
        <span>⌘</span>
        <span>K</span>
      </kbd>
    </button>
  );
}
