"use client";

import { useState, useEffect, useCallback } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Crosshair,
  Target,
  MousePointer2,
  Ruler,
  Palette,
  Move,
  Maximize,
  Circle,
  Square,
  Hexagon,
} from "lucide-react";

const installCommand = `npx component-library@latest add crosshair-cursor`;
const usageCode = `import { CrosshairCursor } from "@/components/crosshair-cursor";

<CrosshairCursor enabled={true} color="primary" />`;

function CrosshairOverlayDemo() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Crosshair Overlay</span>
            <span className="font-mono text-[10px] text-muted-foreground">
              {active ? `${Math.round(pos.x)}, ${Math.round(pos.y)}` : "---"}
            </span>
          </div>
        </div>
        <div
          className="relative h-56 cursor-none overflow-hidden bg-muted"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            setActive(true);
          }}
          onMouseLeave={() => setActive(false)}
        >
          {active && (
            <>
              <div className="absolute left-0 top-0 h-full w-px bg-foreground/30" style={{ left: pos.x }} />
              <div className="absolute left-0 top-0 h-px w-full bg-foreground/30" style={{ top: pos.y }} />
              <div className="absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-foreground/60" style={{ left: pos.x, top: pos.y }} />
              <div className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground" style={{ left: pos.x, top: pos.y }} />
              <div className="absolute -translate-x-1/2 -translate-y-1/2 rounded-md bg-foreground px-2 py-0.5 text-[10px] font-mono text-background shadow-md" style={{ left: pos.x, top: pos.y - 28 }}>
                {Math.round(pos.x)}, {Math.round(pos.y)}
              </div>
            </>
          )}
          <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">
            {active ? "" : "Hover to see crosshair"}
          </div>
        </div>
      </div>
    </div>
  );
}

