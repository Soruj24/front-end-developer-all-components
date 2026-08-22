"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { APERTURE_PICKER_SOURCE } from "./aperture-picker-source";
import {
  WHEEL_EXAMPLE,
  SLIDER_EXAMPLE,
  GRID_EXAMPLE,
  DOF_EXAMPLE,
  PANEL_EXAMPLE,
  COMPACT_EXAMPLE,
  EXPOSURE_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./aperture-picker-examples";
import {
  WheelPickerDemo,
  SliderPickerDemo,
  GridPickerDemo,
  DepthOfFieldPreviewDemo,
  CameraSettingsPanelDemo,
  CompactInlineDemo,
  ExposureInfoDemo,
  PlaygroundDemo,
} from "./demos";

export default function AperturePickerPage() {
  return (
    <ComponentDocPage
      name="Aperture Picker"
      category="Forms"
      description="A premium aperture selection dial styled after shadcn/ui conventions — semantic design tokens, full keyboard navigation, ARIA radio-group semantics, smooth expand/collapse details, and theme-aware dark mode."
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
        <ExampleBlock
          title="Wheel Picker"
          description="Circular dial with indicator needle, tick ring, and animated exposure details disclosure."
          code={WHEEL_EXAMPLE}
        >
          <WheelPickerDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Slider Picker"
          description="Custom-styled range slider with filled track, labeled stops, and depth of field feedback card."
          code={SLIDER_EXAMPLE}
        >
          <SliderPickerDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Grid Selector"
          description="Card grid with visual aperture circles that scale with f-stop value, focus rings, and press feedback."
          code={GRID_EXAMPLE}
        >
          <GridPickerDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Depth of Field Preview"
          description="Visual preview showing real-time blur effect with exposure stats."
          code={DOF_EXAMPLE}
        >
          <DepthOfFieldPreviewDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Camera Settings Panel"
          description="Complete camera settings UI combining aperture, shutter speed, and ISO segmented controls with reset."
          code={PANEL_EXAMPLE}
        >
          <CameraSettingsPanelDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Compact Inline"
          description="Minimal inline picker with increment/decrement buttons for tight layouts."
          code={COMPACT_EXAMPLE}
        >
          <CompactInlineDemo />
        </ExampleBlock>

        <ExampleBlock
          title="With Exposure Info"
          description="Aperture picker with exposure meter, compensation value, and DoF indicator."
          code={EXPOSURE_EXAMPLE}
        >
          <ExposureInfoDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Playground"
          description="Switch between wheel, slider, and grid modes and interact with each picker live."
          code={PLAYGROUND_EXAMPLE}
        >
          <PlaygroundDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
