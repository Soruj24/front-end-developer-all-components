export const ACTIVITY_FEED_SOURCE = `"use client";

import { useState } from "react";

interface FeedItem {
  user: string;
  action: string;
  target: string;
  time: string;
  avatar: string;
  color: string;
}

interface ActivityFeedProps {
  items: FeedItem[];
  compact?: boolean;
}

export function ActivityFeed({ items, compact = false }: ActivityFeedProps) {
  const [showAll, setShowAll] = useState(true);
  const visible = showAll ? items : items.slice(0, 3);

  return (
    <div className="w-full max-w-md">
      <div className="mb-2 flex gap-2">
        <button
          onClick={() => setShowAll(true)}
          className={\`rounded-md px-3 py-1.5 text-xs font-medium \${
            showAll ? "bg-foreground text-background" : "border border-border"
          }\`}
        >
          All
        </button>
        <button
          onClick={() => setShowAll(false)}
          className={\`rounded-md px-3 py-1.5 text-xs font-medium \${
            !showAll ? "bg-foreground text-background" : "border border-border"
          }\`}
        >
          Recent
        </button>
      </div>
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        {visible.map((item, i) => (
          <div key={i}>
            <div className={\`flex items-center gap-3 \${compact ? "px-3 py-2" : "px-4 py-3"}\`}>
              <div className={\`flex h-9 w-9 items-center justify-center rounded-full text-xs font-medium text-white \${item.color}\`}>
                {item.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-medium">{item.user}</span>{" "}
                  <span className="text-muted-foreground">{item.action}</span>{" "}
                  <span className="font-medium">{item.target}</span>
                </p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
            </div>
            {i < visible.length - 1 && <div className="mx-4 h-px bg-border" />}
          </div>
        ))}
      </div>
    </div>
  );
}`;

export const DEFAULT_EXAMPLE = `<ActivityFeed items={feedItems} />`;

export const COMPACT_EXAMPLE = `<ActivityFeed items={feedItems} compact />`;

export const INTERACTIVE_EXAMPLE = `const [showAll, setShowAll] = useState(true);
const items = showAll ? feedItems : feedItems.slice(0, 3);

<ActivityFeed items={items} />`;