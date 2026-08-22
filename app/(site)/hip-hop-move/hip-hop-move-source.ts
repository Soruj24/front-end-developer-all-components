export const HIP_HOP_MOVE_SOURCE = `"use client";

import { useState, useEffect } from "react";

interface HipHopMoveProps {
  variant?: "bounce" | "wave" | "pop" | "lock";
  size?: number;
  className?: string;
}

export function HipHopMove({ variant = "bounce", size = 80, className = "" }: HipHopMoveProps) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setFrame((f) => (f >= 3 ? 0 : f + 1)), 200);
    return () => clearInterval(interval);
  }, []);

  const moves: Record<string, number[]> = {
    bounce: [0, -8, 0, -4],
    wave: [0, -5, 0, 5],
    pop: [0, 0, -10, 0],
    lock: [0, 0, 0, -8],
  };

  const offsets = moves[variant] || moves.bounce;

  return (
    <div className={\`relative \${className}\`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <circle cx="50" cy="20" r="10" fill="currentColor" className="text-zinc-900 dark:text-zinc-100" />
        <line x1="50" y1="30" x2="50" y2="55" stroke="currentColor" strokeWidth="3" className="text-zinc-900 dark:text-zinc-100" />
        <line x1="50" y1="35" x2={30 + offsets[frame] * 0.5} y2={45 + offsets[frame]} stroke="currentColor" strokeWidth="2" className="text-zinc-900 dark:text-zinc-100" />
        <line x1="50" y1="35" x2={70 - offsets[frame] * 0.5} y2={45 + offsets[frame]} stroke="currentColor" strokeWidth="2" className="text-zinc-900 dark:text-zinc-100" />
        <line x1="50" y1="55" x2={35 + offsets[frame] * 0.3} y2={80 + Math.abs(offsets[frame]) * 0.5} stroke="currentColor" strokeWidth="2" className="text-zinc-900 dark:text-zinc-100" />
        <line x1="50" y1="55" x2={65 - offsets[frame] * 0.3} y2={80 + Math.abs(offsets[frame]) * 0.5} stroke="currentColor" strokeWidth="2" className="text-zinc-900 dark:text-zinc-100" />
      </svg>
    </div>
  );
}`;
