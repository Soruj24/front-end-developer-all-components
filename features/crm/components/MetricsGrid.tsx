import { dashboardMetrics } from "../constants/crm-data";
import { metricIcons } from "../constants/ui-data";
import { SectionCard } from "./SectionCard";

export function MetricsGrid() {
  return (
    <SectionCard title="Dashboard Overview" description="Key metrics at a glance">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {dashboardMetrics.map((m) => (
          <div key={m.label} className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 transition-colors hover:border-blue-200 dark:border-zinc-800 dark:bg-zinc-800/50 dark:hover:border-blue-800">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{m.label}</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-sm font-bold text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                {metricIcons[m.icon]}
              </span>
            </div>
            <p className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100">{m.value}</p>
            <span className={`text-xs font-medium ${m.positive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
              {m.change}
            </span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
