"use client";

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

export function InfiniteScroll({
  children,
  loadMore,
  loading = false,
  hasMore = true,
  endMessage,
  loader,
  threshold = 50,
  className,
}: InfiniteScrollProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting && hasMore && !loading) {
        loadMore();
      }
    },
    [hasMore, loading, loadMore],
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: `0px 0px ${threshold}px 0px`,
      threshold: 0,
    });

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
}
