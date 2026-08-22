"use client";

export function MultipleOrbits() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative h-48 w-48">
        <div className="absolute inset-0 rounded-full border border-zinc-200 dark:border-zinc-700" />
        <div className="absolute inset-6 rounded-full border border-zinc-200/60 dark:border-zinc-700/60" />
        <div className="absolute inset-12 rounded-full border border-zinc-200/30 dark:border-zinc-700/30" />
        <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-900 shadow-lg dark:bg-zinc-100" />
        <div
          className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 shadow-md shadow-blue-500/30"
          style={{ animation: "spin 4s linear infinite" }}
        />
        <div
          className="absolute left-[85%] top-[30%] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500 shadow-md shadow-emerald-500/30"
          style={{ animation: "spin 6s linear infinite" }}
        />
        <div
          className="absolute left-[15%] top-[70%] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500 shadow-md shadow-amber-500/30"
          style={{ animation: "spin 8s linear infinite reverse" }}
        />
      </div>
    </div>
  );
}
