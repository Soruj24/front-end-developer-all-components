"use client";

import { useState } from "react";

export function BasicCard() {
  return (
    <div className="mx-auto max-w-sm overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
      <div className="flex items-start gap-4 p-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30">
          <svg className="h-6 w-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">release-v2.1.0.zip</h3>
          <div className="mt-1.5 flex gap-3 text-xs text-zinc-500 dark:text-zinc-400">
            <span>24 files</span>
            <span className="text-zinc-300 dark:text-zinc-600">·</span>
            <span>1.8 MB</span>
            <span className="text-zinc-300 dark:text-zinc-600">·</span>
            <span>2h ago</span>
          </div>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3 py-2 text-xs font-medium text-white transition-all hover:bg-zinc-800 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          Download
        </button>
      </div>
    </div>
  );
}

export function CardVariants() {
  return (
    <div className="flex flex-col gap-2">
      {[
        { name: "assets.zip", files: 156, size: "4.2 MB", color: "blue" },
        { name: "backup-db.zip", files: 12, size: "89.3 MB", color: "violet" },
        { name: "source-code.zip", files: 847, size: "12.1 MB", color: "emerald" },
      ].map((z) => (
        <div key={z.name} className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-3 shadow-sm transition-all duration-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${z.color}-100 dark:bg-${z.color}-900/30`}>
            <svg className={`h-5 w-5 text-${z.color}-600 dark:text-${z.color}-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{z.name}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{z.files} files · {z.size}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CardWithProgress() {
  const [progress, setProgress] = useState(65);

  return (
    <div className="mx-auto max-w-sm overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-100 to-violet-100 dark:from-blue-900/30 dark:to-violet-900/30">
            <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">project-export.zip</h3>
            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">342 files · 8.7 MB</p>
          </div>
          <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{progress}%</span>
        </div>
        <div className="mt-3">
          <div className="h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
            <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <button onClick={() => setProgress(Math.max(0, progress - 10))} className="flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700 transition-all hover:bg-zinc-50 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800">Pause</button>
          <button onClick={() => setProgress(Math.min(100, progress + 10))} className="flex-1 rounded-lg bg-zinc-900 px-3 py-2 text-xs font-medium text-white transition-all hover:bg-zinc-800 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">Resume</button>
        </div>
      </div>
    </div>
  );
}

export function CardCompact() {
  return (
    <div className="mx-auto max-w-sm space-y-1.5">
      {["styles.css", "bundle.js", "index.html"].map((name, i) => (
        <div key={name} className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-3 py-2 shadow-sm transition-all duration-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
          <svg className="h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
          <span className="flex-1 text-xs font-medium text-zinc-700 dark:text-zinc-300">{name}</span>
          <span className="text-[10px] text-zinc-500 dark:text-zinc-400">{["2.1 KB", "145 KB", "3.4 KB"][i]}</span>
        </div>
      ))}
    </div>
  );
}

export function CardWithPassword() {
  const [locked, setLocked] = useState(true);

  return (
    <div className="mx-auto max-w-sm overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30">
            <svg className="h-6 w-6 text-rose-600 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">confidential.zip</h3>
            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">Password protected · 2.3 MB</p>
          </div>
          <button onClick={() => setLocked(!locked)} className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700 transition-all hover:bg-zinc-50 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800">
            {locked ? (
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            ) : (
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export function CardList() {
  return (
    <div className="mx-auto max-w-sm space-y-2">
      {[
        { name: "release-v2.1.0.zip", files: 24, size: "1.8 MB", time: "2h ago" },
        { name: "assets-bundle.zip", files: 156, size: "4.2 MB", time: "5h ago" },
        { name: "source-code.zip", files: 847, size: "12.1 MB", time: "1d ago" },
        { name: "backup-db.zip", files: 12, size: "89.3 MB", time: "3d ago" },
      ].map((z) => (
        <div key={z.name} className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-3 shadow-sm transition-all duration-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30">
            <svg className="h-5 w-5 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{z.name}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{z.files} files · {z.size} · {z.time}</p>
          </div>
          <button className="inline-flex items-center rounded-lg bg-zinc-900 p-2 text-white transition-all hover:bg-zinc-800 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          </button>
        </div>
      ))}
    </div>
  );
}
