"use client";

import { useState, useEffect, useMemo } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Flame, Thermometer, Zap, Star, Trophy, TrendingUp } from "lucide-react";

const installCommand = `npx component-library@latest add flame-effect`;
const usageCode = `import { FlameEffect } from "@/components/flame-effect";

<FlameEffect size="lg" color="orange" />`;

function FlameParticle({ delay, height, color }: { delay: number; height: number; color?: string }) {
  const [offset, setOffset] = useState(0);

  const randomOffset = useMemo(() => {
    const seed = Math.sin(delay * 127.1 + 311.7) * 43758.5453;
    return (seed - Math.floor(seed) - 0.5) * 20;
  }, [delay]);

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
        width: `${size}px`,
        height: `${size}px`,
        bottom: `${offset}px`,
        left: `calc(50% + ${randomOffset}px)`,
        opacity,
        background: `radial-gradient(circle, ${color || "#f97316"}, #ef4444)`,
        filter: "blur(1px)",
        transition: "opacity 0.1s",
      }}
    />
  );
}

function FlameRenderer({ color = "#f97316", height = 96, width = 64 }: { color?: string; height?: number; width?: number }) {
  const particleHeights = useMemo(
    () => Array.from({ length: 12 }, (_, i) => {
      const seed = Math.sin(i * 127.1 + 311.7) * 43758.5453;
      return 40 + (seed - Math.floor(seed)) * 20;
    }),
    []
  );

  return (
    <div className="relative" style={{ height: `${height}px`, width: `${width}px` }}>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-full" style={{ height: `${height * 0.67}px`, width: `${width * 0.625}px`, background: `linear-gradient(to top, ${color}, transparent)`, filter: "blur(4px)", opacity: 0.6 }} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-full" style={{ height: `${height * 0.5}px`, width: `${width * 0.375}px`, background: `linear-gradient(to top, ${color}, #fbbf24)`, filter: "blur(2px)", opacity: 0.8 }} />
      {particleHeights.map((h, i) => (
        <FlameParticle key={i} delay={i * 0.3} height={h} color={color} />
      ))}
    </div>
  );
}

function FlameColorsDemo() {
  return (
    <div className="flex items-end gap-6">
      <FlameRenderer color="#f97316" />
      <FlameRenderer color="#ef4444" />
      <FlameRenderer color="#eab308" />
      <FlameRenderer color="#8b5cf6" />
      <FlameRenderer color="#06b6d4" />
    </div>
  );
}

function CampfireSceneDemo() {
  const emberOpacities = useMemo(
    () => Array.from({ length: 8 }, (_, i) => {
      const seed = Math.sin(i * 73.97 + 191.3) * 43758.5453;
      return (seed - Math.floor(seed)) * 0.5 + 0.2;
    }),
    []
  );

  return (
    <div className="relative h-48 w-56 flex items-end justify-center rounded-xl overflow-hidden bg-gradient-to-t from-amber-950 via-amber-900/20 to-transparent">
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-1.5 w-8 rounded-full bg-amber-800" style={{ transform: `rotate(${(i - 2) * 15}deg)` }} />
        ))}
      </div>
      <div className="relative mb-10">
        <FlameRenderer color="#f97316" />
      </div>
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
        {emberOpacities.map((op, i) => (
          <div key={i} className="h-0.5 w-1 rounded-full bg-orange-400/40" style={{ opacity: op }} />
        ))}
      </div>
    </div>
  );
}

function IntensityControlDemo() {
  const [intensity, setIntensity] = useState(50);
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-36 w-24">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-full transition-all" style={{ width: `${20 + intensity / 5}px`, height: `${40 + intensity}px`, background: `linear-gradient(to top, #f97316, #fbbf24)`, filter: `blur(${3 + intensity / 20}px)`, opacity: 0.5 + intensity / 200 }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-full transition-all" style={{ width: `${12 + intensity / 10}px`, height: `${30 + intensity / 1.5}px`, background: `linear-gradient(to top, #ef4444, #f97316)`, filter: `blur(${2 + intensity / 30}px)`, opacity: 0.7 + intensity / 300 }} />
      </div>
      <div className="flex items-center gap-3">
        <Flame className="h-3 w-3 text-orange-500" />
        <input type="range" min={10} max={100} value={intensity} onChange={(e) => setIntensity(Number(e.target.value))} className="w-32 accent-primary" />
        <Flame className="h-5 w-5 text-orange-500" />
      </div>
      <span className="text-xs text-muted-foreground">Intensity: {intensity}%</span>
    </div>
  );
}

function StreakEffectDemo() {
  const [streak, setStreak] = useState(7);
  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold">Daily Streak</h3>
          <Badge variant="secondary" className="text-[10px]">🔥 Active</Badge>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <FlameRenderer color="#f97316" height={60} width={40} />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold">{streak}</span>
              <span className="text-sm text-muted-foreground">days</span>
            </div>
            <p className="text-[10px] text-muted-foreground">Keep it going!</p>
          </div>
        </div>
        <div className="mt-4 flex gap-1">
          {[...Array(7)].map((_, i) => (
            <div key={i} className={`flex-1 h-8 rounded-md flex items-center justify-center text-[10px] font-medium ${
              i < streak ? "bg-orange-100 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400" : "bg-muted text-muted-foreground"
            }`}>
              {i < streak ? "🔥" : (i + 1)}
            </div>
          ))}
        </div>
        <button
          onClick={() => setStreak(Math.min(30, streak + 1))}
          className="mt-4 w-full rounded-lg bg-foreground px-4 py-2 text-xs font-medium text-background hover:bg-foreground/90"
        >
          Mark Today
        </button>
      </div>
    </div>
  );
}

