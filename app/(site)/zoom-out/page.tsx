"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";
import { ZoomIn, ZoomOut, RotateCcw, Maximize } from "lucide-react";

const installCommand = `npx component-library@latest add zoom-out`;
const usageCode = `import { ZoomOut } from "@/components/_zoom-out";

<ZoomOut initialZoom={2} />`;

function ZoomImage({ zoom }: { zoom: number }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="relative flex h-64 items-center justify-center bg-foreground/5">
        <div
          className="flex items-center justify-center rounded-lg border border-dashed border-muted-foreground/30 bg-muted/30 transition-transform"
          style={{ width: "80%", height: "80%", transform: `scale(${zoom})` }}
        >
          <span className="text-sm text-muted-foreground">Zoom: {Math.round(zoom * 100)}%</span>
        </div>
      </div>
    </div>
  );
}

export default function ZoomOutPage() {
  const [zoom, setZoom] = useState(2);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Zoom Out</h1>
          <Badge variant="primary">Input</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Zoom-out controls to reduce magnification with smooth transitions and preset levels.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Zoom Controls</h2>
        <div className="flex items-center gap-2">
          <button onClick={() => setZoom(Math.max(0.5, zoom - 0.25))} className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-muted">
            <ZoomOut className="h-4 w-4" />
          </button>
          <span className="w-16 text-center text-sm font-mono">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom(Math.min(3, zoom + 0.25))} className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-muted">
            <ZoomIn className="h-4 w-4" />
          </button>
          <button onClick={() => setZoom(1)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-muted">
            <RotateCcw className="h-4 w-4" />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-muted">
            <Maximize className="h-4 w-4" />
          </button>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Preview</h2>
        <ZoomImage zoom={zoom} />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Preset Levels</h2>
        <div className="flex gap-2">
          {[50, 75, 100, 150, 200, 300].map((p) => (
            <button
              key={p}
              onClick={() => setZoom(p / 100)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium ${zoom === p / 100 ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:bg-muted"}`}
            >
              {p}%
            </button>
          ))}
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
                <td className="px-4 py-3 font-mono text-xs">initialZoom</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">1</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">minZoom</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">0.25</td>
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
