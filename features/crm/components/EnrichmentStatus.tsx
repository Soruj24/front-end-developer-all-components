import { enrichments } from "../constants/crm-data";
import { Badge } from "./Badge";
import { SectionCard } from "./SectionCard";

export function EnrichmentStatus() {
  return (
    <SectionCard title="Contact Enrichment" description="Data enrichment status">
      <div className="space-y-3">
        {enrichments.map((e) => (
          <div key={e.field} className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
            <div>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{e.field}</p>
              <p className="text-xs text-zinc-500">{e.source}</p>
            </div>
            <div className="flex items-center gap-3">
              {e.confidence > 0 && (
                <span className="text-xs text-zinc-400">{e.confidence}% confidence</span>
              )}
              <Badge variant={e.status}>{e.status}</Badge>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
