"use client";

import { useEffect, useRef } from "react";

interface SidebarSearchProps {
  value: string;
  onChange: (value: string) => void;
}

/** Search input that filters the sidebar navigation. Press "/" to focus. */
export function SidebarSearch({ value, onChange }: SidebarSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;
      if (event.key === "/" && !isTyping) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="relative px-1">
      <svg
        className="pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
        />
      </svg>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search pages..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-9 w-full rounded-lg border border-border bg-muted/40 px-9 pr-8 text-[13px] text-foreground transition-all duration-150 placeholder:text-muted-foreground/60 focus:border-ring/60 focus:bg-background focus:outline-none focus:ring-2 focus:ring-ring/20"
      />
      {!value && (
        <kbd className="pointer-events-none absolute right-3 top-1/2 hidden h-4.5 -translate-y-1/2 items-center rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
          /
        </kbd>
      )}
    </div>
  );
}
