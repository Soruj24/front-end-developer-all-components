"use client";

import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

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
        "pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-zinc-100 px-1.5 font-mono text-[10px] font-medium text-muted-foreground",
        "dark:bg-zinc-800 dark:border-zinc-700",
        className
      )}
    >
      {children}
    </kbd>
  );
}`;

const BASIC_SOURCE = `import { Kbd } from "@/components/ui/Kbd";

function BasicExample() {
  return (
    <div className="flex items-center gap-4">
      <Kbd>Ctrl</Kbd>
      <Kbd>Shift</Kbd>
      <Kbd>Enter</Kbd>
      <Kbd>Esc</Kbd>
    </div>
  );
}`;

const SHORTCUTS_SOURCE = `import { Kbd } from "@/components/ui/Kbd";

function ShortcutsExample() {
  return (
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
  );
}`;

function InlineKbd({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <kbd
      className={`pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-zinc-100 px-1.5 font-mono text-[10px] font-medium text-muted-foreground dark:bg-zinc-800 dark:border-zinc-700 ${className}`}
    >
      {children}
    </kbd>
  );
}

export default function KbdPage() {
  return (
    <ComponentDocPage
      name="Kbd"
      category="Data Display"
      description="Displays keyboard shortcuts or key combinations in a styled inline element."
    >
      <PreviewPanel filename="kbd-preview.tsx">
        <div className="flex items-center gap-4">
          <InlineKbd>Ctrl</InlineKbd>
          <InlineKbd>Shift</InlineKbd>
          <InlineKbd>Enter</InlineKbd>
          <InlineKbd>Esc</InlineKbd>
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={KBD_SOURCE}
        filename="components/ui/Kbd/Kbd.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock
          title="Basic Usage"
          description="Render individual key names with the Kbd component."
          code={BASIC_SOURCE}
          filename="basic.tsx"
        >
          <div className="flex items-center gap-4">
            <InlineKbd>Ctrl</InlineKbd>
            <InlineKbd>Shift</InlineKbd>
            <InlineKbd>Enter</InlineKbd>
            <InlineKbd>Esc</InlineKbd>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Keyboard Shortcuts"
          description="Combine multiple keys to represent keyboard shortcut combinations."
          code={SHORTCUTS_SOURCE}
          filename="shortcuts.tsx"
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <InlineKbd>Ctrl</InlineKbd>
              <span className="text-muted-foreground">+</span>
              <InlineKbd>K</InlineKbd>
              <span className="text-sm text-muted-foreground">Open search</span>
            </div>
            <div className="flex items-center gap-2">
              <InlineKbd>Ctrl</InlineKbd>
              <span className="text-muted-foreground">+</span>
              <InlineKbd>Shift</InlineKbd>
              <span className="text-muted-foreground">+</span>
              <InlineKbd>P</InlineKbd>
              <span className="text-sm text-muted-foreground">Command palette</span>
            </div>
            <div className="flex items-center gap-2">
              <InlineKbd>Ctrl</InlineKbd>
              <span className="text-muted-foreground">+</span>
              <InlineKbd>S</InlineKbd>
              <span className="text-sm text-muted-foreground">Save file</span>
            </div>
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
