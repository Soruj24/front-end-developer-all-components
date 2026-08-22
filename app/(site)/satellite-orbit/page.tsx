"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { SATELLITE_ORBIT_SOURCE } from "./satellite-orbit-source";
import {
  BASIC_ORBIT_EXAMPLE,
  MULTIPLE_ORBITS_EXAMPLE,
  ORBIT_PATH_EXAMPLE,
  SATELLITE_INFO_EXAMPLE,
  CONFIGURABLE_ORBIT_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./satellite-orbit-examples";
import {
  BasicOrbit,
  MultipleOrbits,
  OrbitPath,
  SatelliteInfo,
  ConfigurableOrbit,
  PlaygroundDemo,
} from "./demos";

export default function SatelliteOrbitPage() {
  return (
    <ComponentDocPage
      name="Satellite Orbit"
      category="Animation"
      description="An animated satellite orbit visualization for displaying orbiting objects, celestial paths, and circular motion effects."
    >
      <PreviewPanel filename="satellite-orbit.tsx">
        <BasicOrbit />
      </PreviewPanel>

      <SourceCodeViewer
        source={SATELLITE_ORBIT_SOURCE}
        filename="components/ui/SatelliteOrbit/BasicOrbit.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all satellite orbit variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Basic Orbit" description="Single orbit with one orbiting satellite and animated dashed ring." code={BASIC_ORBIT_EXAMPLE}>
          <BasicOrbit />
        </ExampleBlock>
        <ExampleBlock title="Multiple Orbits" description="Concentric orbits with color-coded satellites at different speeds." code={MULTIPLE_ORBITS_EXAMPLE}>
          <MultipleOrbits />
        </ExampleBlock>
        <ExampleBlock title="Orbit Path" description="Linear orbital path with animated satellite and progress markers." code={ORBIT_PATH_EXAMPLE}>
          <OrbitPath />
        </ExampleBlock>
        <ExampleBlock title="Satellite Info" description="Interactive orbit with hover/focus info cards for each satellite." code={SATELLITE_INFO_EXAMPLE}>
          <SatelliteInfo />
        </ExampleBlock>
        <ExampleBlock title="Configurable Orbit" description="Adjustable satellite count and speed with real-time controls." code={CONFIGURABLE_ORBIT_EXAMPLE}>
          <ConfigurableOrbit />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
