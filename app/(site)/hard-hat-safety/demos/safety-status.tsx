"use client";

import { useState } from "react";
import { ShieldCheck, ShieldAlert, AlertTriangle } from "lucide-react";

const statuses = {
  safe: { icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/20", label: "Safe Zone" },
  warning: { icon: AlertTriangle, color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-950/20", label: "Caution" },
  danger: { icon: ShieldAlert, color: "text-red-500", bg: "bg-red-50 dark:bg-red-950/20", label: "Danger Zone" },
};

export function SafetyStatusDemo() {
  const [status, setStatus] = useState<"safe" | "warning" | "danger">("safe");

  return (
    <div className="w-full max-w-sm">
      <div className={`rounded-xl border p-5 dark:border-white/[.145] ${statuses[status].bg}`}>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-sm">
            {(() => {
              const Icon = statuses[status].icon;
              return <Icon className={`h-6 w-6 ${statuses[status].color}`} />;
            })()}
          </div>
          <div>
            <p className="text-lg font-extrabold">{statuses[status].label}</p>
            <p className="text-xs text-muted-foreground">Current zone status</p>
          </div>
        </div>
        <div className="flex gap-2">
          {(Object.keys(statuses) as Array<keyof typeof statuses>).map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                status === s ? "bg-foreground text-background" : "bg-background/50 text-muted-foreground hover:bg-background"
              }`}
            >
              {statuses[s].label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
