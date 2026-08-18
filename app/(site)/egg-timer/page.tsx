"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Timer, Play, Pause, RotateCcw, Check } from "lucide-react";

const installCommand = `npx component-library@latest add egg-timer`;
const usageCode = `import { EggTimer } from "@/components/egg-timer";

<EggTimer
  duration={300}
  onComplete={() => alert("Done!")}
/>`;

type EggType = "soft" | "medium" | "hard" | "custom";

const eggPresets: Record<EggType, { time: number; label: string; color: string }> = {
  soft: { time: 180, label: "Soft Boiled", color: "bg-orange-400" },
  medium: { time: 300, label: "Medium", color: "bg-amber-500" },
  hard: { time: 420, label: "Hard Boiled", color: "bg-yellow-600" },
  custom: { time: 0, label: "Custom", color: "bg-gray-400" },
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
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        {(["soft", "medium", "hard"] as EggType[]).map((t) => (
          <button key={t} onClick={() => { setSelected(t); setTimeLeft(eggPresets[t].time); setRunning(false); }} className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${selected === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
            {eggPresets[t].label}
          </button>
        ))}
      </div>
      <div className="relative h-32 w-32">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted" />
          <circle cx="50" cy="50" r="42" fill="none" strokeWidth="6" strokeDasharray={`${progress * 2.64} 264`} strokeLinecap="round" className="transition-all duration-1000" style={{ stroke: selected === "soft" ? "#fb923c" : selected === "medium" ? "#f59e0b" : "#ca8a04" }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold font-mono">{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}</span>
          <span className="text-[10px] text-muted-foreground">{eggPresets[selected].label}</span>
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={() => setRunning(!running)} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
        <button onClick={() => { setTimeLeft(eggPresets[selected].time); setRunning(false); }} className="rounded-lg bg-muted px-4 py-2 text-sm font-medium hover:bg-muted/80">
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function PresetCardsDemo() {
  const presets = [
    { label: "Soft", time: "3 min", desc: "Runny yolk", color: "border-orange-300" },
    { label: "Medium", time: "5 min", desc: "Jammy yolk", color: "border-amber-400" },
    { label: "Hard", time: "7 min", desc: "Firm yolk", color: "border-yellow-500" },
  ];
  return (
    <div className="grid grid-cols-3 gap-3">
      {presets.map((p) => (
        <div key={p.label} className={`rounded-xl border-2 bg-card p-4 text-center ${p.color}`}>
          <span className="text-2xl">🥚</span>
          <p className="mt-2 text-sm font-semibold">{p.label}</p>
          <p className="text-xs text-muted-foreground">{p.time}</p>
          <p className="text-[10px] text-muted-foreground">{p.desc}</p>
        </div>
      ))}
    </div>
  );
}

function CountdownBarDemo() {
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setProgress((p) => { if (p >= 100) { setRunning(false); return 100; } return p + 1; });
    }, 50);
    return () => clearInterval(interval);
  }, [running]);

  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      <div className="h-4 rounded-full bg-muted overflow-hidden">
        <div className="h-full bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
      </div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{Math.round(progress * 4.2)}s / 420s</span>
        <span>{progress >= 100 ? "Done!" : `${100 - Math.round(progress)}% remaining`}</span>
      </div>
      <button onClick={() => { setProgress(0); setRunning(true); }} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        Start Timer
      </button>
    </div>
  );
}

export default function EggTimerPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Egg Timer</h1>
          <Badge variant="primary">Feedback</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Egg timer with soft/medium/hard presets, circular progress, countdown animation, and completion feedback.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Interactive Timer</h2>
        <ComponentPreview>
          <EggTimerDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Preset Cards</h2>
        <ComponentPreview>
          <PresetCardsDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Progress Bar</h2>
        <ComponentPreview>
          <CountdownBarDemo />
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
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">duration</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">300</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">onComplete</td><td className="px-4 py-3 text-muted-foreground">() =&gt; void</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
