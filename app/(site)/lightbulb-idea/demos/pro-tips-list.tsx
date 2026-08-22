"use client";

import { BookOpen, Star } from "lucide-react";

export function ProTipsListDemo() {
  const tips = [
    "Use semantic HTML elements for better accessibility.",
    "Extract reusable logic into custom hooks early.",
    "Keep components small and focused on a single responsibility.",
    "Use TypeScript strict mode from the start of your project.",
  ];

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-950/30">
          <BookOpen className="h-4 w-4 text-indigo-500" />
        </div>
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Pro Tips</h4>
      </div>
      <ul className="space-y-2.5">
        {tips.map((tip, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-600 dark:text-zinc-400">
            <Star className="mt-0.5 h-3.5 w-3.5 shrink-0 text-yellow-500" />
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
