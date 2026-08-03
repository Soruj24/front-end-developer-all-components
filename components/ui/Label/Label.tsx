"use client";

import { cn } from "@/lib/cn";
import type { LabelProps } from "./Label.types";

export function Label({ htmlFor, children, required, disabled, className }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}
