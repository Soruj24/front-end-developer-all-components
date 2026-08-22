"use client";

import { useState, useEffect } from "react";
import { Heart, Activity, Flame } from "lucide-react";
import { HeartbeatRenderer } from "./heartbeat-renderer";

export function PlaygroundDemo() {
  const [bpm, setBpm] = useState(72);
  const [active, setActive] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [calories, setCalories] = useState(0);
  const goal = 500;

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(interval);
  }, [active]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBpm((prev) => {
        const newBpm = prev + Math.floor(Math.random() * 5) - 2;
        return Math.max(60, Math.min(100, newBpm));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getStatus = (b: number) => {
    if (b < 60) return { label: "Low", color: "text-blue-500" };
    if (b <= 80) return { label: "Normal", color: "text-emerald-500" };
    if (b <= 100) return { label: "Elevated", color: "text-yellow-500" };
    return { label: "High", color: "text-red-500" };
  };

  return (
    <div className="w-full max-w-lg space-y-4">
      <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mb-3 flex items-center gap-3">
          <HeartbeatRenderer bpm={bpm} size={48} />
          <div className="flex-1">
            <p className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">{bpm}</p>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400">BPM</p>
            <p className={`text-[10px] font-medium ${getStatus(bpm).color}`}>{getStatus(bpm).label}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-extrabold font-mono text-zinc-900 dark:text-zinc-100">{formatTime(elapsed)}</p>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400">{active ? "In Progress" : "Paused"}</p>
          </div>
        </div>
        <button
          onClick={() => setActive(!active)}
          className={`w-full rounded-lg px-4 py-2 text-xs font-medium transition-all ${
            active
              ? "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-950/30 dark:text-red-400"
              : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900"
          }`}
        >
          {active ? "Stop Workout" : "Start Workout"}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-3 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <Heart className="mx-auto mb-1 h-4 w-4 text-red-500" />
          <p className="text-lg font-extrabold text-zinc-900 dark:text-zinc-100">{bpm}</p>
          <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Heart Rate</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-3 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <Flame className="mx-auto mb-1 h-4 w-4 text-orange-500" />
          <p className="text-lg font-extrabold text-zinc-900 dark:text-zinc-100">{calories}</p>
          <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Calories</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-3 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <Activity className="mx-auto mb-1 h-4 w-4 text-emerald-500" />
          <p className="text-lg font-extrabold text-zinc-900 dark:text-zinc-100">{Math.round((calories / goal) * 100)}%</p>
          <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Goal Progress</p>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Calorie Goal</p>
          <p className="text-[10px] text-zinc-500 dark:text-zinc-400">{calories} / {goal}</p>
        </div>
        <div className="mb-3 h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
          <div className="h-full rounded-full bg-orange-500 transition-all" style={{ width: `${(calories / goal) * 100}%` }} />
        </div>
        <div className="flex gap-1.5">
          {[{ name: "Running", cal: 120 }, { name: "Cycling", cal: 85 }, { name: "Swimming", cal: 100 }].map((a) => (
            <button
              key={a.name}
              onClick={() => setCalories((c) => Math.min(goal, c + a.cal))}
              className="flex-1 rounded-lg bg-zinc-100 px-2 py-1.5 text-[10px] font-medium text-zinc-600 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            >
              +{a.cal}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
