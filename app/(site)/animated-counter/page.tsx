"use client";

import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Card, CardContent, Button } from "@/components/ui";

const installCommand = `npx component-library@latest add animated-counter`;

const usageCode = `import { AnimatedCounter } from "@/components/ui";

export default function Example() {
  return <AnimatedCounter target={1000} duration={2000} prefix="$" />;
}`;

function useCounter(target: number, duration: number, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) { setValue(0); return; }
    let startTs = 0;
    let raf: number;
    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const progress = Math.min((ts - startTs) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return value;
}

function Counter({ target, duration, prefix = "", suffix = "" }: { target: number; duration: number; prefix?: string; suffix?: string }) {
  const [started, setStarted] = useState(false);
  const val = useCounter(target, duration, started);
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-4xl font-bold tabular-nums">{prefix}{val.toLocaleString()}{suffix}</span>
      <Button size="sm" onClick={() => setStarted(true)}>Start</Button>
    </div>
  );
}

const counters = [
  { label: "Revenue", target: 12450, prefix: "$", duration: 2000 },
  { label: "Users", target: 8920, suffix: "+", duration: 2500 },
  { label: "Growth", target: 94, suffix: "%", duration: 1800 },
];

export default function AnimatedCounterPage() {
  const [running, setRunning] = useState(false);
  const [vals, setVals] = useState([0, 0, 0]);
  const targets = [12450, 8920, 94];
  const suffixes = ["", "+", "%"];
  const prefixes = ["$", "", ""];

  useEffect(() => {
    if (!running) return;
    let startTs = 0;
    let raf: number;
    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const progress = Math.min((ts - startTs) / 2500, 1);
      setVals(targets.map(t => Math.floor(progress * t)));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [running]);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Animated Counter</h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Animated number counter with easing, configurable duration, prefix/suffix, and smooth transitions for metrics.
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
          <h3 className="text-lg font-medium text-foreground">Basic Counter</h3>
          <ComponentPreview id="animated-counter-default">
            <div className="flex w-full items-center justify-center py-10">
              <Counter target={1000} duration={2000} />
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">With Prefix/Suffix</h3>
          <ComponentPreview id="animated-counter-prefix">
            <div className="flex w-full items-center justify-center gap-8 py-10">
              <Counter target={12450} duration={2000} prefix="$" />
              <Counter target={94} duration={1800} suffix="%" />
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Dashboard Metrics</h3>
          <ComponentPreview id="animated-counter-dashboard">
            <div className="flex w-full items-center justify-center py-10">
              <div className="flex gap-6">
                {counters.map((c, i) => (
                  <Card key={i} className="w-36">
                    <CardContent className="flex flex-col items-center gap-1 py-4">
                      <span className="text-3xl font-bold tabular-nums">{prefixes[i]}{vals[i].toLocaleString()}{suffixes[i]}</span>
                      <span className="text-xs text-muted-foreground">{c.label}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button className="mt-4" onClick={() => { setRunning(false); setVals([0, 0, 0]); setTimeout(() => setRunning(true), 50); }}>Replay</Button>
            </div>
          </ComponentPreview>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Default</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">target</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">duration</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">2000</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">prefix</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">""</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">suffix</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">""</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}