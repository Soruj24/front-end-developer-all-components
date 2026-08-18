"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Music, Play, Pause, SkipForward, SkipBack, Volume2, Mic, Users, Zap } from "lucide-react";

const installCommand = `npx component-library@latest add hip-hop-move`;
const usageCode = `import { HipHopMove } from "@/components/hip-hop-move";

<HipHopMove variant="bounce" />`;

function DanceMoveRenderer({ move = "bounce", size = 80 }: { move?: string; size?: number }) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setFrame((f) => (f >= 3 ? 0 : f + 1)), 200);
    return () => clearInterval(interval);
  }, []);

  const moves: Record<string, number[]> = {
    bounce: [0, -8, 0, -4],
    wave: [0, -5, 0, 5],
    pop: [0, 0, -10, 0],
    lock: [0, 0, 0, -8],
  };

  const offsets = moves[move] || moves.bounce;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <circle cx="50" cy="20" r="10" fill="currentColor" className="text-foreground" />
        <line x1="50" y1="30" x2="50" y2="55" stroke="currentColor" strokeWidth="3" className="text-foreground" />
        <line x1="50" y1="35" x2={30 + offsets[frame] * 0.5} y2={45 + offsets[frame]} stroke="currentColor" strokeWidth="2" className="text-foreground" />
        <line x1="50" y1="35" x2={70 - offsets[frame] * 0.5} y2={45 + offsets[frame]} stroke="currentColor" strokeWidth="2" className="text-foreground" />
        <line x1="50" y1="55" x2={35 + offsets[frame] * 0.3} y2={80 + Math.abs(offsets[frame]) * 0.5} stroke="currentColor" strokeWidth="2" className="text-foreground" />
        <line x1="50" y1="55" x2={65 - offsets[frame] * 0.3} y2={80 + Math.abs(offsets[frame]) * 0.5} stroke="currentColor" strokeWidth="2" className="text-foreground" />
      </svg>
    </div>
  );
}

