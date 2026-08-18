"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Hexagon,
  Triangle,
  Circle,
  Square,
  Diamond,
  Star,
  Waves,
  Grid3x3,
} from "lucide-react";

const installCommand = `npx component-library@latest add background-patterns`;

const usageCode = `import { BackgroundPatterns } from "@/components/ui";

<BackgroundPatterns variant="dots" color="#6366f1" />
<BackgroundPatterns variant="grid" color="#10b981" density={20} />`;

type PatternId =
  | "dots" | "grid" | "diagonal" | "waves"
  | "hexagons" | "triangles" | "circles" | "diamonds"
  | "stars" | "crosses" | "zigzag" | "checks"
  | "halftone" | "noise" | "circuit" | "plus";

interface PatternDef {
  id: PatternId;
  label: string;
  icon: React.ReactNode;
  svg: (c: string, s: number) => string;
}

const PATTERNS: PatternDef[] = [
  {
    id: "dots", label: "Dots", icon: <Circle className="h-4 w-4" />,
    svg: (c, s) => `<circle cx="${s/2}" cy="${s/2}" r="1.5" fill="${c}" />`,
  },
  {
    id: "grid", label: "Grid", icon: <Grid3x3 className="h-4 w-4" />,
    svg: (c, s) => `<path d="M ${s} 0 L 0 0 0 ${s}" fill="none" stroke="${c}" stroke-width="0.5" />`,
  },
  {
    id: "diagonal", label: "Diagonal", icon: <Square className="h-4 w-4" />,
    svg: (c) => `<path d="M 0 10 L 10 0 M -2 2 L 2 -2 M 8 12 L 12 8" stroke="${c}" stroke-width="0.5" />`,
  },
  {
    id: "waves", label: "Waves", icon: <Waves className="h-4 w-4" />,
    svg: (c) => `<path d="M 0 10 Q 5 5 10 10 T 20 10" fill="none" stroke="${c}" stroke-width="0.5" />`,
  },
  {
    id: "hexagons", label: "Hexagons", icon: <Hexagon className="h-4 w-4" />,
    svg: (c) => `<path d="M10 0 L18 5 L18 15 L10 20 L2 15 L2 5 Z" fill="none" stroke="${c}" stroke-width="0.5" />`,
  },
  {
    id: "triangles", label: "Triangles", icon: <Triangle className="h-4 w-4" />,
    svg: (c) => `<path d="M10 2 L18 18 L2 18 Z" fill="none" stroke="${c}" stroke-width="0.5" />`,
  },
  {
    id: "circles", label: "Circles", icon: <Circle className="h-4 w-4" />,
    svg: (c) => `<circle cx="10" cy="10" r="8" fill="none" stroke="${c}" stroke-width="0.5" />`,
  },
  {
    id: "diamonds", label: "Diamonds", icon: <Diamond className="h-4 w-4" />,
    svg: (c) => `<path d="M10 0 L20 10 L10 20 L0 10 Z" fill="none" stroke="${c}" stroke-width="0.5" />`,
  },
  {
    id: "stars", label: "Stars", icon: <Star className="h-4 w-4" />,
    svg: (c) => `<path d="M10 1 L12.5 7.5 L19 7.5 L13.5 12 L15.5 19 L10 14.5 L4.5 19 L6.5 12 L1 7.5 L7.5 7.5 Z" fill="none" stroke="${c}" stroke-width="0.5" />`,
  },
  {
    id: "crosses", label: "Crosses", icon: <Square className="h-4 w-4" />,
    svg: (c) => `<path d="M8 4 L12 4 L12 8 L16 8 L16 12 L12 12 L12 16 L8 16 L8 12 L4 12 L4 8 L8 8 Z" fill="none" stroke="${c}" stroke-width="0.5" />`,
  },
  {
    id: "zigzag", label: "Zigzag", icon: <Waves className="h-4 w-4" />,
    svg: (c) => `<path d="M0 5 L5 0 L10 5 L15 0 L20 5" fill="none" stroke="${c}" stroke-width="0.5" />`,
  },
  {
    id: "checks", label: "Checks", icon: <Square className="h-4 w-4" />,
    svg: (c) => `<path d="M0 0 H10 V10 H0 Z M10 10 H20 V20 H10 Z" fill="none" stroke="${c}" stroke-width="0.5" />`,
  },
  {
    id: "halftone", label: "Halftone", icon: <Circle className="h-4 w-4" />,
    svg: (c) => `<circle cx="5" cy="5" r="1" fill="${c}" /><circle cx="15" cy="15" r="1.5" fill="${c}" /><circle cx="15" cy="5" r="0.8" fill="${c}" /><circle cx="5" cy="15" r="1.2" fill="${c}" />`,
  },
  {
    id: "noise", label: "Noise", icon: <Grid3x3 className="h-4 w-4" />,
    svg: (c) => `<rect x="2" y="3" width="1" height="1" fill="${c}" opacity="0.5" /><rect x="8" y="1" width="1" height="1" fill="${c}" opacity="0.3" /><rect x="14" y="6" width="1" height="1" fill="${c}" opacity="0.6" /><rect x="4" y="12" width="1" height="1" fill="${c}" opacity="0.4" /><rect x="11" y="14" width="1" height="1" fill="${c}" opacity="0.5" /><rect x="17" y="10" width="1" height="1" fill="${c}" opacity="0.3" />`,
  },
  {
    id: "circuit", label: "Circuit", icon: <Square className="h-4 w-4" />,
    svg: (c) => `<path d="M0 10 H8 M12 10 H20 M10 0 V8 M10 12 V20 M8 8 H12 V12 H8 Z" fill="none" stroke="${c}" stroke-width="0.5" /><circle cx="10" cy="10" r="1.5" fill="${c}" />`,
  },
  {
    id: "plus", label: "Plus", icon: <Square className="h-4 w-4" />,
    svg: (c) => `<path d="M8 4 L12 4 L12 8 L16 8 L16 12 L12 12 L12 16 L8 16 L8 12 L4 12 L4 8 L8 8 Z" fill="${c}" opacity="0.15" />`,
  },
];

