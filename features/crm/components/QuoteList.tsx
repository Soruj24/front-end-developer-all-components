import { quotes } from "../constants/crm-data";
import { Badge } from "./Badge";
import { SectionCard } from "./SectionCard";

export function QuoteList() {
  return (
    <SectionCard title="Quote Builder" description="Sent, draft, and negotiated quotes">
      <div className="space-y-3">
        {quotes.map((q) => (
          <div key={q.id} className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
            <div>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{q.client}</p>
              <p className="text-xs text-zinc-500">{q.id} · {q.items} items · Valid until {q.validUntil}</p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">{q.total}</span>
              <Badge variant={q.status}>{q.status}</Badge>
              <span className="text-xs text-zinc-400">{q.probability}</span>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
