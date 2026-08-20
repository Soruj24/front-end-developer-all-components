"use client";

import { useCallback, useId } from "react";
import { cn } from "@/lib/cn";
import type { CheckboxProps, CheckboxSize } from "./Checkbox.types";

const sizeClasses: Record<CheckboxSize, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

const iconSizeClasses: Record<CheckboxSize, string> = {
  sm: "h-2.5 w-2.5",
  md: "h-3 w-3",
  lg: "h-3.5 w-3.5",
};

const labelSizeClasses: Record<CheckboxSize, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export function Checkbox({
  checked = false,
  onCheckedChange,
  label,
  disabled = false,
  id: idProp,
  size = "md",
  className,
}: CheckboxProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  const toggle = useCallback(() => {
    if (!disabled && onCheckedChange) onCheckedChange(!checked);
  }, [checked, disabled, onCheckedChange]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        toggle();
      }
    },
    [toggle],
  );

  return (
    <label
      htmlFor={id}
      className={cn(
        "inline-flex cursor-pointer items-center gap-2.5 select-none",
        labelSizeClasses[size],
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      <button
        id={id}
        role="checkbox"
        type="button"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={toggle}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative flex shrink-0 items-center justify-center rounded-md border transition-all duration-150",
          sizeClasses[size],
          checked
            ? "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/20"
            : "border-border bg-background hover:border-primary/50 hover:bg-muted",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "active:scale-95",
          disabled && "pointer-events-none",
        )}
      >
        {checked && (
          <svg
            className={cn("text-current", iconSizeClasses[size])}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </button>
      {label && (
        <span
          className={cn(
            "leading-none text-foreground",
            disabled && "text-muted-foreground",
          )}
        >
          {label}
        </span>
      )}
    </label>
  );
}