const COLORS = [
  { label: "Indigo", value: "#6366f1" },
  { label: "Pink", value: "#ec4899" },
  { label: "Emerald", value: "#10b981" },
  { label: "Amber", value: "#f59e0b" },
  { label: "Rose", value: "#ef4444" },
  { label: "Cyan", value: "#06b6d4" },
  { label: "Violet", value: "#8b5cf6" },
  { label: "Slate", value: "#64748b" },
];

const DENSITIES = [
  { label: "Tight", value: 12 },
  { label: "Normal", value: 20 },
  { label: "Wide", value: 30 },
  { label: "Sparse", value: 40 },
];

function PatternSVG({ pattern, color, size = 20, opacity = 1 }: { pattern: PatternId; color: string; size?: number; opacity?: number }) {
  const def = PATTERNS.find((p) => p.id === pattern)!;
  return (
    <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
      <defs>
        <pattern id={`${pattern}-${color}-${size}`} x="0" y="0" width={size} height={size} patternUnits="userSpaceOnUse" dangerouslySetInnerHTML={{ __html: def.svg(color, size) }} />
      </defs>
      <rect width="100%" height="100%" fill={`url(#${pattern}-${color}-${size})`} />
    </svg>
  );
}

function PatternCard({ pattern, color, size, label }: { pattern: PatternId; color: string; size?: number; label?: string }) {
  return (
    <div className="relative h-32 w-full overflow-hidden rounded-lg border border-border bg-background">
      <PatternSVG pattern={pattern} color={color} size={size} />
      {label && (
        <div className="absolute bottom-2 left-2 rounded-md bg-background/80 px-2 py-0.5 text-xs font-medium backdrop-blur-sm">
          {label}
        </div>
      )}
    </div>
  );
}

