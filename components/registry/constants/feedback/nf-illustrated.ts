import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const nfIllustrated: RegistryEntry = entry({
    id: "nf-illustrated",
    title: "Illustrated 404s",
    description: "A gradient sad-face SVG and a grid maze themed not-found page.",
    source: `export default function NfIllustrated() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2">
      <div className="flex flex-col items-center justify-center rounded-xl border border-zinc-200 p-6 text-center dark:border-zinc-800">
        <svg viewBox="0 0 200 160" className="h-36 w-36">
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
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">Something went wrong...</p>
        <button className="mt-4 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-2 text-sm font-medium text-white">Go Home</button>
      </div>
      <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-xl border border-zinc-200 p-6 text-center dark:border-zinc-800">
        <div className="pointer-events-none absolute inset-0 opacity-10 dark:opacity-20" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 19px, #6366f1 19px, #6366f1 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, #6366f1 19px, #6366f1 20px)", backgroundSize: "20px 20px" }} />
        <div className="absolute inset-0 dark:hidden" style={{ background: "radial-gradient(circle at 50% 50%, transparent 40%, rgba(255,255,255,1) 70%)" }} />
        <div className="absolute inset-0 hidden dark:block" style={{ background: "radial-gradient(circle at 50% 50%, transparent 40%, rgba(9,9,11,1) 70%)" }} />
        <div className="relative z-10">
          <h1 className="text-6xl font-bold text-indigo-500">404</h1>
          <p className="mt-1 text-sm text-zinc-500">You got lost in the maze</p>
          <button className="mt-4 inline-block rounded-lg bg-indigo-500 px-5 py-2 text-sm font-medium text-white hover:bg-primary">Find Exit</button>
        </div>
      </div>
    </div>
  );
}`,
  });
