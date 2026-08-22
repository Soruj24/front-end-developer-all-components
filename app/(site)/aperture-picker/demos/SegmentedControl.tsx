"use client";

import { cn } from "@/lib/cn";

interface SegmentedControlProps {
  label: string;
  displayValue: string;
  options: Array<{ value: string; label: string }>;
  value: string;
  onValueChange: (value: string) => void;
}

export function SegmentedControl({ label, displayValue, options, value, onValueChange }: SegmentedControlProps) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono font-medium tabular-nums">{displayValue}</span>
      </div>
      <div
        role="radiogroup"
        aria-label={label}
        className="flex gap-1 overflow-x-auto rounded-lg bg-muted/70 p-1 scrollbar-thin"
      >
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onValueChange(option.value)}
              className={cn(
                "flex-1 shrink-0 rounded-md px-1.5 py-1 text-[10px] font-semibold tabular-nums",
                "transition-all duration-150 ease-out active:scale-[0.95]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
                selected
                  ? "bg-surface text-foreground shadow-sm ring-1 ring-border"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