function HeroPreview({ pattern, color }: { pattern: PatternId; color: string }) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-border">
      <div className="relative bg-gradient-to-br from-background via-background to-muted/50 px-8 py-16 text-center">
        <PatternSVG pattern={pattern} color={color} opacity={0.3} />
        <div className="relative z-10">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Build Something Amazing</h2>
          <p className="mt-2 text-sm text-muted-foreground">Create beautiful interfaces with pattern backgrounds</p>
          <div className="mt-4 flex justify-center gap-3">
            <div className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background">Get Started</div>
            <div className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground">Learn More</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardGrid({ pattern, color }: { pattern: PatternId; color: string }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {["Features", "Pricing", "Docs"].map((title) => (
        <div key={title} className="relative overflow-hidden rounded-lg border border-border">
          <div className="relative h-24">
            <PatternSVG pattern={pattern} color={color} opacity={0.2} />
          </div>
          <div className="p-3">
            <h3 className="text-sm font-medium">{title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">Description text</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function DensityCompare({ color }: { color: string }) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {DENSITIES.map((d) => (
        <div key={d.value} className="flex flex-col gap-2">
          <div className="relative h-24 overflow-hidden rounded-lg border border-border">
            <PatternSVG pattern="dots" color={color} size={d.value} />
          </div>
          <span className="text-center text-xs text-muted-foreground">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function BackgroundPatternsPage() {
  const [activePattern, setActivePattern] = useState<PatternId>("dots");
  const [color, setColor] = useState("#6366f1");
  const [size, setSize] = useState(20);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Background Patterns</h1>
          <Badge variant="primary">Visual</Badge>
        </div>
        <p className="max-w-2- text-pretty text-[15px] leading-relaxed text-muted-foreground">
          16 SVG background patterns with customizable colors, density, and opacity. Perfect for hero sections, cards, and decorative backgrounds.
        </p>
      </header>

      {/* Installation */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      {/* Usage */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      {/* All Patterns */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">All Patterns</h2>
          <p className="mt-1 text-sm text-muted-foreground">16 unique SVG patterns for any design need.</p>
        </div>
        <ComponentPreview id="bg-all">
          <div className="grid w-full grid-cols-4 gap-3">
            {PATTERNS.map((p) => (
              <PatternCard key={p.id} pattern={p.id} color={color} label={p.label} />
            ))}
          </div>
        </ComponentPreview>
      </section>

      {/* Color Picker */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Color Variations</h2>
          <p className="mt-1 text-sm text-muted-foreground">Click a color to update all patterns.</p>
        </div>
        <ComponentPreview id="bg-colors">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              {COLORS.map((c) => (
                <button key={c.value} onClick={() => setColor(c.value)} className={`h-8 w-8 rounded-full border-2 transition-all hover:scale-110 ${color === c.value ? "border-foreground scale-110 ring-2 ring-foreground/20" : "border-transparent"}`} style={{ backgroundColor: c.value }} title={c.label} />
              ))}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {PATTERNS.slice(0, 8).map((p) => (
                <PatternCard key={p.id} pattern={p.id} color={color} label={p.label} />
              ))}
            </div>
          </div>
        </ComponentPreview>
      </section>

      {/* Density */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Density Control</h2>
          <p className="mt-1 text-sm text-muted-foreground">Adjust pattern spacing from tight to sparse.</p>
        </div>
        <ComponentPreview id="bg-density">
          <DensityCompare color={color} />
        </ComponentPreview>
      </section>

      {/* Interactive */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Interactive Playground</h2>
          <p className="mt-1 text-sm text-muted-foreground">Select pattern, color, and density.</p>
        </div>
        <ComponentPreview id="bg-interactive">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-muted-foreground">Pattern</span>
                <div className="flex gap-1">
                  {PATTERNS.map((p) => (
                    <button key={p.id} onClick={() => setActivePattern(p.id)} className={`flex h-8 w-8 items-center justify-center rounded-md border transition-all ${activePattern === p.id ? "border-foreground bg-muted" : "border-border hover:bg-muted/50"}`} title={p.label}>
                      {p.icon}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-muted-foreground">Color</span>
                <div className="flex gap-1">
                  {COLORS.map((c) => (
                    <button key={c.value} onClick={() => setColor(c.value)} className={`h-8 w-8 rounded-full border-2 transition-all ${color === c.value ? "border-foreground" : "border-transparent"}`} style={{ backgroundColor: c.value }} />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-muted-foreground">Size: {size}px</span>
                <input type="range" min="8" max="60" value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-32 accent-foreground" />
              </div>
            </div>
            <div className="relative h-48 overflow-hidden rounded-lg border border-border">
              <PatternSVG pattern={activePattern} color={color} size={size} />
            </div>
          </div>
        </ComponentPreview>
      </section>

      {/* Hero Example */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Hero Section</h2>
          <p className="mt-1 text-sm text-muted-foreground">Pattern as a subtle hero background.</p>
        </div>
        <ComponentPreview id="bg-hero">
          <HeroPreview pattern={activePattern} color={color} />
        </ComponentPreview>
      </section>

      {/* Card Grid */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Card Headers</h2>
          <p className="mt-1 text-sm text-muted-foreground">Patterns as decorative card headers.</p>
        </div>
        <ComponentPreview id="bg-cards">
          <CardGrid pattern={activePattern} color={color} />
        </ComponentPreview>
      </section>

      {/* API Reference */}
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
                <td className="px-4 py-3 font-mono text-xs">variant</td>
                <td className="px-4 py-3 text-muted-foreground">PatternId</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;dots&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">color</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;#000&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">20</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">opacity</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">1</td>
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

        <div className="overflow-hidden rounded-lg border">
          <div className="bg-muted/50 px-4 py-2 text-sm font-medium">Available Patterns</div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">ID</th>
                <th className="px-4 py-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {PATTERNS.map((p) => (
                <tr key={p.id} className="border-b last:border-b-0">
                  <td className="px-4 py-2 font-mono text-xs">{p.id}</td>
                  <td className="px-4 py-2 text-muted-foreground">{p.label} pattern</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
