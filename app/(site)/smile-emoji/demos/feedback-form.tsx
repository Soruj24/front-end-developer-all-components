"use client";

import { useState } from "react";
import { Star, Check } from "lucide-react";

export function FeedbackForm() {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 dark:border-emerald-800 dark:bg-emerald-950/30">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500">
          <Check className="h-4 w-4 text-white" />
        </div>
        <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Thank you for your feedback!</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm space-y-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-950">
      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">How was your experience?</p>
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <button key={s} onClick={() => setRating(s)} className="transition-transform hover:scale-110 active:scale-95" aria-label={`Rate ${s} stars`}>
            <Star className={`h-7 w-7 transition-colors ${s <= rating ? "fill-amber-400 text-amber-400" : "text-zinc-200 hover:text-zinc-300 dark:text-zinc-700 dark:hover:text-zinc-600"}`} />
          </button>
        ))}
      </div>
      <button onClick={() => rating > 0 && setSubmitted(true)} disabled={rating === 0} className="rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-zinc-800 active:scale-[0.97] disabled:opacity-30 disabled:active:scale-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
        Submit
      </button>
    </div>
  );
}
