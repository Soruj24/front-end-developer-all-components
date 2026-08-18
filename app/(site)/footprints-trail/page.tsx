"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Footprints, ChevronRight } from "lucide-react";

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
            <Footprints className="h-3 w-3" style={{ transform: `translate(${p.x - 6}px, ${p.y - 6}px)` }} />
          </g>
        ))}
      </svg>
    </div>
  );
}

function StepCounterDemo() {
  const [count, setCount] = useState(0);
  const maxSteps = 50;
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative h-8 w-full max-w-xs rounded-full bg-muted overflow-hidden">
        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(count / maxSteps) * 100}%` }} />
      </div>
      <div className="flex items-center gap-3">
        <button onClick={() => setCount((c) => Math.max(0, c - 1))} className="rounded-md bg-muted px-3 py-1 text-xs font-medium hover:bg-muted/80">-</button>
        <span className="font-mono text-lg font-bold">{count}</span>
        <button onClick={() => setCount((c) => Math.min(maxSteps, c + 1))} className="rounded-md bg-muted px-3 py-1 text-xs font-medium hover:bg-muted/80">+</button>
      </div>
      <span className="text-xs text-muted-foreground">{maxSteps - count} steps remaining</span>
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

export default function FootprintsTrailPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Footprints Trail</h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Animated footprints trail with walking path visualization, step counter, and trail variant styles.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Animated Trail</h2>
        <ComponentPreview>
          <FootprintsTrailDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Walking Path</h2>
        <ComponentPreview>
          <WalkingPathDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Step Counter</h2>
        <ComponentPreview>
          <StepCounterDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Trail Variants</h2>
        <ComponentPreview>
          <TrailVariantsDemo />
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
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">steps</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">10</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">color</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">{'"primary"'}</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
