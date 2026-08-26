import type { Job } from "../types";

interface JobCardProps {
  job: Job;
  isBookmarked: boolean;
  onToggleBookmark: (id: number) => void;
  isExpanded: boolean;
  onToggleExpand: (id: number) => void;
}

export function JobCard({ job, isBookmarked, onToggleBookmark, isExpanded, onToggleExpand }: JobCardProps) {
  return (
    <div
      className={`group rounded-xl border transition-all duration-200 ${
        isExpanded
          ? "border-zinc-300 bg-white shadow-md dark:border-zinc-700 dark:bg-zinc-900"
          : "border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
      }`}
      onClick={() => onToggleExpand(job.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggleExpand(job.id); } }}
      aria-expanded={isExpanded}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <img src={job.companyLogo} alt={job.company} className="h-12 w-12 shrink-0 rounded-lg object-cover" />
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">{job.title}</h3>
              <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">{job.company} &middot; {job.location}</p>
              <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{job.salary}</span>
                <span className="text-xs text-zinc-300 dark:text-zinc-600">&middot;</span>
                <span className="text-xs text-zinc-400 dark:text-zinc-500">{job.posted}</span>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {job.skills.map((s) => (
                  <span key={s} className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); onToggleBookmark(job.id); }}
              className="rounded-lg p-1.5 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
              aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
            >
              <svg className={`h-5 w-5 transition-colors ${isBookmarked ? "text-blue-600" : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"}`} fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
            </button>
            <button className="whitespace-nowrap rounded-lg bg-zinc-900 px-4 py-1.5 text-xs font-medium text-white transition-all duration-200 hover:bg-zinc-800 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100">
              Easy Apply
            </button>
          </div>
        </div>
      </div>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="border-t border-zinc-100 px-5 py-4 dark:border-zinc-800">
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{job.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-zinc-800 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100">
              Apply Now
            </button>
            <button className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-600 transition-all duration-200 hover:bg-zinc-50 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800">
              Save for Later
            </button>
            <button className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-600 transition-all duration-200 hover:bg-zinc-50 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800">
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
