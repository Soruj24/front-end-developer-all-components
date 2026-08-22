"use client";
import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Download, Eraser, Pen, Trash2, Undo2 } from "lucide-react";

export interface EaselCanvasProps {
  width?: number;
  height?: number;
  onSave?: (dataUrl: string) => void;
  className?: string;
}
type Stroke = { points: number[]; color: string; size: number; erase: boolean };

const COLORS = ["#000000", "#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6", "#ec4899"];
const SHORTCUTS: [string, string][] = [["Arrows", "move brush"], ["Shift", "faster"], ["Enter", "draw"], ["Esc", "lift pen"], ["Ctrl+Z", "undo"]];
const BTN =
  "inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-40";
const ACTIVE = "bg-background text-foreground shadow-xs ring-1 ring-black/[.06] dark:ring-white/[.12]";
const SWATCH =
  "relative h-5 w-5 rounded-full transition-transform duration-150 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-checked:scale-110 aria-checked:ring-2 aria-checked:ring-foreground aria-checked:ring-offset-2 aria-checked:ring-offset-background";
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
export function EaselCanvas({ width = 800, height = 600, onSave, className = "" }: EaselCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerDrawing = useRef(false);
  const [tool, setTool] = useState<"pen" | "eraser">("pen");
  const [color, setColor] = useState(COLORS[0]);
  const [size, setSize] = useState(3);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [cursor, setCursor] = useState({ x: width / 2, y: height / 2 });
  const [penDown, setPenDown] = useState(false);
  const [showKeys, setShowKeys] = useState(false);
  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (const s of strokes) {
      ctx.globalCompositeOperation = s.erase ? "destination-out" : "source-over";
      ctx.strokeStyle = s.color;
      ctx.lineWidth = s.size;
      ctx.beginPath();
      ctx.moveTo(s.points[0], s.points[1]);
      for (let i = 2; i < s.points.length; i += 2) ctx.lineTo(s.points[i], s.points[i + 1]);
      ctx.stroke();
    }
    ctx.globalCompositeOperation = "source-over";
  }, [strokes, width, height]);
  const posOf = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * width, y: ((e.clientY - r.top) / r.height) * height };
  };
  const beginStroke = (p: { x: number; y: number }) =>
    setStrokes((s) => [...s, { points: [p.x, p.y], color, size, erase: tool === "eraser" }]);
  const appendPoint = (p: { x: number; y: number }) =>
    setStrokes((s) => {
      const last = s[s.length - 1];
      if (!last) return s;
      const n = last.points.length;
      if (Math.hypot(p.x - last.points[n - 2], p.y - last.points[n - 1]) < 1.5) return s;
      return [...s.slice(0, -1), { ...last, points: [...last.points, p.x, p.y] }];
    });
  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => { e.currentTarget.setPointerCapture(e.pointerId); pointerDrawing.current = true; beginStroke(posOf(e)); };
  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => { const p = posOf(e); setCursor(p); if (pointerDrawing.current) appendPoint(p); };
  const stopDrawing = () => { pointerDrawing.current = false; setPenDown(false); };
  const onKeyDown = (e: React.KeyboardEvent<HTMLCanvasElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") { e.preventDefault(); setStrokes((s) => s.slice(0, -1)); return; }
    const step = e.shiftKey ? 48 : 12;
    const moves: Record<string, [number, number]> = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
    const move = moves[e.key];
    if (move) {
      e.preventDefault();
      const next = { x: clamp(cursor.x + move[0], 0, width), y: clamp(cursor.y + move[1], 0, height) };
      setCursor(next);
      if (penDown) appendPoint(next);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!penDown) beginStroke(cursor);
      setPenDown(!penDown);
    } else if (e.key === "Escape") setPenDown(false);
  };
  const exportPng = () => {
    const dataUrl = canvasRef.current?.toDataURL("image/png");
    if (!dataUrl) return;
    onSave?.(dataUrl);
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "easel-canvas.png";
    link.click();
  };
  return (
    <div className={`overflow-hidden rounded-xl border border-black/[.08] bg-card shadow-xs dark:border-white/[.145] ${className}`}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-black/[.06] bg-muted/40 px-3 py-2 dark:border-white/[.1]">
        <div role="toolbar" aria-label="Drawing tools" className="flex items-center gap-1">
          <button type="button" aria-label="Pen tool" aria-pressed={tool === "pen"} onClick={() => setTool("pen")} className={`${BTN} ${tool === "pen" ? ACTIVE : ""}`}>
            <Pen className="h-4 w-4" />
          </button>
          <button type="button" aria-label="Eraser tool" aria-pressed={tool === "eraser"} onClick={() => setTool("eraser")} className={`${BTN} ${tool === "eraser" ? ACTIVE : ""}`}>
            <Eraser className="h-4 w-4" />
          </button>
        </div>
        <div aria-hidden="true" className="h-5 w-px bg-border" />
        <button type="button" aria-label="Undo stroke" onClick={() => setStrokes((s) => s.slice(0, -1))} disabled={!strokes.length} className={BTN}>
          <Undo2 className="h-4 w-4" />
        </button>
        <button type="button" aria-label="Clear canvas" onClick={() => { setStrokes([]); setPenDown(false); }} disabled={!strokes.length} className={`${BTN} hover:text-danger`}>
          <Trash2 className="h-4 w-4" />
        </button>
        <button type="button" onClick={exportPng} className="ml-auto inline-flex h-8 items-center gap-1.5 rounded-lg bg-foreground px-3 text-xs font-medium text-background shadow-xs transition-colors duration-150 hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1">
          <Download className="h-3.5 w-3.5" />
          Export PNG
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 border-b border-black/[.06] px-3 py-2.5 dark:border-white/[.1]">
        <div role="radiogroup" aria-label="Brush color" className="flex items-center gap-1.5">
          {COLORS.map((c) => (
            <button key={c} type="button" role="radio" aria-checked={color === c} aria-label={`Color ${c}`} onClick={() => setColor(c)} style={{ backgroundColor: c }} className={SWATCH}>
              {color === c && <Check aria-hidden="true" className="absolute inset-0 m-auto h-3 w-3 text-white mix-blend-difference" />}
            </button>
          ))}
        </div>
        <label className="ml-auto flex items-center gap-2.5 text-xs font-medium text-muted-foreground">
          Size
          <input type="range" min={1} max={20} value={size} aria-valuetext={`${size} pixels`} onChange={(e) => setSize(Number(e.target.value))} className="w-24 accent-primary sm:w-28" />
          <span className="w-9 font-mono text-[11px] tabular-nums">{size}px</span>
        </label>
      </div>
      <div className="relative bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-muted-foreground)_16%,transparent)_1px,transparent_1px)] [background-size:18px_18px]">
        <canvas ref={canvasRef} width={width} height={height} tabIndex={0} role="application"
          aria-label={penDown ? "Drawing canvas, pen down. Arrow keys draw, press Enter or Space to lift the pen." : "Drawing canvas. Arrow keys move the brush, press Enter or Space to start drawing."}
          onKeyDown={onKeyDown} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={stopDrawing} onPointerCancel={stopDrawing}
          className="block h-auto w-full cursor-crosshair touch-none outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring" />
        <div aria-hidden="true" className={`pointer-events-none absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-colors duration-150 ${penDown ? "border-primary opacity-100" : "border-primary/50 opacity-80"}`}
          style={{ left: `${(cursor.x / width) * 100}%`, top: `${(cursor.y / height) * 100}%` }} />
      </div>
      <div className="border-t border-black/[.06] dark:border-white/[.1]">
        <div className="flex items-center justify-between px-3 py-2 text-[11px] font-medium text-muted-foreground">
          <span className="tabular-nums">{strokes.length} {strokes.length === 1 ? "stroke" : "strokes"}</span>
          <button type="button" onClick={() => setShowKeys((v) => !v)} aria-expanded={showKeys} aria-controls="easel-shortcuts"
            className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Shortcuts
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ease-out ${showKeys ? "rotate-180" : ""}`} />
          </button>
        </div>
        <div id="easel-shortcuts" className={`grid transition-[grid-template-rows] duration-300 ease-out ${showKeys ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
          <ul className="flex min-h-0 flex-wrap gap-x-4 gap-y-1.5 overflow-hidden border-t border-black/[.06] px-3 py-2.5 text-[11px] text-muted-foreground dark:border-white/[.1]">
            {SHORTCUTS.map(([k, d]) => (
              <li key={k} className="flex items-center gap-1.5">
                <kbd className="rounded-md border bg-muted/60 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-foreground">{k}</kbd>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
