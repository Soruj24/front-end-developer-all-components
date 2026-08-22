export const HELMET_SHIELD_SOURCE = `"use client";

import { ShieldCheck, ShieldAlert, ShieldX } from "lucide-react";

interface HelmetShieldProps {
  status?: "protected" | "warning" | "danger";
  className?: string;
}

export function HelmetShield({ status = "protected", className = "" }: HelmetShieldProps) {
  const levels = {
    protected: { icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/20", label: "Fully Protected" },
    warning: { icon: ShieldAlert, color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-950/20", label: "At Risk" },
    danger: { icon: ShieldX, color: "text-red-500", bg: "bg-red-50 dark:bg-red-950/20", label: "Vulnerable" },
  };

  const config = levels[status];
  const Icon = config.icon;

  return (
    <div className={\`rounded-xl border border-zinc-200 p-5 shadow-sm dark:border-zinc-800 \${config.bg} \${className}\`}>
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm dark:bg-zinc-950">
          <Icon className={\`h-6 w-6 \${config.color}\`} />
        </div>
        <div>
          <p className="text-lg font-extrabold text-zinc-900 dark:text-zinc-100">{config.label}</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">System status</p>
        </div>
      </div>
    </div>
  );
}`;