function DanceMoveSelectorDemo() {
  const [selected, setSelected] = useState("bounce");
  const moves = [
    { id: "bounce", name: "Bounce", desc: "Classic hip hop bounce" },
    { id: "wave", name: "Wave", desc: "Body wave motion" },
    { id: "pop", name: "Pop", desc: "Pop and lock hit" },
    { id: "lock", name: "Lock", desc: "Freeze and hold" },
  ];

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Music className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Dance Moves</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-center mb-4">
            <DanceMoveRenderer move={selected} size={100} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {moves.map((m) => (
              <button key={m.id} onClick={() => setSelected(m.id)} className={`rounded-lg border p-3 text-left transition-all ${selected === m.id ? "border-primary bg-primary/5" : "border-black/[.08] dark:border-white/[.145]"}`}>
                <p className="text-xs font-bold">{m.name}</p>
                <p className="text-[9px] text-muted-foreground">{m.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MusicVisualizerDemo() {
  const [bars, setBars] = useState<number[]>(Array(16).fill(5));

  useEffect(() => {
    const interval = setInterval(() => {
      setBars((prev) => prev.map(() => Math.floor(Math.random() * 20) + 2));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm p-4 dark:border-white/[.145]">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Beat Visualizer</h3>
        </div>
        <div className="flex items-end justify-center gap-1 h-20">
          {bars.map((h, i) => (
            <div key={i} className="w-3 rounded-t transition-all duration-150" style={{ height: `${h * 4}px`, backgroundColor: `hsl(${280 + i * 5}, 70%, 50%)`, opacity: 0.6 + (h / 22) * 0.4 }} />
          ))}
        </div>
        <div className="flex justify-between mt-3 text-[8px] text-muted-foreground">
          <span>808</span><span>Snare</span><span>Hi-Hat</span><span>Kick</span>
        </div>
      </div>
    </div>
  );
}

function DanceBattleDemo() {
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [round, setRound] = useState(1);

  const judge = () => {
    const p1 = Math.floor(Math.random() * 50) + 50;
    const p2 = Math.floor(Math.random() * 50) + 50;
    setScore((prev) => ({
      player1: prev.player1 + (p1 > p2 ? 1 : 0),
      player2: prev.player2 + (p2 > p1 ? 1 : 0),
    }));
    setRound((r) => r + 1);
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Dance Battle</h3>
            <span className="ml-auto text-[10px] text-muted-foreground">Round {round}</span>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="text-center">
              <DanceMoveRenderer move="bounce" size={60} />
              <p className="text-xs font-bold mt-1">Player 1</p>
              <p className="text-lg font-extrabold">{score.player1}</p>
            </div>
            <div className="text-2xl font-extrabold text-muted-foreground">VS</div>
            <div className="text-center">
              <DanceMoveRenderer move="wave" size={60} />
              <p className="text-xs font-bold mt-1">Player 2</p>
              <p className="text-lg font-extrabold">{score.player2}</p>
            </div>
          </div>
          <button onClick={judge} className="w-full rounded-lg bg-foreground px-4 py-2 text-xs font-medium text-background hover:bg-foreground/90">
            Judge Round
          </button>
        </div>
      </div>
    </div>
  );
}

function StepSequencerDemo() {
  const [steps, setSteps] = useState(Array(16).fill(false));
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => setCurrent((c) => (c >= 15 ? 0 : c + 1)), 200);
    return () => clearInterval(interval);
  }, [playing]);

  const toggle = (i: number) => {
    setSteps((prev) => prev.map((s, idx) => (idx === i ? !s : s)));
  };

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm p-4 dark:border-white/[.145]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Music className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Step Sequencer</h3>
          </div>
          <div className="flex gap-1">
            <button onClick={() => setPlaying(!playing)} className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background">
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-8 gap-1 mb-3">
          {steps.map((active, i) => (
            <button key={i} onClick={() => toggle(i)} className={`aspect-square rounded-md transition-colors ${active ? "bg-primary" : "bg-muted"} ${current === i && playing ? "ring-2 ring-primary ring-offset-1" : ""}`} />
          ))}
        </div>
        <div className="flex justify-between text-[8px] text-muted-foreground">
          {["Kick", "Snare", "Hi-Hat", "Clap", "Tom", "Cymbal", "Rim", "Perc"].map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ClubNightDemo() {
  const [spots, setSpots] = useState(50);
  const features = [
    { label: "DJ Live", icon: "🎧" },
    { label: "Dance Floor", icon: "💃" },
    { label: "VIP Lounge", icon: "🍾" },
    { label: "Late Night", icon: "🌙" },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="relative h-32 bg-gradient-to-br from-purple-900 to-pink-900">
          <div className="absolute inset-0 flex items-center justify-center">
            <Music className="h-16 w-16 text-white/20" />
          </div>
          <div className="absolute top-4 left-4">
            <Badge variant="secondary">This Weekend</Badge>
          </div>
          <div className="absolute bottom-4 left-4">
            <p className="text-xl font-extrabold text-white">Hip Hop Night</p>
            <p className="text-xs text-white/70">Saturday · 10 PM - 4 AM</p>
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-4 gap-2 mb-4">
            {features.map((f) => (
              <div key={f.label} className="text-center">
                <span className="text-xl">{f.icon}</span>
                <p className="text-[9px] text-muted-foreground mt-1">{f.label}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">{spots} spots left</p>
              <div className="h-1.5 w-24 rounded-full bg-muted overflow-hidden mt-1">
                <div className="h-full bg-primary rounded-full" style={{ width: `${spots}%` }} />
              </div>
            </div>
            <button onClick={() => setSpots((s) => Math.max(0, s - 1))} className="rounded-lg bg-foreground px-4 py-2 text-xs font-medium text-background hover:bg-foreground/90">
              RSVP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DjBoothDemo() {
  const [volume, setVolume] = useState(75);
  const [bpm, setBpm] = useState(128);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm p-4 dark:border-white/[.145]">
        <div className="flex items-center gap-2 mb-4">
          <Volume2 className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">DJ Booth</h3>
        </div>
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setPlaying(!playing)} className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background">
            {playing ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
          </button>
          <div className="text-center">
            <p className="text-2xl font-extrabold font-mono">{bpm}</p>
            <p className="text-[9px] text-muted-foreground">BPM</p>
          </div>
          <div className="flex gap-1">
            <button onClick={() => setBpm((b) => Math.max(60, b - 4))} className="h-8 w-8 rounded-lg bg-muted text-xs font-bold hover:bg-muted/80">-</button>
            <button onClick={() => setBpm((b) => Math.min(200, b + 4))} className="h-8 w-8 rounded-lg bg-muted text-xs font-bold hover:bg-muted/80">+</button>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-muted-foreground">Volume</span>
            <span className="text-[10px] font-mono">{volume}%</span>
          </div>
          <input type="range" min={0} max={100} value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="w-full accent-primary" />
        </div>
        <div className="flex gap-2">
          {["4/4", "3/4", "6/8"].map((t) => (
            <button key={t} className="flex-1 rounded-lg bg-muted px-2 py-1.5 text-[10px] font-medium hover:bg-muted/80">{t}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

function DanceTutorialDemo() {
  const [step, setStep] = useState(0);
  const steps = [
    { name: "Starting Position", desc: "Feet shoulder-width apart", move: "bounce" },
    { name: "The Bounce", desc: "Bend knees to the beat", move: "bounce" },
    { name: "Add Arms", desc: "Swing arms with the rhythm", move: "wave" },
    { name: "Full Move", desc: "Combine bounce with arms", move: "pop" },
  ];

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Mic className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Dance Tutorial</h3>
            <span className="ml-auto text-[10px] text-muted-foreground">Step {step + 1}/{steps.length}</span>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-center mb-4">
            <DanceMoveRenderer move={steps[step].move} size={100} />
          </div>
          <div className="text-center mb-4">
            <p className="text-sm font-bold">{steps[step].name}</p>
            <p className="text-[10px] text-muted-foreground">{steps[step].desc}</p>
          </div>
          <div className="flex justify-center gap-1 mb-4">
            {steps.map((_, i) => (
              <div key={i} className={`h-1.5 w-8 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-muted"}`} />
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className="flex-1 rounded-lg bg-muted px-3 py-2 text-xs font-medium disabled:opacity-50 hover:bg-muted/80">Previous</button>
            <button onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))} disabled={step === steps.length - 1} className="flex-1 rounded-lg bg-foreground px-3 py-2 text-xs font-medium text-background disabled:opacity-50 hover:bg-foreground/90">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HipHopMovePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Hip Hop Move</h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">An animated hip hop dance move component with rhythmic motion effects.</p>
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
          <h3 className="text-lg font-medium text-foreground">Dance Move Selector</h3>
          <p className="text-sm text-muted-foreground">Choose different dance moves.</p>
          <ComponentPreview id="hiphop-selector"><DanceMoveSelectorDemo /></ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Music Visualizer</h3>
          <p className="text-sm text-muted-foreground">Beat visualization bars.</p>
          <ComponentPreview id="hiphop-visualizer"><MusicVisualizerDemo /></ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Dance Battle</h3>
          <p className="text-sm text-muted-foreground">Player vs player comparison.</p>
          <ComponentPreview id="hiphop-battle"><DanceBattleDemo /></ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Step Sequencer</h3>
          <p className="text-sm text-muted-foreground">Dance routine builder grid.</p>
          <ComponentPreview id="hiphop-sequencer"><StepSequencerDemo /></ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Club Night</h3>
          <p className="text-sm text-muted-foreground">Event promotion card.</p>
          <ComponentPreview id="hiphop-club"><ClubNightDemo /></ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">DJ Booth</h3>
          <p className="text-sm text-muted-foreground">Music controller interface.</p>
          <ComponentPreview id="hiphop-dj"><DjBoothDemo /></ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Dance Tutorial</h3>
          <p className="text-sm text-muted-foreground">Step-by-step learning guide.</p>
          <ComponentPreview id="hiphop-tutorial"><DanceTutorialDemo /></ComponentPreview>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead>
            <tbody>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">variant</td><td className="px-4 py-3 text-muted-foreground">{"\"bounce\" | \"wave\" | \"pop\" | \"lock\""}</td><td className="px-4 py-3 text-muted-foreground">{"\"bounce\""}</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
