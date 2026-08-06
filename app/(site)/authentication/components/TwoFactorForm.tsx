"use client";

import { useState, useRef, type KeyboardEvent, type ChangeEvent } from "react";

export function TwoFactorForm() {
  const [codeDigits, setCodeDigits] = useState(["", "", "", "", ""]);
  const codeRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [loading, setLoading] = useState(false);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const next = [...codeDigits];
    next[index] = value;
    setCodeDigits(next);
    if (value && index < 4) codeRefs.current[index + 1]?.focus();
  };

  const handleCodeKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !codeDigits[index] && index > 0) {
      codeRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-xl border border-border bg-white p-6 shadow-sm dark:border-border dark:bg-zinc-900">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/40">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-400"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </div>
        <h2 className="text-xl font-semibold text-foreground">Two-Factor Authentication</h2>
        <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground/70">Enter the 6-digit code from your authenticator app</p>
      </div>
      <div className="flex justify-center gap-2 mb-6">
        {codeDigits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => { codeRefs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleCodeChange(i, e.target.value)}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleCodeKeyDown(i, e)}
            className="h-12 w-11 rounded-lg border border-border bg-white text-center text-lg font-semibold outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-border dark:bg-muted dark:text-zinc-100 dark:focus:border-blue-500"
          />
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <button type="button" onClick={handleVerify} disabled={loading || codeDigits.join("").length !== 5} className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? "Verifying..." : "Verify"}
        </button>
        <button type="button" className="text-center text-sm text-muted-foreground hover:text-muted-foreground dark:text-muted-foreground/70 dark:hover:text-zinc-200">Send code via SMS instead</button>
        <button type="button" className="text-center text-sm text-blue-600 hover:underline dark:text-blue-400">Back to login</button>
      </div>
    </div>
  );
}
