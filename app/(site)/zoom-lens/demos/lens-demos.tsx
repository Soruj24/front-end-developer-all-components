"use client";

import { useState, useRef } from "react";

export function BasicLens() {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  return (
    <div className="mx-auto max-w-sm">
      <div ref={ref} onMouseMove={handleMove} className="group relative cursor-crosshair overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <div className="bg-gradient-to-br from-zinc-100 to-zinc-50 p-12 text-center dark:from-zinc-800 dark:to-zinc-900">
          <div className="grid grid-cols-3 gap-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="h-8 w-8 rounded bg-gradient-to-br from-blue-500 to-violet-500 opacity-60" />
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-xl" style={{ left: `calc(${pos.x}% - 64px)`, top: `calc(${pos.y}% - 64px)` }}>
            <div className="h-full w-full scale-[2] bg-gradient-to-br from-blue-500 to-violet-500" style={{ backgroundPosition: `${pos.x}% ${pos.y}%`, backgroundSize: "100% 100%" }} />
          </div>
        </div>
        <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 text-white opacity-0 shadow-md transition-all duration-300 group-hover:opacity-100 dark:bg-zinc-100 dark:text-zinc-900">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
        </div>
      </div>
    </div>
  );
}

export function LensSizes() {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  const sizes = [
    { label: "sm", size: 96, scale: 1.5 },
    { label: "md", size: 128, scale: 2 },
    { label: "lg", size: 160, scale: 2.5 },
  ];

  return (
    <div className="mx-auto max-w-sm space-y-2">
      {sizes.map((s) => (
        <div key={s.label} ref={ref} onMouseMove={handleMove} className="group relative cursor-crosshair overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <div className="flex items-center justify-between bg-gradient-to-r from-zinc-100 to-zinc-50 px-4 py-3 dark:from-zinc-800 dark:to-zinc-900">
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">{s.label} lens</span>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500">{s.size}px</span>
          </div>
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="absolute overflow-hidden rounded-full border-4 border-white shadow-xl" style={{ width: s.size, height: s.size, left: `calc(${pos.x}% - ${s.size / 2}px)`, top: `calc(${pos.y}% - ${s.size / 2}px)` }}>
              <div className="h-full w-full bg-gradient-to-br from-blue-500 to-violet-500" style={{ transform: `scale(${s.scale})`, transformOrigin: `${pos.x}% ${pos.y}%` }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function LensShapes() {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  return (
    <div className="mx-auto max-w-sm grid grid-cols-2 gap-2">
      {["rounded-full", "rounded-xl", "rounded-lg", "rounded-none"].map((shape) => (
        <div key={shape} ref={ref} onMouseMove={handleMove} className="group relative cursor-crosshair overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <div className="flex items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-50 p-6 dark:from-zinc-800 dark:to-zinc-900">
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500">{shape}</span>
          </div>
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className={`absolute h-24 w-24 overflow-hidden border-4 border-white shadow-xl ${shape}`} style={{ left: `calc(${pos.x}% - 48px)`, top: `calc(${pos.y}% - 48px)` }}>
              <div className="h-full w-full scale-[2] bg-gradient-to-br from-emerald-500 to-teal-500" style={{ backgroundPosition: `${pos.x}% ${pos.y}%`, backgroundSize: "100% 100%" }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function LensWithGrid() {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [showGrid, setShowGrid] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  return (
    <div className="mx-auto max-w-sm space-y-2">
      <div className="flex gap-1.5">
        <button onClick={() => setShowGrid(!showGrid)} className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${showGrid ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"}`}>
          {showGrid ? "Hide" : "Show"} Grid
        </button>
      </div>
      <div ref={ref} onMouseMove={handleMove} className="group relative cursor-crosshair overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <div className="bg-gradient-to-br from-zinc-100 to-zinc-50 p-8 dark:from-zinc-800 dark:to-zinc-900">
          <div className="grid grid-cols-4 gap-1">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="h-6 w-6 rounded bg-gradient-to-br from-amber-500 to-orange-500 opacity-60" />
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-xl" style={{ left: `calc(${pos.x}% - 64px)`, top: `calc(${pos.y}% - 64px)` }}>
            <div className="h-full w-full scale-[2] bg-gradient-to-br from-amber-500 to-orange-500" style={{ backgroundPosition: `${pos.x}% ${pos.y}%`, backgroundSize: "100% 100%" }} />
            {showGrid && (
              <div className="absolute inset-0 border-2 border-white/30">
                <div className="absolute left-1/2 h-full w-px bg-white/30" />
                <div className="absolute top-1/2 h-px w-full bg-white/30" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function LensWithZoom() {
  const [zoom, setZoom] = useState(2);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  return (
    <div className="mx-auto max-w-sm space-y-2">
      <div className="flex gap-1.5">
        {[1.5, 2, 3, 4].map((z) => (
          <button key={z} onClick={() => setZoom(z)} className={`flex-1 rounded-lg py-1.5 text-xs font-medium transition-all ${zoom === z ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"}`}>
            {z}x
          </button>
        ))}
      </div>
      <div ref={ref} onMouseMove={handleMove} className="group relative cursor-crosshair overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <div className="bg-gradient-to-br from-zinc-100 to-zinc-50 p-12 text-center dark:from-zinc-800 dark:to-zinc-900">
          <div className="grid grid-cols-3 gap-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="h-8 w-8 rounded bg-gradient-to-br from-purple-500 to-pink-500 opacity-60" />
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-xl" style={{ left: `calc(${pos.x}% - 64px)`, top: `calc(${pos.y}% - 64px)` }}>
            <div className="h-full w-full bg-gradient-to-br from-purple-500 to-pink-500" style={{ transform: `scale(${zoom})`, transformOrigin: `${pos.x}% ${pos.y}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
