"use client";

export function OrbitPath() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative h-16 w-64 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900">
        <div className="absolute inset-x-4 bottom-1/2 h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-zinc-600" />
        <div
          className="absolute bottom-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-blue-500 shadow-md shadow-blue-500/40"
          style={{ animation: "moveX 3s linear infinite", left: "16px" }}
        />
        <div className="absolute left-4 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-zinc-400 dark:bg-zinc-500" />
        <div className="absolute right-4 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-zinc-400 dark:bg-zinc-500" />
      </div>
    </div>
  );
}
