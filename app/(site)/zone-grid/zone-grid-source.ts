export const ZONE_GRID_SOURCE = `"use client";

export function BasicGrid() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {["A", "B", "C", "D", "E", "F"].map((label, i) => (
        <div key={label} className={\`flex items-center justify-center rounded-xl border border-zinc-200 bg-white text-sm font-medium text-zinc-500 shadow-sm transition-all duration-200 hover:border-zinc-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-600 \${i === 0 ? "col-span-2 row-span-2" : ""}\`} style={{ minHeight: i === 0 ? 120 : 60 }}>
          {label}
        </div>
      ))}
    </div>
  );
}`;
