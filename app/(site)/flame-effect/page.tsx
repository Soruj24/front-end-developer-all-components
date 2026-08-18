"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Flame } from "lucide-react";

const installCommand = `npx component-library@latest add flame-effect`;
const usageCode = `import { FlameEffect } from "@/components/flame-effect";

<FlameEffect size="lg" color="orange" />`;

function FlameParticle({ delay, height }: { delay: number; height: number }) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((o) => (o >= height ? 0 : o + 1));
    }, 30 + delay * 5);
    return () => clearInterval(interval);
  }, [delay, height]);

  const opacity = 1 - offset / height;
  const size = 4 + (1 - offset / height) * 8;
  return (
    <div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        bottom: offset,
        left: `calc(50% + ${(Math.random() - 0.5) * 20}px)`,
        opacity,
        background: `radial-gradient(circle, #f97316, #ef4444)`,
        filter: "blur(1px)",
        transition: "opacity 0.1s",
      }}
    />
  );
}

function FlameDemo({ color = "#f97316" }: { color?: string }) {
  return (
    <div className="relative h-24 w-16">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-16 w-10 rounded-t-full" style={{ background: `linear-gradient(to top, ${color}, transparent)`, filter: "blur(4px)", opacity: 0.6 }} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-12 w-6 rounded-t-full" style={{ background: `linear-gradient(to top, ${color}, #fbbf24)`, filter: "blur(2px)", opacity: 0.8 }} />
      {[...Array(12)].map((_, i) => (
        <FlameParticle key={i} delay={i * 0.3} height={40 + Math.random() * 20} />
      ))}
    </div>
  );
}

function FlameRowDemo() {
  return (
    <div className="flex items-end gap-6">
      <FlameDemo color="#f97316" />
      <FlameDemo color="#ef4444" />
      <FlameDemo color="#eab308" />
      <FlameDemo color="#8b5cf6" />
      <FlameDemo color="#06b6d4" />
    </div>
  );
}

function CampfireDemo() {
  return (
    <div className="relative h-40 w-48 flex items-end justify-center rounded-lg bg-gradient-to-t from-amber-950 to-transparent">
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-1.5 w-8 rounded-full bg-amber-800" style={{ transform: `rotate(${(i - 2) * 15}deg)` }} />
        ))}
      </div>
      <div className="relative mb-8">
        <FlameDemo color="#f97316" />
      </div>
      <span className="absolute top-2 text-xs text-amber-200/50">🔥 Campfire</span>
    </div>
  );
}

function PulsingFlameDemo() {
  const [intensity, setIntensity] = useState(50);
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative h-32 w-24">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-full transition-all" style={{ width: 20 + intensity / 5, height: 40 + intensity, background: `linear-gradient(to top, #f97316, #fbbf24)`, filter: `blur(${3 + intensity / 20}px)`, opacity: 0.5 + intensity / 200 }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-full transition-all" style={{ width: 12 + intensity / 10, height: 30 + intensity / 1.5, background: `linear-gradient(to top, #ef4444, #f97316)`, filter: `blur(${2 + intensity / 30}px)`, opacity: 0.7 + intensity / 300 }} />
      </div>
      <div className="flex items-center gap-2">
        <Flame className="h-3 w-3 text-orange-500" />
        <input type="range" min={10} max={100} value={intensity} onChange={(e) => setIntensity(Number(e.target.value))} className="w-32 accent-primary" />
        <Flame className="h-5 w-5 text-orange-500" />
      </div>
      <span className="text-xs text-muted-foreground">Intensity: {intensity}%</span>
    </div>
  );
}

export default function FlameEffectPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Flame Effect</h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Animated flame effects with particle systems, color variants, campfire scene, and adjustable intensity controls.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Flame Colors</h2>
        <ComponentPreview>
          <FlameRowDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Campfire Scene</h2>
        <ComponentPreview>
          <CampfireDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Intensity Control</h2>
        <ComponentPreview>
          <PulsingFlameDemo />
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
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">size</td><td className="px-4 py-3 text-muted-foreground">{'"sm" | "md" | "lg"'}</td><td className="px-4 py-3 text-muted-foreground">{'"md"'}</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">color</td><td className="px-4 py-3 text-muted-foreground">{'"orange" | "red" | "blue" | "green"'}</td><td className="px-4 py-3 text-muted-foreground">{'"orange"'}</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
