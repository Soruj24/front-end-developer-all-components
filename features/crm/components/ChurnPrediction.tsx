import { cn } from "@/lib/cn";
import { churnRisks } from "../constants/crm-data";
import { Badge } from "./Badge";
import { SectionCard } from "./SectionCard";

export function ChurnPrediction() {
  return (
    <SectionCard title="Churn Prediction" description="At-risk accounts requiring attention">
      <div className="space-y-3">
        {churnRisks.map((p) => (
          <div
            key={p.company}
            className={cn(
              "rounded-lg border border-border/60 p-3",
              "bg-card shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
              "hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20",
              "hover:border-border hover:ring-black/[0.08] dark:hover:ring-white/[0.12]",
              "transition-all duration-200"
            )}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">{p.company}</p>
              <Badge variant={p.risk}>{p.risk} Risk</Badge>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{p.reason}</p>
            <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground/70">
              <span>{p.contacts} contacts</span>
              <span>{p.value} at risk</span>
              <button
                className={cn(
                  "ml-auto rounded bg-blue-100 px-2 py-1 font-medium text-blue-700",
                  "dark:bg-blue-900/40 dark:text-blue-300",
                  "transition-all hover:bg-blue-200 dark:hover:bg-blue-900/60",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  "active:scale-[0.97]"
                )}
              >
                Create Task
              </button>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}