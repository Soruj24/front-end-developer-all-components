"use client";

import { useState } from "react";
import { Tree, type TreeNode } from "@/components/ui/Tree";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const TREE_SOURCE = `"use client";

import { useState, useCallback, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface TreeNode { id: string; label: string; children?: TreeNode[]; icon?: ReactNode; disabled?: boolean; }
export interface TreeProps { data: TreeNode[]; defaultExpanded?: string[]; expanded?: string[]; onExpand?: (ids: string[]) => void; selected?: string[]; onSelect?: (id: string) => void; className?: string; }
export interface TreeItemProps { node: TreeNode; level?: number; expanded: string[]; selected: string[]; onToggle: (id: string) => void; onSelect: (id: string) => void; }

function FolderIcon({ className }: { className?: string }) {
  return <svg className={cn("h-4 w-4", className)} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" /></svg>;
}

function FileIcon({ className }: { className?: string }) {
  return <svg className={cn("h-4 w-4", className)} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>;
}

export function Tree({ data, defaultExpanded = [], expanded: controlledExpanded, onExpand, selected: controlledSelected, onSelect, className }: TreeProps) {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const [internalSelected, setInternalSelected] = useState<string[]>([]);
  const expanded = controlledExpanded ?? internalExpanded;
  const selected = controlledSelected ?? internalSelected;
  const toggle = useCallback((id: string) => { const next = expanded.includes(id) ? expanded.filter((e) => e !== id) : [...expanded, id]; onExpand?.(next); if (!controlledExpanded) setInternalExpanded(next); }, [expanded, onExpand, controlledExpanded]);
  const select = useCallback((id: string) => { onSelect?.(id); if (!controlledSelected) setInternalSelected([id]); }, [onSelect, controlledSelected]);
  return <div role="tree" className={cn("flex flex-col gap-0.5 text-sm", className)}>{data.map((node) => <TreeItem key={node.id} node={node} level={0} expanded={expanded} selected={selected} onToggle={toggle} onSelect={select} />)}</div>;
}

export function TreeItem({ node, level = 0, expanded, selected, onToggle, onSelect }: TreeItemProps) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expanded.includes(node.id);
  const isSelected = selected.includes(node.id);
  return (
    <div role="treeitem" aria-expanded={hasChildren ? isExpanded : undefined} aria-selected={isSelected}>
      <button type="button" disabled={node.disabled} onClick={() => hasChildren ? onToggle(node.id) : onSelect(node.id)}
        className={cn("group flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm outline-none transition-colors duration-150 hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-card", isSelected && "bg-primary/10 text-primary font-medium", node.disabled && "pointer-events-none opacity-50")}
        style={{ paddingLeft: \`\${level * 16 + 8}px\` }}>
        {hasChildren && <svg className={cn("h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200", isExpanded && "rotate-90")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>}
        {!hasChildren && <span className="w-3.5" />}
        {node.icon ?? (hasChildren ? <FolderIcon className={cn("shrink-0", isExpanded ? "text-primary" : "text-muted-foreground")} /> : <FileIcon className="shrink-0 text-muted-foreground" />)}
        <span className="truncate">{node.label}</span>
      </button>
      {hasChildren && isExpanded && <div role="group">{node.children!.map((child) => <TreeItem key={child.id} node={child} level={level + 1} expanded={expanded} selected={selected} onToggle={onToggle} onSelect={onSelect} />)}</div>}
    </div>
  );
}`;

