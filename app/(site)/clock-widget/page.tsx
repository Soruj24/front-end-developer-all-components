"use client";

import { useState, useEffect, useCallback } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Clock,
  Timer,
  AlarmClock,
  Hourglass,
  Play,
  Pause,
  RotateCcw,
  Flag,
  Plus,
  Trash2,
  Bell,
  BellOff,
  Coffee,
  Brain,
  Zap,
} from "lucide-react";

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
    <div className="flex items-center gap-6">
      <div className="relative h-44 w-44 rounded-full border-4 border-foreground bg-card shadow-lg">
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const x = 88 + 70 * Math.cos(angle);
          const y = 88 + 70 * Math.sin(angle);
          return (
            <span
              key={i}
              className="absolute text-[11px] font-semibold text-foreground"
              style={{ left: x, top: y, transform: "translate(-50%, -50%)" }}
            >
              {i === 0 ? 12 : i}
            </span>
          );
        })}
        <div
          className="absolute left-1/2 bottom-1/2 h-1 w-1 origin-bottom rounded-full bg-foreground"
          style={{ transform: `translateX(-50%) rotate(${hours * 30 + minutes * 0.5}deg)`, height: 36 }}
        />
        <div
          className="absolute left-1/2 bottom-1/2 h-0.5 w-0.5 origin-bottom rounded-full bg-muted-foreground"
          style={{ transform: `translateX(-50%) rotate(${minutes * 6}deg)`, height: 52 }}
        />
        <div
          className="absolute left-1/2 bottom-1/2 w-px origin-bottom rounded-full bg-red-500"
          style={{ transform: `translateX(-50%) rotate(${seconds * 6}deg)`, height: 56 }}
        />
        <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="rounded-xl border border-black/[.08] bg-card px-4 py-3 shadow-sm dark:border-white/[.145]">
          <span className="text-[10px] font-medium text-muted-foreground">Local Time</span>
          <p className="font-mono text-2xl font-bold tabular-nums">
            {String(time.getHours()).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </p>
        </div>
        <div className="rounded-xl border border-black/[.08] bg-card px-4 py-2 shadow-sm dark:border-white/[.145]">
          <span className="text-[10px] font-medium text-muted-foreground">Date</span>
          <p className="text-xs font-medium">
            {time.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
          </p>
        </div>
      </div>
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
    <div className="flex flex-col items-center gap-4">
      <div className="rounded-xl border border-black/[.08] bg-card px-8 py-6 shadow-sm dark:border-white/[.145]">
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-bold font-mono tabular-nums">{String(hours).padStart(2, "0")}</span>
          <span className="text-5xl font-bold text-muted-foreground animate-pulse">:</span>
          <span className="text-5xl font-bold font-mono tabular-nums">{String(time.getMinutes()).padStart(2, "0")}</span>
          <span className="text-5xl font-bold text-muted-foreground animate-pulse">:</span>
          <span className="text-5xl font-bold font-mono tabular-nums">{String(time.getSeconds()).padStart(2, "0")}</span>
          {format === "12h" && (
            <span className="ml-2 text-lg font-semibold text-muted-foreground">{period}</span>
          )}
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          {time.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setFormat((f) => (f === "12h" ? "24h" : "12h"))}
          className="rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted/80 transition-colors"
        >
          Switch to {format === "12h" ? "24h" : "12h"}
        </button>
      </div>
    </div>
  );
}

