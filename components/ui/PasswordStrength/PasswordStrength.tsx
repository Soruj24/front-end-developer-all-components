"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/cn";
import type { PasswordStrengthProps, StrengthResult, Requirement } from "./PasswordStrength.types";

const REQUIREMENTS: Requirement[] = [
  { label: "8+ characters", test: (pw) => pw.length >= 8 },
  { label: "Uppercase letter", test: (pw) => /[A-Z]/.test(pw) },
  { label: "Number", test: (pw) => /[0-9]/.test(pw) },
  { label: "Special character", test: (pw) => /[^A-Za-z0-9]/.test(pw) },
];

const STRENGTH_COLORS: Record<number, string> = {
  1: "bg-red-500",
  2: "bg-orange-500",
  3: "bg-yellow-500",
  4: "bg-emerald-500",
};

function getStrength(pw: string): StrengthResult {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return {
    score,
    label: ["Weak", "Fair", "Good", "Strong"][score - 1] || "Too short",
    color: STRENGTH_COLORS[score] || "bg-muted-foreground/30",
  };
}

export function PasswordStrength({
  value,
  onChange,
  showToggle = true,
  showChecklist = true,
  placeholder = "Enter password...",
  className,
}: PasswordStrengthProps) {
  const [internalValue, setInternalValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const currentValue = value !== undefined ? value : internalValue;

  const handleChange = (next: string) => {
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  };

  const { score, label, color } = useMemo(() => getStrength(currentValue), [currentValue]);
  const met = useMemo(() => REQUIREMENTS.map((r) => r.test(currentValue)), [currentValue]);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={currentValue}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          aria-label="Password"
          className={cn(
            "flex h-11 w-full rounded-xl border border-border bg-card px-3.5 py-2.5 pr-12 text-sm text-foreground",
            "placeholder:text-muted-foreground/50",
            "transition-colors duration-150",
            "hover:border-muted-foreground/30",
            "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
          )}
        />
        {showToggle && currentValue.length > 0 && (
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2",
              "inline-flex h-7 items-center justify-center rounded-lg px-2 text-xs font-medium",
              "text-muted-foreground hover:bg-muted hover:text-foreground",
              "transition-colors duration-150",
              "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
            )}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        )}
      </div>

      {currentValue.length > 0 && (
        <>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-all duration-300",
                  i <= score ? color : "bg-muted",
                )}
              />
            ))}
          </div>

          <div className="flex items-center justify-between">
            <span className={cn("text-sm font-medium", score >= 3 ? "text-emerald-600 dark:text-emerald-400" : score >= 2 ? "text-orange-600 dark:text-orange-400" : "text-muted-foreground")}>
              {label}
            </span>
            <span className="inline-flex h-5 items-center rounded-md bg-muted px-1.5 text-xs font-medium text-muted-foreground">
              {score}/4
            </span>
          </div>
        </>
      )}

      {showChecklist && currentValue.length > 0 && (
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
          {REQUIREMENTS.map((req, i) => (
            <div
              key={req.label}
              className={cn(
                "flex items-center gap-2 text-xs transition-colors duration-150",
                met[i] ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground",
              )}
            >
              <span
                className={cn(
                  "inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-medium transition-colors duration-200",
                  met[i]
                    ? "bg-emerald-500 text-white"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {met[i] ? "✓" : "○"}
              </span>
              {req.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
