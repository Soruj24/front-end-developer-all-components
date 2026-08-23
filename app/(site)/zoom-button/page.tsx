"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ZOOM_BUTTON_SOURCE } from "./zoom-button-source";
import {
  BASIC_ZOOM_EXAMPLE,
  ZOOM_WITH_LABELS_EXAMPLE,
  ZOOM_CONTROLS_EXAMPLE,
  ZOOM_SIZES_EXAMPLE,
  ZOOM_STATES_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./zoom-button-examples";
import {
  BasicZoom,
  ZoomWithLabels,
  ZoomControls,
  ZoomSizes,
  ZoomStates,
  PlaygroundDemo,
} from "./demos";

export default function ZoomButtonPage() {
  return (
    <ComponentDocPage
      name="Zoom Button"
      category="Input"
      description="A zoom button component for triggering zoom actions with animated icon transitions and visual feedback."
    >
      <PreviewPanel filename="basic-zoom.tsx">
        <BasicZoom />
      </PreviewPanel>

      <SourceCodeViewer
        source={ZOOM_BUTTON_SOURCE}
        filename="components/ui/ZoomButton/ZoomControls.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all zoom button variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Basic Zoom" description="Icon-only zoom buttons with hover scale effects." code={BASIC_ZOOM_EXAMPLE}>
          <BasicZoom />
        </ExampleBlock>
        <ExampleBlock title="With Labels" description="Zoom buttons with text labels and primary variant." code={ZOOM_WITH_LABELS_EXAMPLE}>
          <ZoomWithLabels />
        </ExampleBlock>
        <ExampleBlock title="Zoom Controls" description="Interactive zoom control with percentage display and preview." code={ZOOM_CONTROLS_EXAMPLE}>
          <ZoomControls />
        </ExampleBlock>
        <ExampleBlock title="Sizes" description="Zoom buttons in different sizes from small to extra-large." code={ZOOM_SIZES_EXAMPLE}>
          <ZoomSizes />
        </ExampleBlock>
        <ExampleBlock title="States" description="Toggleable zoom state buttons with active indicator." code={ZOOM_STATES_EXAMPLE}>
          <ZoomStates />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
