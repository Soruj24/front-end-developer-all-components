"use client";

import { useState, useCallback, useRef, WheelEvent, MouseEvent } from "react";

export function PanWithGrid() {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale((prev) => Math.min(Math.max(prev + delta, 0.5), 4));
  }, []);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    isDragging.current = true;
    lastPos.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  }, [position]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;
    setPosition({ x: e.clientX - lastPos.current.x, y: e.clientY - lastPos.current.y });
  }, []);

  const handleMouseUp = useCallback(() => { isDragging.current = false; }, []);

  const handleReset = useCallback(() => { setScale(1); setPosition({ x: 0, y: 0 }); }, []);

  return (
    <div className="flex flex-col gap-3">
      <div onWheel={handleWheel} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} className="relative h-48 cursor-grab overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm active:cursor-grabbing dark:border-zinc-700 dark:bg-zinc-900">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, #e5e7eb 1px, transparent 1px)", backgroundSize: "20px 20px", transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`, transition: isDragging.current ? "none" : "transform 0.1s ease-out" }} />
        <div className="absolute inset-0 flex items-center justify-center" style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`, transition: isDragging.current ? "none" : "transform 0.1s ease-out" }}>
          <div className="flex flex-col items-center gap-2 text-zinc-500 dark:text-zinc-400">
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
            <span className="text-xs font-medium">Grid background</span>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 flex gap-1">
          <button onClick={() => setScale((s) => Math.min(s + 0.25, 4))} className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900/80 text-xs font-medium text-white backdrop-blur-sm transition-all hover:bg-zinc-900 active:scale-95 dark:bg-zinc-100/80 dark:text-zinc-900 dark:hover:bg-zinc-100">+</button>
          <button onClick={() => setScale((s) => Math.max(s - 0.25, 0.5))} className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900/80 text-xs font-medium text-white backdrop-blur-sm transition-all hover:bg-zinc-900 active:scale-95 dark:bg-zinc-100/80 dark:text-zinc-900 dark:hover:bg-zinc-100">-</button>
          <button onClick={handleReset} className="inline-flex h-7 items-center justify-center rounded-lg bg-zinc-900/80 px-2 text-[10px] font-medium text-white backdrop-blur-sm transition-all hover:bg-zinc-900 active:scale-95 dark:bg-zinc-100/80 dark:text-zinc-900 dark:hover:bg-zinc-100">Reset</button>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2">
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{scale.toFixed(1)}x</span>
        <span className="text-zinc-300 dark:text-zinc-600">·</span>
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">({Math.round(position.x)}, {Math.round(position.y)})</span>
      </div>
    </div>
  );
}

export function PanMinimap() {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale((prev) => Math.min(Math.max(prev + delta, 0.5), 4));
  }, []);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    isDragging.current = true;
    lastPos.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  }, [position]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;
    setPosition({ x: e.clientX - lastPos.current.x, y: e.clientY - lastPos.current.y });
  }, []);

  const handleMouseUp = useCallback(() => { isDragging.current = false; }, []);

  return (
    <div className="flex flex-col gap-3">
      <div onWheel={handleWheel} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} className="relative h-48 cursor-grab overflow-hidden rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-100 to-zinc-200 shadow-sm active:cursor-grabbing dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-700">
        <div className="absolute inset-0 flex items-center justify-center" style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`, transition: isDragging.current ? "none" : "transform 0.1s ease-out" }}>
          <div className="flex flex-col items-center gap-2 text-zinc-500 dark:text-zinc-400">
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 6.75V15m6-6v8.25m.503 2.499l1.25-1.5 1.25 1.5m-1.5 0l1.5-1.25-1.5-1.25M3 3.75v16.5h18V3.75M3 3.75h18" /></svg>
            <span className="text-xs font-medium">Pan with minimap</span>
          </div>
        </div>
        <div className="absolute right-2 top-2 h-16 w-20 overflow-hidden rounded-lg border border-zinc-300 bg-white/80 backdrop-blur-sm dark:border-zinc-600 dark:bg-zinc-900/80">
          <div className="absolute h-2 w-2 rounded-full bg-zinc-900 dark:bg-zinc-100" style={{ left: `${50 + (position.x / 4) * 50}%`, top: `${50 + (position.y / 4) * 50}%`, transform: "translate(-50%, -50%)" }} />
        </div>
        <div className="absolute bottom-2 right-2 flex gap-1">
          <button onClick={() => setScale((s) => Math.min(s + 0.25, 4))} className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900/80 text-xs font-medium text-white backdrop-blur-sm transition-all hover:bg-zinc-900 active:scale-95 dark:bg-zinc-100/80 dark:text-zinc-900 dark:hover:bg-zinc-100">+</button>
          <button onClick={() => setScale((s) => Math.max(s - 0.25, 0.5))} className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900/80 text-xs font-medium text-white backdrop-blur-sm transition-all hover:bg-zinc-900 active:scale-95 dark:bg-zinc-100/80 dark:text-zinc-900 dark:hover:bg-zinc-100">-</button>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2">
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{scale.toFixed(1)}x</span>
        <span className="text-zinc-300 dark:text-zinc-600">·</span>
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">({Math.round(position.x)}, {Math.round(position.y)})</span>
      </div>
    </div>
  );
}

export function PanWithControls() {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale((prev) => Math.min(Math.max(prev + delta, 0.5), 4));
  }, []);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    isDragging.current = true;
    lastPos.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  }, [position]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;
    setPosition({ x: e.clientX - lastPos.current.x, y: e.clientY - lastPos.current.y });
  }, []);

  const handleMouseUp = useCallback(() => { isDragging.current = false; }, []);

  const handleReset = useCallback(() => { setScale(1); setPosition({ x: 0, y: 0 }); }, []);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <button onClick={() => setScale((s) => Math.max(s - 0.25, 0.5))} className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition-all hover:bg-zinc-100 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
          </button>
          <span className="min-w-[3rem] text-center text-xs font-medium text-zinc-500 dark:text-zinc-400">{scale.toFixed(1)}x</span>
          <button onClick={() => setScale((s) => Math.min(s + 0.25, 4))} className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition-all hover:bg-zinc-100 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          </button>
        </div>
        <button onClick={handleReset} className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white transition-all hover:bg-zinc-800 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          Reset
        </button>
      </div>
      <div onWheel={handleWheel} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} className="relative h-48 cursor-grab overflow-hidden rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-100 to-zinc-200 shadow-sm active:cursor-grabbing dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-700">
        <div className="absolute inset-0 flex items-center justify-center" style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`, transition: isDragging.current ? "none" : "transform 0.1s ease-out" }}>
          <div className="flex flex-col items-center gap-2 text-zinc-500 dark:text-zinc-400">
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
            <span className="text-xs font-medium">External controls</span>
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-zinc-500 dark:text-zinc-400">Position: ({Math.round(position.x)}, {Math.round(position.y)})</div>
    </div>
  );
}
