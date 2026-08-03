"use client";

import { cn } from "@/lib/cn";
import type { InputGroupProps } from "./InputGroup.types";

export function InputGroup({ prefix, suffix, className, children }: InputGroupProps) {
  return (
    <div
      className={cn(
        "flex items-center rounded-md border bg-white dark:bg-zinc-900 dark:border-zinc-700",
        "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1",
        className,
      )}
    >
      {prefix && (
        <div className="flex items-center pl-3 text-sm text-muted-foreground">
          {prefix}
        </div>
      )}
      <div className="flex-1 [&>input]:border-0 [&>input]:focus:ring-0 [&>input]:w-full [&>input]:bg-transparent [&>input]:py-2">
        {children}
      </div>
      {suffix && (
        <div className="flex items-center pr-3 text-sm text-muted-foreground">
          {suffix}
        </div>
      )}
    </div>
  );
}
