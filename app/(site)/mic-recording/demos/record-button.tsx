"use client";

import { useState } from "react";
import { Mic, Square } from "lucide-react";

export function RecordButton() {
  const [recording, setRecording] = useState(false);
  const [duration, setDuration] = useState(0);

  const toggleRecording = () => {
    if (!recording) {
      setRecording(true);
      setDuration(0);
      const interval = setInterval(() => setDuration((d) => d + 1), 1000);
      return () => clearInterval(interval);
    } else {
      setRecording(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <Mic className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Record Button</h3>
      </div>
      <div className="flex h-40 items-center justify-center rounded-xl bg-zinc-50 dark:bg-zinc-900">
        <div className="text-center">
          <button
            onClick={toggleRecording}
            className={`flex h-16 w-16 items-center justify-center rounded-full transition-all ${
              recording
                ? "bg-red-500 text-white shadow-lg shadow-red-500/25 hover:bg-red-600 animate-pulse"
                : "bg-zinc-900 text-white shadow-lg shadow-zinc-900/25 hover:bg-zinc-800 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            }`}
          >
            {recording ? <Square className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>
          <p className="mt-3 font-mono text-sm text-zinc-900 dark:text-zinc-100">{formatTime(duration)}</p>
          <p className="mt-0.5 text-[10px] text-zinc-400 dark:text-zinc-500">{recording ? "Recording..." : "Click to start"}</p>
        </div>
      </div>
    </div>
  );
}
