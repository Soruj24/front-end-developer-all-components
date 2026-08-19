"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";

const CHECKBOX_GROUP_SOURCE = `"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

interface CheckboxGroupProps {
  options: { label: string; description?: string }[];
  defaultValue?: string[];
  onChange?: (values: string[]) => void;
}

export function CheckboxGroup({
  options,
  defaultValue = [],
  onChange,
}: CheckboxGroupProps) {
  const [selected, setSelected] = useState<string[]>(defaultValue);

  const toggle = (label: string) => {
    setSelected((prev) => {
      const next = prev.includes(label)
        ? prev.filter((value) => value !== label)
        : [...prev, label];
      onChange?.(next);
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-2">
      {options.map((opt) => {
        const checked = selected.includes(opt.label);
        return (
          <label key={opt.label} className="flex cursor-pointer items-start gap-3">
            <button
              type="button"
              role="checkbox"
              aria-checked={checked}
              onClick={() => toggle(opt.label)}
              className={cn(
                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors",
                checked ? "border-primary bg-primary" : "border-border"
              )}
            >
              {checked && <Check className="h-3 w-3 text-primary-foreground" strokeWidth={3} />}
            </button>
            <div>
              <p className="text-sm font-medium">{opt.label}</p>
              {opt.description && (
                <p className="text-xs text-muted-foreground">{opt.description}</p>
              )}
            </div>
          </label>
        );
      })}
    </div>
  );
}`;

const BASIC_EXAMPLE = `<CheckboxGroup
  options={[
    { label: "React" },
    { label: "Vue" },
    { label: "Angular" },
    { label: "Svelte" },
  ]}
/>`;

const DESCRIPTIONS_EXAMPLE = `<CheckboxGroup
  options={[
    { label: "Email notifications", description: "Receive email about account activity" },
    { label: "Marketing emails", description: "Receive tips and promotions" },
  ]}
/>`;

const CARDS_EXAMPLE = `<CheckboxGroup
  variant="card"
  options={[
    { label: "Basic", description: "Perfect for basic users" },
    { label: "Pro", description: "Perfect for pro users" },
    { label: "Enterprise", description: "Perfect for enterprise users" },
    { label: "Team", description: "Perfect for team users" },
  ]}
/>`;

function BasicCheckboxesDemo() {
  return (
    <div className="space-y-3 max-w-sm">
      {["React", "Vue", "Angular", "Svelte"].map((opt, i) => (
        <label key={opt} className="flex items-center gap-3 cursor-pointer">
          <div className={`h-5 w-5 rounded border-2 flex items-center justify-center ${i < 2 ? "bg-primary border-primary" : "border-border"}`}>
            {i < 2 && <svg className="h-3 w-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
          </div>
          <span className="text-sm">{opt}</span>
        </label>
      ))}
    </div>
  );
}

function DescriptionCheckboxesDemo() {
  return (
    <div className="space-y-4 max-w-sm">
      {[
        { label: "Email notifications", desc: "Receive email about account activity" },
        { label: "Marketing emails", desc: "Receive tips and promotions" },
      ].map((opt) => (
        <label key={opt.label} className="flex items-start gap-3 cursor-pointer">
          <div className="h-5 w-5 rounded border-2 border-primary bg-primary flex items-center justify-center mt-0.5 shrink-0">
            <svg className="h-3 w-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
          </div>
          <div>
            <p className="text-sm font-medium">{opt.label}</p>
            <p className="text-xs text-muted-foreground">{opt.desc}</p>
          </div>
        </label>
      ))}
    </div>
  );
}

function CardCheckboxesDemo() {
  return (
    <div className="grid grid-cols-2 gap-3 max-w-md">
      {["Basic", "Pro", "Enterprise", "Team"].map((plan, i) => (
        <div key={plan} className={`rounded-lg border p-4 cursor-pointer transition-colors ${i === 1 ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"}`}>
          <div className="flex items-center gap-2 mb-2">
            <div className={`h-4 w-4 rounded border-2 flex items-center justify-center ${i === 1 ? "bg-primary border-primary" : "border-border"}`}>
              {i === 1 && <svg className="h-2.5 w-2.5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
            </div>
            <span className="text-sm font-medium">{plan}</span>
          </div>
          <p className="text-xs text-muted-foreground">Perfect for {plan.toLowerCase()} users</p>
        </div>
      ))}
    </div>
  );
}

export default function CheckboxGroupPage() {
  return (
    <ComponentDocPage
      name="Checkbox Group"
      category="Forms"
      description="A checkbox group component for selecting multiple options with labels, descriptions, and indeterminate states."
    >
      <PreviewPanel filename="checkbox-group.tsx">
        <BasicCheckboxesDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={CHECKBOX_GROUP_SOURCE}
        filename="components/ui/CheckboxGroup/CheckboxGroup.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Basic Checkboxes" description="Simple checkbox list with labels." code={BASIC_EXAMPLE}>
          <BasicCheckboxesDemo />
        </ExampleBlock>
        <ExampleBlock title="With Descriptions" description="Checkboxes with additional description text." code={DESCRIPTIONS_EXAMPLE}>
          <DescriptionCheckboxesDemo />
        </ExampleBlock>
        <ExampleBlock title="Card Style" description="Checkboxes displayed as selectable cards." code={CARDS_EXAMPLE}>
          <CardCheckboxesDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}