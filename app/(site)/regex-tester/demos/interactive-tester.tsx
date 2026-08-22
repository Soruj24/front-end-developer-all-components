"use client";

import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

export function InteractiveTester() {
  const [pattern, setPattern] = useState("^[a-z]+$");
  const [testStr, setTestStr] = useState("hello");

  let match = false;
  let error = "";
  try {
    const regex = new RegExp(pattern);
    match = regex.test(testStr);
  } catch (e) {
    error = "Invalid pattern";
  }

  return (
    <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="space-y-3">
        <div>
          <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Pattern</label>
          <div className="mt-1 flex items-center gap-1 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-900">
            <span className="text-zinc-400 dark:text-zinc-500">/</span>
            <input
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="flex-1 bg-transparent font-mono text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
              placeholder="Enter regex pattern..."
            />
            <span className="text-zinc-400 dark:text-zinc-500">/</span>
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Test String</label>
          <input
            value={testStr}
            onChange={(e) => setTestStr(e.target.value)}
            className="mt-1 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-600 dark:focus:ring-zinc-800"
            placeholder="Enter test string..."
          />
        </div>
        {error ? (
          <div className="flex items-center gap-2 text-xs text-red-500 dark:text-red-400">
            <XCircle className="h-3.5 w-3.5" />
            <span className="font-medium">{error}</span>
          </div>
        ) : (
          <div className={`flex items-center gap-2 text-xs font-medium ${match ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-400 dark:text-zinc-500"}`}>
            {match ? <CheckCircle className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
            {match ? "Pattern matches" : "No match"}
          </div>
        )}
      </div>
    </div>
  );
}
