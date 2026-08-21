"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/cn";
import type { RatingProps, RatingSize, RatingColor } from "./Rating.types";

const SIZE_MAP: Record<RatingSize, { icon: string; gap: string }> = {
  sm: { icon: "h-4 w-4", gap: "gap-0.5" },
  md: { icon: "h-5 w-5", gap: "gap-1" },
  lg: { icon: "h-7 w-7", gap: "gap-1.5" },
};

const COLOR_MAP: Record<RatingColor, { filled: string; empty: string }> = {
  amber: { filled: "text-amber-500 dark:text-amber-400", empty: "text-muted-foreground/25" },
  yellow: { filled: "text-yellow-500 dark:text-yellow-400", empty: "text-muted-foreground/25" },
  emerald: { filled: "text-emerald-500 dark:text-emerald-400", empty: "text-muted-foreground/25" },
  rose: { filled: "text-rose-500 dark:text-rose-400", empty: "text-muted-foreground/25" },
  primary: { filled: "text-primary", empty: "text-muted-foreground/25" },
};

function StarIcon({ filled, half }: { filled: boolean; half: boolean }) {
  if (filled) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );
  }
  if (half) {
    return (
      <svg viewBox="0 0 24 24" className="h-full w-full">
        <defs>
          <linearGradient id="half-grad">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill="url(#half-grad)"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-full w-full">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

export function Rating({
  value,
  max = 5,
  size = "md",
  color = "amber",
  onChange,
  disabled = false,
  className,
}: RatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const interactive = !!onChange && !disabled;

  const handleMouseEnter = useCallback((index: number) => {
    if (interactive) setHovered(index);
  }, [interactive]);

  const handleMouseLeave = useCallback(() => {
    if (interactive) setHovered(null);
  }, [interactive]);

  const display = hovered !== null ? hovered + 1 : value;

  return (
    <div
      role={interactive ? "radiogroup" : "img"}
      aria-label={`Rating: ${value} out of ${max}`}
      className={cn(
        "inline-flex items-center",
        SIZE_MAP[size].gap,
        disabled && "pointer-events-none opacity-50",
        className,
      )}
    >
      {Array.from({ length: max }, (_, i) => {
        const filled = i < Math.floor(display);
        const half = !filled && i < display;
        const active = i < value;

        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => onChange?.(i + 1)}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
            aria-label={`${i + 1} star${i + 1 > 1 ? "s" : ""}`}
            role={interactive ? "radio" : undefined}
            aria-checked={interactive ? i < value : undefined}
            className={cn(
              "relative inline-flex items-center justify-center rounded-md transition-all duration-150",
              SIZE_MAP[size].icon,
              interactive
                ? "cursor-pointer hover:scale-110 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none"
                : "cursor-default",
              filled ? COLOR_MAP[color].filled : half ? COLOR_MAP[color].filled : COLOR_MAP[color].empty,
              interactive && !active && "hover:text-amber-400 dark:hover:text-amber-300",
            )}
          >
            <StarIcon filled={filled} half={half} />
          </button>
        );
      })}
    </div>
  );
}
