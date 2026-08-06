"use client";

import { useState } from "react";

export function PasswordResetForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  if (sent) {
    return (
      <div className="mx-auto w-full max-w-md rounded-xl border border-border bg-white p-6 shadow-sm dark:border-border dark:bg-zinc-900">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <h2 className="text-xl font-semibold text-foreground">Check your email</h2>
          <p className="mt-2 text-sm text-muted-foreground dark:text-muted-foreground/70">
            We&apos;ve sent a password reset link to <span className="font-medium text-muted-foreground">{email}</span>
          </p>
          <div className="mt-4 rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground dark:bg-muted dark:text-muted-foreground/70">
            Didn&apos;t receive the email? Check your spam folder or try a different email address.
          </div>
          <button type="button" onClick={() => setSent(false)} className="mt-6 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">Back to reset</button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-xl border border-border bg-white p-6 shadow-sm dark:border-border dark:bg-zinc-900">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </div>
        <h2 className="text-xl font-semibold text-foreground">Reset Password</h2>
        <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground/70">Enter your email and we&apos;ll send you a reset link</p>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-muted-foreground" htmlFor="reset-email">Email address</label>
          <input id="reset-email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-border dark:bg-muted dark:text-zinc-100" />
        </div>
        <button type="submit" disabled={loading || !email.trim()} className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
        <button type="button" className="text-center text-sm text-blue-600 hover:underline dark:text-blue-400">Back to login</button>
      </form>
    </div>
  );
}
