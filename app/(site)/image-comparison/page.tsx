"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Card, CardContent } from "@/components/ui";

const installCommand = "npx component-library@latest add image-comparison";

const usageCode = `import { ImageComparison } from "@/components/ui";

export default function Example() {
  return <ImageComparison before="/before.jpg" after="/after.jpg" />;
}`;

export default function ImageComparisonPage() {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Image Comparison</h1>
          <Badge variant="primary">Visual</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Before/after image comparison slider with drag interaction, labels, and responsive sizing for product demos.
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

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Default</h3>
          <ComponentPreview id="image-comparison-default">
            <div className="w-full max-w-md">
              <div className="relative overflow-hidden rounded-lg">
                <div className="relative h-48 bg-gradient-to-r from-slate-300 to-slate-400">
                  <span className="absolute left-3 top-3 text-xs font-medium text-white bg-black/40 px-2 py-0.5 rounded">Before</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-200 to-orange-300" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
                  <span className="absolute right-3 top-3 text-xs font-medium text-white bg-black/40 px-2 py-0.5 rounded">After</span>
                </div>
                <input type="range" min="0" max="100" value={sliderPos} onChange={(e) => setSliderPos(Number(e.target.value))} className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
                <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg" style={{ left: `${sliderPos}%` }}>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg text-xs">⟷</div>
                </div>
              </div>
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">With Labels</h3>
          <ComponentPreview id="image-comparison-labels">
            <div className="w-full max-w-md">
              <div className="flex justify-between mb-2 text-sm font-medium text-muted-foreground">
                <span>Before</span><span>After</span>
              </div>
              <div className="relative overflow-hidden rounded-lg">
                <div className="relative h-40 bg-gradient-to-br from-gray-200 to-gray-300">
                  <div className="flex h-full items-center justify-center text-gray-500 text-sm">Original</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-emerald-300" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
                  <div className="flex h-full items-center justify-center text-green-700 text-sm">Enhanced</div>
                </div>
                <div className="absolute top-0 bottom-0 w-0.5 bg-white" style={{ left: `${sliderPos}%` }} />
                <input type="range" min="0" max="100" value={sliderPos} onChange={(e) => setSliderPos(Number(e.target.value))} className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
              </div>
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Interactive</h3>
          <ComponentPreview id="image-comparison-interactive">
            <Card className="w-full max-w-md">
              <CardContent className="p-4">
                <div className="relative overflow-hidden rounded-lg">
                  <div className="relative h-56 bg-gradient-to-br from-blue-100 to-blue-200">
                    <div className="flex h-full items-center justify-center text-blue-600 font-medium">Light Mode</div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-800 to-purple-900" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
                    <div className="flex h-full items-center justify-center text-white font-medium">Dark Mode</div>
                  </div>
                  <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg" style={{ left: `${sliderPos}%` }}>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center text-sm">⟷</div>
                  </div>
                  <input type="range" min="0" max="100" value={sliderPos} onChange={(e) => setSliderPos(Number(e.target.value))} className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0" />
                </div>
                <p className="mt-2 text-center text-xs text-muted-foreground">Drag to compare: {sliderPos}%</p>
              </CardContent>
            </Card>
          </ComponentPreview>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Default</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">before</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">after</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">undefined</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}