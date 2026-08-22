"use client";

export function BasicOrbit() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative h-36 w-36">
        <div className="absolute inset-0 rounded-full border border-zinc-200 dark:border-zinc-700" />
        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-900 shadow-lg dark:bg-zinc-100" />
        <div
          className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 shadow-md shadow-blue-500/30"
          style={{ animation: "spin 4s linear infinite" }}
        />
        <div className="absolute inset-0 rounded-full border border-dashed border-zinc-300/50 dark:border-zinc-600/50" style={{ animation: "spin 20s linear infinite reverse" }} />
      </div>
    </div>
  );
}
