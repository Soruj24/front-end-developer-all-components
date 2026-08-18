"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Kbd, Table, Input } from "@/components/ui";

const installCommand = "npx component-library@latest add keyboard-shortcuts";

const usageCode = `import { KeyboardShortcuts } from "@/components/ui";

export default function Example() {
  return <KeyboardShortcuts />;
}`;

const shortcuts = [
  { category: "General", items: [
    { keys: ["Ctrl", "S"], description: "Save document" },
    { keys: ["Ctrl", "Z"], description: "Undo" },
    { keys: ["Ctrl", "Shift", "Z"], description: "Redo" },
    { keys: ["Ctrl", "C"], description: "Copy" },
  ]},
  { category: "Navigation", items: [
    { keys: ["Ctrl", "K"], description: "Open search" },
    { keys: ["Ctrl", "/"], description: "Toggle sidebar" },
    { keys: ["Esc"], description: "Close modal" },
  ]},
  { category: "Editor", items: [
    { keys: ["Ctrl", "B"], description: "Bold text" },
    { keys: ["Ctrl", "I"], description: "Italic text" },
    { keys: ["Ctrl", "U"], description: "Underline text" },
    { keys: ["Tab"], description: "Indent" },
  ]},
];

export default function KeyboardShortcutsPage() {
  const [search, setSearch] = useState("");
  const filtered = shortcuts.map((cat) => ({
    ...cat,
    items: cat.items.filter((i) => i.description.toLowerCase().includes(search.toLowerCase())),
  })).filter((cat) => cat.items.length > 0);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Keyboard Shortcuts</h1>
          <Badge variant="primary">Utility</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Keyboard shortcut reference with search, category grouping, and key combination display.
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

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Default</h3>
          <ComponentPreview id="keyboard-shortcuts-default">
            <div className="w-full space-y-4">
              {shortcuts.map((cat) => (
                <div key={cat.category}>
                  <h4 className="mb-2 text-sm font-medium text-muted-foreground">{cat.category}</h4>
                  <div className="space-y-1">
                    {cat.items.map((item) => (
                      <div key={item.description} className="flex items-center justify-between rounded-md px-3 py-1.5 hover:bg-muted">
                        <span className="text-sm">{item.description}</span>
                        <div className="flex gap-1">
                          {item.keys.map((key) => <Kbd key={key}>{key}</Kbd>)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Searchable</h3>
          <ComponentPreview id="keyboard-shortcuts-search">
            <div className="w-full">
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search shortcuts..." className="mb-3" />
              {filtered.map((cat) => (
                <div key={cat.category} className="mb-3">
                  <h4 className="mb-1 text-xs font-medium text-muted-foreground">{cat.category}</h4>
                  {cat.items.map((item) => (
                    <div key={item.description} className="flex items-center justify-between rounded px-2 py-1 text-sm">
                      <span>{item.description}</span>
                      <div className="flex gap-1">
                        {item.keys.map((key) => <Kbd key={key} className="text-xs">{key}</Kbd>)}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Table View</h3>
          <ComponentPreview id="keyboard-shortcuts-table">
            <Table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-3 py-2 text-left text-sm font-medium">Action</th>
                  <th className="px-3 py-2 text-right text-sm font-medium">Shortcut</th>
                </tr>
              </thead>
              <tbody>
                {shortcuts[0].items.map((item) => (
                  <tr key={item.description} className="border-b border-border">
                    <td className="px-3 py-2 text-sm">{item.description}</td>
                    <td className="px-3 py-2 text-right"><div className="flex justify-end gap-1">{item.keys.map((k) => <Kbd key={k}>{k}</Kbd>)}</div></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </ComponentPreview>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Default</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">shortcuts</td>
                <td className="px-4 py-3 text-muted-foreground">ShortcutGroup[]</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">undefined</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}