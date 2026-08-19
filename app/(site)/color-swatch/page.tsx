"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { Check } from "lucide-react";
import { COLOR_SWATCH_SOURCE } from "./color-swatch-source";

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

const BASIC_CODE = `<ColorSwatch colors={presetColors} value={selected} onChange={setSelected} />`;

const PALETTES_CODE = `<div className="space-y-1">
  <p className="text-xs font-medium capitalize text-muted-foreground">{name}</p>
  <div className="flex gap-1">
    {shades.map((shade) => (
      <button key={shade} className="h-8 flex-1 rounded" style={{ backgroundColor: shade }} />
    ))}
  </div>
</div>`;

const CUSTOM_CODE = `<div className="flex items-center gap-3">
  <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
  <input
    type="text"
    value={color}
    onChange={(e) => setColor(e.target.value)}
    className="flex-1 rounded-lg border border-border px-3 py-2 font-mono text-sm"
  />
  <button onClick={save} className="rounded-lg bg-primary px-3 py-2 text-sm">Save</button>
</div>`;

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
    <ComponentDocPage
      name="Color Swatch"
      category="Forms"
      description="A color swatch picker grid for selecting colors. Supports basic palettes, preset themes, and custom color input."
    >
      <PreviewPanel filename="color-swatch.tsx">
        <BasicSwatchesDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={COLOR_SWATCH_SOURCE}
        filename="components/ui/ColorSwatch/ColorSwatch.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Basic Swatches" description="Click a swatch to select it." code={BASIC_CODE}>
          <BasicSwatchesDemo />
        </ExampleBlock>

        <ExampleBlock title="Preset Palettes" description="Predefined color palettes with shade variations." code={PALETTES_CODE}>
          <PresetPalettesDemo />
        </ExampleBlock>

        <ExampleBlock title="Custom Colors" description="Enter custom hex values and save recent colors." code={CUSTOM_CODE}>
          <CustomColorsDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}