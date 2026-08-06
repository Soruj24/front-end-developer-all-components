"use client";

import { useState } from "react";

export function SignUpForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputClass = "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-border dark:bg-muted dark:text-zinc-100";
  const labelClass = "mb-1.5 block text-sm font-medium text-muted-foreground";

  const passwordStrength = (pw: string) => {
    if (pw.length === 0) return { label: "", color: "", width: "0%" };
    let score = 0;
    if (pw.length >= 6) score++;
    if (pw.length >= 10) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    if (score <= 1) return { label: "Weak", color: "bg-red-500", width: "25%" };
    if (score <= 3) return { label: "Medium", color: "bg-yellow-500", width: "60%" };
    return { label: "Strong", color: "bg-green-500", width: "100%" };
  };

  const strength = passwordStrength(password);
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-xl border border-border bg-white p-6 shadow-sm dark:border-border dark:bg-zinc-900">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-semibold text-foreground">Create Account</h2>
        <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground/70">Fill in the details to get started</p>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <label className={labelClass} htmlFor="su-name">Full Name</label>
          <input id="su-name" type="text" placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="su-email">Email</label>
          <input id="su-email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="su-password">Password</label>
          <input id="su-password" type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
          {password.length > 0 && (
            <div className="mt-2">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div className={`h-full rounded-full transition-all ${strength.color}`} style={{ width: strength.width }} />
              </div>
              <p className={`mt-0.5 text-xs ${strength.label === "Weak" ? "text-red-500" : strength.label === "Medium" ? "text-yellow-500" : "text-green-500"}`}>
                {strength.label && `Password strength: ${strength.label}`}
              </p>
            </div>
          )}
        </div>
        <div>
          <label className={labelClass} htmlFor="su-confirm">Confirm Password</label>
          <input id="su-confirm" type="password" placeholder="Repeat password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={inputClass} />
          {passwordsMatch && <p className="mt-1 text-xs text-green-500">Passwords match</p>}
        </div>
        <label className="flex items-start gap-2 text-sm text-muted-foreground">
          <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} className="mt-0.5 rounded border-border text-blue-600 focus:ring-blue-500" />
          I agree to the <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">Privacy Policy</a>
        </label>
        <button type="submit" disabled={loading} className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50">
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}
