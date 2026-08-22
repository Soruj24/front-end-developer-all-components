"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { RADAR_SCAN_SOURCE } from "./radar-scan-source";
import {
  BASIC_RADAR_EXAMPLE,
  WITH_TARGETS_EXAMPLE,
  SCAN_GRID_EXAMPLE,
  ANIMATED_RADAR_EXAMPLE,
  DETECTION_LIST_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./radar-scan-examples";
import {
  BasicRadar,
  WithTargets,
  ScanGrid,
  AnimatedRadar,
  DetectionList,
  PlaygroundDemo,
} from "./demos";

export default function RadarScanPage() {
  return (
    <ComponentDocPage
      name="Radar Scan"
      category="Animation"
      description="An animated radar scan visualization for detecting targets, monitoring activity, and real-time scanning displays."
    >
      <PreviewPanel filename="radar-scan.tsx">
        <BasicRadar />
      </PreviewPanel>

      <SourceCodeViewer
        source={RADAR_SCAN_SOURCE}
        filename="components/ui/RadarScan/BasicRadar.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all radar scan variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Basic Radar" description="Simple radar with concentric circles and spinning beam." code={BASIC_RADAR_EXAMPLE}>
          <BasicRadar />
        </ExampleBlock>
        <ExampleBlock title="With Targets" description="Radar with color-coded pulsing target indicators." code={WITH_TARGETS_EXAMPLE}>
          <WithTargets />
        </ExampleBlock>
        <ExampleBlock title="Scan Grid" description="Grid-based scan display with active cell highlighting." code={SCAN_GRID_EXAMPLE}>
          <ScanGrid />
        </ExampleBlock>
        <ExampleBlock title="Animated Radar" description="Controllable radar with play/pause and multiple targets." code={ANIMATED_RADAR_EXAMPLE}>
          <AnimatedRadar />
        </ExampleBlock>
        <ExampleBlock title="Detection List" description="Radar with companion detection list showing target details." code={DETECTION_LIST_EXAMPLE}>
          <DetectionList />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
