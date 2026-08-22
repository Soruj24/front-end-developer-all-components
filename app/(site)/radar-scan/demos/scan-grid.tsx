"use client";

export function ScanGrid() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="grid grid-cols-3 gap-2">
        {Array(9).fill(0).map((_, i) => (
          <div
            key={i}
            className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all ${
              i === 4
                ? "border-zinc-400 bg-zinc-100 dark:border-zinc-500 dark:bg-zinc-800"
                : "border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"
            }`}
          >
            {i === 1 && <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50" />}
            {i === 7 && <div className="h-2 w-2 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50" />}
          </div>
        ))}
      </div>
    </div>
  );
}
