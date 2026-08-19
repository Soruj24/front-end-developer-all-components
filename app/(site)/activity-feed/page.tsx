"use client";

import { useState } from "react";
import { Card, CardContent, Button, Separator } from "@/components/ui";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import {
  ACTIVITY_FEED_SOURCE,
  DEFAULT_EXAMPLE,
  COMPACT_EXAMPLE,
  INTERACTIVE_EXAMPLE,
} from "./activity-feed-source";

const feedItems = [
  { user: "Alice Chen", action: "pushed to", target: "main", time: "2m ago", avatar: "AC", color: "bg-blue-500" },
  { user: "Bob Smith", action: "opened PR", target: "#42", time: "15m ago", avatar: "BS", color: "bg-green-500" },
  { user: "Carol Davis", action: "commented on", target: "issue #38", time: "1h ago", avatar: "CD", color: "bg-purple-500" },
  { user: "Dan Wilson", action: "merged", target: "feature/auth", time: "3h ago", avatar: "DW", color: "bg-orange-500" },
  { user: "Eve Brown", action: "deployed", target: "v2.1.0", time: "5h ago", avatar: "EB", color: "bg-pink-500" },
];

const compactItems = [
  { user: "Alice", action: "committed", time: "Just now", avatar: "A" },
  { user: "Bob", action: "reviewed", time: "5m ago", avatar: "B" },
  { user: "Carol", action: "approved", time: "10m ago", avatar: "C" },
];

export default function ActivityFeedPage() {
  const [showAll, setShowAll] = useState(true);
  const items = showAll ? feedItems : feedItems.slice(0, 3);

  return (
    <ComponentDocPage
      name="Activity Feed"
      category="Data Display"
      description="Real-time activity feed with timestamps, avatars, action types, and expandable content for streaming updates."
    >
      <PreviewPanel filename="activity-feed.tsx">
        <div className="w-full max-w-md">
          <Card>
            <CardContent className="p-0">
              {items.map((item, i) => (
                <div key={i}>
                  <div className="flex items-center gap-3 px-4 py-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-medium text-white ${item.color}`}>{item.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm"><span className="font-medium">{item.user}</span> <span className="text-muted-foreground">{item.action}</span> <span className="font-medium">{item.target}</span></p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                    <Button variant="ghost" size="sm">···</Button>
                  </div>
                  {i < items.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={ACTIVITY_FEED_SOURCE}
        filename="components/ui/ActivityFeed/ActivityFeed.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Default" description="Standard feed with avatars, actions, and timestamps." code={DEFAULT_EXAMPLE}>
          <div className="w-full max-w-md">
            <Card>
              <CardContent className="p-0">
                {feedItems.map((item, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-3 px-4 py-3">
                      <div className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-medium text-white ${item.color}`}>{item.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm"><span className="font-medium">{item.user}</span> <span className="text-muted-foreground">{item.action}</span> <span className="font-medium">{item.target}</span></p>
                        <p className="text-xs text-muted-foreground">{item.time}</p>
                      </div>
                    </div>
                    {i < feedItems.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Compact" description="Condensed rows for tight sidebars." code={COMPACT_EXAMPLE}>
          <div className="w-full max-w-sm">
            <Card>
              <CardContent className="p-2">
                {compactItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[10px] font-medium">{item.avatar}</div>
                    <p className="text-xs flex-1"><span className="font-medium">{item.user}</span> {item.action}</p>
                    <span className="text-[10px] text-muted-foreground">{item.time}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Interactive" description="Filter the feed between all items and recent activity." code={INTERACTIVE_EXAMPLE}>
          <div className="w-full max-w-md">
            <div className="mb-2 flex gap-2">
              <Button variant={showAll ? "default" : "outline"} size="sm" onClick={() => setShowAll(true)}>All</Button>
              <Button variant={!showAll ? "default" : "outline"} size="sm" onClick={() => setShowAll(false)}>Recent</Button>
            </div>
            <Card>
              <CardContent className="p-0">
                {items.map((item, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-3 px-4 py-3">
                      <div className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-medium text-white ${item.color}`}>{item.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm"><span className="font-medium">{item.user}</span> <span className="text-muted-foreground">{item.action}</span> <span className="font-medium">{item.target}</span></p>
                        <p className="text-xs text-muted-foreground">{item.time}</p>
                      </div>
                    </div>
                    {i < items.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}