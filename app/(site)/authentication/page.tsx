"use client";

import { useState, useRef, useEffect, type KeyboardEvent, type ChangeEvent } from "react";

type AuthView = "main" | "password-reset-1" | "password-reset-2" | "2fa" | "locked" | "magic-link" | "session-expired";

export default function Authentication() {
  const [view, setView] = useState<AuthView>("main");
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [signinLoading, setSigninLoading] = useState(false);
  const [signinErrors, setSigninErrors] = useState<{ email?: string; password?: string }>({});

  const [fullName, setFullName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupErrors, setSignupErrors] = useState<Record<string, string>>({});

  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const [codeDigits, setCodeDigits] = useState(["", "", "", "", "", ""]);
  const codeRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [verifyLoading, setVerifyLoading] = useState(false);

  const [lockCountdown, setLockCountdown] = useState(120);
  const [lockTimer, setLockTimer] = useState<ReturnType<typeof setInterval> | null>(null);

  const [resendCooldown, setResendCooldown] = useState(30);
  const [resendTimer, setResendTimer] = useState<ReturnType<typeof setInterval> | null>(null);

  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const passwordStrength = (pw: string): { label: string; color: string; width: string } => {
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

  const strength = passwordStrength(signupPassword);
  const passwordsMatch = signupPassword === confirmPassword;

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignin = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { email?: string; password?: string } = {};
    if (!signinEmail.trim()) errs.email = "Email is required";
    else if (!validateEmail(signinEmail)) errs.email = "Invalid email format";
    if (!signinPassword) errs.password = "Password is required";
    setSigninErrors(errs);
    if (Object.keys(errs).length) return;
    setSigninLoading(true);
    setTimeout(() => {
      setSigninLoading(false);
      setActiveDemo("session-expired");
      setView("session-expired");
    }, 2000);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = "Full name is required";
    if (!signupEmail.trim()) errs.signupEmail = "Email is required";
    else if (!validateEmail(signupEmail)) errs.signupEmail = "Invalid email format";
    if (!signupPassword) errs.signupPassword = "Password is required";
    else if (signupPassword.length < 6) errs.signupPassword = "At least 6 characters";
    if (!confirmPassword) errs.confirmPassword = "Confirm your password";
    else if (signupPassword !== confirmPassword) errs.confirmPassword = "Passwords do not match";
    if (!agreeTerms) errs.agreeTerms = "You must agree to the terms";
    setSignupErrors(errs);
    if (Object.keys(errs).length) return;
    setSignupLoading(true);
    setTimeout(() => {
      setSignupLoading(false);
      setActiveDemo("magic-link");
      setView("magic-link");
    }, 2000);
  };

  const handleResetSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim() || !validateEmail(resetEmail)) return;
    setResetLoading(true);
    setTimeout(() => {
      setResetLoading(false);
      setView("password-reset-2");
    }, 1500);
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const next = [...codeDigits];
    next[index] = value;
    setCodeDigits(next);
    if (value && index < 5) codeRefs.current[index + 1]?.focus();
  };

  const handleCodeKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !codeDigits[index] && index > 0) {
      codeRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify2FA = () => {
    setVerifyLoading(true);
    setTimeout(() => {
      setVerifyLoading(false);
    }, 2000);
  };

  const triggerLock = () => {
    setView("locked");
    setActiveDemo("locked");
    setLockCountdown(120);
    const timer = setInterval(() => {
      setLockCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setLockTimer(timer);
  };

  const triggerResend = () => {
    setResendCooldown(30);
    const timer = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setResendTimer(timer);
  };

  useEffect(() => {
    return () => {
      if (lockTimer) clearInterval(lockTimer);
      if (resendTimer) clearInterval(resendTimer);
    };
  }, [lockTimer, resendTimer]);

  const goMain = () => { setView("main"); setActiveDemo(null); };
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  const inputClass = "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-border dark:bg-muted dark:text-zinc-100 dark:focus:border-blue-500";
  const inputErrorClass = "w-full rounded-lg border border-red-400 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-danger focus:ring-2 focus:ring-red-200 dark:border-danger dark:bg-muted dark:text-zinc-100";
  const labelClass = "mb-1.5 block text-sm font-medium text-muted-foreground";
  const btnPrimary = "w-full rounded-lg bg-zinc-900 py-2.5 text-sm font-medium text-white transition hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed dark:bg-foreground dark:text-background dark:hover:bg-muted";
  const btnBlue = "w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed";
  const cardClass = "rounded-xl border border-border bg-white p-6 shadow-sm dark:border-border dark:bg-zinc-900";

  const SocialButton = ({ provider, icon, hoverColor }: { provider: string; icon: string; hoverColor: string }) => (
    <button className={`flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition hover:${hoverColor} dark:border-border dark:text-muted-foreground`}>
      <span dangerouslySetInnerHTML={{ __html: icon }} />
      {provider}
    </button>
  );

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Authentication</h1>
        <p className="mt-2 text-muted-foreground dark:text-muted-foreground/70">Comprehensive auth form examples with validation and flows</p>
      </div>

      <div className="mx-auto flex w-full max-w-md flex-col gap-4">
        {/* Demo quick-switch */}
        <div className="flex flex-wrap gap-2">
          {[
            { key: "main", label: "Sign In / Up" },
            { key: "password-reset-1", label: "Reset Password" },
            { key: "2fa", label: "2FA" },
            { key: "locked", label: "Locked" },
            { key: "magic-link", label: "Magic Link" },
            { key: "session-expired", label: "Session Expired" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => { setView(key as AuthView); setActiveDemo(key); }}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${activeDemo === key ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground hover:bg-muted dark:text-muted-foreground/70 dark:hover:bg-muted"}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* MAIN: Sign In / Sign Up */}
        {view === "main" && (
          <div className={cardClass}>
            <div className="mb-6 flex border-b border-border">
              {(["signin", "signup"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 pb-3 text-sm font-medium transition ${tab === t ? "border-b-2 border-blue-600 text-blue-600" : "text-muted-foreground hover:text-muted-foreground dark:text-muted-foreground/70 dark:hover:text-zinc-200"}`}
                >
                  {t === "signin" ? "Sign In" : "Sign Up"}
                </button>
              ))}
            </div>

            {tab === "signin" ? (
              <form className="flex flex-col gap-4" onSubmit={handleSignin}>
                <div>
                  <label className={labelClass} htmlFor="si-email">Email</label>
                  <input
                    id="si-email"
                    type="email"
                    placeholder="you@example.com"
                    value={signinEmail}
                    onChange={(e) => setSigninEmail(e.target.value)}
                    className={signinErrors.email ? inputErrorClass : inputClass}
                  />
                  {signinErrors.email && <p className="mt-1 text-xs text-red-500">{signinErrors.email}</p>}
                </div>
                <div>
                  <label className={labelClass} htmlFor="si-password">Password</label>
                  <div className="relative">
                    <input
                      id="si-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={signinPassword}
                      onChange={(e) => setSigninPassword(e.target.value)}
                      className={signinErrors.password ? `${inputErrorClass} pr-10` : `${inputClass} pr-10`}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/70 hover:text-muted-foreground dark:hover:text-zinc-300">
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      )}
                    </button>
                  </div>
                  {signinErrors.password && <p className="mt-1 text-xs text-red-500">{signinErrors.password}</p>}
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="rounded border-border text-blue-600 focus:ring-blue-500" />
                    Remember me
                  </label>
                  <button type="button" onClick={() => { setView("password-reset-1"); setActiveDemo("password-reset-1"); }} className="text-sm text-blue-600 hover:underline dark:text-blue-400">
                    Forgot password?
                  </button>
                </div>
                <button type="submit" disabled={signinLoading} className={btnPrimary}>
                  {signinLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                      Signing in...
                    </span>
                  ) : "Sign In"}
                </button>

                <div className="relative my-2">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border dark:border-border"/></div>
                  <div className="relative flex justify-center text-xs"><span className="bg-white px-2 text-muted-foreground dark:bg-zinc-900 dark:text-muted-foreground/70">or continue with</span></div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <SocialButton provider="Google" hoverColor="bg-muted/40 dark:bg-muted" icon={`<svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>`} />
                  <SocialButton provider="GitHub" hoverColor="bg-muted/40 dark:bg-muted" icon={`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`} />
                  <SocialButton provider="Twitter" hoverColor="bg-muted/40 dark:bg-muted" icon={`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 4.01c-.81.36-1.68.6-2.6.72a4.56 4.56 0 0 0 2-2.51c-.87.52-1.84.89-2.87 1.09a4.53 4.53 0 0 0-7.72 4.13c-3.77-.19-7.12-2-9.36-4.75a4.53 4.53 0 0 0 1.4 6.04c-.74-.02-1.44-.23-2.05-.56v.06a4.53 4.53 0 0 0 3.63 4.44c-.67.18-1.37.2-2.05.08a4.53 4.53 0 0 0 4.23 3.14A9.1 9.1 0 0 1 2 19.54a12.82 12.82 0 0 0 6.94 2.03c8.33 0 12.88-6.9 12.88-12.88 0-.2 0-.39-.01-.59.88-.64 1.65-1.44 2.25-2.35-.81.36-1.68.6-2.6.72z"/></svg>`} />
                  <SocialButton provider="Apple" hoverColor="bg-muted/40 dark:bg-muted" icon={`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.62-.71 1.64-1.25 2.6-1.28.1 1.07-.29 2.14-.9 2.91-.62.79-1.64 1.39-2.65 1.3-.1-1.03.29-2.11.95-2.93"/></svg>`} />
                </div>

                <p className="mt-2 text-center text-sm text-muted-foreground dark:text-muted-foreground/70">
                  Don&apos;t have an account?{" "}
                  <button type="button" onClick={() => setTab("signup")} className="font-medium text-blue-600 hover:underline dark:text-blue-400">Sign up</button>
                </p>
              </form>
            ) : (
              <form className="flex flex-col gap-4" onSubmit={handleSignup}>
                <div>
                  <label className={labelClass} htmlFor="su-name">Full Name</label>
                  <input id="su-name" type="text" placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} className={signupErrors.fullName ? inputErrorClass : inputClass} />
                  {signupErrors.fullName && <p className="mt-1 text-xs text-red-500">{signupErrors.fullName}</p>}
                </div>
                <div>
                  <label className={labelClass} htmlFor="su-email">Email</label>
                  <input id="su-email" type="email" placeholder="you@example.com" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} className={signupErrors.signupEmail ? inputErrorClass : inputClass} />
                  {signupErrors.signupEmail && <p className="mt-1 text-xs text-red-500">{signupErrors.signupEmail}</p>}
                </div>
                <div>
                  <label className={labelClass} htmlFor="su-password">Password</label>
                  <div className="relative">
                    <input id="su-password" type={showSignupPassword ? "text" : "password"} placeholder="Create a password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} className={signupErrors.signupPassword ? `${inputErrorClass} pr-10` : `${inputClass} pr-10`} />
                    <button type="button" onClick={() => setShowSignupPassword(!showSignupPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/70 hover:text-muted-foreground dark:hover:text-zinc-300">
                      {showSignupPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      )}
                    </button>
                  </div>
                  {signupErrors.signupPassword && <p className="mt-1 text-xs text-red-500">{signupErrors.signupPassword}</p>}
                  {signupPassword.length > 0 && (
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
                  <div className="relative">
                    <input id="su-confirm" type={showConfirmPassword ? "text" : "password"} placeholder="Repeat password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={signupErrors.confirmPassword ? `${inputErrorClass} pr-10` : `${inputClass} pr-10`} />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/70 hover:text-muted-foreground dark:hover:text-zinc-300">
                      {showConfirmPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      )}
                    </button>
                  </div>
                  {signupErrors.confirmPassword && <p className="mt-1 text-xs text-red-500">{signupErrors.confirmPassword}</p>}
                  {confirmPassword && signupPassword && !signupErrors.confirmPassword && (
                    <p className={`mt-1 text-xs ${passwordsMatch ? "text-green-500" : "text-red-500"}`}>
                      {passwordsMatch ? "Passwords match" : "Passwords do not match"}
                    </p>
                  )}
                </div>
                <label className="flex items-start gap-2 text-sm text-muted-foreground">
                  <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} className="mt-0.5 rounded border-border text-blue-600 focus:ring-blue-500" />
                  I agree to the <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">Privacy Policy</a>
                </label>
                {signupErrors.agreeTerms && <p className="text-xs text-red-500">{signupErrors.agreeTerms}</p>}
                <button type="submit" disabled={signupLoading} className={btnBlue}>
                  {signupLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                      Creating account...
                    </span>
                  ) : "Create Account"}
                </button>

                <div className="relative my-2">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border dark:border-border"/></div>
                  <div className="relative flex justify-center text-xs"><span className="bg-white px-2 text-muted-foreground dark:bg-zinc-900 dark:text-muted-foreground/70">or sign up with</span></div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <SocialButton provider="Google" hoverColor="bg-muted/40 dark:bg-muted" icon={`<svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>`} />
                  <SocialButton provider="GitHub" hoverColor="bg-muted/40 dark:bg-muted" icon={`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`} />
                  <SocialButton provider="Twitter" hoverColor="bg-muted/40 dark:bg-muted" icon={`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22 4.01c-.81.36-1.68.6-2.6.72a4.56 4.56 0 0 0 2-2.51c-.87.52-1.84.89-2.87 1.09a4.53 4.53 0 0 0-7.72 4.13c-3.77-.19-7.12-2-9.36-4.75a4.53 4.53 0 0 0 1.4 6.04c-.74-.02-1.44-.23-2.05-.56v.06a4.53 4.53 0 0 0 3.63 4.44c-.67.18-1.37.2-2.05.08a4.53 4.53 0 0 0 4.23 3.14A9.1 9.1 0 0 1 2 19.54a12.82 12.82 0 0 0 6.94 2.03c8.33 0 12.88-6.9 12.88-12.88 0-.2 0-.39-.01-.59.88-.64 1.65-1.44 2.25-2.35-.81.36-1.68.6-2.6.72z"/></svg>`} />
                  <SocialButton provider="Apple" hoverColor="bg-muted/40 dark:bg-muted" icon={`<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.62-.71 1.64-1.25 2.6-1.28.1 1.07-.29 2.14-.9 2.91-.62.79-1.64 1.39-2.65 1.3-.1-1.03.29-2.11.95-2.93"/></svg>`} />
                </div>

                <p className="mt-2 text-center text-sm text-muted-foreground dark:text-muted-foreground/70">
                  Already have an account?{" "}
                  <button type="button" onClick={() => setTab("signin")} className="font-medium text-blue-600 hover:underline dark:text-blue-400">Sign in</button>
                </p>
              </form>
            )}
          </div>
        )}

        {/* Password Reset - Step 1 */}
        {view === "password-reset-1" && (
          <div className={cardClass}>
            <div className="mb-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <h2 className="text-xl font-semibold text-foreground">Reset Password</h2>
              <p className="mt-1 text-sm text-muted-foreground dark:text-muted-foreground/70">Enter your email and we&apos;ll send you a reset link</p>
            </div>
            <form className="flex flex-col gap-4" onSubmit={handleResetSend}>
              <div>
                <label className={labelClass} htmlFor="reset-email">Email address</label>
                <input id="reset-email" type="email" placeholder="you@example.com" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} className={inputClass} />
              </div>
              <button type="submit" disabled={resetLoading || !resetEmail.trim()} className={btnBlue}>
                {resetLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                    Sending...
                  </span>
                ) : "Send Reset Link"}
              </button>
              <button type="button" onClick={goMain} className="text-center text-sm text-blue-600 hover:underline dark:text-blue-400">Back to login</button>
            </form>
          </div>
        )}

        {/* Password Reset - Step 2: Check Email */}
        {view === "password-reset-2" && (
          <div className={cardClass}>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <h2 className="text-xl font-semibold text-foreground">Check your email</h2>
              <p className="mt-2 text-sm text-muted-foreground dark:text-muted-foreground/70">
                We&apos;ve sent a password reset link to{" "}
                <span className="font-medium text-muted-foreground">{resetEmail || "your email"}</span>
              </p>
              <div className="mt-4 rounded-lg bg-muted/40 p-3 text-xs text-muted-foreground dark:bg-muted dark:text-muted-foreground/70">
                Didn&apos;t receive the email? Check your spam folder or try a different email address.
              </div>
              <button type="button" onClick={goMain} className="mt-6 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">Back to login</button>
            </div>
          </div>
        )}

        {/* Two-Factor Auth */}
        {view === "2fa" && (
          <div className={cardClass}>
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
              <button type="button" onClick={handleVerify2FA} disabled={verifyLoading || codeDigits.join("").length !== 6} className={btnBlue}>
                {verifyLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                    Verifying...
                  </span>
                ) : "Verify"}
              </button>
              <button type="button" className="text-center text-sm text-muted-foreground hover:text-muted-foreground dark:text-muted-foreground/70 dark:hover:text-zinc-200">
                Send code via SMS instead
              </button>
              <button type="button" onClick={goMain} className="text-center text-sm text-blue-600 hover:underline dark:text-blue-400">Back to login</button>
            </div>
          </div>
        )}

        {/* Account Locked */}
        {view === "locked" && (
          <div className={`${cardClass} border-red-200 dark:border-red-900/50`}>
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
                <p className="mt-1 text-2xl font-bold text-foreground">{formatTime(lockCountdown)}</p>
              </div>
              <button type="button" onClick={() => { setView("password-reset-1"); setActiveDemo("password-reset-1"); }} className="mt-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">
                Reset password
              </button>
              <div className="mt-2">
                <button type="button" onClick={goMain} className="text-sm text-muted-foreground hover:text-muted-foreground dark:text-muted-foreground/70 dark:hover:text-zinc-200">
                  Back to login
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Magic Link Sent */}
        {view === "magic-link" && (
          <div className={`${cardClass} border-blue-200 dark:border-blue-900/50`}>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <h2 className="text-xl font-semibold text-foreground">Check your email</h2>
              <p className="mt-2 text-sm text-muted-foreground dark:text-muted-foreground/70">
                We sent a magic link to <span className="font-medium text-muted-foreground">{signupEmail || "your email"}</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground/70 dark:text-muted-foreground">Click the link in the email to sign in instantly</p>
              <div className="mt-6 text-sm text-muted-foreground dark:text-muted-foreground/70">
                Didn&apos;t receive the email?{" "}
                {resendCooldown > 0 ? (
                  <span className="text-muted-foreground/70 dark:text-muted-foreground">Resend in {resendCooldown}s</span>
                ) : (
                  <button type="button" onClick={triggerResend} className="font-medium text-blue-600 hover:underline dark:text-blue-400">Resend</button>
                )}
              </div>
              <button type="button" onClick={goMain} className="mt-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400">Back to login</button>
            </div>
          </div>
        )}

        {/* Session Expired */}
        {view === "session-expired" && (
          <div className={`${cardClass} border-amber-200 dark:border-amber-900/50`}>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/40">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600 dark:text-amber-400"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <h2 className="text-xl font-semibold text-foreground">Your session has expired</h2>
              <p className="mt-2 text-sm text-muted-foreground dark:text-muted-foreground/70">
                For your security, your session timed out due to inactivity.
              </p>
              <div className="mt-2 rounded-lg bg-amber-50 p-3 text-xs text-amber-700 dark:bg-amber-900/20 dark:text-amber-300">
                Any unsaved changes may have been lost.
              </div>
              <button type="button" onClick={goMain} className="mt-6 w-full rounded-lg bg-zinc-900 py-2.5 text-sm font-medium text-white transition hover:bg-muted dark:bg-foreground dark:text-background dark:hover:bg-muted">
                Sign in again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
