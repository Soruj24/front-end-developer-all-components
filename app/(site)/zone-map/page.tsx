"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ZONE_MAP_SOURCE } from "./zone-map-source";
import {
  BASIC_MAP_EXAMPLE,
  MAP_WITH_COLORS_EXAMPLE,
  MAP_WITH_PINS_EXAMPLE,
  MAP_COMPACT_EXAMPLE,
  MAP_WITH_LEGEND_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./zone-map-examples";
import {
  BasicMap,
  MapWithColors,
  MapWithPins,
  MapCompact,
  MapWithLegend,
  PlaygroundDemo,
} from "./demos";

export default function ZoneMapPage() {
  return (
    <ComponentDocPage
      name="Zone Map"
      category="Navigation"
      description="A zone map component for visualizing and navigating between different zones or regions in a spatial layout."
    >
      <PreviewPanel filename="basic-map.tsx">
        <BasicMap />
      </PreviewPanel>

      <SourceCodeViewer
        source={ZONE_MAP_SOURCE}
        filename="components/ui/ZoneMap/BasicMap.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all zone map variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Basic Map" description="Default 3x3 zone grid with click selection." code={BASIC_MAP_EXAMPLE}>
          <BasicMap />
        </ExampleBlock>
        <ExampleBlock title="With Colors" description="Color-coded zones with blue, violet, emerald, amber, and rose." code={MAP_WITH_COLORS_EXAMPLE}>
          <MapWithColors />
        </ExampleBlock>
        <ExampleBlock title="With Pins" description="Spatial map with clickable pin markers." code={MAP_WITH_PINS_EXAMPLE}>
          <MapWithPins />
        </ExampleBlock>
        <ExampleBlock title="Compact" description="4x2 dense zone grid for compact layouts." code={MAP_COMPACT_EXAMPLE}>
          <MapCompact />
        </ExampleBlock>
        <ExampleBlock title="With Legend" description="Zone map with status dot indicators and legend." code={MAP_WITH_LEGEND_EXAMPLE}>
          <MapWithLegend />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
