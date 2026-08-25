import { cn } from "@/lib/cn";
import { reports } from "../constants/crm-data";
import { SectionCard } from "./SectionCard";

export function ReportBuilder() {
  return (
    <SectionCard title="Report Builder" description="Available reports and schedule">
      <div className="space-y-3">
        {reports.map((r) => (
          <div
            key={r.name}
            className={cn(
              "flex items-center justify-between rounded-lg border border-border/60 p-3",
              "bg-card shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
              "hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20",
              "hover:border-border hover:ring-black/[0.08] dark:hover:ring-white/[0.12]",
              "transition-all duration-200"
            )}
          >
            <div>
              <p className="text-sm font-medium text-foreground">{r.name}</p>
              <p className="text-xs text-muted-foreground">{r.type} · {r.size}</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>{r.frequency}</span>
              <button
                className={cn(
                  "rounded bg-blue-100 px-2 py-1 font-medium text-blue-700",
                  "transition-all hover:bg-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:hover:bg-blue-900/60",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  "active:scale-[0.97]"
                )}
              >
                Run
              </button>
              <button
                className={cn(
                  "rounded bg-muted/30 px-2 py-1 font-medium text-muted-foreground",
                  "transition-all hover:bg-muted/50 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  "active:scale-[0.97]"
                )}
              >
                Export
              </button>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}