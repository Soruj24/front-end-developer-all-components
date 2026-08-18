"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Tree } from "@/components/ui/Tree";
import type { TreeNode } from "@/components/ui/Tree";
import {
  Folder,
  File,
  FileCode,
  FileText,
  FileImage,
  FileJson,
  Package,
  Settings,
  Database,
  Globe,
  Lock,
  Users,
  FolderTree,
  Code,
  Terminal,
  Music,
  Video,
  Archive,
  Palette,
} from "lucide-react";

const installCommand = `npx component-library@latest add tree`;

const usageCode = `import { Tree } from "@/components/ui/Tree";

const data = [
  {
    id: "1",
    label: "Root",
    children: [
      { id: "1-1", label: "Child 1" },
      { id: "1-2", label: "Child 2", children: [
        { id: "1-2-1", label: "Grandchild" }
      ]},
    ],
  },
];

<Tree data={data} onSelect={(id) => console.log(id)} />`;

const basicTree: TreeNode[] = [
  {
    id: "1",
    label: "Documents",
    icon: <Folder className="h-4 w-4 text-yellow-500" />,
    children: [
      { id: "1-1", label: "report.pdf", icon: <FileText className="h-4 w-4 text-red-400" /> },
      { id: "1-2", label: "notes.txt", icon: <File className="h-4 w-4 text-blue-400" /> },
      { id: "1-3", label: "budget.xlsx", icon: <File className="h-4 w-4 text-green-500" /> },
    ],
  },
  {
    id: "2",
    label: "Pictures",
    icon: <Folder className="h-4 w-4 text-yellow-500" />,
    children: [
      { id: "2-1", label: "vacation.jpg", icon: <FileImage className="h-4 w-4 text-purple-400" /> },
      { id: "2-2", label: "family.png", icon: <FileImage className="h-4 w-4 text-purple-400" /> },
    ],
  },
];

const projectTree: TreeNode[] = [
  {
    id: "root",
    label: "my-project",
    icon: <Package className="h-4 w-4 text-blue-500" />,
    children: [
      {
        id: "src",
        label: "src",
        icon: <Folder className="h-4 w-4 text-yellow-500" />,
        children: [
          {
            id: "components",
            label: "components",
            icon: <Folder className="h-4 w-4 text-yellow-500" />,
            children: [
              { id: "button", label: "Button.tsx", icon: <FileCode className="h-4 w-4 text-blue-400" /> },
              { id: "input", label: "Input.tsx", icon: <FileCode className="h-4 w-4 text-blue-400" /> },
              { id: "modal", label: "Modal.tsx", icon: <FileCode className="h-4 w-4 text-blue-400" /> },
            ],
          },
          {
            id: "hooks",
            label: "hooks",
            icon: <Folder className="h-4 w-4 text-yellow-500" />,
            children: [
              { id: "use-auth", label: "useAuth.ts", icon: <FileCode className="h-4 w-4 text-blue-400" /> },
              { id: "use-theme", label: "useTheme.ts", icon: <FileCode className="h-4 w-4 text-blue-400" /> },
            ],
          },
          { id: "app", label: "App.tsx", icon: <FileCode className="h-4 w-4 text-blue-400" /> },
          { id: "index", label: "index.tsx", icon: <FileCode className="h-4 w-4 text-blue-400" /> },
        ],
      },
      {
        id: "public",
        label: "public",
        icon: <Folder className="h-4 w-4 text-yellow-500" />,
        children: [
          { id: "favicon", label: "favicon.ico", icon: <FileImage className="h-4 w-4 text-purple-400" /> },
          { id: "robots", label: "robots.txt", icon: <FileText className="h-4 w-4 text-gray-400" /> },
        ],
      },
      { id: "package", label: "package.json", icon: <FileJson className="h-4 w-4 text-green-500" /> },
      { id: "tsconfig", label: "tsconfig.json", icon: <FileJson className="h-4 w-4 text-green-500" /> },
      { id: "readme", label: "README.md", icon: <FileText className="h-4 w-4 text-gray-400" /> },
    ],
  },
];

const organizationTree: TreeNode[] = [
  {
    id: "company",
    label: "Acme Corp",
    icon: <Globe className="h-4 w-4 text-blue-500" />,
    children: [
      {
        id: "engineering",
        label: "Engineering",
        icon: <Code className="h-4 w-4 text-green-500" />,
        children: [
          {
            id: "frontend",
            label: "Frontend",
            icon: <FileCode className="h-4 w-4 text-blue-400" />,
            children: [
              { id: "alice", label: "Alice Chen", icon: <Users className="h-4 w-4 text-gray-400" /> },
              { id: "bob", label: "Bob Wilson", icon: <Users className="h-4 w-4 text-gray-400" /> },
            ],
          },
          {
            id: "backend",
            label: "Backend",
            icon: <Terminal className="h-4 w-4 text-green-400" />,
            children: [
              { id: "carol", label: "Carol Davis", icon: <Users className="h-4 w-4 text-gray-400" /> },
              { id: "dave", label: "Dave Kim", icon: <Users className="h-4 w-4 text-gray-400" /> },
            ],
          },
        ],
      },
      {
        id: "design",
        label: "Design",
        icon: <Palette className="h-4 w-4 text-purple-500" />,
        children: [
          { id: "eve", label: "Eve Martinez", icon: <Users className="h-4 w-4 text-gray-400" /> },
          { id: "frank", label: "Frank Lee", icon: <Users className="h-4 w-4 text-gray-400" /> },
        ],
      },
      {
        id: "operations",
        label: "Operations",
        icon: <Settings className="h-4 w-4 text-gray-500" />,
        children: [
          { id: "grace", label: "Grace Park", icon: <Users className="h-4 w-4 text-gray-400" /> },
        ],
      },
    ],
  },
];

