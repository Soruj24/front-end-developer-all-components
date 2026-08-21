export const SEGMENTED_CONTROL_SOURCE = `"use client";

import { forwardRef, useRef, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/cn";

interface SegmentedControlOption { value: string; label?: string; icon?: React.ReactNode; }
type SegmentedControlSize = "sm" | "md" | "lg";

interface SegmentedControlProps {
  options: SegmentedControlOption[]; value: string; onChange: (value: string) => void;
  size?: SegmentedControlSize; className?: string;
}

const sizeStyles: Record<SegmentedControlSize, { container: string; button: string; icon: string }> = {
  sm: { container: "h-8 text-xs", button: "px-3", icon: "h-3.5 w-3.5" },
  md: { container: "h-9 text-sm", button: "px-4", icon: "h-4 w-4" },
  lg: { container: "h-11 text-base", button: "px-5", icon: "h-5 w-5" },
};

const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>(({ options, value, onChange, size = "md", className }, ref) => {
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const buttonsRef = useRef<Map<string, HTMLButtonElement>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);
  const s = sizeStyles[size];

  const updateIndicator = useCallback(() => {
    const btn = buttonsRef.current.get(value);
    const container = containerRef.current;
    if (btn && container) {
      const containerRect = container.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      setIndicator({ left: btnRect.left - containerRect.left - 2, width: btnRect.width + 4 });
    }
  }, [value]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [updateIndicator]);

  return (
    <div ref={(node) => { (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof ref === "function") ref(node); else if (ref) ref.current = node; }}
      className={cn("relative inline-flex items-center rounded-lg border border-border/60 bg-muted/50 p-1 dark:bg-muted/30", className)}
      role="radiogroup" aria-label="Segmented control">
      <span className="absolute top-1 bottom-1 z-0 rounded-md bg-background shadow-sm transition-all duration-200 ease-out"
        style={{ left: indicator.left, width: indicator.width }} aria-hidden="true" />
      {options.map((opt) => { const isActive = value === opt.value; return (
        <button key={opt.value} ref={(el) => { if (el) buttonsRef.current.set(opt.value, el); }}
          type="button" role="radio" aria-checked={isActive} aria-label={opt.label || opt.value}
          tabIndex={isActive ? 0 : -1} onClick={() => onChange(opt.value)}
          onKeyDown={(e) => { if (e.key === "ArrowLeft" || e.key === "ArrowRight") { e.preventDefault();
            const idx = options.findIndex((o) => o.value === value);
            const next = e.key === "ArrowRight" ? (idx + 1) % options.length : (idx - 1 + options.length) % options.length;
            onChange(options[next].value); } }}
          className={cn("relative z-10 flex items-center justify-center gap-1.5 rounded-md font-medium transition-colors duration-150 outline-none",
            s.container, s.button, isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground/80",
            "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-1 focus-visible:ring-offset-muted/50 rounded-md")}>
          {opt.icon && <span className={cn("shrink-0", s.icon)} aria-hidden="true">{opt.icon}</span>}
          {opt.label}
        </button>
      ); })}
    </div>
  );
});

SegmentedControl.displayName = "SegmentedControl";
export { SegmentedControl };`;

export const DEFAULT_EXAMPLE = `<SegmentedControl options={options} value={active} onChange={setActive} />`;

export const ICONS_EXAMPLE = `<SegmentedControl options={themeOptions} value={theme} onChange={setTheme} />`;

export const SIZES_EXAMPLE = `<SegmentedControl options={options} value={active} onChange={setActive} size="sm" />`;

export const ICON_ONLY_EXAMPLE = `<SegmentedControl options={iconOptions} value={view} onChange={setView} />`;
