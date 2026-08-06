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

export function Coffee404() {
  return (
    <NotFoundLayout className="py-20" style={{ background: "linear-gradient(135deg, #f5e6d3, #e8d5b7)", borderRadius: "12px", minHeight: "400px" }}>
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-4 border-amber-800 bg-amber-100 opacity-40" style={{ boxShadow: "inset 0 0 20px rgba(139,90,43,0.3)" }} />
        <div className="absolute top-8 left-8 h-24 w-24 rounded-full border-4 border-amber-800/20" />
      </div>
      <h1 className="mt-4 text-[8rem] font-bold text-amber-900">404</h1>
      <p className="mt-2 text-lg text-amber-800">Spilled coffee on the page.</p>
      <p className="mt-1 text-sm text-amber-700">Oops! This page is gone.</p>
      <GoHomeButton className="mt-8 rounded-lg bg-amber-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-amber-800" />
    </NotFoundLayout>
  );
}

export function Winter404() {
  return (
    <NotFoundLayout className="py-20 overflow-hidden" style={{ background: "linear-gradient(180deg, #e8f4f8, #b3d9e8)", borderRadius: "12px", minHeight: "400px" }}>
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={i}
            className="absolute text-white opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${8 + Math.random() * 12}px`,
              animation: `snowfall ${3 + Math.random() * 4}s linear ${Math.random() * 3}s infinite`,
            }}
          >
            ❄
          </div>
        ))}
      </div>
      <div className="relative z-10">
        <span className="text-6xl">⛄</span>
        <h1 className="mt-4 text-[8rem] font-bold text-blue-800">404</h1>
        <p className="mt-2 text-lg text-blue-700">This page is frozen.</p>
        <GoHomeButton className="mt-8 rounded-full bg-blue-600 px-8 py-3 text-sm font-medium text-white hover:bg-blue-500" />
      </div>
      <style>{`@keyframes snowfall { 0% { transform: translateY(-10px) rotate(0deg); opacity: 0; } 10% { opacity: 0.7; } 90% { opacity: 0.7; } 100% { transform: translateY(400px) rotate(360deg); opacity: 0; } }`}</style>
    </NotFoundLayout>
  );
}

export function Autumn404() {
  const leaves = ["🍂", "🍁", "🍃", "🌿"];
  return (
    <NotFoundLayout className="py-20 overflow-hidden" style={{ background: "linear-gradient(180deg, #fde68a, #fbbf24)", borderRadius: "12px", minHeight: "400px" }}>
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${16 + Math.random() * 16}px`,
              animation: `leaf-fall ${4 + Math.random() * 4}s ease-in-out ${Math.random() * 3}s infinite`,
            }}
          >
            {leaves[i % 4]}
          </div>
        ))}
      </div>
      <div className="relative z-10">
        <h1 className="text-[10rem] font-bold text-orange-800">404</h1>
        <p className="mt-2 text-lg text-orange-700">This page fell with the leaves.</p>
        <GoHomeButton className="mt-8 rounded-full bg-orange-700 px-8 py-3 text-sm font-medium text-white hover:bg-orange-600" />
      </div>
      <style>{`@keyframes leaf-fall { 0% { transform: translateY(-20px) rotate(0deg); } 50% { transform: translateY(200px) rotate(180deg) translateX(30px); } 100% { transform: translateY(400px) rotate(360deg); } }`}</style>
    </NotFoundLayout>
  );
}

export function Ocean404() {
  return (
    <NotFoundLayout className="py-20 overflow-hidden" style={{ background: "linear-gradient(180deg, #0077b6, #023e8a, #03045e)", borderRadius: "12px", minHeight: "400px" }}>
      <div className="absolute bottom-0 left-0 right-0 h-20 opacity-30" style={{ background: "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1200 120\" preserveAspectRatio=\"none\"%3E%3Cpath d=\"M0,60 C200,120 400,0 600,60 C800,120 1000,0 1200,60 L1200,120 L0,120 Z\" fill=\"%23ffffff\" opacity=\"0.3\"/%3E%3C/svg%3E')", backgroundSize: "cover" }} />
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }, (_, i) => (
          <span
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${10 + i * 12}%`,
              top: `${30 + Math.random() * 40}%`,
              animation: `fish-swim ${5 + Math.random() * 3}s ease-in-out ${Math.random() * 2}s infinite alternate`,
            }}
          >
            🐟
          </span>
        ))}
      </div>
      <div className="relative z-10">
        <h1 className="text-[10rem] font-bold text-white">404</h1>
        <p className="mt-2 text-lg text-cyan-200">Page sunk to the bottom of the ocean.</p>
        <GoHomeButton className="mt-8 rounded-full bg-cyan-500 px-8 py-3 text-sm font-medium text-white hover:bg-cyan-400" />
      </div>
      <style>{`@keyframes fish-swim { 0% { transform: translateX(-20px) scaleX(1); } 50% { transform: translateX(20px) scaleX(1); } 100% { transform: translateX(-20px) scaleX(-1); } }`}</style>
    </NotFoundLayout>
  );
}

export function Fire404() {
  return (
    <NotFoundLayout className="py-20 overflow-hidden" style={{ background: "linear-gradient(180deg, #1a0000, #4a0000, #8b0000)", borderRadius: "12px", minHeight: "400px" }}>
      <div className="absolute inset-0 pointer-events-none opacity-60">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="absolute bottom-0 rounded-full"
            style={{
              left: `${10 + i * 7}%`,
              width: `${20 + Math.random() * 20}px`,
              height: `${40 + Math.random() * 40}px`,
              background: `linear-gradient(180deg, #ff4500, #ff6600, #ff8800, transparent)`,
              borderRadius: "50% 50% 20% 20%",
              animation: `flame-flicker ${0.5 + Math.random() * 0.5}s ease-in-out ${Math.random() * 0.5}s infinite alternate`,
            }}
          />
        ))}
      </div>
      <div className="relative z-10">
        <h1 className="text-[10rem] font-bold text-orange-400" style={{ textShadow: "0 0 30px #ff4500, 0 0 60px #ff0000" }}>404</h1>
        <p className="mt-2 text-lg text-orange-300">This page went up in flames.</p>
        <GoHomeButton className="mt-8 rounded-full bg-orange-600 px-8 py-3 text-sm font-medium text-white hover:bg-orange-500" />
      </div>
      <style>{`@keyframes flame-flicker { 0% { transform: translateY(0) scaleX(1); opacity: 0.8; } 100% { transform: translateY(-30px) scaleX(0.8); opacity: 0.3; } }`}</style>
    </NotFoundLayout>
  );
}
