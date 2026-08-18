"use client";

import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Dock } from "@/components/ui";
import { dockApps, minimalApps } from "@/components/dock/demo";

const installCommand = `npx component-library@latest add dock`;

const usageCode = `import { Dock } from "@/components/ui";

<Dock items={dockApps} ariaLabel="Application dock" />`;

export default function DockPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Dock
          </h1>
          <Badge variant="primary">3 examples</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A macOS-inspired launcher. Icons magnify around the cursor on
          pointer-capable devices, labels pop above on hover, running apps
          carry a dot, and everything — order included — is draggable,
          keyboard-accessible, responsive, and theme-aware.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-foreground">Magnifying Dock</h3>
            <p className="text-sm text-muted-foreground">Icons magnify around the cursor with smooth CSS transitions.</p>
          </div>
          <ComponentPreview id="dock-magnifying">
            <div className="flex w-full items-end justify-center overflow-x-auto py-14">
              <Dock items={dockApps} ariaLabel="Application dock" />
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-foreground">Minimal Dock</h3>
            <p className="text-sm text-muted-foreground">Same component, fewer features — ideal for compact toolbars.</p>
          </div>
          <ComponentPreview id="dock-minimal">
            <div className="flex w-full flex-col items-center gap-3 py-10">
              <Dock items={minimalApps} magnification={false} draggable={false} ariaLabel="Quick launch toolbar" />
              <p className="text-xs text-subtle">
                Same component, fewer features — ideal for compact toolbars that
                still need tooltips, active dots, and keyboard focus.
              </p>
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-foreground">Keyboard Navigation</h3>
            <p className="text-sm text-muted-foreground">Full keyboard support with arrow keys, Home/End, and Enter to launch.</p>
          </div>
          <ComponentPreview id="dock-keyboard">
            <div className="flex w-full flex-col items-center gap-4 py-10">
              <Dock items={dockApps} ariaLabel="Dock — keyboard demo" />
              <p className="text-xs text-subtle">
                Tab into the dock, then use{" "}
                <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">←</kbd>{" "}
                <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">→</kbd> to
                move between apps,{" "}
                <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">Home</kbd>/
                <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">End</kbd> to
                jump, and{" "}
                <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">Enter</kbd> to
                launch. Drag any icon to reorder.
              </p>
            </div>
          </ComponentPreview>
        </div>
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
                <td className="px-4 py-3 font-mono text-xs">items</td>
                <td className="px-4 py-3 text-muted-foreground">DockItem[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">magnification</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">draggable</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">ariaLabel</td>
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
