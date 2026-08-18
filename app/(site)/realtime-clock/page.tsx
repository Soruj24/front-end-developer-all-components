"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Clock, Timer, Watch, AlarmClock, Sun, Moon, Globe } from "lucide-react";

const installCommand = "npx component-library@latest add realtime-clock";

const usageCode = `import { useState, useEffect } from "react";

export function RealtimeClock({ format = "24h", timezone }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatted = time.toLocaleTimeString("en-US", {
    hour12: format === "12h",
    timeZone: timezone,
  });

  return <span className="tabular-nums">{formatted}</span>;
}`;

function AnalogClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-40 h-40 rounded-full border-4 border-foreground/10 flex items-center justify-center">
        {/* Hour markers */}
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const x = Math.cos(angle) * 52 + 50;
          const y = Math.sin(angle) * 52 + 50;
          return (
            <div key={i} className="absolute w-1 h-1 rounded-full bg-foreground/30" style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)" }} />
          );
        })}
        {/* Hour hand */}
        <div className="absolute w-1 h-10 bg-foreground/70 origin-bottom rounded-full" style={{ transformOrigin: "bottom center", transform: `rotate(${hours * 30 + minutes * 0.5}deg)` }} />
        {/* Minute hand */}
        <div className="absolute w-0.5 h-14 bg-foreground origin-bottom rounded-full" style={{ transformOrigin: "bottom center", transform: `rotate(${minutes * 6}deg)` }} />
        {/* Second hand */}
        <div className="absolute w-px h-14 bg-red-500 origin-bottom" style={{ transformOrigin: "bottom center", transform: `rotate(${seconds * 6}deg)` }} />
        <div className="w-3 h-3 rounded-full bg-primary" />
      </div>
      <span className="text-sm text-muted-foreground">Analog Clock</span>
    </div>
  );
}

function DigitalClock() {
  const [time, setTime] = useState(new Date());
  const [format, setFormat] = useState<"24h" | "12h">("24h");

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatted = time.toLocaleTimeString("en-US", { hour12: format === "12h" });
  const date = time.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-mono font-bold tabular-nums text-foreground">{formatted}</span>
        <button onClick={() => setFormat(format === "24h" ? "12h" : "24h")} className="text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded hover:bg-muted transition-colors">
          {format}
        </button>
      </div>
      <span className="text-sm text-muted-foreground">{date}</span>
    </div>
  );
}

function WorldClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const zones = [
    { label: "New York", tz: "America/New_York" },
    { label: "London", tz: "Europe/London" },
    { label: "Tokyo", tz: "Asia/Tokyo" },
    { label: "Sydney", tz: "Australia/Sydney" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 w-full max-w-md">
      {zones.map((z) => (
        <div key={z.tz} className="rounded-xl border p-3 text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            <Globe className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">{z.label}</span>
          </div>
          <span className="text-lg font-mono font-bold tabular-nums text-foreground">
            {time.toLocaleTimeString("en-US", { timeZone: z.tz, hour: "2-digit", minute: "2-digit", hour12: false })}
          </span>
        </div>
      ))}
    </div>
  );
}

