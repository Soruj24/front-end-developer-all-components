export const ZAXIS_SCALE_SOURCE = `"use client";

export function BasicScale() {
  return (
    <div className="flex items-center justify-center gap-4 py-4">
      {[0.6, 0.8, 1, 1.2, 1.4].map((s, i) => (
        <div key={i} className="flex h-14 w-14 items-center justify-center rounded-xl border border-zinc-200 bg-white text-xs font-semibold text-zinc-600 shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400" style={{ transform: \`scale(\${s})\`, opacity: 0.4 + i * 0.15 }}>
          {(s * 100).toFixed(0)}%
        </div>
      ))}
    </div>
  );
}`;
