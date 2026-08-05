import type { Job } from "../types";

interface SavedJobsProps {
  jobs: Job[];
}

export function SavedJobs({ jobs }: SavedJobsProps) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
      <h3 className="mb-4 text-lg font-semibold text-foreground">Saved Jobs</h3>
      <div className="space-y-3">
        {jobs.map((j) => (
          <div key={j.id} className="flex items-start gap-3">
            <img src={j.companyLogo} alt={j.company} className="h-8 w-8 shrink-0 rounded-lg object-cover" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">{j.title}</p>
              <p className="text-xs text-muted-foreground">{j.company}</p>
            </div>
          </div>
        ))}
        <button className="w-full rounded-xl border border-border py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/40 dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted">View All Saved</button>
      </div>
    </div>
  );
}
