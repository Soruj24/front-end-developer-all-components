import { emailTemplates } from "../constants/crm-data";
import { SectionCard } from "./SectionCard";

export function EmailTemplateList() {
  return (
    <SectionCard title="Email Templates" description="Performance metrics for sales templates">
      <div className="space-y-3">
        {emailTemplates.map((t) => (
          <div key={t.id} className="flex items-center justify-between rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{t.name}</p>
              <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">{t.subject}</p>
            </div>
            <div className="ml-4 flex items-center gap-6 text-xs">
              <div className="text-center">
                <p className="font-medium text-zinc-900 dark:text-zinc-100">{t.opens}</p>
                <p className="text-zinc-500">Opens</p>
              </div>
              <div className="text-center">
                <p className="font-medium text-zinc-900 dark:text-zinc-100">{t.clicks}</p>
                <p className="text-zinc-500">Clicks</p>
              </div>
              <div className="text-center">
                <p className="text-zinc-400">{t.lastUsed}</p>
              </div>
              <button className="rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700">Use</button>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
