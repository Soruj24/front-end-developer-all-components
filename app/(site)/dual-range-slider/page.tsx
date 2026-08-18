"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { DollarSign, MapPin, Settings2 } from "lucide-react";

const installCommand = `npx component-library@latest add dual-range-slider`;

const usageCode = `import { DualRangeSlider } from "@/components/ui";

<DualRangeSlider
  min={0}
  max={100}
  value={[20, 80]}
  onChange={setRange}
/>`;

function DualRange({ min, max, step, value, onChange, formatLabel }: {
  min: number; max: number; step: number;
  value: [number, number]; onChange: (v: [number, number]) => void;
  formatLabel?: (v: number) => string;
}) {
  const [dragging, setDragging] = useState<"min" | "max" | null>(null);

  const pct = (v: number) => ((v - min) / (max - min)) * 100;
  const fmt = formatLabel || ((v: number) => `${v}`);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Math.min(Number(e.target.value), value[1] - step);
    onChange([Math.max(min, v), value[1]]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Math.max(Number(e.target.value), value[0] + step);
    onChange([value[0], Math.min(max, v)]);
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex items-center justify-between mb-2 text-sm font-medium">
        <span>{fmt(value[0])}</span>
        <span>{fmt(value[1])}</span>
      </div>
      <div className="relative h-2 rounded-full bg-muted">
        <div
          className="absolute h-full rounded-full bg-primary"
          style={{ left: `${pct(value[0])}%`, right: `${100 - pct(value[1])}%` }}
        />
      </div>
      <input type="range" min={min} max={max} step={step} value={value[0]} onChange={handleMinChange}
        className="absolute w-full h-2 opacity-0 cursor-pointer" style={{ zIndex: 5 }} />
      <input type="range" min={min} max={max} step={step} value={value[1]} onChange={handleMaxChange}
        className="absolute w-full h-2 opacity-0 cursor-pointer" style={{ zIndex: 6 }} />
      <div className="mt-3 flex justify-between text-xs text-muted-foreground">
        <span>{fmt(min)}</span>
        <span>{fmt(max)}</span>
      </div>
    </div>
  );
}

function PriceRangeDemo() {
  const [range, setRange] = useState<[number, number]>([200, 800]);
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <DollarSign className="h-4 w-4" />
        <span>Price Range</span>
      </div>
      <DualRange min={0} max={1000} step={10} value={range} onChange={setRange}
        formatLabel={(v) => `$${v}`} />
      <p className="text-center text-sm text-muted-foreground">${range[0]} – ${range[1]}</p>
    </div>
  );
}

function DistanceRangeDemo() {
  const [range, setRange] = useState<[number, number]>([1, 25]);
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <MapPin className="h-4 w-4" />
        <span>Distance Range</span>
      </div>
      <DualRange min={0} max={50} step={1} value={range} onChange={setRange}
        formatLabel={(v) => `${v} mi`} />
      <p className="text-center text-sm text-muted-foreground">{range[0]} mi – {range[1]} mi</p>
    </div>
  );
}

function CustomStepsDemo() {
  const [range, setRange] = useState<[number, number]>([25, 75]);
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Settings2 className="h-4 w-4" />
        <span>Custom Steps (step=25)</span>
      </div>
      <DualRange min={0} max={100} step={25} value={range} onChange={setRange}
        formatLabel={(v) => `${v}%`} />
      <p className="text-center text-sm text-muted-foreground">{range[0]}% – {range[1]}%</p>
    </div>
  );
}

export default function DualRangeSliderPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Dual Range Slider</h1>
          <Badge variant="primary">Forms</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A dual-handle range slider for selecting a value range. Perfect for price filters, distance selectors, and more.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Price Range</h2>
          <p className="mt-1 text-sm text-muted-foreground">Filter by price with dollar formatting.</p>
        </div>
        <ComponentPreview id="dual-range-price">
          <PriceRangeDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Distance Range</h2>
          <p className="mt-1 text-sm text-muted-foreground">Select a distance range in miles.</p>
        </div>
        <ComponentPreview id="dual-range-distance">
          <DistanceRangeDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Custom Steps</h2>
          <p className="mt-1 text-sm text-muted-foreground">Slider with custom step increments.</p>
        </div>
        <ComponentPreview id="dual-range-steps">
          <CustomStepsDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">min</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">0</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">max</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">100</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">step</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">1</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">value</td>
                <td className="px-4 py-3 text-muted-foreground">[number, number]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">onChange</td>
                <td className="px-4 py-3 text-muted-foreground">(value: [number, number]) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
