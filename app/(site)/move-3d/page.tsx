"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Move3d, RotateCcw, Maximize2, Minimize2, FlipHorizontal, FlipVertical, RefreshCw } from "lucide-react";

const installCommand = `npx component-library@latest add move-3d`;

const usageCode = `import { Move3D } from "@/components/move-3d";

export default function Page() {
  return <Move3D />;
}`;

function TransformControlsDemo() {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center gap-2">
        <Move3d className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Transform Controls</span>
      </div>
      <div className="relative mb-4 flex h-40 items-center justify-center rounded-md bg-muted/30">
        <div
          className="h-16 w-16 rounded-lg bg-primary shadow-lg transition-all duration-200"
          style={{ transform: `translate(${translate.x}px, ${translate.y}px)` }}
        />
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] text-muted-foreground">X: {translate.x}px</label>
          <input type="range" min={-60} max={60} value={translate.x} onChange={(e) => setTranslate((p) => ({ ...p, x: Number(e.target.value) }))} className="w-24 accent-primary" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] text-muted-foreground">Y: {translate.y}px</label>
          <input type="range" min={-60} max={60} value={translate.y} onChange={(e) => setTranslate((p) => ({ ...p, y: Number(e.target.value) }))} className="w-24 accent-primary" />
        </div>
      </div>
    </div>
  );
}

function RotationWidgetDemo() {
  const [rotation, setRotation] = useState(0);
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center gap-2">
        <RotateCcw className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Rotation Widget</span>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative flex h-32 w-32 items-center justify-center">
          <div className="absolute h-28 w-28 rounded-full border-2 border-dashed border-muted" />
          <div
            className="h-16 w-16 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg transition-all duration-200"
            style={{ transform: `rotate(${rotation}deg)` }}
          />
          <div className="absolute -right-1 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-primary" />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-bold text-foreground">{rotation}°</span>
          <input
            type="range"
            min={0}
            max={360}
            value={rotation}
            onChange={(e) => setRotation(Number(e.target.value))}
            className="w-32 accent-primary"
          />
          <button onClick={() => setRotation(0)} className="text-xs text-muted-foreground hover:text-foreground">Reset</button>
        </div>
      </div>
    </div>
  );
}

function ScaleSliderDemo() {
  const [scale, setScale] = useState(1);
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Maximize2 className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Scale Slider</span>
        </div>
        <span className="text-xs text-muted-foreground">{(scale * 100).toFixed(0)}%</span>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex h-40 flex-1 items-center justify-center rounded-md bg-muted/30">
          <div
            className="rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-400 shadow-lg transition-all duration-200"
            style={{ width: `${64 * scale}px`, height: `${64 * scale}px` }}
          />
        </div>
        <input
          type="range"
          min={0.25}
          max={3}
          step={0.05}
          value={scale}
          onChange={(e) => setScale(Number(e.target.value))}
          className="w-24 accent-primary"
        />
      </div>
    </div>
  );
}

function FlipButtonDemo() {
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center gap-2">
        <FlipHorizontal className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Flip Button</span>
      </div>
      <div className="flex h-32 items-center justify-center rounded-md bg-muted/30 mb-4">
        <div
          className="flex h-20 w-32 items-center justify-center rounded-lg bg-gradient-to-r from-orange-400 to-pink-400 text-sm font-bold text-white shadow-lg transition-transform duration-300"
          style={{ transform: `scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})` }}
        >
          ABC
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setFlipH(!flipH)}
          className={`flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${flipH ? "border-primary bg-primary/5 text-primary" : "bg-muted text-muted-foreground"}`}
        >
          <FlipHorizontal className="h-3 w-3" /> Horizontal
        </button>
        <button
          onClick={() => setFlipV(!flipV)}
          className={`flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${flipV ? "border-primary bg-primary/5 text-primary" : "bg-muted text-muted-foreground"}`}
        >
          <FlipVertical className="h-3 w-3" /> Vertical
        </button>
      </div>
    </div>
  );
}

function DragLayerDemo() {
  const [pos, setPos] = useState({ x: 80, y: 60 });
  const [dragging, setDragging] = useState(false);
  const handleMouseDown = () => setDragging(true);
  const handleMouseUp = () => setDragging(false);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left - 20, y: e.clientY - rect.top - 20 });
  };
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center gap-2">
        <Move3d className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Drag Layer</span>
      </div>
      <div
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="relative h-40 cursor-crosshair rounded-md bg-muted/30"
      >
        <div
          onMouseDown={handleMouseDown}
          className="absolute flex h-10 w-10 cursor-grab items-center justify-center rounded-lg bg-primary shadow-lg active:cursor-grabbing"
          style={{ left: pos.x, top: pos.y }}
        >
          <Move3d className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="absolute bottom-2 right-2 text-[10px] text-muted-foreground">
          x: {Math.round(pos.x)}, y: {Math.round(pos.y)}
        </span>
      </div>
    </div>
  );
}

function AnimateCardDemo() {
  const [animate, setAnimate] = useState(false);
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center gap-2">
        <RefreshCw className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Animate Card</span>
      </div>
      <div className="flex h-40 items-center justify-center rounded-md bg-muted/30">
        <div
          className={`h-24 w-40 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-xl transition-all duration-500 ${animate ? "scale-110 rotate-3 opacity-90" : "scale-100 rotate-0 opacity-100"}`}
        />
      </div>
      <button
        onClick={() => { setAnimate(true); setTimeout(() => setAnimate(false), 500); }}
        className="mt-3 w-full rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90"
      >
        Trigger Animation
      </button>
    </div>
  );
}

function PerspectiveViewDemo() {
  const [perspective, setPerspective] = useState(800);
  const [rotateX, setRotateX] = useState(20);
  const [rotateY, setRotateY] = useState(20);
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center gap-2">
        <Minimize2 className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Perspective View</span>
      </div>
      <div className="flex h-48 items-center justify-center rounded-md bg-muted/30" style={{ perspective }}>
        <div
          className="h-24 w-32 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 shadow-xl transition-all duration-300"
          style={{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)` }}
        />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] text-muted-foreground">Perspective: {perspective}px</label>
          <input type="range" min={200} max={2000} value={perspective} onChange={(e) => setPerspective(Number(e.target.value))} className="accent-primary" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] text-muted-foreground">RotateX: {rotateX}°</label>
          <input type="range" min={-90} max={90} value={rotateX} onChange={(e) => setRotateX(Number(e.target.value))} className="accent-primary" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] text-muted-foreground">RotateY: {rotateY}°</label>
          <input type="range" min={-90} max={90} value={rotateY} onChange={(e) => setRotateY(Number(e.target.value))} className="accent-primary" />
        </div>
      </div>
    </div>
  );
}

export default function Move3DPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Move 3D</h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          3D transformation controls with rotation, scale, flip, and perspective for spatial UI effects.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">TransformControls</h2>
        <TransformControlsDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">RotationWidget</h2>
        <RotationWidgetDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">ScaleSlider</h2>
        <ScaleSliderDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">FlipButton</h2>
        <FlipButtonDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">DragLayer</h2>
        <DragLayerDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">AnimateCard</h2>
        <AnimateCardDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">PerspectiveView</h2>
        <PerspectiveViewDemo />
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
                <td className="px-4 py-3 font-mono text-xs">translate</td>
                <td className="px-4 py-3 text-muted-foreground">{"{ x: number; y: number }"}</td>
                <td className="px-4 py-3 text-muted-foreground">{"{ x: 0, y: 0 }"}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">rotate</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">0</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">scale</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">1</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">perspective</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">800</td>
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
