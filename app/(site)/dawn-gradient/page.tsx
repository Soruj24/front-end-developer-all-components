"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Sun,
  Sunrise,
  Sunset,
  Moon,
  Cloud,
  Droplets,
  Wind,
  Thermometer,
  Clock,
  MapPin,
  Calendar,
} from "lucide-react";

const installCommand = `npx component-library@latest add dawn-gradient`;
const usageCode = `import { DawnGradient } from "@/components/dawn-gradient";

<DawnGradient time="sunrise" animated />`;

type TimeOfDay = "dawn" | "sunrise" | "noon" | "sunset" | "dusk";

const timeGradients: Record<TimeOfDay, { from: string; via: string; to: string; label: string; icon: typeof Sun }> = {
  dawn: { from: "from-indigo-900", via: "via-purple-700", to: "to-orange-500", label: "Dawn", icon: Moon },
  sunrise: { from: "from-orange-300", via: "via-pink-400", to: "to-purple-600", label: "Sunrise", icon: Sunrise },
  noon: { from: "from-sky-400", via: "via-blue-300", to: "to-cyan-200", label: "Noon", icon: Sun },
  sunset: { from: "from-orange-500", via: "via-red-500", to: "to-purple-800", label: "Sunset", icon: Sunset },
  dusk: { from: "from-slate-800", via: "via-indigo-900", to: "to-purple-900", label: "Dusk", icon: Moon },
};

