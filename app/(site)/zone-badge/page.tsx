"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ZONE_BADGE_SOURCE } from "./zone-badge-source";
import {
  BASIC_BADGES_EXAMPLE,
  BADGE_COLORS_EXAMPLE,
  BADGE_SIZES_EXAMPLE,
  BADGE_WITH_DOT_EXAMPLE,
  BADGE_WITH_ICON_EXAMPLE,
  BADGE_REMOVABLE_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./zone-badge-examples";
import {
  BasicBadges,
  BadgeColors,
  BadgeSizes,
  BadgeWithDot,
  BadgeWithIcon,
  BadgeRemovable,
  PlaygroundDemo,
} from "./demos";

export default function ZoneBadgePage() {
  return (
    <ComponentDocPage
      name="Zone Badge"
      category="Feedback"
      description="A zone badge component for displaying zone labels, status indicators, and category tags with customizable colors."
    >
      <PreviewPanel filename="basic-badges.tsx">
        <BasicBadges />
      </PreviewPanel>

      <SourceCodeViewer
        source={ZONE_BADGE_SOURCE}
        filename="components/ui/ZoneBadge/BasicBadges.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all zone badge variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Basic Badges" description="Default solid badges with tag icons." code={BASIC_BADGES_EXAMPLE}>
          <BasicBadges />
        </ExampleBlock>
        <ExampleBlock title="Badge Colors" description="6 color options with border and background." code={BADGE_COLORS_EXAMPLE}>
          <BadgeColors />
        </ExampleBlock>
        <ExampleBlock title="Badge Sizes" description="XS, SM, MD, LG, and XL size variants." code={BADGE_SIZES_EXAMPLE}>
          <BadgeSizes />
        </ExampleBlock>
        <ExampleBlock title="With Dot" description="Status badges with colored dot indicators." code={BADGE_WITH_DOT_EXAMPLE}>
          <BadgeWithDot />
        </ExampleBlock>
        <ExampleBlock title="With Icon" description="Outlined badges with contextual icons." code={BADGE_WITH_ICON_EXAMPLE}>
          <BadgeWithIcon />
        </ExampleBlock>
        <ExampleBlock title="Removable" description="Interactive badges with close button." code={BADGE_REMOVABLE_EXAMPLE}>
          <BadgeRemovable />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
