import { cn } from "@/lib/cn";
import { timelineEvents } from "../constants/crm-data";
import { timelineColors } from "../constants/ui-data";
import { SectionCard } from "./SectionCard";

export function ActivityTimeline() {
  return (
    <SectionCard title="Activity Timeline" description="Recent interactions across accounts">
      <div className="relative space-y-0">
        {timelineEvents.map((e, i) => (
          <div key={e.id} className="relative flex gap-4 pb-6">
            {i < timelineEvents.length - 1 && <div className="absolute left-[11px] top-5 h-full w-0.5 bg-border/60" />}
            <div className={cn(
              "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-card text-xs",
              timelineColors[e.type],
            )}>
              <div className="h-2 w-2 rounded-full bg-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">{e.description}</p>
                <span className="text-xs text-muted-foreground">{e.date}</span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">by {e.user}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
