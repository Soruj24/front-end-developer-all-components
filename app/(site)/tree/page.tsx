"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { Tree } from "@/components/ui/Tree";
import type { TreeNode } from "@/components/ui/Tree";
import { Folder, File, FileCode, FileText, FileImage, FileJson, Package, Lock } from "lucide-react";

const TREE_SOURCE = `"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/cn";

export function Tree({ data, defaultExpanded = [], expanded: controlledExpanded, onExpand, selected: controlledSelected, onSelect, className }: TreeProps) {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const [internalSelected, setInternalSelected] = useState<string[]>([]);
  const expanded = controlledExpanded ?? internalExpanded;
  const selected = controlledSelected ?? internalSelected;

  const toggle = useCallback((id: string) => {
    const next = expanded.includes(id) ? expanded.filter((e) => e !== id) : [...expanded, id];
    onExpand?.(next);
    if (!controlledExpanded) setInternalExpanded(next);
  }, [expanded, onExpand, controlledExpanded]);

  const select = useCallback((id: string) => {
    onSelect?.(id);
    if (!controlledSelected) setInternalSelected([id]);
  }, [onSelect, controlledSelected]);

  return (
    <div className={cn("text-sm", className)}>
      {data.map((node) => (
        <TreeItem key={node.id} node={node} level={0} expanded={expanded} selected={selected} onToggle={toggle} onSelect={select} />
      ))}
    </div>
  );
}`;

const BASIC_SOURCE = `import { Tree } from "@/components/ui/Tree";
import { Folder, File, FileText } from "lucide-react";

const data: TreeNode[] = [
  {
    id: "1", label: "Documents",
    icon: <Folder className="h-4 w-4 text-yellow-500" />,
    children: [
      { id: "1-1", label: "report.pdf", icon: <FileText className="h-4 w-4 text-red-400" /> },
      { id: "1-2", label: "notes.txt", icon: <File className="h-4 w-4 text-blue-400" /> },
    ],
  },
];

<Tree data={data} defaultExpanded={["1"]} />`;

const PROJECT_SOURCE = `import { Tree } from "@/components/ui/Tree";
import { Package, Folder, FileCode } from "lucide-react";

const data: TreeNode[] = [
  {
    id: "root", label: "my-project", icon: <Package className="h-4 w-4 text-blue-500" />,
    children: [
      { id: "src", label: "src", icon: <Folder className="h-4 w-4 text-yellow-500" />,
        children: [
          { id: "app", label: "App.tsx", icon: <FileCode className="h-4 w-4 text-blue-400" /> },
        ],
      },
      { id: "package", label: "package.json", icon: <FileJson className="h-4 w-4 text-green-500" /> },
    ],
  },
];

<Tree data={data} defaultExpanded={["root", "src"]} />`;

const SELECTABLE_SOURCE = `"use client";
import { useState } from "react";
import { Tree } from "@/components/ui/Tree";

function SelectableTree() {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <div className="flex flex-col gap-3">
      <Tree data={data} defaultExpanded={["root"]} selected={selected} onSelect={(id) => setSelected([id])} />
      {selected.length > 0 && <p className="text-xs text-muted-foreground">Selected: <code>{selected[0]}</code></p>}
    </div>
  );
}`;

const CONTROLLED_SOURCE = `"use client";
import { useState } from "react";
import { Tree } from "@/components/ui/Tree";

function ControlledTree() {
  const [expanded, setExpanded] = useState<string[]>(["root"]);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <button onClick={() => setExpanded(["root", "src", "components"])}>Expand All</button>
        <button onClick={() => setExpanded([])}>Collapse All</button>
      </div>
      <Tree data={data} expanded={expanded} onExpand={setExpanded} />
    </div>
  );
}`;

const DISABLED_SOURCE = `import { Tree } from "@/components/ui/Tree";

const data: TreeNode[] = [{
  id: "root", label: "Root",
  children: [
    { id: "a", label: "Active item" },
    { id: "b", label: "Disabled item", disabled: true },
  ],
}];

<Tree data={data} defaultExpanded={["root"]} />`;

