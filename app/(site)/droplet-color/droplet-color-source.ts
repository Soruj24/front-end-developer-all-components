export const DROPLET_COLOR_SOURCE = `"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ChevronDown, Pipette } from "lucide-react";

const DEFAULT_PRESETS = [
  "#ef4444", "#f97316", "#eab308", "#22c55e",
  "#3b82f6", "#8b5cf6", "#ec4899", "#06b6d4",
];

interface DropletColorProps {
  value?: string;
  onChange?: (color: string) => void;
  presets?: string[];
  className?: string;
}

export function DropletColor({
  value: controlledValue,
  onChange,
  presets = DEFAULT_PRESETS,
  className = "",
}: DropletColorProps) {
  const [internalValue, setInternalValue] = useState("#000000");
  const [customOpen, setCustomOpen] = useState(false);
  const value = controlledValue ?? internalValue;
  const swatchRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const commit = (color: string) => {
    if (controlledValue === undefined) setInternalValue(color);
    onChange?.(color);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = presets.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = Math.min(last, index + 1);
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = Math.max(0, index - 1);
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    commit(presets[next]);
    swatchRefs.current[next]?.focus();
  };

  return (
    <div
      className={\`flex w-72 max-w-full flex-col gap-5 rounded-xl border border-border bg-surface p-4 shadow-card \${className}\`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Color</span>
        <span className="rounded-full border border-border bg-muted/60 px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase tabular-nums">
          {value}
        </span>
      </div>

      <div aria-hidden="true" className="relative mx-auto h-16 w-16">
        <div
          className="h-full w-full rotate-45 rounded-[0_50%_50%_50%] border border-black/10 shadow-md transition-colors duration-300 dark:border-white/15"
          style={{ backgroundColor: value }}
        />
        <div className="absolute left-[24%] top-[34%] h-2.5 w-2.5 rounded-full bg-white/50 blur-[2px]" />
      </div>

      <div role="radiogroup" aria-label="Preset colors" className="flex flex-wrap justify-center gap-2">
        {presets.map((preset, i) => {
          const selected = preset.toLowerCase() === value.toLowerCase();
          const tabIndex = i === Math.max(presets.findIndex((c) => c.toLowerCase() === value.toLowerCase()), 0) ? 0 : -1;
          return (
            <button
              key={preset}
              ref={(el) => {
                swatchRefs.current[i] = el;
              }}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={\`Use color \${preset}\`}
              tabIndex={tabIndex}
              onClick={() => commit(preset)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              style={{ backgroundColor: preset }}
              className={\`h-7 w-7 rounded-full border shadow-xs transition-all duration-150 ease-out hover:scale-110 hover:shadow-sm active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background \${
                selected ? "scale-110 border-transparent ring-2 ring-ring ring-offset-2 ring-offset-background" : "border-black/10 dark:border-white/15"
              }\`}
            />
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setCustomOpen((open) => !open)}
        aria-expanded={customOpen}
        aria-controls="droplet-color-custom"
        className="inline-flex items-center justify-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-all duration-150 ease-out hover:bg-muted hover:text-foreground active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Custom color
        <ChevronDown
          className={\`h-3.5 w-3.5 transition-transform duration-300 ease-out \${customOpen ? "rotate-180" : ""}\`}
        />
      </button>

      <div
        id="droplet-color-custom"
        className={\`grid transition-all duration-300 ease-out \${
          customOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }\`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="flex items-center justify-center pb-1 pt-1">
            <label className="relative inline-flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-background px-3.5 py-2 text-xs font-medium shadow-xs transition-all duration-150 ease-out hover:border-input hover:shadow-sm active:scale-[0.97] focus-within:outline-none focus-within:ring-2 focus-within:ring-ring">
              <Pipette className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              Pick a color
              <input
                type="color"
                value={value}
                onChange={(e) => commit(e.target.value)}
                aria-label="Custom color"
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}`;
