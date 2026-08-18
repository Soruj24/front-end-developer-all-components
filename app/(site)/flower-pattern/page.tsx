"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add flower-pattern`;
const usageCode = `import { FlowerPattern } from "@/components/flower-pattern";

<FlowerPattern petals={6} color="pink" size={100} />`;

function FlowerRenderer({
  petals = 6,
  color = "#ec4899",
  size = 80,
  rotation = 0,
}: {
  petals?: number;
  color?: string;
  size?: number;
  rotation?: number;
}) {
  return (
    <svg viewBox="0 0 100 100" style={{ width: size, height: size, transform: `rotate(${rotation}deg)` }}>
      {[...Array(petals)].map((_, i) => {
        const angle = (360 / petals) * i;
        return (
          <ellipse
            key={i}
            cx="50"
            cy="25"
            rx="12"
            ry="20"
            fill={color}
            opacity="0.6"
            transform={`rotate(${angle} 50 50)`}
          />
        );
      })}
      <circle cx="50" cy="50" r="8" fill="#fbbf24" />
      <circle cx="50" cy="50" r="4" fill="#f59e0b" />
    </svg>
  );
}

function FlowerVariantsDemo() {
  const flowers = [
    { petals: 4, color: "#f43f5e", label: "4 Petals" },
    { petals: 5, color: "#ec4899", label: "5 Petals" },
    { petals: 6, color: "#a855f7", label: "6 Petals" },
    { petals: 8, color: "#8b5cf6", label: "8 Petals" },
    { petals: 12, color: "#d946ef", label: "12 Petals" },
  ];
  return (
    <div className="flex gap-4 flex-wrap justify-center">
      {flowers.map((f) => (
        <div key={f.petals} className="flex flex-col items-center gap-2">
          <FlowerRenderer petals={f.petals} color={f.color} />
          <span className="text-[10px] text-muted-foreground">{f.label}</span>
        </div>
      ))}
    </div>
  );
}

function FlowerGardenDemo() {
  const flowers = [
    { petals: 5, color: "#ec4899", size: 60, x: "10%", y: "30%" },
    { petals: 8, color: "#a855f7", size: 80, x: "30%", y: "20%" },
    { petals: 6, color: "#f43f5e", size: 70, x: "55%", y: "35%" },
    { petals: 7, color: "#d946ef", size: 55, x: "75%", y: "15%" },
    { petals: 4, color: "#fb7185", size: 65, x: "90%", y: "40%" },
  ];

  return (
    <div className="relative h-48 w-full max-w-lg bg-gradient-to-t from-green-200 to-green-100 dark:from-green-900/30 dark:to-green-800/20 rounded-xl overflow-hidden">
      {flowers.map((f, i) => (
        <div key={i} className="absolute" style={{ left: f.x, top: f.y }}>
          <FlowerRenderer petals={f.petals} color={f.color} size={f.size} />
        </div>
      ))}
    </div>
  );
}

function TiledPatternDemo() {
  return (
    <div className="relative h-36 w-full max-w-md rounded-xl overflow-hidden bg-pink-50 dark:bg-pink-950/20">
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="flowerPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="8" fill="#ec4899" opacity="0.15" />
            <circle cx="20" cy="20" r="3" fill="#fbbf24" opacity="0.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#flowerPattern)" />
      </svg>
    </div>
  );
}

function SizeScaleDemo() {
  const sizes = [30, 50, 70, 90, 110];
  return (
    <div className="flex items-end gap-4">
      {sizes.map((s) => (
        <div key={s} className="flex flex-col items-center gap-1">
          <FlowerRenderer petals={6} color="#ec4899" size={s} />
          <span className="text-[10px] text-muted-foreground">{s}px</span>
        </div>
      ))}
    </div>
  );
}

