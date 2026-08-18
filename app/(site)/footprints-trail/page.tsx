"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Footprints,
  MapPin,
  Timer,
  TrendingUp,
  Dog,
  Package,
  Mountain,
  ChevronRight,
} from "lucide-react";

const installCommand = `npx component-library@latest add footprints-trail`;
const usageCode = `import { FootprintsTrail } from "@/components/footprints-trail";

<FootprintsTrail steps={10} color="primary" />`;

function FootprintsTrailDemo() {
  const [steps, setSteps] = useState<{ x: number; y: number; side: "left" | "right" }[]>([]);

  const addStep = () => {
    setSteps((prev) => {
      const last = prev[prev.length - 1];
      const newX = last ? last.x + 30 : 20;
      const newY = last ? last.y + (Math.random() - 0.5) * 20 : 60;
      const side = last?.side === "left" ? "right" : "left";
      return [...prev.slice(-11), { x: newX, y: Math.max(10, Math.min(110, newY)), side }];
    });
  };

  useEffect(() => {
    const interval = setInterval(addStep, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-32 w-full max-w-md rounded-lg border bg-gradient-to-r from-amber-100 to-amber-50 dark:from-amber-950/20 dark:to-amber-900/10 overflow-hidden">
      {steps.map((step, i) => (
        <div
          key={i}
          className="absolute transition-all duration-500"
          style={{ left: step.x, top: step.y, opacity: 0.3 + (i / steps.length) * 0.7 }}
        >
          <Footprints className={`h-4 w-4 ${step.side === "left" ? "text-amber-700" : "text-amber-600"} ${step.side === "left" ? "" : "scale-x-[-1]"}`} />
        </div>
      ))}
    </div>
  );
}

function WalkingPathDemo() {
  const points = [
    { x: 10, y: 80 }, { x: 50, y: 60 }, { x: 90, y: 70 },
    { x: 130, y: 40 }, { x: 170, y: 55 }, { x: 210, y: 30 },
    { x: 250, y: 50 }, { x: 290, y: 35 }, { x: 330, y: 45 },
  ];
  return (
    <div className="relative h-32 w-full max-w-md rounded-lg border bg-card overflow-hidden">
      <svg className="h-full w-full">
        <path
          d={`M ${points.map((p) => `${p.x} ${p.y}`).join(" L ")}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="text-primary/30"
        />
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="4" className="fill-primary" opacity={0.2 + (i / points.length) * 0.8} />
          </g>
        ))}
      </svg>
    </div>
  );
}

function StepCounterDemo() {
  const [count, setCount] = useState(0);
  const maxSteps = 10000;
  const percentage = Math.min(100, (count / maxSteps) * 100);

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm p-5 dark:border-white/[.145]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Footprints className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Daily Steps</h3>
          </div>
          <span className="text-[10px] text-muted-foreground">Today</span>
        </div>
        <div className="flex items-end gap-3 mb-4">
          <span className="text-3xl font-extrabold">{count.toLocaleString()}</span>
          <span className="text-xs text-muted-foreground mb-1">/ {maxSteps.toLocaleString()}</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden mb-3">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${percentage}%` }} />
        </div>
        <div className="flex items-center justify-between">
          <button onClick={() => setCount((c) => Math.max(0, c - 500))} className="rounded-md bg-muted px-3 py-1 text-xs font-medium hover:bg-muted/80">-500</button>
          <span className="text-xs text-muted-foreground">{percentage.toFixed(0)}% complete</span>
          <button onClick={() => setCount((c) => Math.min(maxSteps, c + 500))} className="rounded-md bg-muted px-3 py-1 text-xs font-medium hover:bg-muted/80">+500</button>
        </div>
      </div>
    </div>
  );
}

function TrailVariantsDemo() {
  const variants = [
    { label: "Solid", style: "bg-primary" },
    { label: "Dashed", style: "bg-primary/50" },
    { label: "Dotted", style: "bg-primary/30" },
  ];
  return (
    <div className="flex flex-col gap-3 w-full max-w-xs">
      {variants.map((v) => (
        <div key={v.label} className="flex items-center gap-3">
          <div className={`h-1 flex-1 ${v.style} rounded-full`} />
          <span className="text-xs text-muted-foreground w-14">{v.label}</span>
        </div>
      ))}
    </div>
  );
}

function HikingDashboardDemo() {
  const [distance, setDistance] = useState(3.2);
  const trail = [
    { x: 20, y: 70, elevation: 450 },
    { x: 60, y: 50, elevation: 520 },
    { x: 100, y: 60, elevation: 480 },
    { x: 140, y: 35, elevation: 610 },
    { x: 180, y: 45, elevation: 580 },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Mountain className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Hiking Trail</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 rounded-lg bg-muted/30 p-3 text-center">
              <p className="text-lg font-extrabold">{distance} km</p>
              <p className="text-[10px] text-muted-foreground">Distance</p>
            </div>
            <div className="flex-1 rounded-lg bg-muted/30 p-3 text-center">
              <p className="text-lg font-extrabold">45 min</p>
              <p className="text-[10px] text-muted-foreground">Duration</p>
            </div>
            <div className="flex-1 rounded-lg bg-muted/30 p-3 text-center">
              <p className="text-lg font-extrabold">160m</p>
              <p className="text-[10px] text-muted-foreground">Elevation</p>
            </div>
          </div>
          <div className="relative h-20 bg-gradient-to-t from-green-100 to-green-50 dark:from-green-950/20 dark:to-green-900/10 rounded-lg overflow-hidden">
            <svg className="h-full w-full">
              <path d={`M ${trail.map((p) => `${p.x} ${p.y}`).join(" L ")}`} fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500" />
              {trail.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="3" className="fill-green-600" />
              ))}
              <circle cx={trail[trail.length - 1].x} cy={trail[trail.length - 1].y} r="5" className="fill-green-700 animate-pulse" />
            </svg>
          </div>
          <button onClick={() => setDistance((d) => Math.min(12, d + 0.5))} className="mt-3 w-full rounded-lg bg-foreground px-4 py-2 text-xs font-medium text-background hover:bg-foreground/90">
            Continue Hike
          </button>
        </div>
      </div>
    </div>
  );
}

