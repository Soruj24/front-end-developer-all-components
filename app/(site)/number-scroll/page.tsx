"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Hash, ArrowUp, ArrowDown, RotateCcw, Play, Pause, Zap } from "lucide-react";

const installCommand = "npx component-library@latest add number-scroll";

const usageCode = `import { useState, useEffect } from "react";

export function NumberScroll({ from, to, duration = 1000 }) {
  const [value, setValue] = useState(from);

  useEffect(() => {
    const start = performance.now();
    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(from + (to - from) * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [from, to, duration]);

  return <span className="tabular-nums">{value.toLocaleString()}</span>;
}`;

function CounterScroll() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => setCount((c) => c + 1), 50);
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-1">
        {String(count).padStart(5, "0").split("").map((d, i) => (
          <div key={i} className="relative w-12 h-16 rounded-lg bg-foreground overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-background">{d}</span>
            </div>
            <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-b from-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <button onClick={() => setIsRunning(!isRunning)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium">
          {isRunning ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          {isRunning ? "Pause" : "Start"}
        </button>
        <button onClick={() => { setCount(0); setIsRunning(false); }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-xs font-medium">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>
    </div>
  );
}

function PriceScroll() {
  const [target] = useState(4999);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-baseline gap-1">
        <span className="text-lg text-muted-foreground">$</span>
        {String(display).padStart(5, "0").split("").map((d, i) => (
          <div key={i} className="relative w-10 h-14 rounded-lg bg-primary/10 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-primary">{d}</span>
            </div>
          </div>
        ))}
      </div>
      <span className="text-sm text-muted-foreground">Total revenue</span>
    </div>
  );
}

function ScoreScroll() {
  const [score, setScore] = useState(0);
  const target = 87;

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setScore(current);
      if (current >= target) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, [target]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/50" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" className="text-primary" strokeDasharray={`${score * 2.64} 264`} strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-foreground">{score}</span>
        </div>
      </div>
      <span className="text-sm text-muted-foreground">Performance score</span>
    </div>
  );
}

function CountdownScroll() {
  const [seconds, setSeconds] = useState(300);

  useEffect(() => {
    if (seconds <= 0) return;
    const interval = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-1">
        {String(mins).padStart(2, "0").split("").map((d, i) => (
          <div key={`m${i}`} className="relative w-10 h-14 rounded-lg bg-foreground overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-background">{d}</span>
            </div>
          </div>
        ))}
        <span className="text-xl font-bold text-foreground mx-1">:</span>
        {String(secs).padStart(2, "0").split("").map((d, i) => (
          <div key={`s${i}`} className="relative w-10 h-14 rounded-lg bg-foreground overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-background">{d}</span>
            </div>
          </div>
        ))}
      </div>
      <span className="text-sm text-muted-foreground">Time remaining</span>
    </div>
  );
}

function DigitFlip() {
  const [digit, setDigit] = useState(0);
  const digits = [0, 3, 7, 2, 9, 5];

  useEffect(() => {
    const interval = setInterval(() => {
      setDigit((d) => (d + 1) % digits.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-16 h-20 rounded-xl bg-foreground overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold text-background">{digits[digit]}</span>
        </div>
        <div className="absolute inset-x-0 top-1/2 h-px bg-background/20" />
      </div>
      <span className="text-sm text-muted-foreground">Rotating digit</span>
    </div>
  );
}

function AnimatedNumber() {
  const [num, setNum] = useState(0);
  const target = 12345;

  useEffect(() => {
    let current = 0;
    const step = Math.ceil(target / 60);
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      setNum(current);
      if (current >= target) clearInterval(interval);
    }, 16);
    return () => clearInterval(interval);
  }, [target]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <Zap className="h-5 w-5 text-amber-500" />
        <span className="text-4xl font-bold tabular-nums text-foreground">{num.toLocaleString()}</span>
      </div>
      <span className="text-sm text-muted-foreground">Animated counter</span>
    </div>
  );
}

function StatCounter() {
  const stats = [
    { label: "Users", value: 12400, prefix: "" },
    { label: "Revenue", value: 89500, prefix: "$" },
    { label: "Growth", value: 24, suffix: "%" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat) => (
        <StatItem key={stat.label} {...stat} />
      ))}
    </div>
  );
}

function StatItem({ label, value, prefix = "", suffix = "" }: { label: string; value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let current = 0;
    const step = Math.ceil(value / 40);
    const interval = setInterval(() => {
      current = Math.min(current + step, value);
      setDisplay(current);
      if (current >= value) clearInterval(interval);
    }, 25);
    return () => clearInterval(interval);
  }, [value]);

  return (
    <div className="flex flex-col items-center gap-1 rounded-xl border p-4">
      <span className="text-2xl font-bold tabular-nums text-foreground">{prefix}{display.toLocaleString()}{suffix}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

export default function NumberScrollPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Number Scroll</h1>
          <Badge variant="primary">7 variants</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A rolling number animation component that smoothly transitions between numeric values with a slot-machine effect. Includes counter, price, score, countdown, and stat variants.
        </p>
      </header>

      {/* Installation */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      {/* Usage */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      {/* Examples */}
      <section className="flex flex-col gap-8">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Counter Scroll</h3>
          <ComponentPreview id="number-scroll-counter">
            <CounterScroll />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Price Scroll</h3>
          <ComponentPreview id="number-scroll-price">
            <PriceScroll />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Score Scroll</h3>
          <ComponentPreview id="number-scroll-score">
            <ScoreScroll />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Countdown Scroll</h3>
          <ComponentPreview id="number-scroll-countdown">
            <CountdownScroll />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Digit Flip</h3>
          <ComponentPreview id="number-scroll-digit">
            <DigitFlip />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Animated Number</h3>
          <ComponentPreview id="number-scroll-animated">
            <AnimatedNumber />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Stat Counter</h3>
          <ComponentPreview id="number-scroll-stat">
            <StatCounter />
          </ComponentPreview>
        </div>
      </section>

      {/* API Reference */}
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
                <td className="px-4 py-3 font-mono text-xs">from</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">0</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">to</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">duration</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">1000</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">prefix</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">""</td>
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
