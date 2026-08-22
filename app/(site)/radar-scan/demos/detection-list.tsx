"use client";

import { useState } from "react";

export function DetectionList() {
  const [detections, setDetections] = useState([
    { id: 1, label: "Target A", type: "friendly", distance: "2.4 km" },
    { id: 2, label: "Target B", type: "neutral", distance: "5.1 km" },
    { id: 3, label: "Target C", type: "hostile", distance: "1.8 km" },
  ]);

  const colors = {
    friendly: "bg-emerald-500 shadow-emerald-500/50",
    neutral: "bg-amber-500 shadow-amber-500/50",
    hostile: "bg-red-500 shadow-red-500/50",
  };

  return (
    <div className="flex items-center gap-6 p-8">
      <div className="relative h-32 w-32 shrink-0">
        <div className="absolute inset-0 rounded-full border border-zinc-200 dark:border-zinc-700" />
        <div className="absolute inset-4 rounded-full border border-zinc-200 dark:border-zinc-700" />
        <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-900 dark:bg-zinc-100" />
        <div className="absolute left-1/2 top-0 h-1/2 w-0.5 origin-bottom -translate-x-1/2 bg-gradient-to-t from-zinc-900 to-transparent dark:from-zinc-100 animate-spin" style={{ animationDuration: "3s" }} />
        {detections.map((d, i) => (
          <div key={d.id} className={`absolute h-2 w-2 rounded-full shadow-lg animate-pulse ${colors[d.type as keyof typeof colors]}`} style={{
            left: `${20 + i * 25}%`,
            top: `${25 + i * 15}%`,
          }} />
        ))}
      </div>
      <div className="space-y-2">
        {detections.map((d) => (
          <div key={d.id} className="flex items-center gap-3 rounded-xl border border-zinc-200 px-3 py-2 dark:border-zinc-800">
            <div className={`h-2 w-2 rounded-full shadow-lg ${colors[d.type as keyof typeof colors]}`} />
            <div>
              <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">{d.label}</p>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500">{d.distance}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
