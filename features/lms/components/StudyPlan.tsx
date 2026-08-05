export function StudyPlan() {
  return (
    <div className="rounded-2xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
      <h3 className="mb-3 text-sm font-semibold text-foreground">Study Plan</h3>
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between"><span className="text-muted-foreground">Daily goal</span><span className="font-medium text-foreground">2 hours</span></div>
        <div className="flex items-center justify-between"><span className="text-muted-foreground">This week</span><span className="font-medium text-green-600 dark:text-green-400">9.5 hrs</span></div>
        <div className="flex items-center justify-between"><span className="text-muted-foreground">Streak</span><span className="font-medium text-amber-600 dark:text-amber-400">7 days 🔥</span></div>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
        <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-green-400 to-green-500" />
      </div>
    </div>
  );
}
