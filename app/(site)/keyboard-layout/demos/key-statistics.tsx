"use client";

export function KeyStatisticsDemo() {
  const keys = [
    { key: "E", usage: 12.7, color: "bg-blue-500" },
    { key: "T", usage: 9.1, color: "bg-blue-400" },
    { key: "A", usage: 8.2, color: "bg-blue-400" },
    { key: "Space", usage: 7.8, color: "bg-emerald-500" },
    { key: "S", usage: 6.3, color: "bg-blue-300" },
    { key: "O", usage: 6.1, color: "bg-blue-300" },
    { key: "I", usage: 5.9, color: "bg-blue-300" },
    { key: "N", usage: 5.7, color: "bg-blue-300" },
  ];

  return (
    <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <h4 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Most Used Keys</h4>
      <div className="space-y-2">
        {keys.map((k) => (
          <div key={k.key} className="flex items-center gap-2">
            <kbd className="flex h-7 w-10 items-center justify-center rounded-md border border-zinc-200 bg-zinc-100 font-mono text-[10px] font-bold text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
              {k.key}
            </kbd>
            <div className="flex-1 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
              <div className={`h-2 rounded-full ${k.color}`} style={{ width: `${k.usage * 7}%` }} />
            </div>
            <span className="w-10 text-right text-[10px] font-medium tabular-nums text-zinc-500 dark:text-zinc-400">
              {k.usage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
