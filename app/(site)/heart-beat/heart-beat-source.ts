export const HEART_BEAT_SOURCE = `"use client";

import { useState, useEffect } from "react";

interface HeartbeatRendererProps {
  bpm?: number;
  color?: string;
  size?: number;
}

export function HeartbeatRenderer({ bpm = 72, color = "#ef4444", size = 100 }: HeartbeatRendererProps) {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = 60000 / bpm;
    const timer = setInterval(() => setPulse((p) => (p >= 1 ? 0 : p + 0.1)), interval / 10);
    return () => clearInterval(timer);
  }, [bpm]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <circle cx="50" cy="50" r="45" fill="none" stroke={color} strokeWidth="2" opacity="0.2" />
        <circle cx="50" cy="50" r={45 + pulse * 5} fill="none" stroke={color} strokeWidth="2" opacity={0.1 + pulse * 0.3} />
        <path
          d="M50 25 C50 25, 35 40, 35 50 C35 60, 50 75, 50 75 C50 75, 65 60, 65 50 C65 40, 50 25, 50 25"
          fill={color}
          opacity={0.6 + pulse * 0.4}
          transform={\`scale(\${0.95 + pulse * 0.05})\`}
          style={{ transformOrigin: "center" }}
        />
      </svg>
    </div>
  );
}`;
