"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/cn";
import { Swatches } from "./Swatches";

const BRAND_PRESETS: Record<"primary" | "secondary" | "accent", string[]> = {
  primary: ["#3b82f6", "#2563eb", "#1d4ed8", "#0ea5e9"],
  secondary: ["#8b5cf6", "#7c3aed", "#6d28d9", "#a855f7"],
  accent: ["#ec4899", "#db2777", "#d946ef", "#f43f5e"],
};

type BrandKey = keyof typeof BRAND_PRESETS;

export function BrandColorPickerDemo() {
  const [brand, setBrand] = useState<Record<BrandKey, string>>({
    primary: "#3b82f6",
    secondary: "#8b5cf6",
    accent: "#ec4899",
  });
  const [copied, setCopied] = useState("");

  const copyColor = (key: BrandKey) => {
    navigator.clipboard.writeText(brand[key]);
    setCopied(key);
    setTimeout(() => setCopied(""), 1500);
  };

  return (
    <div className="w-full max-w-md rounded-xl border border-border bg-surface p-5 shadow-card">
      <h3 className="text-sm font-semibold tracking-tight">Brand Colors</h3>
      <div className="mt-4 space-y-4">
        {(Object.keys(BRAND_PRESETS) as BrandKey[]).map((key) => (
          <div key={key} className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="w-16 text-xs font-medium capitalize text-muted-foreground">{key}</span>
            <Swatches
              size="sm"
              colors={BRAND_PRESETS[key]}
              value={brand[key]}
              onValueChange={(c) => setBrand({ ...brand, [key]: c })}
              ariaLabel={`${key} color`}
            />
            <button
              type="button"
              onClick={() => copyColor(key)}
              aria-label={`Copy ${key} color ${brand[key]}`}
              className={cn(
                "ml-auto inline-flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[10px] font-medium uppercase tabular-nums",
                "transition-all duration-150 ease-out active:scale-[0.97]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                copied === key
                  ? "border-success/40 bg-success-soft text-success"
                  : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {copied === key ? <Check className="h-2.5 w-2.5" aria-hidden="true" /> : <Copy className="h-2.5 w-2.5" aria-hidden="true" />}
              {brand[key]}
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4 overflow-hidden rounded-lg border border-border shadow-xs">
        <div className="flex h-9">
          {(["primary", "secondary", "accent"] as BrandKey[]).map((key) => (
            <div key={key} className="h-full flex-1 transition-colors duration-300" style={{ backgroundColor: brand[key] }} />
          ))}
        </div>
      </div>
    </div>
  );
}
