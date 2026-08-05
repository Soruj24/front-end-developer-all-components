import { savedItems } from "../constants/social-data";

export function SavedItemsSection() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Saved Items</h3>
        <button className="text-xs font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400">Manage</button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {savedItems.map((item) => (
          <div key={item.title} className="flex items-start gap-3 rounded-lg border border-zinc-100 p-3 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">{item.title}</p>
              <p className="text-xs text-zinc-500">{item.type}</p>
              <p className="text-[10px] text-zinc-400">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
