"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import {
  AWARDBADGE_SOURCE,
  TIERS_EXAMPLE,
  ACHIEVEMENTS_EXAMPLE,
  LEADERBOARD_EXAMPLE,
  COMPACT_EXAMPLE,
  DESCRIPTION_EXAMPLE,
  PROGRESS_EXAMPLE,
  STACK_EXAMPLE,
  HOVER_EXAMPLE,
  AllTiersDemo,
  AchievementCardDemo,
  LeaderboardDemo,
  CompactIconsDemo,
  WithDescriptionDemo,
  ProgressToTierDemo,
  StackedAchievementsDemo,
  InteractiveHoverDemo,
} from "./award-badge-source";

export default function AwardBadgePage() {
  return (
    <ComponentDocPage
      name="Award Badge"
      category="Feedback"
      description="Visual award badges for achievements, rankings, and recognition with metallic styling and tier variants."
    >
      <PreviewPanel filename="award-badge.tsx">
        <AllTiersDemo />
      </PreviewPanel>

      <SourceCodeViewer source={AWARDBADGE_SOURCE} filename="components/ui/AwardBadge/AwardBadge.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Achievement Cards" description="Achievement cards with gradient icons, descriptions, and earned status indicators." code={ACHIEVEMENTS_EXAMPLE}>
          <AchievementCardDemo />
        </ExampleBlock>

        <ExampleBlock title="Leaderboard" description="Ranked user list with avatars, scores, and tier badges." code={LEADERBOARD_EXAMPLE}>
          <LeaderboardDemo />
        </ExampleBlock>

        <ExampleBlock title="Compact Icons" description="Small circular icons for embedding in tables, lists, or tight spaces." code={COMPACT_EXAMPLE}>
          <CompactIconsDemo />
        </ExampleBlock>

        <ExampleBlock title="With Description" description="Award badges with title, description, and date in a card layout." code={DESCRIPTION_EXAMPLE}>
          <WithDescriptionDemo />
        </ExampleBlock>

        <ExampleBlock title="Progress to Next Tier" description="Progress bar showing points earned and distance to next award tier." code={PROGRESS_EXAMPLE}>
          <ProgressToTierDemo />
        </ExampleBlock>

        <ExampleBlock title="User Profile Stack" description="User profile card with stacked award counts and total points." code={STACK_EXAMPLE}>
          <StackedAchievementsDemo />
        </ExampleBlock>

        <ExampleBlock title="Interactive Hover" description="Hover to see scale and rotation animations on award badges." code={HOVER_EXAMPLE}>
          <InteractiveHoverDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}