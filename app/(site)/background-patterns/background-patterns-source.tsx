import { Hexagon, Triangle, Circle, Square, Diamond, Star, Waves, Grid3x3 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { PatternId } from "@/components/ui/BackgroundPatterns";

export const BACKGROUNDPATTERNS_SOURCE = `"use client";

import { cn } from "@/lib/cn";

type PatternId =
  | "dots" | "grid" | "diagonal" | "waves"
  | "hexagons" | "triangles" | "circles" | "diamonds"
  | "stars" | "crosses" | "zigzag" | "checks"
  | "halftone" | "noise" | "circuit" | "plus";

interface BackgroundPatternsProps {
  variant?: PatternId;
  color?: string;
  size?: number;
  opacity?: number;
  className?: string;
}

const PATTERNS: Record<PatternId, (c: string, s: number) => string> = {
  dots: (c, s) => \`<circle cx="\${s / 2}" cy="\${s / 2}" r="1.5" fill="\${c}" />\`,
  grid: (c, s) => \`<path d="M \${s} 0 L 0 0 0 \${s}" fill="none" stroke="\${c}" stroke-width="0.5" />\`,
  diagonal: (c) => \`<path d="M 0 10 L 10 0 M -2 2 L 2 -2 M 8 12 L 12 8" stroke="\${c}" stroke-width="0.5" />\`,
  waves: (c) => \`<path d="M 0 10 Q 5 5 10 10 T 20 10" fill="none" stroke="\${c}" stroke-width="0.5" />\`,
  hexagons: (c) => \`<path d="M10 0 L18 5 L18 15 L10 20 L2 15 L2 5 Z" fill="none" stroke="\${c}" stroke-width="0.5" />\`,
  triangles: (c) => \`<path d="M10 2 L18 18 L2 18 Z" fill="none" stroke="\${c}" stroke-width="0.5" />\`,
  circles: (c) => \`<circle cx="10" cy="10" r="8" fill="none" stroke="\${c}" stroke-width="0.5" />\`,
  diamonds: (c) => \`<path d="M10 0 L20 10 L10 20 L0 10 Z" fill="none" stroke="\${c}" stroke-width="0.5" />\`,
  stars: (c) => \`<path d="M10 1 L12.5 7.5 L19 7.5 L13.5 12 L15.5 19 L10 14.5 L4.5 19 L6.5 12 L1 7.5 L7.5 7.5 Z" fill="none" stroke="\${c}" stroke-width="0.5" />\`,
  crosses: (c) => \`<path d="M8 4 L12 4 L12 8 L16 8 L16 12 L12 12 L12 16 L8 16 L8 12 L4 12 L4 8 L8 8 Z" fill="none" stroke="\${c}" stroke-width="0.5" />\`,
  zigzag: (c) => \`<path d="M0 5 L5 0 L10 5 L15 0 L20 5" fill="none" stroke="\${c}" stroke-width="0.5" />\`,
  checks: (c) => \`<path d="M0 0 H10 V10 H0 Z M10 10 H20 V20 H10 Z" fill="none" stroke="\${c}" stroke-width="0.5" />\`,
  halftone: (c) => \`<circle cx="5" cy="5" r="1" fill="\${c}" /><circle cx="15" cy="15" r="1.5" fill="\${c}" /><circle cx="15" cy="5" r="0.8" fill="\${c}" /><circle cx="5" cy="15" r="1.2" fill="\${c}" />\`,
  noise: (c) => \`<rect x="2" y="3" width="1" height="1" fill="\${c}" opacity="0.5" /><rect x="8" y="1" width="1" height="1" fill="\${c}" opacity="0.3" /><rect x="14" y="6" width="1" height="1" fill="\${c}" opacity="0.6" /><rect x="4" y="12" width="1" height="1" fill="\${c}" opacity="0.4" /><rect x="11" y="14" width="1" height="1" fill="\${c}" opacity="0.5" /><rect x="17" y="10" width="1" height="1" fill="\${c}" opacity="0.3" />\`,
  circuit: (c) => \`<path d="M0 10 H8 M12 10 H20 M10 0 V8 M10 12 V20 M8 8 H12 V12 H8 Z" fill="none" stroke="\${c}" stroke-width="0.5" /><circle cx="10" cy="10" r="1.5" fill="\${c}" />\`,
  plus: (c) => \`<path d="M8 4 L12 4 L12 8 L16 8 L16 12 L12 12 L12 16 L8 16 L8 12 L4 12 L4 8 L8 8 Z" fill="\${c}" opacity="0.15" />\`,
};

export function BackgroundPatterns({
  variant = "dots",
  color = "#6366f1",
  size = 20,
  opacity = 1,
  className,
}: BackgroundPatternsProps) {
  const render = PATTERNS[variant] ?? PATTERNS.dots;
  const patternId = \`\${variant}-\${color}-\${size}\`;
  return (
    <svg className={cn("h-full w-full", className)} xmlns="http://www.w3.org/2000/svg" style={{ opacity }} aria-hidden="true">
      <defs>
        <pattern id={patternId} width={size} height={size} patternUnits="userSpaceOnUse"
          dangerouslySetInnerHTML={{ __html: render(color, size) }} />
      </defs>
      <rect width="100%" height="100%" fill={\`url(#\${patternId})\`} />
    </svg>
  );
}`;

export type { PatternId };

interface PatternDef {
  id: PatternId;
  label: string;
  icon: LucideIcon;
  svg: (c: string, s: number) => string;
}

export const PATTERNS: PatternDef[] = [
  { id: "dots", label: "Dots", icon: Circle, svg: (c, s) => `<circle cx="${s / 2}" cy="${s / 2}" r="1.5" fill="${c}" />` },
  { id: "grid", label: "Grid", icon: Grid3x3, svg: (c, s) => `<path d="M ${s} 0 L 0 0 0 ${s}" fill="none" stroke="${c}" stroke-width="0.5" />` },
  { id: "diagonal", label: "Diagonal", icon: Square, svg: (c) => `<path d="M 0 10 L 10 0 M -2 2 L 2 -2 M 8 12 L 12 8" stroke="${c}" stroke-width="0.5" />` },
  { id: "waves", label: "Waves", icon: Waves, svg: (c) => `<path d="M 0 10 Q 5 5 10 10 T 20 10" fill="none" stroke="${c}" stroke-width="0.5" />` },
  { id: "hexagons", label: "Hexagons", icon: Hexagon, svg: (c) => `<path d="M10 0 L18 5 L18 15 L10 20 L2 15 L2 5 Z" fill="none" stroke="${c}" stroke-width="0.5" />` },
  { id: "triangles", label: "Triangles", icon: Triangle, svg: (c) => `<path d="M10 2 L18 18 L2 18 Z" fill="none" stroke="${c}" stroke-width="0.5" />` },
  { id: "circles", label: "Circles", icon: Circle, svg: (c) => `<circle cx="10" cy="10" r="8" fill="none" stroke="${c}" stroke-width="0.5" />` },
  { id: "diamonds", label: "Diamonds", icon: Diamond, svg: (c) => `<path d="M10 0 L20 10 L10 20 L0 10 Z" fill="none" stroke="${c}" stroke-width="0.5" />` },
  { id: "stars", label: "Stars", icon: Star, svg: (c) => `<path d="M10 1 L12.5 7.5 L19 7.5 L13.5 12 L15.5 19 L10 14.5 L4.5 19 L6.5 12 L1 7.5 L7.5 7.5 Z" fill="none" stroke="${c}" stroke-width="0.5" />` },
  { id: "crosses", label: "Crosses", icon: Square, svg: (c) => `<path d="M8 4 L12 4 L12 8 L16 8 L16 12 L12 12 L12 16 L8 16 L8 12 L4 12 L4 8 L8 8 Z" fill="none" stroke="${c}" stroke-width="0.5" />` },
  { id: "zigzag", label: "Zigzag", icon: Waves, svg: (c) => `<path d="M0 5 L5 0 L10 5 L15 0 L20 5" fill="none" stroke="${c}" stroke-width="0.5" />` },
  { id: "checks", label: "Checks", icon: Square, svg: (c) => `<path d="M0 0 H10 V10 H0 Z M10 10 H20 V20 H10 Z" fill="none" stroke="${c}" stroke-width="0.5" />` },
  { id: "halftone", label: "Halftone", icon: Circle, svg: (c) => `<circle cx="5" cy="5" r="1" fill="${c}" /><circle cx="15" cy="15" r="1.5" fill="${c}" /><circle cx="15" cy="5" r="0.8" fill="${c}" /><circle cx="5" cy="15" r="1.2" fill="${c}" />` },
  { id: "noise", label: "Noise", icon: Grid3x3, svg: (c) => `<rect x="2" y="3" width="1" height="1" fill="${c}" opacity="0.5" /><rect x="8" y="1" width="1" height="1" fill="${c}" opacity="0.3" /><rect x="14" y="6" width="1" height="1" fill="${c}" opacity="0.6" /><rect x="4" y="12" width="1" height="1" fill="${c}" opacity="0.4" /><rect x="11" y="14" width="1" height="1" fill="${c}" opacity="0.5" /><rect x="17" y="10" width="1" height="1" fill="${c}" opacity="0.3" />` },
  { id: "circuit", label: "Circuit", icon: Square, svg: (c) => `<path d="M0 10 H8 M12 10 H20 M10 0 V8 M10 12 V20 M8 8 H12 V12 H8 Z" fill="none" stroke="${c}" stroke-width="0.5" /><circle cx="10" cy="10" r="1.5" fill="${c}" />` },
  { id: "plus", label: "Plus", icon: Square, svg: (c) => `<path d="M8 4 L12 4 L12 8 L16 8 L16 12 L12 12 L12 16 L8 16 L8 12 L4 12 L4 8 L8 8 Z" fill="${c}" opacity="0.15" />` },
];

export const COLORS = [
  { label: "Indigo", value: "#6366f1" },
  { label: "Pink", value: "#ec4899" },
  { label: "Emerald", value: "#10b981" },
  { label: "Amber", value: "#f59e0b" },
  { label: "Rose", value: "#ef4444" },
  { label: "Cyan", value: "#06b6d4" },
  { label: "Violet", value: "#8b5cf6" },
  { label: "Slate", value: "#64748b" },
];

export const DENSITIES = [
  { label: "Tight", value: 12 },
  { label: "Normal", value: 20 },
  { label: "Wide", value: 30 },
  { label: "Sparse", value: 40 },
];

export function PatternSVG({ pattern, color, size = 20, opacity = 1 }: { pattern: PatternId; color: string; size?: number; opacity?: number }) {
  const def = PATTERNS.find((p) => p.id === pattern)!;
  return (
    <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg" style={{ opacity }} aria-hidden="true">
      <defs>
        <pattern id={`${pattern}-${color}-${size}`} x="0" y="0" width={size} height={size} patternUnits="userSpaceOnUse" dangerouslySetInnerHTML={{ __html: def.svg(color, size) }} />
      </defs>
      <rect width="100%" height="100%" fill={`url(#${pattern}-${color}-${size})`} />
    </svg>
  );
}

export function PatternCard({ pattern, color, size, label }: { pattern: PatternId; color: string; size?: number; label?: string }) {
  return (
    <div className="group relative h-32 w-full overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:shadow-md hover:shadow-black/5">
      <PatternSVG pattern={pattern} color={color} size={size} />
      {label && (
        <div className="absolute bottom-2 left-2 rounded-lg border border-border/50 bg-background/80 px-2.5 py-1 text-[11px] font-medium text-foreground backdrop-blur-sm transition-colors group-hover:bg-background/90">
          {label}
        </div>
      )}
    </div>
  );
}

export function HeroPreview({ pattern, color }: { pattern: PatternId; color: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border">
      <div className="relative bg-gradient-to-br from-background via-background to-muted/50 px-8 py-16 text-center">
        <PatternSVG pattern={pattern} color={color} opacity={0.3} />
        <div className="relative z-10">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Build Something Amazing</h2>
          <p className="mt-2 text-sm text-muted-foreground">Create beautiful interfaces with pattern backgrounds</p>
          <div className="mt-5 flex justify-center gap-3">
            <div className="rounded-xl bg-foreground px-5 py-2.5 text-sm font-medium text-background shadow-md">Get Started</div>
            <div className="rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted">Learn More</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CardGrid({ pattern, color }: { pattern: PatternId; color: string }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {["Features", "Pricing", "Docs"].map((title) => (
        <div key={title} className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 hover:shadow-md hover:shadow-black/5">
          <div className="relative h-24">
            <PatternSVG pattern={pattern} color={color} opacity={0.2} />
          </div>
          <div className="p-3">
            <h3 className="text-sm font-medium text-foreground">{title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">Description text</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function DensityCompare({ color }: { color: string }) {
  return (
    <div className="grid grid-cols-4 gap-3">
      {DENSITIES.map((d) => (
        <div key={d.value} className="flex flex-col gap-2">
          <div className="relative h-24 overflow-hidden rounded-xl border border-border bg-card">
            <PatternSVG pattern="dots" color={color} size={d.value} />
          </div>
          <span className="text-center text-xs font-medium text-muted-foreground">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

export const COLORS_EXAMPLE = `<BackgroundPatterns variant="dots" color="#6366f1" />
<BackgroundPatterns variant="grid" color="#10b981" />`;

export const DENSITY_EXAMPLE = `<BackgroundPatterns variant="dots" size={12} />
<BackgroundPatterns variant="dots" size={20} />
<BackgroundPatterns variant="dots" size={30} />
<BackgroundPatterns variant="dots" size={40} />`;

export const INTERACTIVE_EXAMPLE = `<BackgroundPatterns variant="hexagons" color="#8b5cf6" size={24} opacity={0.6} />`;

export const HERO_EXAMPLE = `<div className="relative overflow-hidden rounded-2xl border border-border">
  <div className="relative px-8 py-16 text-center">
    <BackgroundPatterns variant="dots" color="#6366f1" opacity={0.3} />
    <div className="relative z-10">
      <h2 className="text-2xl font-bold tracking-tight text-foreground">Build Something Amazing</h2>
    </div>
  </div>
</div>`;

export const CARDS_EXAMPLE = `<div className="grid grid-cols-3 gap-3">
  <BackgroundPatterns variant="dots" color="#6366f1" opacity={0.2} />
  <BackgroundPatterns variant="waves" color="#06b6d4" opacity={0.2} />
  <BackgroundPatterns variant="grid" color="#10b981" opacity={0.2} />
</div>`;
