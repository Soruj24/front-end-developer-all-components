"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { Label } from "@/components/ui/Label";

const LABEL_SOURCE = `import { cn } from "@/lib/cn";

export interface LabelProps {
  htmlFor?: string;
  children: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Label({ htmlFor, children, required, disabled, className }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}`;

const BASIC_EXAMPLE = `<Label>Email</Label>`;

const REQUIRED_EXAMPLE = `<Label required>Required field</Label>`;

const DISABLED_EXAMPLE = `<Label disabled>Disabled label</Label>`;

const HTMLFOR_EXAMPLE = `<div className="flex flex-col gap-2">
  <Label htmlFor="email">Email</Label>
  <input id="email" type="email" className="rounded border px-3 py-2 text-sm" />
</div>`;

export default function LabelPage() {
  return (
    <ComponentDocPage
      name="Label"
      category="Forms"
      description="A form label with optional required indicator, disabled state, and accessible connection to form inputs."
    >
      <PreviewPanel filename="label-preview">
        <div className="flex w-full max-w-lg flex-col gap-4">
          <Label>Email</Label>
          <Label required>Required field</Label>
          <Label disabled>Disabled label</Label>
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={LABEL_SOURCE} filename="Label.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Basic" description="Simple label for form inputs." code={BASIC_EXAMPLE}>
          <Label>Email</Label>
        </ExampleBlock>

        <ExampleBlock title="Required" description="Label with a required indicator." code={REQUIRED_EXAMPLE}>
          <Label required>Required field</Label>
        </ExampleBlock>

        <ExampleBlock title="Disabled" description="Label in a disabled state." code={DISABLED_EXAMPLE}>
          <Label disabled>Disabled label</Label>
        </ExampleBlock>

        <ExampleBlock title="With Input" description="Label connected to a form input via htmlFor." code={HTMLFOR_EXAMPLE}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <input id="email" type="email" className="rounded border px-3 py-2 text-sm" />
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}