"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ZROTATE_BUTTON_SOURCE } from "./zrotate-button-source";
import {
  BASIC_ROTATE_EXAMPLE,
  ROTATE_DIRECTIONS_EXAMPLE,
  ROTATE_SPEEDS_EXAMPLE,
  ROTATE_ICON_ONLY_EXAMPLE,
  ROTATE_DEGREES_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./zrotate-button-examples";
import {
  BasicRotate,
  RotateDirections,
  RotateSpeeds,
  RotateIconOnly,
  RotateDegrees,
  PlaygroundDemo,
} from "./demos";

export default function ZrotateButtonPage() {
  return (
    <ComponentDocPage
      name="Z-rotate Button"
      category="Animation"
      description="A Z-rotate button that spins its icon on hover using a smooth 3D rotation animation around the Z axis."
    >
      <PreviewPanel filename="basic-rotate.tsx">
        <BasicRotate />
      </PreviewPanel>

      <SourceCodeViewer
        source={ZROTATE_BUTTON_SOURCE}
        filename="components/ui/ZRotateButton/BasicRotate.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all Z-rotate button variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Basic Rotate" description="Standard rotate buttons with clockwise and counter-clockwise variants." code={BASIC_ROTATE_EXAMPLE}>
          <BasicRotate />
        </ExampleBlock>
        <ExampleBlock title="Directions" description="Clockwise and counter-clockwise rotation options." code={ROTATE_DIRECTIONS_EXAMPLE}>
          <RotateDirections />
        </ExampleBlock>
        <ExampleBlock title="Speeds" description="Fast (300ms), medium (500ms), and slow (700ms) rotation speeds." code={ROTATE_SPEEDS_EXAMPLE}>
          <RotateSpeeds />
        </ExampleBlock>
        <ExampleBlock title="Icon Only" description="Compact icon-only rotate buttons." code={ROTATE_ICON_ONLY_EXAMPLE}>
          <RotateIconOnly />
        </ExampleBlock>
        <ExampleBlock title="Degrees" description="90°, 180°, 270°, and 360° rotation angles." code={ROTATE_DEGREES_EXAMPLE}>
          <RotateDegrees />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
