"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Sunset, Moon, Star, Cloud, Wind, Palette, Heart } from "lucide-react";

const installCommand = `npx component-library@latest add sunset-evening`;
const usageCode = `<SunsetEvening time="18:30" animated />`;

function SunsetView() {
  const [scenery, setScenery] = useState<"ocean" | "mountain" | "city">("ocean");

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Sunset className="h-5 w-5 text-orange-500" />
        <h3 className="font-medium">Sunset View</h3>
      </div>
      <div className={`rounded-lg p-8 text-center transition-all ${
        scenery === "ocean"
          ? "bg-gradient-to-b from-orange-400 via-red-500 to-blue-900"
          : scenery === "mountain"
          ? "bg-gradient-to-b from-purple-400 via-orange-500 to-gray-800"
          : "bg-gradient-to-b from-pink-400 via-orange-500 to-gray-900"
      }`}>
        <Sunset className="mx-auto h-16 w-16 text-white mb-4" />
        <p className="text-white font-medium text-lg capitalize">{scenery} Sunset</p>
      </div>
      <div className="flex gap-2 mt-4">
        {(["ocean", "mountain", "city"] as const).map(s => (
          <button
            key={s}
            onClick={() => setScenery(s)}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              scenery === s ? "bg-orange-500 text-white" : "bg-muted hover:bg-muted/80"
            }`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

function EveningMode() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Moon className="h-5 w-5 text-indigo-500" />
        <h3 className="font-medium">Evening Mode</h3>
      </div>
      <div className={`rounded-lg p-6 transition-all ${
        enabled ? "bg-gray-900 text-white" : "bg-muted"
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {enabled ? (
              <Moon className="h-8 w-8 text-indigo-400" />
            ) : (
              <Sunset className="h-8 w-8 text-orange-500" />
            )}
            <div>
              <p className="font-medium">{enabled ? "Evening Mode" : "Day Mode"}</p>
              <p className="text-sm text-muted-foreground">{enabled ? "Reduced blue light" : "Full spectrum"}</p>
            </div>
          </div>
          <button
            onClick={() => setEnabled(!enabled)}
            className={`relative h-6 w-12 rounded-full transition-colors ${
              enabled ? "bg-indigo-500" : "bg-muted-foreground/30"
            }`}
          >
            <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
              enabled ? "left-7" : "left-1"
            }`} />
          </button>
        </div>
      </div>
    </div>
  );
}

function TwilightCard() {
  const [phase, setPhase] = useState(0);
  const phases = ["Golden Hour", "Blue Hour", "Civil Twilight", "Nautical Twilight"];

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Palette className="h-5 w-5 text-purple-500" />
        <h3 className="font-medium">Twilight Card</h3>
      </div>
      <div className="space-y-4">
        <div className="flex gap-2">
          {phases.map((p, i) => (
            <button
              key={p}
              onClick={() => setPhase(i)}
              className={`flex-1 rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                phase === i ? "bg-purple-500 text-white" : "bg-muted hover:bg-muted/80"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        <div className="h-24 rounded-lg bg-gradient-to-r from-orange-500 via-purple-600 to-blue-900 flex items-center justify-center">
          <p className="text-white font-medium">{phases[phase]}</p>
        </div>
      </div>
    </div>
  );
}

function NightSky() {
  const [stars, setStars] = useState(12);

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Star className="h-5 w-5 text-yellow-400" />
        <h3 className="font-medium">Night Sky</h3>
      </div>
      <div className="space-y-4">
        <div className="h-32 rounded-lg bg-gray-900 relative overflow-hidden">
          {Array.from({ length: stars }, (_, i) => (
            <Star
              key={i}
              className="absolute h-2 w-2 text-yellow-300 fill-yellow-300"
              style={{ top: `${Math.random() * 80 + 10}%`, left: `${Math.random() * 80 + 10}%` }}
            />
          ))}
          <Moon className="absolute top-4 right-4 h-6 w-6 text-yellow-200" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Stars visible</span>
          <span className="font-medium">{stars}</span>
        </div>
        <input
          type="range"
          min="3"
          max="20"
          value={stars}
          onChange={(e) => setStars(Number(e.target.value))}
          className="w-full accent-yellow-400"
        />
      </div>
    </div>
  );
}

