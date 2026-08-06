"use client";

import { useState } from "react";
import { ComponentPreview } from "@/components/preview";
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

export default function HeroPage() {
  const [activeStyle, setActiveStyle] = useState(0);
  const { Render: Active, registryId } = STYLES[activeStyle];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Hero Sections</h1>
        <p className="mt-1 text-muted-foreground">12 hero patterns — centered, split, animated, 3D, glassmorphism, and more.</p>
      </div>

      <section>
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
    </div>
  );
}
