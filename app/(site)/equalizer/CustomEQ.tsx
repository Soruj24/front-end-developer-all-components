"use client";

import { useState } from "react";

export function CustomEQ() {
  const [bands, setBands] = useState([
    { freq: 60, gain: 0 }, { freq: 170, gain: 0 }, { freq: 310, gain: 0 },
    { freq: 600, gain: 0 }, { freq: 1000, gain: 0 }, { freq: 3000, gain: 0 },
    { freq: 6000, gain: 0 }, { freq: 12000, gain: 0 },
  ]);
  const [qFactor, setQFactor] = useState(1);
  return (
    <div className="w-full p-4">
      <div className="max-w-2xl mx-auto">
        <h4 className="font-medium mb-4">Parametric EQ</h4>
        <div className="space-y-3 mb-6">
          {bands.map((band, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 text-primary"
              />
              <div className="flex-1 flex items-center gap-2">
                <label className="text-xs text-muted-foreground w-16">Freq</label>
                <input
                  type="number"
                  value={band.freq}
                  onChange={(e) => setBands(prev => prev.map((b, idx) => idx === i ? { ...b, freq: Number(e.target.value) } : b))}
                  className="flex-1 px-2 py-1 text-sm bg-background border border-border rounded outline-none"
                />
                <label className="text-xs text-muted-foreground w-16">Gain</label>
                <input
                  type="number"
                  step="0.5"
                  min="-12"
                  max="12"
                  value={band.gain}
                  onChange={(e) => setBands(prev => prev.map((b, idx) => idx === i ? { ...b, gain: Number(e.target.value) } : b))}
                  className="w-16 px-2 py-1 text-sm bg-background border border-border rounded outline-none"
                />
                <label className="text-xs text-muted-foreground w-16">Q</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="10"
                  value={qFactor}
                  onChange={(e) => setQFactor(Number(e.target.value))}
                  className="w-16 px-2 py-1 text-sm bg-background border border-border rounded outline-none"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-end gap-3 justify-center h-32">
          {bands.map((band, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="w-6 h-24 bg-muted rounded-full relative overflow-hidden">
                <div className="absolute bottom-0 w-full bg-primary rounded-full transition-all" style={{ height: `${Math.max(0, Math.min(100, 50 + band.gain * 3))}%` }} />
              </div>              <span className="text-[8px] text-muted-foreground">{`${band.freq}Hz`}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
