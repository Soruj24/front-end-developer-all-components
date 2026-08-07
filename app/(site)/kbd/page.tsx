"use client";

import { Kbd } from "@/components/_kbd";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add kbd`;

const usageCode = `import { Kbd } from "@/components/_kbd"

<Kbd>Ctrl</Kbd>
<Kbd variant="outline">Shift</Kbd>
<Kbd size="lg">Enter</Kbd>`;

export default function KbdPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Kbd
          </h1>
          <Badge variant="primary">Base UI</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Displays keyboard shortcuts or key combinations.
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

      {/* Variants */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Variants
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Different visual styles for the Kbd component.
          </p>
        </div>
        <ComponentPreview id="kbd-variants">
          <div className="flex items-center gap-4">
            <Kbd variant="default">Default</Kbd>
            <Kbd variant="outline">Outline</Kbd>
            <Kbd variant="ghost">Ghost</Kbd>
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
            Different sizes for the Kbd component.
          </p>
        </div>
        <ComponentPreview id="kbd-sizes">
          <div className="flex items-center gap-4">
            <Kbd size="sm">Small</Kbd>
            <Kbd size="md">Medium</Kbd>
            <Kbd size="lg">Large</Kbd>
          </div>
        </ComponentPreview>
      </section>

      {/* Shortcut */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Shortcut
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Keyboard shortcut combinations.
          </p>
        </div>
        <ComponentPreview id="kbd-shortcut">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Kbd>Ctrl</Kbd>
              <span className="text-muted-foreground">+</span>
              <Kbd>K</Kbd>
              <span className="text-sm text-muted-foreground">Open search</span>
            </div>
            <div className="flex items-center gap-2">
              <Kbd>Ctrl</Kbd>
              <span className="text-muted-foreground">+</span>
              <Kbd>Shift</Kbd>
              <span className="text-muted-foreground">+</span>
              <Kbd>P</Kbd>
              <span className="text-sm text-muted-foreground">
                Command palette
              </span>
            </div>
          </div>
        </ComponentPreview>
      </section>
    </div>
  );
}
