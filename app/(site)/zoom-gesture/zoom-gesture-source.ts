export const ZOOM_GESTURE_SOURCE = `"use client";

import { useState, useCallback, WheelEvent } from "react";

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
        <div className="flex flex-col items-center gap-2 text-zinc-500 dark:text-zinc-400" style={{ transform: \`scale(\${scale})\`, transition: "transform 0.1s ease-out" }}>
          <span className="text-xs font-medium">Scroll to zoom</span>
        </div>
      </div>
    </div>
  );
}`;
