export function MarketTrends() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-white">Job Market Trends</h3>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg bg-emerald-50 p-4 dark:bg-emerald-950/30">
          <p className="text-2xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">+12%</p>
          <p className="mt-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">Tech job growth</p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">vs last quarter</p>
        </div>
        <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-950/30">
          <p className="text-2xl font-bold tabular-nums text-blue-600 dark:text-blue-400">4.2 days</p>
          <p className="mt-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">Avg. time to hire</p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">Down from 5.8 days</p>
        </div>
        <div className="rounded-lg bg-amber-50 p-4 dark:bg-amber-950/30">
          <p className="text-2xl font-bold tabular-nums text-amber-600 dark:text-amber-400">68%</p>
          <p className="mt-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">Remote-friendly roles</p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">Up from 52%</p>
        </div>
      </div>
    </div>
  );
}
