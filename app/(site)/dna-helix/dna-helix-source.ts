export const DNA_HELIX_SOURCE = `"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";

export interface DNAHelixProps {
  numPairs?: number;
  amplitude?: number;
  spacing?: number;
  color1?: string;
  color2?: string;
  size?: number;
  showLabels?: boolean;
  paused?: boolean;
  intervalMs?: number;
  className?: string;
  ariaLabel?: string;
}

const BASES = ["A", "T", "C", "G"];

const subscribeNever = () => () => {};

export function DNAHelix({
  numPairs = 12,
  amplitude = 30,
  spacing = 20,
  color1 = "fill-primary",
  color2 = "fill-purple-500",
  size = 6,
  showLabels = false,
  paused = false,
  intervalMs = 30,
  className,
  ariaLabel = "Animated DNA double helix visualization",
}: DNAHelixProps) {
  const [prefersReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const ready = useSyncExternalStore(subscribeNever, () => true, () => false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!ready || paused || prefersReducedMotion) return;
    const id = setInterval(() => setOffset((o) => o + 0.1), intervalMs);
    return () => clearInterval(id);
  }, [ready, paused, prefersReducedMotion, intervalMs]);

  const animOffset = ready ? offset : 0;
  const height = numPairs * spacing + 10;

  return (
    <svg
      viewBox={\`0 0 160 \${height}\`}
      role="img"
      aria-label={ariaLabel}
      className={cn("h-64 w-full max-w-xs", className)}
    >
      {[...Array(numPairs)].map((_, i) => {
        const y = i * spacing + 5;
        const phase = animOffset + i * 0.5;
        // Quantized to 2 decimals: Math.sin/cos can differ by 1 ulp across
        // runtimes (Node SSR vs browser), which would break hydration.
        const x1 = Math.round((80 + amplitude * Math.sin(phase)) * 100) / 100;
        const x2 = Math.round((80 - amplitude * Math.sin(phase)) * 100) / 100;
        const z = Math.cos(phase);
        const r1 = Math.round((size + z * 2) * 100) / 100;
        const r2 = Math.round((size - z * 2) * 100) / 100;
        const o1 = Math.round((0.6 + z * 0.4) * 100) / 100;
        const o2 = Math.round((0.6 - z * 0.4) * 100) / 100;
        return (
          <g key={i}>
            <line
              x1={x1}
              y1={y}
              x2={x2}
              y2={y}
              stroke="currentColor"
              strokeWidth="1"
              className="text-border"
              opacity={0.4}
            />
            <circle cx={x1} cy={y} r={r1} className={color1} opacity={o1} />
            <circle cx={x2} cy={y} r={r2} className={color2} opacity={o2} />
            {showLabels && (
              <>
                <text x={x1} y={y + 2} textAnchor="middle" className="fill-white text-[6px] font-bold">
                  {BASES[i % 4]}
                </text>
                <text x={x2} y={y + 2} textAnchor="middle" className="fill-white text-[6px] font-bold">
                  {BASES[(i + 2) % 4]}
                </text>
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export default DNAHelix;
`;
