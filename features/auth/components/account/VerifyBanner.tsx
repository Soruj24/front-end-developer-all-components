"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";

const KEY = "verify-banner-dismissed";
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function readDismissed() {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

function getSnapshot() {
  return readDismissed();
}

export function VerifyBanner() {
  const dismissed = useSyncExternalStore(subscribe, getSnapshot, () => false);

  function dismiss() {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      // ignore
    }
    listeners.forEach((listener) => listener());
  }

  if (dismissed) return null;

  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm dark:border-amber-900/40 dark:bg-amber-950/30">
      <p className="text-amber-800 dark:text-amber-200">
        Confirm your email to unlock publishing.{" "}
        <Link
          href="/account/security"
          className="font-medium underline underline-offset-2 hover:opacity-80"
        >
          Verify now
        </Link>
      </p>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={dismiss}
        className="shrink-0 rounded-md p-1 text-amber-700 transition-colors hover:bg-amber-100 dark:text-amber-300 dark:hover:bg-amber-900/40"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
          <path d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
