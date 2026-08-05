import { contracts } from "../constants/crm-data";
import { Badge } from "./Badge";
import { SectionCard } from "./SectionCard";

export function ContractList() {
  return (
    <SectionCard title="Contract Management" description="Active, pending, and expiring contracts">
      <div className="space-y-3">
        {contracts.map((c) => (
          <div key={c.id} className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
            <div>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{c.client}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{c.type} · {c.value}</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="text-right">
                <p className="text-zinc-500 dark:text-zinc-400">{c.start} → {c.end}</p>
              </div>
              <Badge variant={c.status}>{c.status}</Badge>
              <button className="rounded bg-zinc-100 px-2 py-1 font-medium text-zinc-600 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700">View</button>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
