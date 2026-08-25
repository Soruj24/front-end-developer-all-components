import { cn } from "@/lib/cn";
import { campaigns } from "../constants/crm-data";
import { Badge } from "./Badge";
import { SectionCard } from "./SectionCard";

export function CampaignHistory() {
  return (
    <SectionCard title="Campaign History" description="Past marketing and sales campaigns">
      <div className="space-y-3">
        {campaigns.map((c) => (
          <div
            key={c.name}
            className={cn(
              "flex items-center justify-between rounded-lg border border-border/60 p-3",
              "bg-card shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
              "hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20",
              "hover:border-border hover:ring-black/[0.08] dark:hover:ring-white/[0.12]",
              "transition-all duration-200"
            )}
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">{c.name}</p>
              <p className="text-xs text-muted-foreground">{c.type} · {c.sent.toLocaleString()} sent</p>
            </div>
            <div className="ml-4 flex items-center gap-4 text-xs">
              <div className="text-center">
                <p className="font-medium text-foreground">{c.opens}</p>
                <p className="text-muted-foreground">Opens</p>
              </div>
              <div className="text-center">
                <p className="font-medium text-foreground">{c.clicks}</p>
                <p className="text-muted-foreground">Clicks</p>
              </div>
              <div className="text-center">
                <p className="font-medium text-foreground">{c.leads}</p>
                <p className="text-muted-foreground">Leads</p>
              </div>
              <div className="text-center">
                <p className="font-medium text-green-600 dark:text-green-400">{c.revenue}</p>
                <p className="text-muted-foreground">Revenue</p>
              </div>
              <Badge variant={c.status}>{c.status}</Badge>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}