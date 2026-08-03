"use client";

import { cn } from "@/lib/cn";
import type { RadioGroupProps } from "./RadioGroup.types";

export function RadioGroup({
  value,
  onValueChange,
  options,
  orientation = "vertical",
  className,
}: RadioGroupProps) {
  return (
    <div
      role="radiogroup"
      className={cn(
        orientation === "horizontal" ? "flex flex-wrap gap-4" : "flex flex-col gap-2",
        className
      )}
    >
      {options.map((opt) => (
        <label
          key={opt.value}
          className={cn(
            "flex items-center space-x-2",
            opt.disabled && "cursor-not-allowed opacity-50"
          )}
        >
          <input
            type="radio"
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onValueChange?.(opt.value)}
            disabled={opt.disabled}
            className="h-4 w-4 border-zinc-300 text-zinc-900 focus:ring-zinc-400 dark:border-zinc-600 dark:focus:ring-zinc-500"
          />
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {opt.label}
          </span>
        </label>
      ))}
    </div>
  );
}
