"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Rss } from "lucide-react";

const installCommand = `npx component-library@latest add rss-feed`;
const usageCode = `import { RssFeed } from "@/components/rss-feed";

<RssFeed
  feeds={feedItems}
  onSubscribe={(feed) => handleSubscribe(feed)}
/>`;

export default function RssFeedPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">RSS Feed</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">An RSS feed display component for showing news feeds, blog updates, and syndicated content in a readable format.</p>
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Feed Item</h2>
        <ComponentPreview>
          <div className="w-full max-w-sm rounded-lg border bg-card p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-500/10">
                <Rss className="h-4 w-4 text-orange-500" />
              </div>
              <div>
                <p className="text-sm font-medium">New Component Release</p>
                <p className="text-xs text-muted-foreground">Published 2 hours ago</p>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Feed List</h2>
        <ComponentPreview>
          <div className="w-full max-w-sm space-y-2">
            {[
              { title: "Getting Started with React", time: "1h ago" },
              { title: "Advanced TypeScript Patterns", time: "3h ago" },
              { title: "CSS Grid Best Practices", time: "5h ago" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3 rounded-lg border p-3">
                <Rss className="h-4 w-4 text-orange-500 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Subscribe Button</h2>
        <ComponentPreview>
          <div className="flex items-center gap-4 p-8">
            <button className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm text-white">
              <Rss className="h-4 w-4" />
              Subscribe
            </button>
            <button className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm">
              <Rss className="h-4 w-4 text-orange-500" />
              Subscribed
            </button>
          </div>
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
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">feeds</td>
                <td className="px-4 py-3 text-muted-foreground">FeedItem[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onSubscribe</td>
                <td className="px-4 py-3 text-muted-foreground">(feed: FeedItem) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
