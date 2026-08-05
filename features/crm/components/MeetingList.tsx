import { meetings } from "../constants/crm-data";
import { SectionCard } from "./SectionCard";

export function MeetingList() {
  return (
    <SectionCard title="Meeting Scheduler" description="Upcoming appointments">
      <div className="space-y-3">
        {meetings.map((m) => (
          <div key={m.id} className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{m.title}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{m.with} · {m.type}</p>
            </div>
            <div className="ml-4 text-right text-xs">
              <p className="font-medium text-zinc-900 dark:text-zinc-100">{m.date}</p>
              <p className="text-zinc-500">{m.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
