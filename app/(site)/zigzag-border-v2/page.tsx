"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ZIGZAG_BORDER_V2_SOURCE } from "./zigzag-border-v2-source";
import {
  BASIC_ZIGZAG_EXAMPLE,
  ZIGZAG_POSITIONS_EXAMPLE,
  ZIGZAG_COLORS_EXAMPLE,
  ZIGZAG_SIZES_EXAMPLE,
  ZIGZAG_INTERACTIVE_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./zigzag-border-v2-examples";
import {
  BasicZigzag,
  ZigzagPositions,
  ZigzagColors,
  ZigzagSizes,
  ZigzagInteractive,
  PlaygroundDemo,
} from "./demos";

export default function ZigzagBorderV2Page() {
  return (
    <ComponentDocPage
      name="Zigzag Border V2"
      category="Visual"
      description="An advanced zigzag border component with CSS mask support for applying zigzag edges on all four sides of any element."
    >
      <PreviewPanel filename="basic-zigzag.tsx">
        <BasicZigzag />
      </PreviewPanel>

      <SourceCodeViewer
        source={ZIGZAG_BORDER_V2_SOURCE}
        filename="components/ui/ZigzagBorderV2/BasicZigzag.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all zigzag border variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Basic Zigzag" description="Default zigzag top border with gradient fill." code={BASIC_ZIGZAG_EXAMPLE}>
          <BasicZigzag />
        </ExampleBlock>
        <ExampleBlock title="Positions" description="Top, bottom, left, and right zigzag edge positions." code={ZIGZAG_POSITIONS_EXAMPLE}>
          <ZigzagPositions />
        </ExampleBlock>
        <ExampleBlock title="Colors" description="Zinc, blue, violet, and emerald color options." code={ZIGZAG_COLORS_EXAMPLE}>
          <ZigzagColors />
        </ExampleBlock>
        <ExampleBlock title="Sizes" description="Adjustable zigzag heights from 4px to 16px." code={ZIGZAG_SIZES_EXAMPLE}>
          <ZigzagSizes />
        </ExampleBlock>
        <ExampleBlock title="Interactive" description="Real-time height control with range slider." code={ZIGZAG_INTERACTIVE_EXAMPLE}>
          <ZigzagInteractive />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
