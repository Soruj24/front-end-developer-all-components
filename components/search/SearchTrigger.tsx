"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

interface SearchTriggerProps {
  onClick: () => void;
  placeholder?: string;
  /** Override the shortcut hint. Defaults to ⌘K on macOS, Ctrl K elsewhere. */
  shortcut?: string;
  className?: string;
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

/** Search-box styled button that opens the documentation search dialog. */
export function SearchTrigger({
  onClick,
  placeholder = "Search documentation...",
  shortcut,
  className,
}: SearchTriggerProps) {
  const [label, setLabel] = useState("Ctrl K");

  useEffect(() => {
    const t = setTimeout(() => {
      if (shortcut) {
        setLabel(shortcut);
        return;
      }
      const isMac =
        typeof navigator !== "undefined" &&
        /Mac|iPhone|iPod|iPad/.test(navigator.platform ?? "");
      setLabel(isMac ? "⌘K" : "Ctrl K");
    }, 0);
    return () => clearTimeout(t);
  }, [shortcut]);

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex w-full max-w-md items-center gap-3 rounded-xl border border-border bg-background px-3.5 py-3 text-left shadow-sm transition-colors hover:border-ring/60 hover:bg-muted/40",
        className
      )}
    >
      <SearchIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
      <span className="flex-1 truncate text-sm text-muted-foreground">
        {placeholder}
      </span>
      <kbd className="hidden shrink-0 items-center gap-0.5 rounded-md border border-border bg-muted px-1.5 py-0.5 font-sans text-[11px] font-medium text-muted-foreground sm:inline-flex">
        {label}
      </kbd>
    </button>
  );
}
