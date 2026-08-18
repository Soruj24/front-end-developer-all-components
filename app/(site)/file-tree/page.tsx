"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Tree, TreeItem } from "@/components/ui";

const installCommand = "npx component-library@latest add file-tree";

const usageCode = `import { Tree, TreeItem } from "@/components/ui";

export default function Example() {
  return (
    <Tree>
      <TreeItem label="src" defaultOpen>
        <TreeItem label="components" />
        <TreeItem label="utils" />
      </TreeItem>
    </Tree>
  );
}`;

const fileTree: TreeItem[] = [
  { id: "src", label: "src", defaultOpen: true, children: [
    { id: "components", label: "components", children: [
      { id: "button", label: "Button.tsx" },
      { id: "card", label: "Card.tsx" },
      { id: "input", label: "Input.tsx" },
    ]},
    { id: "hooks", label: "hooks", children: [
      { id: "use-form", label: "useForm.ts" },
      { id: "use-debounce", label: "useDebounce.ts" },
    ]},
    { id: "app-tsx", label: "App.tsx" },
    { id: "index-tsx", label: "index.tsx" },
  ]},
  { id: "public", label: "public", children: [
    { id: "favicon", label: "favicon.ico" },
  ]},
  { id: "package", label: "package.json" },
];

export default function FileTreePage() {
  const [selected, setSelected] = useState<string>("button");

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">File Tree</h1>
          <Badge variant="primary">Navigation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Expandable file and folder tree view with icons, selection, and keyboard navigation for directory structures.
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
          <ComponentPreview id="file-tree-default">
            <div className="w-full max-w-xs">
              <Tree items={fileTree} onSelect={(id) => setSelected(id)} selectedId={selected} />
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Selected File Info</h3>
          <ComponentPreview id="file-tree-info">
            <div className="flex w-full gap-4">
              <div className="w-48">
                <Tree items={fileTree} onSelect={(id) => setSelected(id)} selectedId={selected} />
              </div>
              <div className="flex-1 rounded-lg border border-border p-4">
                <p className="text-sm font-medium">Selected: {selected}</p>
                <p className="text-xs text-muted-foreground mt-1">File details would appear here</p>
              </div>
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Compact</h3>
          <ComponentPreview id="file-tree-compact">
            <div className="w-full max-w-xs text-sm">
              {fileTree.map((node) => (
                <div key={node.id} className="py-0.5">
                  <span className="text-muted-foreground">📁</span> {node.label}
                  {node.children && (
                    <div className="ml-4">
                      {node.children.map((child) => (
                        <div key={child.id} className="py-0.5">
                          <span className="text-muted-foreground">{child.children ? "📁" : "📄"}</span> {child.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
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
                <td className="px-4 py-3 font-mono text-xs text-foreground">items</td>
                <td className="px-4 py-3 text-muted-foreground">TreeItem[]</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">onSelect</td>
                <td className="px-4 py-3 text-muted-foreground">(id: string) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">undefined</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
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