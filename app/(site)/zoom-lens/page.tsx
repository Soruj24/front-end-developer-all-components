"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ZOOM_LENS_SOURCE } from "./zoom-lens-source";
import {
  BASIC_LENS_EXAMPLE,
  LENS_SIZES_EXAMPLE,
  LENS_SHAPES_EXAMPLE,
  LENS_WITH_GRID_EXAMPLE,
  LENS_WITH_ZOOM_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./zoom-lens-examples";
import {
  BasicLens,
  LensSizes,
  LensShapes,
  LensWithGrid,
  LensWithZoom,
  PlaygroundDemo,
} from "./demos";

export default function ZoomLensPage() {
  return (
    <ComponentDocPage
      name="Zoom Lens"
      category="Input"
      description="A zoom lens component that magnifies content on hover, providing a detailed view of specific areas."
    >
      <PreviewPanel filename="basic-lens.tsx">
        <BasicLens />
      </PreviewPanel>

      <SourceCodeViewer
        source={ZOOM_LENS_SOURCE}
        filename="components/ui/ZoomLens/BasicLens.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all zoom lens variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Basic Lens" description="Circle lens that follows the cursor with 2x magnification." code={BASIC_LENS_EXAMPLE}>
          <BasicLens />
        </ExampleBlock>
        <ExampleBlock title="Lens Sizes" description="Three lens sizes: small (96px), medium (128px), large (160px)." code={LENS_SIZES_EXAMPLE}>
          <LensSizes />
        </ExampleBlock>
        <ExampleBlock title="Lens Shapes" description="Four lens shapes: circle, rounded, square, sharp." code={LENS_SHAPES_EXAMPLE}>
          <LensShapes />
        </ExampleBlock>
        <ExampleBlock title="With Grid" description="Toggle crosshair grid overlay on the lens." code={LENS_WITH_GRID_EXAMPLE}>
          <LensWithGrid />
        </ExampleBlock>
        <ExampleBlock title="With Zoom" description="Adjustable zoom level from 1.5x to 4x." code={LENS_WITH_ZOOM_EXAMPLE}>
          <LensWithZoom />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
