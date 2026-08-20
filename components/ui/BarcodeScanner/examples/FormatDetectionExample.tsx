"use client";

import { useState } from "react";
import { BarcodeScanner } from "../BarcodeScanner";
import { FORMAT_COLORS } from "../BarcodeScanner.constants";
import type { ScanResult } from "../BarcodeScanner.types";
import { cn } from "@/lib/cn";

export function FormatDetectionExample() {
  const [results, setResults] = useState<ScanResult[]>([]);

  return (
    <div className="flex flex-col items-center gap-4">
      <BarcodeScanner
        showFormat
        onScan={(code, format) =>
          setResults((prev) =>
            [{ code, format, timestamp: Date.now() }, ...prev].slice(0, 5),
          )
        }
      />
      {results.length > 0 && (
        <div className="w-full max-w-sm rounded-lg border border-border bg-background p-3">
          <p className="mb-2 text-xs font-medium text-muted-foreground">Detected Formats</p>
          <div className="flex flex-col gap-1.5">
            {results.map((r, i) => {
              const c = FORMAT_COLORS[r.format];
              return (
                <div key={i} className="flex items-center gap-2">
                  <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", c.bg, c.text)}>
                    {r.format}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">{r.code}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
