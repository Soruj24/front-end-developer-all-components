"use client";

import {
  CropBoxDemo,
  AspectRatioDemo,
  CropControlsDemo,
  AvatarCropDemo,
  BannerCropDemo,
  PresetSizesDemo,
  BeforeAfterDemo,
} from "./crop-tool-demos";
import { CROP_TOOL_SOURCE } from "./crop-tool-source";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";

export default function CropToolPage() {
  return (
    <ComponentDocPage
      name="Crop Tool"
      category="Tools"
      description="Image cropping tool with resizable crop box, aspect ratio presets, rotation, zoom, and apply/cancel controls."
    >
      <PreviewPanel filename="crop-tool.tsx">
        <CropBoxDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={CROP_TOOL_SOURCE}
        filename="components/ui/CropTool/CropTool.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Crop Box" description="Interactive crop area with resize handles and rule-of-thirds grid." code={<CropBoxDemo />}>
          <CropBoxDemo />
        </ExampleBlock>

        <ExampleBlock title="Aspect Ratios" description="Preset aspect ratios with visual preview." code={<AspectRatioDemo />}>
          <AspectRatioDemo />
        </ExampleBlock>

        <ExampleBlock title="Rotation & Zoom" description="Image transformation controls with flip and reset." code={<CropControlsDemo />}>
          <CropControlsDemo />
        </ExampleBlock>

        <ExampleBlock title="Avatar Crop" description="Circular crop for profile pictures with size presets." code={<AvatarCropDemo />}>
          <AvatarCropDemo />
        </ExampleBlock>

        <ExampleBlock title="Banner Crop" description="Platform-specific banner crops (Twitter, LinkedIn, YouTube)." code={<BannerCropDemo />}>
          <BannerCropDemo />
        </ExampleBlock>

        <ExampleBlock title="Preset Sizes" description="Common output sizes for social media and web." code={<PresetSizesDemo />}>
          <PresetSizesDemo />
        </ExampleBlock>

        <ExampleBlock title="Before / After" description="Compare original and cropped images with slider." code={<BeforeAfterDemo />}>
          <BeforeAfterDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}