"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ZINDEX_DEMO_SOURCE } from "./zindex-demo-source";
import {
  BASIC_ZINDEX_EXAMPLE,
  ZINDEX_INTERACTIVE_EXAMPLE,
  ZINDEX_CONTEXTS_EXAMPLE,
  ZINDEX_VALUES_EXAMPLE,
  ZINDEX_STACKING_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./zindex-demo-examples";
import {
  BasicZindex,
  ZindexInteractive,
  ZindexContexts,
  ZindexValues,
  ZindexStacking,
  PlaygroundDemo,
} from "./demos";

export default function ZindexDemoPage() {
  return (
    <ComponentDocPage
      name="Z-index Demo"
      category="Layout"
      description="An interactive demo for understanding z-index stacking contexts and how different values affect element layering."
    >
      <PreviewPanel filename="basic-zindex.tsx">
        <BasicZindex />
      </PreviewPanel>

      <SourceCodeViewer
        source={ZINDEX_DEMO_SOURCE}
        filename="components/ui/ZindexDemo/BasicZindex.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all z-index demo variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Basic Z-index" description="Five overlapping layers with increasing z-index values." code={BASIC_ZINDEX_EXAMPLE}>
          <BasicZindex />
        </ExampleBlock>
        <ExampleBlock title="Interactive" description="Click a layer to bring it to the front." code={ZINDEX_INTERACTIVE_EXAMPLE}>
          <ZindexInteractive />
        </ExampleBlock>
        <ExampleBlock title="Stacking Contexts" description="Two isolated stacking contexts with independent z-index values." code={ZINDEX_CONTEXTS_EXAMPLE}>
          <ZindexContexts />
        </ExampleBlock>
        <ExampleBlock title="Z-index Values" description="Visual reference for common z-index values." code={ZINDEX_VALUES_EXAMPLE}>
          <ZindexValues />
        </ExampleBlock>
        <ExampleBlock title="Stacking Order" description="Click the buttons to select and highlight a specific layer." code={ZINDEX_STACKING_EXAMPLE}>
          <ZindexStacking />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
