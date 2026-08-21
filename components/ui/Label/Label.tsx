"use client";

import { cn } from "@/lib/cn";
import type { LabelProps } from "./Label.types";

export function Label({ htmlFor, children, required, disabled, className }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "text-sm font-medium leading-none text-foreground",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      {children}
      {required && (
        <span className="ml-1 text-destructive" aria-hidden="true">*</span>
      )}
    </label>
  );
}
