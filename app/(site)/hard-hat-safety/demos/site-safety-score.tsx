"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";

const metrics = [
  { label: "Days Without Incident", value: "142" },
  { label: "Training Compliance", value: "94%" },
  { label: "PPE Adherence", value: "98%" },
];

export function SiteSafetyScoreDemo() {
  const [score, setScore] = useState(87);

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Site Safety Score</h3>
          </div>
        </div>
        <div className="p-5">
          <div className="flex justify-center mb-4">
            <div className="relative h-24 w-24">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="text-primary" strokeDasharray={`${score * 2.51} 251`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-extrabold">{score}</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            {metrics.map((m) => (
              <div key={m.label} className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2">
                <span className="text-[10px] text-muted-foreground">{m.label}</span>
                <span className="text-xs font-bold">{m.value}</span>
              </div>
            ))}
          </div>
          <button onClick={() => setScore((s) => Math.min(100, s + 1))} className="mt-3 w-full rounded-lg bg-foreground px-4 py-2 text-xs font-medium text-background hover:bg-foreground/90">
            Update Score
          </button>
        </div>
      </div>
    </div>
  );
}
