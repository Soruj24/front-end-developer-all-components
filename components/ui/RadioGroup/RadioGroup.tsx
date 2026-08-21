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
        orientation === "horizontal" ? "flex flex-wrap gap-3" : "flex flex-col gap-1",
        className,
      )}
    >
      {options.map((opt) => {
        const checked = value === opt.value;
        return (
          <label
            key={opt.value}
            className={cn(
              "group flex cursor-pointer items-start gap-3 rounded-xl px-3 py-2.5",
              "transition-colors duration-150",
              "hover:bg-muted/50",
              "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary/50 has-[:focus-visible]:outline-none",
              opt.disabled && "pointer-events-none opacity-50",
            )}
          >
            <span
              className={cn(
                "mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-150",
                checked
                  ? "border-primary bg-primary"
                  : "border-muted-foreground/40 bg-background group-hover:border-muted-foreground/60",
              )}
            >
              {checked && (
                <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />
              )}
            </span>
            <span className="flex flex-col gap-0.5">
              <span
                className={cn(
                  "text-sm font-medium leading-none",
                  checked ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {opt.label}
              </span>
              {opt.description && (
                <span className="text-xs leading-snug text-muted-foreground/70">
                  {opt.description}
                </span>
              )}
            </span>
            <input
              type="radio"
              value={opt.value}
              checked={checked}
              onChange={() => onValueChange?.(opt.value)}
              disabled={opt.disabled}
              tabIndex={0}
              className="sr-only"
            />
          </label>
        );
      })}
    </div>
  );
}
