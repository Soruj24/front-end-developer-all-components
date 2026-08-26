import { useJobSearchHistory } from "../hooks/useJobSearchHistory";

interface JobSearchHistoryProps {
  onSelectSearch: (query: string, location: string) => void;
}

export function JobSearchHistory({ onSelectSearch }: JobSearchHistoryProps) {
  const { history, removeSearch, clearHistory } = useJobSearchHistory();

  if (history.length === 0) {
    return (
      <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-white">Search History</h3>
        <p className="text-center text-sm text-zinc-400 dark:text-zinc-500">No search history yet.</p>
      </div>
    );
  }

  const formatTime = (ts: string) => {
    const diff = Date.now() - new Date(ts).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Search History</h3>
        <button onClick={clearHistory} className="text-xs font-medium text-zinc-400 transition-colors hover:text-zinc-600 dark:hover:text-zinc-300">Clear all</button>
      </div>

      <div className="space-y-1.5">
        {history.map((entry) => (
          <div key={entry.id} className="flex items-center justify-between rounded-lg p-2 -mx-2 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
            <button onClick={() => onSelectSearch(entry.query, entry.location)} className="min-w-0 flex-1 text-left">
              <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">{entry.query || "All jobs"}</p>
              <p className="text-xs text-zinc-400 dark:text-zinc-500">{entry.location || "Anywhere"} &middot; {formatTime(entry.timestamp)}</p>
            </button>
            <button onClick={() => removeSearch(entry.id)} className="shrink-0 rounded p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800" aria-label="Remove">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
