"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ZAXIS_ROTATE_SOURCE } from "./zaxis-rotate-source";
import {
  BASIC_ROTATE_EXAMPLE,
  ROTATE_SPEEDS_EXAMPLE,
  ROTATE_DIRECTIONS_EXAMPLE,
  ROTATE_EASING_EXAMPLE,
  ROTATE_WITH_CONTROLS_EXAMPLE,
  ROTATE_ON_HOVER_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./zaxis-rotate-examples";
import {
  BasicRotate,
  RotateSpeeds,
  RotateDirections,
  RotateEasing,
  RotateWithControls,
  RotateOnHover,
  PlaygroundDemo,
} from "./demos";

export default function ZaxisRotatePage() {
  return (
    <ComponentDocPage
      name="Z-axis Rotate"
      category="Animation"
      description="A z-axis rotation component for creating 3D rotate animations around the Z axis with customizable duration and easing."
    >
      <PreviewPanel filename="basic-rotate.tsx">
        <BasicRotate />
      </PreviewPanel>

      <SourceCodeViewer
        source={ZAXIS_ROTATE_SOURCE}
        filename="components/ui/ZaxisRotate/BasicRotate.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all z-axis rotate variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Basic Rotate" description="Three rotating elements with different speeds and directions." code={BASIC_ROTATE_EXAMPLE}>
          <BasicRotate />
        </ExampleBlock>
        <ExampleBlock title="Speeds" description="Four rotation speeds: slow (4s), normal (2s), fast (1s), very fast (0.5s)." code={ROTATE_SPEEDS_EXAMPLE}>
          <RotateSpeeds />
        </ExampleBlock>
        <ExampleBlock title="Directions" description="Clockwise and counter-clockwise rotation." code={ROTATE_DIRECTIONS_EXAMPLE}>
          <RotateDirections />
        </ExampleBlock>
        <ExampleBlock title="Easing" description="Four timing functions: linear, ease, ease-in, ease-out." code={ROTATE_EASING_EXAMPLE}>
          <RotateEasing />
        </ExampleBlock>
        <ExampleBlock title="With Controls" description="Manual rotation control with -90/0/+90 buttons." code={ROTATE_WITH_CONTROLS_EXAMPLE}>
          <RotateWithControls />
        </ExampleBlock>
        <ExampleBlock title="On Hover" description="Hover to trigger rotation with transition." code={ROTATE_ON_HOVER_EXAMPLE}>
          <RotateOnHover />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
