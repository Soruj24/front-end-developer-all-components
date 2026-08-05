import { healthScores } from "../constants/crm-data";
import { Badge } from "./Badge";
import { SectionCard } from "./SectionCard";

export function HealthScoreCard() {
  return (
    <SectionCard title="Customer Health Score" description="Risk assessment per account">
      <div className="space-y-3">
        {healthScores.map((h) => (
          <div key={h.company} className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{h.company}</p>
              <div className="flex items-center gap-2">
                <div className="h-2 w-20 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                  <div className={`h-full rounded-full ${h.score >= 80 ? "bg-green-500" : h.score >= 60 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${h.score}%` }} />
                </div>
                <span className={`text-xs font-bold ${h.score >= 80 ? "text-green-600 dark:text-green-400" : h.score >= 60 ? "text-amber-600 dark:text-amber-400" : "text-red-600 dark:text-red-400"}`}>
                  {h.score}
                </span>
              </div>
            </div>
            <div className="mt-2 flex gap-3 text-xs text-zinc-500">
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
