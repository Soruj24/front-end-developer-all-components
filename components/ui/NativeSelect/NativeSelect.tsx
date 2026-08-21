"use client";

import { cn } from "@/lib/cn";
import type { NativeSelectProps } from "./NativeSelect.types";

const CHEVRON_SVG = "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2371717a%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E";

export function NativeSelect({
  value,
  onValueChange,
  options,
  placeholder,
  disabled = false,
  className,
}: NativeSelectProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onValueChange?.(e.target.value)}
        disabled={disabled}
        className={cn(
          "flex h-11 w-full appearance-none items-center rounded-xl border border-border bg-card px-3.5 py-2.5 pr-10 text-sm text-foreground",
          "bg-[url('", CHEVRON_SVG, "')] bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat",
          "transition-colors duration-150",
          "hover:border-muted-foreground/30",
          "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
          "dark:bg-card/50",
          disabled && "pointer-events-none cursor-not-allowed opacity-50",
          className,
        )}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
