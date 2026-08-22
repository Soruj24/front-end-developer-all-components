"use client";

import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import {
  MODAL_SOURCE,
  BASIC_EXAMPLE,
  SIZES_EXAMPLE,
  WITHOUT_TITLE_EXAMPLE,
  FULLSCREEN_EXAMPLE,
  SCROLLABLE_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./modal-source";
import {
  LivePreviewDemo,
  BasicDemo,
  SizesDemo,
  WithoutTitleDemo,
  FullscreenDemo,
  ScrollableDemo,
  PlaygroundDemo,
} from "./modal-demos";

export default function ModalPage() {
  return (
    <ComponentDocPage
      name="Modal"
      category="Overlays"
      description="A premium dialog overlay with a blurred theme-aware backdrop, hairline border, soft modal shadow, and smooth enter/exit motion. Supports size variants, scrollable bodies, focus trapping, and Escape dismissal."
    >
      <PreviewPanel filename="Modal.tsx">
        <LivePreviewDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={MODAL_SOURCE}
        filename="components/ui/Modal.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Examples</h2>

        <ExampleBlock title="Basic" description="A standard modal with title and close button." code={BASIC_EXAMPLE}>
          <BasicDemo />
        </ExampleBlock>

        <ExampleBlock title="Sizes" description="Four width variants: sm, md, lg, xl, and fullscreen." code={SIZES_EXAMPLE}>
          <SizesDemo />
        </ExampleBlock>

        <ExampleBlock title="Without Title" description="A modal without a title shows an absolute close button." code={WITHOUT_TITLE_EXAMPLE}>
          <WithoutTitleDemo />
        </ExampleBlock>

        <ExampleBlock title="Fullscreen" description="Full viewport modal for complex content layouts." code={FULLSCREEN_EXAMPLE}>
          <FullscreenDemo />
        </ExampleBlock>

        <ExampleBlock title="Scrollable Content" description="Long bodies scroll inside the panel while the header stays fixed." code={SCROLLABLE_EXAMPLE}>
          <ScrollableDemo />
        </ExampleBlock>

        <ExampleBlock title="Playground" description="Compose size, title, and footer actions live." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
