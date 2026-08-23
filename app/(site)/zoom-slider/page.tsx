"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ZOOM_SLIDER_SOURCE } from "./zoom-slider-source";
import {
  BASIC_SLIDER_EXAMPLE,
  SLIDER_WITH_PREVIEW_EXAMPLE,
  SLIDER_PRESETS_EXAMPLE,
  SLIDER_WITH_BUTTONS_EXAMPLE,
  SLIDER_SIZES_EXAMPLE,
  SLIDER_DISABLED_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./zoom-slider-examples";
import {
  BasicSlider,
  SliderWithPreview,
  SliderPresets,
  SliderWithButtons,
  SliderSizes,
  SliderDisabled,
  PlaygroundDemo,
} from "./demos";

export default function ZoomSliderPage() {
  return (
    <ComponentDocPage
      name="Zoom Slider"
      category="Input"
      description="A zoom slider component for smoothly adjusting zoom levels with a visual slider and percentage display."
    >
      <PreviewPanel filename="basic-slider.tsx">
        <BasicSlider />
      </PreviewPanel>

      <SourceCodeViewer
        source={ZOOM_SLIDER_SOURCE}
        filename="components/ui/ZoomSlider/BasicSlider.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all zoom slider variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Basic Slider" description="Default slider with icon, percentage badge, and tick marks." code={BASIC_SLIDER_EXAMPLE}>
          <BasicSlider />
        </ExampleBlock>
        <ExampleBlock title="With Preview" description="Slider with dynamic height preview of the zoom level." code={SLIDER_WITH_PREVIEW_EXAMPLE}>
          <SliderWithPreview />
        </ExampleBlock>
        <ExampleBlock title="Presets" description="Slider with quick-select preset buttons." code={SLIDER_PRESETS_EXAMPLE}>
          <SliderPresets />
        </ExampleBlock>
        <ExampleBlock title="With Buttons" description="Zoom in/out buttons flanking the slider." code={SLIDER_WITH_BUTTONS_EXAMPLE}>
          <SliderWithButtons />
        </ExampleBlock>
        <ExampleBlock title="Sizes" description="Thin, default, and thick slider height variants." code={SLIDER_SIZES_EXAMPLE}>
          <SliderSizes />
        </ExampleBlock>
        <ExampleBlock title="Disabled" description="Non-interactive disabled slider state." code={SLIDER_DISABLED_EXAMPLE}>
          <SliderDisabled />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
