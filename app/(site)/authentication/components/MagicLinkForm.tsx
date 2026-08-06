"use client";

import { useState, useEffect } from "react";

export function MagicLinkForm() {
  const [resendCooldown, setResendCooldown] = useState(30);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  return (
    <div className="mx-auto w-full max-w-md rounded-xl border border-blue-200 bg-white p-6 shadow-sm dark:border-blue-900/50 dark:bg-zinc-900">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        </div>
        <h2 className="text-xl font-semibold text-foreground">Check your email</h2>
        <p className="mt-2 text-sm text-muted-foreground dark:text-muted-foreground/70">
          We sent a magic link to <span className="font-medium text-muted-foreground">your@email.com</span>
        </p>
        <p className="mt-1 text-xs text-muted-foreground/70 dark:text-muted-foreground">Click the link in the email to sign in instantly</p>
        <div className="mt-6 text-sm text-muted-foreground dark:text-muted-foreground/70">
          Didn&apos;t receive the email?{" "}
          {resendCooldown > 0 ? (
            <span className="text-muted-foreground/70 dark:text-muted-foreground">Resend in {resendCooldown}s</span>
          ) : (
            <button type="button" onClick={() => setResendCooldown(30)} className="font-medium text-blue-600 hover:underline dark:text-blue-400">Resend</button>
          )}
        </div>
        <button type="button" className="mt-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">Back to login</button>
      </div>
    </div>
  );
}
