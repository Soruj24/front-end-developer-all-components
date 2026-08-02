"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { NotFoundLayout, GoHomeButton } from "./NotFoundShell";
import { languages, notFoundTranslations } from "./data";

export function Countdown404() {
  const [countdown, setCountdown] = useState(10);
  const [countdownRunning, setCountdownRunning] = useState(false);

  const startCountdown = useCallback(() => {
    setCountdown(10);
    setCountdownRunning(true);
  }, []);

  useEffect(() => {
    if (!countdownRunning || countdown <= 0) return;
    const t = setTimeout(() => {
      if (countdown <= 1) {
        window.location.href = "/";
      } else {
        setCountdown((c) => c - 1);
      }
    }, 1000);
    return () => clearTimeout(t);
  }, [countdownRunning, countdown]);

  return (
    <NotFoundLayout className="py-20">
      <h1 className="text-8xl font-bold text-foreground">404</h1>
      <p className="mt-3 text-lg text-muted-foreground">Redirecting you home in...</p>
      <div className="mt-6 flex h-24 w-24 items-center justify-center rounded-full border-4 border-indigo-500 text-4xl font-bold text-indigo-500">
        {countdown}
      </div>
      {!countdownRunning && (
        <button onClick={startCountdown} className="mt-8 rounded-lg bg-indigo-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-600">Start Countdown</button>
      )}
      {countdownRunning && (
        <Link href="/" className="mt-6 text-sm text-indigo-500 underline underline-offset-2 hover:text-indigo-600">Go now</Link>
      )}
    </NotFoundLayout>
  );
}

export function Contact404() {
  return (
    <NotFoundLayout className="py-20">
      <h1 className="text-8xl font-bold text-zinc-200 dark:text-muted-foreground">404</h1>
      <p className="mt-2 text-lg text-muted-foreground">Still stuck?</p>
      <p className="text-sm text-muted-foreground/70">Contact our support team</p>
      <div className="mt-8 flex gap-4">
        <a href="mailto:support@example.com" className="flex items-center gap-2 rounded-lg border bg-white px-5 py-3 text-sm font-medium text-muted-foreground transition-all hover:border-indigo-300 hover:text-indigo-600 dark:border-border dark:bg-muted dark:text-muted-foreground dark:hover:border-indigo-400">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          Email
        </a>
        <a href="#" className="flex items-center gap-2 rounded-lg border bg-white px-5 py-3 text-sm font-medium text-muted-foreground transition-all hover:border-indigo-300 hover:text-indigo-600 dark:border-border dark:bg-muted dark:text-muted-foreground dark:hover:border-indigo-400">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          Live Chat
        </a>
      </div>
      <Link href="/" className="mt-8 text-sm text-muted-foreground/70 underline underline-offset-2 hover:text-muted-foreground">Go Home</Link>
    </NotFoundLayout>
  );
}

export function Language404() {
  const [selectedLang, setSelectedLang] = useState(languages[0].code);
  return (
    <NotFoundLayout className="py-16">
      <h1 className="text-7xl font-bold text-zinc-200 dark:text-muted-foreground">404</h1>
      <p className="mt-2 text-muted-foreground">Choose your language</p>
      <div className="mt-6 grid grid-cols-3 gap-3">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setSelectedLang(lang.code)}
            className={`rounded-lg border px-4 py-3 text-sm transition-all ${
              selectedLang === lang.code
                ? "border-indigo-500 bg-indigo-50 text-indigo-700 dark:border-indigo-400 dark:bg-indigo-950 dark:text-indigo-300"
                : "border-border bg-white text-muted-foreground hover:border-border dark:bg-muted dark:text-muted-foreground dark:hover:border-zinc-500"
            }`}
          >
            <div className="font-medium">{lang.native}</div>
            <div className="mt-0.5 text-[10px] text-muted-foreground/70">{lang.label}</div>
          </button>
        ))}
      </div>
      <p className="mt-6 text-xs text-muted-foreground/70">{notFoundTranslations[selectedLang]}</p>
      <GoHomeButton className="mt-6 rounded-lg bg-indigo-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-600" />
    </NotFoundLayout>
  );
}

export function Interactive404() {
  const [spin, setSpin] = useState(0);
  const handleClickSpin = () => setSpin((s) => s + 360);
  return (
    <NotFoundLayout className="py-20">
      <h1
        onClick={handleClickSpin}
        className="cursor-pointer select-none text-[10rem] font-bold text-indigo-500 transition-all duration-700 ease-in-out hover:text-indigo-600"
        style={{ transform: `rotate(${spin}deg)`, textShadow: spin > 0 ? "0 0 40px rgba(99,102,241,0.4)" : "none" }}
      >
        404
      </h1>
      <p className="mt-2 text-sm text-muted-foreground/70">Click the 404 to spin it!</p>
      <p className="mt-1 text-lg text-muted-foreground">Interactive error page</p>
      <GoHomeButton className="mt-8 rounded-lg bg-indigo-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-600" />
    </NotFoundLayout>
  );
}
