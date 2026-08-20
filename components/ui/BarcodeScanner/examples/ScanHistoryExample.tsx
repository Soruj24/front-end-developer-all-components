"use client";

import { useState } from "react";
import { BarcodeScanner } from "../BarcodeScanner";
import { FORMAT_COLORS, MOCK_SCANS } from "../BarcodeScanner.constants";
import type { ScanResult } from "../BarcodeScanner.types";
import { cn } from "@/lib/cn";

export function ScanHistoryExample() {
  const [history, setHistory] = useState<ScanResult[]>(MOCK_SCANS.slice(0, 3));

  return (
    <div className="flex flex-col items-center gap-4">
      <BarcodeScanner
        onScan={(code, format) =>
          setHistory((prev) =>
            [{ code, format, timestamp: Date.now() }, ...prev].slice(0, 8),
          )
        }
      />
      <div className="w-full max-w-sm rounded-lg border border-border bg-background">
        <div className="flex items-center justify-between border-b border-border px-3 py-2">
          <p className="text-xs font-medium text-foreground">Scan History</p>
          <span className="text-[10px] text-muted-foreground">{history.length} scans</span>
        </div>
        <div className="max-h-48 overflow-y-auto">
          {history.map((r, i) => {
            const c = FORMAT_COLORS[r.format];
            return (
              <div key={i} className="flex items-center gap-3 border-b border-border/50 px-3 py-2 last:border-0">
                <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium", c.bg, c.text)}>
                  {r.format}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-mono text-xs">{r.code}</p>
                  {r.label && <p className="truncate text-[10px] text-muted-foreground">{r.label}</p>}
                </div>
                <span className="shrink-0 text-[10px] text-muted-foreground/60">
                  {new Date(r.timestamp).toLocaleTimeString()}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
