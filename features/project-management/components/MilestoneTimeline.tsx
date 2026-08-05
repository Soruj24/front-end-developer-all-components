import { milestones } from "../constants/pm-data";
import { Badge } from "./Badge";
import { SectionCard } from "./SectionCard";

export function MilestoneTimeline() {
  return (
    <SectionCard title="Milestones" icon="🎯">
      <div className="relative space-y-0">
        {milestones.map((m, i) => (
          <div key={m.id} className="relative flex gap-4 pb-5">
            {i < milestones.length - 1 && <div className="absolute left-[11px] top-5 h-full w-0.5 bg-zinc-100 dark:bg-zinc-800" />}
            <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
              m.status === "Completed" ? "bg-green-500" : m.status === "In Progress" ? "bg-blue-500" : m.status === "At Risk" ? "bg-red-500" : "bg-zinc-300 dark:bg-zinc-600"
            }`}>
              {m.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{m.name}</p>
                <Badge variant={m.status}>{m.status}</Badge>
              </div>
              <p className="text-xs text-zinc-500">{m.date}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
