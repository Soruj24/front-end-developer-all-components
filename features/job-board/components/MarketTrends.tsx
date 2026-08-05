export function MarketTrends() {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
      <h3 className="mb-4 text-lg font-semibold text-foreground">Job Market Trends</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-emerald-50 p-4 dark:bg-emerald-900/20">
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">+12%</p>
          <p className="text-sm text-muted-foreground">Tech job growth</p>
          <p className="mt-1 text-xs text-muted-foreground">vs last quarter</p>
        </div>
        <div className="rounded-xl bg-blue-50 p-4 dark:bg-blue-900/20">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">4.2 days</p>
          <p className="text-sm text-muted-foreground">Avg. time to hire</p>
          <p className="mt-1 text-xs text-muted-foreground">Down from 5.8 days</p>
        </div>
        <div className="rounded-xl bg-amber-50 p-4 dark:bg-amber-900/20">
          <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">68%</p>
          <p className="text-sm text-muted-foreground">Remote-friendly roles</p>
          <p className="mt-1 text-xs text-muted-foreground">Up from 52%</p>
        </div>
      </div>
    </div>
  );
}
