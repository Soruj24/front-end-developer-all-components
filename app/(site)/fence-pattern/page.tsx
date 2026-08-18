"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add fence-pattern`;
const usageCode = `import { FencePattern } from "@/components/fence-pattern";

<FencePattern color="primary" spacing={20} angle={45} />`;

function GridPatternDemo() {
  return (
    <div className="relative h-32 w-full max-w-md overflow-hidden rounded-xl border border-black/[.08] bg-card dark:border-white/[.145]">
      <svg className="h-full w-full">
        {[...Array(20)].map((_, i) => (
          <line key={`v${i}`} x1={i * 20} y1={0} x2={i * 20} y2={150} stroke="currentColor" strokeWidth="1" className="text-primary/20" />
        ))}
        {[...Array(10)].map((_, i) => (
          <line key={`h${i}`} x1={0} y1={i * 16} x2={400} y2={i * 16} stroke="currentColor" strokeWidth="1" className="text-primary/20" />
        ))}
      </svg>
    </div>
  );
}

function DiagonalPatternDemo() {
  return (
    <div className="relative h-32 w-full max-w-md overflow-hidden rounded-xl border border-black/[.08] bg-card dark:border-white/[.145]">
      <svg className="h-full w-full">
        {[...Array(30)].map((_, i) => (
          <line key={`d1-${i}`} x1={i * 20 - 50} y1={0} x2={i * 20 + 100} y2={150} stroke="currentColor" strokeWidth="0.5" className="text-primary/15" />
        ))}
        {[...Array(30)].map((_, i) => (
          <line key={`d2-${i}`} x1={i * 20 + 50} y1={0} x2={i * 20 - 100} y2={150} stroke="currentColor" strokeWidth="0.5" className="text-primary/15" />
        ))}
      </svg>
    </div>
  );
}

function DiamondPatternDemo() {
  const size = 24;
  return (
    <div className="relative h-32 w-full max-w-md overflow-hidden rounded-xl border border-black/[.08] bg-card dark:border-white/[.145]">
      <svg className="h-full w-full">
        {[...Array(20)].map((_, row) =>
          [...Array(20)].map((_, col) => {
            const x = col * size + (row % 2 ? size / 2 : 0);
            const y = row * size;
            return (
              <polygon key={`${row}-${col}`} points={`${x},${y - size / 2} ${x + size / 2},${y} ${x},${y + size / 2} ${x - size / 2},${y}`} fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/20" />
            );
          })
        )}
      </svg>
    </div>
  );
}

function HatchPatternDemo() {
  return (
    <div className="relative h-32 w-full max-w-md overflow-hidden rounded-xl border border-black/[.08] bg-card dark:border-white/[.145]">
      <svg className="h-full w-full">
        {[...Array(25)].map((_, i) => (
          <line key={i} x1={i * 16} y1={0} x2={0} y2={i * 16} stroke="currentColor" strokeWidth="0.5" className="text-emerald-500/20" />
        ))}
        {[...Array(25)].map((_, i) => (
          <line key={`r-${i}`} x1={i * 16} y1={150} x2={400} y2={150 - i * 16} stroke="currentColor" strokeWidth="0.5" className="text-emerald-500/20" />
        ))}
      </svg>
    </div>
  );
}

function HeroBackgroundDemo() {
  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-xl border border-black/[.08] bg-gradient-to-br from-primary/5 to-primary/10 dark:border-white/[.145]">
      <div className="absolute inset-0">
        <svg className="h-full w-full">
          {[...Array(30)].map((_, i) => (
            <line key={`d1-${i}`} x1={i * 20 - 50} y1={0} x2={i * 20 + 100} y2={200} stroke="currentColor" strokeWidth="0.5" className="text-primary/10" />
          ))}
          {[...Array(30)].map((_, i) => (
            <line key={`d2-${i}`} x1={i * 20 + 50} y1={0} x2={i * 20 - 100} y2={200} stroke="currentColor" strokeWidth="0.5" className="text-primary/10" />
          ))}
        </svg>
      </div>
      <div className="relative z-10 p-8 text-center">
        <Badge variant="secondary" className="mb-3">New Release</Badge>
        <h2 className="text-2xl font-extrabold">Build Faster</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Ship production-ready components with pattern backgrounds.
        </p>
        <button className="mt-4 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background shadow-sm hover:bg-foreground/90">
          Get Started
        </button>
      </div>
    </div>
  );
}

