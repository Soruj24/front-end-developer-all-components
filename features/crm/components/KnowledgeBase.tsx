import { cn } from "@/lib/cn";
import { kbArticles } from "../constants/crm-data";
import { Badge } from "./Badge";
import { SectionCard } from "./SectionCard";

export function KnowledgeBase() {
  return (
    <SectionCard title="Knowledge Base" description="Top articles and documentation">
      <div className="grid gap-3">
        {kbArticles.map((a) => (
          <div
            key={a.title}
            className={cn(
              "flex items-center justify-between rounded-lg border border-border/60 p-3",
              "bg-card shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
              "hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20",
              "hover:border-border hover:ring-black/[0.08] dark:hover:ring-white/[0.12]",
              "transition-all duration-200"
            )}
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">{a.title}</p>
              <Badge variant="default">{a.category}</Badge>
            </div>
            <div className="ml-4 flex items-center gap-4 text-xs text-muted-foreground">
              <div className="text-center">
                <p className="font-medium text-foreground">{a.views.toLocaleString()}</p>
                <p>Views</p>
              </div>
              <div className="text-center">
                <p className="font-medium text-green-600 dark:text-green-400">{a.helpful}%</p>
                <p>Helpful</p>
              </div>
              <span className="text-muted-foreground/70">Updated {a.updated}</span>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}