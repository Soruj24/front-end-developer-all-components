"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/cn";
import { DEFAULT_PRESETS } from "./color-utils";
import { Swatches } from "./Swatches";

export function PresetColorsDemo() {
  const [selected, setSelected] = useState("#3b82f6");
  const [copied, setCopied] = useState(false);

  const copyColor = () => {
    navigator.clipboard.writeText(selected);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <div
        className="h-20 w-20 rounded-full border border-black/10 shadow-card transition-colors duration-300 dark:border-white/15"
        style={{ backgroundColor: selected }}
      />
      <Swatches colors={DEFAULT_PRESETS} value={selected} onValueChange={setSelected} ariaLabel="Preset colors" />
      <button
        type="button"
        onClick={copyColor}
        aria-label={`Copy color ${selected}`}
        className={cn(
          "inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 font-mono text-xs font-medium uppercase tabular-nums",
          "transition-all duration-150 ease-out active:scale-[0.97]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          copied
            ? "border-success/40 bg-success-soft text-success"
            : "border-border bg-surface text-muted-foreground hover:bg-muted hover:text-foreground hover:shadow-xs"
        )}
      >
        {copied ? <Check className="h-3 w-3" aria-hidden="true" /> : <Copy className="h-3 w-3" aria-hidden="true" />}
        {selected}
      </button>
    </div>
  );
}
