export const EGG_TIMER_SOURCE = `"use client";

import { useEffect, useState } from "react";

type EggType = "soft" | "medium" | "hard";

interface EggTimerProps {
  duration?: number;
  onComplete?: () => void;
  className?: string;
}

const EGG_PRESETS: Record<EggType, { time: number; label: string; color: string }> = {
  soft: { time: 180, label: "Soft Boiled", color: "#fb923c" },
  medium: { time: 300, label: "Medium", color: "#f59e0b" },
  hard: { time: 420, label: "Hard Boiled", color: "#ca8a04" },
};

export function EggTimer({ duration, onComplete, className = "" }: EggTimerProps) {
  const [type, setType] = useState<EggType>("medium");
  const [timeLeft, setTimeLeft] = useState(duration ?? EGG_PRESETS.medium.time);
  const [running, setRunning] = useState(false);

  const totalTime = duration ?? EGG_PRESETS[type].time;
  const preset = EGG_PRESETS[type];

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setRunning(false);
          onComplete?.();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [running, onComplete]);

  const progress = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className={"flex flex-col items-center gap-5 " + className}>
      <div className="flex gap-2">
        {(["soft", "medium", "hard"] as EggType[]).map((t) => (
          <button
            key={t}
            onClick={() => { setType(t); setTimeLeft(EGG_PRESETS[t].time); setRunning(false); }}
            className={
              (type === t
                ? "bg-foreground text-background shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80") + " rounded-full px-4 py-1.5 text-xs font-medium transition-all"
            }
          >
            {EGG_PRESETS[t].label}
          </button>
        ))}
      </div>

      <div className="relative h-36 w-36">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted" />
          <circle
            cx="50" cy="50" r="42" fill="none"
            strokeWidth="6"
            strokeDasharray={progress * 2.64 + " 264"}
            strokeLinecap="round"
            className="transition-all duration-1000"
            style={{ stroke: preset.color }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-3xl font-bold tabular-nums">
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </span>
          <span className="text-[10px] text-muted-foreground">{preset.label}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setRunning(!running)}
          className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background shadow-sm hover:bg-foreground/90"
        >
          {running ? "Pause" : "Start"}
        </button>
        <button
          onClick={() => { setTimeLeft(totalTime); setRunning(false); }}
          className="inline-flex items-center gap-2 rounded-lg border border-black/[.08] px-4 py-2.5 text-sm font-medium hover:bg-muted dark:border-white/[.145]"
        >
          Reset
        </button>
      </div>
    </div>
  );
}`;

export const INTERACTIVE_EXAMPLE = `<EggTimer onComplete={() => alert("Done!")} />`;

export const PRESET_CARDS_EXAMPLE = `const presets = [
  { id: "soft", label: "Soft", time: "3 min", desc: "Runny yolk" },
  { id: "medium", label: "Medium", time: "5 min", desc: "Jammy yolk" },
  { id: "hard", label: "Hard", time: "7 min", desc: "Firm yolk" },
];

{presets.map((p) => (
  <button key={p.id} className="rounded-xl border-2 bg-card p-4 text-center">
    <span>{p.emoji}</span>
    <p>{p.label}</p>
    <p>{p.time}</p>
  </button>
))}`;

export const PROGRESS_EXAMPLE = `<div className="h-3 rounded-full bg-muted overflow-hidden">
  <div
    className="h-full bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full transition-all"
    style={{ width: "75%" }}
  />
</div>`;

export const KITCHEN_EXAMPLE = `<div className="flex items-center justify-between px-4 py-3">
  <div className="flex-1">
    <div className="flex items-center justify-between">
      <span>Pasta</span>
      <span className="font-mono tabular-nums">09:12</span>
    </div>
    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
      <div className="h-full bg-primary rounded-full" style={{ width: "40%" }} />
    </div>
  </div>
  <button>Pause</button>
</div>`;

export const WORKOUT_EXAMPLE = `<div className="rounded-xl bg-gradient-to-br from-red-500 to-orange-500 p-6 text-center text-white">
  <span className="text-sm font-bold uppercase">Work</span>
  <div className="text-5xl font-extrabold font-mono tabular-nums">30</div>
  <div className="mt-3 h-1.5 rounded-full bg-white/30 overflow-hidden">
    <div className="h-full bg-white rounded-full" style={{ width: "40%" }} />
  </div>
</div>`;

export const POMODORO_EXAMPLE = `<div className="rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-6 text-center text-white">
  <span className="text-sm font-bold">Focus</span>
  <div className="my-4 text-5xl font-extrabold font-mono tabular-nums">24:58</div>
  <div className="h-1.5 rounded-full bg-white/30 overflow-hidden">
    <div className="h-full bg-white rounded-full" style={{ width: "40%" }} />
  </div>
</div>`;

export const COOKING_EXAMPLE = `<div className="rounded-lg border p-3">
  <div className="flex items-center justify-between">
    <span className="text-xs font-medium">Eggs</span>
    {done && <Check className="h-3.5 w-3.5 text-emerald-500" />}
  </div>
  <div className="text-lg font-bold font-mono tabular-nums">04:42</div>
  <div className="mt-2 h-1 rounded-full bg-muted overflow-hidden">
    <div className="h-full bg-primary rounded-full" style={{ width: "40%" }} />
  </div>
  <button className="mt-2 w-full rounded-md bg-muted px-2 py-1 text-[10px]">Start</button>
</div>`;
