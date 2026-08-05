import { supportTickets } from "../constants/crm-data";
import { Badge } from "./Badge";
import { SectionCard } from "./SectionCard";

export function SupportTicketList() {
  return (
    <SectionCard title="Support Tickets" description="Open and in-progress tickets">
      <div className="space-y-3">
        {supportTickets.map((t) => (
          <div key={t.id} className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-zinc-400">{t.id}</span>
                <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">{t.subject}</p>
              </div>
              <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
                <span>{t.customer}</span>
                <span>·</span>
                <span>{t.agent}</span>
              </div>
            </div>
            <div className="ml-4 flex items-center gap-2">
              <span className="text-xs text-zinc-400">{t.age}</span>
              <Badge variant={t.priority}>{t.priority}</Badge>
              <Badge variant={t.status}>{t.status}</Badge>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
