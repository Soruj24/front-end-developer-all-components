"use client";

import { useCallback } from "react";
import { cn } from "@/lib/cn";
import type { InputMaskProps } from "./InputMask.types";

const isDigit = (c: string) => /\d/.test(c);
const isLetter = (c: string) => /[a-zA-Z]/.test(c);
const isAlnum = (c: string) => /[a-zA-Z0-9]/.test(c);

const isPlaceholder = (c: string) => c === "9" || c === "a" || c === "*";

function matchesPlaceholder(maskChar: string, c: string): boolean {
  if (maskChar === "9") return isDigit(c);
  if (maskChar === "a") return isLetter(c);
  if (maskChar === "*") return isAlnum(c);
  return false;
}

export function InputMask({ mask, value = "", onValueChange, placeholder, className }: InputMaskProps) {
  const applyMask = useCallback(
    (input: string) => {
      let result = "";
      let idx = 0;
      for (let i = 0; i < mask.length; i++) {
        const m = mask[i];
        if (isPlaceholder(m)) {
          while (idx < input.length && !matchesPlaceholder(m, input[idx])) idx++;
          if (idx < input.length) result += input[idx++];
          else break;
        } else {
          result += m;
        }
      }
      return result;
    },
    [mask],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onValueChange?.(applyMask(e.target.value));
    },
    [applyMask, onValueChange],
  );

  return (
    <input
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={cn(
        "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-ring",
        className,
      )}
    />
  );
}
