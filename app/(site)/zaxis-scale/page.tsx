"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ZAXIS_SCALE_SOURCE } from "./zaxis-scale-source";
import {
  BASIC_SCALE_EXAMPLE,
  SCALE_LEVELS_EXAMPLE,
  SCALE_INTERACTIVE_EXAMPLE,
  SCALE_ON_HOVER_EXAMPLE,
  SCALE_PULSE_EXAMPLE,
  SCALE_STACKED_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./zaxis-scale-examples";
import {
  BasicScale,
  ScaleLevels,
  ScaleInteractive,
  ScaleOnHover,
  ScalePulse,
  ScaleStacked,
  PlaygroundDemo,
} from "./demos";

export default function ZaxisScalePage() {
  return (
    <ComponentDocPage
      name="Z-axis Scale"
      category="Animation"
      description="A z-axis scale component for creating 3D scale animations that simulate elements moving closer or farther away."
    >
      <PreviewPanel filename="basic-scale.tsx">
        <BasicScale />
      </PreviewPanel>

      <SourceCodeViewer
        source={ZAXIS_SCALE_SOURCE}
        filename="components/ui/ZAxisScale/BasicScale.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all Z-axis scale variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Basic Scale" description="5-element scale progression from 60% to 140%." code={BASIC_SCALE_EXAMPLE}>
          <BasicScale />
        </ExampleBlock>
        <ExampleBlock title="Scale Levels" description="Progressively sized elements showing depth levels." code={SCALE_LEVELS_EXAMPLE}>
          <ScaleLevels />
        </ExampleBlock>
        <ExampleBlock title="Interactive" description="Real-time scale control with range slider." code={SCALE_INTERACTIVE_EXAMPLE}>
          <ScaleInteractive />
        </ExampleBlock>
        <ExampleBlock title="On Hover" description="Scale to 150%, 200%, 250%, or 300% on hover." code={SCALE_ON_HOVER_EXAMPLE}>
          <ScaleOnHover />
        </ExampleBlock>
        <ExampleBlock title="Scale Pulse" description="Animated pulse effect with configurable duration." code={SCALE_PULSE_EXAMPLE}>
          <ScalePulse />
        </ExampleBlock>
        <ExampleBlock title="Stacked Layers" description="Overlapping cards with perspective depth." code={SCALE_STACKED_EXAMPLE}>
          <ScaleStacked />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
