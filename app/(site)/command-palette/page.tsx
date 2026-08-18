"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { CommandPalette, type CommandItem } from "@/components/ui";
import { demoCommands, nestedCommands } from "@/components/command-palette/demo";

const installCommand = `npx component-library@latest add command-palette`;

const usageCode = `import { CommandPalette } from "@/components/ui";

<CommandPalette
  items={commands}
  open={open}
  onOpenChange={setOpen}
  storageKey="command-palette"
/>`;

function wireActions(cmds: CommandItem[], onRun: (label: string) => void): CommandItem[] {
  return cmds.map((cmd) => ({
    ...cmd,
    onSelect: cmd.onSelect ?? (() => onRun(cmd.label)),
    children: cmd.children ? wireActions(cmd.children, onRun) : cmd.children,
  }));
}

function TriggerButton({ label, onOpen, kbd }: { label: string; onOpen: () => void; kbd?: boolean }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm text-muted-foreground shadow-card transition-colors hover:text-foreground"
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
        />
      </svg>
      {label}
      {kbd && (
        <kbd className="rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium">
          Ctrl K
        </kbd>
      )}
    </button>
  );
}

function ActionHint({ lastAction }: { lastAction: string | null }) {
  return (
    <p className="min-h-5 text-xs text-subtle">
      {lastAction ? (
        <span className="inline-flex items-center gap-1.5">
          <span className="text-success">●</span> Last action: {lastAction}
        </span>
      ) : (
        "Select a command to see it run."
      )}
    </p>
  );
}

export default function CommandPalettePage() {
  const [open, setOpen] = useState(false);
  const [openNested, setOpenNested] = useState(false);
  const [openQuick, setOpenQuick] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);

  const fullItems = wireActions(demoCommands, setLastAction);
  const nestedItems = wireActions(nestedCommands, setLastAction);
  const quickItems = wireActions(
    demoCommands.filter((c) => c.group === "Appearance" || c.group === "Maintenance"),
    setLastAction
  );

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Command Palette
          </h1>
          <Badge variant="primary">3 examples</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A Raycast-style command palette with a global Ctrl+K shortcut, global
          search with highlights, grouped and nested commands, recents,
          favorites, pinned commands, and full keyboard navigation.
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
            <h3 className="text-lg font-medium text-foreground">Full Command Palette</h3>
            <p className="text-sm text-muted-foreground">Complete palette with groups, recents, and keyboard shortcuts.</p>
          </div>
          <ComponentPreview id="command-palette-full">
            <div className="flex w-full flex-col items-center gap-4 py-6">
              <TriggerButton label="Search commands" onOpen={() => setOpen(true)} kbd />
              <ActionHint lastAction={lastAction} />
              <CommandPalette
                items={fullItems}
                open={open}
                onOpenChange={setOpen}
                storageKey="page:command-palette-full"
              />
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-foreground">Nested Commands</h3>
            <p className="text-sm text-muted-foreground">Drill into submenus with arrow keys and backspace.</p>
          </div>
          <ComponentPreview id="command-palette-nested">
            <div className="flex w-full flex-col items-center gap-4 py-6">
              <TriggerButton label="Nested commands" onOpen={() => setOpenNested(true)} />
              <p className="text-xs text-subtle">
                Enter / → drills in · Backspace / ← goes back · Esc exits a submenu
              </p>
              <CommandPalette
                items={nestedItems}
                open={openNested}
                onOpenChange={setOpenNested}
                bindShortcut={false}
                storageKey="page:command-palette-nested"
              />
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-foreground">Quick Actions</h3>
            <p className="text-sm text-muted-foreground">Compact variant with custom width and height.</p>
          </div>
          <ComponentPreview id="command-palette-quick">
            <div className="flex w-full flex-col items-center gap-4 py-6">
              <TriggerButton label="Quick actions" onOpen={() => setOpenQuick(true)} />
              <ActionHint lastAction={lastAction} />
              <CommandPalette
                items={quickItems}
                open={openQuick}
                onOpenChange={setOpenQuick}
                bindShortcut={false}
                placeholder="Type an action..."
                width={420}
                maxHeight={320}
                storageKey="page:command-palette-quick"
              />
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
                <td className="px-4 py-3 text-muted-foreground">CommandItem[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">open</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onOpenChange</td>
                <td className="px-4 py-3 text-muted-foreground">(open: boolean) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">placeholder</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;Type a command...&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">width</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">560</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">maxHeight</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">440</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">storageKey</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">bindShortcut</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
