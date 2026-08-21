"use client";

import { useState } from "react";
import { RadioGroup } from "@/components/ui/RadioGroup";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const RADIOGROUP_SOURCE = `"use client";

import { cn } from "@/lib/cn";

interface RadioOption { value: string; label: string; description?: string; disabled?: boolean }

interface RadioGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
  options: RadioOption[];
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function RadioGroup({ value, onValueChange, options, orientation = "vertical", className }: RadioGroupProps) {
  return (
    <div role="radiogroup" className={cn(orientation === "horizontal" ? "flex flex-wrap gap-3" : "flex flex-col gap-1", className)}>
      {options.map((opt) => {
        const checked = value === opt.value;
        return (
          <label key={opt.value} className={cn("group flex cursor-pointer items-start gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150 hover:bg-muted/50 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary/50 has-[:focus-visible]:outline-none", opt.disabled && "pointer-events-none opacity-50")}>
            <span className={cn("mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-150", checked ? "border-primary bg-primary" : "border-muted-foreground/40 bg-background group-hover:border-muted-foreground/60")}>
              {checked && <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />}
            </span>
            <span className="flex flex-col gap-0.5">
              <span className={cn("text-sm font-medium leading-none", checked ? "text-foreground" : "text-muted-foreground")}>{opt.label}</span>
              {opt.description && <span className="text-xs leading-snug text-muted-foreground/70">{opt.description}</span>}
            </span>
            <input type="radio" value={opt.value} checked={checked} onChange={() => onValueChange?.(opt.value)} disabled={opt.disabled} tabIndex={0} className="sr-only" />
          </label>
        );
      })}
    </div>
  );
}`;

const fruitOptions = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

const sizeOptions = [
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
];

const disabledOptions = [
  { value: "active", label: "Active" },
  { value: "disabled", label: "Disabled", disabled: true },
];

const planOptions = [
  { value: "monthly", label: "Monthly", description: "Billed monthly" },
  { value: "yearly", label: "Yearly", description: "Billed annually, save 20%" },
];

const tierOptions = [
  { value: "free", label: "Free", description: "1 GB storage" },
  { value: "pro", label: "Pro", description: "100 GB storage" },
  { value: "enterprise", label: "Enterprise", description: "Unlimited storage", disabled: true },
];

export default function RadioGroupPage() {
  const [plan, setPlan] = useState("monthly");

  return (
    <ComponentDocPage
      name="Radio Group"
      category="Forms"
      description="A set of checkable buttons where only one can be checked at a time. Supports descriptions, disabled options, and horizontal layout."
    >
      <PreviewPanel filename="radio-group-preview.tsx">
        <RadioGroup options={fruitOptions} value="apple" />
      </PreviewPanel>

      <SourceCodeViewer
        source={RADIOGROUP_SOURCE}
        filename="components/ui/RadioGroup/RadioGroup.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Basic"
          description="Default vertical radio group."
          code={`import { RadioGroup } from "@/components/ui/RadioGroup";\n\nconst options = [\n  { value: "apple", label: "Apple" },\n  { value: "banana", label: "Banana" },\n  { value: "cherry", label: "Cherry" },\n];\n\n<RadioGroup options={options} value="apple" />`}
          filename="basic.tsx"
        >
          <RadioGroup options={fruitOptions} value="apple" />
        </ExampleBlock>

        <ExampleBlock
          title="Horizontal"
          description="Arrange options in a row."
          code={`<RadioGroup options={sizeOptions} value="md" orientation="horizontal" />`}
          filename="horizontal.tsx"
        >
          <RadioGroup options={sizeOptions} value="md" orientation="horizontal" />
        </ExampleBlock>

        <ExampleBlock
          title="With Descriptions"
          description="Add a description below each option label."
          code={`const planOptions = [\n  { value: "monthly", label: "Monthly", description: "Billed monthly" },\n  { value: "yearly", label: "Yearly", description: "Billed annually, save 20%" },\n];\n\n<RadioGroup options={planOptions} value="monthly" />`}
          filename="descriptions.tsx"
        >
          <RadioGroup options={planOptions} value="monthly" />
        </ExampleBlock>

        <ExampleBlock
          title="Disabled Option"
          description="Individual options can be disabled."
          code={`<RadioGroup options={disabledOptions} value="active" />`}
          filename="disabled.tsx"
        >
          <RadioGroup options={disabledOptions} value="active" />
        </ExampleBlock>

        <ExampleBlock
          title="Mixed"
          description="Combination of descriptions and disabled options."
          code={`<RadioGroup options={tierOptions} value="pro" />`}
          filename="mixed.tsx"
        >
          <RadioGroup options={tierOptions} value="pro" />
        </ExampleBlock>

        <ExampleBlock
          title="Controlled"
          description="Control the selected value externally."
          code={`const [plan, setPlan] = useState("monthly");\n\n<RadioGroup options={planOptions} value={plan} onValueChange={setPlan} />`}
          filename="controlled.tsx"
        >
          <RadioGroup options={planOptions} value={plan} onValueChange={setPlan} />
        </ExampleBlock>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          API Reference
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
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
                <td className="px-4 py-3 font-mono text-xs text-foreground">value</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">onValueChange</td>
                <td className="px-4 py-3 text-muted-foreground">(value: string) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">options</td>
                <td className="px-4 py-3 text-muted-foreground">RadioOption[]</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">orientation</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;horizontal&quot; | &quot;vertical&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;vertical&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">RadioOption</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">value</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">label</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">description</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">disabled</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </ComponentDocPage>
  );
}
