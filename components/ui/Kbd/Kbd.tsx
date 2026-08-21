"use client";

import { cn } from "@/lib/cn";
import type { KbdProps } from "./Kbd.types";

export function Kbd({ children, className }: KbdProps) {
  return (
    <kbd
      className={cn(
        "pointer-events-none inline-flex h-6 min-w-[1.5rem] select-none items-center justify-center gap-1 rounded-lg border border-border bg-muted px-1.5 font-mono text-[11px] font-medium text-muted-foreground",
        "shadow-[0_1px_0_1px_var(--color-border)]",
        className,
      )}
    >
      {children}
    </kbd>
  );
}
