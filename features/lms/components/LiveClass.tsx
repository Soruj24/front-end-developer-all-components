export function LiveClass() {
  return (
    <div className="rounded-2xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
      <h3 className="mb-3 text-sm font-semibold text-foreground">Live Class</h3>
      <div className="mb-3 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
        <span className="text-xs font-medium text-red-600 dark:text-red-400">LIVE NOW</span>
      </div>
      <p className="text-sm font-medium text-foreground">React Hooks Deep Dive</p>
      <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">Sarah Chen · 45 min</p>
      <button className="mt-3 w-full rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700">Join Live</button>
    </div>
  );
}
