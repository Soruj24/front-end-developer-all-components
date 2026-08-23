"use client";

import { useState } from "react";

export function BasicWave() {
  return (
    <div className="flex flex-col gap-2">
      {[1, 2, 3].map((i) => (
        <svg key={i} className="w-full h-6 animate-[wave_2s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.3}s`, opacity: 1 - i * 0.2 }} viewBox="0 0 400 24" preserveAspectRatio="none">
          <path d="M0 12 Q25 0 50 12 T100 12 T150 12 T200 12 T250 12 T300 12 T350 12 T400 12" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-900 dark:text-zinc-100" />
        </svg>
      ))}
    </div>
  );
}

export function WaveColors() {
  const colors = [
    { stroke: "#18181b", name: "Zinc" },
    { stroke: "#2563eb", name: "Blue" },
    { stroke: "#7c3aed", name: "Violet" },
    { stroke: "#059669", name: "Emerald" },
    { stroke: "#d97706", name: "Amber" },
  ];

  return (
    <div className="flex flex-col gap-2">
      {colors.map((c, i) => (
        <svg key={c.name} className="w-full h-6 animate-[wave_2s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.2}s` }} viewBox="0 0 400 24" preserveAspectRatio="none">
          <path d="M0 12 Q25 0 50 12 T100 12 T150 12 T200 12 T250 12 T300 12 T350 12 T400 12" fill="none" stroke={c.stroke} strokeWidth="2" opacity={0.6 + i * 0.1} />
        </svg>
      ))}
    </div>
  );
}

export function WaveSpeeds() {
  const [speed, setSpeed] = useState("normal");

  const speeds = {
    slow: "4s",
    normal: "2s",
    fast: "1s",
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-1.5">
        {(["slow", "normal", "fast"] as const).map((s) => (
          <button key={s} onClick={() => setSpeed(s)} className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-all ${speed === s ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"}`}>
            {s}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {[1, 2, 3].map((i) => (
          <svg key={i} className="w-full h-6" style={{ animation: `wave ${speeds[speed]} ease-in-out ${i * 0.3}s infinite`, opacity: 1 - i * 0.15 }} viewBox="0 0 400 24" preserveAspectRatio="none">
            <path d="M0 12 Q25 0 50 12 T100 12 T150 12 T200 12 T250 12 T300 12 T350 12 T400 12" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-900 dark:text-zinc-100" />
          </svg>
        ))}
      </div>
      <style>{`@keyframes wave { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(20px); } }`}</style>
    </div>
  );
}

export function WaveAmplitude() {
  const [amplitude, setAmplitude] = useState(12);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Amplitude</label>
        <input type="range" min="4" max="24" value={amplitude} onChange={(e) => setAmplitude(Number(e.target.value))} className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-zinc-200 accent-zinc-900 dark:bg-zinc-700 dark:accent-zinc-100" />
        <span className="min-w-[2rem] text-center text-xs font-medium text-zinc-500 dark:text-zinc-400">{amplitude}px</span>
      </div>
      <div className="flex flex-col gap-2">
        {[1, 2, 3].map((i) => (
          <svg key={i} className="w-full h-8 animate-[wave_2s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.3}s`, opacity: 1 - i * 0.15 }} viewBox="0 0 400 32" preserveAspectRatio="none">
            <path d={`M0 ${16} Q25 ${16 - amplitude} 50 ${16} T100 ${16} T150 ${16} T200 ${16} T250 ${16} T300 ${16} T350 ${16} T400 ${16}`} fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-900 dark:text-zinc-100" />
          </svg>
        ))}
      </div>
    </div>
  );
}

export function WaveFilled() {
  return (
    <div className="flex flex-col gap-2">
      {[0.15, 0.25, 0.35].map((opacity, i) => (
        <div key={i} className="relative overflow-hidden rounded-lg">
          <svg className="w-full h-10 animate-[wave_2s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.3}s` }} viewBox="0 0 400 40" preserveAspectRatio="none">
            <path d={`M0 20 Q25 ${20 - 16} 50 20 T100 20 T150 20 T200 20 T250 20 T300 20 T350 20 T400 20 L400 40 L0 40 Z`} fill="currentColor" className="text-zinc-900 dark:text-zinc-100" opacity={opacity} />
          </svg>
        </div>
      ))}
    </div>
  );
}

export function WaveWithContent() {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 p-6 text-white dark:from-zinc-100 dark:to-zinc-200 dark:text-zinc-900">
        <h3 className="text-lg font-bold">Wave Header</h3>
        <p className="mt-1 text-sm opacity-80">Content above the zigzag wave</p>
      </div>
      <div className="relative -mt-1">
        <svg className="w-full h-8" viewBox="0 0 400 32" preserveAspectRatio="none">
          <path d="M0 0 Q25 32 50 0 T100 0 T150 0 T200 0 T250 0 T300 0 T350 0 T400 0 L400 32 L0 32 Z" fill="currentColor" className="text-zinc-900 dark:text-zinc-100" />
        </svg>
      </div>
      <div className="p-6">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Content below the zigzag wave separator</p>
      </div>
    </div>
  );
}
