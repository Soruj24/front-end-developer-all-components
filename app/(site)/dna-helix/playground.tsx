"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/cn";
import { DNAHelix } from "./dna-helix";

const COLOR_PRESETS = [
  { label: "Primary", color1: "fill-primary", color2: "fill-purple-500" },
  { label: "Emerald", color1: "fill-emerald-500", color2: "fill-teal-500" },
  { label: "Sunset", color1: "fill-orange-500", color2: "fill-rose-400" },
  { label: "Ocean", color1: "fill-sky-500", color2: "fill-indigo-500" },
];

function Slider({
  id,
  label,
  min,
  max,
  value,
  onChange,
}: {
  id: string;
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-center justify-between text-xs font-medium text-foreground">
        {label}
        <span className="rounded-md border border-border bg-background px-1.5 py-0.5 font-mono tabular-nums text-muted-foreground">
          {value}
        </span>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
      />
    </div>
  );
}

export function PlaygroundDemo() {
  const [numPairs, setNumPairs] = useState(12);
  const [amplitude, setAmplitude] = useState(30);
  const [preset, setPreset] = useState(0);
  const [paused, setPaused] = useState(false);

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Slider id="dna-pairs" label="Base pairs" min={4} max={24} value={numPairs} onChange={setNumPairs} />
        <Slider
          id="dna-amplitude"
          label="Amplitude"
          min={8}
          max={48}
          value={amplitude}
          onChange={setAmplitude}
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div role="group" aria-label="Color preset" className="inline-flex w-fit rounded-lg border border-border bg-background p-1">
          {COLOR_PRESETS.map((p, i) => (
            <button
              key={p.label}
              type="button"
              onClick={() => setPreset(i)}
              aria-pressed={preset === i}
              className={cn(
                "rounded-md px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                preset === i
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {p.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={!paused}
          className={cn(
            "inline-flex w-fit items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.97]",
            paused
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "border border-border bg-background text-foreground hover:bg-muted",
          )}
        >
          {paused ? (
            <Play className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <Pause className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          {paused ? "Resume" : "Pause"}
        </button>
      </div>

      <div className="flex justify-center rounded-xl border border-border bg-surface p-6 shadow-sm">
        <DNAHelix
          numPairs={numPairs}
          amplitude={amplitude}
          spacing={Math.max(12, Math.round(200 / numPairs))}
          size={6}
          paused={paused}
          color1={COLOR_PRESETS[preset].color1}
          color2={COLOR_PRESETS[preset].color2}
        />
      </div>
    </div>
  );
}
