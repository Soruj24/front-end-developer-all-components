import Link from "next/link";
import { NotFoundLayout, GoHomeButton } from "./NotFoundShell";

export function Minimal404() {
  return (
    <NotFoundLayout className="py-20">
      <h1 className="text-[12rem] font-bold leading-none tracking-tighter text-foreground">404</h1>
      <p className="mt-4 text-xl text-muted-foreground dark:text-muted-foreground/70">Page not found</p>
      <GoHomeButton className="mt-8 rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-105 dark:bg-muted dark:text-zinc-900" />
    </NotFoundLayout>
  );
}

export function Illustrated404() {
  return (
    <NotFoundLayout className="py-20">
      <svg viewBox="0 0 200 160" className="h-48 w-48">
        <defs>
          <linearGradient id="sadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="80" r="70" fill="url(#sadGrad)" opacity="0.15" />
        <circle cx="100" cy="80" r="60" fill="none" stroke="url(#sadGrad)" strokeWidth="1.5" />
        <circle cx="75" cy="70" r="6" fill="url(#sadGrad)" />
        <circle cx="125" cy="70" r="6" fill="url(#sadGrad)" />
        <path d="M70 105 Q100 90 130 105" fill="none" stroke="url(#sadGrad)" strokeWidth="3" strokeLinecap="round" />
        <text x="100" y="155" textAnchor="middle" fontSize="22" fontWeight="bold" fill="url(#sadGrad)">404</text>
      </svg>
      <p className="mt-4 text-muted-foreground dark:text-muted-foreground/70">Something went wrong...</p>
      <GoHomeButton className="mt-6 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-2.5 text-sm font-medium text-white" />
    </NotFoundLayout>
  );
}

export function Gradient404() {
  return (
    <NotFoundLayout className="py-20">
      <h1
        className="text-[12rem] font-bold leading-none"
        style={{
          background: "linear-gradient(135deg, #f97316, #ec4899, #6366f1, #06b6d4)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        404
      </h1>
      <p className="mt-2 text-lg text-muted-foreground">Colorful error</p>
      <GoHomeButton className="mt-8 rounded-lg bg-gradient-to-r from-orange-500 via-pink-500 to-indigo-500 px-7 py-3 text-sm font-medium text-white transition-transform hover:scale-105" />
    </NotFoundLayout>
  );
}

export function Card404() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="w-full max-w-sm rounded-2xl border-2 border-border bg-white p-8 text-center shadow-xl dark:border-border dark:bg-muted">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <div className="mx-auto my-4 h-px w-12 bg-muted dark:bg-muted/400" />
        <p className="text-muted-foreground dark:text-muted-foreground">This page doesn&apos;t exist</p>
        <GoHomeButton className="mt-6 inline-block w-full rounded-lg bg-zinc-900 py-3 text-sm font-medium text-white transition-all hover:bg-muted dark:bg-muted dark:text-zinc-900 dark:hover:bg-muted" />
      </div>
    </div>
  );
}

export function HandDrawn404() {
  return (
    <NotFoundLayout className="py-20" style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive" }}>
      <h1 className="relative text-9xl font-bold text-zinc-800 dark:text-zinc-100">404</h1>
      <svg className="pointer-events-none absolute mt-2" width="200" height="20" style={{ marginTop: "-0.5rem" }}>
        <path d="M10 15 Q50 0 90 15 Q130 30 170 15 Q190 8 200 12" fill="none" stroke="#f97316" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 4" />
      </svg>
      <p className="mt-6 text-lg text-muted-foreground">Oops! This page got lost ✏️</p>
      <Link href="/" className="mt-8 inline-block rounded-2xl border-2 border-zinc-900 bg-transparent px-8 py-3 text-sm font-medium text-zinc-900 transition-all hover:bg-zinc-900 hover:text-white dark:border-border dark:text-zinc-100 dark:hover:bg-muted dark:hover:text-foreground">Go Home</Link>
    </NotFoundLayout>
  );
}

export function Minimalist404() {
  return (
    <NotFoundLayout className="py-24">
      <h1 className="text-4xl font-light tracking-widest text-muted-foreground/70 dark:text-muted-foreground">404</h1>
      <div className="mx-auto my-4 h-px w-8 bg-muted dark:bg-muted" />
      <p className="text-sm font-light text-muted-foreground/70 dark:text-muted-foreground">this page doesn&apos;t exist</p>
      <Link href="/" className="mt-8 text-xs tracking-widest text-muted-foreground/70 underline underline-offset-4 transition-colors hover:text-muted-foreground dark:hover:text-zinc-200">HOME</Link>
    </NotFoundLayout>
  );
}

export function Colorful404() {
  const colors = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6", "#ec4899"];
  return (
    <NotFoundLayout className="py-20">
      <h1 className="text-8xl font-extrabold">
        {Array.from("404").map((ch, i) => (
          <span
            key={i}
            className="inline-block"
            style={{
              color: colors[i * 2 % 7],
              textShadow: `0 0 20px ${colors[i]}55`,
              transform: `rotate(${(i - 1) * 5}deg)`,
            }}
          >
            {ch}
          </span>
        ))}
      </h1>
      <p className="mt-3 font-medium text-muted-foreground">This page is missing in color</p>
      <GoHomeButton className="mt-8 rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white dark:bg-muted dark:text-zinc-900" />
    </NotFoundLayout>
  );
}
