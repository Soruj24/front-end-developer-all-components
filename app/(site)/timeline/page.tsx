"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import {
  TIMELINE_SOURCE,
  VERTICAL_EXAMPLE,
  HORIZONTAL_EXAMPLE,
  TYPE_COLORS_EXAMPLE,
  EXPANDABLE_EXAMPLE,
  CUSTOM_ICONS_EXAMPLE,
} from "./timeline-source";
import {
  VerticalDemo,
  HorizontalDemo,
  TypeColorsDemo,
  ExpandableDemo,
  CustomIconsDemo,
} from "./timeline-demos";

export default function TimelinePage() {
  return (
    <ComponentDocPage
      name="Timeline"
      category="Data Display"
      description="A vertical or horizontal timeline for chronological events with type-based color coding, expand/collapse, keyboard navigation, and custom icons."
    >
      <PreviewPanel filename="timeline.tsx">
        <ExpandableDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={TIMELINE_SOURCE}
        filename="components/ui/Timeline/Timeline.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Examples</h2>

        <ExampleBlock
          title="Vertical"
          description="Default vertical layout with gradient-faded timeline line and type-colored nodes."
          code={VERTICAL_EXAMPLE}
          filename="vertical.tsx"
        >
          <VerticalDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Horizontal"
          description="Horizontal scrollable layout with gradient connectors."
          code={HORIZONTAL_EXAMPLE}
          filename="horizontal.tsx"
        >
          <HorizontalDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Type Colors"
          description="Color-coded events: work (blue), personal (emerald), milestone (amber), default (muted)."
          code={TYPE_COLORS_EXAMPLE}
          filename="type-colors.tsx"
        >
          <TypeColorsDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Expandable"
          description="Click events to expand or collapse their description."
          code={EXPANDABLE_EXAMPLE}
          filename="expandable.tsx"
        >
          <ExpandableDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Custom Icons"
          description="Pass custom icon nodes to timeline events."
          code={CUSTOM_ICONS_EXAMPLE}
          filename="custom-icons.tsx"
        >
          <CustomIconsDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
