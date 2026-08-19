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
import type { RadioGroupProps } from "./RadioGroup.types";

export function RadioGroup({
  value,
  onValueChange,
  options,
  orientation = "vertical",
  className,
}: RadioGroupProps) {
  return (
    <div
      role="radiogroup"
      className={cn(
        orientation === "horizontal" ? "flex flex-wrap gap-4" : "flex flex-col gap-2",
        className
      )}
    >
      {options.map((opt) => (
        <label
          key={opt.value}
          className={cn(
            "flex items-center space-x-2",
            opt.disabled && "cursor-not-allowed opacity-50"
          )}
        >
          <input
            type="radio"
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onValueChange?.(opt.value)}
            disabled={opt.disabled}
            className="h-4 w-4 border-zinc-300 text-zinc-900 focus:ring-zinc-400 dark:border-zinc-600 dark:focus:ring-zinc-500"
          />
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {opt.label}
          </span>
        </label>
      ))}
    </div>
  );
}`;

const BASIC_CODE = `import { RadioGroup } from "@/components/ui/RadioGroup";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

<RadioGroup options={options} defaultValue="apple" />`;

const HORIZONTAL_CODE = `import { RadioGroup } from "@/components/ui/RadioGroup";

const options = [
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
];

<RadioGroup options={options} defaultValue="md" orientation="horizontal" />`;

const DISABLED_CODE = `import { RadioGroup } from "@/components/ui/RadioGroup";

const options = [
  { value: "active", label: "Active" },
  { value: "disabled", label: "Disabled", disabled: true },
];

<RadioGroup options={options} defaultValue="active" />`;

const CONTROLLED_CODE = `import { useState } from "react";
import { RadioGroup } from "@/components/ui/RadioGroup";

const options = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

function PlanSelector() {
  const [value, setValue] = useState("monthly");

  return (
    <RadioGroup
      options={options}
      value={value}
      onValueChange={setValue}
    />
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
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

export default function RadioGroupPage() {
  const [plan, setPlan] = useState("monthly");

  return (
    <ComponentDocPage
      name="Radio Group"
      category="Forms"
      description="A set of checkable buttons where only one can be checked at a time."
    >
      <PreviewPanel filename="radio-group-demo.tsx">
        <RadioGroup options={fruitOptions} defaultValue="apple" />
      </PreviewPanel>

      <SourceCodeViewer
        source={RADIOGROUP_SOURCE}
        filename="RadioGroup.tsx"
        defaultExpanded
      />

      <ExampleBlock title="Basic" code={BASIC_CODE}>
        <RadioGroup options={fruitOptions} defaultValue="apple" />
      </ExampleBlock>

      <ExampleBlock title="Horizontal" code={HORIZONTAL_CODE}>
        <RadioGroup options={sizeOptions} defaultValue="md" orientation="horizontal" />
      </ExampleBlock>

      <ExampleBlock title="Disabled Option" code={DISABLED_CODE}>
        <RadioGroup options={disabledOptions} defaultValue="active" />
      </ExampleBlock>

      <ExampleBlock title="Controlled" code={CONTROLLED_CODE}>
        <RadioGroup options={planOptions} value={plan} onValueChange={setPlan} />
      </ExampleBlock>
    </ComponentDocPage>
  );
}
