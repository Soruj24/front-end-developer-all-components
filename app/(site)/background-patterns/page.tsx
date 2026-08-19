"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import type { LucideIcon } from "lucide-react";
import type { PatternId } from "./background-patterns-source";
import {
  BACKGROUNDPATTERNS_SOURCE,
  PATTERNS,
  COLORS,
  PatternSVG,
  PatternCard,
  HeroPreview,
  CardGrid,
  DensityCompare,
  COLORS_EXAMPLE,
  DENSITY_EXAMPLE,
  INTERACTIVE_EXAMPLE,
  HERO_EXAMPLE,
  CARDS_EXAMPLE,
} from "./background-patterns-source";

function PatternIcon({ icon }: { icon: LucideIcon }) {
  const Icon = icon;
  return <Icon className="h-4 w-4" />;
}

export default function BackgroundPatternsPage() {
  const [activePattern, setActivePattern] = useState<PatternId>("dots");
  const [color, setColor] = useState("#6366f1");
  const [size, setSize] = useState(20);

  return (
    <ComponentDocPage
      name="Background Patterns"
      category="Data Display"
      description="16 SVG background patterns with customizable colors, density, and opacity. Perfect for hero sections, cards, and decorative backgrounds."
    >
      <PreviewPanel filename="background-patterns.tsx">
        <div className="grid w-full grid-cols-4 gap-3">
          {PATTERNS.map((p) => (
            <PatternCard key={p.id} pattern={p.id} color={color} label={p.label} />
          ))}
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={BACKGROUNDPATTERNS_SOURCE} filename="components/ui/BackgroundPatterns/BackgroundPatterns.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Color Variations" description="Click a color to update all patterns." code={COLORS_EXAMPLE}>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              {COLORS.map((c) => (
                <button key={c.value} onClick={() => setColor(c.value)} className={`h-8 w-8 rounded-full border-2 transition-all hover:scale-110 ${color === c.value ? "scale-110 border-foreground ring-2 ring-foreground/20" : "border-transparent"}`} style={{ backgroundColor: c.value }} title={c.label} />
              ))}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {PATTERNS.slice(0, 8).map((p) => (
                <PatternCard key={p.id} pattern={p.id} color={color} label={p.label} />
              ))}
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Density Control" description="Adjust pattern spacing from tight to sparse." code={DENSITY_EXAMPLE}>
          <DensityCompare color={color} />
        </ExampleBlock>

        <ExampleBlock title="Interactive Playground" description="Select pattern, color, and density." code={INTERACTIVE_EXAMPLE}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-muted-foreground">Pattern</span>
                <div className="flex gap-1">
                  {PATTERNS.map((p) => (
                    <button key={p.id} onClick={() => setActivePattern(p.id)} className={`flex h-8 w-8 items-center justify-center rounded-md border transition-all ${activePattern === p.id ? "border-foreground bg-muted" : "border-border hover:bg-muted/50"}`} title={p.label}>
                      <PatternIcon icon={p.icon} />
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
                <input type="range" min={8} max={60} value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-32 accent-foreground" />
              </div>
            </div>
            <div className="relative h-48 overflow-hidden rounded-lg border border-border">
              <PatternSVG pattern={activePattern} color={color} size={size} />
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Hero Section" description="Pattern as a subtle hero background." code={HERO_EXAMPLE}>
          <HeroPreview pattern={activePattern} color={color} />
        </ExampleBlock>

        <ExampleBlock title="Card Headers" description="Patterns as decorative card headers." code={CARDS_EXAMPLE}>
          <CardGrid pattern={activePattern} color={color} />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}