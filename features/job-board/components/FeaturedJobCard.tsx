import type { FeaturedJob } from "../types";

interface FeaturedJobCardProps {
  job: FeaturedJob;
  isBookmarked: boolean;
  onToggleBookmark: (id: number) => void;
}

export function FeaturedJobCard({ job, isBookmarked, onToggleBookmark }: FeaturedJobCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:shadow-zinc-900/20">
      <div className={`relative flex h-36 items-center justify-center bg-gradient-to-br ${job.gradient}`}>
        <img src={job.companyLogo} alt={job.company} className="h-16 w-16 rounded-xl bg-white object-cover shadow-md transition-transform duration-300 group-hover:scale-105" />
        <button
          onClick={(e) => { e.stopPropagation(); onToggleBookmark(job.id); }}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
          aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          <svg className={`h-4 w-4 transition-colors ${isBookmarked ? "text-blue-600" : "text-zinc-500"}`} fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
        </button>
        {job.urgent && (
          <span className="absolute left-3 top-3 rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm">
            Urgent
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">{job.title}</h3>
        <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">{job.company}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            {job.location}
          </span>
          <span className="text-zinc-300 dark:text-zinc-600">&middot;</span>
          <span className="font-medium text-emerald-600 dark:text-emerald-400">{job.salary}</span>
        </div>
        <div className="mt-3 flex items-center gap-2">
          {job.remote && (
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
              Remote
            </span>
          )}
          <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            {job.type}
          </span>
        </div>
        <button className="mt-4 w-full rounded-lg bg-zinc-900 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-zinc-800 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100">
          Easy Apply
        </button>
      </div>
    </div>
  );
}
