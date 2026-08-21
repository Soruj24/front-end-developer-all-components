"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { DualRangeSlider } from "@/components/ui/DualRangeSlider";
import { DUAL_RANGE_SLIDER_SOURCE } from "./dual-range-slider-source";

const BASIC_CODE = `import { DualRangeSlider } from "@/components/ui/DualRangeSlider";

<DualRangeSlider
  min={0}
  max={100}
  value={[20, 80]}
  onChange={setRange}
/>`;

const FORMAT_CODE = `import { DualRangeSlider } from "@/components/ui/DualRangeSlider";

<DualRangeSlider
  min={0}
  max={1000}
  step={10}
  value={range}
  onChange={setRange}
  formatLabel={(v) => \`$\${v}\`}
/>`;

const SIZE_CODE = `import { DualRangeSlider } from "@/components/ui/DualRangeSlider";

<DualRangeSlider size="sm" value={[20, 80]} onChange={setRange} />
<DualRangeSlider size="md" value={[20, 80]} onChange={setRange} />
<DualRangeSlider size="lg" value={[20, 80]} onChange={setRange} />`;

const DISABLED_CODE = `import { DualRangeSlider } from "@/components/ui/DualRangeSlider";

<DualRangeSlider value={[30, 70]} onChange={setRange} disabled />`;

export default function DualRangeSliderPage() {
  const [range, setRange] = useState<[number, number]>([20, 80]);
  const [priceRange, setPriceRange] = useState<[number, number]>([200, 800]);
  const [distRange, setDistRange] = useState<[number, number]>([1, 25]);
  const [stepRange, setStepRange] = useState<[number, number]>([25, 75]);
  const [smRange, setSmRange] = useState<[number, number]>([20, 80]);
  const [mdRange, setMdRange] = useState<[number, number]>([20, 80]);
  const [lgRange, setLgRange] = useState<[number, number]>([20, 80]);
  const [disabledRange, setDisabledRange] = useState<[number, number]>([30, 70]);
  const [hiddenRange, setHiddenRange] = useState<[number, number]>([40, 60]);

  return (
    <ComponentDocPage
      name="Dual Range Slider"
      category="Forms"
      description="A dual-handle range slider for selecting a value range. Perfect for price filters, distance selectors, and more."
    >
      <PreviewPanel filename="dual-range-slider.tsx">
        <DualRangeSlider min={0} max={100} value={range} onChange={setRange} />
      </PreviewPanel>

      <SourceCodeViewer
        source={DUAL_RANGE_SLIDER_SOURCE}
        filename="components/ui/DualRangeSlider/DualRangeSlider.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Examples</h2>

        <ExampleBlock
          title="Price Range"
          description="Filter by price with dollar formatting."
          code={FORMAT_CODE}
          filename="price-range.tsx"
        >
          <div className="w-full max-w-md space-y-3">
            <DualRangeSlider
              min={0}
              max={1000}
              step={10}
              value={priceRange}
              onChange={setPriceRange}
              formatLabel={(v) => `$${v}`}
            />
            <p className="text-center text-sm font-medium text-muted-foreground">
              ${priceRange[0]} &ndash; ${priceRange[1]}
            </p>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Distance Range"
          description="Select a distance range in miles."
          code={`<DualRangeSlider min={0} max={50} step={1} value={range} onChange={setRange} formatLabel={(v) => \`\${v} mi\`} />`}
          filename="distance-range.tsx"
        >
          <div className="w-full max-w-md space-y-3">
            <DualRangeSlider
              min={0}
              max={50}
              step={1}
              value={distRange}
              onChange={setDistRange}
              formatLabel={(v) => `${v} mi`}
            />
            <p className="text-center text-sm font-medium text-muted-foreground">
              {distRange[0]} mi &ndash; {distRange[1]} mi
            </p>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Custom Steps"
          description="Slider with custom step increments."
          code={`<DualRangeSlider min={0} max={100} step={25} value={range} onChange={setRange} formatLabel={(v) => \`\${v}%\`} />`}
          filename="custom-steps.tsx"
        >
          <div className="w-full max-w-md space-y-3">
            <DualRangeSlider
              min={0}
              max={100}
              step={25}
              value={stepRange}
              onChange={setStepRange}
              formatLabel={(v) => `${v}%`}
            />
            <p className="text-center text-sm font-medium text-muted-foreground">
              {stepRange[0]}% &ndash; {stepRange[1]}%
            </p>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Sizes"
          description="Three visual sizes: sm, md (default), and lg."
          code={SIZE_CODE}
          filename="sizes.tsx"
        >
          <div className="flex flex-col gap-6 w-full max-w-md">
            <div>
              <p className="mb-1.5 text-xs font-medium text-muted-foreground">Small</p>
              <DualRangeSlider size="sm" min={0} max={100} value={smRange} onChange={setSmRange} />
            </div>
            <div>
              <p className="mb-1.5 text-xs font-medium text-muted-foreground">Medium (default)</p>
              <DualRangeSlider size="md" min={0} max={100} value={mdRange} onChange={setMdRange} />
            </div>
            <div>
              <p className="mb-1.5 text-xs font-medium text-muted-foreground">Large</p>
              <DualRangeSlider size="lg" min={0} max={100} value={lgRange} onChange={setLgRange} />
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Disabled"
          description="The slider can be disabled to prevent interaction."
          code={DISABLED_CODE}
          filename="disabled.tsx"
        >
          <div className="w-full max-w-md">
            <DualRangeSlider
              min={0}
              max={100}
              value={disabledRange}
              onChange={setDisabledRange}
              disabled
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Hide Labels"
          description="Hide the value labels or min/max markers."
          code={`<DualRangeSlider value={[40, 60]} onChange={setRange} showLabels={false} />`}
          filename="hide-labels.tsx"
        >
          <div className="w-full max-w-md space-y-4">
            <div>
              <p className="mb-1.5 text-xs font-medium text-muted-foreground">No value labels</p>
              <DualRangeSlider
                min={0}
                max={100}
                value={hiddenRange}
                onChange={setHiddenRange}
                showLabels={false}
              />
            </div>
            <div>
              <p className="mb-1.5 text-xs font-medium text-muted-foreground">No min/max labels</p>
              <DualRangeSlider
                min={0}
                max={100}
                value={hiddenRange}
                onChange={setHiddenRange}
                showMinMax={false}
              />
            </div>
            <div>
              <p className="mb-1.5 text-xs font-medium text-muted-foreground">No labels at all</p>
              <DualRangeSlider
                min={0}
                max={100}
                value={hiddenRange}
                onChange={setHiddenRange}
                showLabels={false}
                showMinMax={false}
              />
            </div>
          </div>
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}
