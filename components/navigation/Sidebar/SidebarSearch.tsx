"use client";

import { useEffect, useRef } from "react";
import { SearchIcon } from "lucide-react";

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
    <div className="relative">
      <SearchIcon
        className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60"
        aria-hidden="true"
      />
      <input
        ref={inputRef}
        type="text"
        aria-label="Search pages"
        placeholder="Search pages..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-9 w-full rounded-lg border border-border/60 bg-muted/30 pl-8 pr-8 text-[13px] text-foreground shadow-xs transition-all duration-150 ease-out placeholder:text-muted-foreground/50 hover:bg-muted/50 hover:border-border focus-visible:border-primary/40 focus-visible:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
      />
      {!value && (
        <kbd className="pointer-events-none absolute right-2 top-1/2 hidden h-5 -translate-y-1/2 items-center rounded-md border border-border/60 bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground/70 sm:flex">
          /
        </kbd>
      )}
    </div>
  );
}
