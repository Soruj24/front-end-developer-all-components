"use client";

import { useState } from "react";

export function BasicFlip() {
  return (
    <div className="flex justify-center">
      <div className="group h-32 w-48 cursor-pointer [perspective:500px]">
        <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          <div className="absolute inset-0 flex items-center justify-center rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-100 to-zinc-200 [backface-visibility:hidden] dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-700">
            <div className="text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              </div>
              <p className="mt-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">Front</p>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center rounded-xl border border-zinc-200 bg-zinc-900 [backface-visibility:hidden] [transform:rotateY(180deg)] dark:border-zinc-700 dark:bg-zinc-100">
            <div className="text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              </div>
              <p className="mt-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">Back</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FlipDirections() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {(["rotateY(180deg)", "rotateY(-180deg)", "rotateX(180deg)", "rotateX(-180deg)"] as const).map((transform, i) => (
        <div key={i} className="group h-28 w-28 cursor-pointer [perspective:500px]">
          <div className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:${transform}]`}>
            <div className="absolute inset-0 flex items-center justify-center rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-100 to-zinc-200 [backface-visibility:hidden] dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-700">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{["Y+", "Y-", "X+", "X-"][i]}</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center rounded-xl border border-zinc-200 bg-zinc-900 [backface-visibility:hidden] dark:border-zinc-700 dark:bg-zinc-100">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Back</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function FlipSpeeds() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {([300, 500, 700, 1000] as const).map((speed) => (
        <div key={speed} className="group h-28 w-28 cursor-pointer [perspective:500px]">
          <div className={`relative h-full w-full transition-transform [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]`} style={{ transitionDuration: `${speed}ms` }}>
            <div className="absolute inset-0 flex items-center justify-center rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-100 to-zinc-200 [backface-visibility:hidden] dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-700">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{speed}ms</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center rounded-xl border border-zinc-200 bg-zinc-900 [backface-visibility:hidden] dark:border-zinc-700 dark:bg-zinc-100">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Back</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function FlipCardSizes() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {(["h-20 w-20", "h-24 w-28", "h-28 w-36", "h-32 w-48"] as const).map((size, i) => (
        <div key={i} className={`group cursor-pointer [perspective:500px] ${size}`}>
          <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
            <div className="absolute inset-0 flex items-center justify-center rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-100 to-zinc-200 [backface-visibility:hidden] dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-700">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Front</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center rounded-xl border border-zinc-200 bg-zinc-900 [backface-visibility:hidden] dark:border-zinc-700 dark:bg-zinc-100">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Back</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function FlipWithClick() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flex justify-center">
      <div className="cursor-pointer [perspective:500px]" onClick={() => setFlipped(!flipped)}>
        <div className={`h-32 w-48 transition-transform duration-500 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}>
          <div className="absolute inset-0 flex items-center justify-center rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-100 to-zinc-200 [backface-visibility:hidden] dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-700">
            <div className="text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
              </div>
              <p className="mt-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">Click to flip</p>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center rounded-xl border border-zinc-200 bg-zinc-900 [backface-visibility:hidden] [transform:rotateY(180deg)] dark:border-zinc-700 dark:bg-zinc-100">
            <div className="text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <p className="mt-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">Revealed!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
