import { cn } from "@/lib/cn";
import { enrichments } from "../constants/crm-data";
import { Badge } from "./Badge";
import { SectionCard } from "./SectionCard";

export function EnrichmentStatus() {
  return (
    <SectionCard title="Contact Enrichment" description="Data enrichment status">
      <div className="space-y-3">
        {enrichments.map((e) => (
          <div
            key={e.field}
            className={cn(
              "flex items-center justify-between rounded-lg border border-border/60 p-3",
              "bg-card shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
              "hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20",
              "hover:border-border hover:ring-black/[0.08] dark:hover:ring-white/[0.12]",
              "transition-all duration-200"
            )}
          >
            <div>
              <p className="text-sm font-medium text-foreground">{e.field}</p>
              <p className="text-xs text-muted-foreground">{e.source}</p>
            </div>
            <div className="flex items-center gap-3">
              {e.confidence > 0 && (
                <span className="text-xs text-muted-foreground/70">{e.confidence}% confidence</span>
              )}
              <Badge variant={e.status}>{e.status}</Badge>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}