function Stopwatch() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => setElapsed((e) => e + 10), 10);
    return () => clearInterval(interval);
  }, [running]);

  const mins = Math.floor(elapsed / 60000);
  const secs = Math.floor((elapsed % 60000) / 1000);
  const ms = Math.floor((elapsed % 1000) / 10);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-mono font-bold tabular-nums text-foreground">
          {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
        </span>
        <span className="text-lg font-mono text-muted-foreground">.{String(ms).padStart(2, "0")}</span>
      </div>
      <div className="flex gap-2">
        <button onClick={() => setRunning(!running)} className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${running ? "bg-amber-500 text-white" : "bg-primary text-primary-foreground"}`}>
          {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {running ? "Pause" : "Start"}
        </button>
        <button onClick={() => { setElapsed(0); setRunning(false); }} className="px-4 py-2 rounded-lg bg-muted text-sm font-medium text-foreground">Reset</button>
      </div>
    </div>
  );
}

function Pause({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
    </svg>
  );
}

function Play({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function CountdownTimer() {
  const [total, setTotal] = useState(300);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || total <= 0) return;
    const interval = setInterval(() => setTotal((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [running, total]);

  const mins = Math.floor(total / 60);
  const secs = total % 60;
  const progress = ((300 - total) / 300) * 100;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted/30" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="6" className="text-primary" strokeDasharray={`${progress * 2.64} 264`} strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-mono font-bold tabular-nums text-foreground">
            {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={() => setRunning(!running)} className={`px-4 py-2 rounded-lg text-sm font-medium ${running ? "bg-amber-500 text-white" : "bg-primary text-primary-foreground"}`}>
          {running ? "Pause" : "Start"}
        </button>
        <button onClick={() => { setTotal(300); setRunning(false); }} className="px-4 py-2 rounded-lg bg-muted text-sm font-medium text-foreground">Reset</button>
      </div>
    </div>
  );
}

function AlarmClockDemo() {
  const [time, setTime] = useState(new Date());
  const [alarmHour, setAlarmHour] = useState(8);
  const [alarmMin, setAlarmMin] = useState(0);
  const [alarmSet, setAlarmSet] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const isAlarm = alarmSet && time.getHours() === alarmHour && time.getMinutes() === alarmMin;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-mono font-bold tabular-nums text-foreground">
          {time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <AlarmClock className={`h-4 w-4 ${alarmSet ? "text-primary" : "text-muted-foreground"}`} />
        <span className="text-sm text-muted-foreground">Alarm: {String(alarmHour).padStart(2, "0")}:{String(alarmMin).padStart(2, "0")}</span>
        <button onClick={() => setAlarmSet(!alarmSet)} className={`px-3 py-1 rounded-full text-xs font-medium ${alarmSet ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
          {alarmSet ? "On" : "Off"}
        </button>
      </div>
      {isAlarm && <span className="text-sm font-medium text-red-500">Alarm ringing!</span>}
    </div>
  );
}

function PomodoroTimer() {
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState<"work" | "break">("work");

  useEffect(() => {
    if (!running || seconds <= 0) return;
    const interval = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(interval);
  }, [running, seconds]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const total = mode === "work" ? 25 * 60 : 5 * 60;
  const progress = ((total - seconds) / total) * 100;

  const switchMode = (m: "work" | "break") => {
    setMode(m);
    setRunning(false);
    setSeconds(m === "work" ? 25 * 60 : 5 * 60);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-2">
        <button onClick={() => switchMode("work")} className={`px-3 py-1 rounded-full text-xs font-medium ${mode === "work" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
          <Clock className="h-3 w-3 inline mr-1" /> Work (25m)
        </button>
        <button onClick={() => switchMode("break")} className={`px-3 py-1 rounded-full text-xs font-medium ${mode === "break" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
          <Sun className="h-3 w-3 inline mr-1" /> Break (5m)
        </button>
      </div>
      <div className="relative w-32 h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted/30" />
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="6" className={mode === "work" ? "text-primary" : "text-green-500"} strokeDasharray={`${progress * 2.64} 264`} strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-mono font-bold tabular-nums text-foreground">
            {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
          </span>
        </div>
      </div>
      <button onClick={() => setRunning(!running)} className={`px-4 py-2 rounded-lg text-sm font-medium ${running ? "bg-amber-500 text-white" : "bg-primary text-primary-foreground"}`}>
        {running ? "Pause" : "Start"}
      </button>
    </div>
  );
}

export default function RealtimeClockPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Realtime Clock</h1>
          <Badge variant="primary">7 variants</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A live-updating clock component that displays the current time with customizable format and timezone. Includes analog, digital, world, stopwatch, countdown, alarm, and pomodoro variants.
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
          <h3 className="text-sm font-medium text-muted-foreground">Analog Clock</h3>
          <ComponentPreview id="realtime-clock-analog">
            <AnalogClock />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Digital Clock</h3>
          <ComponentPreview id="realtime-clock-digital">
            <DigitalClock />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">World Clock</h3>
          <ComponentPreview id="realtime-clock-world">
            <WorldClock />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Stopwatch</h3>
          <ComponentPreview id="realtime-clock-stopwatch">
            <Stopwatch />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Countdown Timer</h3>
          <ComponentPreview id="realtime-clock-countdown">
            <CountdownTimer />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Alarm Clock</h3>
          <ComponentPreview id="realtime-clock-alarm">
            <AlarmClockDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Pomodoro Timer</h3>
          <ComponentPreview id="realtime-clock-pomodoro">
            <PomodoroTimer />
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
                <td className="px-4 py-3 font-mono text-xs">format</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"12h\" | \"24h\""}</td>
                <td className="px-4 py-3 text-muted-foreground">"24h"</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">timezone</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">"local"</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">showSeconds</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
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
