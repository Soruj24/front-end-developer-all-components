"use client";

import Link from "next/link";
import { useState } from "react";
import { NotFoundLayout, GoHomeButton } from "./NotFoundShell";

export function Animated404() {
  return (
    <NotFoundLayout className="py-20">
      <h1 className="animate-pulse text-[10rem] font-bold text-indigo-500" style={{ animationDuration: "3s" }}>404</h1>
      <p className="mt-2 animate-pulse text-lg text-muted-foreground" style={{ animationDuration: "3s", animationDelay: "0.5s" }}>This page is resting.</p>
      <Link href="/" className="mt-8 animate-pulse rounded-lg bg-indigo-500 px-6 py-3 text-sm font-medium text-white">Go Home</Link>
    </NotFoundLayout>
  );
}

export function LostInSpace404() {
  return (
    <NotFoundLayout className="relative overflow-hidden py-20" style={{ minHeight: "400px", background: "#0a0a1a", borderRadius: "12px" }}>
      <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #fff1 1px, transparent 1px), radial-gradient(circle at 80% 60%, #fff1 1px, transparent 1px)", backgroundSize: "40px 40px, 60px 60px" }} />
      <div className="relative z-10">
        <span className="text-6xl">🚀</span>
        <h1 className="mt-4 text-6xl font-bold text-white">404</h1>
        <p className="mt-2 text-lg text-muted-foreground/70">Lost in space</p>
        <p className="text-sm text-muted-foreground">This page drifted into the cosmic void.</p>
        <Link href="/" className="mt-8 inline-block rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 text-sm font-medium text-white">Return to Earth</Link>
      </div>
    </NotFoundLayout>
  );
}

export function Maze404() {
  return (
    <NotFoundLayout className="relative overflow-hidden py-20" style={{ minHeight: "400px", borderRadius: "12px" }}>
      <div className="pointer-events-none absolute inset-0 opacity-10 dark:opacity-20" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 19px, #6366f1 19px, #6366f1 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, #6366f1 19px, #6366f1 20px)", backgroundSize: "20px 20px" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 50%, transparent 40%, rgba(255,255,255,1) 70%)" }} />
      <div className="relative z-10">
        <h1 className="text-8xl font-bold text-indigo-500">404</h1>
        <p className="mt-2 text-muted-foreground">You got lost in the maze</p>
        <GoHomeButton className="mt-8 inline-block rounded-lg bg-indigo-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-600" />
      </div>
    </NotFoundLayout>
  );
}

export function Floating404() {
  const emojis = ["🌟", "✨", "💫", "⭐", "🌙", "☄️", "🌈", "🎈", "💡", "🔮"];
  const [items] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      emoji: emojis[i % 10],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 12 + Math.random() * 24,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    }))
  );
  return (
    <NotFoundLayout className="relative overflow-hidden py-20" style={{ minHeight: "420px", borderRadius: "12px" }}>
      {items.map((item) => (
        <span
          key={item.id}
          className="pointer-events-none absolute"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            fontSize: `${item.size}px`,
            animation: `float-${item.id} ${item.duration}s ease-in-out ${item.delay}s infinite alternate`,
            opacity: 0.6,
          }}
        >
          {item.emoji}
        </span>
      ))}
      <style>{items.map((item) => `
        @keyframes float-${item.id} {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-${10 + (item.id % 20)}px) rotate(${item.id % 2 === 0 ? 10 : -10}deg); }
        }
      `).join("\n")}</style>
      <div className="relative z-10">
        <h1 className="text-8xl font-bold text-muted-foreground">404</h1>
        <p className="text-muted-foreground">Page drifted away</p>
        <GoHomeButton className="mt-6 inline-block rounded-lg bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white dark:bg-muted dark:text-zinc-900" />
      </div>
    </NotFoundLayout>
  );
}

