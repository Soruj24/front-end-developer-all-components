"use client";

import { cn } from "@/lib/cn";

interface SwatchesProps {
  colors: string[];
  value: string;
  onValueChange: (color: string) => void;
  ariaLabel: string;
  size?: "sm" | "md";
}

export function Swatches({ colors, value, onValueChange, ariaLabel, size = "md" }: SwatchesProps) {
  return (
    <div role="radiogroup" aria-label={ariaLabel} className="flex flex-wrap items-center gap-1.5">
      {colors.map((color) => {
        const selected = color.toLowerCase() === value.toLowerCase();
        return (
          <button
            key={color}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={`Use color ${color}`}
            onClick={() => onValueChange(color)}
            style={{ backgroundColor: color }}
            className={cn(
              "rounded-full border shadow-xs transition-all duration-150 ease-out",
              "hover:scale-110 hover:shadow-sm active:scale-90",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              size === "sm" ? "h-6 w-6" : "h-7 w-7",
              selected
                ? "scale-110 border-transparent ring-2 ring-ring ring-offset-2 ring-offset-background"
                : "border-black/10 dark:border-white/15"
            )}
          />
        );
      })}
    </div>
  );
}
