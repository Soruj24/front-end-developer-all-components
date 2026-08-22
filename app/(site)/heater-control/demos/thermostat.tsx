"use client";

import { useState } from "react";
import { Thermometer } from "lucide-react";

export function ThermostatDemo() {
  const [temp, setTemp] = useState(22);
  const [mode, setMode] = useState<"heat" | "cool" | "auto">("heat");

  const getColor = (t: number) => {
    if (t < 18) return "#3b82f6";
    if (t < 22) return "#22c55e";
    if (t < 26) return "#f97316";
    return "#ef4444";
  };

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Thermostat</h3>
          </div>
          <div className="flex gap-1">
            {(["heat", "cool", "auto"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`rounded-lg px-2.5 py-1 text-[10px] font-medium transition-all ${
                  mode === m
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                }`}
              >
                {m === "heat" ? "\uD83D\uDD25" : m === "cool" ? "\u2744\uFE0F" : "\uD83D\uDD04"} {m}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-6 flex justify-center">
          <div className="relative h-40 w-40">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="6" className="text-zinc-200 dark:text-zinc-800" />
              <circle cx="50" cy="50" r="40" fill="none" stroke={getColor(temp)} strokeWidth="6" strokeLinecap="round" strokeDasharray={`${((temp - 10) / 30) * 251} 251`} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-4xl font-extrabold" style={{ color: getColor(temp) }}>{temp}°</p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Celsius</p>
            </div>
          </div>
        </div>
        <div className="mb-4 flex items-center gap-3">
          <button
            onClick={() => setTemp((t) => Math.max(10, t - 1))}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-lg font-bold text-zinc-600 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
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
            className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-lg font-bold text-zinc-600 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          >
            +
          </button>
        </div>
        <div className="flex justify-between text-[10px] text-zinc-500 dark:text-zinc-400">
          <span>10°C</span>
          <span>Target: {temp}°C</span>
          <span>40°C</span>
        </div>
      </div>
    </div>
  );
}