function AllTimePeriodsDemo() {
  return (
    <div className="grid grid-cols-5 gap-3 w-full max-w-lg">
      {(["dawn", "sunrise", "noon", "sunset", "dusk"] as TimeOfDay[]).map((t) => {
        const g = timeGradients[t];
        const Icon = g.icon;
        return (
          <div key={t} className="flex flex-col items-center gap-2">
            <div className={`flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-br ${g.from} ${g.via} ${g.to} shadow-md`}>
              <Icon className="h-6 w-6 text-white/80" />
            </div>
            <span className="text-xs font-medium">{g.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function WeatherDashboardDemo() {
  const [currentTime, setCurrentTime] = useState<TimeOfDay>("sunrise");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 8) setCurrentTime("dawn");
    else if (hour >= 8 && hour < 12) setCurrentTime("sunrise");
    else if (hour >= 12 && hour < 17) setCurrentTime("noon");
    else if (hour >= 17 && hour < 20) setCurrentTime("sunset");
    else setCurrentTime("dusk");
  }, []);

  const g = timeGradients[currentTime];
  const Icon = g.icon;

  const weather = [
    { icon: Thermometer, label: "Temp", value: "24°C" },
    { icon: Droplets, label: "Humidity", value: "65%" },
    { icon: Wind, label: "Wind", value: "12 km/h" },
  ];

  return (
    <div className="w-full max-w-sm">
      <div className={`rounded-xl bg-gradient-to-br ${g.from} ${g.via} ${g.to} p-5 shadow-lg`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-white/60">Current Weather</p>
            <p className="text-2xl font-extrabold text-white">24°C</p>
            <p className="text-xs text-white/80">Partly Cloudy</p>
          </div>
          <Icon className="h-12 w-12 text-white/80" />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {weather.map((w) => (
            <div key={w.label} className="rounded-lg bg-white/10 p-2 text-center">
              <w.icon className="mx-auto h-4 w-4 text-white/70" />
              <p className="mt-1 text-[10px] text-white/60">{w.label}</p>
              <p className="text-xs font-bold text-white">{w.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LoginBackgroundDemo() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 0.3));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const timeIndex = Math.floor(progress / 20);
  const times: TimeOfDay[] = ["dawn", "sunrise", "noon", "sunset", "dusk"];
  const current = times[Math.min(timeIndex, 4)];
  const g = timeGradients[current];

  return (
    <div className="w-full max-w-sm">
      <div className={`rounded-xl bg-gradient-to-br ${g.from} ${g.via} ${g.to} p-6 shadow-lg`}>
        <div className="mb-6 text-center">
          <h3 className="text-lg font-bold text-white">Welcome Back</h3>
          <p className="text-xs text-white/70">Sign in to your account</p>
        </div>
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-[10px] font-medium text-white/80">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>
          <div>
            <label className="mb-1 block text-[10px] font-medium text-white/80">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>
          <button className="w-full rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-foreground shadow-sm hover:bg-white/90">
            Sign In
          </button>
        </div>
        <div className="mt-4 text-center">
          <span className="text-[10px] text-white/60">{current.charAt(0).toUpperCase() + current.slice(1)} theme active</span>
        </div>
      </div>
    </div>
  );
}

function HeroSectionDemo() {
  return (
    <div className="w-full max-w-lg">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-900 via-purple-700 to-orange-500 p-8 shadow-lg">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-40" />
        <div className="relative z-10">
          <Badge variant="secondary" className="mb-3 bg-white/20 text-white hover:bg-white/30">
            New Release
          </Badge>
          <h2 className="text-2xl font-extrabold text-white">Build Beautiful Interfaces</h2>
          <p className="mt-2 max-w-sm text-sm text-white/80">
            Ship production-ready components with dawn-inspired gradients and smooth transitions.
          </p>
          <div className="mt-4 flex gap-3">
            <button className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-foreground shadow-sm hover:bg-white/90">
              Get Started
            </button>
            <button className="rounded-lg border border-white/30 px-4 py-2 text-sm font-medium text-white hover:bg-white/10">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PricingCardsDemo() {
  const plans = [
    { name: "Starter", price: "$0", period: "forever", tier: "dawn" as TimeOfDay, features: ["5 projects", "1GB storage", "Community support"] },
    { name: "Pro", price: "$29", period: "/month", tier: "sunrise" as TimeOfDay, features: ["Unlimited projects", "100GB storage", "Priority support", "Custom domain"] },
    { name: "Enterprise", price: "$99", period: "/month", tier: "noon" as TimeOfDay, features: ["Everything in Pro", "Dedicated manager", "SLA guarantee", "API access"] },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
      {plans.map((plan) => {
        const g = timeGradients[plan.tier];
        const Icon = g.icon;
        return (
          <div key={plan.name} className="flex flex-col rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
            <div className={`bg-gradient-to-r ${g.from} ${g.via} ${g.to} p-4`}>
              <Icon className="h-5 w-5 text-white/80" />
              <p className="mt-1 text-sm font-bold text-white">{plan.name}</p>
            </div>
            <div className="flex-1 p-4">
              <div className="mb-3">
                <span className="text-2xl font-extrabold">{plan.price}</span>
                <span className="text-xs text-muted-foreground">{plan.period}</span>
              </div>
              <div className="space-y-2">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <div className="h-1 w-1 rounded-full bg-emerald-500" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <button className={`mt-4 w-full rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                plan.tier === "sunrise"
                  ? "bg-foreground text-background hover:bg-foreground/90"
                  : "border border-black/[.08] hover:bg-muted dark:border-white/[.145]"
              }`}>
                {plan.tier === "sunrise" ? "Current Plan" : "Choose Plan"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ProgressTimelineDemo() {
  const [progress, setProgress] = useState(35);

  const milestones = [
    { label: "Design", time: "dawn" as TimeOfDay, percent: 20 },
    { label: "Develop", time: "sunrise" as TimeOfDay, percent: 45 },
    { label: "Test", time: "noon" as TimeOfDay, percent: 70 },
    { label: "Launch", time: "sunset" as TimeOfDay, percent: 90 },
  ];

  return (
    <div className="w-full max-w-lg">
      <div className="rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Project Timeline</h3>
          <span className="text-xs text-muted-foreground">{progress}% complete</span>
        </div>

        <div className="relative mb-6">
          <div className="h-2 w-full rounded-full bg-muted" />
          <div
            className="absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r from-indigo-900 via-purple-600 to-orange-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between">
          {milestones.map((m) => {
            const g = timeGradients[m.time];
            return (
              <div key={m.label} className="flex flex-col items-center gap-1">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${g.from} ${g.via} ${g.to} text-xs font-bold text-white shadow-sm`}>
                  {m.percent <= progress ? "✓" : ""}
                </div>
                <span className="text-[10px] font-medium">{m.label}</span>
                <span className="text-[8px] text-muted-foreground">{m.percent}%</span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex gap-2">
          <button onClick={() => setProgress(Math.max(0, progress - 10))} className="rounded-md border border-black/[.08] px-3 py-1 text-xs font-medium hover:bg-muted dark:border-white/[.145]">
            -10%
          </button>
          <button onClick={() => setProgress(Math.min(100, progress + 10))} className="rounded-md border border-black/[.08] px-3 py-1 text-xs font-medium hover:bg-muted dark:border-white/[.145]">
            +10%
          </button>
        </div>
      </div>
    </div>
  );
}

function ThemeSwitcherDemo() {
  const [selected, setSelected] = useState<TimeOfDay>("sunrise");
  const g = timeGradients[selected];

  const times: { time: TimeOfDay; label: string; icon: typeof Sun }[] = [
    { time: "dawn", label: "Dawn", icon: Moon },
    { time: "sunrise", label: "Sunrise", icon: Sunrise },
    { time: "noon", label: "Noon", icon: Sun },
    { time: "sunset", label: "Sunset", icon: Sunset },
    { time: "dusk", label: "Dusk", icon: Moon },
  ];

  return (
    <div className="w-full max-w-md">
      <div className={`rounded-xl bg-gradient-to-br ${g.from} ${g.via} ${g.to} p-6 shadow-lg transition-all duration-500`}>
        <div className="mb-4 flex items-center gap-2">
          <Clock className="h-4 w-4 text-white/70" />
          <span className="text-xs font-medium text-white/80">Time of Day</span>
        </div>

        <div className="mb-6 grid grid-cols-5 gap-2">
          {times.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.time}
                onClick={() => setSelected(t.time)}
                className={`flex flex-col items-center gap-1 rounded-lg p-2 transition-all ${
                  selected === t.time
                    ? "bg-white/20 shadow-sm"
                    : "bg-white/5 hover:bg-white/10"
                }`}
              >
                <Icon className="h-4 w-4 text-white/80" />
                <span className="text-[9px] text-white/70">{t.label}</span>
              </button>
            );
          })}
        </div>

        <div className="rounded-lg bg-white/10 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-white">{g.label} Mode</p>
              <p className="text-[10px] text-white/60">Currently active theme</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              {(() => { const Icon = g.icon; return <Icon className="h-5 w-5 text-white" />; })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnimatedTransitionDemo() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 0.5));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const timeIndex = Math.floor(progress / 20);
  const times: TimeOfDay[] = ["dawn", "sunrise", "noon", "sunset", "dusk"];
  const current = times[Math.min(timeIndex, 4)];
  const g = timeGradients[current];
  const Icon = g.icon;

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <div className={`relative h-40 rounded-xl bg-gradient-to-r ${g.from} ${g.via} ${g.to} transition-all duration-500 shadow-lg overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className="h-16 w-16 text-white/30" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-white">{g.label}</span>
            <span className="text-xs text-white/70">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={progress}
        onChange={(e) => setProgress(Number(e.target.value))}
        className="w-full accent-primary"
      />
      <div className="flex justify-between text-[10px] text-muted-foreground px-1">
        {times.map((t) => (
          <span key={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</span>
        ))}
      </div>
    </div>
  );
}

export default function DawnGradientPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Dawn Gradient
          </h1>
          <Badge variant="primary">Visual</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Time-based gradient backgrounds simulating dawn, sunrise, noon, sunset, and dusk
          color transitions.
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
          <h3 className="text-lg font-medium text-foreground">All Time Periods</h3>
          <p className="text-sm text-muted-foreground">
            Display all 5 time-based gradient swatches.
          </p>
          <ComponentPreview id="dawn-periods">
            <AllTimePeriodsDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Weather Dashboard</h3>
          <p className="text-sm text-muted-foreground">
            Gradient background that adapts to the current time of day.
          </p>
          <ComponentPreview id="dawn-weather">
            <WeatherDashboardDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Login Background</h3>
          <p className="text-sm text-muted-foreground">
            Animated dawn gradient behind a sign-in form.
          </p>
          <ComponentPreview id="dawn-login">
            <LoginBackgroundDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Hero Section</h3>
          <p className="text-sm text-muted-foreground">
            Gradient hero banner with text overlay and CTA buttons.
          </p>
          <ComponentPreview id="dawn-hero">
            <HeroSectionDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Pricing Cards</h3>
          <p className="text-sm text-muted-foreground">
            Gradient accents on pricing tier headers.
          </p>
          <ComponentPreview id="dawn-pricing">
            <PricingCardsDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Progress Timeline</h3>
          <p className="text-sm text-muted-foreground">
            Gradient progress bar with milestone indicators.
          </p>
          <ComponentPreview id="dawn-timeline">
            <ProgressTimelineDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Theme Switcher</h3>
          <p className="text-sm text-muted-foreground">
            Interactive time-of-day theme selector with live preview.
          </p>
          <ComponentPreview id="dawn-theme">
            <ThemeSwitcherDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Animated Transition</h3>
          <p className="text-sm text-muted-foreground">
            Continuously cycling through all time gradients.
          </p>
          <ComponentPreview id="dawn-animated">
            <AnimatedTransitionDemo />
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
                <td className="px-4 py-3 font-mono text-xs">time</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"dawn\" | \"sunrise\" | \"noon\" | \"sunset\" | \"dusk\""}</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"dawn\""}</td>
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
              <tr>
                <td className="px-4 py-3 font-mono text-xs">children</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
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
