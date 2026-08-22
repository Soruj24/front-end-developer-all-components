"use client";

import { useState } from "react";
import { Thermometer, Settings, Zap } from "lucide-react";

export function PlaygroundDemo() {
  const [temp, setTemp] = useState(22);
  const [mode, setMode] = useState<"heat" | "cool" | "auto">("heat");
  const [preset, setPreset] = useState("comfort");

  const getColor = (t: number) => {
    if (t < 18) return "#3b82f6";
    if (t < 22) return "#22c55e";
    if (t < 26) return "#f97316";
    return "#ef4444";
  };

  const presets = [
    { id: "eco", name: "Eco", temp: 18 },
    { id: "comfort", name: "Comfort", temp: 22 },
    { id: "boost", name: "Boost", temp: 26 },
  ];

  return (
    <div className="w-full max-w-lg space-y-4">
      <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Thermostat</h3>
          </div>
          <div className="flex gap-1">
            {(["heat", "cool", "auto"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`rounded-lg px-2 py-1 text-[10px] font-medium transition-all ${
                  mode === m
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4 flex items-center gap-3">
          <button
            onClick={() => setTemp((t) => Math.max(10, t - 1))}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-lg font-bold text-zinc-600 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
          >
            -
          </button>
          <input
            type="range"
            min={10}
            max={40}
            value={temp}
            onChange={(e) => setTemp(Number(e.target.value))}
            className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-zinc-200 accent-zinc-900 dark:bg-zinc-700 dark:accent-zinc-100"
          />
          <button
            onClick={() => setTemp((t) => Math.min(40, t + 1))}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-lg font-bold text-zinc-600 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
          >
            +
          </button>
        </div>
        <div className="flex justify-between text-[10px] text-zinc-500 dark:text-zinc-400">
          <span>10°C</span>
          <span className="font-medium text-zinc-900 dark:text-zinc-100">{temp}°C</span>
          <span>40°C</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {presets.map((p) => (
          <button
            key={p.id}
            onClick={() => { setTemp(p.temp); setPreset(p.id); }}
            className={`rounded-xl border p-3 text-center transition-all ${
              preset === p.id
                ? "border-zinc-900 bg-zinc-50 dark:border-zinc-200 dark:bg-zinc-900"
                : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
            }`}
          >
            <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">{p.name}</p>
            <p className="text-lg font-extrabold" style={{ color: getColor(p.temp) }}>{p.temp}°</p>
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
          <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Status</p>
        </div>
        <div className="mt-2 flex items-center gap-4 text-[10px] text-zinc-500 dark:text-zinc-400">
          <span>Mode: {mode}</span>
          <span>Target: {temp}°C</span>
          <span>Power: {temp > 20 ? "High" : "Low"}</span>
        </div>
      </div>
    </div>
  );
}
