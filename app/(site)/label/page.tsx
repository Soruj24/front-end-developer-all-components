"use client";

import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add label`;

const usageCode = `import { Label } from "@/components/_label";

<Label>Email</Label>
<Label required>Required field</Label>
<Label disabled>Disabled</Label>`;

export default function LabelPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Label
          </h1>
          <Badge variant="primary">Forms</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A form label with optional required indicator, disabled state, and
          accessible connection to form inputs.
        </p>
      </header>

      {/* Installation */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <CodeBlock
          code={installCommand}
          filename="Terminal"
          label="bash"
          variant="terminal"
        />
      </section>

      {/* Usage */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Usage
        </h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      {/* Default */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Default
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Basic label with optional required indicator.
          </p>
        </div>
        <ComponentPreview id="label-default">
          <div className="flex flex-col gap-4">
            <label className="text-sm font-medium text-foreground">Email</label>
            <label className="text-sm font-medium text-foreground">
              Required <span className="text-red-500">*</span>
            </label>
            <label className="text-sm font-medium text-foreground">
              Optional (no indicator)
            </label>
          </div>
        </ComponentPreview>
      </section>

      {/* Sizes */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Sizes
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Different label sizes.
          </p>
        </div>
        <ComponentPreview id="label-sizes">
          <div className="flex flex-col gap-4">
            <label className="text-xs font-medium text-muted-foreground">
              Small label
            </label>
            <label className="text-sm font-medium text-foreground">
              Default label
            </label>
            <label className="text-base font-semibold text-foreground">
              Large label
            </label>
          </div>
        </ComponentPreview>
      </section>

      {/* Disabled */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Disabled
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Label in disabled state.
          </p>
        </div>
        <ComponentPreview id="label-disabled">
          <div className="flex flex-col gap-4">
            <label className="text-sm font-medium text-muted-foreground/50">
              Disabled label
            </label>
            <div className="flex items-center gap-2">
              <input type="checkbox" disabled className="rounded" />
              <label className="text-sm font-medium text-muted-foreground/50">
                Accept terms (disabled)
              </label>
            </div>
          </div>
        </ComponentPreview>
      </section>
    </div>
  );
}
