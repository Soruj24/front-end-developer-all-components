"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ZOOM_PAN_SOURCE } from "./zoom-pan-source";
import {
  BASIC_PAN_EXAMPLE,
  PAN_BOUNDS_EXAMPLE,
  PAN_WITH_GRID_EXAMPLE,
  PAN_MINIMAP_EXAMPLE,
  PAN_WITH_CONTROLS_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./zoom-pan-examples";
import {
  BasicPan,
  PanBounds,
  PanWithGrid,
  PanMinimap,
  PanWithControls,
  PlaygroundDemo,
} from "./demos";

export default function ZoomPanPage() {
  return (
    <ComponentDocPage
      name="Zoom Pan"
      category="Input"
      description="A zoom and pan component that allows users to zoom into content and pan around with mouse drag and scroll."
    >
      <PreviewPanel filename="basic-pan.tsx">
        <BasicPan />
      </PreviewPanel>

      <SourceCodeViewer
        source={ZOOM_PAN_SOURCE}
        filename="components/ui/ZoomPan/BasicPan.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all zoom pan variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Basic Pan" description="Drag to pan and scroll to zoom with reset controls." code={BASIC_PAN_EXAMPLE}>
          <BasicPan />
        </ExampleBlock>
        <ExampleBlock title="Pan Bounds" description="Bounded pan with ±100px limits on both axes." code={PAN_BOUNDS_EXAMPLE}>
          <PanBounds />
        </ExampleBlock>
        <ExampleBlock title="Pan with Grid" description="Dot grid background that moves with pan." code={PAN_WITH_GRID_EXAMPLE}>
          <PanWithGrid />
        </ExampleBlock>
        <ExampleBlock title="Pan with Minimap" description="Mini viewport indicator showing current position." code={PAN_MINIMAP_EXAMPLE}>
          <PanMinimap />
        </ExampleBlock>
        <ExampleBlock title="External Controls" description="Zoom and reset controls outside the pan area." code={PAN_WITH_CONTROLS_EXAMPLE}>
          <PanWithControls />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
