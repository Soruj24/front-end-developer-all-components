"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ZIP_CARD_SOURCE } from "./zip-card-source";
import {
  BASIC_CARD_EXAMPLE,
  CARD_VARIANTS_EXAMPLE,
  CARD_WITH_PROGRESS_EXAMPLE,
  CARD_COMPACT_EXAMPLE,
  CARD_WITH_PASSWORD_EXAMPLE,
  CARD_LIST_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./zip-card-examples";
import {
  BasicCard,
  CardVariants,
  CardWithProgress,
  CardCompact,
  CardWithPassword,
  CardList,
  PlaygroundDemo,
} from "./demos";

export default function ZipCardPage() {
  return (
    <ComponentDocPage
      name="Zip Card"
      category="Data Display"
      description="A zip card component for displaying zip file information including name, size, file count, and download options."
    >
      <PreviewPanel filename="basic-card.tsx">
        <BasicCard />
      </PreviewPanel>

      <SourceCodeViewer
        source={ZIP_CARD_SOURCE}
        filename="components/ui/ZipCard/BasicCard.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all zip card variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Basic Card" description="Default zip card with icon, name, file count, and size." code={BASIC_CARD_EXAMPLE}>
          <BasicCard />
        </ExampleBlock>
        <ExampleBlock title="Card Variants" description="Different color-coded zip cards in a list." code={CARD_VARIANTS_EXAMPLE}>
          <CardVariants />
        </ExampleBlock>
        <ExampleBlock title="With Progress" description="Download progress bar with pause/resume controls." code={CARD_WITH_PROGRESS_EXAMPLE}>
          <CardWithProgress />
        </ExampleBlock>
        <ExampleBlock title="Compact" description="Minimal inline zip entries for dense layouts." code={CARD_COMPACT_EXAMPLE}>
          <CardCompact />
        </ExampleBlock>
        <ExampleBlock title="With Password" description="Password-protected zip with lock toggle." code={CARD_WITH_PASSWORD_EXAMPLE}>
          <CardWithPassword />
        </ExampleBlock>
        <ExampleBlock title="Zip List" description="Compact list of multiple zip files with download buttons." code={CARD_LIST_EXAMPLE}>
          <CardList />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
