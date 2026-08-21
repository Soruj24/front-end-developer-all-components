"use client";

import { cn } from "@/lib/cn";
import type { InputGroupProps } from "./InputGroup.types";

export function InputGroup({ prefix, suffix, className, children }: InputGroupProps) {
  return (
    <div
      className={cn(
        "flex items-center rounded-xl border border-border bg-card transition-colors",
        "focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
        "hover:border-muted-foreground/30",
        className,
      )}
    >
      {prefix && (
        <div className="flex shrink-0 items-center pl-3 text-sm text-muted-foreground">
          {prefix}
        </div>
      )}
      <div className="flex-1 [&>input]:w-full [&>input]:border-0 [&>input]:bg-transparent [&>input]:py-2.5 [&>input]:text-sm [&>input]:text-foreground [&>input]:placeholder:text-muted-foreground [&>input]:focus:outline-none focus:[&>input]:ring-0 [&>input]:focus:border-0">
        {children}
      </div>
      {suffix && (
        <div className="flex shrink-0 items-center pr-3 text-sm text-muted-foreground">
          {suffix}
        </div>
      )}
    </div>
  );
}
