"use client";

import { useState } from "react";

export function FrequencyBands() {
  const [bands, setBands] = useState([
    { freq: "32Hz", gain: 0 }, { freq: "64Hz", gain: 2 }, { freq: "125Hz", gain: -1 },
    { freq: "250Hz", gain: 3 }, { freq: "500Hz", gain: 1 }, { freq: "1kHz", gain: 0 },
    { freq: "2kHz", gain: -2 }, { freq: "4kHz", gain: 2 }, { freq: "8kHz", gain: 1 }, { freq: "16kHz", gain: -1 },
  ]);
  return (
    <div className="w-full p-4">
      <div className="max-w-2xl mx-auto">
        <h4 className="font-medium mb-4">10-Band Graphic EQ</h4>
        <div className="flex items-end gap-2 justify-center h-48 px-4">
          {bands.map((band, i) => (
            <div key={i} className="flex flex-col items-center gap-1 flex-1 max-w-16">
              <input
                type="range"
                min="-12"
                max="12"
                value={band.gain}
                onChange={(e) => setBands(prev => prev.map((b, idx) => idx === i ? { ...b, gain: Number(e.target.value) } : b))}
                className="w-full h-40 appearance-none bg-transparent cursor-pointer -rotate-90 origin-center"
                style={{ transform: "rotate(-90deg) translateX(-50%)" }}
              />
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-mono text-primary">{band.gain > 0 ? "+" : ""}{band.gain}</span>
              </div>
              <span className="text-[9px] text-muted-foreground">{band.freq}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { FrequencyBands };