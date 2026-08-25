import { cn } from "@/lib/cn";
import { quotes } from "../constants/crm-data";
import { Badge } from "./Badge";
import { SectionCard } from "./SectionCard";

export function QuoteList() {
  return (
    <SectionCard title="Quote Builder" description="Sent, draft, and negotiated quotes">
      <div className="space-y-3">
        {quotes.map((q) => (
          <div
            key={q.id}
            className={cn(
              "flex items-center justify-between rounded-lg border border-border/60 p-3",
              "bg-card shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
              "hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20",
              "hover:border-border hover:ring-black/[0.08] dark:hover:ring-white/[0.12]",
              "transition-all duration-200"
            )}
          >
            <div>
              <p className="text-sm font-medium text-foreground">{q.client}</p>
              <p className="text-xs text-muted-foreground">{q.id} · {q.items} items · Valid until {q.validUntil}</p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="font-semibold text-foreground">{q.total}</span>
              <Badge variant={q.status}>{q.status}</Badge>
              <span className="text-xs text-muted-foreground/70">{q.probability}</span>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}