import type { ComponentStats } from "@/features/registry";
import { formatNumber } from "@/features/registry";
import { DownloadIcon, HeartIcon, BookmarkIcon, EyeIcon } from "./icons";

export function ComponentStats({
  stats,
  compact = false,
}: {
  stats: ComponentStats;
  compact?: boolean;
}) {
  const items = [
    { label: "Downloads", value: stats.downloads, icon: <DownloadIcon className="h-3.5 w-3.5" /> },
    { label: "Likes", value: stats.likes, icon: <HeartIcon className="h-3.5 w-3.5" /> },
    { label: "Bookmarks", value: stats.bookmarks, icon: <BookmarkIcon className="h-3.5 w-3.5" /> },
    { label: "Views", value: stats.views, icon: <EyeIcon className="h-3.5 w-3.5" /> },
  ];

  return (
    <div
      className={`grid grid-cols-4 divide-x divide-border rounded-xl border border-border bg-muted/30 ${
        compact ? "text-[11px]" : "text-xs"
      }`}
    >
      {items.map((item) => (
        <div key={item.label} className="flex flex-col items-center gap-0.5 px-1 py-2.5">
          <span className="flex items-center gap-1 font-semibold text-foreground">
            {item.icon}
            {formatNumber(item.value)}
          </span>
          <span className="text-muted-foreground">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
