"use client";

import { useRef, useState } from "react";
import { DEMO_CREDENTIALS, mockSignIn } from "../auth-api";
import type { MockSession } from "../auth-api";
import { isAbortError } from "@/lib/api/api-errors";

const inputClass = "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-border dark:bg-muted dark:text-zinc-100";
const labelClass = "mb-1.5 block text-sm font-medium text-muted-foreground";

/**
 * Sign-in form wired to the mock auth API (same visuals as SignInForm).
 * Demonstrates loading, success (demo session), and 401 error states with
 * duplicate-submit prevention. Demo only — no network, no real accounts.
 */
export function MockSignInForm() {
  const [email, setEmail] = useState<string>(DEMO_CREDENTIALS.email);
  const [password, setPassword] = useState<string>(DEMO_CREDENTIALS.password);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const [session, setSession] = useState<MockSession | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setStatus("loading");
    setError("");
    try {
      const result = await mockSignIn({ email, password }, controller.signal);
      setSession(result);
      setStatus("success");
    } catch (err) {
      if (isAbortError(err)) return;
      setError(err instanceof Error ? err.message : "Sign-in failed.");
      setStatus("error");
    }
  };

  const handleSignOut = () => {
    abortRef.current?.abort();
    setSession(null);
    setStatus("idle");
    setError("");
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-xl border border-border bg-white p-6 shadow-sm dark:border-border dark:bg-zinc-900">
      <div className="mb-4 rounded-lg border border-dashed border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
        Demo data · mock auth API, no network. Accepts only{" "}
        <code className="font-mono">{DEMO_CREDENTIALS.email}</code> /{" "}
        <code className="font-mono">{DEMO_CREDENTIALS.password}</code>
      </div>

      {status === "success" && session ? (
        <div className="flex flex-col gap-3" role="status">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
              {session.user.name.charAt(0)}
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">Signed in as {session.user.name}</p>
              <p className="font-mono text-xs text-muted-foreground">{session.user.email}</p>
            </div>
          </div>
          <p className="truncate font-mono text-[11px] text-muted-foreground" title={session.token}>
            token: {session.token}
          </p>
          <button
            type="button"
            onClick={handleSignOut}
            className="w-full rounded-lg border border-border py-2.5 text-sm font-medium text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Sign out (reset demo)
          </button>
        </div>
      ) : (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className={labelClass} htmlFor="mock-email">Email</label>
            <input id="mock-email" type="email" required placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="mock-password">Password</label>
            <input id="mock-password" type="password" required placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
          </div>
          {status === "error" && (
            <p role="alert" className="rounded-lg border border-danger/40 bg-danger/5 px-3 py-2 text-sm text-foreground">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-lg bg-zinc-900 py-2.5 text-sm font-medium text-white transition hover:bg-muted disabled:opacity-50 dark:bg-foreground dark:text-background"
          >
            {status === "loading" ? "Signing in…" : "Sign In"}
          </button>
          <p aria-live="polite" role="status" className="sr-only">
            {status === "loading" ? "Signing in." : ""}
          </p>
        </form>
      )}
    </div>
  );
}
