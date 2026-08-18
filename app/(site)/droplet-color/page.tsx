"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Palette, Droplet } from "lucide-react";

const installCommand = `npx component-library@latest add droplet-color`;
const usageCode = `import { DropletColor } from "@/components/droplet-color";

<DropletColor
  value="#3b82f6"
  onChange={(color) => setColor(color)}
/>`;

const presetColors = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6", "#ec4899", "#06b6d4"];

function DropletPickerDemo() {
  const [selected, setSelected] = useState("#3b82f6");
  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="h-16 w-16 rounded-full shadow-lg border-2 border-white" style={{ backgroundColor: selected }} />
      <div className="flex gap-2">
        {presetColors.map((c) => (
          <button key={c} onClick={() => setSelected(c)} className={`h-6 w-6 rounded-full border-2 transition-transform hover:scale-110 ${selected === c ? "border-foreground scale-110" : "border-transparent"}`} style={{ backgroundColor: c }} />
        ))}
      </div>
      <span className="font-mono text-xs text-muted-foreground">{selected}</span>
    </div>
  );
}

function ColorWheelDemo() {
  const [hue, setHue] = useState(200);
  const [sat, setSat] = useState(80);
  const [light, setLight] = useState(50);
  return (
    <div className="flex flex-col gap-3 w-full max-w-xs">
      <div className="h-12 rounded-lg shadow-md" style={{ backgroundColor: `hsl(${hue}, ${sat}%, ${light}%)` }} />
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs w-8 text-muted-foreground">H</span>
          <input type="range" min={0} max={360} value={hue} onChange={(e) => setHue(Number(e.target.value))} className="flex-1 accent-primary" />
          <span className="text-xs font-mono w-8">{hue}°</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs w-8 text-muted-foreground">S</span>
          <input type="range" min={0} max={100} value={sat} onChange={(e) => setSat(Number(e.target.value))} className="flex-1 accent-primary" />
          <span className="text-xs font-mono w-8">{sat}%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs w-8 text-muted-foreground">L</span>
          <input type="range" min={0} max={100} value={light} onChange={(e) => setLight(Number(e.target.value))} className="flex-1 accent-primary" />
          <span className="text-xs font-mono w-8">{light}%</span>
        </div>
      </div>
    </div>
  );
}

function SwatchGridDemo() {
  const colors = [
    { name: "Red", hex: "#ef4444" }, { name: "Orange", hex: "#f97316" }, { name: "Amber", hex: "#f59e0b" },
    { name: "Green", hex: "#22c55e" }, { name: "Teal", hex: "#14b8a6" }, { name: "Blue", hex: "#3b82f6" },
    { name: "Indigo", hex: "#6366f1" }, { name: "Purple", hex: "#a855f7" }, { name: "Pink", hex: "#ec4899" },
  ];
  return (
    <div className="grid grid-cols-3 gap-2 w-full max-w-xs">
      {colors.map((c) => (
        <div key={c.hex} className="flex flex-col items-center gap-1 rounded-lg border bg-card p-2">
          <div className="h-8 w-8 rounded-md shadow-sm" style={{ backgroundColor: c.hex }} />
          <span className="text-[10px] text-muted-foreground">{c.name}</span>
        </div>
      ))}
    </div>
  );
}

function OpacityDemo() {
  const [opacity, setOpacity] = useState(100);
  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="relative h-16 w-32 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHJlY3Qgd2lkdGg9IjUiIGhlaWdodD0iNSIgZmlsbD0iI2NjYyIvPjxyZWN0IHg9IjUiIHk9IjUiIHdpZHRoPSI1IiBoZWlnaHQ9IjUiIGZpbGw9IiNjY2MiLz48L3N2Zz4=')]" />
        <div className="absolute inset-0 bg-blue-500" style={{ opacity: opacity / 100 }} />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Opacity</span>
        <input type="range" min={0} max={100} value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="w-32 accent-primary" />
        <span className="text-xs font-mono">{opacity}%</span>
      </div>
    </div>
  );
}

export default function DropletColorPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Droplet Color</h1>
          <Badge variant="primary">Input</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Color picker with preset swatches, HSL sliders, opacity control, and droplet-style selection interface.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Preset Colors</h2>
        <ComponentPreview>
          <DropletPickerDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">HSL Sliders</h2>
        <ComponentPreview>
          <ColorWheelDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Swatch Grid</h2>
        <ComponentPreview>
          <SwatchGridDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Opacity Control</h2>
        <ComponentPreview>
          <OpacityDemo />
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
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">value</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">{'"#000000"'}</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">onChange</td><td className="px-4 py-3 text-muted-foreground">(color: string) =&gt; void</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
