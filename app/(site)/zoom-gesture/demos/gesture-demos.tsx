"use client";

import { useState, useCallback, useRef, WheelEvent, MouseEvent } from "react";

export function BasicGesture() {
  const [scale, setScale] = useState(1);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale((prev) => Math.min(Math.max(prev + delta, 0.5), 4));
  }, []);

  return (
    <div className="flex flex-col items-center gap-3">
      <div onWheel={handleWheel} className="flex h-40 w-full max-w-sm cursor-grab items-center justify-center overflow-hidden rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-100 to-zinc-200 shadow-sm active:cursor-grabbing dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-700">
        <div className="flex flex-col items-center gap-2 text-zinc-500 dark:text-zinc-400" style={{ transform: `scale(${scale})`, transition: "transform 0.1s ease-out" }}>
          <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
          <span className="text-xs font-medium">Scroll to zoom</span>
        </div>
      </div>
      <div className="flex gap-1">
        {[0.5, 1, 2, 3, 4].map((z) => (
          <button key={z} onClick={() => setScale(z)} className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${scale === z ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"}`}>
            {z}x
          </button>
        ))}
      </div>
    </div>
  );
}

export function GestureTypes() {
  const [scale, setScale] = useState(1);
  const [gesture, setGesture] = useState<string>("idle");
  const lastTap = useRef<number>(0);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.2 : 0.2;
    setScale((prev) => Math.min(Math.max(prev + delta, 0.5), 4));
    setGesture("scroll");
    setTimeout(() => setGesture("idle"), 1000);
  }, []);

  const handleDoubleClick = useCallback(() => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      setScale(1);
      setGesture("double-tap");
      setTimeout(() => setGesture("idle"), 1000);
    }
    lastTap.current = now;
  }, []);

  return (
    <div className="flex flex-col items-center gap-3">
      <div onWheel={handleWheel} onDoubleClick={handleDoubleClick} className="flex h-40 w-full max-w-sm cursor-grab items-center justify-center overflow-hidden rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-100 to-zinc-200 shadow-sm active:cursor-grabbing dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-700">
        <div className="flex flex-col items-center gap-2 text-zinc-500 dark:text-zinc-400" style={{ transform: `scale(${scale})`, transition: "transform 0.15s ease-out" }}>
          <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" /></svg>
          <span className="text-xs font-medium">Scroll or double-tap</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium transition-all ${gesture === "scroll" ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"}`}>Scroll</span>
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium transition-all ${gesture === "double-tap" ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"}`}>Double-tap</span>
      </div>
      <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{scale.toFixed(1)}x</span>
    </div>
  );
}

export function ZoomBounds() {
  const [scale, setScale] = useState(1);
  const min = 0.5;
  const max = 3;

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.15 : 0.15;
    setScale((prev) => Math.min(Math.max(prev + delta, min), max));
  }, [min, max]);

  const atMin = scale <= min;
  const atMax = scale >= max;

  return (
    <div className="flex flex-col items-center gap-3">
      <div onWheel={handleWheel} className="flex h-40 w-full max-w-sm cursor-grab items-center justify-center overflow-hidden rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-100 to-zinc-200 shadow-sm active:cursor-grabbing dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-700">
        <div className="flex flex-col items-center gap-2 text-zinc-500 dark:text-zinc-400" style={{ transform: `scale(${scale})`, transition: "transform 0.15s ease-out" }}>
          <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>
          <span className="text-xs font-medium">Bounded zoom</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <div className={`h-1.5 w-1.5 rounded-full ${atMin ? "bg-amber-500" : "bg-zinc-300 dark:bg-zinc-600"}`} />
          <span className="text-[10px] text-zinc-500 dark:text-zinc-400">Min {min}x</span>
        </div>
        <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{scale.toFixed(1)}x</span>
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-zinc-500 dark:text-zinc-400">Max {max}x</span>
          <div className={`h-1.5 w-1.5 rounded-full ${atMax ? "bg-amber-500" : "bg-zinc-300 dark:bg-zinc-600"}`} />
        </div>
      </div>
    </div>
  );
}

export function ZoomWithReset() {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.15 : 0.15;
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
    <div className="flex flex-col items-center gap-3">
      <div onWheel={handleWheel} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} className="flex h-40 w-full max-w-sm cursor-grab items-center justify-center overflow-hidden rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-100 to-zinc-200 shadow-sm active:cursor-grabbing dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-700">
        <div className="flex flex-col items-center gap-2 text-zinc-500 dark:text-zinc-400" style={{ transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`, transition: isDragging.current ? "none" : "transform 0.15s ease-out" }}>
          <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" /></svg>
          <span className="text-xs font-medium">Scroll + drag to pan</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={handleReset} className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white transition-all hover:bg-zinc-800 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          Reset
        </button>
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{scale.toFixed(1)}x · ({Math.round(position.x)}, {Math.round(position.y)})</span>
      </div>
    </div>
  );
}

export function ZoomPresets() {
  const [scale, setScale] = useState(1);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.15 : 0.15;
    setScale((prev) => Math.min(Math.max(prev + delta, 0.5), 4));
  }, []);

  return (
    <div className="flex flex-col items-center gap-3">
      <div onWheel={handleWheel} className="flex h-40 w-full max-w-sm cursor-grab items-center justify-center overflow-hidden rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-100 to-zinc-200 shadow-sm active:cursor-grabbing dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-700">
        <div className="flex flex-col items-center gap-2 text-zinc-500 dark:text-zinc-400" style={{ transform: `scale(${scale})`, transition: "transform 0.15s ease-out" }}>
          <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
          <span className="text-xs font-medium">Scroll to zoom</span>
        </div>
      </div>
      <div className="flex gap-1">
        {[0.5, 0.75, 1, 1.5, 2, 3, 4].map((z) => (
          <button key={z} onClick={() => setScale(z)} className={`rounded-lg px-2 py-1 text-[10px] font-medium transition-all ${scale === z ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"}`}>
            {z}x
          </button>
        ))}
      </div>
    </div>
  );
}
