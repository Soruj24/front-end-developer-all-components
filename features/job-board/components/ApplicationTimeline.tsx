import type { Application } from "../types";

interface ApplicationTimelineProps {
  applications: Application[];
}

const STAGE_ORDER = ["Applied", "Interview", "Offer", "Rejected"];

const STAGE_COLORS: Record<string, { bg: string; dot: string; text: string }> = {
  Applied: { bg: "bg-blue-50 dark:bg-blue-900/20", dot: "bg-blue-500", text: "text-blue-700 dark:text-blue-400" },
  Interview: { bg: "bg-amber-50 dark:bg-amber-900/20", dot: "bg-amber-500", text: "text-amber-700 dark:text-amber-400" },
  Offer: { bg: "bg-emerald-50 dark:bg-emerald-900/20", dot: "bg-emerald-500", text: "text-emerald-700 dark:text-emerald-400" },
  Rejected: { bg: "bg-zinc-50 dark:bg-zinc-800/50", dot: "bg-zinc-400", text: "text-zinc-500 dark:text-zinc-400" },
};

export function ApplicationTimeline({ applications }: ApplicationTimelineProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-white">Application Timeline</h3>
      <div className="space-y-3">
        {applications.map((app) => {
          const colors = STAGE_COLORS[app.status] || STAGE_COLORS.Applied;
          return (
            <div key={app.id} className={`rounded-lg p-3 ${colors.bg}`}>
              <div className="flex items-start gap-3">
                <img src={app.companyLogo} alt={app.company} className="h-8 w-8 shrink-0 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-white">{app.title}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{app.company}</p>
                    </div>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${colors.text}`}>
                      {app.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{app.stage}</p>
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500">{app.date}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
