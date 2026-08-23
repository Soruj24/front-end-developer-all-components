"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ZIGZAG_DIVIDER_V2_SOURCE } from "./zigzag-divider-v2-source";
import {
  BASIC_ZIGZAG_EXAMPLE,
  ZIGZAG_BOTTOM_EXAMPLE,
  DOUBLE_ZIGZAG_EXAMPLE,
  COLOR_ZIGZAG_EXAMPLE,
  ANIMATED_ZIGZAG_EXAMPLE,
  ZIGZAG_SECTION_EXAMPLE,
  ZIGZAG_SIZES_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./zigzag-divider-v2-examples";
import {
  BasicZigzag,
  ZigzagBottom,
  DoubleZigzag,
  ColorZigzag,
  AnimatedZigzag,
  ZigzagSection,
  ZigzagSizes,
  PlaygroundDemo,
} from "./demos";

export default function ZigzagDividerV2Page() {
  return (
    <ComponentDocPage
      name="Zigzag Divider V2"
      category="Visual"
      description="Enhanced zigzag dividers with configurable sharpness, thickness, color, and animation for advanced visual separation."
    >
      <PreviewPanel filename="basic-zigzag.tsx">
        <BasicZigzag />
      </PreviewPanel>

      <SourceCodeViewer
        source={ZIGZAG_DIVIDER_V2_SOURCE}
        filename="components/ui/ZigzagDividerV2/BasicZigzag.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all zigzag divider variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Basic Zigzag" description="Default top zigzag divider with subtle fill." code={BASIC_ZIGZAG_EXAMPLE}>
          <BasicZigzag />
        </ExampleBlock>
        <ExampleBlock title="Zigzag Bottom" description="Zigzag divider positioned at the bottom of content." code={ZIGZAG_BOTTOM_EXAMPLE}>
          <ZigzagBottom />
        </ExampleBlock>
        <ExampleBlock title="Double Zigzag" description="Mirrored double zigzag pattern for emphasis." code={DOUBLE_ZIGZAG_EXAMPLE}>
          <DoubleZigzag />
        </ExampleBlock>
        <ExampleBlock title="Color Zigzag" description="Rainbow-colored zigzag with 7 vibrant hues." code={COLOR_ZIGZAG_EXAMPLE}>
          <ColorZigzag />
        </ExampleBlock>
        <ExampleBlock title="Animated Zigzag" description="Interactive slide animation with toggle control." code={ANIMATED_ZIGZAG_EXAMPLE}>
          <AnimatedZigzag />
        </ExampleBlock>
        <ExampleBlock title="Zigzag Section" description="Zigzag as separator between section header and body." code={ZIGZAG_SECTION_EXAMPLE}>
          <ZigzagSection />
        </ExampleBlock>
        <ExampleBlock title="Zigzag Sizes" description="Adjustable zigzag height from 8px to 32px." code={ZIGZAG_SIZES_EXAMPLE}>
          <ZigzagSizes />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
