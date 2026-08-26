import { useState } from "react";
import { INTERVIEW_QUESTIONS } from "../constants/insights-data";

export function InterviewPrep() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const categories = ["All", ...Array.from(new Set(INTERVIEW_QUESTIONS.map((q) => q.category)))];
  const filtered = selectedCategory === "All" ? INTERVIEW_QUESTIONS : INTERVIEW_QUESTIONS.filter((q) => q.category === selectedCategory);

  const difficultyColors = {
    Easy: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    Medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    Hard: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Interview Prep</h3>
        <span className="text-xs text-zinc-400 dark:text-zinc-500">{INTERVIEW_QUESTIONS.length} questions</span>
      </div>

      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              selectedCategory === cat
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((q) => (
          <div key={q.id} className="rounded-lg border border-zinc-100 dark:border-zinc-800">
            <button
              onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}
              className="flex w-full items-start justify-between gap-3 p-3 text-left"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-zinc-900 dark:text-white">{q.question}</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${difficultyColors[q.difficulty]}`}>
                    {q.difficulty}
                  </span>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500">{q.category} &middot; {q.timeLimit}</span>
                </div>
              </div>
              <svg className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform ${expandedId === q.id ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {expandedId === q.id && (
              <div className="border-t border-zinc-100 px-3 py-3 dark:border-zinc-800">
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Tips:</p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{q.tips}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
