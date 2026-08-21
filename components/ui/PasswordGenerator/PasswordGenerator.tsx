"use client";

import { useState, useCallback, useId } from "react";
import { cn } from "@/lib/cn";
import { Copy, Check, RefreshCw, Shield } from "lucide-react";
import type { PasswordGeneratorProps } from "./PasswordGenerator.types";

const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMS = "0123456789";
const SYMS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

function generate(length: number, opts: { uppercase: boolean; numbers: boolean; symbols: boolean }) {
  let chars = LOWER;
  if (opts.uppercase) chars += UPPER;
  if (opts.numbers) chars += NUMS;
  if (opts.symbols) chars += SYMS;
  let pw = "";
  for (let i = 0; i < length; i++) {
    pw += chars[Math.floor(Math.random() * chars.length)];
  }
  return pw;
}

function getStrength(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (pw.length >= 16) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 2) return { label: "Weak", color: "bg-red-500", segments: 1 as const };
  if (score <= 4) return { label: "Medium", color: "bg-amber-500", segments: 2 as const };
  return { label: "Strong", color: "bg-emerald-500", segments: 3 as const };
}

const CHECKBOX_CLASSES = cn(
  "h-4 w-4 rounded border-border/60 bg-background text-primary",
  "transition-colors duration-150",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
  "disabled:cursor-not-allowed disabled:opacity-40",
);

