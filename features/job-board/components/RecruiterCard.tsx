import type { Recruiter } from "../types";

interface RecruiterCardProps {
  recruiter: Recruiter;
}

export function RecruiterCard({ recruiter }: RecruiterCardProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-white">Contact Recruiter</h3>
      <div className="flex items-start gap-3">
        <img src={recruiter.avatar} alt={recruiter.name} className="h-12 w-12 shrink-0 rounded-full object-cover" />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">{recruiter.name}</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{recruiter.title} at {recruiter.company}</p>
          <div className="mt-3 space-y-1.5">
            <p className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <svg className="h-3.5 w-3.5 shrink-0 text-zinc-400 dark:text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              {recruiter.email}
            </p>
            <p className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <svg className="h-3.5 w-3.5 shrink-0 text-zinc-400 dark:text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              {recruiter.phone}
            </p>
          </div>
          <button className="mt-4 w-full rounded-lg bg-zinc-900 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-zinc-800 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100">
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}
