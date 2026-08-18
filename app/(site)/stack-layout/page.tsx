"use client";

import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { ArrowDown, ArrowRight, AlignVerticalSpaceAround, AlignHorizontalSpaceAround } from "lucide-react";

const installCommand = `npx component-library@latest add stack-layout`;

const usageCode = `import { Stack, Inline } from "@/components/ui/Stack";

<Stack gap={4}>
  <div>First</div>
  <div>Second</div>
  <div>Third</div>
</Stack>

<Inline gap={3} wrap>
  <span>Tag 1</span>
  <span>Tag 2</span>
  <span>Tag 3</span>
</Inline>`;

function StackVertical() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <ArrowDown className="h-4 w-4" />
        <span>Vertical Stack (gap: 4)</span>
      </div>
      <div className="flex flex-col gap-4 rounded-lg border p-4">
        <div className="flex h-10 items-center justify-center rounded-md bg-primary/10 text-sm font-medium text-primary">Item 1</div>
        <div className="flex h-10 items-center justify-center rounded-md bg-primary/10 text-sm font-medium text-primary">Item 2</div>
        <div className="flex h-10 items-center justify-center rounded-md bg-primary/10 text-sm font-medium text-primary">Item 3</div>
      </div>
    </div>
  );
}

function StackHorizontal() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <ArrowRight className="h-4 w-4" />
        <span>Horizontal Stack (gap: 3)</span>
      </div>
      <div className="flex items-center gap-3 rounded-lg border p-4">
        <div className="flex h-10 w-24 items-center justify-center rounded-md bg-green-500/10 text-sm font-medium text-green-600 dark:text-green-400">Left</div>
        <div className="flex h-10 w-24 items-center justify-center rounded-md bg-green-500/10 text-sm font-medium text-green-600 dark:text-green-400">Center</div>
        <div className="flex h-10 w-24 items-center justify-center rounded-md bg-green-500/10 text-sm font-medium text-green-600 dark:text-green-400">Right</div>
      </div>
    </div>
  );
}

function StackWithDivider() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <AlignVerticalSpaceAround className="h-4 w-4" />
        <span>Stack with Dividers</span>
      </div>
      <div className="flex flex-col rounded-lg border">
        <div className="flex h-12 items-center px-4 text-sm font-medium">Profile</div>
        <div className="h-px bg-border" />
        <div className="flex h-12 items-center px-4 text-sm font-medium">Notifications</div>
        <div className="h-px bg-border" />
        <div className="flex h-12 items-center px-4 text-sm font-medium">Security</div>
        <div className="h-px bg-border" />
        <div className="flex h-12 items-center px-4 text-sm font-medium">Integrations</div>
      </div>
    </div>
  );
}

function StackWithFill() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <AlignHorizontalSpaceAround className="h-4 w-4" />
        <span>Stack with Fill</span>
      </div>
      <div className="flex gap-2 rounded-lg border p-2">
        <div className="flex h-10 flex-1 items-center justify-center rounded-md bg-amber-500/10 text-xs font-medium text-amber-600 dark:text-amber-400">Auto</div>
        <div className="flex h-10 w-32 items-center justify-center rounded-md bg-amber-500/10 text-xs font-medium text-amber-600 dark:text-amber-400">Fixed</div>
        <div className="flex h-10 flex-1 items-center justify-center rounded-md bg-amber-500/10 text-xs font-medium text-amber-600 dark:text-amber-400">Auto</div>
      </div>
    </div>
  );
}

function StackNested() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">Nested stacks for complex layouts</p>
      <div className="flex flex-col gap-4 rounded-lg border p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center text-xs font-medium text-blue-600 dark:text-blue-400">A</div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">User Name</span>
            <span className="text-xs text-muted-foreground">user@example.com</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center text-xs font-medium text-green-600 dark:text-green-400">B</div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Another User</span>
            <span className="text-xs text-muted-foreground">another@example.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StackSpacingVariants() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">Different spacing options</p>
      <div className="grid grid-cols-3 gap-4">
        {(["gap-1", "gap-4", "gap-8"] as const).map((gap) => (
          <div key={gap} className="flex flex-col gap-3">
            <span className="text-xs font-medium text-muted-foreground">{gap}</span>
            <div className={`flex flex-col ${gap} rounded-lg border p-3`}>
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex h-8 items-center justify-center rounded bg-purple-500/10 text-xs font-medium text-purple-600 dark:text-purple-400">{i}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StackLayoutPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Stack Layout</h1>
          <Badge variant="primary">Layout</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Flexible vertical and horizontal stacking primitives with consistent spacing. Build complex layouts by composing simple stack components.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Vertical Stack</h2>
          <p className="mt-1 text-sm text-muted-foreground">Stack items vertically with consistent spacing.</p>
        </div>
        <ComponentPreview id="stack-vertical">
          <StackVertical />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Horizontal Stack</h2>
          <p className="mt-1 text-sm text-muted-foreground">Stack items horizontally with consistent spacing.</p>
        </div>
        <ComponentPreview id="stack-horizontal">
          <StackHorizontal />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Stack with Dividers</h2>
          <p className="mt-1 text-sm text-muted-foreground">Vertical stack with separator lines between items.</p>
        </div>
        <ComponentPreview id="stack-divider">
          <StackWithDivider />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Stack with Fill</h2>
          <p className="mt-1 text-sm text-muted-foreground">Mix fixed and flexible sizing within a horizontal stack.</p>
        </div>
        <ComponentPreview id="stack-fill">
          <StackWithFill />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Nested Stacks</h2>
          <p className="mt-1 text-sm text-muted-foreground">Combine vertical and horizontal stacks for complex layouts.</p>
        </div>
        <ComponentPreview id="stack-nested">
          <StackNested />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Spacing Variants</h2>
          <p className="mt-1 text-sm text-muted-foreground">Adjustable gap sizes for different density needs.</p>
        </div>
        <ComponentPreview id="stack-spacing">
          <StackSpacingVariants />
        </ComponentPreview>
      </section>

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
                <td className="px-4 py-3 font-mono text-xs">gap</td>
                <td className="px-4 py-3 text-muted-foreground">number | string</td>
                <td className="px-4 py-3 text-muted-foreground">4</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">direction</td>
                <td className="px-4 py-3 text-muted-foreground">{'{`"vertical" | "horizontal"`}'}</td>
                <td className="px-4 py-3 text-muted-foreground">{'{`"vertical"`}'}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">wrap</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
