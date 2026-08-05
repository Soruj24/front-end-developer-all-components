import type { Badge } from "../types";

interface BadgeGridProps {
  badges: Badge[];
}

export function BadgeGrid({ badges }: BadgeGridProps) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
      <h2 className="mb-4 text-lg font-semibold text-foreground">Achievement Badges</h2>
      <div className="grid grid-cols-3 gap-3">
        {badges.map((badge) => (
          <div key={badge.id} className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all ${badge.earned ? "border-border" : "border-dashed border-border opacity-50 dark:border-border"}`}>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 text-2xl dark:from-blue-900/40 dark:to-indigo-900/40">{badge.icon}</span>
            <span className="text-xs font-medium text-muted-foreground">{badge.name}</span>
            {badge.earned && <span className="text-[10px] font-medium text-green-600 dark:text-green-400">Earned</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
