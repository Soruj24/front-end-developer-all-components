"use client";

import { Select } from "@/components/ui/Select";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const SELECT_SOURCE = `import { SelectHTMLAttributes, forwardRef, useId } from "react";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  placeholder?: string;
  options: SelectOption[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = "", label, error, placeholder, options, ...props }, ref) => {
    const uid = useId();
    const selectId = props.id ?? uid;
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={selectId} className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={\`flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground transition-colors focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 \${
            error
              ? "border-danger focus:border-danger focus:ring-danger"
              : "border-input focus:border-ring focus:ring-ring"
          } \${className}\`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-sm text-danger">{error}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";
export default Select;
export { Select };`;

const BASIC_CODE = `import { Select } from "@/components/ui/Select";

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
];

<Select options={options} label="Framework" placeholder="Choose..." />`;

const LABEL_CODE = `import { Select } from "@/components/ui/Select";

const options = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
];

<Select options={options} label="Country" helperText="Select your country" />`;

const ERROR_CODE = `import { Select } from "@/components/ui/Select";

const options = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
];

<Select options={options} label="Currency" error="This field is required" />`;

const DISABLED_CODE = `import { Select } from "@/components/ui/Select";

<Select options={[{ value: "a", label: "Option A" }]} disabled />`;

const frameworkOptions = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
];

const countryOptions = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
];

export default function SelectPage() {
  return (
    <ComponentDocPage
      name="Select"
      category="Forms"
      description="Custom styled select dropdown with label, placeholder, helper text, and error states."
    >
      <PreviewPanel filename="select-demo.tsx">
        <Select options={frameworkOptions} label="Framework" placeholder="Choose..." />
      </PreviewPanel>

      <SourceCodeViewer source={SELECT_SOURCE} filename="Select.tsx" defaultExpanded />

      <ExampleBlock title="Basic" code={BASIC_CODE}>
        <Select options={frameworkOptions} label="Framework" placeholder="Choose..." />
      </ExampleBlock>

      <ExampleBlock title="With Label" code={LABEL_CODE}>
        <Select options={countryOptions} label="Country" placeholder="Select..." />
      </ExampleBlock>

      <ExampleBlock title="Error State" code={ERROR_CODE}>
        <Select options={countryOptions} label="Currency" error="This field is required" />
      </ExampleBlock>

      <ExampleBlock title="Disabled" code={DISABLED_CODE}>
        <div className="flex flex-col gap-4">
          <Select options={[{ value: "a", label: "Option A" }]} disabled />
          <Select
            options={frameworkOptions}
            label="Framework"
            placeholder="Choose..."
            disabled
          />
        </div>
      </ExampleBlock>
    </ComponentDocPage>
  );
}
