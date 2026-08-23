"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ZONE_CARD_SOURCE } from "./zone-card-source";
import {
  BASIC_CARD_EXAMPLE,
  CARD_STATUSES_EXAMPLE,
  CARD_WITH_ACTIONS_EXAMPLE,
  CARD_COMPACT_EXAMPLE,
  CARD_WITH_PROGRESS_EXAMPLE,
  CARD_GRID_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./zone-card-examples";
import {
  BasicCard,
  CardStatuses,
  CardWithActions,
  CardCompact,
  CardWithProgress,
  CardGrid,
  PlaygroundDemo,
} from "./demos";

export default function ZoneCardPage() {
  return (
    <ComponentDocPage
      name="Zone Card"
      category="Data Display"
      description="A zone card component for displaying zone information with status, metrics, and interactive actions."
    >
      <PreviewPanel filename="basic-card.tsx">
        <BasicCard />
      </PreviewPanel>

      <SourceCodeViewer
        source={ZONE_CARD_SOURCE}
        filename="components/ui/ZoneCard/BasicCard.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all zone card variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Basic Card" description="Default zone card with name, region, status badge, and 3-column metrics." code={BASIC_CARD_EXAMPLE}>
          <BasicCard />
        </ExampleBlock>
        <ExampleBlock title="Card Statuses" description="Multiple zones with different status indicators in a list layout." code={CARD_STATUSES_EXAMPLE}>
          <CardStatuses />
        </ExampleBlock>
        <ExampleBlock title="With Actions" description="Zone card with configure and view logs action buttons." code={CARD_WITH_ACTIONS_EXAMPLE}>
          <CardWithActions />
        </ExampleBlock>
        <ExampleBlock title="Compact" description="Minimal inline zone cards for dense layouts." code={CARD_COMPACT_EXAMPLE}>
          <CardCompact />
        </ExampleBlock>
        <ExampleBlock title="With Progress" description="Zone card with interactive usage progress bar." code={CARD_WITH_PROGRESS_EXAMPLE}>
          <CardWithProgress />
        </ExampleBlock>
        <ExampleBlock title="Card Grid" description="2x2 grid of mini zone cards with colored top borders." code={CARD_GRID_EXAMPLE}>
          <CardGrid />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
