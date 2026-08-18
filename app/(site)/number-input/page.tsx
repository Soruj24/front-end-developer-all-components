"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Input, Button, Card, CardContent } from "@/components/ui";

const installCommand = "npx component-library@latest add number-input";

const usageCode = `import { NumberInput } from "@/components/ui";

export default function Example() {
  return <NumberInput min={0} max={100} step={1} />;
}`;

export default function NumberInputPage() {
  const [val, setVal] = useState(5);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  const [step, setStep] = useState(1);
  const clamp = (v: number) => Math.max(min, Math.min(max, v));

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Number Input</h1>
          <Badge variant="primary">Input</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Numeric input with stepper controls, min/max bounds, step configuration, and decimal precision.
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
          <h3 className="text-lg font-medium text-foreground">Basic Stepper</h3>
          <ComponentPreview id="number-input-default">
            <div className="flex w-full max-w-[200px] items-center gap-2">
              <Button variant="outline" size="sm" className="h-9 w-9 shrink-0 p-0 text-lg" onClick={() => setVal((v) => clamp(v - step))}>−</Button>
              <Input type="number" value={val} onChange={(e) => setVal(Number(e.target.value))} className="text-center font-mono text-lg" />
              <Button variant="outline" size="sm" className="h-9 w-9 shrink-0 p-0 text-lg" onClick={() => setVal((v) => clamp(v + step))}>+</Button>
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">With Bounds Display</h3>
          <ComponentPreview id="number-input-bounds">
            <Card className="w-full max-w-[240px]">
              <CardContent className="p-4">
                <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Min: {min}</span>
                  <span>Max: {max}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-10 w-10 shrink-0 p-0" onClick={() => setVal((v) => clamp(v - step))}>−</Button>
                  <div className="flex-1 text-center">
                    <span className="text-2xl font-bold tabular-nums">{val}</span>
                  </div>
                  <Button variant="outline" size="sm" className="h-10 w-10 shrink-0 p-0" onClick={() => setVal((v) => clamp(v + step))}>+</Button>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${((val - min) / (max - min)) * 100}%` }} />
                </div>
              </CardContent>
            </Card>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Configurable</h3>
          <ComponentPreview id="number-input-interactive">
            <div className="w-full max-w-sm">
              <div className="mb-3 flex gap-4">
                <label className="text-sm">Min: <Input type="number" value={min} onChange={(e) => setMin(Number(e.target.value))} className="h-7 w-16 inline-block ml-1" /></label>
                <label className="text-sm">Max: <Input type="number" value={max} onChange={(e) => setMax(Number(e.target.value))} className="h-7 w-16 inline-block ml-1" /></label>
                <label className="text-sm">Step: <Input type="number" value={step} onChange={(e) => setStep(Number(e.target.value))} className="h-7 w-16 inline-block ml-1" /></label>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={() => setVal((v) => clamp(v - step))}>− {step}</Button>
                <Input type="number" value={val} onChange={(e) => setVal(Number(e.target.value))} className="text-center text-xl font-bold" />
                <Button variant="outline" onClick={() => setVal((v) => clamp(v + step))}>+ {step}</Button>
              </div>
              <p className="mt-2 text-center text-xs text-muted-foreground">Value: {val}</p>
            </div>
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
                <td className="px-4 py-3 font-mono text-xs text-foreground">min</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">-Infinity</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">max</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">Infinity</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">step</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">1</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}