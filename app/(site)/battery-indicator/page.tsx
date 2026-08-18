"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Battery, BatteryCharging, BatteryFull, BatteryLow, BatteryMedium } from "lucide-react";

const installCommand = `npx component-library@latest add battery-indicator`;
const usageCode = `import { BatteryIndicator } from "@/components/battery-indicator";

<BatteryIndicator level={75} charging={false} />`;

function BatteryBarDemo({ level, size = "md" }: { level: number; size?: "sm" | "md" | "lg" }) {
  const getColor = (l: number) => {
    if (l > 60) return "bg-emerald-500";
    if (l > 30) return "bg-yellow-500";
    return "bg-red-500";
  };
  const heights = { sm: "h-4", md: "h-6", lg: "h-8" };
  return (
    <div className={`flex items-center gap-2`}>
      <div className={`relative ${heights[size]} w-20 overflow-hidden rounded-md border bg-muted`}>
        <div
          className={`absolute inset-y-0 left-0 transition-all duration-500 ${getColor(level)}`}
          style={{ width: `${level}%` }}
        />
        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-medium text-foreground/80">
          {level}%
        </span>
      </div>
    </div>
  );
}

function BatteryIconDemo({ level }: { level: number }) {
  const getColor = (l: number) => {
    if (l > 60) return "text-emerald-500";
    if (l > 30) return "text-yellow-500";
    return "text-red-500";
  };
  const Icon = level > 80 ? BatteryFull : level > 40 ? BatteryMedium : BatteryLow;
  return (
    <div className={`flex items-center gap-2 ${getColor(level)}`}>
      <Icon className="h-6 w-6" />
      <span className="text-sm font-medium">{level}%</span>
    </div>
  );
}

function AnimatedBatteryDemo() {
  const [level, setLevel] = useState(100);
  const [charging, setCharging] = useState(false);

  useEffect(() => {
    if (!charging) return;
    const interval = setInterval(() => {
      setLevel((l) => Math.min(100, l + 1));
    }, 100);
    return () => clearInterval(interval);
  }, [charging]);

  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="relative h-8 w-32 overflow-hidden rounded-lg border-2 border-foreground">
        <div
          className={`absolute inset-y-0 left-0 transition-all duration-200 ${charging ? "bg-emerald-500" : level > 30 ? "bg-yellow-500" : "bg-red-500"}`}
          style={{ width: `${level}%` }}
        />
        {charging && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] font-bold text-foreground drop-shadow-sm">⚡</span>
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => { setCharging(true); setLevel(0); }}
          className="rounded-md bg-emerald-500 px-3 py-1 text-xs font-medium text-white hover:bg-emerald-600"
        >
          Charge
        </button>
        <button
          onClick={() => setCharging(false)}
          className="rounded-md bg-muted px-3 py-1 text-xs font-medium hover:bg-muted/80"
        >
          Stop
        </button>
        <button
          onClick={() => { setCharging(false); setLevel(Math.max(0, level - 20)); }}
          className="rounded-md bg-red-500 px-3 py-1 text-xs font-medium text-white hover:bg-red-600"
        >
          Drain
        </button>
      </div>
      <span className="text-sm font-medium">{level}%</span>
    </div>
  );
}

function BatteryGroupDemo() {
  const devices = [
    { name: "Phone", level: 82, icon: BatteryFull },
    { name: "Tablet", level: 45, icon: BatteryMedium },
    { name: "Watch", level: 12, icon: BatteryLow },
  ];
  return (
    <div className="flex gap-4">
      {devices.map((d) => {
        const Icon = d.icon;
        const color = d.level > 60 ? "text-emerald-500" : d.level > 30 ? "text-yellow-500" : "text-red-500";
        return (
          <div key={d.name} className="flex flex-col items-center gap-1 rounded-lg border bg-card p-3">
            <Icon className={`h-6 w-6 ${color}`} />
            <span className="text-xs font-medium">{d.name}</span>
            <span className="text-[10px] text-muted-foreground">{d.level}%</span>
          </div>
        );
      })}
    </div>
  );
}

export default function BatteryIndicatorPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Battery Indicator</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Battery level display with animated charging states, color-coded thresholds, and multiple size variants.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Bar Indicators</h2>
        <ComponentPreview>
          <div className="flex flex-col gap-3">
            <BatteryBarDemo level={90} size="lg" />
            <BatteryBarDemo level={50} size="md" />
            <BatteryBarDemo level={15} size="sm" />
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Icon Indicators</h2>
        <ComponentPreview>
          <div className="flex gap-4">
            <BatteryIconDemo level={90} />
            <BatteryIconDemo level={50} />
            <BatteryIconDemo level={15} />
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Charging Animation</h2>
        <ComponentPreview>
          <AnimatedBatteryDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Device Group</h2>
        <ComponentPreview>
          <BatteryGroupDemo />
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
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">level</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">charging</td><td className="px-4 py-3 text-muted-foreground">boolean</td><td className="px-4 py-3 text-muted-foreground">false</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">size</td><td className="px-4 py-3 text-muted-foreground">{'"sm" | "md" | "lg"'}</td><td className="px-4 py-3 text-muted-foreground">{'"md"'}</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
