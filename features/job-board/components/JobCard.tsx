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
    <div className={`rounded-2xl border border-border bg-white p-5 transition-all hover:shadow-md dark:border-border dark:bg-zinc-900 ${isExpanded ? "ring-2 ring-blue-500" : ""}`} onClick={() => onToggleExpand(job.id)}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <img src={job.companyLogo} alt={job.company} className="h-12 w-12 shrink-0 rounded-xl object-cover" />
          <div className="min-w-0">
            <h3 className="font-semibold text-foreground">{job.title}</h3>
            <p className="text-sm text-muted-foreground dark:text-muted-foreground/70">{job.company} · {job.location}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{job.salary}</span>
              <span className="text-xs text-muted-foreground/70">·</span>
              <span className="text-xs text-muted-foreground dark:text-muted-foreground/70">{job.posted}</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {job.skills.map((s) => <span key={s} className="rounded-lg bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground dark:bg-muted dark:text-muted-foreground/70">{s}</span>)}
            </div>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <button onClick={(e) => { e.stopPropagation(); onToggleBookmark(job.id); }}>
            <svg className={`h-5 w-5 ${isBookmarked ? "text-blue-600 fill-blue-600" : "text-muted-foreground/70 hover:text-muted-foreground"}`} fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
          </button>
          <button className="whitespace-nowrap rounded-xl bg-blue-600 px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-700">Easy Apply</button>
        </div>
      </div>
      {isExpanded && (
        <div className="mt-4 border-t border-border pt-4 dark:border-border">
          <p className="text-sm text-muted-foreground">{job.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">Apply Now</button>
            <button className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/40 dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted">Save for Later</button>
            <button className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/40 dark:border-border dark:text-muted-foreground/70 dark:hover:bg-muted">Share</button>
          </div>
        </div>
      )}
    </div>
  );
}
