"use client";

import { Field } from "@/components/_field";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add field`;

const usageCode = `import { Field, FieldLabel, FieldError, FieldHint } from "@/components/_field";

<Field>
  <FieldLabel>Email</FieldLabel>
  <Input placeholder="you@example.com" />
  <FieldHint>We'll never share your email.</FieldHint>
  <FieldError>This field is required.</FieldError>
</Field>`;

export default function FieldPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Field</h1>
          <Badge variant="primary">Forms</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Form field wrapper with label, hint, and validation error messages.
          Provides accessible grouping of form controls with their labels.
        </p>
      </header>

      {/* Installation */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      {/* Usage */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      {/* Default */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Default</h2>
          <p className="mt-1 text-sm text-muted-foreground">Basic form field with label and input.</p>
        </div>
        <ComponentPreview id="field-default">
          <div className="w-full max-w-sm">
            <Field>
              <label className="text-sm font-medium text-foreground">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="flex h-10 w-full rounded-lg border border-black/[.08] bg-white px-3 py-2 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring dark:border-white/[.145] dark:bg-zinc-900"
              />
            </Field>
          </div>
        </ComponentPreview>
      </section>

      {/* With Hint */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">With Hint</h2>
          <p className="mt-1 text-sm text-muted-foreground">Field with helper text below the input.</p>
        </div>
        <ComponentPreview id="field-hint">
          <div className="w-full max-w-sm">
            <Field>
              <label className="text-sm font-medium text-foreground">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="flex h-10 w-full rounded-lg border border-black/[.08] bg-white px-3 py-2 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring dark:border-white/[.145] dark:bg-zinc-900"
              />
              <p className="text-xs text-muted-foreground">Must be at least 8 characters.</p>
            </Field>
          </div>
        </ComponentPreview>
      </section>

      {/* With Error */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">With Error</h2>
          <p className="mt-1 text-sm text-muted-foreground">Field with validation error state.</p>
        </div>
        <ComponentPreview id="field-error">
          <div className="w-full max-w-sm">
            <Field>
              <label className="text-sm font-medium text-foreground">Username</label>
              <input
                type="text"
                defaultValue="ab"
                className="flex h-10 w-full rounded-lg border border-red-500 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 dark:border-red-500 dark:bg-zinc-900"
              />
              <p className="text-xs text-red-500">Username must be at least 3 characters.</p>
            </Field>
          </div>
        </ComponentPreview>
      </section>

      {/* API Reference */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">children</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">disabled</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">required</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
