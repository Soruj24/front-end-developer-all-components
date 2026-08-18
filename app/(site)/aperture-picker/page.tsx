"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Aperture, Camera, Focus, Sun, Moon } from "lucide-react";

const installCommand = `npx component-library@latest add aperture-picker`;
const usageCode = `import { AperturePicker } from "@/components/aperture-picker";

<AperturePicker
  value={f/2.8}
  onChange={(value) => setAperture(value)}
  min={f/1.4}
  max={f/22}
/>`;

const apertureStops = ["f/1.4", "f/2", "f/2.8", "f/4", "f/5.6", "f/8", "f/11", "f/16", "f/22"];

function ApertureWheelDemo() {
  const [selected, setSelected] = useState(2);
  const angle = (selected / (apertureStops.length - 1)) * 270 - 135;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-48 w-48">
        <div className="absolute inset-0 rounded-full border-4 border-muted" />
        {apertureStops.map((stop, i) => {
          const a = (i / (apertureStops.length - 1)) * 270 - 135;
          const rad = (a * Math.PI) / 180;
          const x = 96 + 80 * Math.cos(rad);
          const y = 96 + 80 * Math.sin(rad);
          return (
            <button
              key={stop}
              onClick={() => setSelected(i)}
              className={`absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[10px] font-medium transition-all ${
                i === selected ? "bg-primary text-primary-foreground scale-110" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              style={{ left: x, top: y }}
            >
              {stop.replace("f/", "")}
            </button>
          );
        })}
        <div
          className="absolute left-1/2 top-1/2 h-0.5 w-16 -translate-x-1/2 -translate-y-full origin-bottom rounded-full bg-primary transition-transform"
          style={{ transform: `translateX(-50%) rotate(${angle}deg)` }}
        />
      </div>
      <span className="text-lg font-semibold">{apertureStops[selected]}</span>
    </div>
  );
}

function SliderApertureDemo() {
  const [value, setValue] = useState(4);
  return (
    <div className="flex flex-col gap-3 w-full max-w-sm">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Aperture</span>
        <span className="font-mono font-medium">{apertureStops[value]}</span>
      </div>
      <input
        type="range"
        min={0}
        max={apertureStops.length - 1}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full accent-primary"
      />
      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>f/1.4</span>
        <span>f/22</span>
      </div>
    </div>
  );
}

function ApertureGridDemo() {
  const [selected, setSelected] = useState(2);
  return (
    <div className="grid grid-cols-3 gap-2">
      {apertureStops.map((stop, i) => {
        const size = 24 - i * 2;
        return (
          <button
            key={stop}
            onClick={() => setSelected(i)}
            className={`flex flex-col items-center gap-2 rounded-lg border p-3 transition-all ${
              i === selected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            }`}
          >
            <div className="flex items-center justify-center">
              <div
                className="rounded-full border-2 border-foreground transition-all"
                style={{ width: size, height: size }}
              />
            </div>
            <span className="text-xs font-mono">{stop}</span>
          </button>
        );
      })}
    </div>
  );
}

function DepthPreviewDemo() {
  const [selected, setSelected] = useState(2);
  const blur = [8, 4, 2, 1, 0.5, 0.2, 0.1, 0, 0][selected];
  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="relative h-32 w-48 overflow-hidden rounded-lg bg-gradient-to-r from-blue-300 to-purple-300">
        <div className="absolute inset-0 flex items-center justify-center" style={{ filter: `blur(${blur}px)` }}>
          <Camera className="h-12 w-12 text-foreground/80" />
        </div>
      </div>
      <div className="flex gap-2">
        {apertureStops.map((stop, i) => (
          <button
            key={stop}
            onClick={() => setSelected(i)}
            className={`h-2 w-2 rounded-full transition-colors ${i === selected ? "bg-primary" : "bg-muted"}`}
          />
        ))}
      </div>
      <span className="text-sm text-muted-foreground">Depth of field: {blur > 2 ? "Shallow" : blur > 0 ? "Medium" : "Deep"}</span>
    </div>
  );
}

export default function AperturePickerPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Aperture Picker</h1>
          <Badge variant="primary">Input</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Interactive aperture selection widget with wheel, slider, and grid modes for camera settings interfaces.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Wheel Picker</h2>
        <ComponentPreview>
          <ApertureWheelDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Slider Mode</h2>
        <ComponentPreview>
          <SliderApertureDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Grid Selector</h2>
        <ComponentPreview>
          <ApertureGridDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Depth of Field Preview</h2>
        <ComponentPreview>
          <DepthPreviewDemo />
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
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">value</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">onChange</td><td className="px-4 py-3 text-muted-foreground">(value: number) =&gt; void</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">variant</td><td className="px-4 py-3 text-muted-foreground">{'"wheel" | "slider" | "grid"'}</td><td className="px-4 py-3 text-muted-foreground">{'"wheel"'}</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">stops</td><td className="px-4 py-3 text-muted-foreground">string[]</td><td className="px-4 py-3 text-muted-foreground">apertureStops</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
