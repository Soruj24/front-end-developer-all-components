"use client";

import { useState } from "react";
import { Slider } from "@/components/ui";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const SLIDER_SOURCE = `"use client";

import { forwardRef, InputHTMLAttributes, useCallback, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type SliderSize = "sm" | "md" | "lg";

const TRACK_SIZE = { sm: "h-1.5", md: "h-2", lg: "h-2.5" };
const THUMB_SIZE = { sm: "h-4 w-4", md: "h-5 w-5", lg: "h-6 w-6" };

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  size?: SliderSize;
  showValue?: boolean;
  showMarks?: boolean;
  marks?: { value: number; label?: string }[];
}

const Slider = forwardRef<HTMLInputElement, SliderProps>(({ className, size = "md", showValue, showMarks, marks, min = 0, max = 100, step = 1, value, disabled, onChange, ...props }, ref) => {
  const [internalValue, setInternalValue] = useState<number>(value ?? Number(props.defaultValue) ?? 50);
  const currentValue = value ?? internalValue;
  const minNum = Number(min);
  const maxNum = Number(max);
  const percent = Math.min(100, Math.max(0, ((currentValue - minNum) / (maxNum - minNum)) * 100));

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setInternalValue(v);
    onChange?.(e);
  }, [onChange]);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {(showValue || showMarks) && (
        <div className="flex items-center justify-between">
          {showValue && <span className="text-sm font-medium tabular-nums text-foreground">{currentValue}</span>}
          {showMarks && <span className="text-xs text-muted-foreground">{minNum} — {maxNum}</span>}
        </div>
      )}
      <div className="relative flex items-center">
        <div className={cn("relative w-full rounded-full bg-muted", TRACK_SIZE[size], disabled && "opacity-50")}>
          <div className="absolute inset-y-0 left-0 rounded-full bg-primary transition-none" style={{ width: \`\${percent}%\` }} />
        </div>
        <input ref={ref} type="range" min={min} max={max} step={step} value={currentValue} onChange={handleChange} disabled={disabled}
          className={cn("absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent", "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-primary/20 [&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:shadow-black/10 [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150 [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:hover:shadow-lg [&::-webkit-slider-thumb]:focus-visible:outline-none [&::-webkit-slider-thumb]:focus-visible:ring-2 [&::-webkit-slider-thumb]:focus-visible:ring-primary [&::-webkit-slider-thumb]:focus-visible:ring-offset-2 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-primary/20 [&::-moz-range-thumb]:bg-background [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:shadow-black/10 [&::-moz-range-track]:bg-transparent [&::-moz-range-track]:h-0 [&::-moz-range-track]:border-0", THUMB_SIZE[size], disabled && "[&::-webkit-slider-thumb]:pointer-events-none [&::-webkit-slider-thumb]:opacity-50 [&::-moz-range-thumb]:pointer-events-none [&::-moz-range-thumb]:opacity-50")}
          aria-valuemin={minNum} aria-valuemax={maxNum} aria-valuenow={currentValue} aria-label={props["aria-label"] ?? "Slider"} {...props} />
      </div>
    </div>
  );
});

Slider.displayName = "Slider";
export default Slider;
export { Slider };`;

