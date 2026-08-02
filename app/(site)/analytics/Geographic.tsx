"use client";

import { regions } from "./data";

export function GeographicSection() {
  return (
    <div className="rounded-xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
      <h2 className="mb-5 text-lg font-semibold text-foreground">Geographic Distribution</h2>
      <div className="relative mb-5 flex h-48 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-800/30 dark:to-zinc-900/30">
        <svg className="h-full w-full p-4 opacity-20 dark:opacity-10" viewBox="0 0 380 200" fill="none" stroke="currentColor" strokeWidth="0.5">
          <path d="M20,95 L40,85 L60,90 L70,80 L90,75 L100,80 L110,70 L130,72 L140,65 L160,68 L170,60 L180,65 L195,55 L210,58 L220,50 L235,52 L250,45 L260,50 L270,42 L280,48 L290,38 L300,42 L310,35 L320,40 L330,32 L340,38 L350,30 L355,40 L340,50 L330,55 L320,60 L310,58 L300,65 L290,62 L280,70 L270,68 L260,75 L250,72 L240,78 L230,75 L220,82 L210,80 L200,88 L190,85 L180,92 L170,88 L160,95 L150,92 L140,98 L130,95 L120,102 L110,98 L100,105 L90,100 L80,108 L70,102 L60,110 L50,105 L40,112 L30,105 L20,110 Z" />
          <path d="M60,120 L75,115 L90,122 L105,118 L120,125 L135,120 L150,128 L165,122 L180,130 L195,125 L210,132 L225,128 L240,135 L255,130 L270,138 L285,132 L300,140 L290,145 L275,142 L260,148 L245,142 L230,150 L215,145 L200,152 L185,148 L170,155 L155,150 L140,158 L125,152 L110,158 L95,152 L80,160 L65,155 L50,162 L35,155 L20,162 L15,155 L30,148 L45,142 L55,138 L50,130 L55,125 Z" />
          <path d="M140,40 L145,35 L155,38 L160,32 L170,36 L175,30 L185,34 L190,28 L200,32 L195,38 L185,42 L175,40 L165,44 L155,42 Z" />
          <ellipse cx="310" cy="140" rx="25" ry="15" />
          <ellipse cx="350" cy="130" rx="10" ry="8" />
          <circle cx="95" cy="155" r="4" />
          <circle cx="110" cy="165" r="3" />
          <circle cx="130" cy="175" r="5" />
          <path d="M200,40 L210,30 L220,35 L225,25 L235,30 L240,20 L250,28 L245,38 L235,42 L225,38 L215,44 Z" />
          <path d="M70,75 L80,65 L90,70 L95,60 L105,65 L100,75 L90,78 L80,75 Z" />
          <rect x="250" y="100" width="20" height="15" rx="3" />
          <rect x="120" y="45" width="12" height="8" rx="2" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-lg bg-white/80 px-4 py-2 text-center text-xs font-medium text-muted-foreground shadow-sm backdrop-blur dark:bg-zinc-900/80 dark:text-muted-foreground/70">
            Global Traffic Map
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        {regions.map((r) => (
          <div key={r.name} className="flex items-center gap-3">
            <span className="w-20 text-sm font-medium text-muted-foreground">{r.name}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted dark:bg-muted">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${r.pct}%`, background: "linear-gradient(to right, #3b82f6, #60a5fa)" }}
              />
            </div>
            <span className="w-12 text-right text-sm text-muted-foreground">{r.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
