import { APPLICATIONS } from "../constants/company-data";

export function JobApplicationStats() {
  const stats = {
    total: APPLICATIONS.length,
    applied: APPLICATIONS.filter((a) => a.status === "Applied").length,
    interview: APPLICATIONS.filter((a) => a.status === "Interview").length,
    offer: APPLICATIONS.filter((a) => a.status === "Offer").length,
    rejected: APPLICATIONS.filter((a) => a.status === "Rejected").length,
  };

  const responseRate = stats.total > 0 ? Math.round(((stats.interview + stats.offer) / stats.total) * 100) : 0;
  const offerRate = stats.total > 0 ? Math.round((stats.offer / stats.total) * 100) : 0;

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-white">Application Dashboard</h3>

      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-zinc-50 p-3 text-center dark:bg-zinc-800/50">
          <p className="text-2xl font-bold text-zinc-900 dark:text-white">{stats.total}</p>
          <p className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Total</p>
        </div>
        <div className="rounded-lg bg-blue-50 p-3 text-center dark:bg-blue-900/20">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.applied}</p>
          <p className="text-[10px] uppercase tracking-wider text-blue-400 dark:text-blue-500">Applied</p>
        </div>
        <div className="rounded-lg bg-amber-50 p-3 text-center dark:bg-amber-900/20">
          <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{stats.interview}</p>
          <p className="text-[10px] uppercase tracking-wider text-amber-400 dark:text-amber-500">Interviews</p>
        </div>
        <div className="rounded-lg bg-emerald-50 p-3 text-center dark:bg-emerald-900/20">
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stats.offer}</p>
          <p className="text-[10px] uppercase tracking-wider text-emerald-400 dark:text-emerald-500">Offers</p>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">Response Rate</span>
            <span className="text-xs font-semibold text-zinc-900 dark:text-white">{responseRate}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
            <div className="h-full rounded-full bg-blue-500" style={{ width: `${responseRate}%` }} />
          </div>
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">Offer Rate</span>
            <span className="text-xs font-semibold text-zinc-900 dark:text-white">{offerRate}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
            <div className="h-full rounded-full bg-emerald-500" style={{ width: `${offerRate}%` }} />
          </div>
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">Decline Rate</span>
            <span className="text-xs font-semibold text-zinc-900 dark:text-white">{stats.rejected > 0 ? Math.round((stats.rejected / stats.total) * 100) : 0}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
            <div className="h-full rounded-full bg-red-500" style={{ width: `${stats.rejected > 0 ? (stats.rejected / stats.total) * 100 : 0}%` }} />
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/50">
        <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Pipeline Summary</p>
        <div className="mt-2 flex gap-1">
          {stats.applied > 0 && <div className="h-2 rounded-full bg-blue-500" style={{ flex: stats.applied }} />}
          {stats.interview > 0 && <div className="h-2 rounded-full bg-amber-500" style={{ flex: stats.interview }} />}
          {stats.offer > 0 && <div className="h-2 rounded-full bg-emerald-500" style={{ flex: stats.offer }} />}
        </div>
        <div className="mt-1.5 flex justify-between text-[10px] text-zinc-400 dark:text-zinc-500">
          <span>Applied</span>
          <span>Interview</span>
          <span>Offer</span>
        </div>
      </div>
    </div>
  );
}