export default function SliderPage() {
  const [basic, setBasic] = useState(50);
  const [volume, setVolume] = useState(75);
  const [brightness, setBrightness] = useState(60);
  const [temp, setTemp] = useState(42);
  const [price, setPrice] = useState(50);
  const [opacity, setOpacity] = useState(80);

  return (
    <ComponentDocPage
      name="Slider"
      category="Forms"
      description="An input where the user selects a value from a given range of values. Supports sizes, value display, custom marks, and keyboard navigation."
    >
      <PreviewPanel filename="slider-preview.tsx">
        <div className="w-full max-w-sm">
          <Slider value={basic} onChange={(e) => setBasic(Number(e.target.value))} showValue />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={SLIDER_SOURCE}
        filename="components/ui/Slider.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Default"
          description="Basic slider with value display."
          code={`import { Slider } from "@/components/ui";\n\n<Slider value={50} showValue onChange={(e) => {}} />`}
          filename="default.tsx"
        >
          <div className="w-full max-w-sm">
            <Slider value={50} showValue onChange={() => {}} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Sizes"
          description="Three sizes: sm, md (default), lg."
          code={`<Slider value={50} size="sm" showValue onChange={() => {}} />\n<Slider value={50} size="md" showValue onChange={() => {}} />\n<Slider value={50} size="lg" showValue onChange={() => {}} />`}
          filename="sizes.tsx"
        >
          <div className="flex w-full max-w-sm flex-col gap-6">
            <Slider value={50} size="sm" showValue onChange={() => {}} />
            <Slider value={50} size="md" showValue onChange={() => {}} />
            <Slider value={50} size="lg" showValue onChange={() => {}} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Volume"
          description="Common use case: volume control."
          code={`const [volume, setVolume] = useState(75);\n\n<Slider value={volume} onChange={(e) => setVolume(Number(e.target.value))} showValue />`}
          filename="volume.tsx"
        >
          <div className="flex w-full max-w-sm flex-col gap-2">
            <span className="text-sm font-medium text-foreground">Volume</span>
            <Slider
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              showValue
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Brightness"
          description="Slider with a different default value."
          code={`const [brightness, setBrightness] = useState(60);\n\n<Slider value={brightness} onChange={(e) => setBrightness(Number(e.target.value))} showValue />`}
          filename="brightness.tsx"
        >
          <div className="flex w-full max-w-sm flex-col gap-2">
            <span className="text-sm font-medium text-foreground">Brightness</span>
            <Slider
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              showValue
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Disabled"
          description="Non-interactive slider."
          code={`<Slider value={50} disabled showValue onChange={() => {}} />`}
          filename="disabled.tsx"
        >
          <div className="w-full max-w-sm">
            <Slider value={50} disabled showValue onChange={() => {}} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Custom Range"
          description="Slider with custom min, max, and step."
          code={`<Slider min={0} max={1000} step={50} value={500} showValue onChange={(e) => {}} />`}
          filename="custom-range.tsx"
        >
          <div className="w-full max-w-sm">
            <Slider
              min={0}
              max={1000}
              step={50}
              value={500}
              showValue
              onChange={() => { }}
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="With Marks"
          description="Show tick marks at specific values."
          code={`<Slider\n  value={42}\n  showValue\n  showMarks\n  marks={[\n    { value: 0, label: "0°" },\n    { value: 25, label: "25°" },\n    { value: 50, label: "50°" },\n    { value: 75, label: "75°" },\n    { value: 100, label: "100°" },\n  ]}\n  onChange={(e) => {}}\n/>`}
          filename="with-marks.tsx"
        >
          <div className="w-full max-w-sm">
            <Slider
              value={temp}
              onChange={(e) => setTemp(Number(e.target.value))}
              showValue
              showMarks
              marks={[
                { value: 0, label: "0°" },
                { value: 25, label: "25°" },
                { value: 50, label: "50°" },
                { value: 75, label: "75°" },
                { value: 100, label: "100°" },
              ]}
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Price Range"
          description="Slider for selecting a price."
          code={`const [price, setPrice] = useState(50);\n\n<Slider min={0} max={200} step={5} value={price} onChange={(e) => setPrice(Number(e.target.value))} showValue />`}
          filename="price.tsx"
        >
          <div className="flex w-full max-w-sm flex-col gap-2">
            <span className="text-sm font-medium text-foreground">
              Max price: ${price}
            </span>
            <Slider
              min={0}
              max={200}
              step={5}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              showValue
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Opacity"
          description="Slider for opacity control."
          code={`const [opacity, setOpacity] = useState(80);\n\n<Slider value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} showValue />`}
          filename="opacity.tsx"
        >
          <div className="flex w-full max-w-sm flex-col gap-2">
            <span className="text-sm font-medium text-foreground">
              Opacity: {opacity}%
            </span>
            <Slider
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              showValue
            />
          </div>
        </ExampleBlock>
      </section>


    </ComponentDocPage>
  );
}