function StopwatchDemo() {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);

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

  const addLap = () => {
    const lastLap = laps.length > 0 ? laps[0] : 0;
    setLaps([elapsed - lastLap, ...laps]);
  };

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
        <div className="text-center">
          <span className="text-[10px] font-medium text-muted-foreground">Elapsed Time</span>
          <p className="mt-1 font-mono text-4xl font-bold tabular-nums">{format(elapsed)}</p>
        </div>
        <div className="mt-4 flex justify-center gap-2">
          <button
            onClick={() => setRunning(!running)}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-medium transition-colors ${
              running
                ? "bg-yellow-500 text-white hover:bg-yellow-600"
                : "bg-foreground text-background hover:bg-foreground/90"
            }`}
          >
            {running ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            {running ? "Pause" : "Start"}
          </button>
          {running && (
            <button onClick={addLap} className="flex items-center gap-1.5 rounded-lg bg-muted px-4 py-2 text-xs font-medium hover:bg-muted/80 transition-colors">
              <Flag className="h-3.5 w-3.5" />
              Lap
            </button>
          )}
          {!running && elapsed > 0 && (
            <button
              onClick={() => { setRunning(false); setElapsed(0); setLaps([]); }}
              className="flex items-center gap-1.5 rounded-lg bg-muted px-4 py-2 text-xs font-medium hover:bg-muted/80 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          )}
        </div>
        {laps.length > 0 && (
          <div className="mt-4 space-y-1 max-h-32 overflow-y-auto">
            {laps.map((lap, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-1.5 text-xs">
                <span className="text-muted-foreground">Lap {laps.length - i}</span>
                <span className="font-mono font-medium tabular-nums">{format(lap)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function WorldClockDemo() {
  const zones = [
    { label: "New York", offset: -5, flag: "US", color: "bg-blue-500" },
    { label: "London", offset: 0, flag: "UK", color: "bg-red-500" },
    { label: "Tokyo", offset: 9, flag: "JP", color: "bg-pink-500" },
    { label: "Sydney", offset: 11, flag: "AU", color: "bg-emerald-500" },
    { label: "Dubai", offset: 4, flag: "AE", color: "bg-green-500" },
  ];

  const [times, setTimes] = useState(() =>
    zones.map((z) => {
      const d = new Date();
      d.setHours(d.getHours() + z.offset - d.getTimezoneOffset() / 60);
      return d;
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimes(
        zones.map((z) => {
          const d = new Date();
          d.setHours(d.getHours() + z.offset - d.getTimezoneOffset() / 60);
          return d;
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-5 gap-3">
      {zones.map((z, i) => (
        <div key={z.label} className="rounded-xl border border-black/[.08] bg-card p-3 shadow-sm text-center dark:border-white/[.145]">
          <div className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full ${z.color}`}>
            <span className="text-[10px] font-bold text-white">{z.flag}</span>
          </div>
          <p className="mt-2 text-[10px] font-medium text-muted-foreground">{z.label}</p>
          <p className="font-mono text-lg font-bold tabular-nums">
            {String(times[i].getHours()).padStart(2, "0")}:{String(times[i].getMinutes()).padStart(2, "0")}
          </p>
          <p className="text-[10px] text-muted-foreground/60">
            {times[i].getHours() >= 12 ? "PM" : "AM"}
          </p>
        </div>
      ))}
    </div>
  );
}

