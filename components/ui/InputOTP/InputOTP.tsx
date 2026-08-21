"use client";

import { useRef, useCallback } from "react";
import { cn } from "@/lib/cn";
import type { InputOTPProps } from "./InputOTP.types";

export function InputOTP({ length = 6, value = "", onValueChange, className }: InputOTPProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = useCallback(
    (index: number, digit: string) => {
      if (!/^\d*$/.test(digit)) return;
      const chars = value.split("");
      chars[index] = digit;
      const next = chars.join("").slice(0, length);
      onValueChange?.(next);
      if (digit && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [value, length, onValueChange],
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent) => {
      if (e.key === "Backspace" && !value[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [value],
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
      onValueChange?.(pasted);
      const focusIndex = Math.min(pasted.length, length - 1);
      inputRefs.current[focusIndex]?.focus();
    },
    [length, onValueChange],
  );

  return (
    <div className={cn("flex gap-2", className)} role="group" aria-label={`One-time password, ${length} digits`}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          aria-label={`Digit ${i + 1}`}
          autoComplete="one-time-code"
          value={value[i] ?? ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className={cn(
            "h-12 w-10 rounded-xl border border-border bg-card text-center text-lg font-semibold text-foreground",
            "transition-all duration-200",
            "placeholder:text-muted-foreground/50",
            "hover:border-muted-foreground/30",
            "focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none",
            "aria-[value]:border-primary/60 aria-[value]:bg-primary/5",
          )}
        />
      ))}
    </div>
  );
}
