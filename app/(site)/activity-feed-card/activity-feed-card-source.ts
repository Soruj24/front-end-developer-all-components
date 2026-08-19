export const ACTIVITY_FEED_CARD_SOURCE = `"use client";

import { Clock } from "lucide-react";

type ActivityType =
  | "commit" | "like" | "star" | "comment" | "merge"
  | "pull_request" | "review" | "deploy" | "issue" | "follow";

interface FeedItem {
  id: string;
  avatar: string;
  avatarColor: string;
  userName: string;
  action: string;
  target: string;
  timestamp: string;
  type: ActivityType;
  description?: string;
}

interface ActivityFeedCardProps {
  items: FeedItem[];
  variant?: "default" | "compact" | "notification";
}

export function ActivityFeedCard({ items, variant = "default" }: ActivityFeedCardProps) {
  const typeLabel = (t: ActivityType) => t.replace("_", " ");

  if (variant === "compact") {
    return (
      <div className="flex flex-col gap-1.5">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 rounded-md bg-muted/30 px-3 py-2.5 text-sm">
            <div className={\`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br \${item.avatarColor} text-[10px] font-bold text-white\`}>
              {item.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-medium">{item.userName}</span>{" "}
              <span className="text-muted-foreground">{item.action}</span>{" "}
              <span className="font-medium">{item.target}</span>
            </div>
            <span className="text-xs text-muted-foreground/70">{item.timestamp}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      {items.map((item) => (
        <div key={item.id} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 shadow-sm">
          <div className={\`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br \${item.avatarColor} text-xs font-semibold text-white\`}>
            {item.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm leading-relaxed">
              <span className="font-semibold">{item.userName}</span>{" "}
              <span className="text-muted-foreground">{item.action}</span>{" "}
              <span className="font-medium">{item.target}</span>
            </p>
            {item.description && <p className="mt-1.5 text-sm text-muted-foreground/80">{item.description}</p>}
            <div className="mt-2 flex items-center gap-2">
              <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                {typeLabel(item.type)}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground/70">
                <Clock className="h-3 w-3" />
                {item.timestamp}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}`;

export const DEFAULT_EXAMPLE = `<ActivityFeedCard items={feedItems} variant="default" />`;

export const COMPACT_EXAMPLE = `<ActivityFeedCard items={feedItems} variant="compact" />`;

export const NOTIFICATION_EXAMPLE = `<ActivityFeedCard items={feedItems} variant="notification" />`;

export const GROUPED_EXAMPLE = `<div>
  <span className="text-xs font-semibold uppercase text-muted-foreground">Today</span>
  <ActivityFeedCard items={feedItems.slice(0, 5)} />
</div>`;

export const FILTERED_EXAMPLE = `const [filter, setFilter] = useState<ActivityType | "all">("all");
const items = filter === "all"
  ? feedItems.slice(0, 6)
  : feedItems.filter((i) => i.type === filter);

<ActivityFeedCard items={items} />`;

export const DETAILED_EXAMPLE = `<ActivityFeedCard items={detailedItems} />`;