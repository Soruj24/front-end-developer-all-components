"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { STACK_SOURCE } from "./stack-source";
import { VerticalDemo, HorizontalDemo, DividerDemo, FillDemo, NestedDemo, SpacingDemo, WrapDemo, AlignDemo } from "./stack-demos";

export default function StackLayoutPage() {
  return (
    <ComponentDocPage
      name="Stack Layout"
      category="Layout"
      description="Flexible vertical and horizontal stacking primitives with consistent spacing. Build complex layouts by composing Stack and Inline components with separators, alignment, and wrapping."
    >
      <PreviewPanel filename="stack.tsx">
        <VerticalDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={STACK_SOURCE}
        filename="components/ui/Stack/Stack.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Examples</h2>

        <ExampleBlock
          title="Horizontal Stack"
          description="Stack items horizontally with consistent spacing."
          code={'<Stack direction="horizontal" gap={3}>\n  <div>Left</div>\n  <div>Center</div>\n  <div>Right</div>\n</Stack>'}
        >
          <HorizontalDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Stack with Dividers"
          description="Vertical stack with separator lines between items using the separator prop."
          code={'<Stack direction="vertical" gap={0} separator={<div className="h-px bg-border" />}>\n  <div>Profile</div>\n  <div>Notifications</div>\n  <div>Security</div>\n</Stack>'}
        >
          <DividerDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Fill"
          description="Mix fixed and flexible sizing within a horizontal stack."
          code={'<Stack direction="horizontal" gap={2}>\n  <div className="flex-1">Auto</div>\n  <div className="w-32">Fixed</div>\n  <div className="flex-1">Auto</div>\n</Stack>'}
        >
          <FillDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Alignment"
          description="Align items with different heights using align and justify props."
          code={'<Stack direction="horizontal" gap={3} align="center" justify="between">\n  <div>Start</div>\n  <div>Center</div>\n  <div>End</div>\n</Stack>'}
        >
          <AlignDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Nested Stacks"
          description="Combine vertical and horizontal stacks for complex layouts."
          code={'<Stack direction="vertical" gap={4}>\n  <Stack direction="horizontal" gap={3} align="center">\n    <Avatar />\n    <Stack direction="vertical" gap={0}>\n      <span>User Name</span>\n      <span>user@email.com</span>\n    </Stack>\n  </Stack>\n</Stack>'}
        >
          <NestedDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Inline Wrap"
          description="Inline component wraps items to the next line when space runs out."
          code={'<Inline gap={2} wrap>\n  <span>Tag 1</span>\n  <span>Tag 2</span>\n  <span>Tag 3</span>\n</Inline>'}
        >
          <WrapDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Spacing Variants"
          description="Adjustable gap sizes for different density needs."
          code={'<Stack direction="vertical" gap={1}>...</Stack>\n<Stack direction="vertical" gap={4}>...</Stack>\n<Stack direction="vertical" gap={8}>...</Stack>'}
        >
          <SpacingDemo />
        </ExampleBlock>
      </div>


    </ComponentDocPage>
  );
}
