import type { Application } from "../types";
import { StatusBadge } from "./StatusBadge";

interface ApplicationTrackerProps {
  applications: Application[];
}

export function ApplicationTracker({ applications }: ApplicationTrackerProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-white">Applications</h3>
      <div className="space-y-1">
        {applications.map((a) => (
          <div key={a.id} className="flex items-start justify-between gap-3 rounded-lg p-2 -mx-2 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
            <div className="flex items-start gap-3">
              <img src={a.companyLogo} alt={a.company} className="h-9 w-9 shrink-0 rounded-lg object-cover" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-zinc-900 dark:text-white">{a.title}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{a.company} &middot; {a.stage}</p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500">{a.date}</p>
              </div>
            </div>
            <StatusBadge status={a.status} />
          </div>
        ))}
      </div>
    </div>
  );
}
