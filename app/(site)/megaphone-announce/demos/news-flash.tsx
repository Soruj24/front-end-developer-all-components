"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";

export function NewsFlash() {
  const [breaking, setBreaking] = useState(true);
  const news = [
    { id: 1, title: "Global Summit Reaches Climate Agreement", time: "2 min ago", category: "World" },
    { id: 2, title: "Tech Stocks Rally on Strong Earnings", time: "15 min ago", category: "Business" },
    { id: 3, title: "New Space Mission Launches Successfully", time: "1 hour ago", category: "Science" },
  ];

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <AlertCircle className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">News Flash</h3>
      </div>
      {breaking && (
        <div className="mb-4 animate-pulse rounded-xl border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-950/30">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            <span className="text-xs font-bold uppercase tracking-wide text-red-600 dark:text-red-400">Breaking</span>
          </div>
          <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">Major tech company announces revolutionary AI product</p>
        </div>
      )}
      <div className="space-y-1.5">
        {news.map((item) => (
          <div key={item.id} className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900">
            <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-zinc-900 dark:bg-zinc-100" />
            <div className="flex-1">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{item.title}</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="inline-flex items-center rounded-full border border-zinc-200 px-2 py-0.5 text-[10px] font-medium text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">{item.category}</span>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500">{item.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
