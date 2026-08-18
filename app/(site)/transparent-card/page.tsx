"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { CreditCard, Eye, Shield, Star, Heart, Zap, Sparkles } from "lucide-react";

const installCommand = `npx shadcn@latest add transparent-card`;

const usageCode = `import { TransparentCard } from "@/components/ui/transparent-card";

export function TransparentCardDemo() {
  return (
    <TransparentCard className="backdrop-blur-sm">
      <h3 className="text-lg font-semibold">Card Title</h3>
      <p className="text-sm text-muted-foreground">Card content goes here.</p>
    </TransparentCard>
  );
}`;

function GlassCard() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md transition-all duration-300 ${
        hovered ? "scale-105 shadow-2xl" : ""
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
      <div className="relative">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
            <CreditCard className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">Glass Card</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          A card with a frosted glass effect using backdrop blur and transparency.
        </p>
      </div>
    </div>
  );
}

function FrostedCard() {
  const [active, setActive] = useState(false);

  return (
    <div className="relative rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 p-6 backdrop-blur-sm">
      <div className="absolute inset-0 rounded-xl border border-white/10" />
      <div className="relative">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Frosted Card</h3>
          <button
            onClick={() => setActive(!active)}
            className={`rounded-full p-1.5 transition-colors ${
              active ? "bg-primary/20 text-primary" : "bg-white/10 text-muted-foreground"
            }`}
          >
            <Heart className={`h-4 w-4 ${active ? "fill-current" : ""}`} />
          </button>
        </div>
        <p className="text-sm text-muted-foreground">
          Beautiful frosted glass effect with gradient background overlay.
        </p>
        <div className="mt-4 flex gap-2">
          {["React", "TypeScript", "Tailwind"].map((tag) => (
            <span key={tag} className="rounded-full bg-white/10 px-2 py-0.5 text-xs">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function BlurCard() {
  const [blurLevel, setBlurLevel] = useState(8);

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-xl border border-white/20 p-6" style={{ backdropFilter: `blur(${blurLevel}px)` }}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20" />
        <div className="relative">
          <h3 className="text-lg font-semibold">Blur Card</h3>
          <p className="text-sm text-muted-foreground">
            Adjustable blur intensity for the background effect.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Blur: {blurLevel}px</span>
        <input
          type="range"
          min={0}
          max={20}
          value={blurLevel}
          onChange={(e) => setBlurLevel(Number(e.target.value))}
          className="flex-1"
        />
      </div>
    </div>
  );
}

function OverlayCard() {
  const [overlay, setOverlay] = useState(true);

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-xl border border-white/20 p-6">
        {overlay && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        )}
        <div className="relative">
          <div className="mb-4 flex items-center gap-3">
            <Shield className="h-5 w-5 text-emerald-500" />
            <h3 className="text-lg font-semibold">Overlay Card</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Toggle the overlay to see the glass effect with and without backdrop blur.
          </p>
          <button
            onClick={() => setOverlay(!overlay)}
            className="mt-4 inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm hover:bg-accent"
          >
            <Eye className="mr-2 h-4 w-4" />
            {overlay ? "Remove" : "Add"} Overlay
          </button>
        </div>
      </div>
    </div>
  );
}

function TranslucentCard() {
  const [opacity, setOpacity] = useState(0.15);

  return (
    <div className="space-y-4">
      <div
        className="rounded-xl border border-white/20 p-6 shadow-lg"
        style={{ backgroundColor: `rgba(255, 255, 255, ${opacity})` }}
      >
        <div className="mb-4 flex items-center gap-3">
          <Star className="h-5 w-5 text-yellow-500" />
          <h3 className="text-lg font-semibold">Translucent Card</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Control the background opacity for subtle transparency effects.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Opacity: {Math.round(opacity * 100)}%</span>
        <input
          type="range"
          min={0}
          max={50}
          value={opacity * 100}
          onChange={(e) => setOpacity(Number(e.target.value) / 100)}
          className="flex-1"
        />
      </div>
    </div>
  );
}

function SemiTransparent() {
  const [theme, setTheme] = useState("default");

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {["default", "ocean", "sunset", "forest"].map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            className={`rounded-md px-3 py-1.5 text-sm capitalize ${
              theme === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className={`rounded-xl border border-white/20 p-6 ${
        theme === "ocean" ? "bg-blue-500/15" :
        theme === "sunset" ? "bg-orange-500/15" :
        theme === "forest" ? "bg-green-500/15" : "bg-white/15"
      }`}>
        <div className="mb-4 flex items-center gap-3">
          <Zap className="h-5 w-5 text-amber-500" />
          <h3 className="text-lg font-semibold">Semi-Transparent</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Themed semi-transparent card with color-coded backgrounds.
        </p>
      </div>
    </div>
  );
}

function BackdropCard() {
  const [intensity, setIntensity] = useState("medium");

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/20 p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-purple-500/10 to-fuchsia-500/20" />
      <div className="absolute inset-0" style={{
        backdropFilter: intensity === "low" ? "blur(4px)" : intensity === "high" ? "blur(16px)" : "blur(8px)"
      }} />
      <div className="relative">
        <div className="mb-4 flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-purple-500" />
          <h3 className="text-lg font-semibold">Backdrop Card</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Advanced backdrop effect with gradient and blur layers.
        </p>
        <div className="mt-4 flex gap-2">
          {["low", "medium", "high"].map((l) => (
            <button
              key={l}
              onClick={() => setIntensity(l)}
              className={`rounded-md px-3 py-1.5 text-xs capitalize ${
                intensity === l ? "bg-primary text-primary-foreground" : "bg-white/10"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TransparentCardPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline">Components</Badge>
          <Badge variant="secondary">New</Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          <CreditCard className="mr-2 inline h-8 w-8" />
          Transparent Card
        </h1>
        <p className="text-lg text-muted-foreground">
          Beautiful glassmorphism and translucent card components with backdrop effects.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <CodeBlock code={installCommand} language="bash" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <CodeBlock code={usageCode} language="tsx" />
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-semibold">Examples</h2>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Glass Card</h3>
          <ComponentPreview>
            <GlassCard />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Frosted Card</h3>
          <ComponentPreview>
            <FrostedCard />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Blur Card</h3>
          <ComponentPreview>
            <BlurCard />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Overlay Card</h3>
          <ComponentPreview>
            <OverlayCard />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Translucent Card</h3>
          <ComponentPreview>
            <TranslucentCard />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Semi-Transparent</h3>
          <ComponentPreview>
            <SemiTransparent />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Backdrop Card</h3>
          <ComponentPreview>
            <BackdropCard />
          </ComponentPreview>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-3 text-left font-medium">Prop</th>
                <th className="p-3 text-left font-medium">Type</th>
                <th className="p-3 text-left font-medium">Default</th>
                <th className="p-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3 font-mono text-xs">className</td>
                <td className="p-3">string</td>
                <td className="p-3">undefined</td>
                <td className="p-3">Additional CSS classes</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono text-xs">blur</td>
                <td className="p-3">number</td>
                <td className="p-3">8</td>
                <td className="p-3">Backdrop blur intensity in pixels</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono text-xs">opacity</td>
                <td className="p-3">number</td>
                <td className="p-3">0.15</td>
                <td className="p-3">Background opacity (0-1)</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono text-xs">gradient</td>
                <td className="p-3">boolean</td>
                <td className="p-3">true</td>
                <td className="p-3">Show gradient overlay</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono text-xs">border</td>
                <td className="p-3">boolean</td>
                <td className="p-3">true</td>
                <td className="p-3">Show subtle border</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">shadow</td>
                <td className="p-3">boolean</td>
                <td className="p-3">true</td>
                <td className="p-3">Apply box shadow</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
