export const ZOOM_PAN_SOURCE = `"use client";

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

  return (
    <div onWheel={handleWheel} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} className="relative h-48 cursor-grab overflow-hidden rounded-xl border border-zinc-200 bg-gradient-to-br from-zinc-100 to-zinc-200 shadow-sm active:cursor-grabbing dark:border-zinc-700 dark:from-zinc-800 dark:to-zinc-700">
      <div className="absolute inset-0 flex items-center justify-center" style={{ transform: \`translate(\${position.x}px, \${position.y}px) scale(\${scale})\`, transition: isDragging.current ? "none" : "transform 0.1s ease-out" }}>
        <span className="text-xs font-medium text-zinc-500">Drag to pan</span>
      </div>
    </div>
  );
}`;
