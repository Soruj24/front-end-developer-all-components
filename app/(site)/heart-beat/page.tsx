"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Heart, Activity, Zap, Moon, Flame, TrendingUp, Timer } from "lucide-react";

const installCommand = `npx component-library@latest add heart-beat`;
const usageCode = `import { HeartBeat } from "@/components/heart-beat";

<HeartBeat />`;

function HeartbeatRenderer({ bpm = 72, color = "#ef4444", size = 100 }: { bpm?: number; color?: string; size?: number }) {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = 60000 / bpm;
    const timer = setInterval(() => setPulse((p) => (p >= 1 ? 0 : p + 0.1)), interval / 10);
    return () => clearInterval(timer);
  }, [bpm]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <circle cx="50" cy="50" r="45" fill="none" stroke={color} strokeWidth="2" opacity="0.2" />
        <circle cx="50" cy="50" r={45 + pulse * 5} fill="none" stroke={color} strokeWidth="2" opacity={0.1 + pulse * 0.3} />
        <path
          d="M50 25 C50 25, 35 40, 35 50 C35 60, 50 75, 50 75 C50 75, 65 60, 65 50 C65 40, 50 25, 50 25"
          fill={color}
          opacity={0.6 + pulse * 0.4}
          transform={`scale(${0.95 + pulse * 0.05})`}
          style={{ transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
}

function HeartRateMonitorDemo() {
  const [bpm, setBpm] = useState(72);
  const [history, setHistory] = useState<number[]>([72, 74, 71, 73, 75]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBpm((prev) => {
        const newBpm = prev + Math.floor(Math.random() * 5) - 2;
        return Math.max(60, Math.min(100, newBpm));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setHistory((prev) => [...prev.slice(-9), bpm]);
  }, [bpm]);

  const getStatus = (b: number) => {
    if (b < 60) return { label: "Low", color: "text-blue-500" };
    if (b <= 80) return { label: "Normal", color: "text-emerald-500" };
    if (b <= 100) return { label: "Elevated", color: "text-yellow-500" };
    return { label: "High", color: "text-red-500" };
  };

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Heart Rate Monitor</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-4 mb-4">
            <HeartbeatRenderer bpm={bpm} size={60} />
            <div>
              <p className="text-3xl font-extrabold">{bpm}</p>
              <p className="text-xs text-muted-foreground">BPM</p>
              <p className={`text-[10px] font-medium ${getStatus(bpm).color}`}>{getStatus(bpm).label}</p>
            </div>
          </div>
          <div className="flex items-end gap-1 h-12 mb-3">
            {history.map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-red-500 rounded-t transition-all"
                style={{ height: `${((h - 50) / 60) * 100}%`, opacity: 0.4 + (i / history.length) * 0.6 }}
              />
            ))}
          </div>
          <div className="flex justify-between text-[9px] text-muted-foreground">
            <span>10s ago</span>
            <span>Now</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkoutTrackerDemo() {
  const [elapsed, setElapsed] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(interval);
  }, [active]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Workout Session</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="text-center mb-4">
            <p className="text-4xl font-extrabold font-mono">{formatTime(elapsed)}</p>
            <p className="text-xs text-muted-foreground mt-1">{active ? "In Progress" : "Paused"}</p>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="rounded-lg bg-red-50 dark:bg-red-950/20 p-3 text-center">
              <Heart className="h-4 w-4 text-red-500 mx-auto mb-1" />
              <p className="text-lg font-extrabold">142</p>
              <p className="text-[9px] text-muted-foreground">BPM</p>
            </div>
            <div className="rounded-lg bg-orange-50 dark:bg-orange-950/20 p-3 text-center">
              <Flame className="h-4 w-4 text-orange-500 mx-auto mb-1" />
              <p className="text-lg font-extrabold">320</p>
              <p className="text-[9px] text-muted-foreground">Cal</p>
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 p-3 text-center">
              <Zap className="h-4 w-4 text-blue-500 mx-auto mb-1" />
              <p className="text-lg font-extrabold">85</p>
              <p className="text-[9px] text-muted-foreground">Avg BPM</p>
            </div>
          </div>
          <button
            onClick={() => setActive(!active)}
            className={`w-full rounded-lg px-4 py-2 text-xs font-medium ${
              active ? "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-950/30 dark:text-red-400" : "bg-foreground text-background hover:bg-foreground/90"
            }`}
          >
            {active ? "Stop Workout" : "Start Workout"}
          </button>
        </div>
      </div>
    </div>
  );
}

