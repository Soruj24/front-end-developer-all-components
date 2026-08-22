"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { HeartbeatRenderer } from "./heartbeat-renderer";

export function HeartRateMonitorDemo() {
  const [bpm, setBpm] = useState(72);
  const [history, setHistory] = useState<number[]>([72, 74, 71, 73, 75]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBpm((prev) => {
        const newBpm = prev + Math.floor(Math.random() * 5) - 2;
        return Math.max(60, Math.min(100, newBpm));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setHistory((prev) => [...prev.slice(-9), bpm]);
  }, [bpm]);

  const getStatus = (b: number) => {
    if (b < 60) return { label: "Low", color: "text-blue-500" };
    if (b <= 80) return { label: "Normal", color: "text-emerald-500" };
    if (b <= 100) return { label: "Elevated", color: "text-yellow-500" };
    return { label: "High", color: "text-red-500" };
  };

  return (
    <div className="w-full max-w-sm">
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Heart Rate Monitor</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="mb-4 flex items-center gap-4">
            <HeartbeatRenderer bpm={bpm} size={60} />
            <div>
              <p className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">{bpm}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">BPM</p>
              <p className={`text-[10px] font-medium ${getStatus(bpm).color}`}>{getStatus(bpm).label}</p>
            </div>
          </div>
          <div className="mb-3 flex h-12 items-end gap-1">
            {history.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t bg-red-500 transition-all"
                style={{ height: `${((h - 50) / 60) * 100}%`, opacity: 0.4 + (i / history.length) * 0.6 }}
              />
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-zinc-500 dark:text-zinc-400">
            <span>10s ago</span>
            <span>Now</span>
          </div>
        </div>
      </div>
    </div>
  );
}
