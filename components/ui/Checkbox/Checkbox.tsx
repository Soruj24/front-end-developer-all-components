"use client";

import { useCallback, useId } from "react";
import { cn } from "@/lib/cn";
import type { CheckboxProps } from "./Checkbox.types";

export function Checkbox({
  checked = false,
  onCheckedChange,
  label,
  disabled = false,
  id: idProp,
  className,
}: CheckboxProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  const toggle = useCallback(() => {
    if (!disabled && onCheckedChange) onCheckedChange(!checked);
  }, [checked, disabled, onCheckedChange]);

  return (
    <label
      htmlFor={id}
      className={cn(
        "inline-flex cursor-pointer items-center gap-2 text-sm",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      <button
        id={id}
        role="checkbox"
        type="button"
        aria-checked={checked}
        disabled={disabled}
        onClick={toggle}
        className={cn(
          "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
          checked
            ? "border-blue-600 bg-blue-600"
            : "border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-900",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        )}
      >
        {checked && (
          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>
      {label && <span>{label}</span>}
    </label>
  );
}
