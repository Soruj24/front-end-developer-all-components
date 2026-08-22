"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";

export function BasicVariant() {
  return (
    <div className="relative h-24 w-24">
      <div className="absolute inset-0 rounded-full border border-zinc-200 dark:border-zinc-700" />
      <div className="absolute inset-3 rounded-full border border-zinc-200 dark:border-zinc-700" />
      <div className="absolute inset-6 rounded-full border border-zinc-200 dark:border-zinc-700" />
      <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-900 dark:bg-zinc-100" />
      <div className="absolute left-1/2 top-0 h-1/2 w-0.5 origin-bottom -translate-x-1/2 bg-gradient-to-t from-zinc-900 to-transparent dark:from-zinc-100 animate-spin" style={{ animationDuration: "3s" }} />
    </div>
  );
}

export function TargetsVariant() {
  return (
    <div className="relative h-24 w-24">
      <div className="absolute inset-0 rounded-full border border-zinc-200 dark:border-zinc-700" />
      <div className="absolute inset-3 rounded-full border border-zinc-200 dark:border-zinc-700" />
      <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-900 dark:bg-zinc-100" />
      <div className="absolute left-1/2 top-0 h-1/2 w-0.5 origin-bottom -translate-x-1/2 bg-gradient-to-t from-zinc-900 to-transparent dark:from-zinc-100 animate-spin" style={{ animationDuration: "3s" }} />
      <div className="absolute left-[25%] top-[20%] h-2 w-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50 animate-pulse" />
      <div className="absolute right-[20%] top-[40%] h-2 w-2 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50 animate-pulse" />
      <div className="absolute bottom-[25%] left-[60%] h-2 w-2 rounded-full bg-red-500 shadow-lg shadow-red-500/50 animate-pulse" />
    </div>
  );
}

export function GridVariant() {
  return (
    <div className="grid grid-cols-3 gap-1.5">{Array(9).fill(0).map((_, i) => <div key={i} className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-all ${i === 4 ? "border-zinc-400 bg-zinc-100 dark:border-zinc-500 dark:bg-zinc-800" : "border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"}`}>
      {i === 1 && <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />}
      {i === 7 && <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />}
    </div>)}</div>
  );
}

export function AnimatedVariant() {
  const [running, setRunning] = useState(true);
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative h-28 w-28">
        <div className="absolute inset-0 rounded-full border border-zinc-200 dark:border-zinc-700" />
        <div className="absolute inset-4 rounded-full border border-zinc-200 dark:border-zinc-700" />
        <div className="absolute inset-8 rounded-full border border-zinc-200 dark:border-zinc-700" />
        <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-900 dark:bg-zinc-100" />
        {running && <div className="absolute left-1/2 top-0 h-1/2 w-0.5 origin-bottom -translate-x-1/2 bg-gradient-to-t from-zinc-900 to-transparent dark:from-zinc-100 animate-spin" style={{ animationDuration: "2s" }} />}
        <div className="absolute left-[30%] top-[25%] h-2 w-2 rounded-full bg-emerald-500 shadow-lg animate-pulse" />
        <div className="absolute right-[25%] top-[35%] h-2 w-2 rounded-full bg-amber-500 shadow-lg animate-pulse" />
      </div>
      <button onClick={() => setRunning(!running)} className="flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3 py-1.5 text-[10px] font-medium text-white transition-all hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900">
        {running ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}{running ? "Pause" : "Resume"}
      </button>
    </div>
  );
}

export function ListVariant() {
  const detections = [
    { l: "Target A", type: "friendly", d: "2.4 km" },
    { l: "Target B", type: "neutral", d: "5.1 km" },
    { l: "Target C", type: "hostile", d: "1.8 km" },
  ];
  const colors = { friendly: "bg-emerald-500", neutral: "bg-amber-500", hostile: "bg-red-500" };
  return (
    <div className="flex items-center gap-4">
      <div className="relative h-24 w-24 shrink-0">
        <div className="absolute inset-0 rounded-full border border-zinc-200 dark:border-zinc-700" />
        <div className="absolute inset-3 rounded-full border border-zinc-200 dark:border-zinc-700" />
        <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-900 dark:bg-zinc-100" />
        <div className="absolute left-1/2 top-0 h-1/2 w-0.5 origin-bottom -translate-x-1/2 bg-gradient-to-t from-zinc-900 to-transparent dark:from-zinc-100 animate-spin" style={{ animationDuration: "3s" }} />
        {detections.map((d, i) => <div key={i} className={`absolute h-1.5 w-1.5 rounded-full shadow-lg animate-pulse ${colors[d.type as keyof typeof colors]}`} style={{ left: `${20 + i * 25}%`, top: `${25 + i * 15}%` }} />)}
      </div>
      <div className="space-y-1">{detections.map((d, i) => <div key={i} className="flex items-center gap-2 rounded-lg border border-zinc-200 px-2.5 py-1.5 dark:border-zinc-800">
        <div className={`h-1.5 w-1.5 rounded-full ${colors[d.type as keyof typeof colors]}`} />
        <div><p className="text-[10px] font-semibold text-zinc-900 dark:text-zinc-100">{d.l}</p><p className="text-[9px] text-zinc-400">{d.d}</p></div>
      </div>)}</div>
    </div>
  );
}
