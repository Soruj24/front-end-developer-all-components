import { campaigns } from "../constants/crm-data";
import { Badge } from "./Badge";
import { SectionCard } from "./SectionCard";

export function CampaignHistory() {
  return (
    <SectionCard title="Campaign History" description="Past marketing and sales campaigns">
      <div className="space-y-3">
        {campaigns.map((c) => (
          <div key={c.name} className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{c.name}</p>
              <p className="text-xs text-zinc-500">{c.type} · {c.sent.toLocaleString()} sent</p>
            </div>
            <div className="ml-4 flex items-center gap-4 text-xs">
              <div className="text-center">
                <p className="font-medium text-zinc-900 dark:text-zinc-100">{c.opens}</p>
                <p className="text-zinc-500">Opens</p>
              </div>
              <div className="text-center">
                <p className="font-medium text-zinc-900 dark:text-zinc-100">{c.clicks}</p>
                <p className="text-zinc-500">Clicks</p>
              </div>
              <div className="text-center">
                <p className="font-medium text-zinc-900 dark:text-zinc-100">{c.leads}</p>
                <p className="text-zinc-500">Leads</p>
              </div>
              <div className="text-center">
                <p className="font-medium text-green-600 dark:text-green-400">{c.revenue}</p>
                <p className="text-zinc-500">Revenue</p>
              </div>
              <Badge variant={c.status}>{c.status}</Badge>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
