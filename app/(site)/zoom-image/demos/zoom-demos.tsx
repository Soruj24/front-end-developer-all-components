"use client";

import { useState, useRef, MouseEvent } from "react";
import { ZoomIn, ZoomOut, Maximize2, Eye } from "lucide-react";

export function BasicZoom() {
  return (
    <div className="group relative mx-auto max-w-sm overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-zinc-400 dark:text-zinc-500">
            <ZoomIn className="h-8 w-8 transition-transform duration-500 group-hover:scale-150" />
            <span className="text-xs font-medium">Hover to zoom</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-2 right-2 rounded-full bg-zinc-900/80 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 dark:bg-white/80 dark:text-zinc-900">
        2x zoom
      </div>
    </div>
  );
}

export function ZoomLevels() {
  const [zoom, setZoom] = useState(2);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-1.5">
        {[1.5, 2, 3, 4].map((z) => (
          <button key={z} onClick={() => setZoom(z)} className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${zoom === z ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"}`}>
            {z}x
          </button>
        ))}
      </div>
      <div className="group relative mx-auto max-w-sm overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2 text-zinc-400 dark:text-zinc-500">
              <ZoomIn className="h-8 w-8 transition-transform duration-500 group-hover:scale-150" />
              <span className="text-xs font-medium">{zoom}x zoom</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 rounded-full bg-zinc-900/80 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 dark:bg-white/80 dark:text-zinc-900">
          {zoom}x zoom
        </div>
      </div>
    </div>
  );
}

export function ZoomLens() {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
  };

  return (
    <div className="flex justify-center">
      <div ref={containerRef} className="group relative mx-auto max-w-sm overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900" onMouseMove={handleMouseMove} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2 text-zinc-400 dark:text-zinc-500">
              <Eye className="h-8 w-8 transition-transform duration-500 group-hover:scale-150" />
              <span className="text-xs font-medium">Lens zoom</span>
            </div>
          </div>
          {isHovering && (
            <div className="absolute h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/50 bg-zinc-900/20 backdrop-blur-sm transition-all duration-100 dark:bg-white/20" style={{ left: `${position.x}%`, top: `${position.y}%` }} />
          )}
        </div>
        <div className="absolute bottom-2 right-2 rounded-full bg-zinc-900/80 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 dark:bg-white/80 dark:text-zinc-900">
          Lens
        </div>
      </div>
    </div>
  );
}

export function ZoomWindow() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="flex justify-center">
      <div className="group relative mx-auto max-w-sm overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2 text-zinc-400 dark:text-zinc-500">
              <Maximize2 className="h-8 w-8 transition-transform duration-500 group-hover:scale-150" />
              <span className="text-xs font-medium">Window zoom</span>
            </div>
          </div>
        </div>
        {isHovering && (
          <div className="absolute -right-4 -top-4 h-24 w-24 overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900" style={{ transform: "scale(2)" }}>
            <div className="h-full w-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700" />
          </div>
        )}
        <div className="absolute bottom-2 right-2 rounded-full bg-zinc-900/80 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 dark:bg-white/80 dark:text-zinc-900">
          Window
        </div>
      </div>
    </div>
  );
}

export function ZoomWithControls() {
  const [zoom, setZoom] = useState(2);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <button onClick={() => setZoom(Math.max(1, zoom - 0.5))} className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition-all hover:bg-zinc-100 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800">
          <ZoomOut className="h-3.5 w-3.5" />
        </button>
        <span className="min-w-[3rem] text-center text-xs font-medium text-zinc-500 dark:text-zinc-400">{zoom}x</span>
        <button onClick={() => setZoom(Math.min(5, zoom + 0.5))} className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition-all hover:bg-zinc-100 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800">
          <ZoomIn className="h-3.5 w-3.5" />
        </button>
      </div>
      <div ref={containerRef} className="group relative mx-auto max-w-sm overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900" onMouseMove={handleMouseMove}>
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2 text-zinc-400 dark:text-zinc-500">
              <ZoomIn className="h-8 w-8 transition-transform duration-500 group-hover:scale-150" />
              <span className="text-xs font-medium">Controlled zoom</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 rounded-full bg-zinc-900/80 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm transition-opacity duration-200 dark:bg-white/80 dark:text-zinc-900">
          {zoom}x at ({Math.round(position.x)}%, {Math.round(position.y)}%)
        </div>
      </div>
    </div>
  );
}
