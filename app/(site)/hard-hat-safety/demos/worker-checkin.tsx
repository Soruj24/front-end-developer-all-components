"use client";

import { useState } from "react";
import { HardHat, CheckCircle } from "lucide-react";

export function WorkerCheckinDemo() {
  const [checkedIn, setCheckedIn] = useState(false);
  const [ppe, setPpe] = useState({ helmet: false, vest: false, goggles: false, boots: false });

  const togglePpe = (key: keyof typeof ppe) => {
    setPpe((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const allPpe = Object.values(ppe).every(Boolean);

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <HardHat className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Worker Check-in</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-sm font-bold">JD</div>
            <div>
              <p className="text-sm font-bold">John Doe</p>
              <p className="text-[10px] text-muted-foreground">Electrician - Zone A</p>
            </div>
          </div>
          <p className="text-xs font-medium mb-2">PPE Checklist</p>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[
              { key: "helmet" as const, label: "Hard Hat", icon: "⛑️" },
              { key: "vest" as const, label: "Safety Vest", icon: "🦺" },
              { key: "goggles" as const, label: "Goggles", icon: "🥽" },
              { key: "boots" as const, label: "Steel Boots", icon: "👢" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => togglePpe(item.key)}
                className={`flex items-center gap-2 rounded-lg border p-2 text-left transition-all ${
                  ppe[item.key] ? "border-primary/30 bg-primary/5" : "border-black/[.08] dark:border-white/[.145]"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-[10px] font-medium">{item.label}</span>
                {ppe[item.key] && <CheckCircle className="ml-auto h-3 w-3 text-primary" />}
              </button>
            ))}
          </div>
          <button
            disabled={!allPpe}
            onClick={() => setCheckedIn(!checkedIn)}
            className={`w-full rounded-lg px-4 py-2 text-xs font-medium ${
              checkedIn ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400" :
              allPpe ? "bg-foreground text-background hover:bg-foreground/90" : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            {checkedIn ? "Checked In ✓" : "Check In"}
          </button>
        </div>
      </div>
    </div>
  );
}
