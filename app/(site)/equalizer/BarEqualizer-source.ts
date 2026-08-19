"use client";

import { useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";

function BarEqualizer() {
  const [levels, setLevels] = useState([65, 80, 45, 90, 55, 70, 35, 60]);
  const [animating, setAnimating] = useState(false);
  useEffect(() => {
    if (!animating) return;
    const id = setInterval(() => {
      setLevels(prev => prev.map(() => Math.floor(Math.random() * 100)));
    }, 200);
    return () => clearInterval(id);
  }, [animating]);
  return (
    <div className="w-full p-4">
      <div className="max-w-xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium">Vertical Band Equalizer</h4>
          <button onClick={() => setAnimating(!animating)} className="px-3 py-1 text-sm rounded bg-primary text-primary-foreground hover:bg-primary/90">
            {animating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
        </div>
        <div className="flex items-end gap-3 justify-center h-40">
          {levels.map((h, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="w-8 h-32 bg-muted rounded-full relative overflow-hidden">
                <div className="absolute bottom-0 w-full bg-primary rounded-full transition-all duration-200" style={{ height: `${h}%` }} />
              </div>
              <span className="text-[9px] text-muted-foreground">{["32", "64", "125", "250", "500", "1K", "4K", "16K"][i]}</span>
              <span className="text-xs font-mono text-muted-foreground">{h}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { BarEqualizer };