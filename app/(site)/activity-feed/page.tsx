"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ArrowUpDown, Settings, AlertCircle } from "lucide-react";

const ACTIVITY_FEED_SOURCE = `"use client";

import { useState, useEffect } from "react";

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
}

export function ActivityFeed({ items, showTime = true }: { items: ActivityItem[]; showTime?: boolean }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex items-start gap-3">
          <span className="text-sm text-muted-foreground">{item.time}</span>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-foreground">{item.title}</h4>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}`;

function DefaultDemo() {
  const [items, setItems] = useState([
    { id: "1", title: "New message", description: "You received a new message", time: "2:30 PM" },
    { id: "2", title: "System update", description: "App updated to v2.1", time: "1:00 PM" },
  ]);
  return (
    <ActivityFeed items={items} />
  );
}

function CompactDemo() {
  const [items, setItems] = useState([
    { id: "1", title: "New message", description: "You received a new message", time: "2:30 PM" },
  ]);
  return (
    <ActivityFeed items={items} showTime={false} />
  );
}

function InteractiveDemo() {
  const [items, setItems] = useState([
    { id: "1", title: "New message", description: "You received a new message", time: "2:30 PM" },
  ]);
  return (
    <ActivityFeed items={items} />
  );
}

export default function ActivityFeedPage() {
  return (
    <ComponentDocPage
      name="Activity Feed"
      category="Data Display"
      description="A feed displaying time-stamped activities with flexible display options."
    >
      <PreviewPanel filename="activity-feed.tsx">
        <DefaultDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={ACTIVITY_FEED_SOURCE}
        filename="components/ui/ActivityFeed/ActivityFeed.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Default" description="Standard activity feed with timestamps." code={ACTIVITY_FEED_SOURCE}>
          <DefaultDemo />
        </ExampleBlock>

        <ExampleBlock title="Compact" description="Hide timestamps for a compact view." code={ACTIVITY_FEED_SOURCE}>
          <CompactDemo />
        </ExampleBlock>

        <ExampleBlock title="Interactive" description="Add new items interactively." code={ACTIVITY_FEED_SOURCE}>
          <InteractiveDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}