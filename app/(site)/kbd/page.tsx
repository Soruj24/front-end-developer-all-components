"use client";

import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { Kbd } from "@/components/ui/Kbd";

const KBD_SOURCE = `"use client";

import { cn } from "@/lib/cn";

interface KbdProps {
  children: React.ReactNode;
  className?: string;
}

export function Kbd({ children, className }: KbdProps) {
  return (
    <kbd
      className={cn(
        "pointer-events-none inline-flex h-6 min-w-[1.5rem] select-none items-center justify-center gap-1 rounded-lg border border-border bg-muted px-1.5 font-mono text-[11px] font-medium text-muted-foreground",
        "shadow-[0_1px_0_1px_var(--color-border)]",
        className,
      )}
    >
      {children}
    </kbd>
  );
}`;

export default function KbdPage() {
  return (
    <ComponentDocPage
      name="Kbd"
      category="Data Display"
      description="Displays keyboard shortcuts or key combinations in a styled inline element."
    >
      <PreviewPanel filename="kbd-preview.tsx">
        <div className="flex items-center gap-3">
          <Kbd>Ctrl</Kbd>
          <Kbd>Shift</Kbd>
          <Kbd>Enter</Kbd>
          <Kbd>Esc</Kbd>
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={KBD_SOURCE}
        filename="components/ui/Kbd/Kbd.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Basic Usage"
          description="Render individual key names."
          code={`import { Kbd } from "@/components/ui/Kbd";

<div className="flex items-center gap-3">
  <Kbd>Ctrl</Kbd>
  <Kbd>Shift</Kbd>
  <Kbd>Enter</Kbd>
  <Kbd>Esc</Kbd>
</div>`}
          filename="basic.tsx"
        >
          <div className="flex items-center gap-3">
            <Kbd>Ctrl</Kbd>
            <Kbd>Shift</Kbd>
            <Kbd>Enter</Kbd>
            <Kbd>Esc</Kbd>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Keyboard Shortcuts"
          description="Combine multiple keys to represent shortcut combinations."
          code={`import { Kbd } from "@/components/ui/Kbd";

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
    <span className="text-sm text-muted-foreground">Command palette</span>
  </div>
  <div className="flex items-center gap-2">
    <Kbd>Ctrl</Kbd>
    <span className="text-muted-foreground">+</span>
    <Kbd>S</Kbd>
    <span className="text-sm text-muted-foreground">Save file</span>
  </div>
</div>`}
          filename="shortcuts.tsx"
        >
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
              <span className="text-sm text-muted-foreground">Command palette</span>
            </div>
            <div className="flex items-center gap-2">
              <Kbd>Ctrl</Kbd>
              <span className="text-muted-foreground">+</span>
              <Kbd>S</Kbd>
              <span className="text-sm text-muted-foreground">Save file</span>
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Single Keys"
          description="Individual modifier and action keys."
          code={`import { Kbd } from "@/components/ui/Kbd";

<div className="flex flex-wrap items-center gap-2">
  <Kbd>Esc</Kbd>
  <Kbd>Tab</Kbd>
  <Kbd>Caps Lock</Kbd>
  <Kbd>Space</Kbd>
  <Kbd>Backspace</Kbd>
</div>`}
          filename="single-keys.tsx"
        >
          <div className="flex flex-wrap items-center gap-2">
            <Kbd>Esc</Kbd>
            <Kbd>Tab</Kbd>
            <Kbd>Caps Lock</Kbd>
            <Kbd>Space</Kbd>
            <Kbd>Backspace</Kbd>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Arrow Keys"
          description="Display arrow key shortcuts."
          code={`import { Kbd } from "@/components/ui/Kbd";

<div className="flex items-center gap-2">
  <Kbd>←</Kbd>
  <Kbd>→</Kbd>
  <Kbd>↑</Kbd>
  <Kbd>↓</Kbd>
</div>`}
          filename="arrows.tsx"
        >
          <div className="flex items-center gap-2">
            <Kbd>&larr;</Kbd>
            <Kbd>&rarr;</Kbd>
            <Kbd>&uarr;</Kbd>
            <Kbd>&darr;</Kbd>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="In Context"
          description="Kbd elements used inline with descriptive text."
          code={`import { Kbd } from "@/components/ui/Kbd";

<p className="text-sm text-muted-foreground">
  Press <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> to open search.
</p>`}
          filename="in-context.tsx"
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">
              Press <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> to open search.
            </p>
            <p className="text-sm text-muted-foreground">
              Use <Kbd>Tab</Kbd> to navigate and <Kbd>Enter</Kbd> to select.
            </p>
            <p className="text-sm text-muted-foreground">
              Press <Kbd>Esc</Kbd> to close the dialog.
            </p>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Custom Style"
          description="Override the default style with className."
          code={`import { Kbd } from "@/components/ui/Kbd";

<Kbd className="bg-primary/10 text-primary border-primary/20">Custom</Kbd>`}
          filename="custom.tsx"
        >
          <div className="flex items-center gap-3">
            <Kbd className="border-primary/20 bg-primary/10 text-primary shadow-[0_1px_0_1px_var(--color-primary)/20]">Custom</Kbd>
            <Kbd className="border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-[0_1px_0_1px_var(--color-emerald-500)/20]">Success</Kbd>
            <Kbd className="border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400 shadow-[0_1px_0_1px_var(--color-amber-500)/20]">Warning</Kbd>
          </div>
        </ExampleBlock>
      </section>


    </ComponentDocPage>
  );
}
