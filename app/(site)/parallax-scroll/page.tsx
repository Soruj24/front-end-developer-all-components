"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { ArrowUpDown, Layers, Move, Eye, Maximize2, ScrollText, Layout } from "lucide-react";

const installCommand = `npx component-library@latest add parallax-scroll`;

const usageCode = `import { ParallaxScroll } from "@/components/ui/parallax-scroll";

export default function Demo() {
  return (
    <ParallaxScroll speed={0.5}>
      <div className="h-screen">Content goes here</div>
    </ParallaxScroll>
  );
}`;

function LayerParallaxDemo() {
  const [offset, setOffset] = useState(0);
  return (
    <div
      className="relative h-48 w-full overflow-hidden rounded-xl bg-gradient-to-b from-blue-100 to-blue-50 dark:from-blue-950/30 dark:to-blue-900/20"
      onMouseMove={(e) => setOffset((e.nativeEvent.offsetY / 200) * 15)}
    >
      <div className="absolute inset-0 flex items-center justify-center text-[60px] font-bold text-foreground/10" style={{ transform: `translateY(${offset * 0.3}px)` }}>BG</div>
      <div className="absolute inset-0 flex items-center justify-center text-[40px] font-bold text-foreground/20" style={{ transform: `translateY(${offset * 0.6}px)` }}>MID</div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Layers className="mr-2 h-5 w-5 text-foreground/60" />
        <span className="text-lg font-semibold text-foreground/60">Layer Parallax</span>
      </div>
      <div className="absolute bottom-3 left-3 text-xs text-muted-foreground">Hover to see layers move</div>
    </div>
  );
}

function ScrollFadeDemo() {
  const [opacity, setOpacity] = useState(1);
  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-full max-w-sm space-y-4">
        <div className="h-24 rounded-lg bg-primary/10 flex items-center justify-center text-sm text-primary font-medium" style={{ opacity }}>
          <Eye className="mr-2 h-4 w-4" /> Fade Content
        </div>
        <input type="range" min="0" max="100" value={opacity * 100} onChange={(e) => setOpacity(Number(e.target.value) / 100)} className="w-full" />
        <p className="text-center text-xs text-muted-foreground">Opacity: {Math.round(opacity * 100)}%</p>
      </div>
    </div>
  );
}

function TranslateEffectDemo() {
  const [translateY, setTranslateY] = useState(0);
  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-full max-w-sm space-y-4">
        <div className="relative h-20 overflow-hidden rounded-lg bg-muted/50">
          <div className="absolute inset-0 flex items-center justify-center text-sm font-medium transition-transform" style={{ transform: `translateY(${translateY}px)` }}>
            <Move className="mr-2 h-4 w-4" /> Translated Element
          </div>
        </div>
        <input type="range" min="-40" max="40" value={translateY} onChange={(e) => setTranslateY(Number(e.target.value))} className="w-full" />
      </div>
    </div>
  );
}

function DepthScrollDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative h-40 w-full max-w-md overflow-hidden rounded-xl bg-gradient-to-br from-muted/50 to-muted/30 border">
        <div className="absolute left-4 top-4 rounded-lg bg-primary/10 px-3 py-2 text-xs text-primary" style={{ transform: "scale(0.8)" }}>Far</div>
        <div className="absolute left-12 top-10 rounded-lg bg-primary/20 px-3 py-2 text-xs text-primary" style={{ transform: "scale(0.9)" }}>Mid</div>
        <div className="absolute left-20 top-16 rounded-lg bg-primary/30 px-3 py-2 text-xs text-primary font-medium" style={{ transform: "scale(1)" }}>Near</div>
        <div className="absolute right-4 bottom-4 text-xs text-muted-foreground"><Maximize2 className="mr-1 inline h-3 w-3" /> Depth layers</div>
      </div>
    </div>
  );
}

function RevealOnScrollDemo() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-full max-w-sm space-y-4">
        <div className={`h-20 rounded-lg bg-primary/10 flex items-center justify-center text-sm text-primary transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <Eye className="mr-2 h-4 w-4" /> Revealed Content
        </div>
        <button onClick={() => setVisible(!visible)} className="w-full rounded-lg bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/80">
          <ScrollText className="mr-2 inline h-4 w-4" /> Toggle Reveal
        </button>
      </div>
    </div>
  );
}

function ParallaxHeroDemo() {
  const [offset, setOffset] = useState(0);
  return (
    <div className="relative h-48 w-full overflow-hidden rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border" onMouseMove={(e) => setOffset((e.nativeEvent.offsetY / 200) * 20)}>
      <div className="absolute inset-0 flex items-center justify-center" style={{ transform: `translateY(${offset}px)` }}>
        <h3 className="text-2xl font-bold text-foreground"><ArrowUpDown className="mr-2 inline h-6 w-6" /> Parallax Hero</h3>
      </div>
      <div className="absolute bottom-4 left-4 text-xs text-muted-foreground">Hover to see parallax</div>
    </div>
  );
}

function FloatingElementDemo() {
  const [floating, setFloating] = useState(true);
  return (
    <div className="flex items-center justify-center gap-4 p-8">
      <div className="relative h-32 w-32">
        <div className={`absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center transition-transform duration-1000 ${floating ? "animate-bounce" : ""}`}>
          <Layout className="h-6 w-6 text-primary" />
        </div>
      </div>
      <button onClick={() => setFloating(!floating)} className="rounded-lg bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/80">
        {floating ? "Stop" : "Float"}
      </button>
    </div>
  );
}

export default function ParallaxScrollPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Parallax Scroll</h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A parallax scrolling component that creates depth effects by moving layers at different scroll speeds.
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
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>
          <p className="mt-1 text-sm text-muted-foreground">Various parallax scroll effect demonstrations.</p>
        </div>

        <ComponentPreview id="parallax-scroll-layer">
          <LayerParallaxDemo />
        </ComponentPreview>

        <ComponentPreview id="parallax-scroll-fade">
          <ScrollFadeDemo />
        </ComponentPreview>

        <ComponentPreview id="parallax-scroll-translate">
          <TranslateEffectDemo />
        </ComponentPreview>

        <ComponentPreview id="parallax-scroll-depth">
          <DepthScrollDemo />
        </ComponentPreview>

        <ComponentPreview id="parallax-scroll-reveal">
          <RevealOnScrollDemo />
        </ComponentPreview>

        <ComponentPreview id="parallax-scroll-hero">
          <ParallaxHeroDemo />
        </ComponentPreview>

        <ComponentPreview id="parallax-scroll-floating">
          <FloatingElementDemo />
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
                <td className="px-4 py-3 font-mono text-xs">children</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">speed</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">0.5</td>
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
