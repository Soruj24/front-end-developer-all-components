"use client";

import { useState } from "react";

export function PresetEQ() {
  const [preset, setPreset] = useState("flat");
  const presets = {
    flat: [0, 0, 0, 0, 0, 0, 0, 0],
    rock: [4, 3, 0, -2, -1, 1, 3, 4],
    pop: [2, 3, 2, 0, -1, 1, 2, 2],
    jazz: [3, 1, 0, -1, -2, 0, 2, 3],
    classical: [2, 1, 0, 1, 2, 1, 0, -1],
    bass: [6, 4, 2, 0, -2, -3, -4, -5],
    treble: [-4, -2, 0, 1, 2, 3, 4, 5],
  };
  const levels = presets[preset as keyof typeof presets];
  return (
    <div className="w-full p-4">
      <div className="max-w-xl mx-auto">
        <h4 className="font-medium mb-4">EQ Presets</h4>
        <div className="flex gap-2 flex-wrap mb-4">
          {Object.keys(presets).map((p) => (
            <button
              key={p}
              onClick={() => setPreset(p)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${preset === p ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex items-end gap-3 justify-center h-40">
          {levels.map((level, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="w-8 h-32 bg-muted rounded-full relative overflow-hidden">
                <div className="absolute bottom-0 w-full bg-primary rounded-full transition-all duration-300" style={{ height: `${Math.max(0, Math.min(100, 50 + level * 3))}%` }} />
              </div>
              <span className="text-[9px] text-muted-foreground">{["32", "64", "125", "250", "500", "1K", "4K", "16K"][i]}</span>
              <span className="text-xs font-mono text-primary">{level > 0 ? "+" : ""}{level}dB</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
