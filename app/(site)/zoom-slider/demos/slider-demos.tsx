"use client";

import { useState } from "react";

export function BasicSlider() {
  const [zoom, setZoom] = useState(75);

  return (
    <div className="mx-auto max-w-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
          <span className="text-xs font-medium">Zoom</span>
        </div>
        <span className="min-w-[3rem] rounded-full bg-zinc-100 px-2 py-0.5 text-center text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">{zoom}%</span>
      </div>
      <input type="range" min="25" max="200" value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-zinc-900 dark:bg-zinc-700 dark:accent-zinc-100" />
      <div className="flex justify-between text-[10px] text-zinc-400 dark:text-zinc-500">
        <span>25%</span>
        <span>100%</span>
        <span>200%</span>
      </div>
    </div>
  );
}

export function SliderWithPreview() {
  const [zoom, setZoom] = useState(100);

  return (
    <div className="mx-auto max-w-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
          <span className="text-xs font-medium">Zoom</span>
        </div>
        <span className="min-w-[3rem] rounded-full bg-zinc-100 px-2 py-0.5 text-center text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">{zoom}%</span>
      </div>
      <input type="range" min="25" max="200" value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-zinc-900 dark:bg-zinc-700 dark:accent-zinc-100" />
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <div className="flex items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700" style={{ height: 120 * (zoom / 100) }}>
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{zoom}% preview</span>
        </div>
      </div>
    </div>
  );
}

export function SliderPresets() {
  const [zoom, setZoom] = useState(100);
  const presets = [25, 50, 75, 100, 150, 200];

  return (
    <div className="mx-auto max-w-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
          <span className="text-xs font-medium">Zoom</span>
        </div>
        <span className="min-w-[3rem] rounded-full bg-zinc-100 px-2 py-0.5 text-center text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">{zoom}%</span>
      </div>
      <input type="range" min="25" max="200" value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-zinc-900 dark:bg-zinc-700 dark:accent-zinc-100" />
      <div className="flex gap-1.5">
        {presets.map((p) => (
          <button key={p} onClick={() => setZoom(p)} className={`flex-1 rounded-lg py-1.5 text-[10px] font-medium transition-all ${zoom === p ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"}`}>
            {p}%
          </button>
        ))}
      </div>
    </div>
  );
}

export function SliderWithButtons() {
  const [zoom, setZoom] = useState(100);

  const zoomIn = () => setZoom((z) => Math.min(z + 25, 200));
  const zoomOut = () => setZoom((z) => Math.max(z - 25, 25));

  return (
    <div className="mx-auto max-w-sm space-y-3">
      <div className="flex items-center gap-2">
        <button onClick={zoomOut} className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition-all hover:bg-zinc-100 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
        </button>
        <input type="range" min="25" max="200" value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-zinc-200 accent-zinc-900 dark:bg-zinc-700 dark:accent-zinc-100" />
        <button onClick={zoomIn} className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition-all hover:bg-zinc-100 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        </button>
        <span className="min-w-[3rem] text-center text-xs font-semibold text-zinc-700 dark:text-zinc-300">{zoom}%</span>
      </div>
    </div>
  );
}

export function SliderSizes() {
  const [zoom, setZoom] = useState(75);

  return (
    <div className="mx-auto max-w-sm space-y-4">
      {(["h-1", "h-2", "h-3"] as const).map((h, i) => (
        <div key={i} className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">{["Thin", "Default", "Thick"][i]}</span>
            <span className="text-[10px] font-semibold text-zinc-700 dark:text-zinc-300">{zoom}%</span>
          </div>
          <input type="range" min="25" max="200" value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className={`w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-zinc-900 dark:bg-zinc-700 dark:accent-zinc-100 ${h}`} />
        </div>
      ))}
    </div>
  );
}

export function SliderDisabled() {
  return (
    <div className="mx-auto max-w-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-zinc-400 dark:text-zinc-500">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
          <span className="text-xs font-medium">Zoom (Disabled)</span>
        </div>
        <span className="min-w-[3rem] rounded-full bg-zinc-100 px-2 py-0.5 text-center text-xs font-semibold text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500">100%</span>
      </div>
      <input type="range" min="25" max="200" defaultValue="100" disabled className="h-2 w-full cursor-not-allowed appearance-none rounded-full bg-zinc-200 opacity-50 dark:bg-zinc-700" />
      <p className="text-[10px] text-zinc-400 dark:text-zinc-500">This slider is disabled</p>
    </div>
  );
}
