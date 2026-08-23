"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ZONE_GRID_SOURCE } from "./zone-grid-source";
import {
  BASIC_GRID_EXAMPLE,
  GRID_WITH_LABELS_EXAMPLE,
  GRID_COLOR_ZONES_EXAMPLE,
  GRID_SPAN_VARIANTS_EXAMPLE,
  GRID_RESPONSIVE_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./zone-grid-examples";
import {
  BasicGrid,
  GridWithLabels,
  GridColorZones,
  GridSpanVariants,
  GridResponsive,
  PlaygroundDemo,
} from "./demos";

export default function ZoneGridPage() {
  return (
    <ComponentDocPage
      name="Zone Grid"
      category="Layout"
      description="A zone grid component for creating responsive grid layouts with draggable, resizable zone cells."
    >
      <PreviewPanel filename="basic-grid.tsx">
        <BasicGrid />
      </PreviewPanel>

      <SourceCodeViewer
        source={ZONE_GRID_SOURCE}
        filename="components/ui/ZoneGrid/BasicGrid.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all zone grid variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Basic Grid" description="Default 3-column grid with zone cells." code={BASIC_GRID_EXAMPLE}>
          <BasicGrid />
        </ExampleBlock>
        <ExampleBlock title="With Labels" description="Semantic layout zones with header, sidebar, main content, and footer." code={GRID_WITH_LABELS_EXAMPLE}>
          <GridWithLabels />
        </ExampleBlock>
        <ExampleBlock title="Color Zones" description="Color-coded zone cells with blue, violet, emerald, amber, rose, and zinc." code={GRID_COLOR_ZONES_EXAMPLE}>
          <GridColorZones />
        </ExampleBlock>
        <ExampleBlock title="Span Variants" description="Different column span configurations from 1 to 4 columns." code={GRID_SPAN_VARIANTS_EXAMPLE}>
          <GridSpanVariants />
        </ExampleBlock>
        <ExampleBlock title="Responsive" description="Adaptive grid that adjusts columns based on viewport width." code={GRID_RESPONSIVE_EXAMPLE}>
          <GridResponsive />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
