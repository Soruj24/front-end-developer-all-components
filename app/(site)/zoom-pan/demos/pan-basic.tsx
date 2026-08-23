"use client";

import { useState, useCallback, useRef, WheelEvent, MouseEvent } from "react";

export function BasicPan() {
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

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleReset = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div onWheel={handleWheel} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} className="relative h-48 cursor-grab overflow-hidden rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-100 to-zinc-200 shadow-sm active:cursor-grabbing dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-700">
        <div className="absolute inset-0 flex items-center justify-center" style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`, transition: isDragging.current ? "none" : "transform 0.1s ease-out" }}>
          <div className="flex flex-col items-center gap-2 text-zinc-500 dark:text-zinc-400">
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
            <span className="text-xs font-medium">Drag to pan</span>
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

export function PanBounds() {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const bounds = { x: 100, y: 80 };

  const clamp = useCallback((val: number, max: number) => Math.min(Math.max(val, -max), max), []);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale((prev) => Math.min(Math.max(prev + delta, 0.5), 3));
  }, []);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    isDragging.current = true;
    lastPos.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  }, [position]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;
    setPosition({ x: clamp(e.clientX - lastPos.current.x, bounds.x), y: clamp(e.clientY - lastPos.current.y, bounds.y) });
  }, [clamp]);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleReset = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div onWheel={handleWheel} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} className="relative h-48 cursor-grab overflow-hidden rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-100 to-zinc-200 shadow-sm active:cursor-grabbing dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-700">
        <div className="absolute inset-0 flex items-center justify-center" style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`, transition: isDragging.current ? "none" : "transform 0.1s ease-out" }}>
          <div className="flex flex-col items-center gap-2 text-zinc-500 dark:text-zinc-400">
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>
            <span className="text-xs font-medium">Bounded pan</span>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 flex gap-1">
          <button onClick={() => setScale((s) => Math.min(s + 0.25, 3))} className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900/80 text-xs font-medium text-white backdrop-blur-sm transition-all hover:bg-zinc-900 active:scale-95 dark:bg-zinc-100/80 dark:text-zinc-900 dark:hover:bg-zinc-100">+</button>
          <button onClick={() => setScale((s) => Math.max(s - 0.25, 0.5))} className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900/80 text-xs font-medium text-white backdrop-blur-sm transition-all hover:bg-zinc-900 active:scale-95 dark:bg-zinc-100/80 dark:text-zinc-900 dark:hover:bg-zinc-100">-</button>
          <button onClick={handleReset} className="inline-flex h-7 items-center justify-center rounded-lg bg-zinc-900/80 px-2 text-[10px] font-medium text-white backdrop-blur-sm transition-all hover:bg-zinc-900 active:scale-95 dark:bg-zinc-100/80 dark:text-zinc-900 dark:hover:bg-zinc-100">Reset</button>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2">
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Bounds: ±{bounds.x}px</span>
      </div>
    </div>
  );
}
