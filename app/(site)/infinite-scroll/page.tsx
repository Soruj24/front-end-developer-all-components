"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { InfiniteScroll } from "@/components/ui/InfiniteScroll";

const INFINITESCROLL_SOURCE = `"use client";

import { useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/cn";
import type { InfiniteScrollProps } from "./InfiniteScroll.types";

function DefaultLoader() {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-border border-t-primary" />
      <span className="text-xs text-muted-foreground">Loading more...</span>
    </div>
  );
}

function DefaultEndMessage() {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5">
        <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
        <span className="text-xs text-muted-foreground">No more items</span>
        <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
      </div>
    </div>
  );
}

export function InfiniteScroll({ children, loadMore, loading = false, hasMore = true, endMessage, loader, threshold = 50, className }: InfiniteScrollProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  const handleIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];
    if (entry.isIntersecting && hasMore && !loading) loadMore();
  }, [hasMore, loading, loadMore]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(handleIntersect, { root: null, rootMargin: \`0px 0px \${threshold}px 0px\`, threshold: 0 });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [handleIntersect, threshold]);

  return (
    <div className={cn("flex flex-col", className)}>
      {children}
      <div ref={sentinelRef} aria-hidden="true" />
      {loading && (loader ?? <DefaultLoader />)}
      {!hasMore && !loading && (endMessage ?? <DefaultEndMessage />)}
    </div>
  );
}`;

const allItems = Array.from({ length: 60 }, (_, i) => ({
  id: i + 1,
  title: `Item ${i + 1}`,
  description: `Description for item ${i + 1}`,
}));

function useInfiniteData(pageSize = 10) {
  const [items, setItems] = useState(allItems.slice(0, pageSize));
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    setLoading(true);
    setTimeout(() => {
      setItems((prev) => {
        const next = allItems.slice(prev.length, prev.length + pageSize);
        if (prev.length + next.length >= allItems.length) setHasMore(false);
        return [...prev, ...next];
      });
      setLoading(false);
    }, 800);
  }, [loading, hasMore, pageSize]);

  const reset = useCallback(() => {
    setItems(allItems.slice(0, pageSize));
    setHasMore(true);
  }, [pageSize]);

  return { items, loading, hasMore, loadMore, reset, total: allItems.length };
}

function ScrollableListDemo() {
  const { items, loading, hasMore, loadMore } = useInfiniteData();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleScroll = () => {
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50) loadMore();
    };
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [loadMore]);

  return (
    <div ref={containerRef} className="h-72 w-full overflow-y-auto rounded-2xl border border-border bg-card">
      <InfiniteScroll loadMore={loadMore} loading={loading} hasMore={hasMore}>
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 border-b border-border px-4 py-3 transition-colors hover:bg-muted/50">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-xs font-medium text-primary">
              {item.id}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
              <p className="text-xs text-muted-foreground truncate">{item.description}</p>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}

function LoadMoreButtonDemo() {
  const { items, loading, hasMore, loadMore, total } = useInfiniteData();

  return (
    <div className="w-full">
      <div className="space-y-0 rounded-2xl border border-border bg-card overflow-hidden">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 border-b border-border px-4 py-3 last:border-0 transition-colors hover:bg-muted/50">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-xs font-medium text-primary">
              {item.id}
            </div>
            <p className="text-sm font-medium text-foreground">{item.title}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <button
          onClick={loadMore}
          disabled={loading || !hasMore}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-card active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
        >
          {loading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
              Loading...
            </>
          ) : hasMore ? (
            "Load More"
          ) : (
            "All loaded"
          )}
        </button>
        <p className="mt-2 text-xs text-muted-foreground">
          {items.length} of {total} items
        </p>
      </div>
    </div>
  );
}