function GamingCardDemo() {
  const achievements = [
    { title: "First Blood", desc: "Win your first match", rarity: "Common", xp: 100 },
    { title: "Fire Starter", desc: "5 win streak", rarity: "Rare", xp: 500 },
    { title: "Inferno Master", desc: "50 wins total", rarity: "Legendary", xp: 2000 },
  ];

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <h3 className="text-sm font-semibold">Achievements</h3>
        </div>
        <div className="divide-y divide-black/[.06] dark:divide-white/[.08]">
          {achievements.map((a, i) => (
            <div key={a.title} className="flex items-center gap-3 px-4 py-3">
              <div className="relative shrink-0">
                {i === 2 ? (
                  <FlameRenderer color="#f97316" height={40} width={30} />
                ) : i === 1 ? (
                  <FlameRenderer color="#eab308" height={35} width={25} />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Trophy className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold">{a.title}</p>
                  <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${
                    a.rarity === "Legendary" ? "bg-orange-100 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400" :
                    a.rarity === "Rare" ? "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400" :
                    "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                  }`}>{a.rarity}</span>
                </div>
                <p className="text-[10px] text-muted-foreground">{a.desc}</p>
              </div>
              <span className="text-xs font-bold text-yellow-600 dark:text-yellow-400">+{a.xp} XP</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SpicyMeterDemo() {
  const [level, setLevel] = useState(3);
  const levels = [
    { label: "Mild", color: "bg-green-500", emoji: "😊" },
    { label: "Medium", color: "bg-yellow-500", emoji: "😏" },
    { label: "Hot", color: "bg-orange-500", emoji: "😰" },
    { label: "Very Hot", color: "bg-red-500", emoji: "🥵" },
    { label: "Extreme", color: "bg-red-700", emoji: "💀" },
  ];

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
        <h3 className="mb-4 text-sm font-semibold">Spiciness Level</h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="relative shrink-0">
            {level >= 3 ? (
              <FlameRenderer color={level >= 4 ? "#ef4444" : "#f97316"} height={50} width={35} />
            ) : (
              <span className="text-4xl">{levels[level].emoji}</span>
            )}
          </div>
          <div>
            <p className="text-lg font-bold">{levels[level].label}</p>
            <p className="text-[10px] text-muted-foreground">Scoville: {(level * 5000).toLocaleString()}</p>
          </div>
        </div>
        <div className="flex gap-1 mb-3">
          {levels.map((l, i) => (
            <button
              key={i}
              onClick={() => setLevel(i)}
              className={`flex-1 h-3 rounded-full transition-all ${
                i <= level ? l.color : "bg-muted"
              }`}
            />
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>Mild</span>
          <span>Extreme</span>
        </div>
      </div>
    </div>
  );
}

function FireplaceDemo() {
  return (
    <div className="relative h-56 w-64 mx-auto">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-amber-950 to-transparent" />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-2 w-10 rounded-full bg-amber-800" style={{ transform: `rotate(${(i - 2) * 12}deg)` }} />
          ))}
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <FlameRenderer color="#f97316" height={70} width={50} />
        </div>
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-orange-500/10 to-transparent" />
      </div>
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full bg-gray-800 px-3 py-1">
        <Flame className="h-3 w-3 text-orange-500" />
        <span className="text-[10px] text-gray-300">Fireplace</span>
      </div>
    </div>
  );
}

export default function FlameEffectPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Flame Effect
          </h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Animated flame effects with particle systems, color variants, campfire scene, and
          adjustable intensity controls.
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
          <h3 className="text-lg font-medium text-foreground">Flame Colors</h3>
          <p className="text-sm text-muted-foreground">
            Different colored flame variants.
          </p>
          <ComponentPreview id="flame-colors">
            <FlameColorsDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Campfire Scene</h3>
          <p className="text-sm text-muted-foreground">
            Campfire with logs and glowing embers.
          </p>
          <ComponentPreview id="flame-campfire">
            <CampfireSceneDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Intensity Control</h3>
          <p className="text-sm text-muted-foreground">
            Adjustable flame intensity with slider.
          </p>
          <ComponentPreview id="flame-intensity">
            <IntensityControlDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Streak Effect</h3>
          <p className="text-sm text-muted-foreground">
            Daily streak indicator with flame animation.
          </p>
          <ComponentPreview id="flame-streak">
            <StreakEffectDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Gaming Card</h3>
          <p className="text-sm text-muted-foreground">
            Achievement cards with flame rarity indicators.
          </p>
          <ComponentPreview id="flame-gaming">
            <GamingCardDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Spicy Meter</h3>
          <p className="text-sm text-muted-foreground">
            Food spiciness level indicator.
          </p>
          <ComponentPreview id="flame-spicy">
            <SpicyMeterDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Fireplace</h3>
          <p className="text-sm text-muted-foreground">
            Cozy fireplace scene with flame.
          </p>
          <ComponentPreview id="flame-fireplace">
            <FireplaceDemo />
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
                <td className="px-4 py-3 font-mono text-xs">color</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">"#f97316"</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">height</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">96</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">width</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">64</td>
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
