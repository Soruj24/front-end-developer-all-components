"use client";

import { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/cn";

export interface CurrencyInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "size"> {
  currency?: string;
  symbol?: string;
  value?: string;
  onChange?: (value: string, raw: string) => void;
  size?: "sm" | "md" | "lg";
  showCurrencyCode?: boolean;
  disabled?: boolean;
}

function formatWithCommas(raw: string): string {
  const [whole = "", decimal = ""] = raw.split(".");
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decimal ? grouped + "." + decimal.slice(0, 2) : grouped;
}

const sizeStyles = {
  sm: "h-9 gap-1.5 px-3 text-sm",
  md: "h-11 gap-2 px-3.5 text-base",
  lg: "h-13 gap-2.5 px-4 text-lg",
} as const;

const symbolStyles = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
} as const;

const codeStyles = {
  sm: "text-[10px]",
  md: "text-xs",
  lg: "text-sm",
} as const;

export function CurrencyInput({
  currency = "USD",
  symbol = "$",
  placeholder = "0.00",
  value: controlledValue,
  onChange,
  size = "md",
  showCurrencyCode = true,
  disabled = false,
  className,
  id,
  ...props
}: CurrencyInputProps) {
  const [internalValue, setInternalValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const value = controlledValue ?? internalValue;
  const rawValue = value.replace(/[^0-9.]/g, "");
  const displayValue = formatWithCommas(rawValue);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/[^0-9.]/g, "");
      const [whole = "", decimal = ""] = raw.split(".");
      const clamped = decimal.length > 2 ? decimal.slice(0, 2) : decimal;
      const cleaned = clamped ? whole + "." + clamped : whole;
      setInternalValue(cleaned);
      onChange?.(cleaned, raw);
    },
    [onChange],
  );

  const handleFocus = () => inputRef.current?.select();

  return (
    <div
      className={cn(
        "group flex items-center rounded-xl border border-border bg-card transition-colors",
        "focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
        "hover:border-muted-foreground/30",
        disabled && "cursor-not-allowed opacity-50",
        sizeStyles[size],
        className,
      )}
    >
      <span
        className={cn(
          "flex-shrink-0 font-medium text-muted-foreground transition-colors",
          "group-focus-within:text-foreground",
          symbolStyles[size],
        )}
        aria-hidden="true"
      >
        {symbol}
      </span>

      <input
        ref={inputRef}
        id={id}
        type="text"
        inputMode="decimal"
        autoComplete="off"
        aria-label={`Amount in ${currency}`}
        placeholder={placeholder}
        disabled={disabled}
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        className={cn(
          "min-w-0 flex-1 bg-transparent font-mono tabular-nums text-foreground outline-none",
          "placeholder:text-muted-foreground",
          "disabled:cursor-not-allowed",
        )}
        {...props}
      />

      {showCurrencyCode && (
        <span
          className={cn(
            "flex-shrink-0 rounded-md bg-muted px-1.5 py-0.5 font-medium text-muted-foreground transition-colors",
            "group-focus-within:bg-primary/10 group-focus-within:text-primary",
            codeStyles[size],
          )}
        >
          {currency}
        </span>
      )}
    </div>
  );
}

export default CurrencyInput;
