"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ZONE_PANEL_SOURCE } from "./zone-panel-source";
import {
  BASIC_PANEL_EXAMPLE,
  PANEL_POSITIONS_EXAMPLE,
  PANEL_WIDTHS_EXAMPLE,
  PANEL_VARIANTS_EXAMPLE,
  PANEL_WITH_CONTENT_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./zone-panel-examples";
import {
  BasicPanel,
  PanelPositions,
  PanelWidths,
  PanelVariants,
  PanelWithContent,
  PlaygroundDemo,
} from "./demos";

export default function ZonePanelPage() {
  return (
    <ComponentDocPage
      name="Zone Panel"
      category="Layout"
      description="A zone panel component for creating collapsible side panels or drawers with customizable width and animation."
    >
      <PreviewPanel filename="basic-panel.tsx">
        <BasicPanel />
      </PreviewPanel>

      <SourceCodeViewer
        source={ZONE_PANEL_SOURCE}
        filename="components/ui/ZonePanel/BasicPanel.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all zone panel variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Basic Panel" description="Collapsible side panel with toggle button." code={BASIC_PANEL_EXAMPLE}>
          <BasicPanel />
        </ExampleBlock>
        <ExampleBlock title="Positions" description="Left and right panel positions." code={PANEL_POSITIONS_EXAMPLE}>
          <PanelPositions />
        </ExampleBlock>
        <ExampleBlock title="Widths" description="Adjustable panel width from 128px to 320px." code={PANEL_WIDTHS_EXAMPLE}>
          <PanelWidths />
        </ExampleBlock>
        <ExampleBlock title="Variants" description="Default, bordered, and inverted panel styles." code={PANEL_VARIANTS_EXAMPLE}>
          <PanelVariants />
        </ExampleBlock>
        <ExampleBlock title="With Content" description="Panel with nested content items." code={PANEL_WITH_CONTENT_EXAMPLE}>
          <PanelWithContent />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
