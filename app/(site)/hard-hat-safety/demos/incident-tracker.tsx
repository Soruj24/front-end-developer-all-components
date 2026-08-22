import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

const incidents = [
  { id: "INC-001", type: "Near Miss", severity: "low", date: "Jan 15", status: "resolved" },
  { id: "INC-002", type: "Equipment Failure", severity: "medium", date: "Jan 18", status: "investigating" },
  { id: "INC-003", type: "Slip & Fall", severity: "high", date: "Jan 20", status: "open" },
];

const sev: Record<string, string> = {
  low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400",
  medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400",
  high: "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400",
};

const icons: Record<string, JSX.Element> = {
  resolved: <CheckCircle className="h-3 w-3 text-emerald-500" />,
  investigating: <AlertTriangle className="h-3 w-3 text-yellow-500" />,
  open: <XCircle className="h-3 w-3 text-red-500" />,
};

export function IncidentTrackerDemo() {
  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Incident Tracker</h3>
            <span className="ml-auto text-[10px] text-muted-foreground">{incidents.length} incidents</span>
          </div>
        </div>
        <div className="p-4 space-y-2">
          {incidents.map((inc) => (
            <div key={inc.id} className="flex items-center gap-3 rounded-lg border border-black/[.08] p-3 dark:border-white/[.145]">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-bold">{inc.type}</p>
                  <span className={`rounded-full px-2 py-0.5 text-[9px] font-medium capitalize ${sev[inc.severity]}`}>{inc.severity}</span>
                </div>
                <p className="text-[9px] text-muted-foreground">{inc.id} · {inc.date}</p>
              </div>
              <div className="flex items-center gap-1">
                {icons[inc.status]}
                <span className="text-[10px] capitalize text-muted-foreground">{inc.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
