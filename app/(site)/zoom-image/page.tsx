"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ZOOM_IMAGE_SOURCE } from "./zoom-image-source";
import {
  BASIC_ZOOM_EXAMPLE,
  ZOOM_LEVELS_EXAMPLE,
  ZOOM_LENS_EXAMPLE,
  ZOOM_WINDOW_EXAMPLE,
  ZOOM_WITH_CONTROLS_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./zoom-image-examples";
import {
  BasicZoom,
  ZoomLevels,
  ZoomLens,
  ZoomWindow,
  ZoomWithControls,
  PlaygroundDemo,
} from "./demos";

export default function ZoomImagePage() {
  return (
    <ComponentDocPage
      name="Zoom Image"
      category="Media"
      description="A zoom image component that allows users to zoom into images on hover with smooth transitions and lens effects."
    >
      <PreviewPanel filename="basic-zoom.tsx">
        <BasicZoom />
      </PreviewPanel>

      <SourceCodeViewer
        source={ZOOM_IMAGE_SOURCE}
        filename="components/ui/ZoomImage/BasicZoom.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all zoom image variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Basic Zoom" description="Standard hover-to-zoom with smooth scale transition." code={BASIC_ZOOM_EXAMPLE}>
          <BasicZoom />
        </ExampleBlock>
        <ExampleBlock title="Zoom Levels" description="Selectable zoom levels from 1.5x to 4x." code={ZOOM_LEVELS_EXAMPLE}>
          <ZoomLevels />
        </ExampleBlock>
        <ExampleBlock title="Lens Zoom" description="Circular lens that follows the cursor position." code={ZOOM_LENS_EXAMPLE}>
          <ZoomLens />
        </ExampleBlock>
        <ExampleBlock title="Window Zoom" description="Floating preview window that appears on hover." code={ZOOM_WINDOW_EXAMPLE}>
          <ZoomWindow />
        </ExampleBlock>
        <ExampleBlock title="With Controls" description="Zoom in/out buttons with position indicator." code={ZOOM_WITH_CONTROLS_EXAMPLE}>
          <ZoomWithControls />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
