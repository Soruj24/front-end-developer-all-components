"use client";

export function BentoGridHero() {
  return (
    <div className="rounded-xl border border-border bg-background p-6 dark:border-border">
      <div className="mb-6">
        <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">Bento Grid</span>
        <h2 className="mt-3 text-3xl font-bold tracking-tight">Modular <span className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">bento layout</span></h2>
        <p className="mt-2 max-w-lg text-muted-foreground">Asymmetric grid layouts for dynamic, magazine-style hero sections.</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2 row-span-2 flex min-h-[200px] items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 p-6 text-white">
          <div className="text-center">
            <p className="text-5xl font-bold">10x</p>
            <p className="mt-1 text-sm text-white/80">Faster Development</p>
          </div>
        </div>
        <div className="flex min-h-[96px] items-center justify-center rounded-xl bg-zinc-900 p-4 text-white dark:bg-zinc-800">
          <p className="text-sm font-medium">Ship in Hours</p>
        </div>
        <div className="flex min-h-[96px] items-center justify-center rounded-xl bg-zinc-100 p-4 dark:bg-zinc-800">
          <p className="text-sm font-medium text-zinc-900 dark:text-white">No Lock-in</p>
        </div>
        <div className="col-span-2 flex min-h-[96px] items-center gap-4 rounded-xl bg-zinc-100 p-4 dark:bg-zinc-800">
          <div className="flex -space-x-2">
            {["A", "B", "C", "D"].map((l, i) => (
              <div key={i} className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-violet-100 text-xs font-bold text-violet-600 dark:border-zinc-800 dark:bg-violet-900/30 dark:text-violet-400">{l}</div>
            ))}
          </div>
          <p className="text-sm font-medium text-zinc-900 dark:text-white">12,000+ developers</p>
        </div>
      </div>
    </div>
  );
}
