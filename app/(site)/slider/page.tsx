"use client";

import { useState } from "react";
import { Slider } from "@/components/ui";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const SLIDER_SOURCE = `import { forwardRef, InputHTMLAttributes } from "react";

type SliderSize = "sm" | "md" | "lg";

const sizeClasses: Record<SliderSize, string> = {
  sm: "h-1",
  md: "h-1.5",
  lg: "h-2",
};

const thumbSizeClasses: Record<SliderSize, string> = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  size?: SliderSize;
  showValue?: boolean;
}

const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ className = "", size = "md", showValue, value, ...props }, ref) => {
    return (
      <div className={\`flex items-center gap-3 \${className}\`}>
        <input
          ref={ref}
          type="range"
          value={value}
          className={\`w-full cursor-pointer appearance-none rounded-full bg-muted \${sizeClasses[size]}
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110 \${thumbSizeClasses[size]}
            [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-foreground \${thumbSizeClasses[size]}\`}
          {...props}
        />
        {showValue && (
          <span className="min-w-[2.5rem] text-right text-sm tabular-nums text-muted-foreground">
            {value}
          </span>
        )}
      </div>
    );
  }
);
Slider.displayName = "Slider";

export default Slider;
export { Slider };`;

const USAGE_CODE = `import { Slider } from "@/components/ui";

<Slider value={50} onChange={(e) => setValue(Number(e.target.value))} />
<Slider value={50} onChange={(e) => setValue(Number(e.target.value))} disabled />`;

const SIZES_CODE = `<Slider value={50} size="sm" onChange={(e) => {}} />
<Slider value={50} size="md" onChange={(e) => {}} />
<Slider value={50} size="lg" onChange={(e) => {}} />`;

const SHOW_VALUE_CODE = `<Slider value={75} showValue onChange={(e) => {}} />`;

export default function SliderPage() {
  const [value1, setValue1] = useState(50);
  const [value2, setValue2] = useState(25);
  const [value3, setValue3] = useState(75);

  return (
    <ComponentDocPage
      name="Slider"
      category="Forms"
      description="An input where the user selects a value from a given range of values."
    >
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Preview</h2>
        <PreviewPanel filename="Slider">
          <div className="w-full max-w-sm">
            <Slider value={value1} onChange={(e) => setValue1(Number(e.target.value))} showValue />
          </div>
        </PreviewPanel>
      </section>

      <section className="flex flex-col gap-4">
        <ExampleBlock
          title="Sizes"
          description="Use the size prop to change the slider size."
          code={SIZES_CODE}
        >
          <div className="flex w-full max-w-sm flex-col gap-6">
            <Slider value={50} size="sm" onChange={(e) => {}} showValue />
            <Slider value={50} size="md" onChange={(e) => {}} showValue />
            <Slider value={50} size="lg" onChange={(e) => {}} showValue />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Show Value"
          description="Display the current value alongside the slider."
          code={SHOW_VALUE_CODE}
        >
          <div className="w-full max-w-sm">
            <Slider value={75} showValue onChange={(e) => {}} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Range"
          description="Sliders with different range values."
          code={`const [min, setMin] = useState(25);
const [max, setMax] = useState(75);

<Slider value={min} onChange={(e) => setMin(Number(e.target.value))} showValue />
<Slider value={max} onChange={(e) => setMax(Number(e.target.value))} showValue />`}
        >
          <div className="flex w-full max-w-sm flex-col gap-4">
            <Slider value={value2} onChange={(e) => setValue2(Number(e.target.value))} showValue />
            <Slider value={value3} onChange={(e) => setValue3(Number(e.target.value))} showValue />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Disabled"
          description="Use the disabled prop to disable the slider."
          code={`<Slider value={50} disabled onChange={(e) => {}} />`}
        >
          <div className="w-full max-w-sm">
            <Slider value={50} disabled onChange={(e) => {}} />
          </div>
        </ExampleBlock>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <SourceCodeViewer source={SLIDER_SOURCE} filename="Slider.tsx" defaultExpanded />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <SourceCodeViewer source={USAGE_CODE} filename="page.tsx" />
      </section>
    </ComponentDocPage>
  );
}
