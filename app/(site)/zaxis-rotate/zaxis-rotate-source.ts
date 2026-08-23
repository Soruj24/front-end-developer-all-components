export const ZAXIS_ROTATE_SOURCE = `"use client";

export function BasicRotate() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div className="flex items-center justify-center gap-6 py-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 font-mono text-sm font-bold text-white shadow-lg" style={{ animation: "spin 3s linear infinite" }}>Z</div>
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 font-mono text-sm font-bold text-white shadow-lg" style={{ animation: "spin 2s linear infinite reverse" }}>Z</div>
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 font-mono text-sm font-bold text-white shadow-lg" style={{ animation: "spin 4s linear infinite" }}>Z</div>
      </div>
      <style>{\`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }\`}</style>
    </div>
  );
}`;
