"use client";

import { useState } from "react";
import { BarcodeScanner } from "../BarcodeScanner";
import type { ScanStatus } from "../BarcodeScanner.types";
import { cn } from "@/lib/cn";

export function InventoryCheckExample() {
  const [items, setItems] = useState<{ code: string; status: "in" | "out"; time: string }[]>([]);
  const [scanStatus, setScanStatus] = useState<ScanStatus>("idle");

  const handleScan = (code: string) => {
    const isIn = Math.random() > 0.3;
    setItems((prev) =>
      [{ code, status: isIn ? "in" : "out", time: new Date().toLocaleTimeString() }, ...prev].slice(0, 6),
    );
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-3">
        <div className={cn("h-2.5 w-2.5 rounded-full", scanStatus === "scanning" ? "bg-primary animate-pulse" : "bg-muted-foreground/30")} />
        <span className="text-xs text-muted-foreground">
          {scanStatus === "scanning" ? "Scanning inventory..." : "Ready to scan"}
        </span>
      </div>
      <BarcodeScanner
        size="compact"
        onStatusChange={setScanStatus}
        onScan={handleScan}
      />
      {items.length > 0 && (
        <div className="w-full max-w-xs">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg bg-emerald-500/10 p-2">
              <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{items.filter((i) => i.status === "in").length}</p>
              <p className="text-[10px] text-muted-foreground">Checked In</p>
            </div>
            <div className="rounded-lg bg-amber-500/10 p-2">
              <p className="text-lg font-bold text-amber-600 dark:text-amber-400">{items.filter((i) => i.status === "out").length}</p>
              <p className="text-[10px] text-muted-foreground">Checked Out</p>
            </div>
            <div className="rounded-lg bg-muted p-2">
              <p className="text-lg font-bold text-foreground">{items.length}</p>
              <p className="text-[10px] text-muted-foreground">Total</p>
            </div>
          </div>
          <div className="mt-2 rounded-lg border border-border bg-background p-2">
            {items.map((item, i) => (
              <div key={i} className="flex items-center justify-between border-b border-border/50 py-1 last:border-0">
                <span className="font-mono text-xs">{item.code}</span>
                <div className="flex items-center gap-2">
                  <span className={cn("text-[10px] font-medium", item.status === "in" ? "text-emerald-600" : "text-amber-600")}>
                    {item.status === "in" ? "IN" : "OUT"}
                  </span>
                  <span className="text-[10px] text-muted-foreground/60">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
