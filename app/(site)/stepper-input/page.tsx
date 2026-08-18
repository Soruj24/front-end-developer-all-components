"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Minus, Plus } from "lucide-react";

const installCommand = `npx component-library@latest add stepper-input`;

const usageCode = `import { useState } from "react";
import { Minus, Plus } from "lucide-react";

function StepperInput({ value, onChange, min, max, step }) {
  return (
    <div className="inline-flex items-center rounded-lg border">
      <button onClick={() => onChange(Math.max(min, value - step))} className="px-3 py-2">
        <Minus className="h-4 w-4" />
      </button>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-16 border-x px-2 py-2 text-center text-sm"
      />
      <button onClick={() => onChange(Math.min(max, value + step))} className="px-3 py-2">
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}`;

function StepperInput({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  size = "md",
  disabled = false,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}) {
  const sizeClass = size === "sm" ? "h-8 text-xs" : size === "lg" ? "h-12 text-base" : "h-10 text-sm";
  const btnClass = size === "sm" ? "h-8 w-8" : size === "lg" ? "h-12 w-12" : "h-10 w-10";

  return (
    <div className={`inline-flex items-center overflow-hidden rounded-lg border border-border ${sizeClass}`}>
      <button
        onClick={() => onChange(Math.max(min, value - step))}
        disabled={disabled || value <= min}
        className={`flex items-center justify-center border-r border-border bg-muted/50 transition-colors hover:bg-muted disabled:opacity-40 ${btnClass}`}
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <input
        type="number"
        value={value}
        onChange={(e) => {
          const v = parseInt(e.target.value, 10);
          if (!isNaN(v)) onChange(Math.min(max, Math.max(min, v)));
        }}
        disabled={disabled}
        className={`w-16 border-0 bg-transparent px-2 text-center font-medium outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${sizeClass}`}
      />
      <button
        onClick={() => onChange(Math.min(max, value + step))}
        disabled={disabled || value >= max}
        className={`flex items-center justify-center border-l border-border bg-muted/50 transition-colors hover:bg-muted disabled:opacity-40 ${btnClass}`}
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export default function StepperInputPage() {
  const [v1, setV1] = useState(1);
  const [v2, setV2] = useState(5);
  const [v3, setV3] = useState(10);
  const [v4, setV4] = useState(0);
  const [v5, setV5] = useState(50);
  const [v6, setV6] = useState(3);
  const [v7, setV7] = useState(100);
  const [v8, setV8] = useState(25);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Stepper Input</h1>
          <Badge variant="primary">Form</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A numeric input with increment and decrement buttons. Useful for adjusting quantities, settings, or any numeric value within a range.
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
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Default</h2>
          <p className="mt-1 text-sm text-muted-foreground">Basic stepper with +/- buttons and a numeric input.</p>
        </div>
        <ComponentPreview id="stepper-default">
          <StepperInput value={v1} onChange={setV1} min={0} max={10} />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Sizes</h2>
          <p className="mt-1 text-sm text-muted-foreground">Small, medium, and large stepper inputs.</p>
        </div>
        <ComponentPreview id="stepper-sizes">
          <div className="flex items-center gap-4">
            <StepperInput value={v2} onChange={setV2} min={0} max={10} size="sm" />
            <StepperInput value={v3} onChange={setV3} min={0} max={100} size="md" />
            <StepperInput value={v4} onChange={setV4} min={0} max={50} size="lg" />
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Step Values</h2>
          <p className="mt-1 text-sm text-muted-foreground">Different step increments for each click.</p>
        </div>
        <ComponentPreview id="stepper-step-values">
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <StepperInput value={v1} onChange={setV1} min={0} max={10} step={1} />
              <span className="text-xs text-muted-foreground">Step: 1</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <StepperInput value={v5} onChange={setV5} min={0} max={100} step={5} />
              <span className="text-xs text-muted-foreground">Step: 5</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <StepperInput value={v6} onChange={setV6} min={0} max={24} step={0.5} />
              <span className="text-xs text-muted-foreground">Step: 0.5</span>
            </div>
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Disabled</h2>
          <p className="mt-1 text-sm text-muted-foreground">Disabled state for read-only stepper inputs.</p>
        </div>
        <ComponentPreview id="stepper-disabled">
          <StepperInput value={7} onChange={() => {}} min={0} max={10} disabled />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">With Labels</h2>
          <p className="mt-1 text-sm text-muted-foreground">Stepper inputs with descriptive labels.</p>
        </div>
        <ComponentPreview id="stepper-labels">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
              <div>
                <p className="text-sm font-medium">Quantity</p>
                <p className="text-xs text-muted-foreground">Number of items to order</p>
              </div>
              <StepperInput value={v6} onChange={setV6} min={1} max={99} />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
              <div>
                <p className="text-sm font-medium">Guests</p>
                <p className="text-xs text-muted-foreground">Number of guests for reservation</p>
              </div>
              <StepperInput value={v7} onChange={setV7} min={1} max={20} />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
              <div>
                <p className="text-sm font-medium">Discount (%)</p>
                <p className="text-xs text-muted-foreground">Percentage discount to apply</p>
              </div>
              <StepperInput value={v8} onChange={setV8} min={0} max={100} step={5} />
            </div>
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Inline Stepper</h2>
          <p className="mt-1 text-sm text-muted-foreground">Stepper embedded in a line of text.</p>
        </div>
        <ComponentPreview id="stepper-inline">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            Show{" "}
            <StepperInput value={v5} onChange={setV5} min={1} max={100} size="sm" />{" "}
            results per page
          </div>
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
                <td className="px-4 py-3 font-mono text-xs">value</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onChange</td>
                <td className="px-4 py-3 text-muted-foreground">{`(value: number) => void`}</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">min</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">0</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">max</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">100</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">step</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">1</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">{'{`"sm" | "md" | "lg"`}'}</td>
                <td className="px-4 py-3 text-muted-foreground">{'{`"md"`}'}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">disabled</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
