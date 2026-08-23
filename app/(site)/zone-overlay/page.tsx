"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ZONE_OVERLAY_SOURCE } from "./zone-overlay-source";
import {
  BASIC_OVERLAY_EXAMPLE,
  OVERLAY_BACKDROP_EXAMPLE,
  OVERLAY_COLORS_EXAMPLE,
  OVERLAY_WITH_CONTENT_EXAMPLE,
  OVERLAY_TOGGLE_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./zone-overlay-examples";
import {
  BasicOverlay,
  OverlayBackdrop,
  OverlayColors,
  OverlayWithContent,
  OverlayToggle,
  PlaygroundDemo,
} from "./demos";

export default function ZoneOverlayPage() {
  return (
    <ComponentDocPage
      name="Zone Overlay"
      category="Visual"
      description="A zone overlay component for displaying content layers on top of other elements with customizable backdrop effects."
    >
      <PreviewPanel filename="basic-overlay.tsx">
        <BasicOverlay />
      </PreviewPanel>

      <SourceCodeViewer
        source={ZONE_OVERLAY_SOURCE}
        filename="components/ui/ZoneOverlay/BasicOverlay.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all zone overlay variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Basic Overlay" description="Hover to reveal overlay with backdrop blur." code={BASIC_OVERLAY_EXAMPLE}>
          <BasicOverlay />
        </ExampleBlock>
        <ExampleBlock title="Backdrop Variants" description="Four blur intensity levels: none, sm, md, lg." code={OVERLAY_BACKDROP_EXAMPLE}>
          <OverlayBackdrop />
        </ExampleBlock>
        <ExampleBlock title="Colors" description="Four overlay color options: dark, blue, purple, green." code={OVERLAY_COLORS_EXAMPLE}>
          <OverlayColors />
        </ExampleBlock>
        <ExampleBlock title="With Content" description="Upload card with overlay and icon." code={OVERLAY_WITH_CONTENT_EXAMPLE}>
          <OverlayWithContent />
        </ExampleBlock>
        <ExampleBlock title="Toggle" description="Button-controlled overlay with modal content." code={OVERLAY_TOGGLE_EXAMPLE}>
          <OverlayToggle />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
