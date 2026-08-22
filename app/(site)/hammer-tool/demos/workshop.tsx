import { Wrench } from "lucide-react";

const stats = [
  { label: "Total Tools", value: "156", change: "+12" },
  { label: "In Use", value: "43", change: "-5" },
  { label: "Maintenance", value: "8", change: "+2" },
];

const items = [
  { name: "Drill Press", status: "Available", time: "Last used 2h ago" },
  { name: "Table Saw", status: "In Use", time: "Since 10:30 AM" },
  { name: "Belt Sander", status: "Maintenance", time: "Scheduled 3PM" },
];

const STATUS_DOT: Record<string, string> = {
  Available: "bg-emerald-500",
  "In Use": "bg-amber-500",
  Maintenance: "bg-red-500",
};

export function WorkshopDashboardDemo() {
  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden dark:border-zinc-800 dark:bg-zinc-950">
        <div className="border-b border-zinc-100 px-5 py-3.5 dark:border-zinc-800/80">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800">
              <Wrench className="h-3.5 w-3.5 text-zinc-600 dark:text-zinc-400" />
            </div>
            <h3 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Workshop Dashboard</h3>
          </div>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-3 gap-2.5 mb-5">
            {stats.map((s) => (
              <div key={s.label} className="rounded-lg bg-zinc-50 p-3 text-center dark:bg-zinc-900/50">
                <p className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{s.value}</p>
                <p className="mt-0.5 text-[10px] font-medium text-zinc-500 dark:text-zinc-500">{s.label}</p>
                <p className={`mt-1 text-[10px] font-semibold ${s.change.startsWith("+") ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>{s.change}</p>
              </div>
            ))}
          </div>
          <div className="space-y-1.5">
            {items.map((item) => (
              <div key={item.name} className="flex items-center gap-3 rounded-lg bg-zinc-50 px-3.5 py-2.5 dark:bg-zinc-900/50">
                <div className={`h-2 w-2 rounded-full ${STATUS_DOT[item.status]}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-zinc-900 dark:text-zinc-100">{item.name}</p>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-500">{item.time}</p>
                </div>
                <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400">{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
