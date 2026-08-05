import { churnRisks } from "../constants/crm-data";
import { Badge } from "./Badge";
import { SectionCard } from "./SectionCard";

export function ChurnPrediction() {
  return (
    <SectionCard title="Churn Prediction" description="At-risk accounts requiring attention">
      <div className="space-y-3">
        {churnRisks.map((p) => (
          <div key={p.company} className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{p.company}</p>
              <Badge variant={p.risk}>{p.risk} Risk</Badge>
            </div>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{p.reason}</p>
            <div className="mt-2 flex items-center gap-3 text-xs text-zinc-400">
              <span>{p.contacts} contacts</span>
              <span>{p.value} at risk</span>
              <button className="ml-auto rounded bg-blue-100 px-2 py-1 font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">Create Task</button>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
