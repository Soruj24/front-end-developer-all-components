"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ZONE_SELECT_SOURCE } from "./zone-select-source";
import {
  BASIC_SELECT_EXAMPLE,
  SELECT_WITH_ICONS_EXAMPLE,
  SELECT_COMPACT_EXAMPLE,
  SELECT_WITH_ACTIONS_EXAMPLE,
  SELECT_WITH_DESCRIPTION_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./zone-select-examples";
import {
  BasicSelect,
  SelectWithIcons,
  SelectCompact,
  SelectWithActions,
  SelectWithDescription,
  PlaygroundDemo,
} from "./demos";

export default function ZoneSelectPage() {
  return (
    <ComponentDocPage
      name="Zone Select"
      category="Forms"
      description="A zone select component for selecting multiple zones or regions with checkbox-based multi-select functionality."
    >
      <PreviewPanel filename="basic-select.tsx">
        <BasicSelect />
      </PreviewPanel>

      <SourceCodeViewer
        source={ZONE_SELECT_SOURCE}
        filename="components/ui/ZoneSelect/BasicSelect.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all zone select variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Basic Select" description="Four zones with blue checkbox styling and selection count." code={BASIC_SELECT_EXAMPLE}>
          <BasicSelect />
        </ExampleBlock>
        <ExampleBlock title="With Icons" description="Zone checkboxes with contextual icons and emerald accent." code={SELECT_WITH_ICONS_EXAMPLE}>
          <SelectWithIcons />
        </ExampleBlock>
        <ExampleBlock title="Compact" description="Inline toggle buttons for quick zone selection." code={SELECT_COMPACT_EXAMPLE}>
          <SelectCompact />
        </ExampleBlock>
        <ExampleBlock title="With Actions" description="Select All / Clear buttons with amber accent." code={SELECT_WITH_ACTIONS_EXAMPLE}>
          <SelectWithActions />
        </ExampleBlock>
        <ExampleBlock title="With Description" description="Zone checkboxes with description text and violet accent." code={SELECT_WITH_DESCRIPTION_EXAMPLE}>
          <SelectWithDescription />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
