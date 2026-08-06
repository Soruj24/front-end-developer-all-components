export function LineChart() {
  return (
    <div className="rounded-xl border border-border p-6 dark:border-border">
      <h2 className="mb-4 text-lg font-semibold">Line Chart</h2>
      <div className="relative h-40 w-full">
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(34,211,238,0.2), transparent)", clipPath: "polygon(0 100%, 5% 70%, 15% 75%, 25% 40%, 35% 55%, 45% 25%, 55% 35%, 65% 15%, 75% 30%, 85% 10%, 95% 20%, 100% 0, 100% 100%)" }} />
        <svg className="h-full w-full" viewBox="0 0 100 40" preserveAspectRatio="none">
          <polyline points="0,40 5,28 15,30 25,16 35,22 45,10 55,14 65,6 75,12 85,4 95,8 100,0" fill="none" stroke="#22d3ee" strokeWidth="2" />
          <polyline points="0,40 5,32 15,34 25,24 35,28 45,18 55,22 65,14 75,20 85,12 95,16 100,10" fill="none" stroke="#6366f1" strokeWidth="2" />
        </svg>
      </div>
      <div className="mt-2 flex justify-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><span className="h-2 w-4 rounded bg-cyan-400" /> Series A</span>
        <span className="flex items-center gap-1"><span className="h-2 w-4 rounded bg-indigo-500" /> Series B</span>
      </div>
    </div>
  );
}
