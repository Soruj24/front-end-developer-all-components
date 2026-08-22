export const HEATER_CONTROL_SOURCE = `"use client";

import { useState } from "react";
import { Thermometer } from "lucide-react";

interface HeaterControlProps {
  value?: number;
  min?: number;
  max?: number;
  className?: string;
}

export function HeaterControl({ value: initialValue = 22, min = 10, max = 40, className = "" }: HeaterControlProps) {
  const [temp, setTemp] = useState(initialValue);

  const getColor = (t: number) => {
    if (t < 18) return "#3b82f6";
    if (t < 22) return "#22c55e";
    if (t < 26) return "#f97316";
    return "#ef4444";
  };

  return (
    <div className={\`rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 \${className}\`}>
      <div className="mb-4 flex items-center gap-2">
        <Thermometer className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Temperature</h3>
      </div>
      <div className="mb-4 flex justify-center">
        <div className="relative h-32 w-32">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="6" className="text-zinc-200 dark:text-zinc-800" />
            <circle cx="50" cy="50" r="40" fill="none" stroke={getColor(temp)} strokeWidth="6" strokeLinecap="round" strokeDasharray={\`\${((temp - min) / (max - min)) * 251} 251\`} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-3xl font-extrabold" style={{ color: getColor(temp) }}>{temp}°</p>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Celsius</p>
          </div>
        </div>
      </div>
      <div className="mb-3 flex items-center gap-3">
        <button onClick={() => setTemp((t) => Math.max(min, t - 1))} className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-lg font-bold text-zinc-600 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">-</button>
        <input type="range" min={min} max={max} value={temp} onChange={(e) => setTemp(Number(e.target.value))} className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-zinc-200 accent-zinc-900 dark:bg-zinc-700 dark:accent-zinc-100" />
        <button onClick={() => setTemp((t) => Math.min(max, t + 1))} className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-lg font-bold text-zinc-600 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300">+</button>
      </div>
    </div>
  );
}`;
