"use client";

import { forwardRef, InputHTMLAttributes, useCallback, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type SliderSize = "sm" | "md" | "lg";

const TRACK_SIZE: Record<SliderSize, string> = {
  sm: "h-1.5",
  md: "h-2",
  lg: "h-2.5",
};

const THUMB_SIZE: Record<SliderSize, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

export interface SliderProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  size?: SliderSize;
  showValue?: boolean;
  showMarks?: boolean;
  marks?: { value: number; label?: string }[];
}

const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      size = "md",
      showValue,
      showMarks,
      marks,
      min = 0,
      max = 100,
      step = 1,
      value,
      disabled,
      onChange,
      ...props
    },
    ref,
  ) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const [internalValue, setInternalValue] = useState<number>(
      value ?? Number(props.defaultValue) ?? 50,
    );

    const currentValue = value ?? internalValue;
    const minNum = Number(min);
    const maxNum = Number(max);
    const percent = Math.min(
      100,
      Math.max(0, ((currentValue - minNum) / (maxNum - minNum)) * 100),
    );

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = parseFloat(e.target.value);
        setInternalValue(v);
        onChange?.(e);
      },
      [onChange],
    );

    return (
      <div className={cn("flex flex-col gap-2", className)}>
        {/* Label row */}
        {(showValue || showMarks) && (
          <div className="flex items-center justify-between">
            {showValue && (
              <span className="text-sm font-medium tabular-nums text-foreground">
                {currentValue}
              </span>
            )}
            {showMarks && (
              <span className="text-xs text-muted-foreground">
                {minNum} — {maxNum}
              </span>
            )}
          </div>
        )}

        {/* Slider */}
        <div className="relative flex items-center">
          {/* Track background */}
          <div
            ref={trackRef}
            className={cn(
              "relative w-full rounded-full bg-muted",
              TRACK_SIZE[size],
              disabled && "opacity-50",
            )}
          >
            {/* Fill */}
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-primary transition-none"
              style={{ width: `${percent}%` }}
            />
          </div>

          {/* Input */}
          <input
            ref={ref}
            type="range"
            min={min}
            max={max}
            step={step}
            value={currentValue}
            onChange={handleChange}
            disabled={disabled}
            className={cn(
              "absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent",
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
              "[&::-moz-range-thumb]:rounded-full",
              "[&::-moz-range-thumb]:border",
              "[&::-moz-range-thumb]:border-primary/20",
              "[&::-moz-range-thumb]:bg-background",
              "[&::-moz-range-thumb]:shadow-md",
              "[&::-moz-range-thumb]:shadow-black/10",
              "[&::-moz-range-thumb]:hover:scale-110",
              "[&::-moz-range-thumb]:focus-visible:outline-none",
              "[&::-moz-range-thumb]:focus-visible:ring-2",
              "[&::-moz-range-thumb]:focus-visible:ring-primary",
              "[&::-moz-range-thumb]:focus-visible:ring-offset-2",
              "[&::-moz-range-track]:bg-transparent",
              "[&::-moz-range-track]:h-0",
              "[&::-moz-range-track]:border-0",
              THUMB_SIZE[size],
              disabled &&
                "[&::-webkit-slider-thumb]:pointer-events-none [&::-webkit-slider-thumb]:opacity-50 [&::-moz-range-thumb]:pointer-events-none [&::-moz-range-thumb]:opacity-50",
            )}
            aria-valuemin={minNum}
            aria-valuemax={maxNum}
            aria-valuenow={currentValue}
            aria-label={props["aria-label"] ?? "Slider"}
            {...props}
          />
        </div>

        {/* Marks */}
        {showMarks && marks && marks.length > 0 && (
          <div className="relative mt-1 flex justify-between">
            {marks.map((mark) => {
              const markPercent =
                ((mark.value - minNum) / (maxNum - minNum)) * 100;
              return (
                <div
                  key={mark.value}
                  className="flex flex-col items-center"
                  style={{ position: "absolute", left: `${markPercent}%`, transform: "translateX(-50%)" }}
                >
                  <div className="h-1.5 w-0.5 rounded-full bg-border" />
                  {mark.label && (
                    <span className="mt-1 text-[10px] text-muted-foreground">
                      {mark.label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  },
);

Slider.displayName = "Slider";

export default Slider;
export { Slider };
