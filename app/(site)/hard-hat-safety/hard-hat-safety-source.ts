export const HARD_HAT_SAFETY_SOURCE = `"use client";

import { useState } from "react";
import { ShieldCheck, ShieldAlert, AlertTriangle } from "lucide-react";

type SafetyStatus = "safe" | "warning" | "danger";

interface HardHatSafetyProps {
  status?: SafetyStatus;
  className?: string;
}

const statusConfig = {
  safe: { icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/20", label: "Safe Zone" },
  warning: { icon: AlertTriangle, color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-950/20", label: "Caution" },
  danger: { icon: ShieldAlert, color: "text-red-500", bg: "bg-red-50 dark:bg-red-950/20", label: "Danger Zone" },
};

export function HardHatSafety({ status = "safe", className = "" }: HardHatSafetyProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={\`rounded-xl border p-5 dark:border-white/[.145] \${config.bg} \${className}\`}>
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-sm">
          <Icon className={\`h-6 w-6 \${config.color}\`} />
        </div>
        <div>
          <p className="text-lg font-extrabold">{config.label}</p>
          <p className="text-xs text-muted-foreground">Current zone status</p>
        </div>
      </div>
    </div>
  );
}`;

export const STATUS_EXAMPLE = `<HardHatSafety status="safe" />
<HardHatSafety status="warning" />
<HardHatSafety status="danger" />`;

export const CHECKIN_EXAMPLE = `<WorkerCheckinDemo />`;

export const EQUIPMENT_EXAMPLE = `<SafetyEquipmentDemo />`;

export const INCIDENT_EXAMPLE = `<IncidentTrackerDemo />`;

export const TRAINING_EXAMPLE = `<SafetyTrainingDemo />`;

export const SCORE_EXAMPLE = `<SiteSafetyScoreDemo />`;

export const CONTACTS_EXAMPLE = `<EmergencyContactsDemo />`;

export const PLAYGROUND_EXAMPLE = `<PlaygroundDemo />`;
