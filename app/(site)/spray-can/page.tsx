"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { SprayCan, Paintbrush, Palette, PenTool, Brush, Pipette, Droplet } from "lucide-react";

const installCommand = `npx component-library@latest add spray-can`;
const usageCode = `<SprayCan color="#ff0000" size="medium" />`;

function SprayPaint() {
  const [color, setColor] = useState("#6366f1");
  const [size, setSize] = useState(40);

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <SprayCan className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Spray Paint</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <div
          className="rounded-full"
          style={{
            width: size,
            height: size,
            backgroundColor: color,
            boxShadow: `0 0 ${size / 3}px ${size / 6}px ${color}40`,
          }}
        />
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-8 w-8 cursor-pointer rounded border-0"
          />
          <input
            type="range"
            min={20}
            max={80}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="accent-primary"
          />
        </div>
        <p className="text-xs text-muted-foreground">{color} · {size}px</p>
      </div>
    </div>
  );
}

function ColorSpray() {
  const [sprayColor, setSprayColor] = useState("#ef4444");
  const [sprayHistory, setSprayHistory] = useState<string[]>([]);

  const spray = () => {
    setSprayHistory((prev) => [...prev, sprayColor].slice(-12));
  };

  const presetColors = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6"];

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <Palette className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Color Spray</span>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-1">
          {presetColors.map((c) => (
            <button
              key={c}
              onClick={() => setSprayColor(c)}
              className={`h-8 w-8 rounded-md transition-transform hover:scale-110 ${
                sprayColor === c ? "ring-2 ring-primary ring-offset-2" : ""
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
        <button
          onClick={spray}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Spray!
        </button>
        {sprayHistory.length > 0 && (
          <div className="flex gap-1">
            {sprayHistory.map((c, i) => (
              <div
                key={i}
                className="h-4 w-4 rounded-full"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function GraffitiText() {
  const [text, setText] = useState("GRAFFITI");
  const [color, setColor] = useState("#ff0000");

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <PenTool className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Graffiti Text</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={12}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm text-center"
          placeholder="Enter text..."
        />
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="h-8 w-16"
        />
        <div
          className="text-center text-4xl font-black uppercase tracking-wider"
          style={{
            color,
            textShadow: `2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000`,
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
}

function PaintEffect() {
  const [brushSize, setBrushSize] = useState(20);
  const [color, setColor] = useState("#3b82f6");

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <Paintbrush className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Paint Effect</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="flex gap-2">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-8 w-8"
          />
          <input
            type="range"
            min={5}
            max={50}
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="accent-primary"
          />
          <span className="text-xs text-muted-foreground">{brushSize}px</span>
        </div>
        <div className="relative h-24 w-full rounded-md border-2 border-dashed bg-white">
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: brushSize,
              height: brushSize,
              backgroundColor: color,
            }}
          />
          <span className="absolute bottom-1 right-2 text-[10px] text-muted-foreground">Preview</span>
        </div>
      </div>
    </div>
  );
}

function ArtTool() {
  const [tool, setTool] = useState("brush");
  const tools = [
    { id: "brush", label: "Brush", icon: Brush },
    { id: "pen", label: "Pen", icon: PenTool },
    { id: "spray", label: "Spray", icon: SprayCan },
    { id: "pipette", label: "Pipette", icon: Droplet },
  ];

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <Brush className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Art Tool</span>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-1">
          {tools.map((t) => (
            <button
              key={t.id}
              onClick={() => setTool(t.id)}
              className={`flex items-center gap-1 rounded-md px-3 py-2 text-xs font-medium transition-colors ${
                tool === t.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <t.icon className="h-3 w-3" />
              {t.label}
            </button>
          ))}
        </div>
        <div className="rounded-md border p-4 text-center">
          <p className="text-sm text-muted-foreground">
            Selected: <span className="font-medium text-foreground">{tools.find((t) => t.id === tool)?.label}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function GradientSpray() {
  const [direction, setDirection] = useState("to right");
  const [colors, setColors] = useState(["#3b82f6", "#8b5cf6"]);

  const directions = ["to right", "to left", "to bottom", "to top", "135deg"];

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <SprayCan className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Gradient Spray</span>
      </div>
      <div className="flex flex-col gap-3">
        <div
          className="h-16 rounded-md"
          style={{
            background: `linear-gradient(${direction}, ${colors[0]}, ${colors[1]})`,
          }}
        />
        <div className="flex gap-2">
          <input
            type="color"
            value={colors[0]}
            onChange={(e) => setColors([e.target.value, colors[1]])}
            className="h-8 w-8"
          />
          <input
            type="color"
            value={colors[1]}
            onChange={(e) => setColors([colors[0], e.target.value])}
            className="h-8 w-8"
          />
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            className="rounded-md border bg-background px-2 py-1 text-xs"
          >
            {directions.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

function ColorBlend() {
  const [color1, setColor1] = useState("#ef4444");
  const [color2, setColor2] = useState("#3b82f6");
  const [blend, setBlend] = useState(50);

  const mixColor = (c1: string, c2: string, ratio: number) => {
    const hex = (c: string) => parseInt(c.slice(1), 16);
    const r1 = (hex(c1) >> 16) & 255;
    const g1 = (hex(c1) >> 8) & 255;
    const b1 = hex(c1) & 255;
    const r2 = (hex(c2) >> 16) & 255;
    const g2 = (hex(c2) >> 8) & 255;
    const b2 = hex(c2) & 255;
    const r = Math.round(r1 + (r2 - r1) * (ratio / 100));
    const g = Math.round(g1 + (g2 - g1) * (ratio / 100));
    const b = Math.round(b1 + (b2 - b1) * (ratio / 100));
    return `rgb(${r}, ${g}, ${b})`;
  };

  const blended = mixColor(color1, color2, blend);

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <Droplet className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Color Blend</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="flex gap-2">
          <input
            type="color"
            value={color1}
            onChange={(e) => setColor1(e.target.value)}
            className="h-10 w-10"
          />
          <div className="h-10 w-10 rounded-full" style={{ backgroundColor: blended }} />
          <input
            type="color"
            value={color2}
            onChange={(e) => setColor2(e.target.value)}
            className="h-10 w-10"
          />
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={blend}
          onChange={(e) => setBlend(Number(e.target.value))}
          className="w-full accent-primary"
        />
        <p className="text-xs text-muted-foreground">Blend: {blend}% · {blended}</p>
      </div>
    </div>
  );
}

export default function SprayCanPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Spray Can</h1>
          <Badge variant="primary">Tools</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A tools component for spray painting effects with customizable colors, sizes, and spray patterns for creative applications.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Spray Paint</h2>
        <ComponentPreview component="SprayCanPaint" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Color Spray</h2>
        <ComponentPreview component="SprayCanColorSpray" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Graffiti Text</h2>
        <ComponentPreview component="SprayCanGraffitiText" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Paint Effect</h2>
        <ComponentPreview component="SprayCanPaintEffect" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Art Tool</h2>
        <ComponentPreview component="SprayCanArtTool" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Gradient Spray</h2>
        <ComponentPreview component="SprayCanGradientSpray" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Color Blend</h2>
        <ComponentPreview component="SprayCanColorBlend" />
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
                <td className="px-4 py-3 font-mono text-xs">color</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">{'"#000000"'}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">{'"small" | "medium" | "large"'}</td>
                <td className="px-4 py-3 text-muted-foreground">{'"medium"'}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">opacity</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">1</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
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
