"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { List, ListItem, Spinner } from "@/components/ui";

const installCommand = "npx component-library@latest add infinite-scroll";

const usageCode = `import { InfiniteScroll } from "@/components/ui";

export default function Example() {
  return <InfiniteScroll loadMore={() => fetchNextPage()} />;
}`;

const allItems = Array.from({ length: 60 }, (_, i) => ({
  id: i + 1,
  title: `Item ${i + 1}`,
  description: `Description for item ${i + 1}`,
}));

export default function InfiniteScrollPage() {
  const [items, setItems] = useState(allItems.slice(0, 10));
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    setLoading(true);
    setTimeout(() => {
      setItems((prev) => {
        const next = allItems.slice(prev.length, prev.length + 10);
        if (prev.length + next.length >= allItems.length) setHasMore(false);
        return [...prev, ...next];
      });
      setLoading(false);
    }, 800);
  }, [loading, hasMore]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleScroll = () => {
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50) loadMore();
    };
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [loadMore]);

  const reset = () => { setItems(allItems.slice(0, 10)); setHasMore(true); };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Infinite Scroll</h1>
          <Badge variant="primary">Navigation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Infinite scrolling list with loading states, end-of-list detection, and smooth content insertion.
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
          <h3 className="text-lg font-medium text-foreground">Scrollable List</h3>
          <ComponentPreview id="infinite-scroll-default">
            <div ref={containerRef} className="h-64 w-full overflow-y-auto rounded-lg border border-border">
              <List>
                {items.map((item) => (
                  <ListItem key={item.id} className="border-b border-border">
                    <span className="font-medium">{item.title}</span>
                    <span className="text-xs text-muted-foreground">{item.description}</span>
                  </ListItem>
                ))}
              </List>
              {loading && <div className="flex justify-center py-4"><Spinner /></div>}
              {!hasMore && <p className="py-4 text-center text-sm text-muted-foreground">No more items</p>}
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Load More Button</h3>
          <ComponentPreview id="infinite-scroll-button">
            <div className="w-full">
              <List>
                {items.slice(0, 10).map((item) => (
                  <ListItem key={item.id} className="border-b border-border">
                    <span className="font-medium">{item.title}</span>
                  </ListItem>
                ))}
              </List>
              <div className="mt-3 text-center">
                <button onClick={loadMore} disabled={loading} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
                  {loading ? "Loading..." : "Load More"}
                </button>
                <p className="mt-1 text-xs text-muted-foreground">{items.length} of {allItems.length} items</p>
              </div>
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Interactive</h3>
          <ComponentPreview id="infinite-scroll-interactive">
            <div className="w-full">
              <div className="mb-2 flex justify-between">
                <span className="text-sm text-muted-foreground">{items.length} items loaded</span>
                <button onClick={reset} className="text-xs text-primary hover:underline">Reset</button>
              </div>
              <div ref={containerRef} className="h-48 overflow-y-auto rounded-lg border border-border">
                <List>
                  {items.map((item) => (
                    <ListItem key={item.id} className="border-b border-border py-2">
                      <span className="text-sm">{item.title}</span>
                    </ListItem>
                  ))}
                </List>
                {loading && <div className="flex justify-center py-3"><Spinner /></div>}
              </div>
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
                <td className="px-4 py-3 font-mono text-xs text-foreground">loadMore</td>
                <td className="px-4 py-3 text-muted-foreground">() =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
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