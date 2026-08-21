export const RATING_SOURCE = `"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/cn";

type RatingSize = "sm" | "md" | "lg";
type RatingColor = "amber" | "yellow" | "emerald" | "rose" | "primary";

interface RatingProps {
  value: number; max?: number; size?: RatingSize; color?: RatingColor;
  onChange?: (value: number) => void; disabled?: boolean; className?: string;
}

const SIZE_MAP: Record<RatingSize, { icon: string; gap: string }> = {
  sm: { icon: "h-4 w-4", gap: "gap-0.5" },
  md: { icon: "h-5 w-5", gap: "gap-1" },
  lg: { icon: "h-7 w-7", gap: "gap-1.5" },
};

const COLOR_MAP: Record<RatingColor, { filled: string; empty: string; hover: string }> = {
  amber: { filled: "text-amber-500 dark:text-amber-400", empty: "text-muted-foreground/25", hover: "hover:text-amber-400 dark:hover:text-amber-300" },
  yellow: { filled: "text-yellow-500 dark:text-yellow-400", empty: "text-muted-foreground/25", hover: "hover:text-yellow-400 dark:hover:text-yellow-300" },
  emerald: { filled: "text-emerald-500 dark:text-emerald-400", empty: "text-muted-foreground/25", hover: "hover:text-emerald-400 dark:hover:text-emerald-300" },
  rose: { filled: "text-rose-500 dark:text-rose-400", empty: "text-muted-foreground/25", hover: "hover:text-rose-400 dark:hover:text-rose-300" },
  primary: { filled: "text-primary", empty: "text-muted-foreground/25", hover: "hover:text-primary/80" },
};

let halfGradId = 0;

function StarIcon({ filled, half, id }: { filled: boolean; half: boolean; id: string }) {
  if (filled) return <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>;
  if (half) return <svg viewBox="0 0 24 24" className="h-full w-full"><defs><linearGradient id={id}><stop offset="50%" stopColor="currentColor" /><stop offset="50%" stopColor="transparent" /></linearGradient></defs><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill={\\\`url(#\\\${id})\\\`} stroke="currentColor" strokeWidth="1" /></svg>;
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-full w-full"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>;
}

export function Rating({ value, max = 5, size = "md", color = "amber", onChange, disabled = false, className }: RatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const interactive = !!onChange && !disabled;
  const handleMouseEnter = useCallback((i: number) => { if (interactive) setHovered(i); }, [interactive]);
  const handleMouseLeave = useCallback(() => { if (interactive) setHovered(null); }, [interactive]);
  const display = hovered !== null ? hovered + 1 : value;

  return (
    <div role={interactive ? "radiogroup" : "img"} aria-label={\\\`Rating: \\\${value} out of \\\${max}\\\`}
      className={cn("inline-flex items-center", SIZE_MAP[size].gap, disabled && "pointer-events-none opacity-50", className)}>
      {Array.from({ length: max }, (_, i) => { const filled = i < Math.floor(display); const half = !filled && i < display; const active = i < value; const gradId = \\\`half-\\\${++halfGradId}\\\`;
        return <button key={i} type="button" disabled={!interactive} onClick={() => onChange?.(i + 1)}
          onMouseEnter={() => handleMouseEnter(i)} onMouseLeave={handleMouseLeave}
          aria-label={\\\`\\\${i + 1} star\\\${i + 1 > 1 ? "s" : ""}\\\`}
          role={interactive ? "radio" : undefined} aria-checked={interactive ? i < value : undefined}
          tabIndex={interactive ? (i < value ? 0 : -1) : undefined}
          onKeyDown={(e) => { if (!interactive) return; if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault();
            const next = e.key === "ArrowRight" ? Math.min(i + 1, max - 1) : Math.max(i - 1, 0); onChange?.(next + 1); } }}
          className={cn("relative inline-flex items-center justify-center rounded-md transition-all duration-150", SIZE_MAP[size].icon,
            interactive ? "cursor-pointer hover:scale-125 active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-1 focus-visible:ring-offset-background" : "cursor-default",
            filled ? COLOR_MAP[color].filled : half ? COLOR_MAP[color].filled : COLOR_MAP[color].empty,
            interactive && !active && COLOR_MAP[color].hover)}>
          <StarIcon filled={filled} half={half} id={gradId} /></button>; })}
    </div>
  );
}`;

export const DEFAULT_EXAMPLE = `<Rating value={rating} onChange={setRating} />`;

export const SIZES_EXAMPLE = `<Rating value={rating} onChange={setRating} size="sm" />`;

export const COLORS_EXAMPLE = `<Rating value={rating} onChange={setRating} color="rose" />`;

export const READONLY_EXAMPLE = `<Rating value={4} />`;
