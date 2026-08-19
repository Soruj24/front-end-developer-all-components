"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import {
  ACTIVITY_FEED_CARD_SOURCE,
  DEFAULT_EXAMPLE,
  COMPACT_EXAMPLE,
  NOTIFICATION_EXAMPLE,
  GROUPED_EXAMPLE,
  FILTERED_EXAMPLE,
  DETAILED_EXAMPLE,
} from "./activity-feed-card-source";
import {
  realisticFeedItems,
  DefaultFeedCard,
  CompactTimelineCard,
  NotificationStyleCard,
  GroupedByTimeDemo,
  FilteredFeedDemo,
  WithDetailsFeedDemo,
} from "./activity-feed-card-demos";

export default function ActivityFeedCardPage() {
  return (
    <ComponentDocPage
      name="Activity Feed Card"
      category="Data Display"
      description="Display real-time activity feed items with avatars, action types, timestamps, and filterable content for social or collaboration dashboards."
    >
      <PreviewPanel filename="activity-feed-card.tsx">
        <div className="flex flex-col gap-2.5 w-full max-w-md">
          {realisticFeedItems.slice(0, 6).map((item) => (
            <DefaultFeedCard key={item.id} item={item} />
          ))}
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={ACTIVITY_FEED_CARD_SOURCE}
        filename="components/ui/ActivityFeedCard/ActivityFeedCard.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Default Feed" description="Standard activity feed with gradient avatars, type badges, and timestamps." code={DEFAULT_EXAMPLE}>
          <div className="flex flex-col gap-2.5 w-full max-w-md">
            {realisticFeedItems.slice(0, 6).map((item) => (
              <DefaultFeedCard key={item.id} item={item} />
            ))}
          </div>
        </ExampleBlock>

        <ExampleBlock title="Compact Timeline" description="Condensed layout for embedding in sidebars or tight spaces." code={COMPACT_EXAMPLE}>
          <div className="flex flex-col gap-1.5 w-full max-w-md">
            {realisticFeedItems.slice(0, 6).map((item) => (
              <CompactTimelineCard key={item.id} item={item} />
            ))}
          </div>
        </ExampleBlock>

        <ExampleBlock title="Notification Style" description="Icon-led layout similar to notification centers and in-app feeds." code={NOTIFICATION_EXAMPLE}>
          <div className="flex flex-col gap-2 w-full max-w-md">
            {realisticFeedItems.slice(0, 5).map((item) => (
              <NotificationStyleCard key={item.id} item={item} />
            ))}
          </div>
        </ExampleBlock>

        <ExampleBlock title="Grouped by Time" description="Activities organized into time-based sections for easier scanning." code={GROUPED_EXAMPLE}>
          <GroupedByTimeDemo />
        </ExampleBlock>

        <ExampleBlock title="Filtered Feed" description="Filter activities by type using segmented control tabs." code={FILTERED_EXAMPLE}>
          <FilteredFeedDemo />
        </ExampleBlock>

        <ExampleBlock title="With Descriptions" description="Extended cards showing commit messages, PR descriptions, and deploy notes." code={DETAILED_EXAMPLE}>
          <WithDetailsFeedDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}