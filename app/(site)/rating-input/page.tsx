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

      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border border-border/60">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">value</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">onChange</td>
                <td className="px-4 py-3 text-muted-foreground">(value: number) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">max</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">5</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">"sm" | "md" | "lg"</td>
                <td className="px-4 py-3 text-muted-foreground">"md"</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">color</td>
                <td className="px-4 py-3 text-muted-foreground">"amber" | "yellow" | "emerald" | "rose" | "primary"</td>
                <td className="px-4 py-3 text-muted-foreground">"amber"</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b border-border/60">
                <td className="px-4 py-3 font-mono text-xs">disabled</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ComponentDocPage>
  );
}
