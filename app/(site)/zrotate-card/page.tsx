"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ZROTATE_CARD_SOURCE } from "./zrotate-card-source";
import {
  BASIC_ROTATE_EXAMPLE,
  ROTATE_ANGLES_EXAMPLE,
  ROTATE_DIRECTIONS_EXAMPLE,
  ROTATE_WITH_SCALE_EXAMPLE,
  ROTATE_ON_CLICK_EXAMPLE,
  ROTATE_CARD_VARIANTS_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./zrotate-card-examples";
import {
  BasicRotate,
  RotateAngles,
  RotateDirections,
  RotateWithScale,
  RotateOnClick,
  RotateCardVariants,
  PlaygroundDemo,
} from "./demos";

export default function ZrotateCardPage() {
  return (
    <ComponentDocPage
      name="Z-rotate Card"
      category="Animation"
      description="A Z-rotate card component that applies 3D rotation transforms on the Z axis when hovered or clicked."
    >
      <PreviewPanel filename="basic-rotate.tsx">
        <BasicRotate />
      </PreviewPanel>

      <SourceCodeViewer
        source={ZROTATE_CARD_SOURCE}
        filename="components/ui/ZRotateCard/BasicRotate.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all Z-rotate card variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Basic Rotate" description="Default hover-to-rotate with scale and shadow effects." code={BASIC_ROTATE_EXAMPLE}>
          <BasicRotate />
        </ExampleBlock>
        <ExampleBlock title="Rotate Angles" description="3°, 6°, 12°, and 45° rotation angles." code={ROTATE_ANGLES_EXAMPLE}>
          <RotateAngles />
        </ExampleBlock>
        <ExampleBlock title="Rotate Directions" description="Clockwise and counter-clockwise rotation directions." code={ROTATE_DIRECTIONS_EXAMPLE}>
          <RotateDirections />
        </ExampleBlock>
        <ExampleBlock title="With Scale" description="Combined rotation and scale transform with profile card." code={ROTATE_WITH_SCALE_EXAMPLE}>
          <RotateWithScale />
        </ExampleBlock>
        <ExampleBlock title="Click to Rotate" description="Click-based rotation with 90° increments and reset." code={ROTATE_ON_CLICK_EXAMPLE}>
          <RotateOnClick />
        </ExampleBlock>
        <ExampleBlock title="Card Variants" description="Blue, violet, emerald, and amber colored cards." code={ROTATE_CARD_VARIANTS_EXAMPLE}>
          <RotateCardVariants />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
