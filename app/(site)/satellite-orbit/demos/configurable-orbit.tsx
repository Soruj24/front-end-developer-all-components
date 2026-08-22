"use client";

import { useState } from "react";

export function ConfigurableOrbit() {
  const [count, setCount] = useState(3);
  const [speed, setSpeed] = useState(4);
  const [size, setSize] = useState(192);

  const colors = ["bg-blue-500", "bg-emerald-500", "bg-amber-500", "bg-rose-500", "bg-violet-500"];
  const orbits = Array.from({ length: count }, (_, i) => i);
  const radius = size / 2;

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <div className="relative" style={{ width: size, height: size }}>
        {orbits.map((i) => {
          const r = radius - (i * radius) / (count + 1);
          return (
            <div
              key={`orbit-${i}`}
              className="absolute rounded-full border border-zinc-200 dark:border-zinc-700"
              style={{
                inset: radius - r,
              }}
            />
          );
        })}
        <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-900 shadow-lg dark:bg-zinc-100" />
        {orbits.map((i) => (
          <div
            key={`sat-${i}`}
            className={`absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${colors[i % colors.length]} shadow-md`}
            style={{ animation: `spin ${speed + i * 2}s linear infinite` }}
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-900">
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Satellites</label>
          <div className="flex gap-1">
            {[2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setCount(n)}
                className={`h-7 w-7 rounded-lg text-xs font-bold transition-all ${
                  count === n
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "bg-zinc-100 text-zinc-400 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-500 dark:hover:bg-zinc-700"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
        <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-700" />
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Speed</label>
          <input
            type="range"
            min={2}
            max={10}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="h-1.5 w-20 cursor-pointer appearance-none rounded-full bg-zinc-200 dark:bg-zinc-700"
          />
          <span className="w-6 text-center font-mono text-xs text-zinc-500">{speed}s</span>
        </div>
      </div>
    </div>
  );
}