function CardBackgroundDemo() {
  const cards = [
    { title: "Grid", desc: "Clean grid overlay", pattern: "grid" },
    { title: "Diagonal", desc: "Dynamic diagonal lines", pattern: "diagonal" },
    { title: "Diamond", desc: "Geometric diamond shapes", pattern: "diamond" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 w-full max-w-lg">
      {cards.map((card) => (
        <div key={card.title} className="relative overflow-hidden rounded-xl border border-black/[.08] bg-card p-4 dark:border-white/[.145]">
          <div className="absolute inset-0 opacity-30">
            <svg className="h-full w-full">
              {card.pattern === "grid" && (
                <>
                  {[...Array(15)].map((_, i) => (
                    <line key={`v${i}`} x1={i * 16} y1={0} x2={i * 16} y2={120} stroke="currentColor" strokeWidth="0.5" className="text-primary/30" />
                  ))}
                  {[...Array(10)].map((_, i) => (
                    <line key={`h${i}`} x1={0} y1={i * 14} x2={200} y2={i * 14} stroke="currentColor" strokeWidth="0.5" className="text-primary/30" />
                  ))}
                </>
              )}
              {card.pattern === "diagonal" && (
                [...Array(20)].map((_, i) => (
                  <line key={i} x1={i * 16 - 30} y1={0} x2={i * 16 + 60} y2={120} stroke="currentColor" strokeWidth="0.5" className="text-primary/30" />
                ))
              )}
              {card.pattern === "diamond" && (
                [...Array(8)].map((_, row) =>
                  [...Array(12)].map((_, col) => {
                    const size = 16;
                    const x = col * size + (row % 2 ? size / 2 : 0);
                    const y = row * size;
                    return (
                      <polygon key={`${row}-${col}`} points={`${x},${y - size / 2} ${x + size / 2},${y} ${x},${y + size / 2} ${x - size / 2},${y}`} fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/30" />
                    );
                  })
                )
              )}
            </svg>
          </div>
          <div className="relative z-10">
            <h3 className="text-sm font-bold">{card.title}</h3>
            <p className="text-[10px] text-muted-foreground">{card.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function BorderPatternDemo() {
  return (
    <div className="w-full max-w-md">
      <div className="relative rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="h-16 relative overflow-hidden bg-gradient-to-r from-primary/10 to-primary/5">
          <svg className="h-full w-full">
            {[...Array(40)].map((_, i) => (
              <line key={i} x1={i * 12 - 20} y1={0} x2={i * 12 + 40} y2={80} stroke="currentColor" strokeWidth="0.5" className="text-primary/20" />
            ))}
          </svg>
        </div>
        <div className="p-5">
          <h3 className="text-sm font-bold">Card with Pattern Border</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            The pattern acts as a decorative header border above the content area.
          </p>
          <div className="mt-3 flex gap-2">
            <button className="rounded-lg bg-foreground px-3 py-1.5 text-xs font-medium text-background hover:bg-foreground/90">
              Action
            </button>
            <button className="rounded-lg border border-black/[.08] px-3 py-1.5 text-xs font-medium hover:bg-muted dark:border-white/[.145]">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PatternShowcaseDemo() {
  const patterns = [
    { name: "Grid", color: "text-blue-500" },
    { name: "Diagonal", color: "text-purple-500" },
    { name: "Diamond", color: "text-emerald-500" },
    { name: "Hatch", color: "text-orange-500" },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 w-full max-w-lg">
      {patterns.map((p) => (
        <div key={p.name} className="flex flex-col items-center gap-1">
          <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-black/[.08] bg-card dark:border-white/[.145]">
            <svg className="h-full w-full">
              {[...Array(10)].map((_, i) => (
                <line key={i} x1={i * 8 - 10} y1={0} x2={i * 8 + 20} y2={70} stroke="currentColor" strokeWidth="0.5" className={p.color} opacity={0.4} />
              ))}
              {[...Array(10)].map((_, i) => (
                <line key={`r-${i}`} x1={i * 8 + 10} y1={0} x2={i * 8 - 20} y2={70} stroke="currentColor" strokeWidth="0.5" className={p.color} opacity={0.4} />
              ))}
            </svg>
          </div>
          <span className="text-[10px] text-muted-foreground">{p.name}</span>
        </div>
      ))}
    </div>
  );
}

export default function FencePatternPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Fence Pattern
          </h1>
          <Badge variant="primary">Visual</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          SVG fence patterns with grid, diagonal, diamond, and hatch variants for decorative
          backgrounds and borders.
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
          <h3 className="text-lg font-medium text-foreground">Grid Pattern</h3>
          <p className="text-sm text-muted-foreground">
            Clean grid overlay for structured backgrounds.
          </p>
          <ComponentPreview id="fence-grid">
            <GridPatternDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Diagonal Pattern</h3>
          <p className="text-sm text-muted-foreground">
            Dynamic diagonal lines for visual interest.
          </p>
          <ComponentPreview id="fence-diagonal">
            <DiagonalPatternDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Diamond Pattern</h3>
          <p className="text-sm text-muted-foreground">
            Geometric diamond shapes for elegant backgrounds.
          </p>
          <ComponentPreview id="fence-diamond">
            <DiamondPatternDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Hatch Pattern</h3>
          <p className="text-sm text-muted-foreground">
            Cross-hatch lines for technical aesthetics.
          </p>
          <ComponentPreview id="fence-hatch">
            <HatchPatternDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Hero Background</h3>
          <p className="text-sm text-muted-foreground">
            Pattern behind hero section with text overlay.
          </p>
          <ComponentPreview id="fence-hero">
            <HeroBackgroundDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Card Background</h3>
          <p className="text-sm text-muted-foreground">
            Different patterns inside card components.
          </p>
          <ComponentPreview id="fence-card">
            <CardBackgroundDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Border Pattern</h3>
          <p className="text-sm text-muted-foreground">
            Pattern as decorative header border.
          </p>
          <ComponentPreview id="fence-border">
            <BorderPatternDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Pattern Showcase</h3>
          <p className="text-sm text-muted-foreground">
            All pattern variants displayed as thumbnails.
          </p>
          <ComponentPreview id="fence-showcase">
            <PatternShowcaseDemo />
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
                <td className="px-4 py-3 font-mono text-xs">variant</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"grid\" | \"diagonal\" | \"diamond\" | \"hatch\""}</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"grid\""}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">color</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"primary\""}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">spacing</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">20</td>
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
