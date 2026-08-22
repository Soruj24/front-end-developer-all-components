"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { PRESET_COLORS } from "./palette";
import { useFreehandLines } from "./use-freehand";

export function DrawingCanvasDemo() {
  const [color, setColor] = useState(PRESET_COLORS[0]);
  const [brushSize, setBrushSize] = useState(3);
  const { lines, start, extend, stop, clear } = useFreehandLines();

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <div role="radiogroup" aria-label="Ink color" className="flex items-center gap-1.5">
          {PRESET_COLORS.map((c) => (
            <button
              key={c}
              type="button"
              role="radio"
              aria-checked={color === c}
              aria-label={`Color ${c}`}
              onClick={() => setColor(c)}
              style={{ backgroundColor: c }}
              className="h-5 w-5 rounded-full border border-black/10 transition-transform duration-150 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-checked:scale-110 aria-checked:ring-2 aria-checked:ring-foreground dark:border-white/20"
            />
          ))}
        </div>
        <div aria-hidden="true" className="h-4 w-px bg-border" />
        <input
          type="range"
          min={1}
          max={10}
          value={brushSize}
          onChange={(e) => setBrushSize(Number(e.target.value))}
          aria-label="Brush size"
          aria-valuetext={`${brushSize} pixels`}
          className="w-20 accent-primary sm:w-24"
        />
        <span className="font-mono text-[11px] tabular-nums text-muted-foreground">{brushSize}px</span>
        <button
          type="button"
          onClick={clear}
          disabled={!lines.length}
          aria-label="Clear drawing"
          className="ml-auto inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        role="img"
        aria-label="Drawing area. Draw with a mouse, pen, or finger."
        onPointerDown={(e) => start(e, color, brushSize)}
        onPointerMove={extend}
        onPointerUp={stop}
        onPointerLeave={stop}
        className="h-48 w-full cursor-crosshair rounded-xl border border-black/[.08] bg-white shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-white/[.145]"
      >
        {lines.map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={l.color} strokeWidth={l.size} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
    </div>
  );
}
