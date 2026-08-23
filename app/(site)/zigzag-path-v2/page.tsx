"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ZIGZAG_PATH_V2_SOURCE } from "./zigzag-path-v2-source";
import {
  BASIC_ZIGZAG_EXAMPLE,
  ZIGZAG_VARIANTS_EXAMPLE,
  ZIGZAG_AMPLITUDES_EXAMPLE,
  ZIGZAG_COLORS_EXAMPLE,
  ZIGZAG_INTERACTIVE_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./zigzag-path-v2-examples";
import {
  BasicZigzag,
  ZigzagVariants,
  ZigzagAmplitudes,
  ZigzagColors,
  ZigzagInteractive,
  PlaygroundDemo,
} from "./demos";

export default function ZigzagPathV2Page() {
  return (
    <ComponentDocPage
      name="Zigzag Path V2"
      category="Visual"
      description="An enhanced zigzag path component with SVG path animations, customizable amplitudes, and gradient stroke support."
    >
      <PreviewPanel filename="basic-zigzag.tsx">
        <BasicZigzag />
      </PreviewPanel>

      <SourceCodeViewer
        source={ZIGZAG_PATH_V2_SOURCE}
        filename="components/ui/ZigzagPathV2/BasicZigzag.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all zigzag path variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Basic Zigzag" description="Default zigzag path with gradient stroke." code={BASIC_ZIGZAG_EXAMPLE}>
          <BasicZigzag />
        </ExampleBlock>
        <ExampleBlock title="Variants" description="Solid, dashed, and dotted stroke styles." code={ZIGZAG_VARIANTS_EXAMPLE}>
          <ZigzagVariants />
        </ExampleBlock>
        <ExampleBlock title="Amplitudes" description="Different zigzag heights from 4px to 20px." code={ZIGZAG_AMPLITUDES_EXAMPLE}>
          <ZigzagAmplitudes />
        </ExampleBlock>
        <ExampleBlock title="Colors" description="Zinc, blue, violet, emerald, and rose color options." code={ZIGZAG_COLORS_EXAMPLE}>
          <ZigzagColors />
        </ExampleBlock>
        <ExampleBlock title="Interactive" description="Real-time control of segments and amplitude." code={ZIGZAG_INTERACTIVE_EXAMPLE}>
          <ZigzagInteractive />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
