"use client";

import { useState } from "react";

export function PresetCardsDemo() {
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
