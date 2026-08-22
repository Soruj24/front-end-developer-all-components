"use client";

import { useState } from "react";
import { Settings } from "lucide-react";

export function QuickPresetsDemo() {
  const [selected, setSelected] = useState("comfort");
  const presets = [
    { id: "eco", name: "Eco", temp: 18, icon: "\uD83C\uDF31", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400" },
    { id: "comfort", name: "Comfort", temp: 22, icon: "\uD83D\uDE0C", color: "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400" },
    { id: "boost", name: "Boost", temp: 26, icon: "\uD83D\uDD25", color: "bg-orange-100 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400" },
    { id: "night", name: "Night", temp: 19, icon: "\uD83C\uDF19", color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400" },
  ];

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mb-4 flex items-center gap-2">
          <Settings className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Quick Presets</h3>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {presets.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              className={`rounded-lg border p-4 text-left transition-all ${
                selected === p.id
                  ? "border-zinc-900 bg-zinc-50 dark:border-zinc-200 dark:bg-zinc-900"
                  : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
              }`}
            >
              <span className="text-2xl">{p.icon}</span>
              <p className="mt-2 text-sm font-bold text-zinc-900 dark:text-zinc-100">{p.name}</p>
              <p className="text-lg font-extrabold text-zinc-900 dark:text-zinc-100">{p.temp}°C</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
