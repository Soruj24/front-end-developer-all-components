"use client";

import { useState } from "react";
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
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-foreground">
          {label}{required && <span className="ml-1 text-destructive">*</span>}
        </label>
      )}
      <div>{isValidElement(children) ? cloneElement(children as React.ReactElement<{ id?: string }>, { id }) : children}</div>
      {description && !error && <p className="text-xs text-muted-foreground">{description}</p>}
      {error && <p className="flex items-center gap-1.5 text-xs text-destructive"><svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg>{error}</p>}
    </div>
  );
}`;

const inputClass = "flex h-10 w-full rounded-xl border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:bg-card";

const inputErrorClass = "flex h-10 w-full rounded-xl border border-destructive bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-200 focus:outline-none focus:border-destructive focus:ring-2 focus:ring-destructive/20 dark:bg-card";

const DEFAULT_CODE = `import { Field } from "@/components/ui/Field";

<Field label="Email">
  <input type="email" placeholder="you@example.com" className="input" />
</Field>`;

const WITH_HINT_CODE = `import { Field } from "@/components/ui/Field";

<Field label="Password" description="Must be at least 8 characters.">
  <input type="password" placeholder="Enter password" className="input" />
</Field>`;

const WITH_ERROR_CODE = `import { Field } from "@/components/ui/Field";

<Field label="Username" error="Username must be at least 3 characters.">
  <input type="text" defaultValue="ab" className="input input-error" />
</Field>`;

const REQUIRED_CODE = `import { Field } from "@/components/ui/Field";

<Field label="Email" required>
  <input type="email" placeholder="you@example.com" className="input" />
</Field>`;

const TEXTAREA_CODE = `import { Field } from "@/components/ui/Field";

<Field label="Bio" description="Tell us about yourself.">
  <textarea placeholder="Write something..." className="input min-h-[80px]" />
</Field>`;

const SELECT_CODE = `import { Field } from "@/components/ui/Field";

<Field label="Role">
  <select className="input">
    <option>Select a role</option>
    <option>Developer</option>
    <option>Designer</option>
  </select>
</Field>`;

export default function FieldPage() {
  const [value, setValue] = useState("");

  return (
    <ComponentDocPage
      name="Field"
      category="Forms"
      description="Form field wrapper with label, hint, and validation error messages. Provides accessible grouping of form controls with their labels, auto-ID generation, and error state styling."
    >
      <PreviewPanel filename="field-preview.tsx">
        <div className="w-full max-w-sm">
          <Field label="Email" description="We will never share your email.">
            <input
              type="email"
              placeholder="you@example.com"
              className={inputClass}
            />
          </Field>
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={FIELD_SOURCE}
        filename="components/ui/Field/Field.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Default"
          description="Basic form field with label and input."
          code={DEFAULT_CODE}
          filename="default.tsx"
        >
          <div className="w-full max-w-sm">
            <Field label="Email">
              <input
                type="email"
                placeholder="you@example.com"
                className={inputClass}
              />
            </Field>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="With Hint"
          description="Field with helper text below the input."
          code={WITH_HINT_CODE}
          filename="hint.tsx"
        >
          <div className="w-full max-w-sm">
            <Field label="Password" description="Must be at least 8 characters.">
              <input
                type="password"
                placeholder="Enter password"
                className={inputClass}
              />
            </Field>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="With Error"
          description="Field with validation error state."
          code={WITH_ERROR_CODE}
          filename="error.tsx"
        >
          <div className="w-full max-w-sm">
            <Field label="Username" error="Username must be at least 3 characters.">
              <input
                type="text"
                defaultValue="ab"
                className={inputErrorClass}
              />
            </Field>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Required"
          description="Mark a field as required with an asterisk."
          code={REQUIRED_CODE}
          filename="required.tsx"
        >
          <div className="w-full max-w-sm">
            <Field label="Email" required>
              <input
                type="email"
                placeholder="you@example.com"
                className={inputClass}
              />
            </Field>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Textarea"
          description="Field wrapping a textarea element."
          code={TEXTAREA_CODE}
          filename="textarea.tsx"
        >
          <div className="w-full max-w-sm">
            <Field label="Bio" description="Tell us about yourself.">
              <textarea
                placeholder="Write something..."
                className={`${inputClass} min-h-[80px]`}
              />
            </Field>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Select"
          description="Field wrapping a select dropdown."
          code={SELECT_CODE}
          filename="select.tsx"
        >
          <div className="w-full max-w-sm">
            <Field label="Role">
              <select className={inputClass}>
                <option>Select a role</option>
                <option>Developer</option>
                <option>Designer</option>
              </select>
            </Field>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Interactive Validation"
          description="Live validation as you type."
          code={`import { useState } from "react";
import { Field } from "@/components/ui/Field";

function InteractiveField() {
  const [value, setValue] = useState("");
  const error = value.length > 0 && value.length < 3 ? "Must be at least 3 characters" : undefined;
  return (
    <Field label="Username" error={error} required>
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Type at least 3 chars" className={error ? "input input-error" : "input"} />
    </Field>
  );
}`}
          filename="interactive.tsx"
        >
          <div className="w-full max-w-sm">
            <Field
              label="Username"
              error={
                value.length > 0 && value.length < 3
                  ? "Must be at least 3 characters"
                  : undefined
              }
              required
            >
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Type at least 3 chars"
                className={
                  value.length > 0 && value.length < 3
                    ? inputErrorClass
                    : inputClass
                }
              />
            </Field>
          </div>
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}