export function Galaxy404() {
  return (
    <NotFoundLayout className="py-20 overflow-hidden" style={{ background: "radial-gradient(ellipse at center, #1a0033 0%, #000 70%)", borderRadius: "12px", minHeight: "400px" }}>
      <div className="absolute inset-0 opacity-30" style={{ background: "radial-gradient(circle at 30% 40%, #4a0080 0%, transparent 50%), radial-gradient(circle at 70% 60%, #000066 0%, transparent 50%)" }} />
      <div className="relative z-10">
        <h1 className="text-[10rem] font-bold text-transparent" style={{ WebkitTextStroke: "2px #a855f7", textShadow: "0 0 40px #a855f7" }}>404</h1>
        <p className="mt-2 text-lg text-purple-300">Lost in the galaxy</p>
        <p className="mt-1 text-sm text-purple-400/70">This page is 4.2 light years away.</p>
        <GoHomeButton className="mt-8 rounded-full bg-purple-600 px-8 py-3 text-sm font-medium text-white hover:bg-purple-500" />
      </div>
    </NotFoundLayout>
  );
}

export function Astronaut404() {
  return (
    <NotFoundLayout className="py-20" style={{ background: "linear-gradient(180deg, #0c0c1d, #1a1a3e)", borderRadius: "12px", minHeight: "400px" }}>
      <div className="absolute top-10 right-20 text-6xl opacity-40" style={{ animation: "float-astronaut 6s ease-in-out infinite" }}>🧑‍🚀</div>
      <div className="relative z-10">
        <h1 className="text-[10rem] font-bold text-white">404</h1>
        <p className="mt-2 text-lg text-blue-200">Houston, we have a problem.</p>
        <p className="mt-1 text-sm text-blue-300/70">This page is not in orbit.</p>
        <GoHomeButton className="mt-8 rounded-full bg-blue-600 px-8 py-3 text-sm font-medium text-white hover:bg-blue-500" />
      </div>
      <style>{`@keyframes float-astronaut { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(10deg); } }`}</style>
    </NotFoundLayout>
  );
}

export function Alien404() {
  return (
    <NotFoundLayout className="py-20" style={{ background: "linear-gradient(180deg, #000, #0a2e0a)", borderRadius: "12px", minHeight: "400px" }}>
      <span className="text-8xl" style={{ animation: "alien-bob 2s ease-in-out infinite" }}>👽</span>
      <h1 className="mt-4 text-[8rem] font-bold text-green-400" style={{ textShadow: "0 0 20px #0f0" }}>404</h1>
      <p className="mt-2 text-lg text-green-300">Take me to your... 404 page?</p>
      <p className="mt-1 text-sm text-green-400/70">The aliens abducted this page.</p>
      <GoHomeButton className="mt-8 rounded-full bg-green-600 px-8 py-3 text-sm font-medium text-white hover:bg-green-500" />
      <style>{`@keyframes alien-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }`}</style>
    </NotFoundLayout>
  );
}

export function Wormhole404() {
  return (
    <NotFoundLayout className="py-20 overflow-hidden" style={{ background: "#000", borderRadius: "12px", minHeight: "400px" }}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-64 w-64 rounded-full border-4 border-purple-500/30" style={{ animation: "wormhole-spin 4s linear infinite" }} />
        <div className="absolute h-48 w-48 rounded-full border-4 border-cyan-500/30" style={{ animation: "wormhole-spin 3s linear infinite reverse" }} />
        <div className="absolute h-32 w-32 rounded-full border-4 border-pink-500/30" style={{ animation: "wormhole-spin 2s linear infinite" }} />
      </div>
      <div className="relative z-10">
        <h1 className="text-[10rem] font-bold text-white">404</h1>
        <p className="mt-2 text-lg text-purple-300">You fell through a wormhole.</p>
        <GoHomeButton className="mt-8 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 px-8 py-3 text-sm font-medium text-white hover:opacity-90" />
      </div>
      <style>{`@keyframes wormhole-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </NotFoundLayout>
  );
}
