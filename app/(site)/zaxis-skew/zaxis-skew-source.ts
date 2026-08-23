export const ZAXIS_SKEW_SOURCE = `"use client";

import { useState } from "react";

export function BasicSkew() {
  const degrees = [0, 5, 10, 15, 20];

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-6">
      {degrees.map((deg) => (
        <div
          key={deg}
          className="flex h-16 w-16 items-center justify-center rounded-xl border border-zinc-200 bg-white text-xs font-semibold text-zinc-700 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
          style={{ transform: \`skewX(\${deg}deg)\` }}
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
        style={{ transform: \`skewX(\${skewX}deg) skewY(\${skewY}deg)\` }}
      >
        {skewX}° / {skewY}°
      </div>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <div className="flex items-center gap-3">
          <span className="w-12 text-xs font-medium text-zinc-500 dark:text-zinc-400">skewX</span>
          <input type="range" min="-45" max="45" value={skewX} onChange={(e) => setSkewX(Number(e.target.value))} className="flex-1 accent-zinc-900 dark:accent-zinc-100" />
          <span className="w-10 text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">{skewX}°</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-12 text-xs font-medium text-zinc-500 dark:text-zinc-400">skewY</span>
          <input type="range" min="-45" max="45" value={skewY} onChange={(e) => setSkewY(Number(e.target.value))} className="flex-1 accent-zinc-900 dark:accent-zinc-100" />
          <span className="w-10 text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">{skewY}°</span>
        </div>
      </div>
    </div>
  );
}`;
