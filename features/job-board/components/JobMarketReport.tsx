import { JOB_MARKET_REPORTS } from "../constants/insights-data";

export function JobMarketReport() {
  const demandColors = {
    High: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    Medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    Low: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  const maxJobs = Math.max(...JOB_MARKET_REPORTS.map((r) => r.totalJobs));

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Job Market Report</h3>
        <span className="text-xs text-zinc-400 dark:text-zinc-500">2026 Data</span>
      </div>

      <div className="space-y-4">
        {JOB_MARKET_REPORTS.map((report) => (
          <div key={report.category} className="rounded-lg border border-zinc-100 p-3 dark:border-zinc-800">
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">{report.category}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{report.totalJobs.toLocaleString()} open positions</p>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${demandColors[report.demandLevel]}`}>
                {report.demandLevel} Demand
              </span>
            </div>

            <div className="mb-2 flex items-center gap-4">
              <div className="flex-1">
                <div className="mb-1 flex items-center justify-between text-[10px]">
                  <span className="text-zinc-400 dark:text-zinc-500">Market Volume</span>
                  <span className="font-medium text-zinc-600 dark:text-zinc-400">{Math.round((report.totalJobs / maxJobs) * 100)}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                  <div className="h-full rounded-full bg-zinc-900 dark:bg-white" style={{ width: `${(report.totalJobs / maxJobs) * 100}%` }} />
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">+{report.growth}%</p>
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500">growth</p>
              </div>
            </div>

            <div className="mb-2">
              <p className="mb-1 text-[10px] text-zinc-400 dark:text-zinc-500">Avg Salary: <span className="font-medium text-zinc-700 dark:text-zinc-300">${Math.round(report.avgSalary / 1000)}k</span></p>
            </div>

            <div className="flex gap-4 text-[10px]">
              <div>
                <p className="mb-1 text-zinc-400 dark:text-zinc-500">Top Skills</p>
                <div className="flex flex-wrap gap-1">
                  {report.topSkills.slice(0, 3).map((s) => (
                    <span key={s} className="rounded bg-zinc-100 px-1.5 py-0.5 font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-1 text-zinc-400 dark:text-zinc-500">Top Companies</p>
                <div className="flex flex-wrap gap-1">
                  {report.topCompanies.slice(0, 3).map((c) => (
                    <span key={c} className="rounded bg-zinc-100 px-1.5 py-0.5 font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
