"use client";

import { Menubar } from "@/components/_menubar";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add menubar`;

const usageCode = `import { Menubar } from "@/components/_menubar";

const items = [
  {
    key: "file",
    label: "File",
    children: [
      { key: "new-tab", label: "New Tab", shortcut: "Ctrl+T" },
      { key: "print", label: "Print...", shortcut: "Ctrl+P" },
    ],
  },
];

<Menubar items={items} />`;

const defaultItems = [
  {
    key: "file",
    label: "File",
    children: [
      { key: "new-tab", label: "New Tab", shortcut: "Ctrl+T" },
      { key: "new-window", label: "New Window", shortcut: "Ctrl+N" },
      { key: "sep", label: "---" },
      { key: "print", label: "Print...", shortcut: "Ctrl+P" },
    ],
  },
  {
    key: "edit",
    label: "Edit",
    children: [
      { key: "undo", label: "Undo", shortcut: "Ctrl+Z" },
      { key: "redo", label: "Redo", shortcut: "Ctrl+Shift+Z" },
      { key: "sep", label: "---" },
      { key: "cut", label: "Cut", shortcut: "Ctrl+X" },
      { key: "copy", label: "Copy", shortcut: "Ctrl+C" },
      { key: "paste", label: "Paste", shortcut: "Ctrl+V" },
    ],
  },
  {
    key: "view",
    label: "View",
    children: [
      { key: "zoom-in", label: "Zoom In", shortcut: "Ctrl+=" },
      { key: "zoom-out", label: "Zoom Out", shortcut: "Ctrl+-" },
      { key: "sep", label: "---" },
      { key: "fullscreen", label: "Fullscreen", shortcut: "F11" },
    ],
  },
];

function CopyIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}

function CutIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L4.939 4.939m7.061l-2.879-2.879M12 12l2.879-2.879" />
    </svg>
  );
}

const iconItems = [
  {
    key: "edit",
    label: "Edit",
    children: [
      { key: "cut", label: "Cut", icon: <CutIcon />, shortcut: "Ctrl+X" },
      { key: "copy", label: "Copy", icon: <CopyIcon />, shortcut: "Ctrl+C" },
      { key: "paste", label: "Paste", shortcut: "Ctrl+V" },
    ],
  },
];

const disabledItems = [
  {
    key: "edit",
    label: "Edit",
    children: [
      { key: "undo", label: "Undo", shortcut: "Ctrl+Z", disabled: true },
      { key: "redo", label: "Redo", shortcut: "Ctrl+Shift+Z", disabled: true },
      { key: "sep", label: "---" },
      { key: "cut", label: "Cut", shortcut: "Ctrl+X" },
      { key: "copy", label: "Copy", shortcut: "Ctrl+C" },
    ],
  },
];

export default function MenubarPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Menubar</h1>
          <Badge variant="primary">Navigation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A horizontal menu bar with dropdown menus for application commands.
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
          <p className="mt-1 text-sm text-muted-foreground">
            A standard menubar with multiple dropdown menus.
          </p>
        </div>
        <ComponentPreview id="menubar-default">
          <Menubar items={defaultItems} />
        </ComponentPreview>
      </section>

      {/* With Icons */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">With Icons</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Menubar items with leading icons.
          </p>
        </div>
        <ComponentPreview id="menubar-icons">
          <Menubar items={iconItems} />
        </ComponentPreview>
      </section>

      {/* Disabled Items */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Disabled Items</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Menubar with disabled items.
          </p>
        </div>
        <ComponentPreview id="menubar-disabled">
          <Menubar items={disabledItems} />
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
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">items</td>
                <td className="px-4 py-3 text-muted-foreground">MenubarItem[]</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">placeholder</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
