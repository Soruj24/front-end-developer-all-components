"use client";

import { useState } from "react";
import { ShieldCheck, ShieldAlert, AlertTriangle, CheckCircle } from "lucide-react";

const statusConfig = {
  safe: { icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/20", label: "Safe Zone" },
  warning: { icon: AlertTriangle, color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-950/20", label: "Caution" },
  danger: { icon: ShieldAlert, color: "text-red-500", bg: "bg-red-50 dark:bg-red-950/20", label: "Danger Zone" },
};

export function PlaygroundDemo() {
  const [status, setStatus] = useState<"safe" | "warning" | "danger">("safe");
  const [ppe, setPpe] = useState({ helmet: false, vest: false, goggles: false, boots: false });
  const [score, setScore] = useState(87);

  const togglePpe = (key: keyof typeof ppe) => {
    setPpe((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const allPpe = Object.values(ppe).every(Boolean);
  const ppeCount = Object.values(ppe).filter(Boolean).length;
  const Icon = statusConfig[status].icon;

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex gap-2">
        {(Object.keys(statusConfig) as Array<keyof typeof statusConfig>).map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
              status === s ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {statusConfig[s].label}
          </button>
        ))}
      </div>

      <div className={`rounded-xl border p-4 dark:border-white/[.145] ${statusConfig[status].bg}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-sm">
            <Icon className={`h-5 w-5 ${statusConfig[status].color}`} />
          </div>
          <div>
            <p className="text-sm font-extrabold">{statusConfig[status].label}</p>
            <p className="text-[10px] text-muted-foreground">PPE: {ppeCount}/4 · Score: {score}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1.5 mb-3">
          {([
            { key: "helmet" as const, label: "Hard Hat", icon: "⛑️" },
            { key: "vest" as const, label: "Safety Vest", icon: "🦺" },
            { key: "goggles" as const, label: "Goggles", icon: "🥽" },
            { key: "boots" as const, label: "Steel Boots", icon: "👢" },
          ]).map((item) => (
            <button
              key={item.key}
              onClick={() => togglePpe(item.key)}
              className={`flex items-center gap-1.5 rounded-lg border p-1.5 text-left transition-all ${
                ppe[item.key] ? "border-primary/30 bg-primary/5" : "border-black/[.08] dark:border-white/[.145]"
              }`}
            >
              <span className="text-sm">{item.icon}</span>
              <span className="text-[9px] font-medium">{item.label}</span>
              {ppe[item.key] && <CheckCircle className="ml-auto h-2.5 w-2.5 text-primary" />}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground">Score:</span>
          <button onClick={() => setScore((s) => Math.max(0, s - 1))} className="h-6 w-6 rounded bg-background/50 text-xs font-bold hover:bg-background">-</button>
          <span className="text-xs font-bold tabular-nums">{score}</span>
          <button onClick={() => setScore((s) => Math.min(100, s + 1))} className="h-6 w-6 rounded bg-background/50 text-xs font-bold hover:bg-background">+</button>
          <button
            disabled={!allPpe}
            className={`ml-auto rounded-lg px-3 py-1.5 text-[10px] font-medium ${
              allPpe ? "bg-foreground text-background hover:bg-foreground/90" : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            Check In
          </button>
        </div>
      </div>
    </div>
  );
}
