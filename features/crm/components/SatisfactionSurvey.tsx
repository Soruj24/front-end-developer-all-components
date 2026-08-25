import { cn } from "@/lib/cn";
import { npsSurveys } from "../constants/crm-data";
import { SectionCard } from "./SectionCard";

export function SatisfactionSurvey() {
  return (
    <SectionCard title="Satisfaction Survey" description="Latest NPS and CSAT responses">
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-green-50 to-blue-50 p-4 dark:from-green-950/30 dark:to-blue-950/30">
          <div>
            <p className="text-sm font-medium text-foreground">Current NPS Score</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">+58</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Responses: 1,247</p>
            <p className="text-xs text-muted-foreground">Response rate: 34%</p>
          </div>
        </div>
        {npsSurveys.map((s) => (
          <div
            key={s.customer}
            className={cn(
              "flex items-start gap-3 rounded-lg border border-border/60 p-3",
              "bg-card shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
              "hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20",
              "hover:border-border hover:ring-black/[0.08] dark:hover:ring-white/[0.12]",
              "transition-all duration-200"
            )}
          >
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${s.score >= 9 ? "bg-green-500" : s.score >= 7 ? "bg-blue-500" : "bg-red-500"}`}>
              {s.score}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">{s.customer}</p>
                <span className="text-xs text-muted-foreground/70">{s.date}</span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">&quot;{s.comment}&quot;</p>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}