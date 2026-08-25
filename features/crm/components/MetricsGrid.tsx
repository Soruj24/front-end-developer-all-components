import { cn } from "@/lib/cn";
import { dashboardMetrics } from "../constants/crm-data";
import { metricIcons } from "../constants/ui-data";
import { SectionCard } from "./SectionCard";

export function MetricsGrid() {
  return (
    <SectionCard title="Dashboard Overview" description="Key metrics at a glance">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {dashboardMetrics.map((m) => (
          <div key={m.label} className={cn(
            "rounded-xl border border-border/60 bg-muted/30 p-4",
            "shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
            "transition-all",
            "hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20",
            "hover:border-border hover:ring-black/[0.08] dark:hover:ring-white/[0.12]",
          )}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">{m.label}</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-sm font-bold text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                {metricIcons[m.icon]}
              </span>
            </div>
            <p className="mt-2 text-2xl font-bold text-foreground">{m.value}</p>
            <span className={cn(
              "text-xs font-medium",
              m.positive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400",
            )}>
              {m.change}
            </span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
