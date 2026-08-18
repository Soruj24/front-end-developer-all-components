"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Moon, Sun, Monitor, Palette, Eye, Cloud, Star } from "lucide-react";

const installCommand = `npx component-library@latest add moon-dark`;

const usageCode = `import { MoonDark } from "@/components/moon-dark";

export default function Page() {
  return <MoonDark />;
}`;

function DarkModeToggleDemo() {
  const [isDark, setIsDark] = useState(false);
  return (
    <div className="flex items-center gap-4 rounded-lg border bg-background p-6">
      <button
        onClick={() => setIsDark(!isDark)}
        className={`flex h-12 w-12 items-center justify-center rounded-full transition-all ${isDark ? "bg-slate-900 text-yellow-400 shadow-lg shadow-slate-900/30" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
      >
        {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      </button>
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-foreground">{isDark ? "Dark Mode" : "Light Mode"}</span>
        <span className="text-xs text-muted-foreground">Click to toggle theme</span>
      </div>
    </div>
  );
}

function ThemeSwitchDemo() {
  const [theme, setTheme] = useState("system");
  const themes = [
    { id: "light", label: "Light", icon: Sun },
    { id: "system", label: "System", icon: Monitor },
    { id: "dark", label: "Dark", icon: Moon },
  ];
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center gap-2">
        <Palette className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Theme Preference</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={`flex flex-col items-center gap-2 rounded-md border p-3 text-xs transition-all ${theme === t.id ? "border-primary bg-primary/5 text-primary" : "border-transparent bg-muted/50 text-muted-foreground hover:bg-muted"}`}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function NightModeDemo() {
  const [enabled, setEnabled] = useState(false);
  return (
    <div className={`rounded-lg border p-6 transition-colors ${enabled ? "border-slate-700 bg-slate-900 text-white" : "bg-background text-foreground"}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Eye className={`h-5 w-5 ${enabled ? "text-blue-400" : "text-muted-foreground"}`} />
          <div>
            <p className="text-sm font-medium">Night Mode</p>
            <p className="text-xs text-muted-foreground">Reduce blue light exposure</p>
          </div>
        </div>
        <button
          onClick={() => setEnabled(!enabled)}
          className={`relative h-6 w-11 rounded-full transition-colors ${enabled ? "bg-blue-500" : "bg-muted"}`}
        >
          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${enabled ? "left-[22px]" : "left-0.5"}`} />
        </button>
      </div>
    </div>
  );
}

function StarryBackgroundDemo() {
  const [intensity, setIntensity] = useState(50);
  const stars = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 2,
  }));
  return (
    <div className="relative overflow-hidden rounded-lg border bg-slate-950 p-6 h-48">
      {stars.map((star) => (
        <Star
          key={star.id}
          className="absolute text-yellow-200"
          style={{ top: star.top, left: star.left, width: star.size * 4, height: star.size * 4, opacity: intensity / 100, animation: `pulse ${2 + star.delay}s ease-in-out infinite` }}
          fill="currentColor"
        />
      ))}
      <div className="relative z-10 flex flex-col gap-2">
        <span className="text-sm font-medium text-white">Star Intensity</span>
        <input
          type="range"
          min={0}
          max={100}
          value={intensity}
          onChange={(e) => setIntensity(Number(e.target.value))}
          className="w-32 accent-yellow-400"
        />
        <span className="text-xs text-slate-400">{intensity}%</span>
      </div>
    </div>
  );
}

function MidnightCardDemo() {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`rounded-lg border p-6 transition-all duration-300 ${hovered ? "border-indigo-500/50 bg-gradient-to-br from-slate-900 to-indigo-950 shadow-xl shadow-indigo-500/10" : "border-border bg-background"}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-500/10">
          <Moon className="h-5 w-5 text-indigo-500" />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold">Midnight Collection</h3>
          <p className="text-xs text-muted-foreground">Explore our curated dark mode UI components for modern applications.</p>
          <div className="mt-2 flex gap-2">
            <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-medium text-indigo-500">New</span>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">v2.4</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SleepTimerDemo() {
  const [minutes, setMinutes] = useState(30);
  const presets = [15, 30, 45, 60, 90];
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center gap-2">
        <Moon className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Sleep Timer</span>
      </div>
      <div className="flex gap-2">
        {presets.map((m) => (
          <button
            key={m}
            onClick={() => setMinutes(m)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${minutes === m ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
          >
            {m}m
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Auto-sleep after {minutes} minutes of inactivity</p>
    </div>
  );
}

function EveningModeDemo() {
  const [warmth, setWarmth] = useState(60);
  const warmthLabel = warmth < 30 ? "Cool" : warmth < 70 ? "Warm" : "Amber";
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Cloud className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Evening Warmth</span>
        </div>
        <span className="text-xs text-muted-foreground">{warmthLabel}</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={warmth}
        onChange={(e) => setWarmth(Number(e.target.value))}
        className="w-full accent-amber-500"
      />
      <div
        className="mt-3 h-8 rounded-md transition-colors"
        style={{ backgroundColor: `rgba(251, 191, 36, ${warmth / 200 + 0.1})` }}
      />
    </div>
  );
}

export default function MoonDarkPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Moon Dark</h1>
          <Badge variant="primary">Visual</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Dark mode and night theme components with toggle controls, starry backgrounds, and sleep timers for comfortable viewing.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">DarkModeToggle</h2>
        <DarkModeToggleDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">ThemeSwitch</h2>
        <ThemeSwitchDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">NightMode</h2>
        <NightModeDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">StarryBackground</h2>
        <StarryBackgroundDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">MidnightCard</h2>
        <MidnightCardDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">SleepTimer</h2>
        <SleepTimerDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">EveningMode</h2>
        <EveningModeDemo />
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
                <td className="px-4 py-3 font-mono text-xs">isDark</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">theme</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;light&quot; | &quot;dark&quot; | &quot;system&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;system&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">intensity</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">50</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">warmth</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">50</td>
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
