"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { ActivityFeed } from "@/components/ui/ActivityFeed";
import type { ActivityFeedItem } from "@/components/ui/ActivityFeed";
import {
  ACTIVITY_FEED_SOURCE,
  DEFAULT_EXAMPLE,
  COMPACT_EXAMPLE,
  MINIMAL_EXAMPLE,
  FILTERED_EXAMPLE,
} from "./activity-feed-source";
import { ApiActivityFeed } from "./api-activity-feed";
import {
  ACTIVITY_MOCK_SNIPPET,
  ACTIVITY_REAL_SNIPPET,
  ACTIVITY_SWITCH_SNIPPET,
} from "./api-activity-snippets";

const feedItems: ActivityFeedItem[] = [
  {
    id: "1",
    user: "Sarah Chen",
    action: "pushed 3 commits to",
    target: "main",
    time: "2 min ago",
    avatar: "Sarah Chen",
    color: "bg-blue-500",
    details: (
      <div className="flex flex-col gap-1">
        <code className="text-xs">fix: resolve auth token refresh</code>
        <code className="text-xs">feat: add dark mode toggle</code>
        <code className="text-xs">chore: update dependencies</code>
      </div>
    ),
  },
  {
    id: "2",
    user: "Marcus Rivera",
    action: "opened a pull request in",
    target: "frontend-app",
    time: "15 min ago",
    avatar: "Marcus Rivera",
    color: "bg-emerald-500",
    details: "PR #247: Refactor dashboard components to use new design tokens.",
  },
  {
    id: "3",
    user: "Aisha Patel",
    action: "deployed",
    target: "api-gateway v3.2.1",
    time: "1 hour ago",
    avatar: "Aisha Patel",
    color: "bg-violet-500",
  },
  {
    id: "4",
    user: "System",
    action: "completed backup of",
    target: "production database",
    time: "2 hours ago",
    color: "bg-amber-500",
  },
  {
    id: "5",
    user: "James Okonkwo",
    action: "commented on",
    target: "Issue #189",
    time: "3 hours ago",
    avatar: "James Okonkwo",
    color: "bg-rose-500",
    details:
      "I think we should consider using a connection pool here for better performance under load.",
  },
  {
    id: "6",
    user: "Elena Volkov",
    action: "merged",
    target: "feature/auth-v2",
    time: "5 hours ago",
    avatar: "Elena Volkov",
    color: "bg-cyan-500",
  },
];

function DefaultDemo() {
  return (
    <div className="w-full max-w-md rounded-xl border border-border bg-background p-5">
      <ActivityFeed items={feedItems} />
    </div>
  );
}

function CompactDemo() {
  return (
    <div className="w-full max-w-md rounded-xl border border-border bg-background p-4">
      <ActivityFeed items={feedItems} variant="compact" />
    </div>
  );
}

function MinimalDemo() {
  return (
    <div className="w-full max-w-md rounded-xl border border-border bg-background p-5">
      <ActivityFeed items={feedItems} variant="minimal" />
    </div>
  );
}

function FilteredDemo() {
  const [showAll, setShowAll] = useState(false);
  return (
    <div className="w-full max-w-md">
      <div className="mb-4 flex gap-2">
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className={`inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
            showAll
              ? "bg-primary text-primary-foreground"
              : "border border-border bg-background text-foreground hover:bg-muted"
          }`}
        >
          All
        </button>
        <button
          type="button"
          onClick={() => setShowAll(false)}
          className={`inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
            !showAll
              ? "bg-primary text-primary-foreground"
              : "border border-border bg-background text-foreground hover:bg-muted"
          }`}
        >
          Recent
        </button>
      </div>
      <div className="rounded-xl border border-border bg-background p-5">
        <ActivityFeed items={feedItems} showAll={showAll} maxItems={3} />
      </div>
    </div>
  );
}

export default function ActivityFeedPage() {
  return (
    <ComponentDocPage
      name="Activity Feed"
      category="Data Display"
      description="Timeline-style activity feed with avatars, expandable details, and 3 display variants."
    >
      <PreviewPanel filename="ActivityFeed.tsx">
        <DefaultDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={ACTIVITY_FEED_SOURCE}
        filename="components/ui/ActivityFeed.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-8">
        <ExampleBlock
          title="Default"
          description="Standard timeline with avatars, connecting lines, and expandable details."
          code={DEFAULT_EXAMPLE}
        >
          <DefaultDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Compact"
          description="Smaller avatars and tighter spacing for dense layouts."
          code={COMPACT_EXAMPLE}
        >
          <CompactDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Minimal"
          description="Timeline dots instead of avatars for a clean, minimal look."
          code={MINIMAL_EXAMPLE}
        >
          <MinimalDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Filtered"
          description="Toggle between showing all items or only recent ones."
          code={FILTERED_EXAMPLE}
        >
          <FilteredDemo />
        </ExampleBlock>
      </div>

      <section aria-labelledby="activity-api-heading" className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 id="activity-api-heading" className="text-lg font-semibold tracking-tight text-foreground">
            Live data: Mock / Real API
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            The same feed driven by a mock adapter or a real posts endpoint. Records stay
            serializable (no JSX over the wire) and are mapped to feed items at the edge.
          </p>
        </div>

        <div className="flex justify-center overflow-hidden rounded-xl border border-border bg-background p-4 sm:p-6">
          <ApiActivityFeed />
        </div>

        <SourceCodeViewer source={ACTIVITY_MOCK_SNIPPET} filename="activity.mock.tsx" label="tsx" />
        <SourceCodeViewer source={ACTIVITY_REAL_SNIPPET} filename="activity.real.tsx" label="tsx" />
        <SourceCodeViewer source={ACTIVITY_SWITCH_SNIPPET} filename="switching-to-real.ts" label="ts" />
      </section>
    </ComponentDocPage>
  );
}
