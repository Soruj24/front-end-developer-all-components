"use client";
import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Waves, Wind, Cloud, Droplet, Sun, Moon, Sparkles } from "lucide-react";

const installCommand = `npx component-library@latest add wave-background`;
const usageCode = `import { WaveBackground } from "@/components/wave-background";

<WaveBackground variant="hero" color="primary" />
`;

function WaveDivider() {
  return (
    <div className="w-full overflow-hidden rounded-lg bg-gradient-to-b from-background to-muted/30">
      <div className="relative h-32">
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,60 C200,120 400,0 600,60 C800,120 1000,0 1200,60 L1200,120 L0,120 Z" className="fill-primary/20" />
          <path d="M0,80 C200,20 400,100 600,40 C800,10 1000,80 1200,40 L1200,120 L0,120 Z" className="fill-primary/10" />
        </svg>
        <div className="absolute top-4 left-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Waves className="h-4 w-4" />
          <span>Wave Divider</span>
        </div>
      </div>
    </div>
  );
}

function OceanWave() {
  return (
    <div className="w-full overflow-hidden rounded-lg bg-gradient-to-b from-blue-500/10 to-blue-600/5">
      <div className="relative h-40">
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,40 C150,80 350,0 500,40 C650,80 850,0 1000,40 C1150,80 1200,0 1200,40 L1200,120 L0,120 Z" className="fill-blue-500/30" />
          <path d="M0,60 C200,20 400,100 600,60 C800,20 1000,100 1200,60 L1200,120 L0,120 Z" className="fill-blue-400/20" />
          <path d="M0,80 C100,100 300,40 500,80 C700,120 900,40 1100,80 L1200,80 L1200,120 L0,120 Z" className="fill-blue-300/15" />
        </svg>
        <div className="absolute top-4 left-4 flex items-center gap-2 text-sm text-blue-600">
          <Cloud className="h-4 w-4" />
          <span>Ocean Waves</span>
        </div>
      </div>
    </div>
  );
}

function AnimatedWave() {
  const [offset, setOffset] = useState(0);
  return (
    <div className="w-full overflow-hidden rounded-lg bg-gradient-to-r from-primary/10 to-primary/5">
      <div className="relative h-36">
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d={`M0,60 C${200 + offset},120 ${400 - offset},0 600,60 C${800 + offset},120 ${1000 - offset},0 1200,60 L1200,120 L0,120 Z`}
            className="fill-primary/25 transition-all duration-700"
          />
          <path
            d={`M0,80 C${150 + offset * 0.5},20 ${350 - offset * 0.5},100 500,80 C${650 + offset * 0.5},20 ${850 - offset * 0.5},100 1000,80 L1200,80 L1200,120 L0,120 Z`}
            className="fill-primary/15 transition-all duration-700"
          />
        </svg>
        <button
          onClick={() => setOffset(prev => (prev + 50) % 200)}
          className="absolute top-4 right-4 flex items-center gap-2 rounded-md bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
        >
          <Wind className="h-3 w-3" />
          Animate
        </button>
      </div>
    </div>
  );
}

function WaveGradient() {
  return (
    <div className="w-full overflow-hidden rounded-lg bg-gradient-to-br from-violet-500/10 via-blue-500/10 to-cyan-500/10">
      <div className="relative h-44">
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" className="stop-color-violet-500" stopOpacity="0.3" />
              <stop offset="50%" className="stop-color-blue-500" stopOpacity="0.2" />
              <stop offset="100%" className="stop-color-cyan-500" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path d="M0,50 C200,100 400,10 600,50 C800,90 1000,10 1200,50 L1200,120 L0,120 Z" fill="url(#waveGrad)" />
        </svg>
        <div className="absolute top-4 left-4 flex items-center gap-2 text-sm text-foreground">
          <Sparkles className="h-4 w-4 text-violet-500" />
          <span>Gradient Waves</span>
        </div>
      </div>
    </div>
  );
}

