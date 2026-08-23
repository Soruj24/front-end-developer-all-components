"use client";

import { useState } from "react";

export function BasicGravity() {
  return (
    <div className="mx-auto max-w-sm">
      <div className="relative h-48 overflow-hidden rounded-xl border border-zinc-200 bg-gradient-to-b from-blue-50 to-indigo-50 shadow-sm dark:border-zinc-700 dark:from-blue-950/50 dark:to-indigo-950/50">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="absolute rounded-full bg-gradient-to-br from-blue-400 to-violet-500 shadow-lg" style={{ left: `${i * 18}%`, top: `${30 + (i % 3) * 20}%`, width: `${12 + i * 4}px`, height: `${12 + i * 4}px`, animation: `float ${2 + i * 0.5}s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }} />
        ))}
        <style>{`@keyframes float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(5deg); } }`}</style>
      </div>
    </div>
  );
}

export function GravityShapes() {
  return (
    <div className="mx-auto max-w-sm">
      <div className="relative h-48 overflow-hidden rounded-xl border border-zinc-200 bg-gradient-to-br from-purple-50 to-pink-50 shadow-sm dark:border-zinc-700 dark:from-purple-950/50 dark:to-pink-950/50">
        <div className="absolute left-[10%] top-[20%] h-6 w-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 shadow-lg" style={{ animation: "float 3s ease-in-out infinite" }} />
        <div className="absolute left-[30%] top-[40%] h-8 w-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg" style={{ animation: "float 4s ease-in-out infinite 0.5s" }} />
        <div className="absolute left-[55%] top-[25%] h-5 w-5 rounded-sm bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg" style={{ animation: "float 2.5s ease-in-out infinite 1s" }} />
        <div className="absolute left-[75%] top-[50%] h-7 w-7 rounded-full bg-gradient-to-br from-rose-400 to-red-500 shadow-lg" style={{ animation: "float 3.5s ease-in-out infinite 0.3s" }} />
        <style>{`@keyframes float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(5deg); } }`}</style>
      </div>
    </div>
  );
}

export function GravityDrift() {
  return (
    <div className="mx-auto max-w-sm">
      <div className="relative h-48 overflow-hidden rounded-xl border border-zinc-200 bg-gradient-to-b from-emerald-50 to-teal-50 shadow-sm dark:border-zinc-700 dark:from-emerald-950/50 dark:to-teal-950/50">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="absolute rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg" style={{ left: `${i * 15}%`, top: `${25 + (i % 2) * 30}%`, width: `${8 + i * 3}px`, height: `${8 + i * 3}px`, animation: `drift ${3 + i * 0.3}s ease-in-out infinite`, animationDelay: `${i * 0.3}s` }} />
        ))}
        <style>{`@keyframes drift { 0%, 100% { transform: translate(0, 0) rotate(0deg); } 25% { transform: translate(10px, -15px) rotate(10deg); } 50% { transform: translate(-5px, -25px) rotate(-5deg); } 75% { transform: translate(-10px, -10px) rotate(5deg); } }`}</style>
      </div>
    </div>
  );
}

export function GravityOrbit() {
  return (
    <div className="mx-auto max-w-sm">
      <div className="relative h-48 overflow-hidden rounded-xl border border-zinc-200 bg-gradient-to-b from-amber-50 to-orange-50 shadow-sm dark:border-zinc-700 dark:from-amber-950/50 dark:to-orange-950/50">
        <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg" />
        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 shadow-lg" style={{ animation: "orbit 4s linear infinite" }} />
        <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg" style={{ animation: "orbit 3s linear infinite reverse" }} />
        <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 shadow-lg" style={{ animation: "orbit 5s linear infinite" }} />
        <style>{`@keyframes orbit { from { transform: rotate(0deg) translateX(40px) rotate(0deg); } to { transform: rotate(360deg) translateX(40px) rotate(-360deg); } }`}</style>
      </div>
    </div>
  );
}

export function GravityWave() {
  return (
    <div className="mx-auto max-w-sm">
      <div className="relative h-48 overflow-hidden rounded-xl border border-zinc-200 bg-gradient-to-b from-rose-50 to-pink-50 shadow-sm dark:border-zinc-700 dark:from-rose-950/50 dark:to-pink-950/50">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="absolute bottom-[30%] h-3 w-3 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 shadow-lg" style={{ left: `${10 + i * 11}%`, animation: `wave 2s ease-in-out infinite`, animationDelay: `${i * 0.15}s` }} />
        ))}
        <style>{`@keyframes wave { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-30px); } }`}</style>
      </div>
    </div>
  );
}

export function GravityControlled() {
  const [active, setActive] = useState(true);
  const [speed, setSpeed] = useState("normal");

  const speeds = { slow: "4s", normal: "2s", fast: "1s" };

  return (
    <div className="mx-auto max-w-sm space-y-3">
      <div className="relative h-40 overflow-hidden rounded-xl border border-zinc-200 bg-gradient-to-b from-violet-50 to-purple-50 shadow-sm dark:border-zinc-700 dark:from-violet-950/50 dark:to-purple-950/50">
        {active && [1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="absolute rounded-full bg-gradient-to-br from-violet-400 to-purple-500 shadow-lg" style={{ left: `${i * 18}%`, top: `${30 + (i % 3) * 20}%`, width: `${10 + i * 3}px`, height: `${10 + i * 3}px`, animation: `float ${speeds[speed as keyof typeof speeds]} ease-in-out infinite`, animationDelay: `${i * 0.2}s` }} />
        ))}
        <style>{`@keyframes float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(5deg); } }`}</style>
      </div>
      <div className="flex gap-1.5">
        {(["slow", "normal", "fast"] as const).map((s) => (
          <button key={s} onClick={() => setSpeed(s)} className={`flex-1 rounded-lg py-1.5 text-xs font-medium capitalize transition-all ${speed === s ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"}`}>
            {s}
          </button>
        ))}
      </div>
      <button onClick={() => setActive(!active)} className={`w-full rounded-lg px-3 py-2 text-xs font-medium transition-all ${active ? "bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:hover:bg-rose-900/50" : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-900/50"}`}>
        {active ? "Pause" : "Resume"}
      </button>
    </div>
  );
}
