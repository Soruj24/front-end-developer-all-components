"use client";

import { useState } from "react";
import { Select } from "@/components/ui/Select";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const SELECT_SOURCE = `"use client";

import { forwardRef, useId } from "react";
import { cn } from "@/lib/cn";

interface SelectOption { value: string; label: string; disabled?: boolean }

interface SelectProps {
  label?: string; error?: string; placeholder?: string; options: SelectOption[];
  value?: string; defaultValue?: string; onChange?: (value: string) => void;
  disabled?: boolean; required?: boolean; className?: string; name?: string; id?: string;
}

const ChevronIcon = () => (
  <svg className="pointer-events-none h-4 w-4 text-muted-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

export const Select = forwardRef(({ label, error, placeholder, options, value, defaultValue, onChange, disabled = false, required = false, className, name, id, ...props }, ref) => {
  const uid = useId();
  const selectId = id ?? uid;
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label htmlFor={selectId} className={cn("text-sm font-medium text-foreground", disabled && "opacity-50")}>{label}{required && <span className="ml-0.5 text-destructive">*</span>}</label>}
      <div className="relative">
        <select ref={ref} id={selectId} name={name} value={value} defaultValue={defaultValue} onChange={(e) => onChange?.(e.target.value)} disabled={disabled} required={required}
          className={cn("flex h-11 w-full appearance-none rounded-xl border bg-card px-3.5 pr-10 text-sm text-foreground transition-colors duration-150 hover:border-muted-foreground/30 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
            error ? "border-destructive focus-visible:ring-destructive/20" : "border-border", className)} {...props}>
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((opt) => <option key={opt.value} value={opt.value} disabled={opt.disabled}>{opt.label}</option>)}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"><ChevronIcon /></div>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
});
Select.displayName = "Select";`;

const frameworkOptions = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
];

const countryOptions = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
];

export default function SelectPage() {
  const [framework, setFramework] = useState("");

  return (
    <ComponentDocPage
      name="Select"
      category="Forms"
      description="Custom styled select dropdown with label, placeholder, required indicator, error states, and custom chevron icon."
    >
      <PreviewPanel filename="select-preview.tsx">
        <div className="w-full max-w-sm">
          <Select options={frameworkOptions} label="Framework" placeholder="Choose..." value={framework} onChange={setFramework} />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={SELECT_SOURCE}
        filename="components/ui/Select/Select.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Basic"
          description="Simple select with placeholder."
          code={`import { Select } from "@/components/ui/Select";\n\nconst options = [\n  { value: "react", label: "React" },\n  { value: "vue", label: "Vue" },\n  { value: "angular", label: "Angular" },\n];\n\n<Select options={options} label="Framework" placeholder="Choose..." />`}
          filename="basic.tsx"
        >
          <div className="w-full max-w-sm">
            <Select options={frameworkOptions} label="Framework" placeholder="Choose..." />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Controlled"
          description="Control the selected value externally."
          code={`const [framework, setFramework] = useState("");\n\n<Select options={options} value={framework} onChange={setFramework} />`}
          filename="controlled.tsx"
        >
          <div className="w-full max-w-sm">
            <Select options={frameworkOptions} label="Framework" placeholder="Choose..." value={framework} onChange={setFramework} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Required"
          description="Shows a required indicator asterisk."
          code={`<Select options={options} label="Country" placeholder="Select..." required />`}
          filename="required.tsx"
        >
          <div className="w-full max-w-sm">
            <Select options={countryOptions} label="Country" placeholder="Select..." required />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Error State"
          description="Display validation error message."
          code={`<Select options={options} label="Currency" error="This field is required" />`}
          filename="error.tsx"
        >
          <div className="w-full max-w-sm">
            <Select options={countryOptions} label="Currency" error="This field is required" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Disabled"
          description="Non-interactive select state."
          code={`<Select options={[{ value: "a", label: "Option A" }]} disabled />`}
          filename="disabled.tsx"
        >
          <div className="w-full max-w-sm">
            <Select
              options={frameworkOptions}
              label="Framework"
              placeholder="Choose..."
              disabled
            />
          </div>
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
                <td className="px-4 py-3 font-mono text-xs text-foreground">options</td>
                <td className="px-4 py-3 text-muted-foreground">SelectOption[]</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">label</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">placeholder</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">value</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">defaultValue</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">onChange</td>
                <td className="px-4 py-3 text-muted-foreground">(value: string) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">error</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">disabled</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">required</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
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
                <th className="px-4 py-3 text-left font-medium text-foreground">SelectOption</th>
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