function DuskColors() {
  const [color, setColor] = useState("#FF6B35");

  const presets = ["#FF6B35", "#C44D8E", "#6B48C4", "#2E5A88", "#1A1A2E"];

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Palette className="h-5 w-5 text-pink-500" />
        <h3 className="font-medium">Dusk Colors</h3>
      </div>
      <div className="space-y-4">
        <div
          className="h-24 rounded-lg transition-colors"
          style={{ backgroundColor: color }}
        />
        <div className="flex gap-2">
          {presets.map(c => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`h-8 w-8 rounded-full border-2 transition-transform ${
                color === c ? "border-white scale-110" : "border-border"
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-8 w-8 rounded cursor-pointer"
          />
          <span className="text-sm font-mono">{color}</span>
        </div>
      </div>
    </div>
  );
}

function RelaxTimer() {
  const [minutes, setMinutes] = useState(10);
  const [active, setActive] = useState(false);

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Wind className="h-5 w-5 text-teal-500" />
        <h3 className="font-medium">Relax Timer</h3>
      </div>
      <div className="text-center space-y-4">
        <div className="relative inline-flex items-center justify-center">
          <svg className="h-32 w-32 -rotate-90">
            <circle cx="64" cy="64" r="56" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted" />
            <circle
              cx="64"
              cy="64"
              r="56"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray={2 * Math.PI * 56}
              strokeDashoffset={2 * Math.PI * 56 * (1 - minutes / 30)}
              className="text-teal-500"
            />
          </svg>
          <div className="absolute text-center">
            <p className="text-3xl font-bold">{minutes}</p>
            <p className="text-xs text-muted-foreground">minutes</p>
          </div>
        </div>
        <input
          type="range"
          min="1"
          max="30"
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value))}
          className="w-full accent-teal-500"
        />
        <button
          onClick={() => setActive(!active)}
          className={`w-full rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            active ? "bg-teal-500 text-white" : "bg-muted hover:bg-muted/80"
          }`}
        >
          {active ? "Pause" : "Start Relaxing"}
        </button>
      </div>
    </div>
  );
}

function EveningVibes() {
  const [liked, setLiked] = useState(false);
  const [mood, setMood] = useState<string | null>(null);

  const moods = [
    { icon: Heart, label: "Romantic", color: "text-pink-500" },
    { icon: Moon, label: "Peaceful", color: "text-indigo-500" },
    { icon: Star, label: "Magical", color: "text-yellow-400" },
  ];

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Heart className="h-5 w-5 text-pink-500" />
        <h3 className="font-medium">Evening Vibes</h3>
      </div>
      <div className="space-y-4">
        <div className="flex gap-2">
          {moods.map(m => (
            <button
              key={m.label}
              onClick={() => setMood(m.label)}
              className={`flex-1 rounded-lg border-2 p-3 text-center transition-all ${
                mood === m.label ? "border-pink-500 bg-pink-50 dark:bg-pink-950" : "border-border hover:border-pink-300"
              }`}
            >
              <m.icon className={`mx-auto h-6 w-6 ${m.color}`} />
              <p className="mt-1 text-xs font-medium">{m.label}</p>
            </button>
          ))}
        </div>
        <button
          onClick={() => setLiked(!liked)}
          className={`w-full rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            liked ? "bg-pink-500 text-white" : "bg-muted hover:bg-muted/80"
          }`}
        >
          {liked ? "Loved" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
}

export default function SunsetEveningPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Sunset Evening</h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          An animation component for displaying sunset scenes with gradient skies, sun set effects, and evening atmosphere.
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
        <div className="grid gap-6 md:grid-cols-2">
          <ComponentPreview component="SunsetEveningView" />
          <ComponentPreview component="SunsetEveningMode" />
          <ComponentPreview component="SunsetEveningTwilight" />
          <ComponentPreview component="SunsetEveningNightSky" />
        </div>
        <ComponentPreview component="SunsetEveningDuskColors" />
        <div className="grid gap-6 md:grid-cols-2">
          <ComponentPreview component="SunsetEveningRelax" />
          <ComponentPreview component="SunsetEveningVibes" />
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
                <td className="px-4 py-3 font-mono text-xs">time</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">{'"18:00"'}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">animated</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">duration</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">10</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">showStars</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
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