function PrecisionTargetDemo() {
  const [targets, setTargets] = useState<{ x: number; y: number; id: number }[]>([]);

  const placeTarget = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTargets((t) => [...t, { x: e.clientX - rect.left, y: e.clientY - rect.top, id: Date.now() }]);
  };

  const clearTargets = () => setTargets([]);

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="flex items-center justify-between border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <span className="text-sm font-semibold">Precision Target</span>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              {targets.length} targets
            </span>
            <button onClick={clearTargets} className="text-[10px] text-muted-foreground hover:text-foreground transition-colors">
              Clear
            </button>
          </div>
        </div>
        <div
          className="relative h-56 cursor-crosshair overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-800"
          onClick={placeTarget}
        >
          {targets.map((t) => (
            <div key={t.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: t.x, top: t.y }}>
              <div className="h-10 w-10 rounded-full border-2 border-red-500" />
              <div className="absolute left-1/2 top-1/2 h-0.5 w-6 -translate-x-1/2 -translate-y-1/2 bg-red-500" />
              <div className="absolute left-1/2 top-1/2 h-6 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-red-500" />
              <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-red-500" />
              <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-mono text-red-400">
                ({Math.round(t.x)}, {Math.round(t.y)})
              </span>
            </div>
          ))}
          <div className="absolute inset-0 flex items-center justify-center text-xs text-white/30">
            {targets.length === 0 ? "Click to place targets" : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

function GridCursorDemo() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [gridSize, setGridSize] = useState(20);
  const snap = (v: number) => Math.round(v / gridSize) * gridSize;

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="flex items-center justify-between border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <span className="text-sm font-semibold">Snap to Grid</span>
          <div className="flex items-center gap-1.5">
            {[10, 20, 40].map((s) => (
              <button
                key={s}
                onClick={() => setGridSize(s)}
                className={`rounded-md px-2 py-1 text-[10px] font-medium transition-colors ${
                  gridSize === s ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {s}px
              </button>
            ))}
          </div>
        </div>
        <div
          className="relative h-56 cursor-none overflow-hidden bg-card"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setPos({ x: snap(e.clientX - rect.left), y: snap(e.clientY - rect.top) });
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(128,128,128,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,0.08) 1px, transparent 1px)`,
              backgroundSize: `${gridSize}px ${gridSize}px`,
            }}
          />
          <div
            className="absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-sm border-2 border-foreground bg-foreground/10"
            style={{ left: pos.x, top: pos.y }}
          />
          <div className="absolute bottom-2 right-2 rounded-md bg-background/90 px-2 py-1 font-mono text-[10px] text-muted-foreground shadow-sm">
            {pos.x}, {pos.y}
          </div>
        </div>
      </div>
    </div>
  );
}

function ColorPickerDemo() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const hue = (pos.x / 300) * 360;
  const sat = 80;
  const light = 50 + (pos.y / 200) * 20;
  const color = `hsl(${hue}, ${sat}%, ${light}%)`;

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="flex items-center justify-between border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span className="text-sm font-semibold">Color Picker</span>
          </div>
          {active && (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-md border border-black/[.08] shadow-inner" style={{ background: color }} />
              <span className="font-mono text-[10px] text-muted-foreground">{color}</span>
            </div>
          )}
        </div>
        <div
          className="relative h-52 cursor-none overflow-hidden"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            setActive(true);
          }}
          onMouseLeave={() => setActive(false)}
          style={{
            background: "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
          {active && (
            <>
              <div className="absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-lg" style={{ left: pos.x, top: pos.y, background: color }} />
              <div className="absolute -translate-x-1/2 -translate-y-1/2 rounded-md bg-black/70 px-2 py-0.5 text-[10px] font-mono text-white" style={{ left: pos.x, top: pos.y - 24 }}>
                {Math.round(hue)}°
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function MeasurementToolDemo() {
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);
  const [end, setEnd] = useState<{ x: number; y: number } | null>(null);
  const [measuring, setMeasuring] = useState(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setStart({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setEnd(null);
    setMeasuring(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!measuring) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setEnd({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseUp = () => setMeasuring(false);

  const distance = start && end
    ? Math.round(Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2))
    : 0;

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="flex items-center justify-between border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Ruler className="h-4 w-4" />
            <span className="text-sm font-semibold">Measurement Tool</span>
          </div>
          {start && end && (
            <span className="rounded-full bg-foreground px-2.5 py-0.5 text-[10px] font-bold text-background">
              {distance}px
            </span>
          )}
        </div>
        <div
          className="relative h-52 cursor-crosshair overflow-hidden bg-muted"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {start && end && (
            <>
              <svg className="absolute inset-0 h-full w-full">
                <line x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke="currentColor" strokeWidth="2" className="text-foreground" strokeDasharray="4 4" />
              </svg>
              <div className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-foreground bg-background" style={{ left: start.x, top: start.y }} />
              <div className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-foreground bg-background" style={{ left: end.x, top: end.y }} />
              <div className="absolute -translate-x-1/2 -translate-y-1/2 rounded-md bg-foreground px-2 py-0.5 text-[10px] font-mono text-background shadow-md" style={{ left: (start.x + end.x) / 2, top: (start.y + end.y) / 2 - 16 }}>
                {distance}px
              </div>
            </>
          )}
          <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">
            {start && end ? "" : "Click and drag to measure"}
          </div>
        </div>
      </div>
    </div>
  );
}

function MapMarkerDemo() {
  const [markers, setMarkers] = useState<{ x: number; y: number; id: number; label: string }[]>([]);
  const [nextLabel, setNextLabel] = useState("A");

  const placeMarker = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMarkers((m) => [...m, {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      id: Date.now(),
      label: nextLabel,
    }]);
    setNextLabel(String.fromCharCode(nextLabel.charCodeAt(0) + 1));
  };

  const clearMarkers = () => {
    setMarkers([]);
    setNextLabel("A");
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="flex items-center justify-between border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <span className="text-sm font-semibold">Map Markers</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              {markers.length} markers
            </span>
            <button onClick={clearMarkers} className="text-[10px] text-muted-foreground hover:text-foreground transition-colors">
              Clear
            </button>
          </div>
        </div>
        <div
          className="relative h-52 cursor-crosshair overflow-hidden"
          onClick={placeMarker}
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(59,130,246,0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(16,185,129,0.1) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(245,158,11,0.05) 0%, transparent 70%)
            `,
            backgroundColor: "rgb(248 250 252)",
          }}
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }} />
          {markers.map((m) => (
            <div key={m.id} className="absolute -translate-x-1/2 -translate-y-full" style={{ left: m.x, top: m.y }}>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-lg">
                {m.label}
              </div>
              <div className="mx-auto h-0 w-0 -translate-y-px border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-red-500" />
            </div>
          ))}
          {markers.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">
              Click to place markers
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DesignCanvasDemo() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const objects = [
    { x: 60, y: 40, w: 80, h: 50, label: "Button" },
    { x: 200, y: 80, w: 100, h: 60, label: "Card" },
    { x: 120, y: 150, w: 120, h: 40, label: "Input" },
  ];

  const snapThreshold = 8;
  const findAlignment = (val: number) => {
    for (const obj of objects) {
      const edges = [obj.x, obj.x + obj.w / 2, obj.x + obj.w];
      for (const edge of edges) {
        if (Math.abs(val - edge) < snapThreshold) return edge;
      }
    }
    return null;
  };

  const snapX = active ? findAlignment(pos.x) : null;
  const snapY = active ? findAlignment(pos.y) : null;

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <span className="text-sm font-semibold">Design Canvas</span>
        </div>
        <div
          className="relative h-56 cursor-none overflow-hidden bg-card"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            setActive(true);
          }}
          onMouseLeave={() => setActive(false)}
        >
          {objects.map((obj, i) => (
            <div
              key={i}
              className="absolute rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/30"
              style={{ left: obj.x, top: obj.y, width: obj.w, height: obj.h }}
            >
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-medium text-muted-foreground">
                {obj.label}
              </span>
            </div>
          ))}
          {active && (
            <>
              {snapX !== null && (
                <div className="absolute top-0 h-full w-px bg-blue-500/60" style={{ left: snapX }} />
              )}
              {snapY !== null && (
                <div className="absolute left-0 h-px w-full bg-blue-500/60" style={{ top: snapY }} />
              )}
              <div className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-sm border border-foreground/60 bg-foreground/10" style={{ left: snapX ?? pos.x, top: snapY ?? pos.y }} />
              <div className="absolute -translate-x-1/2 -translate-y-1/2 rounded bg-background/90 px-1.5 py-0.5 text-[9px] font-mono text-muted-foreground shadow-sm" style={{ left: pos.x, top: pos.y - 20 }}>
                {Math.round(pos.x)}, {Math.round(pos.y)}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CrosshairCursorPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Crosshair Cursor
          </h1>
          <Badge variant="primary">Layout</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Precision crosshair cursors with coordinate display, snap-to-grid, and target placement
          for design tools.
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
          <h3 className="text-lg font-medium text-foreground">Crosshair Overlay</h3>
          <p className="text-sm text-muted-foreground">
            Full crosshair with coordinate display and center dot.
          </p>
          <ComponentPreview id="crosshair-overlay">
            <CrosshairOverlayDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Precision Target</h3>
          <p className="text-sm text-muted-foreground">
            Click to place target markers with coordinates.
          </p>
          <ComponentPreview id="crosshair-target">
            <PrecisionTargetDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Snap to Grid</h3>
          <p className="text-sm text-muted-foreground">
            Grid-based cursor snapping with adjustable grid size.
          </p>
          <ComponentPreview id="crosshair-grid">
            <GridCursorDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Color Picker</h3>
          <p className="text-sm text-muted-foreground">
            Crosshair for hue selection with color preview.
          </p>
          <ComponentPreview id="crosshair-color">
            <ColorPickerDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Measurement Tool</h3>
          <p className="text-sm text-muted-foreground">
            Click and drag to measure distances between points.
          </p>
          <ComponentPreview id="crosshair-measure">
            <MeasurementToolDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Map Markers</h3>
          <p className="text-sm text-muted-foreground">
            Place labeled markers (A, B, C...) on a map background.
          </p>
          <ComponentPreview id="crosshair-map">
            <MapMarkerDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Design Canvas</h3>
          <p className="text-sm text-muted-foreground">
            Canvas with alignment guides and smart snapping.
          </p>
          <ComponentPreview id="crosshair-canvas">
            <DesignCanvasDemo />
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
                <td className="px-4 py-3 font-mono text-xs">enabled</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">color</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"primary\""}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">snapToGrid</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">0</td>
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
