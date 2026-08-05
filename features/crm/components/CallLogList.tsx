import { callLogs } from "../constants/crm-data";
import { Badge } from "./Badge";
import { SectionCard } from "./SectionCard";

export function CallLogList() {
  return (
    <SectionCard title="Call Logs" description="Recent phone activity">
      <div className="space-y-3">
        {callLogs.map((c) => (
          <div key={c.id} className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
            <div>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{c.contact}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{c.date}</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="font-mono">{c.duration}</span>
              <Badge variant={c.direction}>{c.direction}</Badge>
              <span className="max-w-[140px] truncate">{c.result}</span>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
