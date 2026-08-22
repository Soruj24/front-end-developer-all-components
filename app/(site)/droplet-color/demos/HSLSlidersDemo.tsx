"use client";

import { useState, type CSSProperties } from "react";
import { cn } from "@/lib/cn";

const RANGE_CLASSES = cn(
  "h-2 w-full cursor-pointer appearance-none rounded-full outline-none",
  "[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none",
  "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-surface",
  "[&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform",
  "[&::-webkit-slider-thumb]:hover:scale-110",
  "[&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:rounded-full",
  "[&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-surface [&::-moz-range-thumb]:shadow-md"
);

interface SliderRowProps {
  label: string;
  max: number;
  value: number;
  suffix: string;
  trackStyle: CSSProperties;
  onChange: (value: number) => void;
}

function SliderRow({ label, max, value, suffix, trackStyle, onChange }: SliderRowProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-5 shrink-0 text-xs font-semibold uppercase text-muted-foreground">{label}</span>
      <input
        type="range"
        min={0}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={`${label} channel`}
        style={trackStyle}
        className={cn(RANGE_CLASSES, "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background")}
      />
      <span className="w-10 shrink-0 text-right font-mono text-xs tabular-nums text-muted-foreground">
        {value}
        {suffix}
      </span>
    </div>
  );
}

export function HSLSlidersDemo() {
  const [hue, setHue] = useState(200);
  const [sat, setSat] = useState(80);
  const [light, setLight] = useState(50);
  const hsl = `hsl(${hue}, ${sat}%, ${light}%)`;

  return (
    <div className="w-full max-w-xs">
      <div
        className="h-16 rounded-xl border border-border shadow-card transition-colors duration-300"
        style={{ backgroundColor: hsl }}
      />
      <div className="mt-5 flex flex-col gap-4">
        <SliderRow
          label="H" max={360} value={hue} suffix="°" onChange={setHue}
          trackStyle={{ background: "linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)" }}
        />
        <SliderRow
          label="S" max={100} value={sat} suffix="%" onChange={setSat}
          trackStyle={{ background: `linear-gradient(to right, hsl(${hue},0%,${light}%), hsl(${hue},100%,${light}%))` }}
        />
        <SliderRow
          label="L" max={100} value={light} suffix="%" onChange={setLight}
          trackStyle={{ background: `linear-gradient(to right, #000, hsl(${hue},${sat}%,50%), #fff)` }}
        />
      </div>
      <div className="mt-4 rounded-lg border border-border bg-muted/50 px-3 py-2 text-center">
        <p className="font-mono text-[11px] tabular-nums text-muted-foreground">{hsl}</p>
      </div>
    </div>
  );
}
