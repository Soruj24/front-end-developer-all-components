"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ZOOM_GESTURE_SOURCE } from "./zoom-gesture-source";
import {
  BASIC_GESTURE_EXAMPLE,
  GESTURE_TYPES_EXAMPLE,
  ZOOM_BOUNDS_EXAMPLE,
  ZOOM_WITH_RESET_EXAMPLE,
  ZOOM_PRESETS_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./zoom-gesture-examples";
import {
  BasicGesture,
  GestureTypes,
  ZoomBounds,
  ZoomWithReset,
  ZoomPresets,
  PlaygroundDemo,
} from "./demos";

export default function ZoomGesturePage() {
  return (
    <ComponentDocPage
      name="Zoom Gesture"
      category="Input"
      description="A zoom gesture component that supports pinch-to-zoom, double-tap zoom, and mouse wheel zoom interactions."
    >
      <PreviewPanel filename="basic-gesture.tsx">
        <BasicGesture />
      </PreviewPanel>

      <SourceCodeViewer
        source={ZOOM_GESTURE_SOURCE}
        filename="components/ui/ZoomGesture/BasicGesture.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all zoom gesture variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Basic Gesture" description="Mouse wheel zoom with preset buttons." code={BASIC_GESTURE_EXAMPLE}>
          <BasicGesture />
        </ExampleBlock>
        <ExampleBlock title="Gesture Types" description="Scroll and double-tap gesture detection with visual feedback." code={GESTURE_TYPES_EXAMPLE}>
          <GestureTypes />
        </ExampleBlock>
        <ExampleBlock title="Zoom Bounds" description="Bounded zoom with min/max limits and boundary indicators." code={ZOOM_BOUNDS_EXAMPLE}>
          <ZoomBounds />
        </ExampleBlock>
        <ExampleBlock title="With Reset" description="Zoom with drag-to-pan and reset button." code={ZOOM_WITH_RESET_EXAMPLE}>
          <ZoomWithReset />
        </ExampleBlock>
        <ExampleBlock title="Presets" description="7 preset zoom levels from 0.5x to 4x." code={ZOOM_PRESETS_EXAMPLE}>
          <ZoomPresets />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
