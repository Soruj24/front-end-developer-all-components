"use client";

import { useState } from "react";
import { Mic, Play } from "lucide-react";

export function VoiceMemo() {
  const [memos, setMemos] = useState([
    { id: 1, title: "Meeting Notes", duration: "2:15", date: "Today" },
    { id: 2, title: "Quick Reminder", duration: "0:45", date: "Yesterday" },
  ]);
  const [recording, setRecording] = useState(false);
  const [memoTitle, setMemoTitle] = useState("");

  const addMemo = () => {
    if (memoTitle.trim()) {
      setMemos([{ id: Date.now(), title: memoTitle, duration: "0:30", date: "Just now" }, ...memos]);
      setMemoTitle("");
    }
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <Mic className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Voice Memo</h3>
      </div>
      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            value={memoTitle}
            onChange={(e) => setMemoTitle(e.target.value)}
            placeholder="Memo title..."
            className="flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500"
          />
          <button
            onClick={() => setRecording(!recording)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
              recording
                ? "bg-red-500 text-white hover:bg-red-600 active:scale-[0.98]"
                : "bg-zinc-900 text-white hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            }`}
          >
            <Mic className="h-4 w-4" />
            {recording ? "Stop" : "Record"}
          </button>
        </div>
        {recording && (
          <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-950/30">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-medium text-red-600 dark:text-red-400">Recording in progress...</span>
          </div>
        )}
        {recording && (
          <button onClick={addMemo} className="w-full rounded-xl border border-zinc-200 py-2 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
            Save Memo
          </button>
        )}
        <div className="space-y-1.5">
          {memos.map((memo) => (
            <div key={memo.id} className="flex items-center gap-3 rounded-xl border border-zinc-200 p-3 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
                <Mic className="h-4 w-4 text-zinc-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{memo.title}</p>
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500">{memo.duration} &middot; {memo.date}</p>
              </div>
              <button className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300">
                <Play className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
