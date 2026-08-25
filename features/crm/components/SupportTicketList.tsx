import { cn } from "@/lib/cn";
import { supportTickets } from "../constants/crm-data";
import { Badge } from "./Badge";
import { SectionCard } from "./SectionCard";

export function SupportTicketList() {
  return (
    <SectionCard title="Support Tickets" description="Open and in-progress tickets">
      <div className="space-y-3">
        {supportTickets.map((t) => (
          <div
            key={t.id}
            className={cn(
              "flex items-center justify-between rounded-lg border border-border/60 p-3",
              "bg-card shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
              "hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20",
              "hover:border-border hover:ring-black/[0.08] dark:hover:ring-white/[0.12]",
              "transition-all duration-200"
            )}
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-muted-foreground/70">{t.id}</span>
                <p className="truncate text-sm font-medium text-foreground">{t.subject}</p>
              </div>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <span>{t.customer}</span>
                <span>·</span>
                <span>{t.agent}</span>
              </div>
            </div>
            <div className="ml-4 flex items-center gap-2">
              <span className="text-xs text-muted-foreground/70">{t.age}</span>
              <Badge variant={t.priority}>{t.priority}</Badge>
              <Badge variant={t.status}>{t.status}</Badge>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}