"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { NumberInput } from "@/components/ui/NumberInput";

const NUMBER_INPUT_SOURCE = `"use client";

import { useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/cn";

interface NumberInputProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function NumberInput({ value, onChange, min = -Infinity, max = Infinity, step = 1, placeholder, disabled = false, className }: NumberInputProps) {
  const [internalValue, setInternalValue] = useState(value ?? 0);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  useEffect(() => { if (isControlled) setInternalValue(value); }, [isControlled, value]);

  const clamp = useCallback((v) => Math.max(min, Math.min(max, v)), [min, max]);
  const handleChange = useCallback((next) => {
    const clamped = clamp(next);
    if (!isControlled) setInternalValue(clamped);
    onChange?.(clamped);
  }, [clamp, isControlled, onChange]);

  return (
    <div className={cn("inline-flex items-center overflow-hidden rounded-xl border border-border bg-card shadow-sm", disabled && "pointer-events-none opacity-50", className)}>
      <button type="button" onClick={() => handleChange(currentValue - step)} disabled={disabled || currentValue <= min}
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-lg font-medium border-r border-border transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-40">
        −
      </button>
      <input type="number" value={currentValue} onChange={(e) => handleChange(Number(e.target.value))} placeholder={placeholder} disabled={disabled}
        className="h-11 w-20 border-0 bg-transparent px-2 text-center font-mono text-sm font-medium tabular-nums text-foreground focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" />
      <button type="button" onClick={() => handleChange(currentValue + step)} disabled={disabled || currentValue >= max}
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-lg font-medium border-l border-border transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-40">
        +
      </button>
    </div>
  );
}`;

export default function NumberInputPage() {
  const [val, setVal] = useState(5);
  const min = 0;
  const max = 100;
  const step = 1;

  return (
    <ComponentDocPage
      name="Number Input"
      category="Input"
      description="Numeric input with stepper controls, min/max bounds, step configuration, and decimal precision."
    >
      <PreviewPanel filename="number-input-preview.tsx">
        <div className="w-full max-w-[200px]">
          <NumberInput value={val} onChange={setVal} min={0} max={100} step={1} />
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={NUMBER_INPUT_SOURCE} filename="components/ui/NumberInput/NumberInput.tsx" defaultExpanded />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Basic"
          description="Simple number input with increment/decrement buttons."
          code={`import { NumberInput } from "@/components/ui/NumberInput";

<NumberInput value={val} onChange={setVal} />`}
          filename="basic.tsx"
        >
          <div className="w-full max-w-[200px]">
            <NumberInput value={val} onChange={setVal} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="With Bounds"
          description="Number input with min/max constraints and progress bar."
          code={`<NumberInput value={val} onChange={setVal} min={0} max={100} />`}
          filename="bounds.tsx"
        >
          <div className="w-full max-w-[260px]">
            <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>Min: {min}</span>
              <span>Max: {max}</span>
            </div>
            <NumberInput value={val} onChange={setVal} min={min} max={max} step={step} />
            <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{ width: `${((val - min) / (max - min)) * 100}%` }}
              />
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Step Control"
          description="Adjustable step value."
          code={`<NumberInput value={val} onChange={setVal} min={0} max={100} step={5} />`}
          filename="step.tsx"
        >
          <div className="w-full max-w-[200px]">
            <NumberInput value={val} onChange={setVal} min={0} max={100} step={5} />
            <p className="mt-2 text-center text-xs text-muted-foreground">Step: {step}</p>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Disabled"
          description="Non-interactive number input."
          code={`<NumberInput value={42} disabled />`}
          filename="disabled.tsx"
        >
          <div className="w-full max-w-[200px]">
            <NumberInput value={42} disabled />
          </div>
        </ExampleBlock>
      </section>


    </ComponentDocPage>
  );
}