const fileSystemTree: TreeNode[] = [
  {
    id: "root-fs",
    label: "/",
    icon: <Database className="h-4 w-4 text-gray-500" />,
    children: [
      {
        id: "etc",
        label: "etc",
        icon: <Settings className="h-4 w-4 text-gray-500" />,
        children: [
          { id: "hosts", label: "hosts", icon: <File className="h-4 w-4 text-gray-400" /> },
          { id: "nginx", label: "nginx.conf", icon: <FileCode className="h-4 w-4 text-blue-400" /> },
        ],
      },
      {
        id: "var",
        label: "var",
        icon: <Folder className="h-4 w-4 text-yellow-500" />,
        children: [
          {
            id: "log",
            label: "log",
            icon: <Folder className="h-4 w-4 text-yellow-500" />,
            children: [
              { id: "syslog", label: "syslog", icon: <FileText className="h-4 w-4 text-gray-400" /> },
              { id: "auth", label: "auth.log", icon: <Lock className="h-4 w-4 text-red-400" /> },
            ],
          },
        ],
      },
      {
        id: "usr",
        label: "usr",
        icon: <Folder className="h-4 w-4 text-yellow-500" />,
        children: [
          { id: "bin", label: "bin", icon: <Folder className="h-4 w-4 text-yellow-500" /> },
          { id: "lib", label: "lib", icon: <Folder className="h-4 w-4 text-yellow-500" /> },
        ],
      },
    ],
  },
];

const mediaTree: TreeNode[] = [
  {
    id: "media-root",
    label: "Media Library",
    icon: <FolderTree className="h-4 w-4 text-blue-500" />,
    children: [
      {
        id: "videos",
        label: "Videos",
        icon: <Video className="h-4 w-4 text-red-500" />,
        children: [
          { id: "v1", label: "tutorial.mp4", icon: <Video className="h-4 w-4 text-red-400" /> },
          { id: "v2", label: "demo.mov", icon: <Video className="h-4 w-4 text-red-400" /> },
        ],
      },
      {
        id: "music",
        label: "Music",
        icon: <Music className="h-4 w-4 text-purple-500" />,
        children: [
          { id: "m1", label: "track01.mp3", icon: <Music className="h-4 w-4 text-purple-400" /> },
          { id: "m2", label: "track02.mp3", icon: <Music className="h-4 w-4 text-purple-400" /> },
        ],
      },
      {
        id: "archives",
        label: "Archives",
        icon: <Archive className="h-4 w-4 text-gray-500" />,
        children: [
          { id: "a1", label: "backup.zip", icon: <Archive className="h-4 w-4 text-gray-400" /> },
        ],
      },
    ],
  },
];

function BasicTree() {
  return (
    <div className="rounded-lg border border-border p-4">
      <Tree data={basicTree} defaultExpanded={["1", "2"]} />
    </div>
  );
}

function ProjectTree() {
  return (
    <div className="rounded-lg border border-border p-4">
      <Tree data={projectTree} defaultExpanded={["root", "src"]} />
    </div>
  );
}

function SelectableTree() {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-lg border border-border p-4">
        <Tree data={projectTree} defaultExpanded={["root", "src", "components"]} selected={selected} onSelect={(id) => setSelected([id])} />
      </div>
      {selected.length > 0 && (
        <p className="text-xs text-muted-foreground">Selected: <code className="rounded bg-muted px-1 py-0.5">{selected[0]}</code></p>
      )}
    </div>
  );
}

function OrganizationTree() {
  return (
    <div className="rounded-lg border border-border p-4">
      <Tree data={organizationTree} defaultExpanded={["company", "engineering"]} />
    </div>
  );
}

function FileSystemTree() {
  return (
    <div className="rounded-lg border border-border p-4">
      <Tree data={fileSystemTree} defaultExpanded={["root-fs", "etc"]} />
    </div>
  );
}

function MediaTree() {
  return (
    <div className="rounded-lg border border-border p-4">
      <Tree data={mediaTree} defaultExpanded={["media-root"]} />
    </div>
  );
}

function ControlledTree() {
  const [expanded, setExpanded] = useState<string[]>(["root"]);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <button onClick={() => setExpanded(["root", "src", "components", "hooks"])} className="rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted">Expand All</button>
        <button onClick={() => setExpanded([])} className="rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted">Collapse All</button>
      </div>
      <div className="rounded-lg border border-border p-4">
        <Tree data={projectTree} expanded={expanded} onExpand={setExpanded} />
      </div>
    </div>
  );
}

