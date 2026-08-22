"use client";

import { Fingerprint } from "lucide-react";

export function ComplianceScoreDemo() {
  const score = 87;
  const categories = [
    { name: "Data Encryption", score: 95, status: "pass" },
    { name: "Access Control", score: 82, status: "pass" },
    { name: "Network Security", score: 78, status: "warning" },
    { name: "Audit Logging", score: 90, status: "pass" },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Fingerprint className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Compliance Score</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="mb-4 flex justify-center">
            <div className="relative h-24 w-24">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="text-zinc-200 dark:text-zinc-800" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="text-zinc-900 dark:text-zinc-100" strokeDasharray={`${score * 2.51} 251`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">{score}%</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            {categories.map((c) => (
              <div key={c.name} className="rounded-lg bg-zinc-50 px-3 py-2 dark:bg-zinc-900">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[10px] font-medium text-zinc-700 dark:text-zinc-300">{c.name}</span>
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400">{c.score}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
                  <div className={`h-full rounded-full ${c.score >= 90 ? "bg-emerald-500" : c.score >= 80 ? "bg-yellow-500" : "bg-red-500"}`} style={{ width: `${c.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
