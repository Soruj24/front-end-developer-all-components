import { COVER_LETTER_TIPS } from "../constants/insights-data";

export function CoverLetterTips() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-white">Cover Letter Guide</h3>
      <div className="space-y-3">
        {COVER_LETTER_TIPS.map((tip, i) => (
          <div key={tip.title} className="flex gap-3 rounded-lg border border-zinc-100 p-3 dark:border-zinc-800">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white dark:bg-white dark:text-zinc-900">
              {i + 1}
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-900 dark:text-white">{tip.title}</p>
              <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{tip.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
