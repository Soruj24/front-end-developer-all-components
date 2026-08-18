"use client";

import { useState, useEffect, useCallback } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Crosshair, Target, MousePointer2 } from "lucide-react";

const installCommand = `npx component-library@latest add crosshair-cursor`;
const usageCode = `import { CrosshairCursor } from "@/components/crosshair-cursor";

<CrosshairCursor enabled={true} color="primary" />`;

function CrosshairOverlayDemo() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  return (
    <div
      className="relative h-48 w-full max-w-md cursor-none overflow-hidden rounded-lg border bg-muted"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setActive(true);
      }}
      onMouseLeave={() => setActive(false)}
    >
      {active && (
        <>
          <div className="absolute left-0 top-0 h-full w-px bg-primary/50" style={{ left: pos.x }} />
          <div className="absolute left-0 top-0 h-px w-full bg-primary/50" style={{ top: pos.y }} />
          <div className="absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary" style={{ left: pos.x, top: pos.y }} />
          <div className="absolute -translate-x-1/2 -translate-y-1/2 text-[10px] font-mono bg-primary text-primary-foreground px-1 rounded" style={{ left: pos.x, top: pos.y - 20 }}>
            {Math.round(pos.x)}, {Math.round(pos.y)}
          </div>
        </>
      )}
      <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
        {active ? "" : "Hover to see crosshair"}
      </div>
    </div>
  );
}

function PrecisionTargetDemo() {
  const [clicked, setClicked] = useState<{ x: number; y: number } | null>(null);

  return (
    <div
      className="relative h-48 w-full max-w-md cursor-crosshair overflow-hidden rounded-lg bg-gradient-to-br from-slate-900 to-slate-800"
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setClicked({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      {clicked && (
        <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: clicked.x, top: clicked.y }}>
          <div className="h-12 w-12 rounded-full border-2 border-red-500" />
          <div className="absolute left-1/2 top-1/2 h-0.5 w-8 -translate-x-1/2 -translate-y-1/2 bg-red-500" />
          <div className="absolute left-1/2 top-1/2 h-8 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-red-500" />
          <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500" />
          <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono text-red-400">
            ({Math.round(clicked.x)}, {Math.round(clicked.y)})
          </span>
        </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center text-xs text-white/30">
        Click to place target
      </div>
    </div>
  );
}

function GridCursorDemo() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const gridSize = 20;
  const snap = (v: number) => Math.round(v / gridSize) * gridSize;

  return (
    <div
      className="relative h-48 w-full max-w-md cursor-none overflow-hidden rounded-lg border bg-card"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({ x: snap(e.clientX - rect.left), y: snap(e.clientY - rect.top) });
      }}
    >
      <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(128,128,128,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,0.1) 1px, transparent 1px)", backgroundSize: `${gridSize}px ${gridSize}px` }} />
      <div className="absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-sm border-2 border-primary bg-primary/20" style={{ left: pos.x, top: pos.y }} />
      <div className="absolute bottom-2 right-2 rounded bg-background/80 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
        {pos.x}, {pos.y}
      </div>
    </div>
  );
}

export default function CrosshairCursorPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Crosshair Cursor</h1>
          <Badge variant="primary">Layout</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Precision crosshair cursors with coordinate display, snap-to-grid, and target placement for design tools.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Crosshair Overlay</h2>
        <ComponentPreview>
          <CrosshairOverlayDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Precision Target</h2>
        <ComponentPreview>
          <PrecisionTargetDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Snap to Grid</h2>
        <ComponentPreview>
          <GridCursorDemo />
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
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">enabled</td><td className="px-4 py-3 text-muted-foreground">boolean</td><td className="px-4 py-3 text-muted-foreground">true</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">color</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">{'"primary"'}</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
