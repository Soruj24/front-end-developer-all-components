"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/cn";
import type { NumberInputProps } from "./NumberInput.types";

export function NumberInput({
  value,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  placeholder,
  disabled = false,
  className,
}: NumberInputProps) {
  const [internalValue, setInternalValue] = useState(value ?? 0);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const clamp = useCallback((v: number) => Math.max(min, Math.min(max, v)), [min, max]);

  const handleChange = useCallback((next: number) => {
    const clamped = clamp(next);
    if (!isControlled) setInternalValue(clamped);
    onChange?.(clamped);
  }, [clamp, isControlled, onChange]);

  const increment = useCallback(() => handleChange(currentValue + step), [currentValue, step, handleChange]);
  const decrement = useCallback(() => handleChange(currentValue - step), [currentValue, step, handleChange]);

  const atMin = currentValue <= min;
  const atMax = currentValue >= max;

  return (
    <div
      className={cn(
        "inline-flex items-center overflow-hidden rounded-xl border border-border bg-card shadow-sm",
        "transition-colors duration-150",
        disabled && "pointer-events-none opacity-50",
        className,
      )}
    >
      <button
        type="button"
        onClick={decrement}
        disabled={disabled || atMin}
        aria-label="Decrement"
        className={cn(
          "inline-flex h-11 w-11 shrink-0 items-center justify-center text-lg font-medium",
          "transition-colors duration-150",
          "text-muted-foreground hover:bg-muted hover:text-foreground",
          "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
          "active:bg-muted/80",
          "disabled:pointer-events-none disabled:opacity-40",
          "border-r border-border",
        )}
      >
        −
      </button>
      <input
        type="number"
        value={currentValue}
        onChange={(e) => handleChange(Number(e.target.value))}
        placeholder={placeholder}
        disabled={disabled}
        min={min === -Infinity ? undefined : min}
        max={max === Infinity ? undefined : max}
        step={step}
        aria-label="Number input"
        className={cn(
          "h-11 w-20 border-0 bg-transparent px-2 text-center font-mono text-sm font-medium tabular-nums text-foreground",
          "placeholder:text-muted-foreground/50",
          "focus:outline-none",
          "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
        )}
      />
      <button
        type="button"
        onClick={increment}
        disabled={disabled || atMax}
        aria-label="Increment"
        className={cn(
          "inline-flex h-11 w-11 shrink-0 items-center justify-center text-lg font-medium",
          "transition-colors duration-150",
          "text-muted-foreground hover:bg-muted hover:text-foreground",
          "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
          "active:bg-muted/80",
          "disabled:pointer-events-none disabled:opacity-40",
          "border-l border-border",
        )}
      >
        +
      </button>
    </div>
  );
}
