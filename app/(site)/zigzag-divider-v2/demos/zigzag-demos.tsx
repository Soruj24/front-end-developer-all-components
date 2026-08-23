"use client";

import { useState } from "react";

export function BasicZigzag() {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div className="relative">
        <svg className="h-6 w-full" viewBox="0 0 400 24" preserveAspectRatio="none">
          <polygon points="0,24 20,0 40,24 60,0 80,24 100,0 120,24 140,0 160,24 180,0 200,24 220,0 240,24 260,0 280,24 300,0 320,24 340,0 360,24 380,0 400,24" className="fill-zinc-900/10 dark:fill-zinc-100/10" />
        </svg>
      </div>
      <div className="flex items-center gap-2 p-4 text-sm text-zinc-600 dark:text-zinc-400">
        <svg className="h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
        Content below zigzag divider
      </div>
    </div>
  );
}

export function ZigzagBottom() {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div className="flex items-center gap-2 p-4 text-sm text-zinc-600 dark:text-zinc-400">
        <svg className="h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        Content above zigzag divider
      </div>
      <div className="relative">
        <svg className="h-6 w-full" viewBox="0 0 400 24" preserveAspectRatio="none">
          <polygon points="0,0 20,24 40,0 60,24 80,0 100,24 120,0 140,24 160,0 180,24 200,0 220,24 240,0 260,24 280,0 300,24 320,0 340,24 360,0 380,24 400,0" className="fill-zinc-900/10 dark:fill-zinc-100/10" />
        </svg>
      </div>
    </div>
  );
}

export function DoubleZigzag() {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <svg className="h-4 w-full" viewBox="0 0 400 16" preserveAspectRatio="none">
        <polygon points="0,0 16,16 32,0 48,16 64,0 80,16 96,0 112,16 128,0 144,16 160,0 176,16 192,0 208,16 224,0 240,16 256,0 272,16 288,0 304,16 320,0 336,16 352,0 368,16 384,0 400,0 400,16 0,16" className="fill-zinc-900/8 dark:fill-zinc-100/8" />
      </svg>
      <div className="px-4 py-2 text-center text-xs font-medium text-zinc-500 dark:text-zinc-400">Double zigzag pattern</div>
      <svg className="h-4 w-full" viewBox="0 0 400 16" preserveAspectRatio="none">
        <polygon points="0,16 16,0 32,16 48,0 64,16 80,0 96,16 112,0 128,16 144,0 160,16 176,0 192,16 208,0 224,16 240,0 256,16 272,0 288,16 304,0 320,16 336,0 352,16 368,0 384,16 400,16 400,0 0,0" className="fill-zinc-900/8 dark:fill-zinc-100/8" />
      </svg>
    </div>
  );
}

export function ColorZigzag() {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div className="flex">
        {["hsl(0,70%,50%)", "hsl(30,70%,50%)", "hsl(60,70%,50%)", "hsl(120,70%,50%)", "hsl(220,70%,50%)", "hsl(250,70%,50%)", "hsl(280,70%,50%)"].map((color, i) => (
          <svg key={i} className="h-8 flex-1" viewBox="0 0 60 32" preserveAspectRatio="none">
            <polygon points="0,32 15,0 30,32 45,0 60,32" fill={color} fillOpacity={0.3} />
          </svg>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 p-4 text-sm text-zinc-600 dark:text-zinc-400">
        <svg className="h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
        Multi-color zigzag
      </div>
    </div>
  );
}

export function AnimatedZigzag() {
  const [animate, setAnimate] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div className="relative">
        <svg className={`h-8 w-full transition-transform duration-500 ${animate ? "translate-x-4" : ""}`} viewBox="0 0 400 32" preserveAspectRatio="none">
          <polygon points="0,0 20,32 40,0 60,32 80,0 100,32 120,0 140,32 160,0 180,32 200,0 220,32 240,0 260,32 280,0 300,32 320,0 340,32 360,0 380,32 400,0" className="fill-zinc-900/10 dark:fill-zinc-100/10" />
        </svg>
        <button onClick={() => setAnimate(!animate)} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white shadow-lg transition-all hover:bg-zinc-800 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
          <svg className={`h-3 w-3 transition-transform ${animate ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
          {animate ? "Stop" : "Animate"}
        </button>
      </div>
    </div>
  );
}

export function ZigzagSection() {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div className="flex items-center gap-2 bg-zinc-100 px-4 py-3 text-sm font-semibold text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
        <svg className="h-4 w-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
        Section Header
      </div>
      <svg className="h-4 w-full" viewBox="0 0 400 16" preserveAspectRatio="none">
        <polygon points="0,0 16,16 32,0 48,16 64,0 80,16 96,0 112,16 128,0 144,16 160,0 176,16 192,0 208,16 224,0 240,16 256,0 272,16 288,0 304,16 320,0 336,16 352,0 368,16 384,0 400,0 400,16 0,16" className="fill-zinc-900/10 dark:fill-zinc-100/10" />
      </svg>
      <div className="p-4 text-sm text-zinc-600 dark:text-zinc-400">
        Content section with zigzag divider separating header from body.
      </div>
    </div>
  );
}

export function ZigzagSizes() {
  const [height, setHeight] = useState(16);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Height</label>
        <input type="range" min="8" max="32" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-zinc-200 accent-zinc-900 dark:bg-zinc-700 dark:accent-zinc-100" />
        <span className="min-w-[2rem] text-center text-xs font-medium text-zinc-500 dark:text-zinc-400">{height}px</span>
      </div>
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <svg style={{ height }} className="w-full" viewBox={`0 0 400 ${height}`} preserveAspectRatio="none">
          <polygon points={`0,${height} 20,0 40,${height} 60,0 80,${height} 100,0 120,${height} 140,0 160,${height} 180,0 200,${height} 220,0 240,${height} 260,0 280,${height} 300,0 320,${height} 340,0 360,${height} 380,0 400,${height}`} className="fill-zinc-900/10 dark:fill-zinc-100/10" />
        </svg>
        <div className="p-3 text-center text-xs font-medium text-zinc-500 dark:text-zinc-400">Adjustable height</div>
      </div>
    </div>
  );
}
