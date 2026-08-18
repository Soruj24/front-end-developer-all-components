"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Check, Palette, Pipette } from "lucide-react";

const installCommand = `npx component-library@latest add color-swatch`;

const usageCode = `import { ColorSwatch } from "@/components/ui";

<ColorSwatch
  colors={presetColors}
  value={selected}
  onChange={setSelected}
/>`;

const basicColors = [
  "#ef4444", "#f97316", "#eab308", "#22c55e",
  "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899",
  "#f43f5e", "#14b8a6", "#6366f1", "#a855f7",
];

const tailwindPalette = {
  red: ["#fef2f2", "#fecaca", "#f87171", "#dc2626", "#991b1b"],
  blue: ["#eff6ff", "#bfdbfe", "#60a5fa", "#2563eb", "#1e40af"],
  green: ["#f0fdf4", "#bbf7d0", "#4ade80", "#16a34a", "#166534"],
  purple: ["#faf5ff", "#e9d5ff", "#c084fc", "#9333ea", "#6b21a8"],
};

function BasicSwatchesDemo() {
  const [selected, setSelected] = useState("#3b82f6");
  return (
    <div className="w-full max-w-md space-y-3">
      <div className="grid grid-cols-6 gap-2">
        {basicColors.map((color) => (
          <button
            key={color}
            onClick={() => setSelected(color)}
            className={`relative h-10 w-10 rounded-lg transition-transform hover:scale-110 ${selected === color ? "ring-2 ring-offset-2 ring-primary" : ""}`}
            style={{ backgroundColor: color }}
          >
            {selected === color && <Check className="absolute inset-0 m-auto h-4 w-4 text-white" />}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3 rounded-lg border border-border p-3">
        <div className="h-8 w-8 rounded-md" style={{ backgroundColor: selected }} />
        <div>
          <p className="text-sm font-medium">Selected</p>
          <p className="text-xs text-muted-foreground font-mono">{selected}</p>
        </div>
      </div>
    </div>
  );
}

function PresetPalettesDemo() {
  const [selected, setSelected] = useState("#2563eb");
  return (
    <div className="w-full max-w-md space-y-4">
      {Object.entries(tailwindPalette).map(([name, shades]) => (
        <div key={name} className="space-y-1">
          <p className="text-xs font-medium capitalize text-muted-foreground">{name}</p>
          <div className="flex gap-1">
            {shades.map((shade) => (
              <button
                key={shade}
                onClick={() => setSelected(shade)}
                className={`h-8 flex-1 rounded transition-transform hover:scale-105 ${selected === shade ? "ring-2 ring-offset-1 ring-primary" : ""}`}
                style={{ backgroundColor: shade }}
              />
            ))}
          </div>
        </div>
      ))}
      <div className="flex items-center gap-3 rounded-lg border border-border p-3">
        <div className="h-8 w-8 rounded-md" style={{ backgroundColor: selected }} />
        <p className="text-xs font-mono">{selected}</p>
      </div>
    </div>
  );
}

function CustomColorsDemo() {
  const [customColor, setCustomColor] = useState("#6366f1");
  const [recent, setRecent] = useState(["#ef4444", "#22c55e", "#3b82f6"]);

  const addRecent = () => {
    if (!recent.includes(customColor)) setRecent([customColor, ...recent].slice(0, 8));
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex items-center gap-3">
        <input type="color" value={customColor} onChange={(e) => setCustomColor(e.target.value)}
          className="h-10 w-10 cursor-pointer rounded-lg border-0" />
        <input type="text" value={customColor} onChange={(e) => setCustomColor(e.target.value)}
          className="flex-1 rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm" />
        <button onClick={addRecent}
          className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Save
        </button>
      </div>
      <div className="rounded-lg border border-border p-3">
        <p className="text-xs font-medium text-muted-foreground mb-2">Recent Colors</p>
        <div className="flex gap-2">
          {recent.map((c) => (
            <button key={c} onClick={() => setCustomColor(c)}
              className={`h-8 w-8 rounded-lg transition-transform hover:scale-110 ${customColor === c ? "ring-2 ring-offset-2 ring-primary" : ""}`}
              style={{ backgroundColor: c }} />
          ))}
        </div>
      </div>
      <div className="rounded-lg p-4 text-center" style={{ backgroundColor: customColor + "20", borderLeft: `4px solid ${customColor}` }}>
        <p className="text-sm font-medium" style={{ color: customColor }}>Preview with {customColor}</p>
      </div>
    </div>
  );
}

export default function ColorSwatchPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Color Swatch</h1>
          <Badge variant="primary">Forms</Badge>
        </div>
        <p className="max-w-2- text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A color swatch picker grid for selecting colors. Supports basic palettes, preset themes, and custom color input.
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
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Swatches</h2>
          <p className="mt-1 text-sm text-muted-foreground">Click a swatch to select it.</p>
        </div>
        <ComponentPreview id="color-swatch-basic">
          <BasicSwatchesDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Preset Palettes</h2>
          <p className="mt-1 text-sm text-muted-foreground">Predefined color palettes with shade variations.</p>
        </div>
        <ComponentPreview id="color-swatch-palettes">
          <PresetPalettesDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Custom Colors</h2>
          <p className="mt-1 text-sm text-muted-foreground">Enter custom hex values and save recent colors.</p>
        </div>
        <ComponentPreview id="color-swatch-custom">
          <CustomColorsDemo />
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
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">colors</td>
                <td className="px-4 py-3 text-muted-foreground">string[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">value</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onChange</td>
                <td className="px-4 py-3 text-muted-foreground">(color: string) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;md&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
