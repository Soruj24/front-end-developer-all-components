"use client";

import { useState } from "react";
import { useFreehandLines } from "./use-freehand";

const WIREFRAME = [
  { label: "Header", x: 10, y: 10, w: 30, h: 25 },
  { label: "Nav", x: 55, y: 10, w: 32, h: 25 },
  { label: "Content", x: 10, y: 45, w: 77, h: 32 },
];

const MARKUP_COLORS = ["#3b82f6", "#22c55e", "#ef4444", "#000000"];

export function WhiteboardDemo() {
  const [color, setColor] = useState(MARKUP_COLORS[0]);
  const { lines, start, extend, stop } = useFreehandLines();

  return (
    <div className="w-full max-w-lg overflow-hidden rounded-xl border border-black/[.08] bg-card shadow-xs dark:border-white/[.145]">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-black/[.06] bg-muted/40 px-3 py-2 dark:border-white/[.1]">
        <h3 className="text-sm font-semibold">Wireframe Sketch</h3>
        <div role="radiogroup" aria-label="Markup color" className="flex items-center gap-1.5">
          {MARKUP_COLORS.map((c) => (
            <button key={c} type="button" role="radio" aria-checked={color === c} aria-label={`Markup color ${c}`} onClick={() => setColor(c)} style={{ backgroundColor: c }}
              className="h-5 w-5 rounded-full border border-black/10 transition-transform duration-150 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background aria-checked:scale-110 aria-checked:ring-2 aria-checked:ring-foreground dark:border-white/20" />
          ))}
        </div>
      </div>
      <div className="relative">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          role="img"
          aria-label="Wireframe sketch area. Draw annotations with a mouse, pen, or finger."
          onPointerDown={(e) => start(e, color, 2)}
          onPointerMove={extend}
          onPointerUp={stop}
          onPointerLeave={stop}
          className="block h-48 w-full cursor-crosshair touch-none bg-white outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
        >
          {WIREFRAME.map((s) => (
            <rect key={s.label} x={s.x} y={s.y} width={s.w} height={s.h} fill="none" stroke="currentColor" strokeWidth={1.5} strokeDasharray="3" vectorEffect="non-scaling-stroke" className="text-muted-foreground/50" />
          ))}
          {lines.map((l, i) => (
            <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={l.color} strokeWidth={l.size} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          ))}
        </svg>
        {WIREFRAME.map((s) => (
          <span
            key={s.label}
            aria-hidden="true"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: `${s.w}%`, height: `${s.h}%` }}
            className="pointer-events-none absolute flex items-center justify-center text-[10px] font-medium uppercase tracking-wide text-muted-foreground"
          >
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}
