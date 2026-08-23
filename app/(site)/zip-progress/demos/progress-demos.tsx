"use client";

import { useState, useEffect } from "react";

export function BasicProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 1));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto max-w-sm overflow-hidden rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div className="flex items-center gap-2">
        <svg className="h-4 w-4 animate-spin text-blue-500" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Compressing files...</span>
      </div>
      <div className="mt-3">
        <div className="h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
          <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">12 of 16 files processed</p>
        <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{progress}%</span>
      </div>
    </div>
  );
}

export function ProgressStatuses() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"compressing" | "extracting" | "complete">("compressing");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setStatus("complete");
          return 100;
        }
        if (p >= 50) setStatus("extracting");
        return p + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const configs = {
    compressing: { color: "from-blue-500 to-violet-500", text: "text-blue-500", label: "Compressing..." },
    extracting: { color: "from-emerald-500 to-teal-500", text: "text-emerald-500", label: "Extracting..." },
    complete: { color: "from-zinc-500 to-zinc-400", text: "text-emerald-500", label: "Complete" },
  };

  return (
    <div className="mx-auto max-w-sm space-y-2">
      {(["compressing", "extracting", "complete"] as const).map((s) => (
        <div key={s} className={`flex items-center gap-3 rounded-xl border p-3 transition-all duration-300 ${s === status ? "border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900" : "border-zinc-100 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/50"}`}>
          {s === status && s !== "complete" ? (
            <svg className={`h-4 w-4 animate-spin ${configs[s].text}`} fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
          ) : s === "complete" ? (
            <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          ) : (
            <svg className="h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          )}
          <div className="flex-1">
            <p className={`text-xs font-medium ${s === status ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400 dark:text-zinc-500"}`}>{configs[s].label}</p>
          </div>
          {s === status && <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{progress}%</span>}
        </div>
      ))}
    </div>
  );
}

export function ProgressWithSize() {
  const [progress, setProgress] = useState(65);

  return (
    <div className="mx-auto max-w-sm overflow-hidden rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">archive.zip</span>
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">8.4 MB / 12.8 MB</span>
      </div>
      <div className="mt-3">
        <div className="h-2.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
          <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Estimating...</p>
        <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{progress}%</span>
      </div>
      <div className="mt-3 flex gap-2">
        <button onClick={() => setProgress(Math.max(0, progress - 10))} className="flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700 transition-all hover:bg-zinc-50 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800">Pause</button>
        <button onClick={() => setProgress(Math.min(100, progress + 10))} className="flex-1 rounded-lg bg-zinc-900 px-3 py-2 text-xs font-medium text-white transition-all hover:bg-zinc-800 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">Resume</button>
      </div>
    </div>
  );
}

export function ProgressCompact() {
  const files = [
    { name: "styles.css", size: "2.1 KB", progress: 100 },
    { name: "bundle.js", size: "145 KB", progress: 78 },
    { name: "index.html", size: "3.4 KB", progress: 32 },
    { name: "image.png", size: "1.2 MB", progress: 0 },
  ];

  return (
    <div className="mx-auto max-w-sm space-y-1.5">
      {files.map((f, i) => (
        <div key={i} className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-3 py-2 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{f.name}</span>
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400">{f.size}</span>
            </div>
            <div className="mt-1.5">
              <div className="h-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                <div className="h-full rounded-full bg-zinc-900 dark:bg-zinc-100 transition-all duration-300" style={{ width: `${f.progress}%` }} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProgressComplete() {
  return (
    <div className="mx-auto max-w-sm overflow-hidden rounded-xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm dark:border-emerald-800 dark:bg-emerald-950/30">
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500">
          <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <span className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">Compression complete</span>
      </div>
      <div className="mt-3">
        <div className="h-2 overflow-hidden rounded-full bg-emerald-200 dark:bg-emerald-800">
          <div className="h-full rounded-full bg-emerald-500" style={{ width: "100%" }} />
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <p className="text-xs text-emerald-700 dark:text-emerald-300">16 of 16 files • 4.1 MB</p>
        <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">100%</span>
      </div>
    </div>
  );
}

export function ProgressError() {
  return (
    <div className="mx-auto max-w-sm overflow-hidden rounded-xl border border-rose-200 bg-rose-50 p-4 shadow-sm dark:border-rose-800 dark:bg-rose-950/30">
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-500">
          <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </div>
        <span className="text-sm font-semibold text-rose-900 dark:text-rose-100">Compression failed</span>
      </div>
      <div className="mt-3">
        <div className="h-2 overflow-hidden rounded-full bg-rose-200 dark:bg-rose-800">
          <div className="h-full rounded-full bg-rose-500" style={{ width: "45%" }} />
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <p className="text-xs text-rose-700 dark:text-rose-300">Error at file: image.png</p>
        <span className="text-xs font-semibold text-rose-700 dark:text-rose-300">45%</span>
      </div>
      <button className="mt-3 w-full rounded-lg bg-rose-600 px-3 py-2 text-xs font-medium text-white transition-all hover:bg-rose-700 active:scale-95">Retry</button>
    </div>
  );
}
