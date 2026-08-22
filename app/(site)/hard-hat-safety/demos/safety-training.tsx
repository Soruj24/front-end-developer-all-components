"use client";

import { useState } from "react";
import { ClipboardCheck, CheckCircle } from "lucide-react";

const trainings = [
  { name: "Site Induction", duration: "2 hrs", icon: "📋" },
  { name: "Fall Protection", duration: "4 hrs", icon: "🪜" },
  { name: "First Aid", duration: "8 hrs", icon: "🏥" },
  { name: "Fire Safety", duration: "3 hrs", icon: "🔥" },
];

export function SafetyTrainingDemo() {
  const [completed, setCompleted] = useState([true, true, false, false]);

  const toggle = (i: number) => {
    setCompleted((prev) => prev.map((c, idx) => idx === i ? !c : c));
  };

  const count = completed.filter(Boolean).length;

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Safety Training</h3>
            <span className="ml-auto text-[10px] text-muted-foreground">{count}/{trainings.length}</span>
          </div>
        </div>
        <div className="p-4">
          <div className="h-2 rounded-full bg-muted overflow-hidden mb-4">
            <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(count / trainings.length) * 100}%` }} />
          </div>
          <div className="space-y-2">
            {trainings.map((t, i) => (
              <button
                key={i}
                onClick={() => toggle(i)}
                className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all ${
                  completed[i] ? "border-primary/30 bg-primary/5" : "border-black/[.08] dark:border-white/[.145]"
                }`}
              >
                <span className="text-xl">{t.icon}</span>
                <div className="flex-1">
                  <p className="text-xs font-bold">{t.name}</p>
                  <p className="text-[9px] text-muted-foreground">{t.duration}</p>
                </div>
                {completed[i] ? (
                  <CheckCircle className="h-4 w-4 text-primary" />
                ) : (
                  <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
