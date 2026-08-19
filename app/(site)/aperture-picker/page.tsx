"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import {
  APERTURE_PICKER_SOURCE,
  WHEEL_EXAMPLE,
  SLIDER_EXAMPLE,
  GRID_EXAMPLE,
  DOF_EXAMPLE,
  PANEL_EXAMPLE,
  COMPACT_EXAMPLE,
  EXPOSURE_EXAMPLE,
} from "./aperture-picker-source";
import {
  WheelPickerDemo,
  SliderPickerDemo,
  GridPickerDemo,
  DepthOfFieldPreviewDemo,
  CameraSettingsPanelDemo,
  CompactInlineDemo,
  ExposureInfoDemo,
} from "./aperture-picker-demos";

export default function AperturePickerPage() {
  return (
    <ComponentDocPage
      name="Aperture Picker"
      category="Forms"
      description="Interactive aperture selection widget with wheel, slider, and grid modes for camera settings interfaces."
    >
      <PreviewPanel filename="aperture-picker.tsx">
        <WheelPickerDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={APERTURE_PICKER_SOURCE}
        filename="components/ui/AperturePicker/AperturePicker.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Wheel Picker" description="Circular dial with indicator needle, ideal for camera viewfinder overlays." code={WHEEL_EXAMPLE}>
          <WheelPickerDemo />
        </ExampleBlock>

        <ExampleBlock title="Slider Picker" description="Range slider with labeled stops and depth of field feedback card." code={SLIDER_EXAMPLE}>
          <SliderPickerDemo />
        </ExampleBlock>

        <ExampleBlock title="Grid Selector" description="Card grid with visual aperture circles that scale with f-stop value." code={GRID_EXAMPLE}>
          <GridPickerDemo />
        </ExampleBlock>

        <ExampleBlock title="Depth of Field Preview" description="Visual preview showing real-time blur effect with exposure stats." code={DOF_EXAMPLE}>
          <DepthOfFieldPreviewDemo />
        </ExampleBlock>

        <ExampleBlock title="Camera Settings Panel" description="Complete camera settings UI combining aperture, shutter speed, and ISO controls." code={PANEL_EXAMPLE}>
          <CameraSettingsPanelDemo />
        </ExampleBlock>

        <ExampleBlock title="Compact Inline" description="Minimal inline picker with increment/decrement buttons for tight layouts." code={COMPACT_EXAMPLE}>
          <CompactInlineDemo />
        </ExampleBlock>

        <ExampleBlock title="With Exposure Info" description="Aperture picker with exposure meter, compensation value, and DoF indicator." code={EXPOSURE_EXAMPLE}>
          <ExposureInfoDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}