const basicTree: TreeNode[] = [
  { id: "1", label: "Documents", icon: <Folder className="h-4 w-4 text-yellow-500" />, children: [
    { id: "1-1", label: "report.pdf", icon: <FileText className="h-4 w-4 text-red-400" /> },
    { id: "1-2", label: "notes.txt", icon: <File className="h-4 w-4 text-blue-400" /> },
    { id: "1-3", label: "budget.xlsx", icon: <File className="h-4 w-4 text-green-500" /> },
  ]},
  { id: "2", label: "Pictures", icon: <Folder className="h-4 w-4 text-yellow-500" />, children: [
    { id: "2-1", label: "vacation.jpg", icon: <FileImage className="h-4 w-4 text-purple-400" /> },
    { id: "2-2", label: "family.png", icon: <FileImage className="h-4 w-4 text-purple-400" /> },
  ]},
];

const projectTree: TreeNode[] = [
  { id: "root", label: "my-project", icon: <Package className="h-4 w-4 text-blue-500" />, children: [
    { id: "src", label: "src", icon: <Folder className="h-4 w-4 text-yellow-500" />, children: [
      { id: "components", label: "components", icon: <Folder className="h-4 w-4 text-yellow-500" />, children: [
        { id: "button", label: "Button.tsx", icon: <FileCode className="h-4 w-4 text-blue-400" /> },
        { id: "input", label: "Input.tsx", icon: <FileCode className="h-4 w-4 text-blue-400" /> },
      ]},
      { id: "app", label: "App.tsx", icon: <FileCode className="h-4 w-4 text-blue-400" /> },
    ]},
    { id: "package", label: "package.json", icon: <FileJson className="h-4 w-4 text-green-500" /> },
  ]},
];

export default function TreePage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<string[]>(["root"]);

  return (
    <ComponentDocPage name="Tree" category="Data Display" description="Hierarchical tree view for file systems, organizational charts, and nested data structures. Supports expand/collapse, selection, icons, and deep nesting.">
      <PreviewPanel filename="tree-preview.tsx">
        <Tree data={basicTree} defaultExpanded={["1", "2"]} />
      </PreviewPanel>
      <SourceCodeViewer source={TREE_SOURCE} filename="components/ui/Tree.tsx" defaultExpanded />
      <div className="flex flex-col gap-6">
        <ExampleBlock title="Basic" description="Simple tree with folders and files." code={BASIC_SOURCE} filename="basic.tsx">
          <Tree data={basicTree} defaultExpanded={["1", "2"]} />
        </ExampleBlock>
        <ExampleBlock title="Project Structure" description="Code repository with nested directories." code={PROJECT_SOURCE} filename="project.tsx">
          <Tree data={projectTree} defaultExpanded={["root", "src"]} />
        </ExampleBlock>
        <ExampleBlock title="Selectable" description="Click to select nodes with feedback." code={SELECTABLE_SOURCE} filename="selectable.tsx">
          <div className="flex flex-col gap-3">
            <Tree data={projectTree} defaultExpanded={["root", "src", "components"]} selected={selected} onSelect={(id) => setSelected([id])} />
            {selected.length > 0 && <p className="text-xs text-muted-foreground">Selected: <code className="rounded bg-muted px-1 py-0.5">{selected[0]}</code></p>}
          </div>
        </ExampleBlock>
        <ExampleBlock title="Controlled" description="External controls for expand/collapse all." code={CONTROLLED_SOURCE} filename="controlled.tsx">
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <button onClick={() => setExpanded(["root", "src", "components"])} className="rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted">Expand All</button>
              <button onClick={() => setExpanded([])} className="rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted">Collapse All</button>
            </div>
            <Tree data={projectTree} expanded={expanded} onExpand={setExpanded} />
          </div>
        </ExampleBlock>
        <ExampleBlock title="Disabled Nodes" description="Certain nodes can be disabled and non-interactive." code={DISABLED_SOURCE} filename="disabled.tsx">
          <Tree data={[{ id: "root", label: "Root", icon: <Folder className="h-4 w-4 text-yellow-500" />, children: [
            { id: "a", label: "Active item", icon: <File className="h-4 w-4 text-green-500" /> },
            { id: "b", label: "Disabled item", icon: <Lock className="h-4 w-4 text-red-400" />, disabled: true },
            { id: "c", label: "Another active", icon: <File className="h-4 w-4 text-green-500" /> },
          ]}]} defaultExpanded={["root"]} />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
