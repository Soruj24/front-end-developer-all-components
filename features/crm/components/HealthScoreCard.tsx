import { cn } from "@/lib/cn";
import { healthScores } from "../constants/crm-data";
import { Badge } from "./Badge";
import { SectionCard } from "./SectionCard";

export function HealthScoreCard() {
  return (
    <SectionCard title="Customer Health Score" description="Risk assessment per account">
      <div className="space-y-3">
        {healthScores.map((h) => (
          <div
            key={h.company}
            className={cn(
              "rounded-lg border border-border/60 p-3",
              "bg-card shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
              "hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20",
              "hover:border-border hover:ring-black/[0.08] dark:hover:ring-white/[0.12]",
              "transition-all duration-200"
            )}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">{h.company}</p>
              <div className="flex items-center gap-2">
                <div className="h-2 w-20 overflow-hidden rounded-full bg-muted/30">
                  <div className={`h-full rounded-full ${h.score >= 80 ? "bg-green-500" : h.score >= 60 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${h.score}%` }} />
                </div>
                <span className={`text-xs font-bold ${h.score >= 80 ? "text-green-600 dark:text-green-400" : h.score >= 60 ? "text-amber-600 dark:text-amber-400" : "text-red-600 dark:text-red-400"}`}>
                  {h.score}
                </span>
              </div>
            </div>
            <div className="mt-2 flex gap-3 text-xs text-muted-foreground">
              <span>Usage: {h.usage}</span>
              <span>Support: {h.support}</span>
              <span>Sentiment: {h.sentiment}</span>
              <Badge variant={h.risk}>{h.risk} Risk</Badge>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}