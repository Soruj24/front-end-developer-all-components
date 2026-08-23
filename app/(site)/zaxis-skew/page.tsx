"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ZAXIS_SKEW_SOURCE } from "./zaxis-skew-source";
import {
  BASIC_SKEW_EXAMPLE,
  SKEW_DIRECTIONS_EXAMPLE,
  PERSPECTIVE_SKEW_EXAMPLE,
  INTERACTIVE_SKEW_EXAMPLE,
  SKEW_CARDS_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./zaxis-skew-examples";
import {
  BasicSkew,
  SkewDirections,
  PerspectiveSkew,
  InteractiveSkew,
  SkewCards,
  PlaygroundDemo,
} from "./demos";

export default function ZaxisSkewPage() {
  return (
    <ComponentDocPage
      name="Z-axis Skew"
      category="Animation"
      description="A Z-axis skew component that applies 3D skew transforms for creating perspective distortion and depth effects."
    >
      <PreviewPanel filename="basic-skew.tsx">
        <BasicSkew />
      </PreviewPanel>

      <SourceCodeViewer
        source={ZAXIS_SKEW_SOURCE}
        filename="components/ui/ZAxisSkew/BasicSkew.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all Z-axis skew variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Basic Skew" description="Progressive skew angles from 0° to 20°." code={BASIC_SKEW_EXAMPLE}>
          <BasicSkew />
        </ExampleBlock>
        <ExampleBlock title="Skew Directions" description="X-axis, Y-axis, and combined skew transforms." code={SKEW_DIRECTIONS_EXAMPLE}>
          <SkewDirections />
        </ExampleBlock>
        <ExampleBlock title="Perspective Skew" description="3D perspective rotation with skew effects." code={PERSPECTIVE_SKEW_EXAMPLE}>
          <PerspectiveSkew />
        </ExampleBlock>
        <ExampleBlock title="Interactive Skew" description="Real-time skew control with range sliders." code={INTERACTIVE_SKEW_EXAMPLE}>
          <InteractiveSkew />
        </ExampleBlock>
        <ExampleBlock title="Skew Cards" description="Card-style skew with counter-rotated text." code={SKEW_CARDS_EXAMPLE}>
          <SkewCards />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
