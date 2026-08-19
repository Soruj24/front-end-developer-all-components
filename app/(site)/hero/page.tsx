"use client";

import { useState } from "react";
import type { ComponentType } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import {
  CenteredHero,
  SplitHero,
  StatsHero,
  AnimatedGradientHero,
  ParticleHero,
  VideoBackgroundHero,
  GlassmorphismHero,
  NeonGlowHero,
  TypewriterHero,
  BentoGridHero,
  ParallaxHero,
  Card3DHero,
} from "@/features/hero";

const HERO_SOURCE = `"use client";

import { useEffect, useState } from "react";

export interface HeroProps {
  title: string;
  description: string;
  badge?: string;
  variant?: "centered" | "split" | "stats" | "typewriter";
  primaryCta?: string;
  secondaryCta?: string;
}

export function Hero({
  title,
  description,
  badge = "Now in public beta",
  variant = "centered",
  primaryCta = "Get Started",
  secondaryCta = "Learn More",
}: HeroProps) {
  const words = ["developers", "designers", "teams"];
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, text.length + 1));
        if (text.length === word.length) setDeleting(true);
      } else if (text.length === 0) {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      } else {
        setText(word.slice(0, text.length - 1));
      }
    }, deleting ? 50 : 120);
    return () => clearTimeout(timeout);
  }, [text, deleting, index]);

  const actions = (
    <div className="flex gap-4">
      <button className="rounded-lg bg-zinc-900 px-6 py-3 font-medium text-white hover:bg-zinc-700 dark:bg-foreground dark:text-background">{primaryCta}</button>
      <button className="rounded-lg border border-border px-6 py-3 font-medium text-muted-foreground hover:bg-muted">{secondaryCta}</button>
    </div>
  );

  const headline = variant === "typewriter" ? (
    <>
      Built for{" "}
      <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">{text}</span>
      <span className="ml-1 inline-block h-[1em] w-[3px] animate-pulse bg-emerald-500" />
    </>
  ) : title;

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 rounded-xl border border-border bg-gradient-to-b from-zinc-50 to-white p-8 text-center dark:from-zinc-900 dark:to-black">
      <span className="rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-200">{badge}</span>
      <h2 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">{headline}</h2>
      <p className="max-w-xl text-muted-foreground">{description}</p>
      {variant === "stats" ? (
        <div className="grid w-full max-w-lg grid-cols-3 gap-4">
          {[{ label: "Users", value: "10k+" }, { label: "Components", value: "1000+" }, { label: "Templates", value: "300+" }].map((s) => (
            <div key={s.label} className="rounded-lg border border-border bg-background/60 p-4">
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      ) : null}
      {actions}
    </div>
  );
}`;

const STYLES: Array<{ label: string; Render: ComponentType }> = [
  { label: "Centered", Render: CenteredHero },
  { label: "Split", Render: SplitHero },
  { label: "Stats", Render: StatsHero },
  { label: "Animated Gradient", Render: AnimatedGradientHero },
  { label: "Particle", Render: ParticleHero },
  { label: "Video Background", Render: VideoBackgroundHero },
  { label: "Glassmorphism", Render: GlassmorphismHero },
  { label: "Neon Glow", Render: NeonGlowHero },
  { label: "Typewriter", Render: TypewriterHero },
  { label: "Bento Grid", Render: BentoGridHero },
  { label: "Parallax", Render: ParallaxHero },
  { label: "3D Card", Render: Card3DHero },
];

function StyleSwitcher() {
  const [activeStyle, setActiveStyle] = useState(0);
  const { Render: Active } = STYLES[activeStyle];
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {STYLES.map((s, i) => (
          <button
            key={s.label}
            onClick={() => setActiveStyle(i)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              activeStyle === i
                ? "bg-blue-500 text-white shadow"
                : "bg-muted text-muted-foreground hover:bg-muted"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      <Active />
    </div>
  );
}

export default function HeroPage() {
  return (
    <ComponentDocPage
      name="Hero Sections"
      category="Layout"
      description="12 hero patterns — centered, split, animated, 3D, glassmorphism, and more."
    >
      <PreviewPanel filename="hero.tsx">
        <StyleSwitcher />
      </PreviewPanel>

      <SourceCodeViewer
        source={HERO_SOURCE}
        filename="components/ui/Hero/Hero.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock
          title="Centered"
          description="Badge, headline, subtext, and call-to-action buttons."
          code={`<Hero title="Build modern web apps faster." description="A powerful platform for building, deploying, and scaling." />`}
        >
          <CenteredHero />
        </ExampleBlock>

        <ExampleBlock
          title="Typewriter"
          description="Headline text that cycles through words."
          code={`<Hero variant="typewriter" title="Built for teams" description="Animated text that cycles through words." />`}
        >
          <TypewriterHero />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}