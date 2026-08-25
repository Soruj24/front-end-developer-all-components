import { cn } from "@/lib/cn";
import { meetings } from "../constants/crm-data";
import { SectionCard } from "./SectionCard";

export function MeetingList() {
  return (
    <SectionCard title="Meeting Scheduler" description="Upcoming appointments">
      <div className="space-y-3">
        {meetings.map((m) => (
          <div
            key={m.id}
            className={cn(
              "flex items-center justify-between rounded-lg border border-border/60 p-3",
              "bg-card shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
              "hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20",
              "hover:border-border hover:ring-black/[0.08] dark:hover:ring-white/[0.12]",
              "transition-all duration-200"
            )}
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">{m.title}</p>
              <p className="text-xs text-muted-foreground">{m.with} · {m.type}</p>
            </div>
            <div className="ml-4 text-right text-xs">
              <p className="font-medium text-foreground">{m.date}</p>
              <p className="text-muted-foreground">{m.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}