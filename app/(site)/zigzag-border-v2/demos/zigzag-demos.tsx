"use client";

import { useState } from "react";

export function BasicZigzag() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
      <div className="h-16 bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700" style={{ clipPath: "polygon(0 0, 4% 100%, 8% 0, 12% 100%, 16% 0, 20% 100%, 24% 0, 28% 100%, 32% 0, 36% 100%, 40% 0, 44% 100%, 48% 0, 52% 100%, 56% 0, 60% 100%, 64% 0, 68% 100%, 72% 0, 76% 100%, 80% 0, 84% 100%, 88% 0, 92% 100%, 96% 0, 100% 100%, 100% 0)" }} />
      <div className="p-4">
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Zigzag top border</p>
      </div>
    </div>
  );
}

export function ZigzagPositions() {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
        <div className="h-12 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40" style={{ clipPath: "polygon(0 0, 4% 100%, 8% 0, 12% 100%, 16% 0, 20% 100%, 24% 0, 28% 100%, 32% 0, 36% 100%, 40% 0, 44% 100%, 48% 0, 52% 100%, 56% 0, 60% 100%, 64% 0, 68% 100%, 72% 0, 76% 100%, 80% 0, 84% 100%, 88% 0, 92% 100%, 96% 0, 100% 100%, 100% 0)" }} />
        <div className="p-3">
          <p className="text-xs font-medium text-blue-600 dark:text-blue-400">Top zigzag</p>
        </div>
        <div className="h-12 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40" style={{ clipPath: "polygon(0 100%, 4% 0, 8% 100%, 12% 0, 16% 100%, 20% 0, 24% 100%, 28% 0, 32% 100%, 36% 0, 40% 100%, 44% 0, 48% 100%, 52% 0, 56% 100%, 60% 0, 64% 100%, 68% 0, 72% 100%, 76% 0, 80% 100%, 84% 0, 88% 100%, 92% 0, 96% 100%, 100% 0, 100% 100%, 0 100%)" }} />
      </div>
      <div className="relative overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
        <div className="p-3">
          <p className="text-xs font-medium text-violet-600 dark:text-violet-400">Left + right zigzag</p>
        </div>
        <div className="absolute bottom-0 left-0 top-0 w-4 bg-gradient-to-b from-violet-100 to-violet-200 dark:from-violet-900/40 dark:to-violet-800/40" style={{ clipPath: "polygon(0 0, 100% 4%, 0 8%, 100% 12%, 0 16%, 100% 20%, 0 24%, 100% 28%, 0 32%, 100% 36%, 0 40%, 100% 44%, 0 48%, 100% 52%, 0 56%, 100% 60%, 0 64%, 100% 68%, 0 72%, 100% 76%, 0 80%, 100% 84%, 0 88%, 100% 92%, 0 96%, 100% 100%, 0 100%)" }} />
        <div className="absolute bottom-0 right-0 top-0 w-4 bg-gradient-to-b from-violet-100 to-violet-200 dark:from-violet-900/40 dark:to-violet-800/40" style={{ clipPath: "polygon(100% 0, 0 4%, 100% 8%, 0 12%, 100% 16%, 0 20%, 100% 24%, 0 28%, 100% 32%, 0 36%, 100% 40%, 0 44%, 100% 48%, 0 52%, 100% 56%, 0 60%, 100% 64%, 0 68%, 100% 72%, 0 76%, 100% 80%, 0 84%, 100% 88%, 0 92%, 100% 96%, 0 100%, 100% 100%)" }} />
      </div>
    </div>
  );
}

export function ZigzagColors() {
  const colors = [
    { name: "Zinc", from: "from-zinc-100", to: "to-zinc-200", darkFrom: "dark:from-zinc-800", darkTo: "dark:to-zinc-700" },
    { name: "Blue", from: "from-blue-100", to: "to-blue-200", darkFrom: "dark:from-blue-900/40", darkTo: "dark:to-blue-800/40" },
    { name: "Violet", from: "from-violet-100", to: "to-violet-200", darkFrom: "dark:from-violet-900/40", darkTo: "dark:to-violet-800/40" },
    { name: "Emerald", from: "from-emerald-100", to: "to-emerald-200", darkFrom: "dark:from-emerald-900/40", darkTo: "dark:to-emerald-800/40" },
  ];
  return (
    <div className="grid grid-cols-2 gap-2">
      {colors.map((c) => (
        <div key={c.name} className="relative overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
          <div className={`h-12 bg-gradient-to-r ${c.from} ${c.to} ${c.darkFrom} ${c.darkTo}`} style={{ clipPath: "polygon(0 0, 4% 100%, 8% 0, 12% 100%, 16% 0, 20% 100%, 24% 0, 28% 100%, 32% 0, 36% 100%, 40% 0, 44% 100%, 48% 0, 52% 100%, 56% 0, 60% 100%, 64% 0, 68% 100%, 72% 0, 76% 100%, 80% 0, 84% 100%, 88% 0, 92% 100%, 96% 0, 100% 100%, 100% 0)" }} />
          <div className="p-2">
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{c.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ZigzagSizes() {
  const sizes = [4, 8, 12, 16];
  return (
    <div className="flex flex-col gap-3">
      {sizes.map((s) => (
        <div key={s} className="relative overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
          <div className="bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700" style={{ height: s * 2, clipPath: "polygon(0 0, 4% 100%, 8% 0, 12% 100%, 16% 0, 20% 100%, 24% 0, 28% 100%, 32% 0, 36% 100%, 40% 0, 44% 100%, 48% 0, 52% 100%, 56% 0, 60% 100%, 64% 0, 68% 100%, 72% 0, 76% 100%, 80% 0, 84% 100%, 88% 0, 92% 100%, 96% 0, 100% 100%, 100% 0)" }} />
          <div className="p-2">
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{s}px height</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ZigzagInteractive() {
  const [height, setHeight] = useState(8);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Height</label>
        <input type="range" min="2" max="20" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-zinc-200 accent-zinc-900 dark:bg-zinc-700 dark:accent-zinc-100" />
        <span className="min-w-[2rem] text-center text-xs font-medium text-zinc-500 dark:text-zinc-400">{height}px</span>
      </div>
      <div className="relative overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
        <div className="bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700" style={{ height: height * 2, clipPath: "polygon(0 0, 4% 100%, 8% 0, 12% 100%, 16% 0, 20% 100%, 24% 0, 28% 100%, 32% 0, 36% 100%, 40% 0, 44% 100%, 48% 0, 52% 100%, 56% 0, 60% 100%, 64% 0, 68% 100%, 72% 0, 76% 100%, 80% 0, 84% 100%, 88% 0, 92% 100%, 96% 0, 100% 100%, 100% 0)" }} />
        <div className="p-4">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Interactive zigzag border</p>
        </div>
      </div>
    </div>
  );
}
