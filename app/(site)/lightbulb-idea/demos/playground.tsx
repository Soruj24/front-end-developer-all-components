"use client";

import { useState } from "react";
import { Lightbulb, Sparkles, Zap, Target, Star, BookOpen, MessageCircle } from "lucide-react";

export function PlaygroundDemo() {
  const [variant, setVariant] = useState<"tip" | "suggestion" | "idea" | "insight">("tip");

  const variants = {
    tip: { icon: Lightbulb, color: "yellow", title: "Pro Tip", bg: "bg-yellow-50 dark:bg-yellow-950/30" },
    suggestion: { icon: Sparkles, color: "blue", title: "Suggestion", bg: "bg-blue-50 dark:bg-blue-950/30" },
    idea: { icon: Zap, color: "emerald", title: "Idea", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
    insight: { icon: Target, color: "purple", title: "Insight", bg: "bg-purple-50 dark:bg-purple-950/30" },
  };

  const config = variants[variant];
  const Icon = config.icon;

  return (
    <div className="w-full max-w-lg space-y-4">
      <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <p className="mb-2 text-xs font-semibold text-zinc-900 dark:text-zinc-100">Variant</p>
        <div className="flex gap-1.5">
          {Object.keys(variants).map((v) => (
            <button
              key={v}
              onClick={() => setVariant(v as keyof typeof variants)}
              className={`flex-1 rounded-lg px-3 py-1.5 text-[10px] font-medium capitalize transition-all ${
                variant === v
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className={`rounded-xl border border-zinc-200 p-5 shadow-sm dark:border-zinc-800 ${config.bg}`}>
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm dark:bg-zinc-950">
            <Icon className={`h-4 w-4 text-${config.color}-500`} />
          </div>
          <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{config.title}</h4>
        </div>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {variant === "tip" && "Always write tests before implementation. Test-driven development helps clarify requirements."}
          {variant === "suggestion" && "Consider using a debounce hook for search inputs to reduce API calls and improve performance."}
          {variant === "idea" && "Build a component library with Storybook for better documentation and testing."}
          {variant === "insight" && "Components used most frequently are simple, composable, and have a clear single purpose."}
        </p>
      </div>
    </div>
  );
}
