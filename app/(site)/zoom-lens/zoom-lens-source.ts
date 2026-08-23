export const ZOOM_LENS_SOURCE = `"use client";

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
    <div ref={ref} onMouseMove={handleMove} className="group relative cursor-crosshair overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-xl" style={{ left: \`calc(\${pos.x}% - 64px)\`, top: \`calc(\${pos.y}% - 64px)\` }}>
          <div className="h-full w-full scale-[2] bg-gradient-to-br from-blue-500 to-violet-500" style={{ backgroundPosition: \`\${pos.x}% \${pos.y}%\` }} />
        </div>
      </div>
    </div>
  );
}`;