function CountdownDemo() {
  const [target] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const [remaining, setRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      };
    };
    setRemaining(calc());
    const interval = setInterval(() => setRemaining(calc()), 1000);
    return () => clearInterval(interval);
  }, [target]);

  const units = [
    { label: "Days", value: remaining.days },
    { label: "Hours", value: remaining.hours },
    { label: "Minutes", value: remaining.minutes },
    { label: "Seconds", value: remaining.seconds },
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="rounded-xl border border-black/[.08] bg-card px-6 py-4 shadow-sm dark:border-white/[.145]">
        <p className="text-center text-xs font-medium text-muted-foreground">Countdown to Launch</p>
        <div className="mt-3 flex items-center gap-3">
          {units.map((u, i) => (
            <div key={u.label} className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <span className="font-mono text-3xl font-bold tabular-nums">{String(u.value).padStart(2, "0")}</span>
                <span className="text-[10px] font-medium text-muted-foreground">{u.label}</span>
              </div>
              {i < units.length - 1 && <span className="text-2xl font-bold text-muted-foreground/30">:</span>}
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Target: {target.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
      </p>
    </div>
  );
}

function PomodoroDemo() {
  const [mode, setMode] = useState<"work" | "break">("work");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);

  const durations = { work: 25 * 60, break: 5 * 60 };

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          if (mode === "work") {
            setSessions((s) => s + 1);
            setMode("break");
            return durations.break;
          } else {
            setMode("work");
            return durations.work;
          }
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [running, mode]);

  const format = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const progress = ((durations[mode] - timeLeft) / durations[mode]) * 100;

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
        <div className="flex items-center justify-center gap-2 mb-4">
          <button
            onClick={() => { setMode("work"); setTimeLeft(durations.work); setRunning(false); }}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              mode === "work" ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <Brain className="h-3.5 w-3.5" />
            Focus
          </button>
          <button
            onClick={() => { setMode("break"); setTimeLeft(durations.break); setRunning(false); }}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              mode === "break" ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <Coffee className="h-3.5 w-3.5" />
            Break
          </button>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative">
            <svg className="h-32 w-32 -rotate-90">
              <circle cx="64" cy="64" r="56" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted" />
              <circle
                cx="64" cy="64" r="56" fill="none"
                stroke="currentColor" strokeWidth="6"
                strokeDasharray={351.86}
                strokeDashoffset={351.86 - (351.86 * progress) / 100}
                className={`transition-all duration-1000 ${mode === "work" ? "text-red-500" : "text-emerald-500"}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-mono text-3xl font-bold tabular-nums">{format(timeLeft)}</span>
              <span className="text-[10px] font-medium text-muted-foreground">{mode === "work" ? "Focus Time" : "Break Time"}</span>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setRunning(!running)}
              className={`flex items-center gap-1.5 rounded-lg px-5 py-2 text-xs font-medium transition-colors ${
                running ? "bg-yellow-500 text-white" : "bg-foreground text-background"
              }`}
            >
              {running ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              {running ? "Pause" : "Start"}
            </button>
            <button
              onClick={() => { setRunning(false); setTimeLeft(durations[mode]); }}
              className="flex items-center gap-1.5 rounded-lg bg-muted px-4 py-2 text-xs font-medium hover:bg-muted/80 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center gap-1.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={`h-2 w-2 rounded-full ${
              i < sessions ? "bg-foreground" : "bg-muted"
            }`} />
          ))}
          <span className="ml-2 text-[10px] text-muted-foreground">{sessions}/4 sessions</span>
        </div>
      </div>
    </div>
  );
}

function AlarmClockDemo() {
  const [alarms, setAlarms] = useState([
    { id: 1, time: "07:00", label: "Wake up", enabled: true },
    { id: 2, time: "08:30", label: "Morning standup", enabled: true },
    { id: 3, time: "12:00", label: "Lunch break", enabled: false },
  ]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleAlarm = (id: number) => {
    setAlarms((a) => a.map((al) => (al.id === id ? { ...al, enabled: !al.enabled } : al)));
  };

  const deleteAlarm = (id: number) => {
    setAlarms((a) => a.filter((al) => al.id !== id));
  };

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlarmClock className="h-4 w-4" />
              <span className="text-sm font-semibold">Alarms</span>
            </div>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              {alarms.filter((a) => a.enabled).length} active
            </span>
          </div>
          <p className="mt-1 font-mono text-2xl font-bold tabular-nums">
            {String(currentTime.getHours()).padStart(2, "0")}:{String(currentTime.getMinutes()).padStart(2, "0")}
          </p>
        </div>
        <div className="divide-y divide-black/[.06] dark:divide-white/[.08]">
          {alarms.map((alarm) => (
            <div key={alarm.id} className="flex items-center gap-3 px-4 py-3">
              <div className="flex-1">
                <p className={`font-mono text-lg font-bold tabular-nums ${
                  alarm.enabled ? "text-foreground" : "text-muted-foreground/50"
                }`}>{alarm.time}</p>
                <p className="text-[10px] text-muted-foreground">{alarm.label}</p>
              </div>
              <button
                onClick={() => deleteAlarm(alarm.id)}
                className="text-muted-foreground/40 hover:text-red-500 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => toggleAlarm(alarm.id)}
                className={`flex h-6 w-11 items-center rounded-full p-0.5 transition-colors ${
                  alarm.enabled ? "bg-foreground" : "bg-muted"
                }`}
              >
                <div className={`h-5 w-5 rounded-full bg-background shadow-sm transition-transform ${
                  alarm.enabled ? "translate-x-5" : ""
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ClockWidgetPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Clock Widget
          </h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Real-time clock widgets including analog, digital, stopwatch, and world clock variants
          with auto-updating displays.
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
          <h3 className="text-lg font-medium text-foreground">Analog Clock</h3>
          <p className="text-sm text-muted-foreground">
            Classic analog clock with moving hands and digital time display.
          </p>
          <ComponentPreview id="clock-analog">
            <AnalogClockDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Digital Clock</h3>
          <p className="text-sm text-muted-foreground">
            Large digital display with 12h/24h format toggle and date.
          </p>
          <ComponentPreview id="clock-digital">
            <DigitalClockDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Stopwatch</h3>
          <p className="text-sm text-muted-foreground">
            Precision stopwatch with lap tracking and pause/reset controls.
          </p>
          <ComponentPreview id="clock-stopwatch">
            <StopwatchDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">World Clock</h3>
          <p className="text-sm text-muted-foreground">
            Multiple time zones with color-coded city indicators.
          </p>
          <ComponentPreview id="clock-world">
            <WorldClockDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Countdown Timer</h3>
          <p className="text-sm text-muted-foreground">
            Countdown to a target date with days, hours, minutes, seconds.
          </p>
          <ComponentPreview id="clock-countdown">
            <CountdownDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Pomodoro Timer</h3>
          <p className="text-sm text-muted-foreground">
            Focus/break timer with circular progress and session tracking.
          </p>
          <ComponentPreview id="clock-pomodoro">
            <PomodoroDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Alarm Clock</h3>
          <p className="text-sm text-muted-foreground">
            Alarm list with enable/disable toggles and current time.
          </p>
          <ComponentPreview id="clock-alarm">
            <AlarmClockDemo />
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
                <td className="px-4 py-3 font-mono text-xs">format</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"12h\" | \"24h\""}</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"12h\""}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">showSeconds</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">variant</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"analog\" | \"digital\" | \"stopwatch\" | \"alarm\""}</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"digital\""}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">timezone</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">"local"</td>
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
