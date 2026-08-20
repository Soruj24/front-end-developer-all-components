"use client";

import { cn } from "@/lib/cn";
import type { BackgroundPatternsProps, PatternId } from "./BackgroundPatterns.types";

const PATTERNS: Record<PatternId, (c: string, s: number) => string> = {
  dots: (c, s) =>
    `<circle cx="${s / 2}" cy="${s / 2}" r="1.5" fill="${c}" />`,
  grid: (c, s) =>
    `<path d="M ${s} 0 L 0 0 0 ${s}" fill="none" stroke="${c}" stroke-width="0.5" />`,
  diagonal: (c) =>
    `<path d="M 0 10 L 10 0 M -2 2 L 2 -2 M 8 12 L 12 8" stroke="${c}" stroke-width="0.5" />`,
  waves: (c) =>
    `<path d="M 0 10 Q 5 5 10 10 T 20 10" fill="none" stroke="${c}" stroke-width="0.5" />`,
  hexagons: (c) =>
    `<path d="M10 0 L18 5 L18 15 L10 20 L2 15 L2 5 Z" fill="none" stroke="${c}" stroke-width="0.5" />`,
  triangles: (c) =>
    `<path d="M10 2 L18 18 L2 18 Z" fill="none" stroke="${c}" stroke-width="0.5" />`,
  circles: (c) =>
    `<circle cx="10" cy="10" r="8" fill="none" stroke="${c}" stroke-width="0.5" />`,
  diamonds: (c) =>
    `<path d="M10 0 L20 10 L10 20 L0 10 Z" fill="none" stroke="${c}" stroke-width="0.5" />`,
  stars: (c) =>
    `<path d="M10 1 L12.5 7.5 L19 7.5 L13.5 12 L15.5 19 L10 14.5 L4.5 19 L6.5 12 L1 7.5 L7.5 7.5 Z" fill="none" stroke="${c}" stroke-width="0.5" />`,
  crosses: (c) =>
    `<path d="M8 4 L12 4 L12 8 L16 8 L16 12 L12 12 L12 16 L8 16 L8 12 L4 12 L4 8 L8 8 Z" fill="none" stroke="${c}" stroke-width="0.5" />`,
  zigzag: (c) =>
    `<path d="M0 5 L5 0 L10 5 L15 0 L20 5" fill="none" stroke="${c}" stroke-width="0.5" />`,
  checks: (c) =>
    `<path d="M0 0 H10 V10 H0 Z M10 10 H20 V20 H10 Z" fill="none" stroke="${c}" stroke-width="0.5" />`,
  halftone: (c) =>
    `<circle cx="5" cy="5" r="1" fill="${c}" /><circle cx="15" cy="15" r="1.5" fill="${c}" /><circle cx="15" cy="5" r="0.8" fill="${c}" /><circle cx="5" cy="15" r="1.2" fill="${c}" />`,
  noise: (c) =>
    `<rect x="2" y="3" width="1" height="1" fill="${c}" opacity="0.5" /><rect x="8" y="1" width="1" height="1" fill="${c}" opacity="0.3" /><rect x="14" y="6" width="1" height="1" fill="${c}" opacity="0.6" /><rect x="4" y="12" width="1" height="1" fill="${c}" opacity="0.4" /><rect x="11" y="14" width="1" height="1" fill="${c}" opacity="0.5" /><rect x="17" y="10" width="1" height="1" fill="${c}" opacity="0.3" />`,
  circuit: (c) =>
    `<path d="M0 10 H8 M12 10 H20 M10 0 V8 M10 12 V20 M8 8 H12 V12 H8 Z" fill="none" stroke="${c}" stroke-width="0.5" /><circle cx="10" cy="10" r="1.5" fill="${c}" />`,
  plus: (c) =>
    `<path d="M8 4 L12 4 L12 8 L16 8 L16 12 L12 12 L12 16 L8 16 L8 12 L4 12 L4 8 L8 8 Z" fill="${c}" opacity="0.15" />`,
};

export function BackgroundPatterns({
  variant = "dots",
  color = "#6366f1",
  size = 20,
  opacity = 1,
  className,
}: BackgroundPatternsProps) {
  const render = PATTERNS[variant] ?? PATTERNS.dots;
  const patternId = `${variant}-${color}-${size}`;

  return (
    <svg
      className={cn("h-full w-full", className)}
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={patternId}
          width={size}
          height={size}
          patternUnits="userSpaceOnUse"
          dangerouslySetInnerHTML={{ __html: render(color, size) }}
        />
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
