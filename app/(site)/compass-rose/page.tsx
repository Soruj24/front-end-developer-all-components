"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import {
  COMPASS_ROSE_SOURCE,
  INTERACTIVE_EXAMPLE,
  HEADING_EXAMPLE,
  NAV_EXAMPLE,
  MINI_EXAMPLE,
  GPS_EXAMPLE,
  BEARING_EXAMPLE,
  WIND_EXAMPLE,
} from "./compass-rose-source";
import {
  CompassRoseDemo,
  HeadingIndicatorDemo,
  NavigationBarDemo,
  MiniCompassDemo,
  GPSTrackerDemo,
  BearingCalculatorDemo,
  WindRoseDemo,
} from "./compass-rose-demos";

export default function CompassRosePage() {
  return (
    <ComponentDocPage
      name="Compass Rose"
      category="Navigation"
      description="Interactive compass rose with heading control, cardinal directions, and navigation indicators for wayfinding UIs."
    >
      <PreviewPanel filename="compass-rose.tsx">
        <CompassRoseDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={COMPASS_ROSE_SOURCE}
        filename="components/ui/CompassRose/CompassRose.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Interactive Compass" description="Full compass with tick marks, cardinal labels, and heading slider." code={INTERACTIVE_EXAMPLE}>
          <CompassRoseDemo />
        </ExampleBlock>
        <ExampleBlock title="Heading Indicator" description="Digital heading display with quick-set direction buttons." code={HEADING_EXAMPLE}>
          <HeadingIndicatorDemo />
        </ExampleBlock>
        <ExampleBlock title="Navigation Bar" description="Direction selector with distance and coordinate display." code={NAV_EXAMPLE}>
          <NavigationBarDemo />
        </ExampleBlock>
        <ExampleBlock title="Mini Compass" description="Compact variants for dashboards and sidebars." code={MINI_EXAMPLE}>
          <MiniCompassDemo />
        </ExampleBlock>
        <ExampleBlock title="GPS Tracker" description="Live location tracker with coordinates, speed, and heading." code={GPS_EXAMPLE}>
          <GPSTrackerDemo />
        </ExampleBlock>
        <ExampleBlock title="Bearing Calculator" description="Calculate bearing and distance between two coordinates." code={BEARING_EXAMPLE}>
          <BearingCalculatorDemo />
        </ExampleBlock>
        <ExampleBlock title="Wind Rose" description="Wind direction and speed visualization with gust indicators." code={WIND_EXAMPLE}>
          <WindRoseDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}