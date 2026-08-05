"use client";

interface ContentHeroCardProps {
  title: string;
  hasSearch?: boolean;
  hasEmail?: boolean;
  hasVideo?: boolean;
  hasAvatars?: boolean;
  hasRating?: boolean;
  hasBadges?: boolean;
}

export function ContentHeroCard({ title, hasSearch, hasEmail, hasVideo, hasAvatars, hasRating, hasBadges }: ContentHeroCardProps) {
  return (
    <div className="flex min-h-44 flex-col items-center justify-center gap-3 rounded-xl border border-border bg-white p-6 text-center dark:border-border dark:bg-zinc-900">
      <h3 className="text-xl font-bold">{title}</h3>
      {hasSearch && (
        <div className="flex w-full max-w-xs gap-2">
          <input className="flex-1 rounded-lg border border-border px-3 py-2 text-sm dark:border-border dark:bg-muted" placeholder="Search..." />
          <button className="rounded-lg bg-zinc-900 px-3 py-2 text-sm text-white dark:bg-foreground dark:text-background">Go</button>
        </div>
      )}
      {hasEmail && (
        <div className="flex w-full max-w-xs gap-2">
          <input className="flex-1 rounded-lg border border-border px-3 py-2 text-sm dark:border-border dark:bg-muted" placeholder="your@email.com" />
          <button className="rounded-lg bg-indigo-600 px-3 py-2 text-sm text-white">Subscribe</button>
        </div>
      )}
      {hasVideo && (
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
        </div>
      )}
      {hasAvatars && (
        <div className="flex -space-x-2">
          {["A", "B", "C", "D"].map((a, i) => (
            <div key={i} className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-muted text-xs font-medium dark:border-zinc-900 dark:bg-muted">{a}</div>
          ))}
          <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-indigo-100 text-xs font-medium text-indigo-600 dark:border-zinc-900 dark:bg-indigo-900/30">+</div>
        </div>
      )}
      {hasRating && (
        <div className="flex items-center gap-1 text-amber-400">
          {[1, 2, 3, 4, 5].map((r) => (
            <svg key={r} className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
          ))}
        </div>
      )}
      {hasBadges && (
        <div className="flex flex-wrap gap-2">
          {["TechCrunch", "Forbes", "Wired"].map((b) => (
            <span key={b} className="rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground dark:bg-muted dark:text-muted-foreground/70">{b}</span>
          ))}
        </div>
      )}
    </div>
  );
}
