"use client";

import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";

export function Visualizer() {
  const [bars, setBars] = useState(Array.from({ length: 32 }, () => Math.random() * 100));
  const [running, setRunning] = useState(true);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setBars(prev => prev.map(() => Math.random() * 100));
    }, 80);
    return () => clearInterval(id);
  }, [running]);
  return (
    <div className="w-full p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium">Spectrum Visualizer</h4>
          <button onClick={() => setRunning(!running)} className="px-3 py-1 text-sm rounded bg-primary text-primary-foreground hover:bg-primary/90">
            {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
        </div>
        <div className="flex items-end gap-1 justify-center h-32">
          {bars.map((height, i) => (
            <div
              key={i}
              className="w-2 bg-primary/80 rounded-t transition-all duration-75"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          <span>Bars: 32</span>
          <span>FPS: ~12</span>
          <span>Range: 20Hz - 20kHz</span>
        </div>
      </div>
    </div>
  );
}
