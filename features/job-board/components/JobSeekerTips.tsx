import { useState } from "react";
import { TIPS_FOR_JOB_SEEKERS } from "../constants/insights-data";

export function JobSeekerTips() {
  const [activeTab, setActiveTab] = useState<string>(TIPS_FOR_JOB_SEEKERS[0].category);
  const categories = Array.from(new Set(TIPS_FOR_JOB_SEEKERS.map((t) => t.category)));

  const filtered = TIPS_FOR_JOB_SEEKERS.filter((t) => t.category === activeTab);

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-white">Job Seeker Tips</h3>
      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTab === cat
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.map((tip) => (
          <div key={tip.title} className="rounded-lg border border-zinc-100 p-3 dark:border-zinc-800">
            <h4 className="text-sm font-medium text-zinc-900 dark:text-white">{tip.title}</h4>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{tip.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
