"use client";

import { useState } from "react";
import { Bell, AlertCircle, Info, CheckCircle } from "lucide-react";

export function AlertNotification() {
  const [alerts, setAlerts] = useState([
    { id: 1, type: "warning" as const, message: "Your storage is 80% full", active: true },
    { id: 2, type: "info" as const, message: "Scheduled maintenance tonight", active: true },
    { id: 3, type: "success" as const, message: "Payment received successfully", active: true },
  ]);

  const dismissAlert = (id: number) => setAlerts(alerts.map((a) => (a.id === id ? { ...a, active: false } : a)));

  const alertStyles = {
    warning: "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30",
    info: "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30",
    success: "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30",
  };

  const alertIcons = { warning: AlertCircle, info: Info, success: CheckCircle };
  const alertIconColors = {
    warning: "text-amber-500",
    info: "text-blue-500",
    success: "text-emerald-500",
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <Bell className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Alert Notification</h3>
      </div>
      <div className="space-y-2">
        {alerts.filter((a) => a.active).map((alert) => {
          const Icon = alertIcons[alert.type];
          return (
            <div key={alert.id} className={`flex items-center gap-3 rounded-xl border p-3 ${alertStyles[alert.type]}`}>
              <Icon className={`h-4 w-4 shrink-0 ${alertIconColors[alert.type]}`} />
              <span className="flex-1 text-sm text-zinc-700 dark:text-zinc-300">{alert.message}</span>
              <button onClick={() => dismissAlert(alert.id)} className="rounded-md p-1 text-zinc-400 transition-colors hover:bg-white/50 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
              </button>
            </div>
          );
        })}
        {alerts.every((a) => !a.active) && <p className="py-4 text-center text-sm text-zinc-500 dark:text-zinc-400">No active alerts</p>}
      </div>
    </div>
  );
}
