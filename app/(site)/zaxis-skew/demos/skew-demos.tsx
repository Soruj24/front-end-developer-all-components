"use client";

import { useState } from "react";

export function BasicSkew() {
  const degrees = [0, 5, 10, 15, 20];

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-6">
      {degrees.map((deg) => (
        <div
          key={deg}
          className="flex h-16 w-16 items-center justify-center rounded-xl border border-zinc-200 bg-white text-xs font-semibold text-zinc-700 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
          style={{ transform: `skewX(${deg}deg)` }}
        >
          {deg}°
        </div>
      ))}
    </div>
  );
}

export function SkewDirections() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 py-6">
      <div className="flex flex-col items-center gap-2">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 text-xs font-semibold text-blue-700 shadow-sm transition-all duration-300 hover:scale-105 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300"
          style={{ transform: "skewX(15deg)" }}
        >
          X-axis
        </div>
        <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">skewX(15deg)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-xl border border-violet-200 bg-violet-50 text-xs font-semibold text-violet-700 shadow-sm transition-all duration-300 hover:scale-105 dark:border-violet-800 dark:bg-violet-950 dark:text-violet-300"
          style={{ transform: "skewY(10deg)" }}
        >
          Y-axis
        </div>
        <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">skewY(10deg)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 text-xs font-semibold text-emerald-700 shadow-sm transition-all duration-300 hover:scale-105 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
          style={{ transform: "skewX(10deg) skewY(5deg)" }}
        >
          Both
        </div>
        <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">skewX + skewY</span>
      </div>
    </div>
  );
}

export function PerspectiveSkew() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-6">
      {[0, 10, 20, 30, 40].map((deg) => (
        <div
          key={deg}
          className="flex h-16 w-16 items-center justify-center rounded-xl border border-amber-200 bg-amber-50 text-xs font-semibold text-amber-700 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300"
          style={{ transform: `perspective(500px) rotateY(${deg}deg)` }}
        >
          {deg}°
        </div>
      ))}
    </div>
  );
}

export function InteractiveSkew() {
  const [skewX, setSkewX] = useState(15);
  const [skewY, setSkewY] = useState(0);

  return (
    <div className="flex flex-col items-center gap-6 py-6">
      <div
        className="flex h-24 w-24 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-sm font-bold text-zinc-700 shadow-lg transition-all duration-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
        style={{ transform: `skewX(${skewX}deg) skewY(${skewY}deg)` }}
      >
        {skewX}° / {skewY}°
      </div>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <div className="flex items-center gap-3">
          <span className="w-12 text-xs font-medium text-zinc-500 dark:text-zinc-400">skewX</span>
          <input
            type="range"
            min="-45"
            max="45"
            value={skewX}
            onChange={(e) => setSkewX(Number(e.target.value))}
            className="flex-1 accent-zinc-900 dark:accent-zinc-100"
          />
          <span className="w-10 text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">{skewX}°</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-12 text-xs font-medium text-zinc-500 dark:text-zinc-400">skewY</span>
          <input
            type="range"
            min="-45"
            max="45"
            value={skewY}
            onChange={(e) => setSkewY(Number(e.target.value))}
            className="flex-1 accent-zinc-900 dark:accent-zinc-100"
          />
          <span className="w-10 text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">{skewY}°</span>
        </div>
      </div>
    </div>
  );
}

export function SkewCards() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-6">
      {[
        { label: "Flat", skew: "skewX(0deg)", color: "zinc" },
        { label: "Slight", skew: "skewX(6deg)", color: "blue" },
        { label: "Moderate", skew: "skewX(12deg)", color: "violet" },
        { label: "Strong", skew: "skewX(18deg)", color: "rose" },
      ].map((card) => (
        <div
          key={card.label}
          className={`flex h-20 w-32 items-center justify-center rounded-xl border shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md ${
            card.color === "zinc"
              ? "border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
              : card.color === "blue"
              ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300"
              : card.color === "violet"
              ? "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950 dark:text-violet-300"
              : "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-300"
          }`}
          style={{ transform: card.skew }}
        >
          <span className="text-xs font-semibold" style={{ transform: "skewX(-12deg)" }}>{card.label}</span>
        </div>
      ))}
    </div>
  );
}
