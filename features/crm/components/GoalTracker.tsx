import { goals } from "../constants/crm-data";
import { SectionCard } from "./SectionCard";

export function GoalTracker() {
  return (
    <SectionCard title="Goal Tracker" description="Annual and quarterly targets">
      <div className="space-y-4">
        {goals.map((g) => (
          <div key={g.metric}>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-zinc-900 dark:text-zinc-100">{g.metric}</span>
              <span className="text-xs text-zinc-500">{g.current} / {g.target}</span>
            </div>
            <div className="mt-1.5 flex items-center gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                <div className={`h-full rounded-full ${g.progress >= 80 ? "bg-green-500" : g.progress >= 60 ? "bg-blue-500" : "bg-amber-500"}`} style={{ width: `${g.progress}%` }} />
              </div>
              <span className="text-xs font-medium text-zinc-500">{g.progress}%</span>
            </div>
            <p className="mt-0.5 text-xs text-zinc-400">Deadline: {g.deadline}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
