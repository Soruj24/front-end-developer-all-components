"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Sun, Sunrise, Sunset } from "lucide-react";

const installCommand = `npx component-library@latest add dawn-gradient`;
const usageCode = `import { DawnGradient } from "@/components/dawn-gradient";

<DawnGradient time="sunrise" animated />`;

type TimeOfDay = "dawn" | "sunrise" | "noon" | "sunset" | "dusk";

const timeGradients: Record<TimeOfDay, { from: string; via: string; to: string; label: string }> = {
  dawn: { from: "from-indigo-900", via: "via-purple-700", to: "to-orange-500", label: "Dawn" },
  sunrise: { from: "from-orange-300", via: "via-pink-400", to: "to-purple-600", label: "Sunrise" },
  noon: { from: "from-sky-400", via: "via-blue-300", to: "to-cyan-200", label: "Noon" },
  sunset: { from: "from-orange-500", via: "via-red-500", to: "to-purple-800", label: "Sunset" },
  dusk: { from: "from-slate-800", via: "via-indigo-900", to: "to-purple-900", label: "Dusk" },
};

function GradientShowcaseDemo() {
  return (
    <div className="grid grid-cols-5 gap-2 w-full max-w-lg">
      {(["dawn", "sunrise", "noon", "sunset", "dusk"] as TimeOfDay[]).map((t) => {
        const g = timeGradients[t];
        return (
          <div key={t} className="flex flex-col items-center gap-1">
            <div className={`h-20 w-20 rounded-xl bg-gradient-to-br ${g.from} ${g.via} ${g.to} shadow-md`} />
            <span className="text-[10px] text-muted-foreground">{g.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function AnimatedDawnDemo() {
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

  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      <div className={`h-32 rounded-xl bg-gradient-to-r ${g.from} ${g.via} ${g.to} transition-all duration-500 shadow-lg flex items-end p-3`}>
        <span className="text-xs font-medium text-white/80">{g.label}</span>
      </div>
      <input type="range" min={0} max={100} value={progress} onChange={(e) => setProgress(Number(e.target.value))} className="w-full accent-primary" />
      <div className="flex justify-between text-[10px] text-muted-foreground">
        <Sunrise className="h-3 w-3" />
        <Sun className="h-3 w-3" />
        <Sunset className="h-3 w-3" />
      </div>
    </div>
  );
}

function GradientBarDemo() {
  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      <div className="h-16 rounded-lg bg-gradient-to-r from-indigo-900 via-purple-600 via-30% via-orange-400 via-50% via-red-500 via-70% to-purple-900 shadow-md" />
      <div className="flex justify-between text-[10px] text-muted-foreground px-1">
        <span>Midnight</span>
        <span>Sunrise</span>
        <span>Peak</span>
        <span>Sunset</span>
        <span>Midnight</span>
      </div>
    </div>
  );
}

export default function DawnGradientPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Dawn Gradient</h1>
          <Badge variant="primary">Visual</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Time-based gradient backgrounds simulating dawn, sunrise, noon, sunset, and dusk color transitions.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Time Periods</h2>
        <ComponentPreview>
          <GradientShowcaseDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Animated Transition</h2>
        <ComponentPreview>
          <AnimatedDawnDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Full Day Spectrum</h2>
        <ComponentPreview>
          <GradientBarDemo />
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
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">time</td><td className="px-4 py-3 text-muted-foreground">{'"dawn" | "sunrise" | "noon" | "sunset" | "dusk"'}</td><td className="px-4 py-3 text-muted-foreground">{'"dawn"'}</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">animated</td><td className="px-4 py-3 text-muted-foreground">boolean</td><td className="px-4 py-3 text-muted-foreground">false</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
