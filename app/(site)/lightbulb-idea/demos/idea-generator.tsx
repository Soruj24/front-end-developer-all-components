"use client";

import { useState } from "react";
import { Lightbulb, Sparkles, Zap, Target, Star, BookOpen } from "lucide-react";

export function IdeaGeneratorDemo() {
  const ideas = [
    { icon: Zap, text: "Build a component library with Storybook" },
    { icon: Target, text: "Create a reusable form validation hook" },
    { icon: Star, text: "Implement a theme switcher with system preference detection" },
    { icon: BookOpen, text: "Write an interactive tutorial for new contributors" },
  ];
  const [index, setIndex] = useState(0);
  const current = ideas[index];

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-50 dark:bg-yellow-950/30">
          <Lightbulb className="h-4 w-4 text-yellow-500" />
        </div>
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Idea Generator</h4>
      </div>
      <div className="mb-4 flex items-center gap-3 rounded-lg bg-zinc-50 p-4 dark:bg-zinc-900">
        <current.icon className="h-5 w-5 shrink-0 text-zinc-900 dark:text-zinc-100" />
        <p className="text-sm text-zinc-700 dark:text-zinc-300">{current.text}</p>
      </div>
      <button
        onClick={() => setIndex((i) => (i + 1) % ideas.length)}
        className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        <Sparkles className="h-4 w-4" />
        Generate Idea
      </button>
    </div>
  );
}
