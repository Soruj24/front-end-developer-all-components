"use client";

import { useState, useCallback } from "react";
import { CameraCapture } from "../CameraCapture";

export default function PlaygroundExample() {
  const [log, setLog] = useState<string[]>([]);

  const handleCapture = useCallback((blob: Blob) => {
    const size = (blob.size / 1024).toFixed(1);
    setLog((prev) => [...prev.slice(-4), `Captured ${size}KB image`]);
  }, []);

  return (
    <div className="flex w-full flex-col items-center gap-4 py-4">
      <CameraCapture onCapture={handleCapture} />
      {log.length > 0 && (
        <div className="w-full max-w-sm rounded-2xl border border-border bg-muted/30 p-3">
          <p className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Activity Log</p>
          <div className="space-y-1">
            {log.map((entry, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="h-1 w-1 rounded-full bg-primary" />
                {entry}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
