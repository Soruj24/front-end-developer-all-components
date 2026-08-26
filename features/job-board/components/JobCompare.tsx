import type { Job } from "../types";

interface JobCompareProps {
  jobs: Job[];
  onRemove: (jobId: number) => void;
  onClear: () => void;
}

export function JobCompare({ jobs, onRemove, onClear }: JobCompareProps) {
  if (jobs.length === 0) return null;

  return (
    <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-3 dark:border-zinc-800">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Compare Jobs ({jobs.length})</h3>
        <button onClick={onClear} className="text-xs font-medium text-zinc-400 transition-colors hover:text-zinc-600 dark:hover:text-zinc-300">
          Clear all
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-100 dark:border-zinc-800">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Attribute</th>
              {jobs.map((job) => (
                <th key={job.id} className="px-5 py-3 text-left">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <img src={job.companyLogo} alt={job.company} className="h-8 w-8 rounded-lg object-cover" />
                      <div>
                        <p className="font-medium text-zinc-900 dark:text-white">{job.title}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{job.company}</p>
                      </div>
                    </div>
                    <button onClick={() => onRemove(job.id)} className="rounded p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800">
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            <tr>
              <td className="px-5 py-3 text-xs font-medium text-zinc-500 dark:text-zinc-400">Salary</td>
              {jobs.map((job) => (
                <td key={job.id} className="px-5 py-3 font-medium text-emerald-600 dark:text-emerald-400">{job.salary}</td>
              ))}
            </tr>
            <tr>
              <td className="px-5 py-3 text-xs font-medium text-zinc-500 dark:text-zinc-400">Location</td>
              {jobs.map((job) => (
                <td key={job.id} className="px-5 py-3 text-zinc-600 dark:text-zinc-400">{job.location}</td>
              ))}
            </tr>
            <tr>
              <td className="px-5 py-3 text-xs font-medium text-zinc-500 dark:text-zinc-400">Type</td>
              {jobs.map((job) => (
                <td key={job.id} className="px-5 py-3 text-zinc-600 dark:text-zinc-400">{job.type}</td>
              ))}
            </tr>
            <tr>
              <td className="px-5 py-3 text-xs font-medium text-zinc-500 dark:text-zinc-400">Experience</td>
              {jobs.map((job) => (
                <td key={job.id} className="px-5 py-3 text-zinc-600 dark:text-zinc-400">{job.experience}</td>
              ))}
            </tr>
            <tr>
              <td className="px-5 py-3 text-xs font-medium text-zinc-500 dark:text-zinc-400">Remote</td>
              {jobs.map((job) => (
                <td key={job.id} className="px-5 py-3">
                  {job.remote ? (
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">Yes</span>
                  ) : (
                    <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">No</span>
                  )}
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-5 py-3 text-xs font-medium text-zinc-500 dark:text-zinc-400">Skills</td>
              {jobs.map((job) => (
                <td key={job.id} className="px-5 py-3">
                  <div className="flex flex-wrap gap-1">
                    {job.skills.map((s) => (
                      <span key={s} className="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">{s}</span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-5 py-3 text-xs font-medium text-zinc-500 dark:text-zinc-400">Posted</td>
              {jobs.map((job) => (
                <td key={job.id} className="px-5 py-3 text-zinc-500 dark:text-zinc-400">{job.posted}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
