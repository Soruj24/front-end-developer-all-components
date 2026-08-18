"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Card, CardContent, Button, Separator } from "@/components/ui";

const installCommand = `npx component-library@latest add activity-feed`;

const usageCode = `import { Card, Avatar, Badge, Button } from "@/components/ui";

const feedItems = [
  { user: "Alice", action: "pushed to", target: "main", time: "2m ago", avatar: "A" },
  { user: "Bob", action: "opened PR", target: "#42", time: "15m ago", avatar: "B" },
  { user: "Carol", action: "commented on", target: "issue #38", time: "1h ago", avatar: "C" },
];

export default function Example() {
  return (
    <Card>
      {feedItems.map((item, i) => (
        <div key={i} className="flex items-center gap-3 p-3">
          <Avatar>{item.avatar}</Avatar>
          <p className="text-sm"><b>{item.user}</b> {item.action} <b>{item.target}</b></p>
          <span className="ml-auto text-xs text-muted-foreground">{item.time}</span>
        </div>
      ))}
    </Card>
  );
}`;

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
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Activity Feed</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Real-time activity feed with timestamps, avatars, action types, and expandable content for streaming updates.
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

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Default</h3>
          <ComponentPreview id="activity-feed-default">
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
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Compact</h3>
          <ComponentPreview id="activity-feed-compact">
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
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Interactive</h3>
          <ComponentPreview id="activity-feed-interactive">
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
          </ComponentPreview>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Default</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">items</td>
                <td className="px-4 py-3 text-muted-foreground">FeedItem[]</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">variant</td>
                <td className="px-4 py-3 text-muted-foreground">{'"default" | "compact"'}</td>
                <td className="px-4 py-3 text-muted-foreground">{'"default"'}</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">undefined</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}