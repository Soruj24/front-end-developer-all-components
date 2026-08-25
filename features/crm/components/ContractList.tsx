import { cn } from "@/lib/cn";
import { contracts } from "../constants/crm-data";
import { Badge } from "./Badge";
import { SectionCard } from "./SectionCard";

export function ContractList() {
  return (
    <SectionCard title="Contract Management" description="Active, pending, and expiring contracts">
      <div className="space-y-3">
        {contracts.map((c) => (
          <div
            key={c.id}
            className={cn(
              "flex items-center justify-between rounded-lg border border-border/60 p-3",
              "bg-card shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
              "hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20",
              "hover:border-border hover:ring-black/[0.08] dark:hover:ring-white/[0.12]",
              "transition-all duration-200"
            )}
          >
            <div>
              <p className="text-sm font-medium text-foreground">{c.client}</p>
              <p className="text-xs text-muted-foreground">{c.type} · {c.value}</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="text-right">
                <p className="text-muted-foreground">{c.start} → {c.end}</p>
              </div>
              <Badge variant={c.status}>{c.status}</Badge>
              <button
                className={cn(
                  "rounded bg-muted/30 px-2 py-1 font-medium text-muted-foreground",
                  "transition-all hover:bg-muted/50 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  "active:scale-[0.97]"
                )}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}