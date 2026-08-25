import { cn } from "@/lib/cn";
import { pipelineStages } from "../constants/crm-data";
import { SectionCard } from "./SectionCard";

export function PipelineBoard() {
  return (
    <SectionCard title="Deal Pipeline" description="Kanban view of sales stages">
      <div className="grid gap-4 overflow-x-auto md:grid-cols-5" style={{ minWidth: "800px" }}>
        {pipelineStages.map((stage) => (
          <div key={stage.name} className="flex flex-col gap-3">
            <div className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white", stage.color)}>
              <span>{stage.name}</span>
              <span className="ml-auto rounded-full bg-white/20 px-2 py-0.5 text-xs">{stage.deals.length}</span>
            </div>
            {stage.deals.map((deal) => (
              <div key={deal.title} className={cn(
                "rounded-lg border border-border/60 bg-card p-3",
                "shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
                "transition-all cursor-grab",
                "hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20",
                "hover:border-border hover:ring-black/[0.08] dark:hover:ring-white/[0.12]",
                "active:scale-[0.98] active:cursor-grabbing",
              )}>
                <p className="text-sm font-medium text-foreground">{deal.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{deal.value}</p>
                <p className="mt-1 text-xs text-muted-foreground/70">{deal.owner}</p>
              </div>
            ))}
            <button className={cn(
              "mt-auto rounded-lg border-2 border-dashed border-border/60 py-2 text-xs text-muted-foreground",
              "transition-all",
              "hover:border-primary/40 hover:text-primary hover:bg-primary/5",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              "active:scale-[0.98]",
            )}>
              + Add Deal
            </button>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