function DeliveryTrackerDemo() {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    { label: "Order Placed", time: "9:00 AM", done: true },
    { label: "Picked Up", time: "10:30 AM", done: true },
    { label: "In Transit", time: "11:15 AM", done: currentStep >= 2 },
    { label: "Out for Delivery", time: "2:00 PM", done: currentStep >= 3 },
    { label: "Delivered", time: "3:30 PM", done: currentStep >= 4 },
  ];

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm p-5 dark:border-white/[.145]">
        <div className="flex items-center gap-2 mb-4">
          <Package className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Package #4829</h3>
        </div>
        <div className="space-y-3 mb-4">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                s.done ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400" : "bg-muted text-muted-foreground"
              }`}>
                {s.done ? "✓" : i + 1}
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium">{s.label}</p>
                <p className="text-[9px] text-muted-foreground">{s.time}</p>
              </div>
              {i < steps.length - 1 && (
                <div className={`absolute ml-3 mt-8 h-4 w-0.5 ${s.done ? "bg-emerald-200 dark:bg-emerald-800" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>
        <button onClick={() => setCurrentStep((s) => Math.min(4, s + 1))} className="w-full rounded-lg bg-foreground px-4 py-2 text-xs font-medium text-background hover:bg-foreground/90">
          Next Step
        </button>
      </div>
    </div>
  );
}

function PetActivityDemo() {
  const [active, setActive] = useState(false);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setDistance((d) => d + 0.1);
    }, 1000);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="relative h-24 bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-950/20 dark:to-amber-950/20">
          <div className="absolute top-4 right-4">
            <Dog className="h-12 w-12 text-orange-400" />
          </div>
          {active && (
            <div className="absolute bottom-2 left-4 flex gap-1">
              {[1, 2, 3].map((i) => (
                <Footprints key={i} className="h-3 w-3 text-orange-500 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold">Max&apos;s Walk</h3>
              <p className="text-[10px] text-muted-foreground">{active ? "Walking..." : "Paused"}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-extrabold">{distance.toFixed(1)} km</p>
              <p className="text-[10px] text-muted-foreground">distance</p>
            </div>
          </div>
          <button onClick={() => setActive(!active)} className={`w-full rounded-lg px-4 py-2 text-xs font-medium ${
            active ? "bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-950/30 dark:text-orange-400" : "bg-foreground text-background hover:bg-foreground/90"
          }`}>
            {active ? "Stop Walk" : "Start Walk"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FootprintsTrailPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Footprints Trail
          </h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Animated footprints trail with walking path visualization, step counter, and trail
          variant styles.
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
          <h3 className="text-lg font-medium text-foreground">Animated Trail</h3>
          <p className="text-sm text-muted-foreground">
            Real-time footprints appearing as you walk.
          </p>
          <ComponentPreview id="footprints-animated">
            <FootprintsTrailDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Walking Path</h3>
          <p className="text-sm text-muted-foreground">
            SVG path visualization with waypoints.
          </p>
          <ComponentPreview id="footprints-path">
            <WalkingPathDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Step Counter</h3>
          <p className="text-sm text-muted-foreground">
            Fitness tracker style step counter with progress.
          </p>
          <ComponentPreview id="footprints-counter">
            <StepCounterDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Trail Variants</h3>
          <p className="text-sm text-muted-foreground">
            Different trail line styles.
          </p>
          <ComponentPreview id="footprints-variants">
            <TrailVariantsDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Hiking Dashboard</h3>
          <p className="text-sm text-muted-foreground">
            Outdoor activity tracking with elevation map.
          </p>
          <ComponentPreview id="footprints-hiking">
            <HikingDashboardDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Delivery Tracker</h3>
          <p className="text-sm text-muted-foreground">
            Package delivery route tracking.
          </p>
          <ComponentPreview id="footprints-delivery">
            <DeliveryTrackerDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Pet Activity</h3>
          <p className="text-sm text-muted-foreground">
            Dog walking tracker with distance counter.
          </p>
          <ComponentPreview id="footprints-pet">
            <PetActivityDemo />
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
                <td className="px-4 py-3 font-mono text-xs">steps</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">10</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">color</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">"primary"</td>
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
