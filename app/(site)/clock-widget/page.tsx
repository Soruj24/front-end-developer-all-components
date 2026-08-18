"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Clock, Timer, AlarmClock, Hourglass } from "lucide-react";

const installCommand = `npx component-library@latest add clock-widget`;
const usageCode = `import { ClockWidget } from "@/components/clock-widget";

<ClockWidget format="12h" showSeconds={true} />`;

function AnalogClockDemo() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  return (
    <div className="relative h-40 w-40 rounded-full border-4 border-foreground bg-card shadow-lg">
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x = 80 + 65 * Math.cos(angle);
        const y = 80 + 65 * Math.sin(angle);
        return (
          <span key={i} className="absolute text-[10px] font-medium text-foreground" style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}>
            {i === 0 ? 12 : i}
          </span>
        );
      })}
      <div
        className="absolute left-1/2 bottom-1/2 h-1 w-1 origin-bottom rounded-full bg-foreground"
        style={{ transform: `translateX(-50%) rotate(${hours * 30 + minutes * 0.5}deg)`, height: 35 }}
      />
      <div
        className="absolute left-1/2 bottom-1/2 h-0.5 w-0.5 origin-bottom rounded-full bg-muted-foreground"
        style={{ transform: `translateX(-50%) rotate(${minutes * 6}deg)`, height: 50 }}
      />
      <div
        className="absolute left-1/2 bottom-1/2 w-px origin-bottom rounded-full bg-red-500"
        style={{ transform: `translateX(-50%) rotate(${seconds * 6}deg)`, height: 55 }}
      />
      <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground" />
    </div>
  );
}

function DigitalClockDemo() {
  const [time, setTime] = useState(new Date());
  const [format, setFormat] = useState<"12h" | "24h">("12h");

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = format === "12h" ? time.getHours() % 12 || 12 : time.getHours();
  const period = time.getHours() >= 12 ? "PM" : "AM";

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-baseline gap-1 rounded-lg border bg-card px-6 py-4 shadow-md">
        <span className="text-4xl font-bold font-mono tabular-nums">{String(hours).padStart(2, "0")}</span>
        <span className="text-4xl font-bold text-muted-foreground animate-pulse">:</span>
        <span className="text-4xl font-bold font-mono tabular-nums">{String(time.getMinutes()).padStart(2, "0")}</span>
        <span className="text-4xl font-bold text-muted-foreground animate-pulse">:</span>
        <span className="text-4xl font-bold font-mono tabular-nums">{String(time.getSeconds()).padStart(2, "0")}</span>
        {format === "12h" && <span className="ml-2 text-sm font-medium text-muted-foreground">{period}</span>}
      </div>
      <button onClick={() => setFormat((f) => f === "12h" ? "24h" : "12h")} className="text-xs text-primary hover:underline">
        Switch to {format === "12h" ? "24h" : "12h"}
      </button>
    </div>
  );
}

function StopwatchDemo() {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => setElapsed((e) => e + 10), 10);
    return () => clearInterval(interval);
  }, [running]);

  const format = (ms: number) => {
    const min = Math.floor(ms / 60000);
    const sec = Math.floor((ms % 60000) / 1000);
    const cent = Math.floor((ms % 1000) / 10);
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}.${String(cent).padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="font-mono text-3xl font-bold tabular-nums">{format(elapsed)}</div>
      <div className="flex gap-2">
        <button
          onClick={() => setRunning(!running)}
          className={`rounded-md px-4 py-1.5 text-sm font-medium ${running ? "bg-yellow-500 text-white" : "bg-primary text-primary-foreground"}`}
        >
          {running ? "Pause" : "Start"}
        </button>
        <button onClick={() => { setRunning(false); setElapsed(0); }} className="rounded-md bg-muted px-4 py-1.5 text-sm font-medium hover:bg-muted/80">
          Reset
        </button>
      </div>
    </div>
  );
}

function WorldClockDemo() {
  const zones = [
    { label: "New York", offset: -5, flag: "🗽" },
    { label: "London", offset: 0, flag: "🇬🇧" },
    { label: "Tokyo", offset: 9, flag: "🇯🇵" },
  ];

  const [times, setTimes] = useState(() => zones.map((z) => {
    const d = new Date();
    d.setHours(d.getHours() + z.offset - d.getTimezoneOffset() / 60);
    return d;
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimes(zones.map((z) => {
        const d = new Date();
        d.setHours(d.getHours() + z.offset - d.getTimezoneOffset() / 60);
        return d;
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-3">
      {zones.map((z, i) => (
        <div key={z.label} className="flex flex-col items-center gap-1 rounded-lg border bg-card p-3">
          <span className="text-lg">{z.flag}</span>
          <span className="text-[10px] font-medium text-muted-foreground">{z.label}</span>
          <span className="font-mono text-sm font-bold">{String(times[i].getHours()).padStart(2, "0")}:{String(times[i].getMinutes()).padStart(2, "0")}</span>
        </div>
      ))}
    </div>
  );
}

export default function ClockWidgetPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Clock Widget</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Real-time clock widgets including analog, digital, stopwatch, and world clock variants with auto-updating displays.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Analog Clock</h2>
        <ComponentPreview>
          <AnalogClockDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Digital Clock</h2>
        <ComponentPreview>
          <DigitalClockDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Stopwatch</h2>
        <ComponentPreview>
          <StopwatchDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">World Clock</h2>
        <ComponentPreview>
          <WorldClockDemo />
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
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">format</td><td className="px-4 py-3 text-muted-foreground">{'"12h" | "24h"'}</td><td className="px-4 py-3 text-muted-foreground">{'"12h"'}</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">showSeconds</td><td className="px-4 py-3 text-muted-foreground">boolean</td><td className="px-4 py-3 text-muted-foreground">true</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">variant</td><td className="px-4 py-3 text-muted-foreground">{'"analog" | "digital"'}</td><td className="px-4 py-3 text-muted-foreground">{'"digital"'}</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
