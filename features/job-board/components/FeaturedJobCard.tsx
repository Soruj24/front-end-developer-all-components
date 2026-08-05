import type { FeaturedJob } from "../types";

interface FeaturedJobCardProps {
  job: FeaturedJob;
  isBookmarked: boolean;
  onToggleBookmark: (id: number) => void;
}

export function FeaturedJobCard({ job, isBookmarked, onToggleBookmark }: FeaturedJobCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-white transition-all hover:shadow-lg dark:border-border dark:bg-zinc-900">
      <div className={`relative flex h-32 items-center justify-center bg-gradient-to-br ${job.gradient}`}>
        <img src={job.companyLogo} alt={job.company} className="h-16 w-16 rounded-2xl bg-white object-cover shadow-lg" />
        <button onClick={(e) => { e.stopPropagation(); onToggleBookmark(job.id); }} className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-colors hover:bg-white">
          <svg className={`h-4 w-4 ${isBookmarked ? "text-blue-600 fill-blue-600" : "text-muted-foreground"}`} fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
        </button>
        {job.urgent && <span className="absolute left-3 top-3 rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-md">Urgent</span>}
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-foreground">{job.title}</h3>
        <p className="text-sm text-muted-foreground dark:text-muted-foreground/70">{job.company}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>{job.location}</span>
          <span>·</span>
          <span className="font-medium text-emerald-600 dark:text-emerald-400">{job.salary}</span>
        </div>
        <div className="mt-3 flex items-center gap-2">
          {job.remote && <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">Remote</span>}
          <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground dark:bg-muted dark:text-muted-foreground/70">{job.type}</span>
        </div>
        <button className="mt-4 w-full rounded-xl bg-blue-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700">Easy Apply</button>
      </div>
    </div>
  );
}
