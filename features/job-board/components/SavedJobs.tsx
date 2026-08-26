import type { Job } from "../types";

interface SavedJobsProps {
  jobs: Job[];
}

export function SavedJobs({ jobs }: SavedJobsProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-white">Saved Jobs</h3>
      <div className="space-y-1">
        {jobs.map((j) => (
          <div key={j.id} className="flex items-start gap-3 rounded-lg p-2 -mx-2 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
            <img src={j.companyLogo} alt={j.company} className="h-9 w-9 shrink-0 rounded-lg object-cover" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-zinc-900 dark:text-white">{j.title}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{j.company}</p>
            </div>
          </div>
        ))}
        <button className="mt-2 w-full rounded-lg border border-zinc-200 py-2 text-sm font-medium text-zinc-500 transition-all duration-200 hover:bg-zinc-50 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white">
          View All Saved
        </button>
      </div>
    </div>
  );
}
