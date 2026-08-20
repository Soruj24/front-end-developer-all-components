"use client";

import { cn } from "@/lib/cn";
import {
  BORDER,
  BG,
  RADIUS,
  TRANSITION,
  FOCUS,
  TEXT,
  COLOR,
} from "@/constants/tokens";

interface HeaderSearchTriggerProps {
  onClick: () => void;
  className?: string;
}

export function HeaderSearch({ onClick, className }: HeaderSearchTriggerProps) {
  return (
    <button
      type="button"
      onClick={onClick}
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
        className,
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
  );
}
