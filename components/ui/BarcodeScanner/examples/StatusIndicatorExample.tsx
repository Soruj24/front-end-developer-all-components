"use client";

import { useState } from "react";
import { BarcodeScanner } from "../BarcodeScanner";
import type { ScanStatus } from "../BarcodeScanner.types";
import { cn } from "@/lib/cn";

const STATUS_LABELS: Record<ScanStatus, { label: string; color: string }> = {
  idle: { label: "Idle", color: "bg-muted-foreground/30" },
  scanning: { label: "Scanning", color: "bg-primary animate-pulse" },
  success: { label: "Success", color: "bg-emerald-500" },
  error: { label: "Error", color: "bg-destructive" },
};

export function StatusIndicatorExample() {
  const [status, setStatus] = useState<ScanStatus>("idle");
  const info = STATUS_LABELS[status];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-2.5">
        <div className={cn("h-3 w-3 rounded-full transition-colors", info.color)} />
        <span className="text-sm font-medium text-foreground">{info.label}</span>
      </div>
      <BarcodeScanner
        variant="compact"
        onStatusChange={setStatus}
        onScan={() => {}}
      />
    </div>
  );
}