function DisabledNodes() {
  const tree: TreeNode[] = [
    {
      id: "root",
      label: "Root",
      icon: <Folder className="h-4 w-4 text-yellow-500" />,
      children: [
        { id: "a", label: "Active item", icon: <File className="h-4 w-4 text-green-500" /> },
        { id: "b", label: "Disabled item", icon: <Lock className="h-4 w-4 text-red-400" />, disabled: true },
        { id: "c", label: "Another active", icon: <File className="h-4 w-4 text-green-500" /> },
      ],
    },
  ];
  return (
    <div className="rounded-lg border border-border p-4">
      <Tree data={tree} defaultExpanded={["root"]} />
    </div>
  );
}

function NestedDeepTree() {
  return (
    <div className="rounded-lg border border-border p-4">
      <Tree
        data={[
          {
            id: "l0",
            label: "Level 0",
            icon: <Folder className="h-4 w-4 text-yellow-500" />,
            children: [
              {
                id: "l1",
                label: "Level 1",
                icon: <Folder className="h-4 w-4 text-yellow-500" />,
                children: [
                  {
                    id: "l2",
                    label: "Level 2",
                    icon: <Folder className="h-4 w-4 text-yellow-500" />,
                    children: [
                      {
                        id: "l3",
                        label: "Level 3",
                        icon: <Folder className="h-4 w-4 text-yellow-500" />,
                        children: [
                          { id: "l4", label: "Level 4 (deepest)", icon: <File className="h-4 w-4 text-blue-400" /> },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ]}
        defaultExpanded={["l0", "l1", "l2", "l3"]}
      />
    </div>
  );
}

export default function TreePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Tree</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Hierarchical tree view for file systems, organizational charts, navigation menus, and nested data structures. Supports expand/collapse, selection, icons, and deep nesting.
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

      {/* Basic */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Basic</h2>
          <p className="mt-1 text-sm text-muted-foreground">Simple tree with folders and files.</p>
        </div>
        <ComponentPreview id="tree-basic">
          <BasicTree />
        </ComponentPreview>
      </section>

      {/* Project Structure */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Project Structure</h2>
          <p className="mt-1 text-sm text-muted-foreground">Code repository with nested directories.</p>
        </div>
        <ComponentPreview id="tree-project">
          <ProjectTree />
        </ComponentPreview>
      </section>

      {/* Selectable */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Selectable</h2>
          <p className="mt-1 text-sm text-muted-foreground">Click to select nodes with feedback.</p>
        </div>
        <ComponentPreview id="tree-selectable">
          <SelectableTree />
        </ComponentPreview>
      </section>

      {/* Organization */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Organization Chart</h2>
          <p className="mt-1 text-sm text-muted-foreground">Company hierarchy with departments and team members.</p>
        </div>
        <ComponentPreview id="tree-org">
          <OrganizationTree />
        </ComponentPreview>
      </section>

      {/* File System */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">File System</h2>
          <p className="mt-1 text-sm text-muted-foreground">Unix-style directory structure.</p>
        </div>
        <ComponentPreview id="tree-filesystem">
          <FileSystemTree />
        </ComponentPreview>
      </section>

      {/* Media Library */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Media Library</h2>
          <p className="mt-1 text-sm text-muted-foreground">Organized by media type with file icons.</p>
        </div>
        <ComponentPreview id="tree-media">
          <MediaTree />
        </ComponentPreview>
      </section>

      {/* Controlled */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Controlled</h2>
          <p className="mt-1 text-sm text-muted-foreground">External controls for expand/collapse all.</p>
        </div>
        <ComponentPreview id="tree-controlled">
          <ControlledTree />
        </ComponentPreview>
      </section>

      {/* Disabled Nodes */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Disabled Nodes</h2>
          <p className="mt-1 text-sm text-muted-foreground">Certain nodes can be disabled and non-interactive.</p>
        </div>
        <ComponentPreview id="tree-disabled">
          <DisabledNodes />
        </ComponentPreview>
      </section>

      {/* Deep Nesting */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Deep Nesting</h2>
          <p className="mt-1 text-sm text-muted-foreground">Supports deeply nested hierarchies.</p>
        </div>
        <ComponentPreview id="tree-deep">
          <NestedDeepTree />
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
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">data</td>
                <td className="px-4 py-3 text-muted-foreground">TreeNode[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">defaultExpanded</td>
                <td className="px-4 py-3 text-muted-foreground">string[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">expanded</td>
                <td className="px-4 py-3 text-muted-foreground">string[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onExpand</td>
                <td className="px-4 py-3 text-muted-foreground">(ids: string[]) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">selected</td>
                <td className="px-4 py-3 text-muted-foreground">string[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onSelect</td>
                <td className="px-4 py-3 text-muted-foreground">(id: string) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overflow-hidden rounded-lg border">
          <div className="bg-muted/50 px-4 py-2 text-sm font-medium">TreeNode</div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Property</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">id</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">label</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">children</td>
                <td className="px-4 py-3 text-muted-foreground">TreeNode[]</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">icon</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">disabled</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
