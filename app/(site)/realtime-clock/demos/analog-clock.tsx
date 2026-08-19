"use client";

import { useState, useEffect } from "react";

export function AnalogClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-40 h-40 rounded-full border-4 border-foreground/10 flex items-center justify-center">
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const x = Math.cos(angle) * 52 + 50;
          const y = Math.sin(angle) * 52 + 50;
          return (
            <div key={i} className="absolute w-1 h-1 rounded-full bg-foreground/30" style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)" }} />
          );
        })}
        <div className="absolute w-1 h-10 bg-foreground/70 origin-bottom rounded-full" style={{ transformOrigin: "bottom center", transform: `rotate(${hours * 30 + minutes * 0.5}deg)` }} />
        <div className="absolute w-0.5 h-14 bg-foreground origin-bottom rounded-full" style={{ transformOrigin: "bottom center", transform: `rotate(${minutes * 6}deg)` }} />
        <div className="absolute w-px h-14 bg-red-500 origin-bottom" style={{ transformOrigin: "bottom center", transform: `rotate(${seconds * 6}deg)` }} />
        <div className="w-3 h-3 rounded-full bg-primary" />
      </div>
      <span className="text-sm text-muted-foreground">Analog Clock</span>
    </div>
  );
}
