"use client";

import { useState } from "react";

export function BasicScale() {
  return (
    <div className="flex items-center justify-center gap-4 py-4">
      {[0.6, 0.8, 1, 1.2, 1.4].map((s, i) => (
        <div key={i} className="flex h-14 w-14 items-center justify-center rounded-xl border border-zinc-200 bg-white text-xs font-semibold text-zinc-600 shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400" style={{ transform: `scale(${s})`, opacity: 0.4 + i * 0.15 }}>
          {(s * 100).toFixed(0)}%
        </div>
      ))}
    </div>
  );
}

export function ScaleLevels() {
  return (
    <div className="flex items-end justify-center gap-3 py-4">
      {[0.5, 0.75, 1, 1.25, 1.5, 1.75].map((s, i) => (
        <div key={i} className="flex flex-col items-center gap-2">
          <div className="flex items-center justify-center rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-100 to-zinc-200 text-xs font-semibold text-zinc-600 shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-md dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-700 dark:text-zinc-400" style={{ width: 48 * s, height: 48 * s, opacity: 0.4 + i * 0.1 }}>
            {(s * 100).toFixed(0)}%
          </div>
        </div>
      ))}
    </div>
  );
}

export function ScaleInteractive() {
  const [scale, setScale] = useState(1);

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <div className="flex items-center gap-3">
        <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Scale</label>
        <input type="range" min="0.25" max="2" step="0.05" value={scale} onChange={(e) => setScale(Number(e.target.value))} className="h-1.5 w-40 cursor-pointer appearance-none rounded-full bg-zinc-200 accent-zinc-900 dark:bg-zinc-700 dark:accent-zinc-100" />
        <span className="min-w-[3rem] text-center text-xs font-medium text-zinc-500 dark:text-zinc-400">{scale.toFixed(2)}x</span>
      </div>
      <div className="flex h-24 w-24 items-center justify-center rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-100 to-zinc-200 text-sm font-bold text-zinc-600 shadow-sm transition-all duration-200 dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-700 dark:text-zinc-400" style={{ transform: `scale(${scale})` }}>
        {(scale * 100).toFixed(0)}%
      </div>
    </div>
  );
}

export function ScaleOnHover() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 py-4">
      <div className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-xl border border-zinc-200 bg-white text-xs font-semibold text-zinc-600 shadow-sm transition-all duration-300 hover:scale-150 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
        150%
      </div>
      <div className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-xl border border-zinc-200 bg-white text-xs font-semibold text-zinc-600 shadow-sm transition-all duration-300 hover:scale-[2] hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
        200%
      </div>
      <div className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-xl border border-zinc-200 bg-white text-xs font-semibold text-zinc-600 shadow-sm transition-all duration-300 hover:scale-[2.5] hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
        250%
      </div>
      <div className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-xl border border-zinc-200 bg-white text-xs font-semibold text-zinc-600 shadow-sm transition-all duration-300 hover:scale-[3] hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
        300%
      </div>
    </div>
  );
}

export function ScalePulse() {
  const [active, setActive] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <div className="flex gap-2">
        {[1500, 1000, 500].map((dur) => (
          <button key={dur} onClick={() => { setActive(false); setTimeout(() => setActive(true), 10); }} className="rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-all hover:bg-zinc-200 active:scale-95 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700">
            {dur}ms
          </button>
        ))}
      </div>
      <div className={`flex h-20 w-20 items-center justify-center rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-100 to-zinc-200 text-xs font-semibold text-zinc-600 shadow-sm transition-transform dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-700 dark:text-zinc-400 ${active ? "animate-[pulse_1s_ease-in-out_infinite]" : ""}`} style={{ transform: active ? "scale(1.2)" : "scale(1)" }}>
        Pulse
      </div>
    </div>
  );
}

export function ScaleStacked() {
  return (
    <div className="relative flex h-48 items-center justify-center py-4">
      {[0.6, 0.7, 0.8, 0.9, 1].map((s, i) => (
        <div key={i} className="absolute flex h-20 w-28 items-center justify-center rounded-xl border border-zinc-200 bg-white text-xs font-semibold text-zinc-600 shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400" style={{ transform: `scale(${s}) translateY(${(1 - s) * 80}px)`, zIndex: i, opacity: 0.5 + i * 0.1 }}>
          Layer {5 - i}
        </div>
      ))}
    </div>
  );
}
