"use client";

import { cn } from "@/lib/cn";
import type { KbdProps } from "./Kbd.types";

export function Kbd({ children, className }: KbdProps) {
  return (
    <kbd
      className={cn(
        "pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-zinc-100 px-1.5 font-mono text-[10px] font-medium text-muted-foreground",
        "dark:bg-zinc-800 dark:border-zinc-700",
        className,
      )}
    >
      {children}
    </kbd>
  );
}