function MultiWave() {
  return (
    <div className="w-full overflow-hidden rounded-lg bg-muted/20">
      <div className="relative h-48">
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,90 C100,110 200,70 300,90 C400,110 500,70 600,90 C700,110 800,70 900,90 C1000,110 1100,70 1200,90 L1200,120 L0,120 Z" className="fill-primary/10" />
          <path d="M0,70 C150,100 300,40 450,70 C600,100 750,40 900,70 C1050,100 1200,40 1200,70 L1200,120 L0,120 Z" className="fill-primary/15" />
          <path d="M0,50 C200,90 400,10 600,50 C800,90 1000,10 1200,50 L1200,120 L0,120 Z" className="fill-primary/20" />
          <path d="M0,30 C300,70 600,0 900,30 C1100,50 1200,0 1200,30 L1200,120 L0,120 Z" className="fill-primary/25" />
        </svg>
        <div className="absolute top-4 left-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Droplet className="h-4 w-4" />
          <span>Multi-layer Waves</span>
        </div>
      </div>
    </div>
  );
}

function WaveFooter() {
  return (
    <div className="w-full overflow-hidden rounded-lg bg-foreground/5">
      <div className="relative h-28">
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 L0,60 C200,120 400,0 600,60 C800,120 1000,0 1200,60 L1200,0 Z" className="fill-foreground/5" />
        </svg>
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Sun className="h-4 w-4" />
          <span>Footer Wave</span>
        </div>
      </div>
    </div>
  );
}

function WaveHero() {
  const [active, setActive] = useState<"sun" | "moon">("sun");
  return (
    <div className="w-full overflow-hidden rounded-lg bg-gradient-to-b from-primary/5 to-background">
      <div className="relative h-52">
        <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-background/80 p-1 backdrop-blur">
          <button
            onClick={() => setActive("sun")}
            className={`rounded-full p-1.5 transition-colors ${active === "sun" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Sun className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setActive("moon")}
            className={`rounded-full p-1.5 transition-colors ${active === "moon" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Moon className="h-3.5 w-3.5" />
          </button>
        </div>
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z"
            className={`transition-all duration-500 ${active === "sun" ? "fill-primary/20" : "fill-primary/10"}`}
          />
          <path
            d="M0,80 C200,40 500,100 700,60 C900,20 1100,80 1200,60 L1200,120 L0,120 Z"
            className={`transition-all duration-500 ${active === "sun" ? "fill-primary/10" : "fill-primary/5"}`}
          />
        </svg>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
          <p className="text-lg font-semibold text-foreground">Wave Hero Section</p>
          <p className="text-sm text-muted-foreground">Toggle theme to see wave changes</p>
        </div>
      </div>
    </div>
  );
}

export default function WaveBackgroundPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Wave Background</h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Animated wave backgrounds for hero sections, dividers, and decorative elements with customizable colors and layers.
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
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Wave Divider</h2>
          <p className="mt-1 text-sm text-muted-foreground">Simple wave divider between content sections.</p>
        </div>
        <ComponentPreview id="wave-divider">
          <WaveDivider />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Ocean Wave</h2>
          <p className="mt-1 text-sm text-muted-foreground">Multi-layered ocean-inspired wave effect.</p>
        </div>
        <ComponentPreview id="ocean-wave">
          <OceanWave />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Animated Wave</h2>
          <p className="mt-1 text-sm text-muted-foreground">Interactive wave with animation controls.</p>
        </div>
        <ComponentPreview id="animated-wave">
          <AnimatedWave />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Wave Gradient</h2>
          <p className="mt-1 text-sm text-muted-foreground">Gradient-colored waves for visual depth.</p>
        </div>
        <ComponentPreview id="wave-gradient">
          <WaveGradient />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Multi Wave</h2>
          <p className="mt-1 text-sm text-muted-foreground">Stacked multi-layer wave effect.</p>
        </div>
        <ComponentPreview id="multi-wave">
          <MultiWave />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Wave Footer</h2>
          <p className="mt-1 text-sm text-muted-foreground">Inverted wave for footer sections.</p>
        </div>
        <ComponentPreview id="wave-footer">
          <WaveFooter />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Wave Hero</h2>
          <p className="mt-1 text-sm text-muted-foreground">Full hero section with theme-aware waves.</p>
        </div>
        <ComponentPreview id="wave-hero">
          <WaveHero />
        </ComponentPreview>
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
                <td className="px-4 py-3 text-muted-foreground">{""hero" | "divider" | "footer""}</td>
                <td className="px-4 py-3 text-muted-foreground">"divider"</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">color</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">"primary"</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">layers</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">2</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">animated</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
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
