"use client";

import { useState } from "react";
import { NativeSelect } from "@/components/ui/NativeSelect";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const NATIVE_SELECT_SOURCE = `"use client";

import { cn } from "@/lib/cn";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface NativeSelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const CHEVRON_SVG = "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2371717a%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E";

export function NativeSelect({ value, onValueChange, options, placeholder, disabled = false, className }: NativeSelectProps) {
  return (
    <div className="relative">
      <select value={value} onChange={(e) => onValueChange?.(e.target.value)} disabled={disabled}
        className={cn(
          "flex h-11 w-full appearance-none items-center rounded-xl border border-border bg-card px-3.5 py-2.5 pr-10 text-sm text-foreground",
          "bg-[url('" + CHEVRON_SVG + "')] bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat",
          "transition-colors duration-150 hover:border-muted-foreground/30 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none",
          disabled && "pointer-events-none cursor-not-allowed opacity-50",
          className,
        )}>
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}`;

export default function NativeSelectPage() {
  const [value, setValue] = useState("react");

  return (
    <ComponentDocPage
      name="Native Select"
      category="Forms"
      description="Native HTML select with options array, placeholder, controlled value, and disabled states."
    >
      <PreviewPanel filename="native-select-preview.tsx">
        <div className="w-full max-w-xs">
          <NativeSelect
            placeholder="Select a framework"
            value={value}
            onValueChange={setValue}
            options={[
              { value: "react", label: "React" },
              { value: "vue", label: "Vue" },
              { value: "angular", label: "Angular" },
              { value: "svelte", label: "Svelte" },
            ]}
          />
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={NATIVE_SELECT_SOURCE} filename="components/ui/NativeSelect/NativeSelect.tsx" defaultExpanded />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Basic"
          description="Default select with placeholder."
          code={`import { NativeSelect } from "@/components/ui/NativeSelect";

<NativeSelect
  placeholder="Select a framework"
  options={[
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
  ]}
/>`}
          filename="basic.tsx"
        >
          <div className="w-full max-w-xs">
            <NativeSelect
              placeholder="Select a framework"
              options={[
                { value: "react", label: "React" },
                { value: "vue", label: "Vue" },
                { value: "angular", label: "Angular" },
              ]}
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Controlled"
          description="Control the selected value with state."
          code={`const [value, setValue] = useState("react");

<NativeSelect
  value={value}
  onValueChange={setValue}
  options={[
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
  ]}
/>`}
          filename="controlled.tsx"
        >
          <div className="w-full max-w-xs">
            <NativeSelect
              value={value}
              onValueChange={setValue}
              options={[
                { value: "react", label: "React" },
                { value: "vue", label: "Vue" },
              ]}
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Disabled"
          description="Disable the entire select."
          code={`<NativeSelect
  disabled
  placeholder="Cannot select"
  options={[{ value: "a", label: "Option A" }]}
/>`}
          filename="disabled.tsx"
        >
          <div className="w-full max-w-xs">
            <NativeSelect
              disabled
              placeholder="Cannot select"
              options={[{ value: "a", label: "Option A" }]}
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Disabled Options"
          description="Disable individual options."
          code={`<NativeSelect
  placeholder="Choose one"
  options={[
    { value: "a", label: "Available" },
    { value: "b", label: "Unavailable", disabled: true },
    { value: "c", label: "Available" },
  ]}
/>`}
          filename="disabled-options.tsx"
        >
          <div className="w-full max-w-xs">
            <NativeSelect
              placeholder="Choose one"
              options={[
                { value: "a", label: "Available" },
                { value: "b", label: "Unavailable", disabled: true },
                { value: "c", label: "Available" },
              ]}
            />
          </div>
        </ExampleBlock>
      </section>


    </ComponentDocPage>
  );
}
