"use client";

import { Field } from "@/components/ui/Field";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const FIELD_SOURCE = `"use client";

import { useId, cloneElement, isValidElement } from "react";
import { cn } from "@/lib/cn";
import type { FieldProps } from "./Field.types";

export function Field({ label, description, error, required, children, className, htmlFor }: FieldProps) {
  const autoId = useId();
  const id = htmlFor ?? autoId;

  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div>
        {isValidElement(children)
          ? cloneElement(children as React.ReactElement<{ id?: string }>, { id })
          : children}
      </div>

      {description && !error && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}`;

const DEFAULT_CODE = `import { Field } from "@/components/ui/Field";

<Field label="Email">
  <input type="email" placeholder="you@example.com" />
</Field>`;

const WITH_HINT_CODE = `import { Field } from "@/components/ui/Field";

<Field label="Password" description="Must be at least 8 characters.">
  <input type="password" placeholder="Enter password" />
</Field>`;

const WITH_ERROR_CODE = `import { Field } from "@/components/ui/Field";

<Field label="Username" error="Username must be at least 3 characters.">
  <input type="text" defaultValue="ab" />
</Field>`;

const REQUIRED_CODE = `import { Field } from "@/components/ui/Field";

<Field label="Email" required>
  <input type="email" placeholder="you@example.com" />
</Field>`;

export default function FieldPage() {
  return (
    <ComponentDocPage
      name="Field"
      category="Forms"
      description="Form field wrapper with label, hint, and validation error messages. Provides accessible grouping of form controls with their labels."
    >
      <PreviewPanel filename="field-demo.tsx">
        <div className="w-full max-w-sm">
          <Field label="Email">
            <input
              type="email"
              placeholder="you@example.com"
              className="flex h-10 w-full rounded-lg border border-black/[.08] bg-white px-3 py-2 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring dark:border-white/[.145] dark:bg-zinc-900"
            />
          </Field>
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={FIELD_SOURCE} filename="Field.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Default" description="Basic form field with label and input." code={DEFAULT_CODE}>
          <div className="w-full max-w-sm">
            <Field label="Email">
              <input
                type="email"
                placeholder="you@example.com"
                className="flex h-10 w-full rounded-lg border border-black/[.08] bg-white px-3 py-2 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring dark:border-white/[.145] dark:bg-zinc-900"
              />
            </Field>
          </div>
        </ExampleBlock>

        <ExampleBlock title="With Hint" description="Field with helper text below the input." code={WITH_HINT_CODE}>
          <div className="w-full max-w-sm">
            <Field label="Password" description="Must be at least 8 characters.">
              <input
                type="password"
                placeholder="Enter password"
                className="flex h-10 w-full rounded-lg border border-black/[.08] bg-white px-3 py-2 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring dark:border-white/[.145] dark:bg-zinc-900"
              />
            </Field>
          </div>
        </ExampleBlock>

        <ExampleBlock title="With Error" description="Field with validation error state." code={WITH_ERROR_CODE}>
          <div className="w-full max-w-sm">
            <Field label="Username" error="Username must be at least 3 characters.">
              <input
                type="text"
                defaultValue="ab"
                className="flex h-10 w-full rounded-lg border border-red-500 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 dark:border-red-500 dark:bg-zinc-900"
              />
            </Field>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Required" description="Mark a field as required with an asterisk." code={REQUIRED_CODE}>
          <div className="w-full max-w-sm">
            <Field label="Email" required>
              <input
                type="email"
                placeholder="you@example.com"
                className="flex h-10 w-full rounded-lg border border-black/[.08] bg-white px-3 py-2 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring dark:border-white/[.145] dark:bg-zinc-900"
              />
            </Field>
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
