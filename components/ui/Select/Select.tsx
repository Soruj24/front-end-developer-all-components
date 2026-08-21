"use client";

import { forwardRef, useId } from "react";
import { cn } from "@/lib/cn";
import type { SelectProps } from "./Select.types";

const ChevronIcon = () => (
  <svg className="pointer-events-none h-4 w-4 text-muted-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      placeholder,
      options,
      value,
      defaultValue,
      onChange,
      disabled = false,
      required = false,
      className,
      name,
      id,
      ...props
    },
    ref,
  ) => {
    const uid = useId();
    const selectId = id ?? uid;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className={cn(
              "text-sm font-medium text-foreground",
              disabled && "opacity-50",
            )}
          >
            {label}
            {required && <span className="ml-0.5 text-destructive">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            name={name}
            value={value}
            defaultValue={defaultValue}
            onChange={(e) => onChange?.(e.target.value)}
            disabled={disabled}
            required={required}
            className={cn(
              "flex h-11 w-full appearance-none rounded-xl border bg-card px-3.5 pr-10 text-sm text-foreground",
              "transition-colors duration-150",
              "hover:border-muted-foreground/30",
              "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
              "disabled:pointer-events-none disabled:opacity-50",
              error
                ? "border-destructive focus-visible:ring-destructive/20"
                : "border-border",
              className,
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ChevronIcon />
          </div>
        </div>
        {error && (
          <p className="text-xs text-destructive">{error}</p>
        )}
      </div>
    );
  },
);
Select.displayName = "Select";
