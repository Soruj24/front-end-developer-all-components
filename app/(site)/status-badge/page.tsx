"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import {
  STATUS_BADGE_SOURCE,
  STATUS_EXAMPLE,
  ANIMATED_EXAMPLE,
  SIZES_EXAMPLE,
  CUSTOM_ICON_EXAMPLE,
  USERS_EXAMPLE,
} from "./status-badge-source";
import {
  BasicBadgesDemo,
  AnimatedBadgesDemo,
  SizesDemo,
  CustomIconDemo,
  UserListDemo,
  InteractiveDemo,
  DotOnlyDemo,
} from "./status-badge-demos";

export default function StatusBadgePage() {
  return (
    <ComponentDocPage
      name="Status Badge"
      category="Data Display"
      description="Visual status indicators with animated dots, icons, and color-coded states. Ideal for user presence, task status, and system health."
    >
      <PreviewPanel filename="status-badge.tsx">
        <BasicBadgesDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={STATUS_BADGE_SOURCE}
        filename="components/ui/StatusBadge/StatusBadge.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Examples</h2>

        <ExampleBlock
          title="Animated Status"
          description="Ping animation for live, streaming, or active indicators."
          code={ANIMATED_EXAMPLE}
          filename="animated-badges.tsx"
        >
          <AnimatedBadgesDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Sizes"
          description="Small, medium, and large badge sizes."
          code={SIZES_EXAMPLE}
          filename="sizes.tsx"
        >
          <SizesDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Custom Icons"
          description="Override the default icon with a custom element."
          code={CUSTOM_ICON_EXAMPLE}
          filename="custom-icons.tsx"
        >
          <CustomIconDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Dot Only"
          description="Compact dot indicator without label text."
          code={`<StatusBadge status="active" label="Online" dotOnly />`}
          filename="dot-only.tsx"
        >
          <DotOnlyDemo />
        </ExampleBlock>

        <ExampleBlock
          title="User List"
          description="Status badges in a real-world user list context."
          code={USERS_EXAMPLE}
          filename="user-list.tsx"
        >
          <UserListDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Interactive"
          description="Click status buttons to switch the badge on a user card."
          code={STATUS_EXAMPLE}
          filename="interactive.tsx"
        >
          <InteractiveDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
