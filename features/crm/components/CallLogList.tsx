import { cn } from "@/lib/cn";
import { callLogs } from "../constants/crm-data";
import { Badge } from "./Badge";
import { SectionCard } from "./SectionCard";

export function CallLogList() {
  return (
    <SectionCard title="Call Logs" description="Recent phone activity">
      <div className="space-y-3">
        {callLogs.map((c) => (
          <div key={c.id} className={cn(
            "flex items-center justify-between rounded-lg border border-border/60 bg-card p-3",
            "shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
            "transition-all",
            "hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20",
            "hover:border-border hover:ring-black/[0.08] dark:hover:ring-white/[0.12]",
          )}>
            <div>
              <p className="text-sm font-medium text-foreground">{c.contact}</p>
              <p className="text-xs text-muted-foreground">{c.date}</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
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
