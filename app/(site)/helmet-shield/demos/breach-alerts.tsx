"use client";

import { AlertTriangle, XCircle, CheckCircle } from "lucide-react";

export function BreachAlertsDemo() {
  const alerts = [
    { id: 1, type: "Critical", message: "Unauthorized access attempt", time: "2 min ago", status: "open" },
    { id: 2, type: "Warning", message: "Suspicious login location", time: "15 min ago", status: "investigating" },
    { id: 3, type: "Info", message: "Password change completed", time: "1 hr ago", status: "resolved" },
  ];
  const typeColors = {
    Critical: "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400",
    Warning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400",
    Info: "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400",
  };
  const statusIcons = {
    open: <XCircle className="h-3 w-3 text-red-500" />,
    investigating: <AlertTriangle className="h-3 w-3 text-yellow-500" />,
    resolved: <CheckCircle className="h-3 w-3 text-emerald-500" />,
  };

  return (
    <div className="w-full max-w-md">
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Breach Alerts</h3>
            <span className="ml-auto text-[10px] text-zinc-500 dark:text-zinc-400">{alerts.length} alerts</span>
          </div>
        </div>
        <div className="space-y-2 p-4">
          {alerts.map((a) => (
            <div key={a.id} className="flex items-center gap-3 rounded-lg border border-zinc-200 p-3 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${typeColors[a.type as keyof typeof typeColors]}`}>{a.type}</span>
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400">{a.time}</span>
                </div>
                <p className="mt-1 text-xs font-medium text-zinc-900 dark:text-zinc-100">{a.message}</p>
              </div>
              <div className="flex items-center gap-1">
                {statusIcons[a.status as keyof typeof statusIcons]}
                <span className="text-[10px] capitalize text-zinc-500 dark:text-zinc-400">{a.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
