"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { SHIRT_WEAR_SOURCE } from "./shirt-wear-source";
import {
  PRODUCT_CARD_EXAMPLE,
  SIZE_SELECTOR_EXAMPLE,
  COLOR_OPTIONS_EXAMPLE,
  PRODUCT_DETAIL_EXAMPLE,
  OUT_OF_STOCK_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./shirt-wear-examples";
import {
  ProductCard,
  SizeSelector,
  ColorOptions,
  ProductDetail,
  OutOfStock,
  PlaygroundDemo,
} from "./demos";

export default function ShirtWearPage() {
  return (
    <ComponentDocPage
      name="Shirt Wear"
      category="Data Display"
      description="A clothing item display component for showing apparel products with size options, colors, and product information."
    >
      <PreviewPanel filename="shirt-wear.tsx">
        <ProductCard />
      </PreviewPanel>

      <SourceCodeViewer
        source={SHIRT_WEAR_SOURCE}
        filename="components/ui/ShirtWear/ProductCard.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all shirt wear variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Product Card" description="Minimal product card with icon, name, and price." code={PRODUCT_CARD_EXAMPLE}>
          <ProductCard />
        </ExampleBlock>
        <ExampleBlock title="Size Selector" description="Interactive size buttons with active selection state." code={SIZE_SELECTOR_EXAMPLE}>
          <SizeSelector />
        </ExampleBlock>
        <ExampleBlock title="Color Options" description="Color swatches with check indicator and ring focus." code={COLOR_OPTIONS_EXAMPLE}>
          <ColorOptions />
        </ExampleBlock>
        <ExampleBlock title="Product Detail" description="Full product view with image, sizes, colors, and add-to-cart." code={PRODUCT_DETAIL_EXAMPLE}>
          <ProductDetail />
        </ExampleBlock>
        <ExampleBlock title="Out of Stock" description="Disabled product state with strikethrough price and sold-out badge." code={OUT_OF_STOCK_EXAMPLE}>
          <OutOfStock />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
