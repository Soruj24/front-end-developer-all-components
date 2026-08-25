"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { RATING_SOURCE, DEFAULT_EXAMPLE, SIZES_EXAMPLE, COLORS_EXAMPLE, READONLY_EXAMPLE } from "./rating-source";
import { DefaultDemo, SizesDemo, ColorsDemo, ReadonlyDemo, ReviewCardDemo } from "./rating-demos";

export default function RatingInputPage() {
  return (
    <ComponentDocPage
      name="Rating Input"
      category="Form"
      description="An interactive star rating component with hover preview, multiple icons, colors, sizes, and read-only mode. Supports keyboard navigation and half-star precision."
    >
      <PreviewPanel filename="rating.tsx">
        <DefaultDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={RATING_SOURCE}
        filename="components/ui/Rating/Rating.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Examples</h2>

        <ExampleBlock
          title="Sizes"
          description="Small, medium, and large rating inputs."
          code={SIZES_EXAMPLE}
          filename="sizes.tsx"
        >
          <SizesDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Colors"
          description="Five color themes: amber, yellow, emerald, rose, and primary."
          code={COLORS_EXAMPLE}
          filename="colors.tsx"
        >
          <ColorsDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Read Only"
          description="Display-only rating that cannot be changed."
          code={READONLY_EXAMPLE}
          filename="readonly.tsx"
        >
          <ReadonlyDemo />
        </ExampleBlock>

        <ExampleBlock
          title="In Context"
          description="Rating input used in a review card with textarea and submit button."
          code={`<Rating value={rating} onChange={setRating} />`}
          filename="review-card.tsx"
        >
          <ReviewCardDemo />
        </ExampleBlock>
      </div>


    </ComponentDocPage>
  );
}
