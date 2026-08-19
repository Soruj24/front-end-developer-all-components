"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import {
  CUBE3D_SOURCE,
  INTERACTIVE_EXAMPLE,
  PRODUCT_EXAMPLE,
  LOADING_EXAMPLE,
  DICE_EXAMPLE,
  RUBIK_EXAMPLE,
  GALLERY_EXAMPLE,
} from "./cube-3d-source";
import {
  AutoRotatingCubeDemo,
  InteractiveCubeDemo,
  ProductShowcaseDemo,
  LoadingSpinnerDemo,
  DiceRollerDemo,
  RubiksCubeDemo,
  CubeGalleryDemo,
} from "./cube-3d-demos";

export default function Cube3DPage() {
  return (
    <ComponentDocPage
      name="3D Cube"
      category="Animation"
      description="CSS 3D cube with auto-rotation, interactive drag control, and gradient face variants for spatial UI effects."
    >
      <PreviewPanel filename="cube-3d.tsx">
        <AutoRotatingCubeDemo />
      </PreviewPanel>

      <SourceCodeViewer source={CUBE3D_SOURCE} filename="components/ui/Cube3D/Cube3D.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Interactive Cube" description="Drag to rotate the cube in any direction." code={INTERACTIVE_EXAMPLE}>
          <InteractiveCubeDemo />
        </ExampleBlock>

        <ExampleBlock title="Product Showcase" description="3D cube as a product card visual with pricing info." code={PRODUCT_EXAMPLE}>
          <ProductShowcaseDemo />
        </ExampleBlock>

        <ExampleBlock title="Loading Spinner" description="Rotating cubes as animated loading indicators." code={LOADING_EXAMPLE}>
          <LoadingSpinnerDemo />
        </ExampleBlock>

        <ExampleBlock title="Dice Roller" description="Click to roll a dice with spinning animation." code={DICE_EXAMPLE}>
          <DiceRollerDemo />
        </ExampleBlock>

        <ExampleBlock title="Rubik's Cube" description="3x3 grid puzzle cube with drag rotation." code={RUBIK_EXAMPLE}>
          <RubiksCubeDemo />
        </ExampleBlock>

        <ExampleBlock title="Cube Gallery" description="Multiple color variants with hover effects." code={GALLERY_EXAMPLE}>
          <CubeGalleryDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}