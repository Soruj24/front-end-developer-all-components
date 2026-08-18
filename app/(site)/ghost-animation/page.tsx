"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Ghost, Sparkles, Moon, Star, Clock, Zap } from "lucide-react";

const installCommand = `npx component-library@latest add ghost-animation`;
const usageCode = `import { GhostAnimation } from "@/components/ghost-animation";

<GhostAnimation size="lg" mood="happy" />`;

type GhostMood = "happy" | "spooky" | "surprised" | "sleeping";

function GhostRenderer({ mood = "happy", size = 100 }: { mood?: GhostMood; size?: number }) {
  const [bounce, setBounce] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setBounce((b) => (b >= 10 ? 0 : b + 0.5)), 50);
    return () => clearInterval(interval);
  }, []);

  const eyeY = mood === "sleeping" ? 45 : 38;
  const mouthD = mood === "happy" ? "M40,55 Q50,65 60,55" : mood === "spooky" ? "M38,55 L50,50 L62,55" : mood === "surprised" ? "M46,55 A4,4 0 1,0 54,55" : "";

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 110" className="h-full w-full" style={{ transform: `translateY(${-Math.abs(Math.sin(bounce * 0.3)) * 5}px)` }}>
        <path
          d="M25,45 Q25,15 50,15 Q75,15 75,45 L75,85 Q70,78 65,85 Q60,78 55,85 Q50,78 45,85 Q40,78 35,85 Q30,78 25,85 Z"
          fill="white"
          className="drop-shadow-lg"
          stroke="currentColor"
          strokeWidth="1"
          style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" }}
        />
        {mood !== "sleeping" ? (
          <>
            <ellipse cx="40" cy={eyeY} rx="3" ry="4" className="fill-gray-800" />
            <ellipse cx="60" cy={eyeY} rx="3" ry="4" className="fill-gray-800" />
            {mood === "surprised" && (
              <>
                <ellipse cx="40" cy={eyeY} rx="1" ry="1.5" fill="white" />
                <ellipse cx="60" cy={eyeY} rx="1" ry="1.5" fill="white" />
              </>
            )}
          </>
        ) : (
          <>
            <line x1="37" y1="40" x2="43" y2="40" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="57" y1="40" x2="63" y2="40" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />
          </>
        )}
        {mouthD && <path d={mouthD} fill="none" stroke="#111" strokeWidth="1.5" strokeLinecap="round" />}
        {mood === "spooky" && (
          <>
            <circle cx="35" cy="30" r="1" className="fill-gray-400" opacity="0.5" />
            <circle cx="65" cy="35" r="1.5" className="fill-gray-400" opacity="0.3" />
          </>
        )}
      </svg>
      {mood === "spooky" && (
        <Sparkles className="absolute -top-2 -right-2 h-4 w-4 text-purple-400 animate-pulse" />
      )}
    </div>
  );
}

function GhostMoodsDemo() {
  return (
    <div className="flex gap-6">
      {(["happy", "spooky", "surprised", "sleeping"] as GhostMood[]).map((m) => (
        <div key={m} className="flex flex-col items-center gap-1">
          <GhostRenderer mood={m} size={80} />
          <span className="text-xs text-muted-foreground capitalize">{m}</span>
        </div>
      ))}
    </div>
  );
}

function GhostParadeDemo() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setOffset((o) => (o >= 400 ? 0 : o + 1)), 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-32 w-full max-w-md overflow-hidden rounded-lg bg-slate-900">
      <div className="absolute bottom-0 w-full h-8 bg-gradient-to-t from-slate-800 to-transparent" />
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: ((i * 80 - offset + 400) % 400) - 20,
            bottom: 10 + Math.sin((offset + i * 20) * 0.05) * 5,
            opacity: 0.6 + (i / 5) * 0.4,
          }}
        >
          <GhostRenderer mood={i % 2 === 0 ? "happy" : "spooky"} size={40} />
        </div>
      ))}
    </div>
  );
}

function CollectionDisplayDemo() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {["#f0f0f0", "#e0e7ff", "#fce7f3", "#ecfdf5"].map((bg, i) => (
        <div key={i} className="flex flex-col items-center gap-1 rounded-lg bg-card p-3 border">
          <GhostRenderer mood={["happy", "spooky", "surprised", "sleeping"][i] as GhostMood} size={50} />
          <span className="text-[10px] text-muted-foreground">{["Happy", "Spooky", "Surprise", "Nap"][i]}</span>
        </div>
      ))}
    </div>
  );
}

