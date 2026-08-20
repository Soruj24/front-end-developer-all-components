"use client";

import { useState, useEffect, useRef } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { cn } from "@/lib/cn";

const ANIMATEDCOUNTER_SOURCE = `"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  startOnMount?: boolean;
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function AnimatedCounter({
  target,
  duration = 2000,
  prefix = "",
  suffix = "",
  className,
  startOnMount = true,
}: AnimatedCounterProps) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!startOnMount) return;

    let startTs = 0;

    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const elapsed = ts - startTs;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      setValue(Math.floor(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, startOnMount]);

  return (
    <span
      className={cn("tabular-nums tracking-tight", className)}
      aria-label={\`\${prefix}\${target.toLocaleString()}\${suffix}\`}
    >
      {prefix}{value.toLocaleString()}{suffix}
    </span>
  );
}`;

const BASIC_EXAMPLE = `<AnimatedCounter target={1000} duration={2000} />`;

const PREFIX_EXAMPLE = `<AnimatedCounter target={12450} duration={2000} prefix="$" />
<AnimatedCounter target={94} duration={1800} suffix="%" />`;

const DASHBOARD_EXAMPLE = `<div className="grid grid-cols-3 gap-4">
  <StatCard label="Revenue" target={12450} prefix="$" />
  <StatCard label="Users" target={8920} suffix="+" />
  <StatCard label="Growth" target={94} suffix="%" />
</div>`;

const SIZE_EXAMPLE = `<AnimatedCounter target={42} className="text-2xl font-bold" />
<AnimatedCounter target={42} className="text-4xl font-bold" />
<AnimatedCounter target={42} className="text-6xl font-extrabold" />`;

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function useAnimatedCounter(target: number, duration: number, start = false) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!start) return;

    let startTs = 0;

    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const elapsed = ts - startTs;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      setValue(Math.floor(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [start, target, duration]);

  return value;
}

function Counter({
  target,
  duration,
  prefix = "",
  suffix = "",
  className,
}: {
  target: number;
  duration: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const [started, setStarted] = useState(false);
  const val = useAnimatedCounter(target, duration, started);

  return (
    <div className="flex flex-col items-center gap-3">
      <span
        className={cn(
          "tabular-nums tracking-tight text-foreground",
          className ?? "text-5xl font-bold",
        )}
        aria-label={`${prefix}${target.toLocaleString()}${suffix}`}
      >
        {prefix}
        {val.toLocaleString()}
        {suffix}
      </span>
      <button
        type="button"
        onClick={() => {
          setStarted(false);
          requestAnimationFrame(() => setStarted(true));
        }}
        className="inline-flex items-center rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {started ? "Replay" : "Start"}
      </button>
    </div>
  );
}

const stats = [
  { label: "Revenue", target: 12450, prefix: "$", duration: 2000, color: "text-blue-600 dark:text-blue-400" },
  { label: "Users", target: 8920, suffix: "+", duration: 2500, color: "text-emerald-600 dark:text-emerald-400" },
  { label: "Growth", target: 94, suffix: "%", duration: 1800, color: "text-violet-600 dark:text-violet-400" },
  { label: "Uptime", target: 99, suffix: "%", duration: 2200, color: "text-amber-600 dark:text-amber-400" },
];

function StatCard({
  label,
  target,
  prefix,
  suffix,
  color,
  started,
}: {
  label: string;
  target: number;
  prefix?: string;
  suffix?: string;
  color: string;
  started: boolean;
}) {
  const val = useAnimatedCounter(target, 2500, started);

  return (
    <div className="flex flex-col items-center gap-1 rounded-xl border border-border bg-background p-5">
      <span className={cn("text-3xl font-bold tabular-nums tracking-tight", color)}>
        {prefix}
        {val.toLocaleString()}
        {suffix}
      </span>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

function DashboardDemo() {
  const [running, setRunning] = useState(false);

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <div className="grid w-full max-w-lg grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} started={running} />
        ))}
      </div>
      <button
        type="button"
        onClick={() => {
          setRunning(false);
          requestAnimationFrame(() => setRunning(true));
        }}
        className="inline-flex items-center rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Replay All
      </button>
    </div>
  );
}

const sizes = [
  { label: "Small", className: "text-2xl font-bold" },
  { label: "Medium", className: "text-4xl font-bold" },
  { label: "Large", className: "text-6xl font-extrabold" },
];

function AnimatedCounterInline({
  target,
  duration,
  started,
  className,
}: {
  target: number;
  duration: number;
  started: boolean;
  className?: string;
}) {
  const val = useAnimatedCounter(target, duration, started);
  return (
    <span className={cn("tabular-nums tracking-tight text-foreground", className)}>
      {val.toLocaleString()}
    </span>
  );
}

function SizesDemo() {
  const [started, setStarted] = useState(false);

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex flex-wrap items-end justify-center gap-8">
        {sizes.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-2">
            <AnimatedCounterInline
              target={42}
              duration={1800}
              started={started}
              className={s.className}
            />
            <span className="text-xs text-muted-foreground">{s.label}</span>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => {
          setStarted(false);
          requestAnimationFrame(() => setStarted(true));
        }}
        className="inline-flex items-center rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Replay
      </button>
    </div>
  );
}

function PrefixDemo() {
  const [started, setStarted] = useState(false);

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex flex-wrap items-center justify-center gap-10">
        <div className="flex flex-col items-center gap-2">
          <AnimatedCounterInline
            target={12450}
            duration={2000}
            started={started}
            className="text-4xl font-bold text-foreground"
          />
          <span className="text-xs text-muted-foreground">Revenue</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <AnimatedCounterInline
            target={94}
            duration={1800}
            started={started}
            className="text-4xl font-bold text-foreground"
          />
          <span className="text-xs text-muted-foreground">Accuracy</span>
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          setStarted(false);
          requestAnimationFrame(() => setStarted(true));
        }}
        className="inline-flex items-center rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Replay
      </button>
    </div>
  );
}

export default function AnimatedCounterPage() {
  return (
    <ComponentDocPage
      name="Animated Counter"
      category="Animation"
      description="Animated number counter with easeOutExpo easing, configurable duration, prefix/suffix, and smooth requestAnimationFrame transitions."
    >
      <PreviewPanel filename="AnimatedCounter.tsx">
        <Counter target={1000} duration={2000} />
      </PreviewPanel>

      <SourceCodeViewer
        source={ANIMATEDCOUNTER_SOURCE}
        filename="components/ui/AnimatedCounter/AnimatedCounter.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-8">
        <ExampleBlock
          title="Basic Counter"
          description="Count from zero to a target value with easeOutExpo easing."
          code={BASIC_EXAMPLE}
        >
          <Counter target={1000} duration={2000} />
        </ExampleBlock>

        <ExampleBlock
          title="With Prefix/Suffix"
          description="Add currency symbols, percentages, or custom units."
          code={PREFIX_EXAMPLE}
        >
          <PrefixDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Sizes"
          description="Scale the counter from small to large with different font weights."
          code={SIZE_EXAMPLE}
        >
          <SizesDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Dashboard Metrics"
          description="Multiple animated counters inside stat cards with colored values."
          code={DASHBOARD_EXAMPLE}
        >
          <DashboardDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
