"use client";

import { useState, useEffect, useCallback } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Check,
  Plus,
  Minus,
  Flame,
  Coffee,
  Zap,
  Clock,
  Volume2,
} from "lucide-react";

const installCommand = `npx component-library@latest add egg-timer`;
const usageCode = `import { EggTimer } from "@/components/egg-timer";

<EggTimer
  duration={300}
  onComplete={() => alert("Done!")}
/>`;

type EggType = "soft" | "medium" | "hard" | "custom";

const eggPresets: Record<EggType, { time: number; label: string; color: string; emoji: string }> = {
  soft: { time: 180, label: "Soft Boiled", color: "from-orange-400 to-orange-500", emoji: "🥚" },
  medium: { time: 300, label: "Medium", color: "from-amber-400 to-amber-500", emoji: "🥚" },
  hard: { time: 420, label: "Hard Boiled", color: "from-yellow-500 to-yellow-600", emoji: "🥚" },
  custom: { time: 0, label: "Custom", color: "from-gray-400 to-gray-500", emoji: "⏱️" },
};

function EggTimerDemo() {
  const [selected, setSelected] = useState<EggType>("medium");
  const [timeLeft, setTimeLeft] = useState(eggPresets.medium.time);
  const [running, setRunning] = useState(false);
  const totalTime = eggPresets[selected].time;

  useEffect(() => {
    if (!running || timeLeft <= 0) { setRunning(false); return; }
    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [running, timeLeft]);

  const progress = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex gap-2">
        {(["soft", "medium", "hard"] as EggType[]).map((t) => (
          <button
            key={t}
            onClick={() => { setSelected(t); setTimeLeft(eggPresets[t].time); setRunning(false); }}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
              selected === t
                ? "bg-foreground text-background shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {eggPresets[t].emoji} {eggPresets[t].label}
          </button>
        ))}
      </div>

      <div className="relative h-36 w-36">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted" />
          <circle
            cx="50" cy="50" r="42" fill="none" strokeWidth="6"
            strokeDasharray={`${progress * 2.64} 264`}
            strokeLinecap="round"
            className="transition-all duration-1000"
            style={{ stroke: selected === "soft" ? "#fb923c" : selected === "medium" ? "#f59e0b" : "#ca8a04" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold font-mono tabular-nums">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>
          <span className="text-[10px] text-muted-foreground">{eggPresets[selected].label}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setRunning(!running)}
          className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background shadow-sm hover:bg-foreground/90"
        >
          {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {running ? "Pause" : "Start"}
        </button>
        <button
          onClick={() => { setTimeLeft(eggPresets[selected].time); setRunning(false); }}
          className="inline-flex items-center gap-2 rounded-lg border border-black/[.08] px-4 py-2.5 text-sm font-medium hover:bg-muted dark:border-white/[.145]"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
      </div>
    </div>
  );
}

function PresetCardsDemo() {
  const [selected, setSelected] = useState("medium");
  const presets = [
    { id: "soft", label: "Soft", time: "3 min", desc: "Runny yolk", emoji: "🥚", border: "border-orange-300 dark:border-orange-700" },
    { id: "medium", label: "Medium", time: "5 min", desc: "Jammy yolk", emoji: "🥚", border: "border-amber-400 dark:border-amber-600" },
    { id: "hard", label: "Hard", time: "7 min", desc: "Firm yolk", emoji: "🥚", border: "border-yellow-500 dark:border-yellow-600" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 w-full max-w-md">
      {presets.map((p) => (
        <button
          key={p.id}
          onClick={() => setSelected(p.id)}
          className={`rounded-xl border-2 bg-card p-4 text-center transition-all ${
            selected === p.id ? `${p.border} shadow-md scale-[1.02]` : "border-transparent hover:border-black/[.1] dark:hover:border-white/[.2]"
          }`}
        >
          <span className="text-3xl">{p.emoji}</span>
          <p className="mt-2 text-sm font-bold">{p.label}</p>
          <p className="text-xs font-medium text-muted-foreground">{p.time}</p>
          <p className="text-[10px] text-muted-foreground">{p.desc}</p>
        </button>
      ))}
    </div>
  );
}

function ProgressBarDemo() {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const totalSeconds = 420;

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setProgress((p) => { if (p >= 100) { setRunning(false); return 100; } return p + 100 / totalSeconds; });
    }, 1000);
    return () => clearInterval(interval);
  }, [running]);

  const elapsed = Math.round((progress / 100) * totalSeconds);
  const remaining = totalSeconds - elapsed;

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Hard Boiled Egg</h3>
          <span className="text-xs text-muted-foreground">{Math.floor(remaining / 60)}m {remaining % 60}s left</span>
        </div>
        <div className="mb-2 h-3 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
          <span>{Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, "0")}</span>
          <span>{Math.floor(totalSeconds / 60)}:{String(totalSeconds % 60).padStart(2, "0")}</span>
        </div>
      </div>
      <button
        onClick={() => { setProgress(0); setRunning(true); }}
        disabled={running}
        className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
          running ? "bg-muted text-muted-foreground" : "bg-foreground text-background hover:bg-foreground/90 shadow-sm"
        }`}
      >
        {running ? (
          <><div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" /> Cooking...</>
        ) : (
          <><Play className="h-4 w-4" /> Start Timer</>
        )}
      </button>
    </div>
  );
}

function KitchenTimerDemo() {
  const [timers, setTimers] = useState<{ id: number; label: string; time: number; left: number; running: boolean }[]>([
    { id: 1, label: "Pasta", time: 600, left: 600, running: false },
    { id: 2, label: "Rice", time: 900, left: 900, running: false },
    { id: 3, label: "Tea", time: 180, left: 180, running: false },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((ts) => ts.map((t) => {
        if (!t.running || t.left <= 0) return { ...t, running: false };
        return { ...t, left: t.left - 1 };
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleTimer = (id: number) => {
    setTimers((ts) => ts.map((t) => t.id === id ? { ...t, running: !t.running } : t));
  };

  const resetTimer = (id: number) => {
    setTimers((ts) => ts.map((t) => t.id === id ? { ...t, left: t.time, running: false } : t));
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <h3 className="text-sm font-semibold">Kitchen Timers</h3>
        </div>
        <div className="divide-y divide-black/[.06] dark:divide-white/[.08]">
          {timers.map((t) => {
            const progress = ((t.time - t.left) / t.time) * 100;
            const mins = Math.floor(t.left / 60);
            const secs = t.left % 60;
            return (
              <div key={t.id} className="flex items-center gap-3 px-4 py-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{t.label}</span>
                    <span className="text-xs font-mono tabular-nums">{mins}:{String(secs).padStart(2, "0")}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
                  </div>
                </div>
                <button onClick={() => toggleTimer(t.id)} className="rounded-md p-1.5 hover:bg-muted">
                  {t.running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
                <button onClick={() => resetTimer(t.id)} className="rounded-md p-1.5 hover:bg-muted">
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function WorkoutTimerDemo() {
  const [mode, setMode] = useState<"work" | "rest">("work");
  const [timeLeft, setTimeLeft] = useState(30);
  const [rounds, setRounds] = useState(0);
  const [running, setRunning] = useState(false);
  const workTime = 30;
  const restTime = 10;

  useEffect(() => {
    if (!running || timeLeft <= 0) {
      if (running && timeLeft <= 0) {
        if (mode === "work") {
          setMode("rest");
          setTimeLeft(restTime);
          setRounds((r) => r + 1);
        } else {
          setMode("work");
          setTimeLeft(workTime);
        }
      }
      return;
    }
    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [running, timeLeft, mode]);

  const progress = mode === "work" ? ((workTime - timeLeft) / workTime) * 100 : ((restTime - timeLeft) / restTime) * 100;

  return (
    <div className="w-full max-w-sm">
      <div className={`rounded-xl p-6 text-center transition-all ${
        mode === "work" ? "bg-gradient-to-br from-red-500 to-orange-500 text-white" : "bg-gradient-to-br from-emerald-500 to-teal-500 text-white"
      }`}>
        <div className="mb-2 flex items-center justify-center gap-2">
          {mode === "work" ? <Zap className="h-5 w-5" /> : <Coffee className="h-5 w-5" />}
          <span className="text-sm font-bold uppercase">{mode === "work" ? "Work" : "Rest"}</span>
        </div>
        <div className="text-5xl font-extrabold font-mono tabular-nums">{timeLeft}</div>
        <div className="mt-2 text-xs opacity-80">Round {rounds + 1}</div>
        <div className="mt-3 h-1.5 rounded-full bg-white/30 overflow-hidden">
          <div className="h-full bg-white rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setRunning(!running)}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background shadow-sm hover:bg-foreground/90"
        >
          {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {running ? "Pause" : "Start"}
        </button>
        <button
          onClick={() => { setMode("work"); setTimeLeft(workTime); setRunning(false); setRounds(0); }}
          className="inline-flex items-center gap-2 rounded-lg border border-black/[.08] px-4 py-2.5 text-sm font-medium hover:bg-muted dark:border-white/[.145]"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
      </div>
    </div>
  );
}

function PomodoroTimerDemo() {
  const [phase, setPhase] = useState<"focus" | "short" | "long">("focus");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);

  const phaseConfig = {
    focus: { time: 25 * 60, label: "Focus", color: "from-blue-500 to-indigo-600" },
    short: { time: 5 * 60, label: "Short Break", color: "from-emerald-500 to-teal-500" },
    long: { time: 15 * 60, label: "Long Break", color: "from-purple-500 to-pink-500" },
  };

  useEffect(() => {
    if (!running || timeLeft <= 0) {
      if (running && timeLeft <= 0) {
        if (phase === "focus") {
          const newSessions = sessions + 1;
          setSessions(newSessions);
          setPhase(newSessions % 4 === 0 ? "long" : "short");
          setTimeLeft(newSessions % 4 === 0 ? phaseConfig.long.time : phaseConfig.short.time);
        } else {
          setPhase("focus");
          setTimeLeft(phaseConfig.focus.time);
        }
        setRunning(false);
      }
      return;
    }
    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [running, timeLeft, phase, sessions]);

  const total = phaseConfig[phase].time;
  const progress = ((total - timeLeft) / total) * 100;
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <div className="w-full max-w-sm">
      <div className={`rounded-xl bg-gradient-to-br ${phaseConfig[phase].color} p-6 text-center text-white shadow-lg`}>
        <span className="text-sm font-bold">{phaseConfig[phase].label}</span>
        <div className="my-4 text-5xl font-extrabold font-mono tabular-nums">
          {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
        </div>
        <div className="mb-4 flex justify-center gap-1.5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`h-2 w-2 rounded-full ${i < sessions % 4 ? "bg-white" : "bg-white/30"}`} />
          ))}
        </div>
        <div className="h-1.5 rounded-full bg-white/30 overflow-hidden">
          <div className="h-full bg-white rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setRunning(!running)}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background shadow-sm hover:bg-foreground/90"
        >
          {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {running ? "Pause" : "Start"}
        </button>
        <button
          onClick={() => { setPhase("focus"); setTimeLeft(phaseConfig.focus.time); setRunning(false); }}
          className="inline-flex items-center gap-2 rounded-lg border border-black/[.08] px-4 py-2.5 text-sm font-medium hover:bg-muted dark:border-white/[.145]"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function CookingTimerDemo() {
  const [items, setItems] = useState<{ id: number; name: string; time: number; left: number; running: boolean }[]>([
    { id: 1, name: "Eggs", time: 300, left: 300, running: false },
    { id: 2, name: "Toast", time: 120, left: 120, running: false },
    { id: 3, name: "Bacon", time: 480, left: 480, running: false },
    { id: 4, name: "Coffee", time: 240, left: 240, running: false },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((ts) => ts.map((t) => {
        if (!t.running || t.left <= 0) return { ...t, running: false };
        return { ...t, left: t.left - 1 };
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggle = (id: number) => {
    setItems((ts) => ts.map((t) => t.id === id ? { ...t, running: !t.running } : t));
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
        <h3 className="mb-4 text-sm font-semibold">Breakfast Prep</h3>
        <div className="grid grid-cols-2 gap-3">
          {items.map((t) => {
            const progress = ((t.time - t.left) / t.time) * 100;
            const mins = Math.floor(t.left / 60);
            const secs = t.left % 60;
            const done = t.left <= 0;
            return (
              <div key={t.id} className={`rounded-lg border p-3 transition-all ${
                done ? "border-emerald-300 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-950/20" : "border-black/[.08] dark:border-white/[.145]"
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium">{t.name}</span>
                  {done && <Check className="h-3.5 w-3.5 text-emerald-500" />}
                </div>
                <div className={`text-lg font-bold font-mono tabular-nums ${
                  done ? "text-emerald-600 dark:text-emerald-400" : ""
                }`}>
                  {done ? "Done!" : `${mins}:${String(secs).padStart(2, "0")}`}
                </div>
                <div className="mt-2 h-1 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${
                    done ? "bg-emerald-500" : "bg-primary"
                  }`} style={{ width: `${progress}%` }} />
                </div>
                <button
                  onClick={() => toggle(t.id)}
                  disabled={done}
                  className="mt-2 w-full rounded-md bg-muted px-2 py-1 text-[10px] font-medium hover:bg-muted/80 disabled:opacity-50"
                >
                  {t.running ? "Pause" : "Start"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function EggTimerPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Egg Timer
          </h1>
          <Badge variant="primary">Feedback</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Egg timer with soft/medium/hard presets, circular progress, countdown animation,
          and completion feedback.
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
          <h3 className="text-lg font-medium text-foreground">Interactive Timer</h3>
          <p className="text-sm text-muted-foreground">
            Basic egg timer with presets and circular progress.
          </p>
          <ComponentPreview id="egg-interactive">
            <EggTimerDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Preset Cards</h3>
          <p className="text-sm text-muted-foreground">
            Egg type selection cards with descriptions.
          </p>
          <ComponentPreview id="egg-cards">
            <PresetCardsDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Progress Bar</h3>
          <p className="text-sm text-muted-foreground">
            Linear progress countdown with time display.
          </p>
          <ComponentPreview id="egg-progress">
            <ProgressBarDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Kitchen Timer</h3>
          <p className="text-sm text-muted-foreground">
            Multiple concurrent timers for different dishes.
          </p>
          <ComponentPreview id="egg-kitchen">
            <KitchenTimerDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Workout Timer</h3>
          <p className="text-sm text-muted-foreground">
            HIIT interval timer with work/rest phases.
          </p>
          <ComponentPreview id="egg-workout">
            <WorkoutTimerDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Pomodoro Timer</h3>
          <p className="text-sm text-muted-foreground">
            Focus/break timer with session tracking.
          </p>
          <ComponentPreview id="egg-pomodoro">
            <PomodoroTimerDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Cooking Timer</h3>
          <p className="text-sm text-muted-foreground">
            Multiple breakfast items with individual timers.
          </p>
          <ComponentPreview id="egg-cooking">
            <CookingTimerDemo />
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
                <td className="px-4 py-3 font-mono text-xs">duration</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">300</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onComplete</td>
                <td className="px-4 py-3 text-muted-foreground">{"() => void"}</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
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
