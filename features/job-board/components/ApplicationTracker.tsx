import type { Application } from "../types";
import { StatusBadge } from "./StatusBadge";

interface ApplicationTrackerProps {
  applications: Application[];
}

export function ApplicationTracker({ applications }: ApplicationTrackerProps) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
      <h3 className="mb-4 text-lg font-semibold text-foreground">Applications</h3>
      <div className="space-y-3">
        {applications.map((a) => (
          <div key={a.id} className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <img src={a.companyLogo} alt={a.company} className="h-8 w-8 shrink-0 rounded-lg object-cover" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">{a.title}</p>
                <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">{a.company} · {a.stage}</p>
                <p className="text-xs text-muted-foreground/70">{a.date}</p>
              </div>
            </div>
            <StatusBadge status={a.status} />
          </div>
        ))}
      </div>
    </div>
  );
}
