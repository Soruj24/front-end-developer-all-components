"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ZONE_HEADER_SOURCE } from "./zone-header-source";
import {
  BASIC_HEADER_EXAMPLE,
  WITH_ACTIONS_EXAMPLE,
  WITH_TABS_EXAMPLE,
  MINIMAL_HEADER_EXAMPLE,
  WITH_BADGE_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./zone-header-examples";
import {
  BasicHeader,
  WithActions,
  WithTabs,
  MinimalHeader,
  WithBadge,
  PlaygroundDemo,
} from "./demos";

export default function ZoneHeaderPage() {
  return (
    <ComponentDocPage
      name="Zone Header"
      category="Layout"
      description="A zone header component for creating section headers with title, description, breadcrumb navigation, and action buttons."
    >
      <PreviewPanel filename="basic-header.tsx">
        <BasicHeader />
      </PreviewPanel>

      <SourceCodeViewer
        source={ZONE_HEADER_SOURCE}
        filename="components/ui/ZoneHeader/BasicHeader.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all zone header variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Basic Header" description="Breadcrumb navigation with title, description, and action buttons." code={BASIC_HEADER_EXAMPLE}>
          <BasicHeader />
        </ExampleBlock>
        <ExampleBlock title="With Actions" description="Header with export and add member action buttons." code={WITH_ACTIONS_EXAMPLE}>
          <WithActions />
        </ExampleBlock>
        <ExampleBlock title="With Tabs" description="Header with tab navigation for settings categories." code={WITH_TABS_EXAMPLE}>
          <WithTabs />
        </ExampleBlock>
        <ExampleBlock title="Minimal Header" description="Clean header without border, with filter and new widget buttons." code={MINIMAL_HEADER_EXAMPLE}>
          <MinimalHeader />
        </ExampleBlock>
        <ExampleBlock title="With Badge" description="Header with status badge indicator." code={WITH_BADGE_EXAMPLE}>
          <WithBadge />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
