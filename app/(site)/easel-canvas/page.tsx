"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Pen, Eraser, Download, RotateCcw, Palette } from "lucide-react";

const installCommand = `npx component-library@latest add easel-canvas`;
const usageCode = `import { EaselCanvas } from "@/components/easel-canvas";

<EaselCanvas
  width={800}
  height={600}
  onSave={(dataUrl) => saveImage(dataUrl)}
/>`;

const colors = ["#000000", "#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6", "#ec4899"];

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
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {colors.map((c) => (
            <button key={c} onClick={() => setColor(c)} className={`h-5 w-5 rounded-full border-2 transition-transform ${color === c ? "border-foreground scale-110" : "border-transparent"}`} style={{ backgroundColor: c }} />
          ))}
        </div>
        <input type="range" min={1} max={10} value={brushSize} onChange={(e) => setBrushSize(Number(e.target.value))} className="w-20 accent-primary" />
        <button onClick={() => setLines([])} className="rounded-md p-1 hover:bg-muted"><RotateCcw className="h-4 w-4" /></button>
      </div>
      <svg
        className="w-full max-w-md h-48 rounded-lg border bg-white cursor-crosshair"
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
    { id: "pen", icon: Pen, label: "Pen" },
    { id: "eraser", icon: Eraser, label: "Eraser" },
    { id: "download", icon: Download, label: "Save" },
  ];
  return (
    <div className="flex gap-2">
      {tools.map((t) => (
        <button key={t.id} onClick={() => setTool(t.id)} className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${tool === t.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
          <t.icon className="h-4 w-4" />
          {t.label}
        </button>
      ))}
    </div>
  );
}

function ColorPaletteDemo() {
  const [selected, setSelected] = useState("#3b82f6");
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        {colors.map((c) => (
          <button key={c} onClick={() => setSelected(c)} className={`h-8 w-8 rounded-lg border-2 transition-all ${selected === c ? "border-foreground scale-110 shadow" : "border-transparent"}`} style={{ backgroundColor: c }} />
        ))}
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Palette className="h-3 w-3" />
        <span className="font-mono">{selected}</span>
      </div>
    </div>
  );
}

export default function EaselCanvasPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Easel Canvas</h1>
          <Badge variant="primary">Tools</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Drawing canvas with pen/eraser tools, color palette, brush size, and export functionality.
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

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Drawing Canvas</h2>
        <ComponentPreview>
          <DrawingCanvasDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Tool Palette</h2>
        <ComponentPreview>
          <ToolPaletteDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Color Palette</h2>
        <ComponentPreview>
          <ColorPaletteDemo />
        </ComponentPreview>
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
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">width</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">800</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">height</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">600</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">onSave</td><td className="px-4 py-3 text-muted-foreground">(dataUrl: string) =&gt; void</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
