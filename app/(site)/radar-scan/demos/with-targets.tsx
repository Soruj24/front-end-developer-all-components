"use client";

export function WithTargets() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative h-32 w-32">
        <div className="absolute inset-0 rounded-full border border-zinc-200 dark:border-zinc-700" />
        <div className="absolute inset-4 rounded-full border border-zinc-200 dark:border-zinc-700" />
        <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-900 dark:bg-zinc-100" />
        <div className="absolute left-1/2 top-0 h-1/2 w-0.5 origin-bottom -translate-x-1/2 bg-gradient-to-t from-zinc-900 to-transparent dark:from-zinc-100 animate-spin" style={{ animationDuration: "3s" }} />
        <div className="absolute left-[30%] top-[25%] h-2 w-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50 animate-pulse" />
        <div className="absolute right-[20%] top-[40%] h-2 w-2 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50 animate-pulse" />
        <div className="absolute bottom-[30%] left-[60%] h-2 w-2 rounded-full bg-red-500 shadow-lg shadow-red-500/50 animate-pulse" />
      </div>
    </div>
  );
}
