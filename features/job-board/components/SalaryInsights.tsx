import { SALARY_INSIGHTS } from "../constants/insights-data";

interface SalaryInsightsProps {
  jobTitle?: string;
  location?: string;
}

export function SalaryInsights({ jobTitle, location }: SalaryInsightsProps) {
  const insights = SALARY_INSIGHTS.filter((s) => {
    if (jobTitle && !s.title.toLowerCase().includes(jobTitle.toLowerCase())) return false;
    if (location && !s.location.toLowerCase().includes(location.toLowerCase())) return false;
    return true;
  });

  const displayInsights = insights.length > 0 ? insights : SALARY_INSIGHTS.slice(0, 3);

  const formatSalary = (n: number) => `$${Math.round(n / 1000)}k`;

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Salary Insights</h3>
        <span className="text-xs text-zinc-400 dark:text-zinc-500">Based on 2026 market data</span>
      </div>
      <div className="space-y-4">
        {displayInsights.map((insight) => (
          <div key={`${insight.title}-${insight.location}`} className="rounded-lg border border-zinc-100 p-3 dark:border-zinc-800">
            <div className="mb-2 flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">{insight.title}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{insight.location}</p>
              </div>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                +{insight.growth}%
              </span>
            </div>
            <div className="relative mb-2 h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              <div className="absolute h-full rounded-full bg-zinc-300 dark:bg-zinc-600" style={{ left: `${((insight.p25 - 50000) / 300000) * 100}%`, width: `${((insight.p75 - insight.p25) / 300000) * 100}%` }} />
              <div className="absolute h-full w-1 rounded-full bg-zinc-900 dark:bg-white" style={{ left: `${((insight.median - 50000) / 300000) * 100}%` }} />
            </div>
            <div className="flex justify-between text-[10px] text-zinc-400 dark:text-zinc-500">
              <span>{formatSalary(insight.p25)}</span>
              <span className="font-medium text-zinc-900 dark:text-white">{formatSalary(insight.median)} median</span>
              <span>{formatSalary(insight.p75)}</span>
            </div>
            <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">{insight.openRoles} open roles</p>
          </div>
        ))}
      </div>
    </div>
  );
}
