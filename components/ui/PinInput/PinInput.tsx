"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/cn";
import type { PinInputProps } from "./PinInput.types";

export function PinInput({
  length = 6,
  value,
  onChange,
  onComplete,
  mask = false,
  placeholder = "",
  disabled = false,
  autoFocus = false,
  className,
}: PinInputProps) {
  const [internalValue, setInternalValue] = useState<string[]>(Array(length).fill(""));
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (autoFocus) inputRefs.current[0]?.focus();
  }, [autoFocus]);

  const handleChange = useCallback((index: number, digit: string) => {
    if (!/^\d*$/.test(digit)) return;
    const next = [...currentValue];
    next[index] = digit.slice(-1);
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
    if (digit && index < length - 1) inputRefs.current[index + 1]?.focus();
    const filled = next.filter(Boolean).length;
    if (filled === length) onComplete?.(next.join(""));
  }, [currentValue, isControlled, length, onChange, onComplete]);

  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !currentValue[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }, [currentValue]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length).split("");
    const next = [...pasted, ...Array(length - pasted.length).fill("")];
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
    inputRefs.current[Math.min(pasted.length, length - 1)]?.focus();
    if (pasted.length === length) onComplete?.(next.join(""));
  }, [length, isControlled, onChange, onComplete]);

  return (
    <div
      role="group"
      aria-label="PIN input"
      className={cn("flex items-center justify-center gap-2.5", className)}
    >
      {currentValue.map((digit, i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el; }}
          type={mask ? "password" : "text"}
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          placeholder={placeholder}
          disabled={disabled}
          aria-label={`Digit ${i + 1} of ${length}`}
          className={cn(
            "h-12 w-12 rounded-xl border bg-card text-center font-mono text-lg font-semibold tabular-nums text-foreground",
            "placeholder:text-muted-foreground/30",
            "transition-all duration-200",
            "hover:border-muted-foreground/30",
            "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
            "disabled:pointer-events-none disabled:opacity-50",
            digit
              ? "border-primary/40 bg-primary/5 shadow-sm shadow-primary/10"
              : "border-border",
          )}
        />
      ))}
    </div>
  );
}
