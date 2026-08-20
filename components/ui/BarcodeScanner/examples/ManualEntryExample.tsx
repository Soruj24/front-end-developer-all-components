"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export function ManualEntryExample() {
  const [manualCode, setManualCode] = useState("");
  const [entries, setEntries] = useState<{ code: string; timestamp: number }[]>([]);

  const addEntry = () => {
    const code = manualCode.trim();
    if (!code) return;
    setEntries((prev) => [{ code, timestamp: Date.now() }, ...prev].slice(0, 10));
    setManualCode("");
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter barcode manually..."
          value={manualCode}
          onChange={(e) => setManualCode(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addEntry()}
          className={cn(
            "flex-1 rounded-lg border border-border bg-background px-3 py-2",
            "text-sm text-foreground placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
          )}
        />
        <button
          type="button"
          onClick={addEntry}
          disabled={!manualCode.trim()}
          className={cn(
            "inline-flex h-9 items-center justify-center rounded-lg px-4",
            "text-sm font-medium transition-colors",
            "bg-primary text-primary-foreground hover:bg-primary/90",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:opacity-50 disabled:cursor-not-allowed",
          )}
        >
          Add
        </button>
      </div>
      {entries.length > 0 && (
        <div className="rounded-lg border border-border bg-background p-2">
          {entries.map((e, i) => (
            <div key={i} className="flex items-center justify-between border-b border-border/50 py-1.5 last:border-0">
              <span className="font-mono text-xs">{e.code}</span>
              <span className="text-[10px] text-muted-foreground">
                {new Date(e.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
