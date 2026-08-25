"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { cn } from "@/lib/cn";

export interface InlineSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface InlineSelectProps {
  options: InlineSelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: "xs" | "sm" | "md";
  className?: string;
}

const SIZE_MAP = {
  xs: "h-6 rounded px-1.5 text-[11px]",
  sm: "h-8 rounded-md px-2 text-xs",
  md: "h-10 rounded-lg px-3 text-sm",
} as const;

const OPTION_SIZE_MAP = {
  xs: "px-1.5 py-0.5 text-[11px]",
  sm: "px-2 py-1 text-xs",
  md: "px-2.5 py-1.5 text-sm",
} as const;

export function InlineSelect({
  options,
  value,
  onChange,
  placeholder = "Select",
  disabled = false,
  size = "sm",
  className,
}: InlineSelectProps) {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selected = useMemo(() => options.find((o) => o.value === value), [options, value]);
  const selectable = useMemo(() => options.filter((o) => !o.disabled), [options]);

  const close = useCallback(() => {
    setOpen(false);
    setHighlighted(-1);
  }, []);

  const select = useCallback(
    (val: string) => {
      onChange?.(val);
      close();
    },
    [onChange, close],
  );

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", keyHandler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", keyHandler);
    };
  }, [open, close]);

  useEffect(() => {
    if (!open || highlighted < 0) return;
    const items = listRef.current?.querySelectorAll("[data-opt]");
    items?.[highlighted]?.scrollIntoView({ block: "nearest" });
  }, [open, highlighted]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;
      switch (e.key) {
        case "Enter":
        case " ":
        case "ArrowDown":
          e.preventDefault();
          if (!open) {
            setOpen(true);
            const idx = selectable.findIndex((o) => o.value === value);
            setHighlighted(idx >= 0 ? idx : 0);
          } else if (e.key === "ArrowDown") {
            setHighlighted((p) => (p < selectable.length - 1 ? p + 1 : 0));
          } else if (highlighted >= 0) {
            select(selectable[highlighted].value);
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (open) setHighlighted((p) => (p > 0 ? p - 1 : selectable.length - 1));
          break;
        case "Escape":
          if (open) { e.preventDefault(); close(); }
          break;
      }
    },
    [disabled, open, selectable, highlighted, select, value, close],
  );

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => { if (!disabled) setOpen(!open); }}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={cn(
          "flex items-center justify-between gap-1 border border-border/60 bg-card text-left font-normal transition-all duration-150",
          "hover:border-border hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          "disabled:pointer-events-none disabled:opacity-50",
          SIZE_MAP[size],
          open && "border-border ring-2 ring-ring/20",
          selected ? "text-foreground" : "text-muted-foreground",
        )}
      >
        <span className="truncate">{selected?.label ?? placeholder}</span>
        <svg
          className={cn(
            "h-3 w-3 shrink-0 text-muted-foreground/60 transition-transform duration-200",
            open && "rotate-180",
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          ref={listRef}
          className={cn(
            "absolute z-50 mt-1 min-w-full overflow-hidden",
            "rounded-lg border border-border/60 bg-popover p-1 shadow-lg",
            "ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
            "animate-in fade-in-0 zoom-in-95 duration-150",
          )}
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            const idx = selectable.indexOf(opt);
            const isHighlighted = idx === highlighted;
            return (
              <button
                key={opt.value}
                type="button"
                data-opt
                disabled={opt.disabled}
                onClick={() => { if (!opt.disabled) select(opt.value); }}
                onMouseEnter={() => { if (!opt.disabled) setHighlighted(idx); }}
                className={cn(
                  "flex w-full items-center justify-between whitespace-nowrap rounded-md transition-colors duration-75",
                  OPTION_SIZE_MAP[size],
                  opt.disabled
                    ? "pointer-events-none cursor-not-allowed opacity-40"
                    : "cursor-pointer",
                  isHighlighted && !opt.disabled && "bg-accent text-accent-foreground",
                  isSelected && "bg-accent/50 font-medium text-accent-foreground",
                  !isHighlighted && !isSelected && "text-foreground",
                )}
              >
                <span className="truncate">{opt.label}</span>
                {isSelected && (
                  <svg className="h-3 w-3 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