function HalloweenBannerDemo() {
  const [active, setActive] = useState(false);

  return (
    <div className="w-full max-w-lg">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-100 to-purple-100 border border-black/[.08] p-6 dark:from-orange-950/20 dark:to-purple-950/20 dark:border-white/[.145]">
        <div className="absolute top-4 right-4">
          <GhostRenderer mood="spooky" size={60} />
        </div>
        <div className="absolute bottom-4 left-4">
          <Moon className="h-8 w-8 text-purple-400 opacity-50" />
        </div>
        <div className="relative z-10">
          <Badge variant="secondary" className="mb-2">Limited Time</Badge>
          <h2 className="text-2xl font-extrabold">Halloween Sale</h2>
          <p className="mt-1 max-w-xs text-sm text-muted-foreground">
            Up to 50% off on all spooky items. Don&apos;t miss out!
          </p>
          <button onClick={() => setActive(!active)} className="mt-3 rounded-lg bg-foreground px-4 py-2 text-xs font-medium text-background shadow-sm hover:bg-foreground/90">
            {active ? "Sale Active!" : "Shop Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

function StatusIndicatorDemo() {
  const [status, setStatus] = useState<"online" | "away" | "busy" | "offline">("online");
  const statuses = {
    online: { mood: "happy" as GhostMood, label: "Online", color: "bg-emerald-500" },
    away: { mood: "sleeping" as GhostMood, label: "Away", color: "bg-yellow-500" },
    busy: { mood: "spooky" as GhostMood, label: "Busy", color: "bg-red-500" },
    offline: { mood: "surprised" as GhostMood, label: "Offline", color: "bg-gray-400" },
  };

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm p-4 dark:border-white/[.145]">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <GhostRenderer mood={statuses[status].mood} size={60} />
            <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${statuses[status].color} ring-2 ring-background`} />
          </div>
          <div>
            <p className="text-sm font-bold">Ghost User</p>
            <p className="text-xs text-muted-foreground">{statuses[status].label}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {(Object.keys(statuses) as Array<keyof typeof statuses>).map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                status === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {statuses[s].label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function LoadingAnimationDemo() {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setDots((d) => (d >= 3 ? 0 : d + 1)), 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm p-6 dark:border-white/[.145]">
        <div className="flex flex-col items-center gap-4">
          <GhostRenderer mood="happy" size={80} />
          <div className="text-center">
            <p className="text-sm font-bold">Loading{".".repeat(dots)}</p>
            <p className="text-xs text-muted-foreground">Summoning ghosts...</p>
          </div>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-2 w-2 rounded-full transition-colors ${
                  i <= dots ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AchievementCardDemo() {
  const [unlocked, setUnlocked] = useState([true, true, false]);
  const achievements = [
    { name: "First Haunt", desc: "Complete your first scare", icon: "👻", xp: 100 },
    { name: "Ghost Buster", desc: "Catch 10 ghosts", icon: "🎃", xp: 250 },
    { name: "Spirit Master", desc: "Unlock all ghost moods", icon: "✨", xp: 500 },
  ];

  const toggle = (i: number) => {
    setUnlocked((prev) => prev.map((u, idx) => idx === i ? !u : u));
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Ghost Achievements</h3>
            <span className="ml-auto text-[10px] text-muted-foreground">{unlocked.filter(Boolean).length}/{achievements.length}</span>
          </div>
        </div>
        <div className="p-4 space-y-2">
          {achievements.map((a, i) => (
            <button
              key={i}
              onClick={() => toggle(i)}
              className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all ${
                unlocked[i]
                  ? "border-primary/30 bg-primary/5"
                  : "border-black/[.08] opacity-60 dark:border-white/[.145]"
              }`}
            >
              <div className="text-2xl">{a.icon}</div>
              <div className="flex-1">
                <p className="text-xs font-bold">{a.name}</p>
                <p className="text-[10px] text-muted-foreground">{a.desc}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-mono font-bold">+{a.xp}</p>
                <p className="text-[9px] text-muted-foreground">XP</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GhostAnimationPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Ghost Animation
          </h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Animated ghost characters with mood expressions, floating animation, parade effect, and
          collection display.
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
          <h3 className="text-lg font-medium text-foreground">Ghost Moods</h3>
          <p className="text-sm text-muted-foreground">
            Different ghost expressions and emotions.
          </p>
          <ComponentPreview id="ghost-moods">
            <GhostMoodsDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Ghost Parade</h3>
          <p className="text-sm text-muted-foreground">
            Animated floating ghosts in a row.
          </p>
          <ComponentPreview id="ghost-parade">
            <GhostParadeDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Collection Display</h3>
          <p className="text-sm text-muted-foreground">
            Ghost collection grid with labels.
          </p>
          <ComponentPreview id="ghost-collection">
            <CollectionDisplayDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Halloween Banner</h3>
          <p className="text-sm text-muted-foreground">
            Seasonal promotional banner with ghost decoration.
          </p>
          <ComponentPreview id="ghost-banner">
            <HalloweenBannerDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Status Indicator</h3>
          <p className="text-sm text-muted-foreground">
            User status with ghost mood feedback.
          </p>
          <ComponentPreview id="ghost-status">
            <StatusIndicatorDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Loading Animation</h3>
          <p className="text-sm text-muted-foreground">
            Ghost-themed loading spinner.
          </p>
          <ComponentPreview id="ghost-loading">
            <LoadingAnimationDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Achievement Card</h3>
          <p className="text-sm text-muted-foreground">
            Gaming achievement display with unlock states.
          </p>
          <ComponentPreview id="ghost-achievements">
            <AchievementCardDemo />
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
                <td className="px-4 py-3 font-mono text-xs">mood</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"happy\" | \"spooky\" | \"surprised\" | \"sleeping\""}</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"happy\""}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">100</td>
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