function InteractiveDemo() {
  const { items, loading, hasMore, loadMore, reset, total } = useInfiniteData();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleScroll = () => {
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50) loadMore();
    };
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [loadMore]);

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {items.length} of {total} items
        </span>
        <button
          onClick={reset}
          className="rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
        >
          Reset
        </button>
      </div>
      <div ref={containerRef} className="h-52 overflow-y-auto rounded-2xl border border-border bg-card">
        <InfiniteScroll loadMore={loadMore} loading={loading} hasMore={hasMore}>
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 border-b border-border px-4 py-2.5 transition-colors hover:bg-muted/50">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 text-[10px] font-medium text-primary">
                {item.id}
              </div>
              <span className="text-sm text-foreground">{item.title}</span>
            </div>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}

function CustomLoaderDemo() {
  const { items, loading, hasMore, loadMore } = useInfiniteData();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleScroll = () => {
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50) loadMore();
    };
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [loadMore]);

  return (
    <div ref={containerRef} className="h-64 w-full overflow-y-auto rounded-2xl border border-border bg-card">
      <InfiniteScroll
        loadMore={loadMore}
        loading={loading}
        hasMore={hasMore}
        loader={
          <div className="flex justify-center py-4">
            <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
              <div className="h-3 w-3 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
              <span className="text-xs font-medium text-primary">Fetching...</span>
            </div>
          </div>
        }
        endMessage={
          <div className="flex justify-center py-4">
            <span className="rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
              All done!
            </span>
          </div>
        }
      >
        {items.map((item) => (
          <div key={item.id} className="border-b border-border px-4 py-3 transition-colors hover:bg-muted/50">
            <p className="text-sm text-foreground">{item.title}</p>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default function InfiniteScrollPage() {
  return (
    <ComponentDocPage
      name="Infinite Scroll"
      category="Navigation"
      description="Infinite scrolling list with IntersectionObserver-based auto-loading, loading states, end-of-list detection, and smooth content insertion."
    >
      <PreviewPanel filename="infinite-scroll-preview.tsx">
        <ScrollableListDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={INFINITESCROLL_SOURCE}
        filename="components/ui/InfiniteScroll/InfiniteScroll.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Auto Load"
          description="Automatically loads more items when scrolling to the bottom."
          code={`import { InfiniteScroll } from "@/components/ui/InfiniteScroll";

<InfiniteScroll loadMore={loadMore} loading={loading} hasMore={hasMore}>
  {items.map((item) => <div key={item.id}>{item.title}</div>)}
</InfiniteScroll>`}
          filename="auto-load.tsx"
        >
          <ScrollableListDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Load More Button"
          description="Manual load more button with item counter."
          code={`import { InfiniteScroll } from "@/components/ui/InfiniteScroll";

<div>
  {items.map((item) => <div key={item.id}>{item.title}</div>)}
  <button onClick={loadMore} disabled={loading}>
    {loading ? "Loading..." : "Load More"}
  </button>
  <p>{items.length} of {total} items</p>
</div>`}
          filename="load-more-button.tsx"
        >
          <LoadMoreButtonDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Interactive"
          description="Scrollable list with reset button and item counter."
          code={`const { items, loading, hasMore, loadMore, reset, total } = useInfiniteData();

<div>
  <div className="flex justify-between">
    <span>{items.length} items loaded</span>
    <button onClick={reset}>Reset</button>
  </div>
  <div className="h-48 overflow-y-auto">
    <InfiniteScroll loadMore={loadMore} loading={loading} hasMore={hasMore}>
      {items.map((item) => <div key={item.id}>{item.title}</div>)}
    </InfiniteScroll>
  </div>
</div>`}
          filename="interactive.tsx"
        >
          <InteractiveDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Custom Loader"
          description="Custom loading and end-of-list messages."
          code={`<InfiniteScroll
  loadMore={loadMore}
  loading={loading}
  hasMore={hasMore}
  loader={<div>Custom loader</div>}
  endMessage={<div>All done!</div>}
>
  {items.map((item) => <div key={item.id}>{item.title}</div>)}
</InfiniteScroll>`}
          filename="custom-loader.tsx"
        >
          <CustomLoaderDemo />
        </ExampleBlock>
      </section>


    </ComponentDocPage>
  );
}
