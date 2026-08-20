"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

interface SidebarSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function SidebarSearch({ value, onChange }: SidebarSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;
      if (e.key === "/" && !isTyping) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="px-3 pb-1 pt-1">
      <div className="relative">
        <svg
          className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search pages..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "h-8 w-full rounded-md border border-border/60 bg-muted/40",
            "pl-8 pr-8 text-[13px] text-foreground",
            "placeholder:text-muted-foreground/60",
            "transition-colors",
            "focus:border-ring/60 focus:bg-background focus:outline-none",
            "focus:ring-2 focus:ring-ring/20",
          )}
        />
        {!value && (
          <kbd
            className={cn(
              "pointer-events-none absolute right-2 top-1/2 -translate-y-1/2",
              "hidden h-4 items-center rounded border border-border/60",
              "bg-background px-1 font-mono text-[10px] text-muted-foreground sm:flex",
            )}
          >
            /
          </kbd>
        )}
      </div>
    </div>
  );
}
