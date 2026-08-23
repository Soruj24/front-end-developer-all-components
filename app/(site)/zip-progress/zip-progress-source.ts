export const ZIP_PROGRESS_SOURCE = `"use client";

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
          <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-300" style={{ width: \`\${progress}%\` }} />
        </div>
      </div>
    </div>
  );
}`;
