"use client";

import { useState } from "react";
import { Particles } from "@/components/ui/Particles";
import { Wind, MousePointer, Box } from "lucide-react";

const presets = [
  { name: "Constellation", icon: Wind, color: "#6366f1", count: 60, speed: 0.3, distance: 140 },
  { name: "Firefly", icon: MousePointer, color: "#f9c74f", count: 40, speed: 0.8, distance: 60 },
  { name: "Network", icon: Box, color: "#10b981", count: 100, speed: 0.4, distance: 80 },
];

export function InteractiveDemo() {
  const [count, setCount] = useState(80);
  const [speed, setSpeed] = useState(0.5);
  const [color, setColor] = useState("#6366f1");
  const [connectDist, setConnectDist] = useState(100);
  const [mouseInteract, setMouseInteract] = useState(true);
  const key = `${count}-${speed}-${color}-${connectDist}-${mouseInteract}`;

  return (
    <div className="flex flex-col gap-4">
      <Particles key={key} count={count} speed={speed} color={color} connectDistance={connectDist} mouseInteract={mouseInteract} />
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          Count
          <input type="range" min={20} max={200} value={count} onChange={(e) => setCount(+e.target.value)} className="w-20 accent-primary" />
          <span className="w-6 text-right text-xs font-mono tabular-nums">{count}</span>
        </label>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          Speed
          <input type="range" min={0.1} max={2} step={0.1} value={speed} onChange={(e) => setSpeed(+e.target.value)} className="w-20 accent-primary" />
          <span className="w-6 text-right text-xs font-mono tabular-nums">{speed}</span>
        </label>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          Distance
          <input type="range" min={30} max={200} value={connectDist} onChange={(e) => setConnectDist(+e.target.value)} className="w-20 accent-primary" />
          <span className="w-6 text-right text-xs font-mono tabular-nums">{connectDist}</span>
        </label>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="h-6 w-6 cursor-pointer rounded border border-border/60" />
          Color
        </label>
        <button
          type="button"
          onClick={() => setMouseInteract(!mouseInteract)}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
            mouseInteract ? "bg-primary text-primary-foreground shadow-sm" : "border border-border/60 text-muted-foreground hover:bg-muted"
          }`}
        >
          Mouse: {mouseInteract ? "On" : "Off"}
        </button>
      </div>
    </div>
  );
}

export function PresetsDemo() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {presets.map((p) => {
        const Icon = p.icon;
        return (
          <div key={p.name} className="overflow-hidden rounded-xl border border-border/60 bg-background transition-colors hover:border-border">
            <div className="flex items-center gap-2 border-b border-border/60 bg-muted/30 px-4 py-2.5">
              <Icon className="h-4 w-4" style={{ color: p.color }} />
              <span className="text-sm font-medium text-foreground">{p.name}</span>
            </div>
            <div className="p-3">
              <Particles count={p.count} speed={p.speed} color={p.color} connectDistance={p.distance} mouseInteract className="h-48 rounded-lg" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
