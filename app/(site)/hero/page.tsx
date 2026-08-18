"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  CenteredHero, SplitHero, StatsHero,
  AnimatedGradientHero, ParticleHero, VideoBackgroundHero,
  GlassmorphismHero, NeonGlowHero, TypewriterHero,
  BentoGridHero, ParallaxHero, Card3DHero,
} from "@/features/hero";

const STYLES: Array<{ label: string; Render: React.ComponentType; registryId: string }> = [
  { label: "Centered", Render: CenteredHero, registryId: "hero-centered" },
  { label: "Split", Render: SplitHero, registryId: "hero-split" },
  { label: "Stats", Render: StatsHero, registryId: "hero-stats" },
  { label: "Animated Gradient", Render: AnimatedGradientHero, registryId: "hero-animated-gradient" },
  { label: "Particle", Render: ParticleHero, registryId: "hero-particle" },
  { label: "Video Background", Render: VideoBackgroundHero, registryId: "hero-video-bg" },
  { label: "Glassmorphism", Render: GlassmorphismHero, registryId: "hero-glassmorphism" },
  { label: "Neon Glow", Render: NeonGlowHero, registryId: "hero-neon-glow" },
  { label: "Typewriter", Render: TypewriterHero, registryId: "hero-typewriter" },
  { label: "Bento Grid", Render: BentoGridHero, registryId: "hero-bento-grid" },
  { label: "Parallax", Render: ParallaxHero, registryId: "hero-parallax" },
  { label: "3D Card", Render: Card3DHero, registryId: "hero-card-3d" },
];

const installCommand = `npx component-library@latest add hero`;

const usageCode = `import { Hero } from "@/components/hero";

<Hero
  variant="centered"
  title="Build faster with modern components"
  description="A collection of production-ready components"
/>`;

const heroProps = [
  { prop: "variant", type: "\"centered\" | \"split\" | \"stats\" | \"animated\" | \"particle\"", default: "\"centered\"", required: "No" },
  { prop: "title", type: "string", default: "-", required: "Yes" },
  { prop: "description", type: "string", default: "-", required: "No" },
  { prop: "children", type: "ReactNode", default: "-", required: "No" },
];

export default function HeroPage() {
  const [activeStyle, setActiveStyle] = useState(0);
  const { Render: Active, registryId } = STYLES[activeStyle];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Hero Sections</h1>
          <Badge variant="primary">{STYLES.length} examples</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          12 hero patterns — centered, split, animated, 3D, glassmorphism, and more.
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

      {/* Examples */}
      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="mb-8 flex flex-wrap gap-2">
          {STYLES.map((s, i) => (
            <button
              key={s.registryId}
              onClick={() => setActiveStyle(i)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeStyle === i
                  ? "bg-blue-500 text-white shadow"
                  : "bg-muted text-muted-foreground hover:bg-muted dark:text-muted-foreground/70 dark:hover:bg-muted"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <ComponentPreview id={registryId}>
          <Active />
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
              {heroProps.map((row, i) => (
                <tr key={row.prop} className={i < heroProps.length - 1 ? "border-b" : ""}>
                  <td className="px-4 py-3 font-mono text-xs">{row.prop}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.type}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.default}</td>
                  <td className="px-4 py-3">{row.required}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
