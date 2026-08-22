import { Wrench } from "lucide-react";

const items = [
  { tool: "Power Drill", lastService: "Jan 15", nextService: "Apr 15", status: "ok" as const },
  { tool: "Circular Saw", lastService: "Dec 10", nextService: "Mar 10", status: "due" as const },
  { tool: "Sander", lastService: "Nov 20", nextService: "Feb 20", status: "overdue" as const },
];

const STATUS_COLORS: Record<string, string> = {
  ok: "bg-emerald-50 text-emerald-600 ring-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-400/20",
  due: "bg-amber-50 text-amber-600 ring-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-400/20",
  overdue: "bg-red-50 text-red-600 ring-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-400/20",
};

const STATUS_LABELS: Record<string, string> = {
  ok: "On Track",
  due: "Due Soon",
  overdue: "Overdue",
};

export function MaintenanceScheduleDemo() {
  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden dark:border-zinc-800 dark:bg-zinc-950">
        <div className="border-b border-zinc-100 px-5 py-3.5 dark:border-zinc-800/80">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800">
              <Wrench className="h-3.5 w-3.5 text-zinc-600 dark:text-zinc-400" />
            </div>
            <h3 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Maintenance Schedule</h3>
          </div>
        </div>
        <div className="p-3 space-y-1.5">
          {items.map((item) => (
            <div key={item.tool} className="flex items-center gap-3 rounded-lg border border-zinc-100 px-3.5 py-3 dark:border-zinc-800/80">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                <Wrench className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-zinc-900 dark:text-zinc-100">{item.tool}</p>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-500">Last serviced: {item.lastService}</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">Next: {item.nextService}</p>
                <span className={`mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset ${STATUS_COLORS[item.status]}`}>
                  {STATUS_LABELS[item.status]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