function SpringHeroDemo() {
  return (
    <div className="w-full max-w-lg">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-pink-50 to-purple-50 border border-black/[.08] p-8 dark:from-pink-950/20 dark:to-purple-950/20 dark:border-white/[.145]">
        <div className="absolute -top-4 -right-4">
          <FlowerRenderer petals={8} color="#ec4899" size={80} rotation={15} />
        </div>
        <div className="absolute -bottom-6 -left-6">
          <FlowerRenderer petals={6} color="#a855f7" size={100} rotation={-20} />
        </div>
        <div className="absolute top-1/2 right-1/4">
          <FlowerRenderer petals={5} color="#f43f5e" size={40} rotation={45} />
        </div>
        <div className="relative z-10">
          <Badge variant="secondary" className="mb-3">Spring Collection</Badge>
          <h2 className="text-2xl font-extrabold">Fresh Blooms</h2>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Discover our new spring collection with beautiful floral patterns and vibrant colors.
          </p>
          <button className="mt-4 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background shadow-sm hover:bg-foreground/90">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}

function GreetingCardDemo() {
  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="relative h-40 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-950/30 dark:to-purple-950/30">
          <div className="absolute top-4 left-4">
            <FlowerRenderer petals={6} color="#ec4899" size={50} />
          </div>
          <div className="absolute top-8 right-8">
            <FlowerRenderer petals={5} color="#a855f7" size={40} rotation={30} />
          </div>
          <div className="absolute bottom-4 left-1/3">
            <FlowerRenderer petals={4} color="#f43f5e" size={35} rotation={-15} />
          </div>
          <div className="absolute bottom-8 right-4">
            <FlowerRenderer petals={7} color="#d946ef" size={45} rotation={60} />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl">🌸</span>
          </div>
        </div>
        <div className="p-5 text-center">
          <h3 className="text-lg font-bold">Happy Birthday!</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Wishing you a day filled with happiness and a year filled with joy.
          </p>
          <button className="mt-4 rounded-lg bg-foreground px-4 py-2 text-xs font-medium text-background shadow-sm hover:bg-foreground/90">
            Send Card
          </button>
        </div>
      </div>
    </div>
  );
}

function FlowerGridDemo() {
  const flowerTypes = [
    { petals: 5, color: "#ec4899", name: "Rose" },
    { petals: 8, color: "#a855f7", name: "Dahlia" },
    { petals: 6, color: "#f43f5e", name: "Lily" },
    { petals: 4, color: "#fb7185", name: "Poppy" },
    { petals: 12, color: "#d946ef", name: "Chrysanthemum" },
    { petals: 7, color: "#8b5cf6", name: "Peony" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 w-full max-w-md">
      {flowerTypes.map((f) => (
        <div key={f.name} className="flex flex-col items-center gap-2 rounded-xl border border-black/[.08] bg-card p-4 dark:border-white/[.145]">
          <FlowerRenderer petals={f.petals} color={f.color} size={60} />
          <span className="text-xs font-medium">{f.name}</span>
          <span className="text-[9px] text-muted-foreground">{f.petals} petals</span>
        </div>
      ))}
    </div>
  );
}

export default function FlowerPatternPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Flower Pattern
          </h1>
          <Badge variant="primary">Visual</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          SVG flower patterns with configurable petals, colors, tiling, and garden scene
          composition.
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
          <h3 className="text-lg font-medium text-foreground">Flower Variants</h3>
          <p className="text-sm text-muted-foreground">
            Different petal counts and color options.
          </p>
          <ComponentPreview id="flower-variants">
            <FlowerVariantsDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Flower Garden</h3>
          <p className="text-sm text-muted-foreground">
            Garden scene with multiple flowers.
          </p>
          <ComponentPreview id="flower-garden">
            <FlowerGardenDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Tiled Pattern</h3>
          <p className="text-sm text-muted-foreground">
            Repeating flower pattern background.
          </p>
          <ComponentPreview id="flower-tiled">
            <TiledPatternDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Size Scale</h3>
          <p className="text-sm text-muted-foreground">
            Different flower sizes from small to large.
          </p>
          <ComponentPreview id="flower-scale">
            <SizeScaleDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Spring Hero</h3>
          <p className="text-sm text-muted-foreground">
            Hero section with flower decorations.
          </p>
          <ComponentPreview id="flower-hero">
            <SpringHeroDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Greeting Card</h3>
          <p className="text-sm text-muted-foreground">
            Birthday card with floral pattern.
          </p>
          <ComponentPreview id="flower-card">
            <GreetingCardDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Flower Grid</h3>
          <p className="text-sm text-muted-foreground">
            Grid of different flower types with labels.
          </p>
          <ComponentPreview id="flower-grid">
            <FlowerGridDemo />
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
                <td className="px-4 py-3 font-mono text-xs">petals</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">6</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">color</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">"pink"</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">80</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">rotation</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">0</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
