"use client";

import { useState, useCallback, useRef } from "react";
import { cn } from "@/lib/cn";
import type { ColorPickerProps, ColorPickerSize } from "./ColorPicker.types";

const SWATCHES = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#6b7280",
  "#000000",
];

const swatchSize: Record<ColorPickerSize, string> = {
  sm: "h-7 w-7",
  md: "h-9 w-9",
  lg: "h-10 w-10",
};

const previewSize: Record<ColorPickerSize, string> = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-14 w-14",
};

function CopyIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

export function ColorPicker({
  defaultColor = "#3b82f6",
  onChange,
  size = "md",
  className,
}: ColorPickerProps) {
  const [color, setColor] = useState(defaultColor);
  const [hex, setHex] = useState(defaultColor);
  const [history, setHistory] = useState<string[]>([
    defaultColor,
    "#ef4444",
    "#22c55e",
  ]);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const select = useCallback(
    (c: string) => {
      setColor(c);
      setHex(c);
      onChange?.(c);
    },
    [onChange],
  );

  const handleHex = useCallback(
    (value: string) => {
      setHex(value);
      if (/^#[0-9a-f]{6}$/i.test(value)) select(value);
    },
    [select],
  );

  const saveToHistory = useCallback(() => {
    if (color && !history.includes(color)) {
      setHistory((h) => [color, ...h].slice(0, 8));
    }
  }, [color, history]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [color]);

  return (
    <div className={cn("flex w-full flex-col gap-5", className)}>
      {/* Preview + Input */}
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "shrink-0 rounded-xl border border-border shadow-sm transition-all duration-150",
            previewSize[size],
          )}
          style={{ backgroundColor: color }}
        />
        <div className="relative flex-1">
          <input
            ref={inputRef}
            value={hex}
            onChange={(e) => handleHex(e.target.value)}
            placeholder="#000000"
            aria-label="Hex color value"
            className={cn(
              "w-full rounded-xl border border-border bg-background px-3 pr-9 font-mono text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground",
              "focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
              size === "sm" && "py-1.5 text-xs",
              size === "md" && "py-2",
              size === "lg" && "py-2.5",
            )}
          />
          <button
            type="button"
            onClick={copyToClipboard}
            aria-label="Copy hex value"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </button>
        </div>
        <button
          type="button"
          onClick={saveToHistory}
          className={cn(
            "inline-flex shrink-0 items-center rounded-xl border border-border bg-background px-3.5 text-sm font-medium text-foreground shadow-sm transition-all hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.97]",
            size === "sm" && "py-1 text-xs",
            size === "md" && "py-2",
            size === "lg" && "py-2.5",
          )}
        >
          Save
        </button>
      </div>

      {/* Swatches */}
      <div className="flex flex-wrap gap-2">
        {SWATCHES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => select(c)}
            aria-label={`Select ${c}`}
            aria-pressed={color === c}
            className={cn(
              "rounded-full border-2 transition-all duration-150 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-95",
              swatchSize[size],
              color === c
                ? "border-foreground scale-110 shadow-md"
                : "border-transparent hover:border-border",
            )}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            History
          </p>
          <div className="flex flex-wrap gap-1.5">
            {history.map((c, i) => (
              <button
                key={`${c}-${i}`}
                type="button"
                onClick={() => select(c)}
                aria-label={`Select ${c} from history`}
                className="h-6 w-6 rounded-md border border-border shadow-sm transition-all hover:scale-110 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
