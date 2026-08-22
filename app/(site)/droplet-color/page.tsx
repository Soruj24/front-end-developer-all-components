"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { DROPLET_COLOR_SOURCE } from "./droplet-color-source";
import {
  PRESET_EXAMPLE,
  HSL_EXAMPLE,
  BRAND_EXAMPLE,
  THEME_EXAMPLE,
  GRADIENT_EXAMPLE,
  PALETTE_EXAMPLE,
  OPACITY_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./droplet-color-examples";
import {
  DropletPreviewDemo,
  PresetColorsDemo,
  HSLSlidersDemo,
  BrandColorPickerDemo,
  ThemeBuilderDemo,
  GradientMakerDemo,
  ColorPaletteDemo,
  OpacityControlDemo,
  PlaygroundDemo,
} from "./demos";

export default function DropletColorPage() {
  return (
    <ComponentDocPage
      name="Droplet Color"
      category="Input"
      description="A premium droplet-style color picker styled after shadcn/ui conventions — preset swatches with full keyboard navigation, an animated custom-color disclosure, semantic design tokens, and theme-aware dark mode."
    >
      <PreviewPanel filename="droplet-color.tsx">
        <DropletPreviewDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={DROPLET_COLOR_SOURCE}
        filename="components/ui/DropletColor/DropletColor.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock
          title="Preset Colors"
          description="Quick color selection from preset swatches with copy feedback."
          code={PRESET_EXAMPLE}
        >
          <PresetColorsDemo />
        </ExampleBlock>

        <ExampleBlock
          title="HSL Sliders"
          description="Hue, saturation, and lightness sliders rendered over live gradient tracks."
          code={HSL_EXAMPLE}
        >
          <HSLSlidersDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Brand Color Picker"
          description="Pick primary, secondary, and accent colors for a brand."
          code={BRAND_EXAMPLE}
        >
          <BrandColorPickerDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Theme Builder"
          description="Customize all theme colors with a live preview grid."
          code={THEME_EXAMPLE}
        >
          <ThemeBuilderDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Gradient Maker"
          description="Create gradients from picked colors with angle control."
          code={GRADIENT_EXAMPLE}
        >
          <GradientMakerDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Color Palette"
          description="Generate harmonious shades from a base color."
          code={PALETTE_EXAMPLE}
        >
          <ColorPaletteDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Opacity Control"
          description="Color with adjustable opacity and checkerboard preview."
          code={OPACITY_EXAMPLE}
        >
          <OpacityControlDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Playground"
          description="Drive the picker with controlled props, switch preset layouts, and read out HEX/RGB values."
          code={PLAYGROUND_EXAMPLE}
        >
          <PlaygroundDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
