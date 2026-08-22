"use client";

import { useState } from "react";

interface Satellite {
  id: string;
  name: string;
  color: string;
  orbit: number;
  speed: number;
  angle: number;
}

const SATELLITES: Satellite[] = [
  { id: "sat-1", name: "Alpha-1", color: "bg-blue-500", orbit: 0, speed: 4, angle: 0 },
  { id: "sat-2", name: "Beta-2", color: "bg-emerald-500", orbit: 1, speed: 6, angle: 120 },
  { id: "sat-3", name: "Gamma-3", color: "bg-amber-500", orbit: 2, speed: 8, angle: 240 },
];

export function SatelliteInfo() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative h-48 w-48">
        <div className="absolute inset-0 rounded-full border border-zinc-200 dark:border-zinc-700" />
        <div className="absolute inset-6 rounded-full border border-zinc-200/60 dark:border-zinc-700/60" />
        <div className="absolute inset-12 rounded-full border border-zinc-200/30 dark:border-zinc-700/30" />
        <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-900 shadow-lg dark:bg-zinc-100" />

        {SATELLITES.map((sat) => {
          const radius = [72, 54, 36][sat.orbit];
          const size = [10, 8, 7][sat.orbit];
          return (
            <button
              key={sat.id}
              className={`absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full ${sat.color} shadow-md transition-transform hover:scale-150 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 dark:focus:ring-zinc-500`}
              style={{
                width: size,
                height: size,
                animation: `spin ${sat.speed}s linear infinite`,
                animationDelay: `${-sat.angle / 360 * sat.speed}s`,
              }}
              onMouseEnter={() => setHovered(sat.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(sat.id)}
              onBlur={() => setHovered(null)}
              aria-label={sat.name}
            >
              <span className="sr-only">{sat.name}</span>
            </button>
          );
        })}

        {hovered && (
          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-zinc-200 bg-white px-3 py-2 shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
            <p className="whitespace-nowrap text-xs font-semibold text-zinc-900 dark:text-zinc-100">
              {SATELLITES.find((s) => s.id === hovered)?.name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
