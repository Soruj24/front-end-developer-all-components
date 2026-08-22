"use client";

import { useState } from "react";
import { InboxIcon, RefreshCwIcon, UserIcon, UsersIcon } from "lucide-react";

const frame =
  "flex h-48 w-full overflow-hidden rounded-xl border border-border bg-background shadow-xs";

const profileTabs = ["Posts", "About", "Friends"] as const;

/** Profile header with tabbed content sections. */
export function ProfileDemo() {
  const [tab, setTab] = useState<(typeof profileTabs)[number]>("Posts");
  return (
    <div className={frame}>
      <div className="flex flex-1 flex-col items-center p-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-primary">
          <UserIcon className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3 className="mt-2 text-xs font-semibold tracking-tight">Riley Chen</h3>
        <p className="text-[10px] text-muted-foreground">Product Engineer</p>
        <div
          role="tablist"
          aria-label="Profile sections"
          className="mt-3 flex gap-1 rounded-lg bg-muted p-0.5"
        >
          {profileTabs.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={tab === item}
              onClick={() => setTab(item)}
              className={`rounded-md px-2.5 py-1 text-[11px] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 ${
                tab === item
                  ? "bg-background font-medium shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item === "Friends" ? (
                <span className="flex items-center gap-1">
                  <UsersIcon className="h-3 w-3" aria-hidden="true" /> Friends
                </span>
              ) : (
                item
              )}
            </button>
          ))}
        </div>
        <p className="mt-3 text-[11px] text-muted-foreground/70">{tab} content</p>
      </div>
    </div>
  );
}

/** Friendly empty state with a primary call to action. */
export function EmptyStateDemo() {
  return (
    <div className={frame}>
      <div className="flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
          <InboxIcon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        </span>
        <h3 className="text-xs font-semibold tracking-tight">No messages yet</h3>
        <p className="max-w-52 text-[11px] leading-relaxed text-muted-foreground">
          When teammates mention you, it will show up here.
        </p>
        <button
          type="button"
          className="mt-1 rounded-md border border-input px-2.5 py-1 text-[11px] font-medium transition-colors duration-150 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        >
          Invite teammates
        </button>
      </div>
    </div>
  );
}

/** Skeleton placeholders mirroring a list layout. */
export function LoadingSkeletonDemo() {
  return (
    <div className={frame}>
      <div className="flex w-full max-w-72 flex-col gap-2.5 p-4">
        {[0, 1, 2].map((row) => (
          <div key={row} className="flex items-center gap-2.5">
            <span className="h-7 w-7 shrink-0 animate-pulse rounded-full bg-muted" />
            <span className="flex flex-1 flex-col gap-1.5">
              <span className="h-2 w-1/3 animate-pulse rounded-full bg-muted" />
              <span className="h-2 w-2/3 animate-pulse rounded-full bg-muted/70" />
            </span>
            <span className="h-2 w-8 animate-pulse rounded-full bg-muted/50" />
          </div>
        ))}
        <span className="sr-only" role="status">Loading…</span>
        <span className="mx-auto mt-1 flex items-center gap-1 text-[10px] text-muted-foreground/60">
          <RefreshCwIcon className="h-3 w-3 animate-spin" aria-hidden="true" /> Fetching latest…
        </span>
      </div>
    </div>
  );
}
