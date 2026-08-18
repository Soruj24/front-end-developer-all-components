"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Palette,
  Droplet,
  Copy,
  Check,
  Paintbrush,
  Pipette,
  Layers,
  Blend,
} from "lucide-react";

const installCommand = `npx component-library@latest add droplet-color`;
const usageCode = `import { DropletColor } from "@/components/droplet-color";

<DropletColor
  value="#3b82f6"
  onChange={(color) => setColor(color)}
/>`;

const presetColors = [
  "#ef4444", "#f97316", "#eab308", "#22c55e",
  "#3b82f6", "#8b5cf6", "#ec4899", "#06b6d4",
];

function PresetColorsDemo() {
  const [selected, setSelected] = useState("#3b82f6");
  const [copied, setCopied] = useState(false);

  const copyColor = () => {
    navigator.clipboard.writeText(selected);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <div
        className="h-20 w-20 rounded-full shadow-lg border-4 border-white dark:border-card"
        style={{ backgroundColor: selected }}
      />
      <div className="flex gap-2">
        {presetColors.map((c) => (
          <button
            key={c}
            onClick={() => setSelected(c)}
            className={`h-8 w-8 rounded-full border-2 transition-all hover:scale-110 ${
              selected === c ? "border-foreground scale-110 shadow-md" : "border-transparent"
            }`}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
      <button
        onClick={copyColor}
        className="inline-flex items-center gap-2 rounded-lg border border-black/[.08] px-3 py-1.5 text-xs font-mono font-medium hover:bg-muted dark:border-white/[.145]"
      >
        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        {selected}
      </button>
    </div>
  );
}

function HSLSlidersDemo() {
  const [hue, setHue] = useState(200);
  const [sat, setSat] = useState(80);
  const [light, setLight] = useState(50);

  return (
    <div className="flex flex-col gap-4 w-full max-w-xs">
      <div
        className="h-16 rounded-xl shadow-md border border-black/[.08] dark:border-white/[.145]"
        style={{ backgroundColor: `hsl(${hue}, ${sat}%, ${light}%)` }}
      />
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="text-xs w-6 text-muted-foreground font-medium">H</span>
          <input
            type="range"
            min={0}
            max={360}
            value={hue}
            onChange={(e) => setHue(Number(e.target.value))}
            className="flex-1 accent-primary"
          />
          <span className="text-xs font-mono w-10 text-right tabular-nums">{hue}°</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs w-6 text-muted-foreground font-medium">S</span>
          <input
            type="range"
            min={0}
            max={100}
            value={sat}
            onChange={(e) => setSat(Number(e.target.value))}
            className="flex-1 accent-primary"
          />
          <span className="text-xs font-mono w-10 text-right tabular-nums">{sat}%</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs w-6 text-muted-foreground font-medium">L</span>
          <input
            type="range"
            min={0}
            max={100}
            value={light}
            onChange={(e) => setLight(Number(e.target.value))}
            className="flex-1 accent-primary"
          />
          <span className="text-xs font-mono w-10 text-right tabular-nums">{light}%</span>
        </div>
      </div>
      <div className="rounded-lg bg-muted/50 px-3 py-2">
        <p className="text-[10px] text-muted-foreground">
          hsl({hue}, {sat}%, {light}%)
        </p>
      </div>
    </div>
  );
}

function BrandColorPickerDemo() {
  const [brand, setBrand] = useState({ primary: "#3b82f6", secondary: "#8b5cf6", accent: "#ec4899" });
  const [copied, setCopied] = useState("");

  const presets = {
    primary: ["#3b82f6", "#2563eb", "#1d4ed8", "#0ea5e9"],
    secondary: ["#8b5cf6", "#7c3aed", "#6d28d9", "#a855f7"],
    accent: ["#ec4899", "#db2777", "#d946ef", "#f43f5e"],
  };

  const copyColor = (key: string, color: string) => {
    navigator.clipboard.writeText(color);
    setCopied(key);
    setTimeout(() => setCopied(""), 1500);
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
        <h3 className="mb-4 text-sm font-semibold">Brand Colors</h3>
        <div className="space-y-4">
          {(["primary", "secondary", "accent"] as const).map((key) => (
            <div key={key} className="flex items-center gap-3">
              <span className="w-16 text-xs font-medium capitalize text-muted-foreground">{key}</span>
              <div className="flex gap-1.5">
                {presets[key].map((c) => (
                  <button
                    key={c}
                    onClick={() => setBrand({ ...brand, [key]: c })}
                    className={`h-7 w-7 rounded-md border-2 transition-all ${
                      brand[key] === c ? "border-foreground scale-110" : "border-transparent hover:scale-105"
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <button
                onClick={() => copyColor(key, brand[key])}
                className="ml-auto inline-flex items-center gap-1 rounded-md border border-black/[.08] px-2 py-1 text-[10px] font-mono hover:bg-muted dark:border-white/[.145]"
              >
                {copied === key ? <Check className="h-2.5 w-2.5" /> : <Copy className="h-2.5 w-2.5" />}
                {brand[key]}
              </button>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg bg-muted/30 p-3">
          <div className="flex gap-2">
            <div className="h-8 flex-1 rounded-md" style={{ backgroundColor: brand.primary }} />
            <div className="h-8 flex-1 rounded-md" style={{ backgroundColor: brand.secondary }} />
            <div className="h-8 flex-1 rounded-md" style={{ backgroundColor: brand.accent }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ThemeBuilderDemo() {
  const [theme, setTheme] = useState({
    background: "#ffffff",
    foreground: "#09090b",
    card: "#ffffff",
    muted: "#f4f4f5",
    primary: "#18181b",
    accent: "#f4f4f5",
  });

  const controls = [
    { key: "background", label: "Background" },
    { key: "foreground", label: "Foreground" },
    { key: "card", label: "Card" },
    { key: "muted", label: "Muted" },
    { key: "primary", label: "Primary" },
    { key: "accent", label: "Accent" },
  ];

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
        <h3 className="mb-4 text-sm font-semibold">Theme Builder</h3>
        <div className="mb-4 grid grid-cols-3 gap-2">
          {controls.map((c) => (
            <div key={c.key} className="flex flex-col items-center gap-1">
              <div
                className="h-10 w-full rounded-lg border border-black/[.08] shadow-inner dark:border-white/[.145]"
                style={{ backgroundColor: theme[c.key as keyof typeof theme] }}
              />
              <span className="text-[9px] text-muted-foreground">{c.label}</span>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {controls.map((c) => (
            <div key={c.key} className="flex items-center gap-2">
              <label className="text-[10px] text-muted-foreground w-16">{c.label}</label>
              <input
                type="color"
                value={theme[c.key as keyof typeof theme]}
                onChange={(e) => setTheme({ ...theme, [c.key]: e.target.value })}
                className="h-6 w-6 cursor-pointer rounded border-0"
              />
              <span className="text-[10px] font-mono text-muted-foreground">
                {theme[c.key as keyof typeof theme]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GradientMakerDemo() {
  const [colors, setColors] = useState(["#3b82f6", "#8b5cf6"]);
  const [angle, setAngle] = useState(135);

  const addColor = () => {
    if (colors.length < 4) {
      setColors([...colors, "#ec4899"]);
    }
  };

  const removeColor = (index: number) => {
    if (colors.length > 2) {
      setColors(colors.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
        <h3 className="mb-4 text-sm font-semibold">Gradient Maker</h3>
        <div
          className="mb-4 h-24 rounded-xl shadow-inner border border-black/[.08] dark:border-white/[.145]"
          style={{
            background: `linear-gradient(${angle}deg, ${colors.join(", ")})`,
          }}
        />
        <div className="mb-4 flex items-center gap-3">
          <label className="text-xs text-muted-foreground">Angle</label>
          <input
            type="range"
            min={0}
            max={360}
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="flex-1 accent-primary"
          />
          <span className="text-xs font-mono tabular-nums">{angle}°</span>
        </div>
        <div className="mb-4 flex gap-2">
          {colors.map((c, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <input
                type="color"
                value={c}
                onChange={(e) => {
                  const newColors = [...colors];
                  newColors[i] = e.target.value;
                  setColors(newColors);
                }}
                className="h-8 w-8 cursor-pointer rounded-lg border-2 border-white shadow-sm dark:border-card"
              />
              {colors.length > 2 && (
                <button
                  onClick={() => removeColor(i)}
                  className="text-[8px] text-muted-foreground hover:text-foreground"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          {colors.length < 4 && (
            <button
              onClick={addColor}
              className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-dashed border-black/[.15] text-xs text-muted-foreground hover:border-black/[.3] dark:border-white/[.2]"
            >
              +
            </button>
          )}
        </div>
        <div className="rounded-lg bg-muted/30 px-3 py-2">
          <p className="text-[10px] font-mono text-muted-foreground">
            linear-gradient({angle}deg, {colors.join(", ")})
          </p>
        </div>
      </div>
    </div>
  );
}

function ColorPaletteDemo() {
  const [base, setBase] = useState("#3b82f6");
  const [copied, setCopied] = useState("");

  const generateShades = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((weight) => {
      const factor = 1 - (weight - 500) / 1000;
      const nr = Math.round(r * factor + (255 - r) * (1 - factor) * 0.3);
      const ng = Math.round(g * factor + (255 - g) * (1 - factor) * 0.3);
      const nb = Math.round(b * factor + (255 - b) * (1 - factor) * 0.3);
      return {
        weight,
        hex: `#${[nr, ng, nb].map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, "0")).join("")}`,
      };
    });
  };

  const shades = generateShades(base);

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(""), 1500);
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Color Palette</h3>
          <input
            type="color"
            value={base}
            onChange={(e) => setBase(e.target.value)}
            className="h-8 w-8 cursor-pointer rounded-lg border-2 border-white shadow-sm dark:border-card"
          />
        </div>
        <div className="space-y-1.5">
          {shades.map((s) => (
            <button
              key={s.weight}
              onClick={() => copyColor(s.hex)}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted/50 transition-colors"
            >
              <div
                className="h-8 w-8 rounded-md shadow-sm"
                style={{ backgroundColor: s.hex }}
              />
              <span className="text-xs font-medium w-10">{s.weight}</span>
              <span className="flex-1 text-left text-xs font-mono text-muted-foreground">{s.hex}</span>
              {copied === s.hex && <Check className="h-3 w-3 text-emerald-500" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function OpacityControlDemo() {
  const [color, setColor] = useState("#3b82f6");
  const [opacity, setOpacity] = useState(100);

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="relative h-20 w-40 rounded-xl overflow-hidden border border-black/[.08] dark:border-white/[.145]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='10' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='5' height='5' fill='%23ccc'/%3E%3Crect x='5' y='5' width='5' height='5' fill='%23ccc'/%3E%3C/svg%3E")`,
          }}
        />
        <div
          className="absolute inset-0 rounded-xl"
          style={{ backgroundColor: color, opacity: opacity / 100 }}
        />
      </div>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="h-8 w-8 cursor-pointer rounded-lg border-2 border-white shadow-sm dark:border-card"
        />
        <input
          type="range"
          min={0}
          max={100}
          value={opacity}
          onChange={(e) => setOpacity(Number(e.target.value))}
          className="w-32 accent-primary"
        />
        <span className="text-xs font-mono tabular-nums w-10">{opacity}%</span>
      </div>
      <div className="rounded-lg bg-muted/50 px-3 py-2">
        <p className="text-[10px] font-mono text-muted-foreground">
          {color} · {opacity}%
        </p>
      </div>
    </div>
  );
}

export default function DropletColorPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Droplet Color
          </h1>
          <Badge variant="primary">Input</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Color picker with preset swatches, HSL sliders, opacity control, and droplet-style
          selection interface.
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
          <h3 className="text-lg font-medium text-foreground">Preset Colors</h3>
          <p className="text-sm text-muted-foreground">
            Quick color selection from preset swatches with copy.
          </p>
          <ComponentPreview id="color-presets">
            <PresetColorsDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">HSL Sliders</h3>
          <p className="text-sm text-muted-foreground">
            Hue, saturation, and lightness controls.
          </p>
          <ComponentPreview id="color-hsl">
            <HSLSlidersDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Brand Color Picker</h3>
          <p className="text-sm text-muted-foreground">
            Pick primary, secondary, and accent colors for a brand.
          </p>
          <ComponentPreview id="color-brand">
            <BrandColorPickerDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Theme Builder</h3>
          <p className="text-sm text-muted-foreground">
            Customize all theme colors with live preview.
          </p>
          <ComponentPreview id="color-theme">
            <ThemeBuilderDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Gradient Maker</h3>
          <p className="text-sm text-muted-foreground">
            Create gradients from picked colors with angle control.
          </p>
          <ComponentPreview id="color-gradient">
            <GradientMakerDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Color Palette</h3>
          <p className="text-sm text-muted-foreground">
            Generate harmonious shades from a base color.
          </p>
          <ComponentPreview id="color-palette">
            <ColorPaletteDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Opacity Control</h3>
          <p className="text-sm text-muted-foreground">
            Color with adjustable opacity and checkerboard preview.
          </p>
          <ComponentPreview id="color-opacity">
            <OpacityControlDemo />
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
                <td className="px-4 py-3 font-mono text-xs">value</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"#000000\""}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onChange</td>
                <td className="px-4 py-3 text-muted-foreground">{"(color: string) => void"}</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">presets</td>
                <td className="px-4 py-3 text-muted-foreground">string[]</td>
                <td className="px-4 py-3 text-muted-foreground">8 colors</td>
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
