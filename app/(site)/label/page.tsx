"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { Label } from "@/components/ui/Label";

const LABEL_SOURCE = `"use client";

import { cn } from "@/lib/cn";

interface LabelProps {
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
        "text-sm font-medium leading-none text-foreground",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      {children}
      {required && (
        <span className="ml-1 text-destructive" aria-hidden="true">*</span>
      )}
    </label>
  );
}`;

export default function LabelPage() {
  return (
    <ComponentDocPage
      name="Label"
      category="Forms"
      description="A form label with optional required indicator, disabled state, and accessible connection to form inputs."
    >
      <PreviewPanel filename="label-preview.tsx">
        <div className="flex w-full max-w-sm flex-col gap-5">
          <Label>Email</Label>
          <Label required>Required field</Label>
          <Label disabled>Disabled label</Label>
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={LABEL_SOURCE} filename="components/ui/Label/Label.tsx" defaultExpanded />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Basic"
          description="Simple label for form inputs."
          code={`import { Label } from "@/components/ui/Label";

<Label>Email</Label>`}
          filename="basic.tsx"
        >
          <Label>Email</Label>
        </ExampleBlock>

        <ExampleBlock
          title="Required"
          description="Label with a required indicator asterisk."
          code={`import { Label } from "@/components/ui/Label";

<Label required>Required field</Label>`}
          filename="required.tsx"
        >
          <Label required>Required field</Label>
        </ExampleBlock>

        <ExampleBlock
          title="Disabled"
          description="Label in a disabled state with reduced opacity."
          code={`import { Label } from "@/components/ui/Label";

<Label disabled>Disabled label</Label>`}
          filename="disabled.tsx"
        >
          <Label disabled>Disabled label</Label>
        </ExampleBlock>

        <ExampleBlock
          title="With Input"
          description="Label connected to a form input via htmlFor."
          code={`import { Label } from "@/components/ui/Label";

<div className="flex flex-col gap-2">
  <Label htmlFor="email">Email</Label>
  <input id="email" type="email" placeholder="you@example.com" className="h-10 w-full max-w-sm rounded-xl border border-border bg-card px-3 text-sm" />
</div>`}
          filename="with-input.tsx"
        >
          <div className="flex w-full max-w-sm flex-col gap-2">
            <Label htmlFor="email-demo">Email</Label>
            <input id="email-demo" type="email" placeholder="you@example.com" className="flex h-10 w-full rounded-xl border border-border bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="All States"
          description="Side-by-side comparison of all label states."
          code={`import { Label } from "@/components/ui/Label";

<div className="flex items-center gap-6">
  <Label>Default</Label>
  <Label required>Required</Label>
  <Label disabled>Disabled</Label>
</div>`}
          filename="all-states.tsx"
        >
          <div className="flex flex-wrap items-center gap-6">
            <Label>Default</Label>
            <Label required>Required</Label>
            <Label disabled>Disabled</Label>
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
                <td className="px-4 py-3 font-mono text-xs text-foreground">htmlFor</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">children</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">required</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">disabled</td>
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
      </section>
    </ComponentDocPage>
  );
}