function HealthDashboardDemo() {
  const vitals = [
    { label: "Heart Rate", value: "72", unit: "bpm", icon: Heart, color: "text-red-500" },
    { label: "Blood Pressure", value: "120/80", unit: "mmHg", icon: Activity, color: "text-blue-500" },
    { label: "SpO2", value: "98", unit: "%", icon: Zap, color: "text-emerald-500" },
    { label: "Temperature", value: "98.6", unit: "°F", icon: Flame, color: "text-orange-500" },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Health Dashboard</h3>
            <span className="ml-auto text-[10px] text-emerald-600 dark:text-emerald-400">All Normal</span>
          </div>
        </div>
        <div className="p-4 grid grid-cols-2 gap-3">
          {vitals.map((v) => (
            <div key={v.label} className="rounded-lg bg-muted/30 p-3">
              <div className="flex items-center gap-2 mb-2">
                <v.icon className={`h-4 w-4 ${v.color}`} />
                <span className="text-[10px] text-muted-foreground">{v.label}</span>
              </div>
              <p className="text-xl font-extrabold">{v.value}</p>
              <p className="text-[9px] text-muted-foreground">{v.unit}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EcgVisualizationDemo() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setOffset((o) => (o >= 200 ? 0 : o + 2)), 20);
    return () => clearInterval(interval);
  }, []);

  const generatePath = () => {
    const points: string[] = [];
    for (let x = 0; x < 200; x += 2) {
      const y = 50 + Math.sin((x + offset) * 0.05) * 5 + (x % 20 === 0 ? -20 : 0);
      points.push(`${x} ${y}`);
    }
    return `M ${points.join(" L ")}`;
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">ECG Monitor</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="relative h-24 bg-black rounded-lg overflow-hidden">
            <svg viewBox="0 0 200 100" className="h-full w-full">
              <path d={generatePath()} fill="none" stroke="#22c55e" strokeWidth="1.5" />
            </svg>
          </div>
          <div className="flex justify-between mt-3 text-[9px] text-muted-foreground">
            <span>Lead II</span>
            <span>25mm/s</span>
            <span>10mm/mV</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PatientStatusDemo() {
  const patients = [
    { name: "John Smith", room: "101", bpm: 68, status: "stable" },
    { name: "Sarah Jones", room: "102", bpm: 92, status: "monitoring" },
    { name: "Mike Davis", room: "103", bpm: 110, status: "critical" },
  ];
  const statusColors = {
    stable: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400",
    monitoring: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400",
    critical: "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400",
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Patient Monitor</h3>
          </div>
        </div>
        <div className="p-4 space-y-2">
          {patients.map((p) => (
            <div key={p.name} className="flex items-center gap-3 rounded-lg border border-black/[.08] p-3 dark:border-white/[.145]">
              <HeartbeatRenderer bpm={p.bpm} size={40} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-bold">{p.name}</p>
                  <span className="text-[9px] text-muted-foreground">Room {p.room}</span>
                </div>
                <p className="text-[10px] text-muted-foreground">{p.bpm} BPM</p>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[9px] font-medium capitalize ${statusColors[p.status as keyof typeof statusColors]}`}>
                {p.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SleepTrackerDemo() {
  const [selected, setSelected] = useState("lastNight");
  const nights = {
    lastNight: { deep: 2, light: 4, rem: 1.5, total: 7.5 },
    tuesday: { deep: 1.5, light: 5, rem: 1, total: 7.5 },
    monday: { deep: 2.5, light: 3.5, rem: 2, total: 8 },
  };

  const data = nights[selected as keyof typeof nights];

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Moon className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Sleep Tracker</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="flex gap-2 mb-4">
            {Object.keys(nights).map((n) => (
              <button
                key={n}
                onClick={() => setSelected(n)}
                className={`flex-1 rounded-lg px-3 py-2 text-[10px] font-medium capitalize transition-colors ${
                  selected === n ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="text-center mb-4">
            <p className="text-3xl font-extrabold">{data.total}h</p>
            <p className="text-xs text-muted-foreground">Total Sleep</p>
          </div>
          <div className="flex gap-1 h-6 rounded-full overflow-hidden mb-4">
            <div className="bg-indigo-500 rounded-l-full" style={{ width: `${(data.deep / data.total) * 100}%` }} />
            <div className="bg-blue-400" style={{ width: `${(data.light / data.total) * 100}%` }} />
            <div className="bg-purple-400 rounded-r-full" style={{ width: `${(data.rem / data.total) * 100}%` }} />
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-sm font-bold">{data.deep}h</p>
              <p className="text-[9px] text-indigo-500">Deep</p>
            </div>
            <div>
              <p className="text-sm font-bold">{data.light}h</p>
              <p className="text-[9px] text-blue-400">Light</p>
            </div>
            <div>
              <p className="text-sm font-bold">{data.rem}h</p>
              <p className="text-[9px] text-purple-400">REM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CalorieBurnDemo() {
  const [calories, setCalories] = useState(0);
  const goal = 500;
  const activities = [
    { name: "Running", cal: 120, icon: "🏃" },
    { name: "Cycling", cal: 85, icon: "🚴" },
    { name: "Swimming", cal: 100, icon: "🏊" },
  ];

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Calorie Burn</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative h-16 w-16">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="text-orange-500" strokeDasharray={`${(calories / goal) * 251} 251`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Flame className="h-6 w-6 text-orange-500" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-extrabold">{calories}</p>
              <p className="text-xs text-muted-foreground">/ {goal} cal goal</p>
              <p className="text-[10px] text-muted-foreground">{Math.round((calories / goal) * 100)}% complete</p>
            </div>
          </div>
          <div className="space-y-2">
            {activities.map((a) => (
              <button
                key={a.name}
                onClick={() => setCalories((c) => Math.min(goal, c + a.cal))}
                className="flex w-full items-center gap-3 rounded-lg bg-muted/30 px-3 py-2 hover:bg-muted/50 transition-colors"
              >
                <span className="text-xl">{a.icon}</span>
                <div className="flex-1">
                  <p className="text-xs font-medium">{a.name}</p>
                </div>
                <span className="text-xs font-bold text-orange-500">+{a.cal} cal</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeartBeatPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Heart Beat
          </h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          An animated heartbeat component with pulsing effects for health and wellness displays.
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
          <h3 className="text-lg font-medium text-foreground">Heart Rate Monitor</h3>
          <p className="text-sm text-muted-foreground">
            Live BPM display with history graph.
          </p>
          <ComponentPreview id="heartbeat-monitor">
            <HeartRateMonitorDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Workout Tracker</h3>
          <p className="text-sm text-muted-foreground">
            Fitness session with stats.
          </p>
          <ComponentPreview id="heartbeat-workout">
            <WorkoutTrackerDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Health Dashboard</h3>
          <p className="text-sm text-muted-foreground">
            Vital signs overview grid.
          </p>
          <ComponentPreview id="heartbeat-health">
            <HealthDashboardDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">ECG Visualization</h3>
          <p className="text-sm text-muted-foreground">
            Heart rhythm waveform display.
          </p>
          <ComponentPreview id="heartbeat-ecg">
            <EcgVisualizationDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Patient Status</h3>
          <p className="text-sm text-muted-foreground">
            Hospital patient monitoring list.
          </p>
          <ComponentPreview id="heartbeat-patient">
            <PatientStatusDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Sleep Tracker</h3>
          <p className="text-sm text-muted-foreground">
            Sleep quality breakdown.
          </p>
          <ComponentPreview id="heartbeat-sleep">
            <SleepTrackerDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Calorie Burn</h3>
          <p className="text-sm text-muted-foreground">
            Exercise calorie tracker.
          </p>
          <ComponentPreview id="heartbeat-calorie">
            <CalorieBurnDemo />
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
                <td className="px-4 py-3 font-mono text-xs">bpm</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">72</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">color</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">"#ef4444"</td>
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
