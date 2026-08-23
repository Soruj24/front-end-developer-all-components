"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ZERO_GRAVITY_SOURCE } from "./zero-gravity-source";
import {
  BASIC_GRAVITY_EXAMPLE,
  GRAVITY_SHAPES_EXAMPLE,
  GRAVITY_DRIFT_EXAMPLE,
  GRAVITY_ORBIT_EXAMPLE,
  GRAVITY_WAVE_EXAMPLE,
  GRAVITY_CONTROLLED_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./zero-gravity-examples";
import {
  BasicGravity,
  GravityShapes,
  GravityDrift,
  GravityOrbit,
  GravityWave,
  GravityControlled,
  PlaygroundDemo,
} from "./demos";

export default function ZeroGravityPage() {
  return (
    <ComponentDocPage
      name="Zero Gravity"
      category="Animation"
      description="A zero gravity animation component that creates a floating, weightless effect for elements with customizable drift patterns."
    >
      <PreviewPanel filename="basic-gravity.tsx">
        <BasicGravity />
      </PreviewPanel>

      <SourceCodeViewer
        source={ZERO_GRAVITY_SOURCE}
        filename="components/ui/ZeroGravity/BasicGravity.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all zero gravity variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Basic Gravity" description="Five floating circles with blue-violet gradient." code={BASIC_GRAVITY_EXAMPLE}>
          <BasicGravity />
        </ExampleBlock>
        <ExampleBlock title="Shapes" description="Different shapes (circle, square, diamond) floating together." code={GRAVITY_SHAPES_EXAMPLE}>
          <GravityShapes />
        </ExampleBlock>
        <ExampleBlock title="Drift" description="Multi-directional drift with rotation." code={GRAVITY_DRIFT_EXAMPLE}>
          <GravityDrift />
        </ExampleBlock>
        <ExampleBlock title="Orbit" description="Elements orbiting around a central point." code={GRAVITY_ORBIT_EXAMPLE}>
          <GravityOrbit />
        </ExampleBlock>
        <ExampleBlock title="Wave" description="Synchronized wave motion across elements." code={GRAVITY_WAVE_EXAMPLE}>
          <GravityWave />
        </ExampleBlock>
        <ExampleBlock title="Controlled" description="Pause/resume with adjustable speed." code={GRAVITY_CONTROLLED_EXAMPLE}>
          <GravityControlled />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
