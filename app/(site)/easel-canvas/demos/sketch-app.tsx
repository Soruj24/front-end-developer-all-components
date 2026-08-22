"use client";

import { useRef, useState } from "react";
import { Download, Eraser, Pen, Trash2, Undo2 } from "lucide-react";
import { PRESET_COLORS } from "./palette";
import { useFreehandLines } from "./use-freehand";

export function SketchAppDemo() {
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const [color, setColor] = useState(PRESET_COLORS[0]);
  const [brushSize, setBrushSize] = useState(2);
  const { lines, start, extend, stop, clear, undo } = useFreehandLines();
  const svgRef = useRef<SVGSVGElement>(null);

  const ink = tool === "eraser" ? "#ffffff" : color;
  const stroke = tool === "eraser" ? 20 : brushSize;

  const exportSvg = () => {
    if (!svgRef.current || !lines.length) return;
    const blob = new Blob([svgRef.current.outerHTML], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sketch.svg";
    link.click();
    URL.revokeObjectURL(url);
  };

  const TOOL_BTN =
    "inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40";

  return (
    <div className="w-full max-w-lg overflow-hidden rounded-xl border border-black/[.08] bg-card shadow-xs dark:border-white/[.145]">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-black/[.06] bg-muted/40 px-3 py-2 dark:border-white/[.1]">
        <div role="toolbar" aria-label="Sketch tools" className="flex items-center gap-1">
          <button type="button" aria-label="Pen" aria-pressed={tool === "pen"} onClick={() => setTool("pen")} className={`${TOOL_BTN} ${tool === "pen" ? "bg-background text-foreground shadow-xs ring-1 ring-black/[.06] dark:ring-white/[.12]" : ""}`}>
            <Pen className="h-4 w-4" />
          </button>
          <button type="button" aria-label="Eraser" aria-pressed={tool === "eraser"} onClick={() => setTool("eraser")} className={`${TOOL_BTN} ${tool === "eraser" ? "bg-background text-foreground shadow-xs ring-1 ring-black/[.06] dark:ring-white/[.12]" : ""}`}>
            <Eraser className="h-4 w-4" />
          </button>
        </div>
        <div aria-hidden="true" className="h-5 w-px bg-border" />
        <div role="radiogroup" aria-label="Ink color" className="flex items-center gap-1">
          {PRESET_COLORS.slice(0, 6).map((c) => (
            <button key={c} type="button" role="radio" aria-checked={color === c} aria-label={`Color ${c}`} onClick={() => setColor(c)} style={{ backgroundColor: c }}
              className="h-5 w-5 rounded-full border border-black/10 transition-transform duration-150 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background aria-checked:scale-110 aria-checked:ring-2 aria-checked:ring-foreground dark:border-white/20" />
          ))}
        </div>
        <input
          type="range" min={1} max={8} value={brushSize} aria-label="Brush size" aria-valuetext={`${brushSize} pixels`}
          onChange={(e) => setBrushSize(Number(e.target.value))}
          className="w-16 accent-primary sm:w-20"
        />
        <div className="ml-auto flex items-center gap-1">
          <button type="button" onClick={undo} disabled={!lines.length} aria-label="Undo stroke" className={TOOL_BTN}>
            <Undo2 className="h-4 w-4" />
          </button>
          <button type="button" onClick={clear} disabled={!lines.length} aria-label="Clear sketch" className={`${TOOL_BTN} hover:text-danger`}>
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <svg
        ref={svgRef}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        role="img"
        aria-label="Sketch surface. Draw with a mouse, pen, or finger."
        onPointerDown={(e) => start(e, ink, stroke)}
        onPointerMove={extend}
        onPointerUp={stop}
        onPointerLeave={stop}
        className="block h-56 w-full cursor-crosshair touch-none bg-white outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
      >
        {lines.map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={l.color} strokeWidth={l.size} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      <div className="flex items-center justify-between border-t border-black/[.06] bg-muted/30 px-3 py-2 dark:border-white/[.1]">
        <span className="text-[11px] font-medium tabular-nums text-muted-foreground">
          {lines.length} {lines.length === 1 ? "stroke" : "strokes"}
        </span>
        <button
          type="button"
          onClick={exportSvg}
          disabled={!lines.length}
          className="inline-flex h-7 items-center gap-1.5 rounded-lg bg-foreground px-3 text-[11px] font-medium text-background shadow-xs transition-colors duration-150 hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-40"
        >
          <Download className="h-3 w-3" />
          Export SVG
        </button>
      </div>
    </div>
  );
}
