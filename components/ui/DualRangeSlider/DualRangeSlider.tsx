"use client";

import { forwardRef, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/cn";
import type { DualRangeSliderProps } from "./DualRangeSlider.types";

type DualRangeSliderSize = "sm" | "md" | "lg";

const TRACK_SIZE: Record<DualRangeSliderSize, string> = {
  sm: "h-1.5",
  md: "h-2",
  lg: "h-2.5",
};

const THUMB_SIZE: Record<DualRangeSliderSize, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

const THUMB_CLASSES = [
  "[&::-webkit-slider-thumb]:appearance-none",
  "[&::-webkit-slider-thumb]:rounded-full",
  "[&::-webkit-slider-thumb]:border",
  "[&::-webkit-slider-thumb]:border-primary/20",
  "[&::-webkit-slider-thumb]:bg-background",
  "[&::-webkit-slider-thumb]:shadow-md",
  "[&::-webkit-slider-thumb]:shadow-black/10",
  "[&::-webkit-slider-thumb]:transition-all",
  "[&::-webkit-slider-thumb]:duration-150",
  "[&::-webkit-slider-thumb]:hover:scale-110",
  "[&::-webkit-slider-thumb]:hover:shadow-lg",
  "[&::-webkit-slider-thumb]:focus-visible:outline-none",
  "[&::-webkit-slider-thumb]:focus-visible:ring-2",
  "[&::-webkit-slider-thumb]:focus-visible:ring-primary",
  "[&::-webkit-slider-thumb]:focus-visible:ring-offset-2",
  "[&::-moz-range-thumb]:appearance-none",
  "[&::-moz-range-thumb]:rounded-full",
  "[&::-moz-range-thumb]:border",
  "[&::-moz-range-thumb]:border-primary/20",
  "[&::-moz-range-thumb]:bg-background",
  "[&::-moz-range-thumb]:shadow-md",
  "[&::-moz-range-thumb]:shadow-black/10",
  "[&::-moz-range-thumb]:transition-all",
  "[&::-moz-range-thumb]:duration-150",
  "[&::-moz-range-thumb]:hover:scale-110",
  "[&::-moz-range-thumb]:hover:shadow-lg",
  "[&::-moz-range-thumb]:focus-visible:outline-none",
  "[&::-moz-range-thumb]:focus-visible:ring-2",
  "[&::-moz-range-thumb]:focus-visible:ring-primary",
  "[&::-moz-range-thumb]:focus-visible:ring-offset-2",
] as const;

const DualRangeSlider = forwardRef<HTMLDivElement, DualRangeSliderProps>(
  (
    {
      min = 0,
      max = 100,
      step = 1,
      value,
      onChange,
      formatLabel,
      size = "md",
      showLabels = true,
      showMinMax = true,
      className,
      disabled = false,
      label = "Range slider",
    },
    ref,
  ) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const [activeThumb, setActiveThumb] = useState<"min" | "max" | null>(null);

    const pct = useCallback(
      (v: number) => Math.min(100, Math.max(0, ((v - min) / (max - min)) * 100)),
      [min, max],
    );

    const fmt = formatLabel || ((v: number) => `${v}`);

    const handleMinChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = Math.min(Number(e.target.value), value[1] - step);
        onChange([Math.max(min, v), value[1]]);
      },
      [min, step, value, onChange],
    );

    const handleMaxChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = Math.max(Number(e.target.value), value[0] + step);
        onChange([value[0], Math.min(max, v)]);
      },
      [max, step, value, onChange],
    );

    const thumbClass = cn(
      "absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent",
      ...THUMB_CLASSES,
      THUMB_SIZE[size],
      disabled && "cursor-not-allowed",
    );

    const labelCls = (which: "min" | "max") =>
      cn(
        "inline-flex items-center gap-1 rounded-md border border-border/60 bg-background px-2 py-0.5 text-sm font-semibold tabular-nums text-foreground shadow-sm transition-colors duration-150",
        activeThumb === which && "border-primary/40 bg-primary/5 text-primary",
      );

    return (
      <div
        ref={ref}
        className={cn("w-full max-w-md", disabled && "opacity-50 pointer-events-none")}
        role="group"
        aria-label={label}
      >
        {showLabels && (
          <div className="flex items-center justify-between mb-2">
            <span className={labelCls("min")}>{fmt(value[0])}</span>
            <span className="text-xs text-muted-foreground font-medium">&mdash;</span>
            <span className={labelCls("max")}>{fmt(value[1])}</span>
          </div>
        )}

        <div className="relative flex items-center py-1.5">
          <div ref={trackRef} className={cn("relative w-full rounded-full bg-muted", TRACK_SIZE[size])}>
            <div
              className="absolute inset-y-0 rounded-full bg-primary transition-none"
              style={{ left: `${pct(value[0])}%`, right: `${100 - pct(value[1])}%` }}
            />
          </div>

          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value[0]}
            onChange={handleMinChange}
            onMouseDown={() => setActiveThumb("min")}
            onMouseUp={() => setActiveThumb(null)}
            onFocus={() => setActiveThumb("min")}
            onBlur={() => setActiveThumb(null)}
            disabled={disabled}
            aria-label="Minimum value"
            aria-valuemin={min}
            aria-valuemax={value[1]}
            aria-valuenow={value[0]}
            aria-valuetext={fmt(value[0])}
            className={thumbClass}
            style={{ zIndex: 5 }}
          />

          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value[1]}
            onChange={handleMaxChange}
            onMouseDown={() => setActiveThumb("max")}
            onMouseUp={() => setActiveThumb(null)}
            onFocus={() => setActiveThumb("max")}
            onBlur={() => setActiveThumb(null)}
            disabled={disabled}
            aria-label="Maximum value"
            aria-valuemin={value[0]}
            aria-valuemax={max}
            aria-valuenow={value[1]}
            aria-valuetext={fmt(value[1])}
            className={thumbClass}
            style={{ zIndex: 6 }}
          />
        </div>

        {showMinMax && (
          <div className="mt-1.5 flex justify-between text-xs text-muted-foreground">
            <span className="tabular-nums">{fmt(min)}</span>
            <span className="tabular-nums">{fmt(max)}</span>
          </div>
        )}
      </div>
    );
  },
);

DualRangeSlider.displayName = "DualRangeSlider";

export default DualRangeSlider;
