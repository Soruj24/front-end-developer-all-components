"use client";

import { useState, useEffect, useRef } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { Card, CardContent, Button } from "@/components/ui";

const ANIMATEDCOUNTER_SOURCE = `"use client";

import { useState, useEffect } from "react";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

export function AnimatedCounter({ target, duration = 2000, prefix = "", suffix = "" }: AnimatedCounterProps) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let startTs = 0;
    let raf = 0;
    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const progress = Math.min((ts - startTs) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return <span>{prefix}{value.toLocaleString()}{suffix}</span>;
}`;

const BASIC_EXAMPLE = `<AnimatedCounter target={1000} duration={2000} />`;

const PREFIX_EXAMPLE = `<AnimatedCounter target={12450} duration={2000} prefix="$" />
<AnimatedCounter target={94} duration={1800} suffix="%" />`;

const DASHBOARD_EXAMPLE = `<Card>
  <CardContent className="text-center">
    <AnimatedCounter target={12450} duration={2000} prefix="$" />
  </CardContent>
</Card>`;

function useCounter(target: number, duration: number, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) {
      setValue(0);
      return;
    }
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

function DashboardMetrics() {
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
    <div className="flex w-full flex-col items-center gap-4">
      <div className="flex flex-wrap justify-center gap-6">
        {counters.map((c, i) => (
          <Card key={i} className="w-36">
            <CardContent className="flex flex-col items-center gap-1 py-4">
              <span className="text-3xl font-bold tabular-nums">{prefixes[i]}{vals[i].toLocaleString()}{suffixes[i]}</span>
              <span className="text-xs text-muted-foreground">{c.label}</span>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button size="sm" onClick={() => { setRunning(false); setVals([0, 0, 0]); setTimeout(() => setRunning(true), 50); }}>Replay</Button>
    </div>
  );
}

export default function AnimatedCounterPage() {
  return (
    <ComponentDocPage
      name="Animated Counter"
      category="Animation"
      description="Animated number counter with easing, configurable duration, prefix/suffix, and smooth transitions for metrics."
    >
      <PreviewPanel filename="animated-counter.tsx">
        <Counter target={1000} duration={2000} />
      </PreviewPanel>

      <SourceCodeViewer
        source={ANIMATEDCOUNTER_SOURCE}
        filename="components/ui/AnimatedCounter/AnimatedCounter.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Basic Counter" description="Count from zero to a target value." code={BASIC_EXAMPLE}>
          <Counter target={1000} duration={2000} />
        </ExampleBlock>

        <ExampleBlock title="With Prefix/Suffix" description="Add currency symbols or units to the count." code={PREFIX_EXAMPLE}>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <Counter target={12450} duration={2000} prefix="$" />
            <Counter target={94} duration={1800} suffix="%" />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Dashboard Metrics" description="Animated counters inside stat cards." code={DASHBOARD_EXAMPLE}>
          <DashboardMetrics />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
