import { reports } from "../constants/crm-data";
import { SectionCard } from "./SectionCard";

export function ReportBuilder() {
  return (
    <SectionCard title="Report Builder" description="Available reports and schedule">
      <div className="space-y-3">
        {reports.map((r) => (
          <div key={r.name} className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
            <div>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{r.name}</p>
              <p className="text-xs text-zinc-500">{r.type} · {r.size}</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-zinc-500">
              <span>{r.frequency}</span>
              <button className="rounded bg-blue-100 px-2 py-1 font-medium text-blue-700 transition-colors hover:bg-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:hover:bg-blue-900/60">Run</button>
              <button className="rounded bg-zinc-100 px-2 py-1 font-medium text-zinc-600 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700">Export</button>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