export default function PasswordGenerator({
  length: initLength = 12,
  includeUppercase = true,
  includeNumbers = true,
  includeSymbols = false,
  showOptions = true,
  showStrength = true,
  className,
  onGenerate,
}: PasswordGeneratorProps) {
  const id = useId();
  const [length, setLength] = useState(initLength);
  const [opts, setOpts] = useState({
    uppercase: includeUppercase,
    numbers: includeNumbers,
    symbols: includeSymbols,
  });
  const [pw, setPw] = useState(() => generate(initLength, { uppercase: includeUppercase, numbers: includeNumbers, symbols: includeSymbols }));
  const [copied, setCopied] = useState(false);

  const strength = getStrength(pw);

  const regenerate = useCallback(() => {
    const next = generate(length, opts);
    setPw(next);
    onGenerate?.(next);
  }, [length, opts, onGenerate]);

  const copy = async () => {
    await navigator.clipboard.writeText(pw);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLengthChange = (v: number) => {
    setLength(v);
    const next = generate(v, opts);
    setPw(next);
    onGenerate?.(next);
  };

  const toggleOpt = (key: keyof typeof opts) => {
    const next = { ...opts, [key]: !opts[key] };
    setOpts(next);
    const nextPw = generate(length, next);
    setPw(nextPw);
    onGenerate?.(nextPw);
  };

  return (
    <div className={cn("w-full max-w-md space-y-4", className)}>
      <div className="rounded-xl border border-border/60 bg-background shadow-sm transition-shadow duration-200 focus-within:border-primary/40 focus-within:shadow-md focus-within:shadow-primary/5">
        <div className="flex items-center gap-2 px-4 py-3">
          <Shield className="h-4 w-4 shrink-0 text-muted-foreground" />
          <code className="flex-1 min-w-0 font-mono text-sm break-all leading-relaxed text-foreground select-all">
            {pw}
          </code>
          <button
            type="button"
            onClick={copy}
            className={cn(
              "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-150",
              "text-muted-foreground hover:bg-muted hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
              "active:scale-[0.95]",
            )}
            aria-label={copied ? "Copied" : "Copy password"}
          >
            {copied ? (
              <Check className="h-4 w-4 text-emerald-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
          <button
            type="button"
            onClick={regenerate}
            className={cn(
              "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-150",
              "text-muted-foreground hover:bg-muted hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
              "active:scale-[0.95]",
            )}
            aria-label="Regenerate password"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>

        {showStrength && (
          <div className="border-t border-border/40 px-4 py-2.5">
            <div className="flex items-center gap-3">
              <div className="flex flex-1 gap-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={`seg-${i}`}
                    className={cn(
                      "h-1.5 flex-1 rounded-full transition-colors duration-300",
                      i <= strength.segments ? strength.color : "bg-muted",
                    )}
                  />
                ))}
              </div>
              <span className={cn(
                "text-xs font-semibold tabular-nums",
                strength.label === "Weak" && "text-red-600",
                strength.label === "Medium" && "text-amber-600",
                strength.label === "Strong" && "text-emerald-600",
              )}>
                {strength.label}
              </span>
            </div>
          </div>
        )}
      </div>

      {showOptions && (
        <div className="space-y-4 rounded-xl border border-border/60 bg-background p-4 shadow-sm">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor={`${id}-length`}
                className="text-sm font-medium text-foreground"
              >
                Length
              </label>
              <span className="inline-flex h-6 min-w-[2rem] items-center justify-center rounded-md bg-muted px-2 text-xs font-semibold tabular-nums text-foreground">
                {length}
              </span>
            </div>
            <input
              id={`${id}-length`}
              type="range"
              min={8}
              max={64}
              value={length}
              onChange={(e) => handleLengthChange(Number(e.target.value))}
              className={cn(
                "h-2 w-full cursor-pointer appearance-none rounded-full bg-muted",
                "[&::-webkit-slider-thumb]:appearance-none",
                "[&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5",
                "[&::-webkit-slider-thumb]:rounded-full",
                "[&::-webkit-slider-thumb]:border",
                "[&::-webkit-slider-thumb]:border-primary/20",
                "[&::-webkit-slider-thumb]:bg-background",
                "[&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:shadow-black/10",
                "[&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150",
                "[&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:hover:shadow-lg",
                "[&::-webkit-slider-thumb]:focus-visible:outline-none",
                "[&::-webkit-slider-thumb]:focus-visible:ring-2",
                "[&::-webkit-slider-thumb]:focus-visible:ring-primary",
                "[&::-webkit-slider-thumb]:focus-visible:ring-offset-2",
                "[&::-moz-range-thumb]:appearance-none",
                "[&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5",
                "[&::-moz-range-thumb]:rounded-full",
                "[&::-moz-range-thumb]:border",
                "[&::-moz-range-thumb]:border-primary/20",
                "[&::-moz-range-thumb]:bg-background",
                "[&::-moz-range-thumb]:shadow-md [&&::-moz-range-thumb]:shadow-black/10",
                "[&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:duration-150",
                "[&::-moz-range-thumb]:hover:scale-110 [&::-moz-range-thumb]:hover:shadow-lg",
                "[&::-moz-range-thumb]:focus-visible:outline-none",
                "[&::-moz-range-thumb]:focus-visible:ring-2",
                "[&::-moz-range-thumb]:focus-visible:ring-primary",
                "[&::-moz-range-thumb]:focus-visible:ring-offset-2",
              )}
            />
            <div className="flex justify-between text-[10px] text-muted-foreground tabular-nums">
              <span>8</span>
              <span>64</span>
            </div>
          </div>

          <div className="space-y-2.5">
            <p className="text-sm font-medium text-foreground">Character Sets</p>
            {(["uppercase", "numbers", "symbols"] as const).map((key) => (
              <label
                key={key}
                htmlFor={`${id}-${key}`}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-2 py-1.5 -mx-2 transition-colors duration-150",
                  "cursor-pointer hover:bg-muted/60",
                )}
              >
                <input
                  id={`${id}-${key}`}
                  type="checkbox"
                  checked={opts[key]}
                  onChange={() => toggleOpt(key)}
                  className={CHECKBOX_CLASSES}
                />
                <span className="text-sm text-foreground">
                  {key === "uppercase" ? "Uppercase (A-Z)" : key === "numbers" ? "Numbers (0-9)" : "Symbols (!@#$...)"}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
