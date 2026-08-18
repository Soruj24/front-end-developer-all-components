"use client";

import { useState, useRef } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Crop, RotateCcw, Check, X, Move } from "lucide-react";

const installCommand = `npx component-library@latest add crop-tool`;
const usageCode = `import { CropTool } from "@/components/crop-tool";

<CropTool
  src="/image.jpg"
  onCrop={(area) => handleCrop(area)}
  aspectRatio={16/9}
/>`;

function CropBoxDemo() {
  const [box, setBox] = useState({ x: 20, y: 20, w: 60, h: 60 });
  const [dragging, setDragging] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative h-48 w-full max-w-sm overflow-hidden rounded-lg bg-muted">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800" />
        <div className="absolute inset-0 bg-black/50" />
        <div
          className="absolute border-2 border-white shadow-lg cursor-move"
          style={{ left: `${box.x}%`, top: `${box.y}%`, width: `${box.w}%`, height: `${box.h}%` }}
          onMouseDown={() => setDragging(true)}
        >
          <div className="absolute inset-0 bg-transparent" />
          <div className="absolute left-0 top-0 h-2 w-2 -translate-x-1 -translate-y-1 cursor-nw-resize rounded-full bg-white" />
          <div className="absolute right-0 top-0 h-2 w-2 translate-x-1 -translate-y-1 cursor-ne-resize rounded-full bg-white" />
          <div className="absolute bottom-0 left-0 h-2 w-2 -translate-x-1 translate-y-1 cursor-sw-resize rounded-full bg-white" />
          <div className="absolute bottom-0 right-0 h-2 w-2 translate-x-1 translate-y-1 cursor-se-resize rounded-full bg-white" />
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
            {[...Array(9)].map((_, i) => <div key={i} className="border border-white/30" />)}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Drag corners to resize</span>
        <span>{Math.round(box.w)}% × {Math.round(box.h)}%</span>
      </div>
    </div>
  );
}

function AspectRatioDemo() {
  const [ratio, setRatio] = useState("1:1");
  const ratios = ["1:1", "4:3", "16:9", "3:2", "Free"];
  const dims: Record<string, string> = { "1:1": "w-24 h-24", "4:3": "w-24 h-18", "16:9": "w-24 h-14", "3:2": "w-24 h-16", "Free": "w-24 h-20" };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        {ratios.map((r) => (
          <button key={r} onClick={() => setRatio(r)} className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${ratio === r ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
            {r}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-center rounded-lg border bg-muted p-6">
        <div className={`${dims[ratio]} rounded-md border-2 border-dashed border-primary bg-primary/10`} />
      </div>
    </div>
  );
}

function CropControlsDemo() {
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(100);
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <div className="relative h-32 overflow-hidden rounded-lg bg-muted">
        <div
          className="absolute inset-4 bg-gradient-to-br from-green-200 to-blue-200 dark:from-green-800 dark:to-blue-800 rounded"
          style={{ transform: `rotate(${rotation}deg) scale(${zoom / 100})` }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <RotateCcw className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground w-14">{rotation}°</span>
          <input type="range" min={-180} max={180} value={rotation} onChange={(e) => setRotation(Number(e.target.value))} className="flex-1 accent-primary" />
        </div>
        <div className="flex items-center gap-2">
          <Move className="h-3 w-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground w-14">{zoom}%</span>
          <input type="range" min={50} max={200} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className="flex-1 accent-primary" />
        </div>
      </div>
      <div className="flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-1 rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground"><Check className="h-3.5 w-3.5" /> Apply</button>
        <button className="flex-1 flex items-center justify-center gap-1 rounded-lg border py-2 text-sm font-medium hover:bg-muted"><X className="h-3.5 w-3.5" /> Cancel</button>
      </div>
    </div>
  );
}

export default function CropToolPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Crop Tool</h1>
          <Badge variant="primary">Tools</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Image cropping tool with resizable crop box, aspect ratio presets, rotation, zoom, and apply/cancel controls.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Crop Box</h2>
        <ComponentPreview>
          <CropBoxDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Aspect Ratios</h2>
        <ComponentPreview>
          <AspectRatioDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Rotation & Zoom</h2>
        <ComponentPreview>
          <CropControlsDemo />
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
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">src</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">onCrop</td><td className="px-4 py-3 text-muted-foreground">(area: CropArea) =&gt; void</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">aspectRatio</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">1</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
