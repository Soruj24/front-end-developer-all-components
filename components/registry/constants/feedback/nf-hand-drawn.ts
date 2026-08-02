import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const nfHandDrawn: RegistryEntry = entry({
    id: "nf-hand-drawn",
    title: "Hand-drawn 404",
    description: "A handwritten 404 with a squiggly underline and playful font.",
    source: `export default function NfHandDrawn() {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-xl border border-zinc-200 p-8 text-center dark:border-zinc-800" style={{ fontFamily: "'Comic Sans MS', 'Chalkboard SE', cursive" }}>
      <div className="relative">
        <h1 className="text-8xl font-bold text-zinc-800 dark:text-zinc-100">404</h1>
        <svg className="absolute left-1/2 -translate-x-1/2" width="180" height="16" style={{ top: "3.2rem" }}>
          <path d="M10 12 Q50 0 90 12 Q130 24 170 12 Q185 7 200 10" fill="none" stroke="#f97316" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 4" />
        </svg>
      </div>
      <p className="mt-6 text-base text-zinc-600 dark:text-zinc-300">Oops! This page got lost ✏️</p>
      <button className="mt-6 inline-block rounded-2xl border-2 border-zinc-900 bg-transparent px-6 py-2.5 text-sm font-medium text-zinc-900 transition-all hover:bg-zinc-900 hover:text-white dark:border-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-100 dark:hover:text-zinc-900">Go Home</button>
    </div>
  );
}`,
  });
