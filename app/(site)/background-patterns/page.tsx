"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import type { LucideIcon } from "lucide-react";
import type { PatternId } from "@/components/ui/BackgroundPatterns";
import { cn } from "@/lib/cn";
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

function ColorSwatch({
  value,
  label,
  active,
  onClick,
}: {
  value: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative h-8 w-8 rounded-full transition-all duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        active
          ? "scale-110 ring-2 ring-foreground ring-offset-2 ring-offset-background"
          : "ring-1 ring-border hover:scale-110 hover:ring-foreground/50",
      )}
      style={{ backgroundColor: value }}
      title={label}
      aria-label={`Color: ${label}`}
    >
      {active && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg
            className="h-3.5 w-3.5 text-white drop-shadow-sm"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </span>
      )}
    </button>
  );
}

function PatternIconButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        active
          ? "border-primary bg-primary text-primary-foreground shadow-sm"
          : "border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
      title={label}
      aria-label={`Pattern: ${label}`}
      aria-pressed={active}
    >
      <PatternIcon icon={icon} />
    </button>
  );
}

function AllPatternsGrid({ color }: { color: string }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {PATTERNS.map((p) => (
        <PatternCard key={p.id} pattern={p.id} color={color} label={p.label} />
      ))}
    </div>
  );
}

function PlaygroundDemo() {
  const [activePattern, setActivePattern] = useState<PatternId>("dots");
  const [color, setColor] = useState("#6366f1");
  const [size, setSize] = useState(20);
  const [opacity, setOpacity] = useState(1);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4">
        {/* Pattern selector */}
        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            Pattern
          </p>
          <div className="flex flex-wrap gap-1.5">
            {PATTERNS.map((p) => (
              <PatternIconButton
                key={p.id}
                icon={p.icon}
                label={p.label}
                active={activePattern === p.id}
                onClick={() => setActivePattern(p.id)}
              />
            ))}
          </div>
        </div>

        {/* Color selector */}
        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            Color
          </p>
          <div className="flex gap-2">
            {COLORS.map((c) => (
              <ColorSwatch
                key={c.value}
                value={c.value}
                label={c.label}
                active={color === c.value}
                onClick={() => setColor(c.value)}
              />
            ))}
          </div>
        </div>

        {/* Size + Opacity */}
        <div className="flex gap-6">
          <div className="flex-1">
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              Size: {size}px
            </p>
            <input
              type="range"
              min={8}
              max={60}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-primary/20
                [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md
                [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-primary"
              aria-label="Pattern size"
            />
          </div>
          <div className="flex-1">
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              Opacity: {Math.round(opacity * 100)}%
            </p>
            <input
              type="range"
              min={10}
              max={100}
              value={Math.round(opacity * 100)}
              onChange={(e) => setOpacity(Number(e.target.value) / 100)}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-primary/20
                [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md
                [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-primary"
              aria-label="Pattern opacity"
            />
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="relative h-56 overflow-hidden rounded-2xl border border-border bg-card">
        <PatternSVG
          pattern={activePattern}
          color={color}
          size={size}
          opacity={opacity}
        />
        <div className="absolute right-3 top-3 rounded-lg border border-border/50 bg-background/80 px-2.5 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur-sm">
          {activePattern} / {size}px / {Math.round(opacity * 100)}%
        </div>
      </div>
    </div>
  );
}

export default function BackgroundPatternsPage() {
  const [color, setColor] = useState("#6366f1");

  return (
    <ComponentDocPage
      name="Background Patterns"
      category="Data Display"
      description="16 SVG background patterns with customizable colors, density, and opacity. Perfect for hero sections, cards, and decorative backgrounds."
    >
      <PreviewPanel filename="background-patterns.tsx">
        <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
          {PATTERNS.map((p) => (
            <PatternCard
              key={p.id}
              pattern={p.id}
              color={color}
              label={p.label}
            />
          ))}
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={BACKGROUNDPATTERNS_SOURCE}
        filename="components/ui/BackgroundPatterns/BackgroundPatterns.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-8">
        <ExampleBlock
          title="Color Variations"
          description="Click a color to update all patterns."
          code={COLORS_EXAMPLE}
        >
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              {COLORS.map((c) => (
                <ColorSwatch
                  key={c.value}
                  value={c.value}
                  label={c.label}
                  active={color === c.value}
                  onClick={() => setColor(c.value)}
                />
              ))}
            </div>
            <AllPatternsGrid color={color} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Density Control"
          description="Adjust pattern spacing from tight to sparse."
          code={DENSITY_EXAMPLE}
        >
          <DensityCompare color={color} />
        </ExampleBlock>

        <ExampleBlock
          title="Interactive Playground"
          description="Select pattern, color, size, and opacity."
          code={INTERACTIVE_EXAMPLE}
        >
          <PlaygroundDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Hero Section"
          description="Pattern as a subtle hero background with gradient overlay."
          code={HERO_EXAMPLE}
        >
          <HeroPreview pattern="dots" color={color} />
        </ExampleBlock>

        <ExampleBlock
          title="Card Headers"
          description="Patterns as decorative card headers with hover effects."
          code={CARDS_EXAMPLE}
        >
          <CardGrid pattern="waves" color={color} />
        </ExampleBlock>

        <ExampleBlock
          title="Dark Mode"
          description="Patterns work in both light and dark themes."
          code={COLORS_EXAMPLE}
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="relative h-32 overflow-hidden rounded-xl border border-border bg-background">
              <PatternSVG pattern="hexagons" color="#6366f1" size={16} />
              <span className="absolute bottom-2 left-2 rounded-lg border border-border/50 bg-background/80 px-2.5 py-1 text-[11px] font-medium text-foreground backdrop-blur-sm">
                Light
              </span>
            </div>
            <div className="relative h-32 overflow-hidden rounded-xl border border-border bg-zinc-900">
              <PatternSVG pattern="hexagons" color="#818cf8" size={16} />
              <span className="absolute bottom-2 left-2 rounded-lg border border-white/10 bg-zinc-900/80 px-2.5 py-1 text-[11px] font-medium text-zinc-100 backdrop-blur-sm">
                Dark
              </span>
            </div>
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
