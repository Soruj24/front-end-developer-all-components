"use client";

import { useState, useRef, useCallback } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Pen,
  Eraser,
  Download,
  RotateCcw,
  Palette,
  Square,
  Circle,
  Minus,
  Type,
  MousePointer,
  Check,
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  Trash2,
} from "lucide-react";

const installCommand = `npx component-library@latest add easel-canvas`;
const usageCode = `import { EaselCanvas } from "@/components/easel-canvas";

<EaselCanvas
  width={800}
  height={600}
  onSave={(dataUrl) => saveImage(dataUrl)}
/>`;

const presetColors = [
  "#000000", "#ef4444", "#f97316", "#eab308",
  "#22c55e", "#3b82f6", "#8b5cf6", "#ec4899",
];

function DrawingCanvasDemo() {
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(3);
  const [lines, setLines] = useState<{ x1: number; y1: number; x2: number; y2: number; color: string; size: number }[]>([]);
  const [drawing, setDrawing] = useState(false);

  const getPos = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          {presetColors.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`h-5 w-5 rounded-full border-2 transition-transform ${
                color === c ? "border-foreground scale-110" : "border-transparent"
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
        <div className="h-4 w-px bg-muted" />
        <input
          type="range"
          min={1}
          max={10}
          value={brushSize}
          onChange={(e) => setBrushSize(Number(e.target.value))}
          className="w-20 accent-primary"
        />
        <span className="text-[10px] text-muted-foreground">{brushSize}px</span>
        <button onClick={() => setLines([])} className="rounded-md p-1.5 hover:bg-muted">
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>
      <svg
        className="w-full max-w-md h-48 rounded-lg border border-black/[.08] bg-white cursor-crosshair dark:border-white/[.145]"
        onMouseDown={(e) => { setDrawing(true); const p = getPos(e); setLines((l) => [...l, { x1: p.x, y1: p.y, x2: p.x, y2: p.y, color, size: brushSize }]); }}
        onMouseMove={(e) => { if (!drawing) return; const p = getPos(e); setLines((l) => { const last = l[l.length - 1]; if (!last) return l; return [...l.slice(0, -1), { ...last, x2: p.x, y2: p.y }]; }); }}
        onMouseUp={() => setDrawing(false)}
        onMouseLeave={() => setDrawing(false)}
      >
        {lines.map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={l.color} strokeWidth={l.size} strokeLinecap="round" />
        ))}
      </svg>
    </div>
  );
}

function ToolPaletteDemo() {
  const [tool, setTool] = useState("pen");
  const tools = [
    { id: "select", icon: MousePointer, label: "Select" },
    { id: "pen", icon: Pen, label: "Pen" },
    { id: "eraser", icon: Eraser, label: "Eraser" },
    { id: "rect", icon: Square, label: "Rectangle" },
    { id: "circle", icon: Circle, label: "Circle" },
    { id: "line", icon: Minus, label: "Line" },
    { id: "text", icon: Type, label: "Text" },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-1">
        {tools.map((t) => (
          <button
            key={t.id}
            onClick={() => setTool(t.id)}
            className={`flex flex-col items-center gap-1 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
              tool === t.id
                ? "bg-foreground text-background shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <t.icon className="h-4 w-4" />
            <span>{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ColorPaletteDemo() {
  const [selected, setSelected] = useState("#3b82f6");
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        {presetColors.map((c) => (
          <button
            key={c}
            onClick={() => setSelected(c)}
            className={`h-8 w-8 rounded-lg border-2 transition-all ${
              selected === c ? "border-foreground scale-110 shadow" : "border-transparent"
            }`}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Palette className="h-3 w-3" />
        <span className="font-mono">{selected}</span>
      </div>
    </div>
  );
}

function SketchAppDemo() {
  const [tool, setTool] = useState("pen");
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(2);
  const [lines, setLines] = useState<{ x1: number; y1: number; x2: number; y2: number; color: string; size: number }[]>([]);
  const [drawing, setDrawing] = useState(false);

  const getPos = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  return (
    <div className="w-full max-w-lg">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="flex items-center justify-between border-b border-black/[.06] px-4 py-2 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            {[
              { id: "pen", icon: Pen },
              { id: "eraser", icon: Eraser },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTool(t.id)}
                className={`rounded-md p-1.5 transition-colors ${
                  tool === t.id ? "bg-foreground text-background" : "hover:bg-muted"
                }`}
              >
                <t.icon className="h-4 w-4" />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {presetColors.slice(0, 6).map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`h-5 w-5 rounded-full border-2 ${
                    color === c ? "border-foreground" : "border-transparent"
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
            <input
              type="range"
              min={1}
              max={8}
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-16 accent-primary"
            />
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setLines(lines.slice(0, -1))} className="rounded-md p-1.5 hover:bg-muted">
              <Undo2 className="h-4 w-4" />
            </button>
            <button onClick={() => setLines([])} className="rounded-md p-1.5 hover:bg-muted">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        <svg
          className="w-full h-56 bg-white cursor-crosshair"
          onMouseDown={(e) => { setDrawing(true); const p = getPos(e); setLines((l) => [...l, { x1: p.x, y1: p.y, x2: p.x, y2: p.y, color: tool === "eraser" ? "#ffffff" : color, size: tool === "eraser" ? 20 : brushSize }]); }}
          onMouseMove={(e) => { if (!drawing) return; const p = getPos(e); setLines((l) => { const last = l[l.length - 1]; if (!last) return l; return [...l.slice(0, -1), { ...last, x2: p.x, y2: p.y }]; }); }}
          onMouseUp={() => setDrawing(false)}
          onMouseLeave={() => setDrawing(false)}
        >
          {lines.map((l, i) => (
            <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={l.color} strokeWidth={l.size} strokeLinecap="round" />
          ))}
        </svg>
        <div className="flex items-center justify-between border-t border-black/[.06] px-4 py-2 dark:border-white/[.1]">
          <span className="text-[10px] text-muted-foreground">{lines.length} strokes</span>
          <button className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-[10px] font-medium text-background hover:bg-foreground/90">
            <Download className="h-3 w-3" />
            Export
          </button>
        </div>
      </div>
    </div>
  );
}

function WhiteboardDemo() {
  const [lines, setLines] = useState<{ x1: number; y1: number; x2: number; y2: number; color: string; size: number }[]>([]);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("#3b82f6");

  const getPos = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const shapes = [
    { type: "rect", x: 30, y: 20, w: 80, h: 50, label: "Header" },
    { type: "rect", x: 150, y: 20, w: 80, h: 50, label: "Nav" },
    { type: "rect", x: 30, y: 100, w: 200, h: 60, label: "Content" },
  ];

  return (
    <div className="w-full max-w-lg">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="flex items-center justify-between border-b border-black/[.06] px-4 py-2 dark:border-white/[.1]">
          <h3 className="text-sm font-semibold">Wireframe Sketch</h3>
          <div className="flex items-center gap-2">
            {["#3b82f6", "#22c55e", "#ef4444", "#000000"].map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`h-5 w-5 rounded-full border-2 ${
                  color === c ? "border-foreground" : "border-transparent"
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
        <svg
          className="w-full h-48 bg-white cursor-crosshair"
          onMouseDown={(e) => { setDrawing(true); const p = getPos(e); setLines((l) => [...l, { x1: p.x, y1: p.y, x2: p.x, y2: p.y, color, size: 2 }]); }}
          onMouseMove={(e) => { if (!drawing) return; const p = getPos(e); setLines((l) => { const last = l[l.length - 1]; if (!last) return l; return [...l.slice(0, -1), { ...last, x2: p.x, y2: p.y }]; }); }}
          onMouseUp={() => setDrawing(false)}
          onMouseLeave={() => setDrawing(false)}
        >
          {shapes.map((s, i) => (
            <g key={i}>
              <rect x={s.x} y={s.y} width={s.w} height={s.h} fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4" />
              <text x={s.x + s.w / 2} y={s.y + s.h / 2} textAnchor="middle" dominantBaseline="middle" className="fill-muted-foreground text-[10px]">{s.label}</text>
            </g>
          ))}
          {lines.map((l, i) => (
            <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={l.color} strokeWidth={l.size} strokeLinecap="round" />
          ))}
        </svg>
      </div>
    </div>
  );
}

function DiagramToolDemo() {
  const [shapes, setShapes] = useState<{ type: string; x: number; y: number; color: string }[]>([
    { type: "rect", x: 40, y: 30, color: "#3b82f6" },
    { type: "circle", x: 140, y: 30, color: "#22c55e" },
    { type: "rect", x: 90, y: 100, color: "#8b5cf6" },
  ]);

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card p-4 shadow-sm dark:border-white/[.145]">
        <h3 className="mb-3 text-sm font-semibold">Flow Diagram</h3>
        <div className="relative h-32 rounded-lg border border-dashed border-black/[.15] bg-white dark:border-white/[.2]">
          {shapes.map((s, i) => (
            <div
              key={i}
              className="absolute flex items-center justify-center rounded-lg border-2 text-[10px] font-medium text-white shadow-sm"
              style={{
                left: s.x,
                top: s.y,
                width: 60,
                height: 40,
                backgroundColor: s.color,
                borderColor: s.color,
              }}
            >
              {i === 0 ? "Start" : i === 1 ? "Process" : "End"}
            </div>
          ))}
          <svg className="absolute inset-0 h-full w-full">
            <line x1={100} y1={50} x2={140} y2={50} stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <line x1={170} y1={70} x2={120} y2={100} stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <defs>
              <marker id="arrow" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6" fill="#94a3b8" />
              </marker>
            </defs>
          </svg>
        </div>
        <div className="mt-3 flex gap-2">
          {["#3b82f6", "#22c55e", "#8b5cf6", "#ef4444"].map((c) => (
            <button key={c} className="h-6 w-6 rounded-md border-2 border-white shadow-sm" style={{ backgroundColor: c }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SignaturePadDemo() {
  const [lines, setLines] = useState<{ x1: number; y1: number; x2: number; y2: number }[]>([]);
  const [drawing, setDrawing] = useState(false);
  const [signed, setSigned] = useState(false);

  const getPos = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
        <h3 className="mb-2 text-sm font-semibold">Sign Here</h3>
        <div className="relative">
          <svg
            className="w-full h-24 rounded-lg border border-dashed border-black/[.20] bg-white cursor-crosshair dark:border-white/[.2]"
            onMouseDown={(e) => { setDrawing(true); setSigned(false); const p = getPos(e); setLines((l) => [...l, { x1: p.x, y1: p.y, x2: p.x, y2: p.y }]); }}
            onMouseMove={(e) => { if (!drawing) return; const p = getPos(e); setLines((l) => { const last = l[l.length - 1]; if (!last) return l; return [...l.slice(0, -1), { ...last, x2: p.x, y2: p.y }]; }); }}
            onMouseUp={() => { setDrawing(false); if (lines.length > 0) setSigned(true); }}
            onMouseLeave={() => setDrawing(false)}
          >
            {lines.map((l, i) => (
              <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#000000" strokeWidth={2} strokeLinecap="round" />
            ))}
          </svg>
          {!signed && lines.length === 0 && (
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground">
              Draw your signature
            </span>
          )}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <button onClick={() => { setLines([]); setSigned(false); }} className="rounded-md px-3 py-1.5 text-xs font-medium hover:bg-muted">
            Clear
          </button>
          <button disabled={!signed} className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-medium transition-all ${
            signed ? "bg-foreground text-background hover:bg-foreground/90" : "bg-muted text-muted-foreground"
          }`}>
            {signed ? <><Check className="h-3 w-3" /> Confirm</> : "Sign to continue"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EaselCanvasPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Easel Canvas
          </h1>
          <Badge variant="primary">Tools</Badge>
        </div>
        <p className="max-w-2- text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Drawing canvas with pen/eraser tools, color palette, brush size, and export
          functionality.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Drawing Canvas</h3>
          <p className="text-sm text-muted-foreground">
            Basic pen tool with color and brush size controls.
          </p>
          <ComponentPreview id="easel-drawing">
            <DrawingCanvasDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Tool Palette</h3>
          <p className="text-sm text-muted-foreground">
            Full set of drawing tools with active state.
          </p>
          <ComponentPreview id="easel-tools">
            <ToolPaletteDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Color Palette</h3>
          <p className="text-sm text-muted-foreground">
            Color picker with hex display.
          </p>
          <ComponentPreview id="easel-color">
            <ColorPaletteDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Sketch App</h3>
          <p className="text-sm text-muted-foreground">
            Full drawing app with toolbar, undo, and export.
          </p>
          <ComponentPreview id="easel-sketch">
            <SketchAppDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Whiteboard</h3>
          <p className="text-sm text-muted-foreground">
            Collaborative wireframe sketching with shapes.
          </p>
          <ComponentPreview id="easel-whiteboard">
            <WhiteboardDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Diagram Tool</h3>
          <p className="text-sm text-muted-foreground">
            Simple flow diagram with connected shapes.
          </p>
          <ComponentPreview id="easel-diagram">
            <DiagramToolDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Signature Pad</h3>
          <p className="text-sm text-muted-foreground">
            Signature capture with confirm flow.
          </p>
          <ComponentPreview id="easel-signature">
            <SignaturePadDemo />
          </ComponentPreview>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">width</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">800</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">height</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">600</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onSave</td>
                <td className="px-4 py-3 text-muted-foreground">{"(dataUrl: string) => void"}</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
