"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Activity, Heart, GitCommit, Star, MessageCircle } from "lucide-react";

const installCommand = `npx component-library@latest add activity-feed-card`;
const usageCode = `import { ActivityFeedCard } from "@/components/activity-feed-card";

<ActivityFeedCard
  avatar="AC"
  userName="Alice Chen"
  action="pushed to"
  target="main"
  timestamp="2m ago"
/>`;

type ActivityType = "commit" | "like" | "star" | "comment" | "merge";

interface FeedItem {
  avatar: string;
  userName: string;
  action: string;
  target: string;
  timestamp: string;
  type: ActivityType;
}

const feedItems: FeedItem[] = [
  { avatar: "AC", userName: "Alice Chen", action: "pushed to", target: "main", timestamp: "2m ago", type: "commit" },
  { avatar: "BS", userName: "Bob Smith", action: "liked", target: "your post", timestamp: "15m ago", type: "like" },
  { avatar: "CD", userName: "Carol Davis", action: "starred", target: "repo", timestamp: "1h ago", type: "star" },
  { avatar: "DW", userName: "Dan Wilson", action: "commented on", target: "PR #42", timestamp: "3h ago", type: "comment" },
];

const typeConfig: Record<ActivityType, { icon: typeof Activity; color: string }> = {
  commit: { icon: GitCommit, color: "text-blue-500" },
  like: { icon: Heart, color: "text-red-500" },
  star: { icon: Star, color: "text-yellow-500" },
  comment: { icon: MessageCircle, color: "text-green-500" },
  merge: { icon: GitCommit, color: "text-purple-500" },
};

function ActivityFeedCardDemo({ item }: { item: FeedItem }) {
  const config = typeConfig[item.type];
  const Icon = config.icon;
  return (
    <div className="flex items-start gap-3 rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium">
        {item.avatar}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm">
          <span className="font-medium">{item.userName}</span>{" "}
          <span className="text-muted-foreground">{item.action}</span>{" "}
          <span className="font-medium">{item.target}</span>
        </p>
        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <Icon className={`h-3 w-3 ${config.color}`} />
          <span>{item.timestamp}</span>
        </div>
      </div>
    </div>
  );
}

function CompactFeedCard({ item }: { item: FeedItem }) {
  return (
    <div className="flex items-center gap-2 rounded-md bg-muted/50 px-3 py-2 text-sm">
      <span className="font-medium">{item.userName}</span>
      <span className="text-muted-foreground">{item.action}</span>
      <span className="ml-auto text-xs text-muted-foreground">{item.timestamp}</span>
    </div>
  );
}

function GroupedFeedDemo() {
  const grouped: Record<string, FeedItem[]> = {};
  feedItems.forEach((item) => {
    const key = item.timestamp.includes("m") ? "Recent" : "Earlier";
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(item);
  });
  return (
    <div className="flex flex-col gap-4">
      {Object.entries(grouped).map(([label, items]) => (
        <div key={label} className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase text-muted-foreground">{label}</span>
          {items.map((item, i) => (
            <ActivityFeedCardDemo key={i} item={item} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function ActivityFeedCardPage() {
  const [filter, setFilter] = useState<ActivityType | "all">("all");
  const filtered = filter === "all" ? feedItems : feedItems.filter((i) => i.type === filter);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Activity Feed Card</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Display real-time activity feed items with avatars, action types, timestamps, and filterable content for social or collaboration dashboards.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Default Feed</h2>
        <ComponentPreview>
          <div className="flex flex-col gap-3 w-full max-w-md">
            {feedItems.map((item, i) => (
              <ActivityFeedCardDemo key={i} item={item} />
            ))}
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Compact Layout</h2>
        <ComponentPreview>
          <div className="flex flex-col gap-2 w-full max-w-md">
            {feedItems.map((item, i) => (
              <CompactFeedCard key={i} item={item} />
            ))}
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Filtered Feed</h2>
        <ComponentPreview>
          <div className="flex flex-col gap-3 w-full max-w-md">
            <div className="flex gap-2">
              {(["all", "commit", "like", "star", "comment"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${filter === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                >
                  {t}
                </button>
              ))}
            </div>
            {filtered.map((item, i) => (
              <ActivityFeedCardDemo key={i} item={item} />
            ))}
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Grouped Feed</h2>
        <ComponentPreview>
          <GroupedFeedDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">avatar</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">userName</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">action</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">target</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">timestamp</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">type</td><td className="px-4 py-3 text-muted-foreground">{'"commit" | "like" | "star" | "comment" | "merge"'}</td><td className="px-4 py-3 text-muted-foreground">{'"commit"'}</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
