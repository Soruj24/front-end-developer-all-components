"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ZAXIS_FLIP_SOURCE } from "./zaxis-flip-source";
import {
  BASIC_FLIP_EXAMPLE,
  FLIP_DIRECTIONS_EXAMPLE,
  FLIP_SPEEDS_EXAMPLE,
  FLIP_CARD_SIZES_EXAMPLE,
  FLIP_WITH_CLICK_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./zaxis-flip-examples";
import {
  BasicFlip,
  FlipDirections,
  FlipSpeeds,
  FlipCardSizes,
  FlipWithClick,
  PlaygroundDemo,
} from "./demos";

export default function ZaxisFlipPage() {
  return (
    <ComponentDocPage
      name="Z-axis Flip"
      category="Animation"
      description="A Z-axis flip component that creates smooth 3D flip animations around the vertical axis for card reveals and transitions."
    >
      <PreviewPanel filename="basic-flip.tsx">
        <BasicFlip />
      </PreviewPanel>

      <SourceCodeViewer
        source={ZAXIS_FLIP_SOURCE}
        filename="components/ui/ZAxisFlip/BasicFlip.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all Z-axis flip variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Basic Flip" description="Default hover-to-flip with gradient front and solid back." code={BASIC_FLIP_EXAMPLE}>
          <BasicFlip />
        </ExampleBlock>
        <ExampleBlock title="Directions" description="Rotate on Y+, Y-, X+, and X- axes." code={FLIP_DIRECTIONS_EXAMPLE}>
          <FlipDirections />
        </ExampleBlock>
        <ExampleBlock title="Speeds" description="Fast (300ms), medium (500ms), slow (700ms), and very slow (1000ms) transitions." code={FLIP_SPEEDS_EXAMPLE}>
          <FlipSpeeds />
        </ExampleBlock>
        <ExampleBlock title="Card Sizes" description="Small, medium, large, and extra-large flip cards." code={FLIP_CARD_SIZES_EXAMPLE}>
          <FlipCardSizes />
        </ExampleBlock>
        <ExampleBlock title="Click to Flip" description="Toggle flip state on click with persistent state." code={FLIP_WITH_CLICK_EXAMPLE}>
          <FlipWithClick />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
