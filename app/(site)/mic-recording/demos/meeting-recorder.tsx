"use client";

import { useState } from "react";
import { Mic, Square } from "lucide-react";

export function MeetingRecorder() {
  const [recording, setRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [participants] = useState([
    { id: 1, name: "You", speaking: false },
    { id: 2, name: "Alice", speaking: true },
    { id: 3, name: "Bob", speaking: false },
  ]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <Mic className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Meeting Recorder</h3>
      </div>
      <div className="rounded-xl bg-zinc-50 p-4 dark:bg-zinc-900">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {recording && <span className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />}
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{recording ? "Recording" : "Ready"}</span>
          </div>
          <span className="font-mono text-sm text-zinc-600 dark:text-zinc-400">{formatTime(duration)}</span>
        </div>
        <div className="mb-4 space-y-2">
          {participants.map((p) => (
            <div key={p.id} className="flex items-center gap-2.5">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium ${
                p.speaking ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-400"
              }`}>
                {p.name.charAt(0)}
              </div>
              <span className="flex-1 text-sm text-zinc-700 dark:text-zinc-300">{p.name}</span>
              {p.speaking && (
                <div className="flex gap-0.5">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-1 rounded-full bg-zinc-900 dark:bg-zinc-100" style={{ height: `${8 + Math.random() * 8}px`, animation: `pulse 1s ${i * 0.1}s infinite` }} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            setRecording(!recording);
            if (!recording) {
              const interval = setInterval(() => setDuration((d) => d + 1), 1000);
              return () => clearInterval(interval);
            }
          }}
          className={`w-full rounded-xl py-2.5 text-sm font-medium transition-all ${
            recording
              ? "bg-red-500 text-white hover:bg-red-600 active:scale-[0.98]"
              : "bg-zinc-900 text-white hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          }`}
        >
          {recording ? (
            <span className="flex items-center justify-center gap-2"><Square className="h-4 w-4" />Stop</span>
          ) : (
            <span className="flex items-center justify-center gap-2"><Mic className="h-4 w-4" />Start Recording</span>
          )}
        </button>
      </div>
    </div>
  );
}
