"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";

interface SiteHeaderSearchInputProps {
  onClose: () => void;
  className?: string;
}

export const SiteHeaderSearchInput = forwardRef<
  HTMLInputElement,
  SiteHeaderSearchInputProps
>(({ onClose, className }, ref) => {
  return (
    <div className={cn("flex items-center gap-3 px-4 py-3", className)}>
      <svg
        className="h-4 w-4 shrink-0 text-zinc-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
      <input
        ref={ref}
        type="text"
        placeholder="Search components, blocks, templates..."
        className={cn(
          "flex-1 bg-transparent text-[14px] text-zinc-200",
          "placeholder:text-zinc-500",
          "focus:outline-none"
        )}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            onClose();
          }
        }}
      />
      <kbd
        className={cn(
          "pointer-events-none inline-flex h-5 select-none items-center",
          "rounded border border-zinc-700 bg-zinc-800 px-1.5",
          "font-mono text-[10px] font-medium text-zinc-500"
        )}
      >
        Esc
      </kbd>
    </div>
  );
});

SiteHeaderSearchInput.displayName = "SiteHeaderSearchInput";
