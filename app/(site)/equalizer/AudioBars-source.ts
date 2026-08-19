"use client";

import { useState } from "react";

function AudioBars() {
  const [channels, setChannels] = useState({
    left: Array.from({ length: 16 }, () => Math.random() * 100),
    right: Array.from({ length: 16 }, () => Math.random() * 100),
  });
  const [running, setRunning] = useState(true);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setChannels({
        left: Array.from({ length: 16 }, () => Math.random() * 100),
        right: Array.from({ length: 16 }, () => Math.random() * 100),
      });
    }, 100);
    return () => clearInterval(id);
  }, [running]);
  return (
    <div className="w-full p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium">Stereo Audio Bars</h4>
          <button onClick={() => setRunning(!running)} className="px-3 py-1 text-sm rounded bg-primary text-primary-foreground hover:bg-primary/90">
            {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
        </div>
        <div className="grid grid-cols-2 gap-8">
          {["left", "right"].map((ch) => (
            <div key={ch} className="text-center">
              <div className="text-xs font-medium text-muted-foreground mb-2 uppercase">{ch} channel</div>
              <div className="flex items-end gap-0.5 justify-center h-32">
                {channels[ch as keyof typeof channels].map((height, i) => (
                  <div
                    key={i}
                    className="w-2 rounded-t transition-all duration-75"
                    style={{ height: `${height}%`, background: ch === "left" ? "hsl(var(--primary))" : "hsl(var(--secondary))" }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { AudioBars };