"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { QUICKNAV_SOURCE, DEFAULT_EXAMPLE, COMPACT_EXAMPLE, FLAT_EXAMPLE } from "./quick-nav-source";
import { DefaultDemo, CompactDemo, FlatDemo, ActionsDemo } from "./quick-nav-demos";

export default function QuickNavPage() {
  return (
    <ComponentDocPage
      name="Quick Nav"
      category="Navigation"
      description="A keyboard-driven command palette for fast navigation. Search commands, jump to pages, and execute actions without leaving the keyboard."
    >
      <PreviewPanel filename="quick-nav.tsx">
        <div className="w-full max-w-md">
          <DefaultDemo />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={QUICKNAV_SOURCE}
        filename="components/ui/QuickNav/QuickNav.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Examples</h2>

        <ExampleBlock
          title="Compact"
          description="Tighter spacing for smaller popovers."
          code={COMPACT_EXAMPLE}
          filename="compact.tsx"
        >
          <div className="w-full max-w-md">
            <CompactDemo />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Flat List"
          description="All items in a single list without section headers."
          code={FLAT_EXAMPLE}
          filename="flat.tsx"
        >
          <div className="w-full max-w-md">
            <FlatDemo />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="With Custom Footer"
          description="Command palette with a custom footer element."
          code={`<QuickNav open={open} onClose={close} items={items} footer={<span>Custom footer</span>} />`}
          filename="custom-footer.tsx"
        >
          <div className="w-full max-w-md">
            <ActionsDemo />
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