const fileTree: TreeNode[] = [
  { id: "src", label: "src", children: [
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

const DEFAULT_CODE = `import { Tree, type TreeNode } from "@/components/ui/Tree";

const data: TreeNode[] = [
  { id: "src", label: "src", children: [
    { id: "components", label: "components", children: [
      { id: "button", label: "Button.tsx" },
    ]},
  ]},
];

<Tree data={data} defaultExpanded={["src"]} onSelect={(id) => console.log(id)} />`;

const CONTROLLED_CODE = `import { useState } from "react";
import { Tree, type TreeNode } from "@/components/ui/Tree";

function ControlledTree() {
  const [selected, setSelected] = useState("button");
  const [expanded, setExpanded] = useState(["src"]);
  return (
    <div className="flex gap-4">
      <Tree data={data} expanded={expanded} onExpand={setExpanded} selected={[selected]} onSelect={setSelected} />
      <div className="rounded-xl border border-border bg-card p-4 text-sm">Selected: {selected}</div>
    </div>
  );
}`;

const CUSTOM_ICONS_CODE = `import { Tree, type TreeNode } from "@/components/ui/Tree";

const customTree: TreeNode[] = [
  { id: "root", label: "project", icon: <span className="text-lg">🚀</span>, children: [
    { id: "readme", label: "README.md", icon: <span className="text-lg">📖</span> },
    { id: "config", label: "config.json", icon: <span className="text-lg">⚙️</span> },
  ]},
];

<Tree data={customTree} defaultExpanded={["root"]} />`;

const DISABLED_CODE = `import { Tree, type TreeNode } from "@/components/ui/Tree";

const tree: TreeNode[] = [
  { id: "a", label: "Accessible", children: [
    { id: "b", label: "Disabled item", disabled: true },
  ]},
];

<Tree data={tree} defaultExpanded={["a"]} />`;

const COMPACT_CODE = `import { Tree, type TreeNode } from "@/components/ui/Tree";

// Small tree for tight layouts
<Tree data={smallTree} className="text-xs" defaultExpanded={["root"]} />`;

function CustomIconTree() {
  const customTree: TreeNode[] = [
    { id: "root", label: "project", icon: <span className="text-base leading-none">&#128640;</span>, children: [
      { id: "readme", label: "README.md", icon: <span className="text-base leading-none">&#128214;</span> },
      { id: "config", label: "config.json", icon: <span className="text-base leading-none">&#9881;&#65039;</span> },
      { id: "src", label: "src", children: [
        { id: "main", label: "main.ts", icon: <span className="text-base leading-none">&#128196;</span> },
      ]},
    ]},
  ];
  return <Tree data={customTree} defaultExpanded={["root"]} />;
}

function DisabledTree() {
  const tree: TreeNode[] = [
    { id: "root", label: "Project", children: [
      { id: "active", label: "Active file" },
      { id: "locked", label: "Locked file", disabled: true },
    ]},
  ];
  return <Tree data={tree} defaultExpanded={["root"]} />;
}

export default function FileTreePage() {
  const [selected, setSelected] = useState("button");

  return (
    <ComponentDocPage
      name="File Tree"
      category="Navigation"
      description="Expandable file and folder tree view with icons, selection, keyboard navigation, and aria attributes for directory structures."
    >
      <PreviewPanel filename="file-tree-preview.tsx">
        <div className="w-full max-w-xs">
          <Tree
            data={fileTree}
            defaultExpanded={["src"]}
            onSelect={(id) => setSelected(id)}
            selected={[selected]}
          />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={TREE_SOURCE}
        filename="components/ui/Tree/Tree.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Default"
          description="Basic file tree with selection."
          code={DEFAULT_CODE}
          filename="default.tsx"
        >
          <div className="w-full max-w-xs">
            <Tree
              data={fileTree}
              defaultExpanded={["src"]}
              onSelect={(id) => setSelected(id)}
              selected={[selected]}
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="With Info Panel"
          description="Tree with selected file details shown alongside."
          code={CONTROLLED_CODE}
          filename="controlled.tsx"
        >
          <div className="flex w-full gap-4">
            <div className="w-56">
              <Tree
                data={fileTree}
                defaultExpanded={["src"]}
                onSelect={(id) => setSelected(id)}
                selected={[selected]}
              />
            </div>
            <div className="flex-1 rounded-xl border border-border bg-card p-4">
              <p className="text-sm font-medium text-foreground">Selected: {selected}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                File details would appear here
              </p>
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Custom Icons"
          description="Override default icons with custom elements."
          code={CUSTOM_ICONS_CODE}
          filename="custom-icons.tsx"
        >
          <div className="w-full max-w-xs">
            <CustomIconTree />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Disabled Items"
          description="Items can be marked as disabled."
          code={DISABLED_CODE}
          filename="disabled.tsx"
        >
          <div className="w-full max-w-xs">
            <DisabledTree />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Compact"
          description="Smaller text for tight layouts."
          code={COMPACT_CODE}
          filename="compact.tsx"
        >
          <div className="w-full max-w-xs">
            <Tree data={fileTree} defaultExpanded={["src", "components"]} className="text-xs" />
          </div>
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}
