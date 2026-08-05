import type { LeaderboardEntry } from "../types";

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

export function Leaderboard({ entries }: LeaderboardProps) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
      <h2 className="mb-4 text-lg font-semibold text-foreground">Leaderboard</h2>
      <div className="space-y-2">
        {entries.map((entry) => (
          <div key={entry.rank} className="flex items-center gap-3 rounded-xl px-4 py-2.5 transition-colors hover:bg-muted/40 dark:hover:bg-muted">
            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${entry.rank === 1 ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400" : entry.rank === 2 ? "bg-muted text-muted-foreground dark:bg-muted dark:text-muted-foreground" : entry.rank === 3 ? "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400" : "bg-muted text-muted-foreground dark:bg-muted dark:text-muted-foreground/70"}`}>{entry.rank}</span>
            <img src={entry.avatar} alt={entry.name} className="h-8 w-8 rounded-full object-cover" />
            <span className="flex-1 text-sm font-medium text-foreground">{entry.name}</span>
            <span className="text-sm font-semibold text-muted-foreground">{entry.points.toLocaleString()} pts</span>
            {entry.badge !== "None" && <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${entry.badge === "Gold" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400" : entry.badge === "Silver" ? "bg-muted text-muted-foreground dark:bg-muted dark:text-muted-foreground" : "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400"}`}>{entry.badge}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
