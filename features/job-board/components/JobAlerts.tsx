import { useState } from "react";
import type { JobAlert } from "../types";
import { JOB_TYPES, EXPERIENCE_LEVELS } from "../constants/ui-data";

interface JobAlertsProps {
  alerts: JobAlert[];
  onAdd: (alert: Omit<JobAlert, "id" | "createdAt" | "active">) => void;
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
}

export function JobAlerts({ alerts, onAdd, onRemove, onToggle }: JobAlertsProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [frequency, setFrequency] = useState<"daily" | "weekly" | "instant">("daily");

  const handleCreate = () => {
    if (!query.trim()) return;
    onAdd({ query: query.trim(), location: location.trim(), types: [], levels: [], salaryMin: 50, salaryMax: 300, frequency });
    setQuery("");
    setLocation("");
    setIsCreating(false);
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Job Alerts</h3>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="rounded-lg px-3 py-1.5 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
        >
          {isCreating ? "Cancel" : "+ New Alert"}
        </button>
      </div>

      {isCreating && (
        <div className="mb-4 space-y-3 rounded-lg border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-800/50">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Job title or keyword"
            className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500"
          />
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location (optional)"
            className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-500"
          />
          <div className="flex gap-2">
            {(["instant", "daily", "weekly"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFrequency(f)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                  frequency === f
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <button
            onClick={handleCreate}
            disabled={!query.trim()}
            className="w-full rounded-lg bg-zinc-900 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
          >
            Create Alert
          </button>
        </div>
      )}

      <div className="space-y-2">
        {alerts.length === 0 && (
          <p className="text-center text-sm text-zinc-400 dark:text-zinc-500">No alerts yet. Create one to get notified.</p>
        )}
        {alerts.map((alert) => (
          <div key={alert.id} className="flex items-center justify-between rounded-lg border border-zinc-100 p-3 dark:border-zinc-800">
            <div className="min-w-0">
              <p className="text-sm font-medium text-zinc-900 dark:text-white">{alert.query}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {alert.location || "Anywhere"} &middot; {alert.frequency}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggle(alert.id)}
                className={`relative h-5 w-9 rounded-full transition-colors ${alert.active ? "bg-emerald-500" : "bg-zinc-300 dark:bg-zinc-600"}`}
                aria-label={alert.active ? "Disable alert" : "Enable alert"}
              >
                <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${alert.active ? "left-[18px]" : "left-0.5"}`} />
              </button>
              <button
                onClick={() => onRemove(alert.id)}
                className="rounded p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800"
                aria-label="Delete alert"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
