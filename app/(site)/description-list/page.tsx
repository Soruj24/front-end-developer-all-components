"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { DESCRIPTION_LIST_SOURCE, DEFAULT_EXAMPLE, CARD_EXAMPLE, INLINE_EXAMPLE, STACKED_EXAMPLE, HIGHLIGHTED_EXAMPLE } from "./description-list-source";
import { DefaultListDemo, CardListDemo, InlineListDemo, StackedListDemo, HighlightedListDemo, HeaderFooterDemo } from "./description-list-demos";

export default function DescriptionListPage() {
  return (
    <ComponentDocPage
      name="Description List"
      category="Data Display"
      description="A semantic description list component for defining terms and their descriptions with optional icons, multiple layout variants, and header/footer support."
    >
      <PreviewPanel filename="description-list.tsx">
        <DefaultListDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={DESCRIPTION_LIST_SOURCE}
        filename="components/ui/DescriptionList/DescriptionList.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Examples</h2>

        <ExampleBlock
          title="Card Variant"
          description="Bordered card with divided items."
          code={CARD_EXAMPLE}
          filename="card-list.tsx"
        >
          <CardListDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Inline Variant"
          description="Side-by-side layout for compact key-value display."
          code={INLINE_EXAMPLE}
          filename="inline-list.tsx"
        >
          <InlineListDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Stacked Variant"
          description="Uppercase labels with generous spacing for technical specs."
          code={STACKED_EXAMPLE}
          filename="stacked-list.tsx"
        >
          <StackedListDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Highlighted Items"
          description="Emphasize specific rows with a highlight background."
          code={HIGHLIGHTED_EXAMPLE}
          filename="highlighted.tsx"
        >
          <HighlightedListDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Header & Footer"
          description="Wrap the list with a header and footer section."
          code={`<DescriptionList variant="card" items={items} header={...} footer={...} />`}
          filename="header-footer.tsx"
        >
          <HeaderFooterDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
