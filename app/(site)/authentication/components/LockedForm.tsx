"use client";

import { useState, useEffect } from "react";

export function LockedForm() {
  const [countdown, setCountdown] = useState(120);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="mx-auto w-full max-w-md rounded-xl border border-red-200 bg-white p-6 shadow-sm dark:border-red-900/50 dark:bg-zinc-900">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/40">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600 dark:text-red-400"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </div>
        <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">Account Temporarily Locked</h2>
        <div className="mt-2 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
          <p className="text-sm text-red-700 dark:text-red-300">
            Your account has been locked due to too many failed login attempts. Please try again later.
          </p>
        </div>
        <div className="mt-4">
          <p className="text-sm text-muted-foreground dark:text-muted-foreground/70">Lockout period remaining</p>
          <p className="mt-1 text-2xl font-bold text-foreground">{formatTime(countdown)}</p>
        </div>
        <button type="button" className="mt-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">Reset password</button>
        <div className="mt-2">
          <button type="button" className="text-sm text-muted-foreground hover:text-muted-foreground dark:text-muted-foreground/70 dark:hover:text-zinc-200">Back to login</button>
        </div>
      </div>
    </div>
  );
}
