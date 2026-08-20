"use client";

import { useState } from "react";
import { BarcodeScanner } from "../BarcodeScanner";
import type { ScanResult } from "../BarcodeScanner.types";

export function BasicExample() {
  const [result, setResult] = useState<ScanResult | null>(null);

  return (
    <div className="flex flex-col items-center gap-4">
      <BarcodeScanner
        onScan={(code, format) =>
          setResult({ code, format, timestamp: Date.now() })
        }
      />
      {result && (
        <div className="w-full max-w-sm rounded-lg border border-border bg-background p-3">
          <p className="text-xs text-muted-foreground">Last scanned</p>
          <p className="font-mono text-sm font-medium">{result.code}</p>
        </div>
      )}
    </div>
  );
}
