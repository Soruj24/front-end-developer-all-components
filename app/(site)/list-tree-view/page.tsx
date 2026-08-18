"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  ListTree,
  Folder,
  File,
  ChevronRight,
  ChevronDown,
  Users,
  FileText,
} from "lucide-react";

const installCommand = `npx shadcn@latest add list-tree-view`;

const usageCode = `import { ListTreeView } from "@/components/ui/list-tree-view";

const data = [
  {
    id: "1",
    label: "Root Node",
    icon: "folder",
    children: [
      { id: "1-1", label: "Child Node 1" },
      { id: "1-2", label: "Child Node 2", children: [
        { id: "1-2-1", label: "Grandchild Node" },
      ]},
    ],
  },
];

export default function Example() {
  return (
    <ListTreeView
      data={data}
      selectable
      showIcons
    />
  );
}`;

interface TreeNode {
  id: string;
  label: string;
  icon?: string;
  badge?: string;
  children?: TreeNode[];
}

interface TreeViewProps {
  data: TreeNode[];
  selectable?: boolean;
  showIcons?: boolean;
  className?: string;
}

function TreeItem({
  node,
  level,
  selectable,
  showIcons,
}: {
  node: TreeNode;
  level: number;
  selectable: boolean;
  showIcons: boolean;
}) {
  const [expanded, setExpanded] = useState(true);
  const [selected, setSelected] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  const getIcon = (iconType?: string) => {
    switch (iconType) {
      case "folder":
        return <Folder className="h-4 w-4 text-yellow-500" />;
      case "file":
        return <File className="h-4 w-4 text-blue-500" />;
      case "users":
        return <Users className="h-4 w-4 text-green-500" />;
      case "document":
        return <FileText className="h-4 w-4 text-purple-500" />;
      default:
        return hasChildren ? (
          <Folder className="h-4 w-4 text-yellow-500" />
        ) : (
          <File className="h-4 w-4 text-muted-foreground" />
        );
    }
  };

  return (
    <div>
      <div
        className={`flex items-center gap-1 rounded-md px-2 py-1 text-sm cursor-pointer hover:bg-muted ${
          selected ? "bg-muted font-medium" : ""
        }`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => {
          if (hasChildren) setExpanded(!expanded);
          if (selectable) setSelected(!selected);
        }}
      >
        {hasChildren ? (
          expanded ? (
            <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
          )
        ) : (
          <span className="w-4" />
        )}
        {showIcons && getIcon(node.icon)}
        <span className="truncate">{node.label}</span>
        {node.badge && (
          <Badge variant="secondary" className="ml-auto text-xs">
            {node.badge}
          </Badge>
        )}
      </div>
      {expanded && hasChildren && (
        <div>
          {node.children!.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              level={level + 1}
              selectable={selectable}
              showIcons={showIcons}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ListTreeView({ data, selectable = false, showIcons = false, className }: TreeViewProps) {
  return (
    <div className={`rounded-md border p-2 ${className ?? ""}`}>
      {data.map((node) => (
        <TreeItem
          key={node.id}
          node={node}
          level={0}
          selectable={selectable}
          showIcons={showIcons}
        />
      ))}
    </div>
  );
}

const fileSystemData: TreeNode[] = [
  {
    id: "root",
    label: "my-project",
    icon: "folder",
    children: [
      {
        id: "src",
        label: "src",
        icon: "folder",
        children: [
          {
            id: "components",
            label: "components",
            icon: "folder",
            children: [
              { id: "header", label: "Header.tsx", icon: "file" },
              { id: "footer", label: "Footer.tsx", icon: "file" },
              { id: "sidebar", label: "Sidebar.tsx", icon: "file" },
            ],
          },
          {
            id: "hooks",
            label: "hooks",
            icon: "folder",
            children: [
              { id: "use-auth", label: "useAuth.ts", icon: "file" },
              { id: "use-theme", label: "useTheme.ts", icon: "file" },
            ],
          },
          { id: "app", label: "App.tsx", icon: "file" },
          { id: "main", label: "main.tsx", icon: "file" },
        ],
      },
      {
        id: "public",
        label: "public",
        icon: "folder",
        children: [
          { id: "favicon", label: "favicon.ico", icon: "file" },
          { id: "logo", label: "logo.svg", icon: "file" },
        ],
      },
      { id: "package", label: "package.json", icon: "file" },
      { id: "tsconfig", label: "tsconfig.json", icon: "file" },
      { id: "readme", label: "README.md", icon: "file" },
    ],
  },
];

function FileExplorerDemo() {
  return (
    <ComponentPreview>
      <div className="w-full max-w-sm">
        <ListTreeView data={fileSystemData} showIcons />
      </div>
    </ComponentPreview>
  );
}

const orgChartData: TreeNode[] = [
  {
    id: "ceo",
    label: "Sarah Chen - CEO",
    icon: "users",
    badge: "Executive",
    children: [
      {
        id: "cto",
        label: "James Wilson - CTO",
        icon: "users",
        badge: "Engineering",
        children: [
          { id: "fe-lead", label: "Emily Park - Frontend Lead", icon: "users" },
          { id: "be-lead", label: "Michael Brown - Backend Lead", icon: "users" },
          {
            id: "devops",
            label: "Alex Rivera - DevOps Lead",
            icon: "users",
            children: [
              { id: "sre-1", label: "Jordan Lee - SRE", icon: "users" },
            ],
          },
        ],
      },
      {
        id: "cfo",
        label: "Lisa Thompson - CFO",
        icon: "users",
        badge: "Finance",
        children: [
          { id: "acc", label: "David Kim - Accountant", icon: "users" },
        ],
      },
      {
        id: "cmo",
        label: "Rachel Green - CMO",
        icon: "users",
        badge: "Marketing",
        children: [
          { id: "content", label: "Tom Harris - Content Lead", icon: "users" },
          { id: "social", label: "Nina Patel - Social Media", icon: "users" },
        ],
      },
    ],
  },
];

function OrganizationChartDemo() {
  return (
    <ComponentPreview>
      <div className="w-full max-w-sm">
        <ListTreeView data={orgChartData} showIcons selectable />
      </div>
    </ComponentPreview>
  );
}

const categoryData: TreeNode[] = [
  {
    id: "electronics",
    label: "Electronics",
    icon: "folder",
    badge: "142",
    children: [
      {
        id: "phones",
        label: "Phones & Accessories",
        icon: "folder",
        badge: "56",
        children: [
          { id: "smartphones", label: "Smartphones", icon: "file", badge: "34" },
          { id: "cases", label: "Cases & Covers", icon: "file", badge: "12" },
          { id: "chargers", label: "Chargers", icon: "file", badge: "10" },
        ],
      },
      {
        id: "computers",
        label: "Computers",
        icon: "folder",
        badge: "86",
        children: [
          { id: "laptops", label: "Laptops", icon: "file", badge: "28" },
          { id: "desktops", label: "Desktops", icon: "file", badge: "22" },
          { id: "monitors", label: "Monitors", icon: "file", badge: "18" },
          { id: "peripherals", label: "Peripherals", icon: "file", badge: "18" },
        ],
      },
    ],
  },
  {
    id: "clothing",
    label: "Clothing",
    icon: "folder",
    badge: "203",
    children: [
      { id: "mens", label: "Men's", icon: "folder", badge: "98" },
      { id: "womens", label: "Women's", icon: "folder", badge: "105" },
    ],
  },
];

function CategoryTreeDemo() {
  return (
    <ComponentPreview>
      <div className="w-full max-w-sm">
        <ListTreeView data={categoryData} showIcons selectable />
      </div>
    </ComponentPreview>
  );
}

const documentData: TreeNode[] = [
  {
    id: "h1",
    label: "Introduction",
    icon: "document",
    children: [
      { id: "h1-1", label: "Background", icon: "document" },
      { id: "h1-2", label: "Purpose", icon: "document" },
    ],
  },
  {
    id: "h2",
    label: "Getting Started",
    icon: "document",
    children: [
      { id: "h2-1", label: "Prerequisites", icon: "document" },
      { id: "h2-2", label: "Installation", icon: "document" },
      { id: "h2-3", label: "Configuration", icon: "document" },
    ],
  },
  {
    id: "h3",
    label: "API Reference",
    icon: "document",
    children: [
      { id: "h3-1", label: "Authentication", icon: "document" },
      {
        id: "h3-2",
        label: "Endpoints",
        icon: "document",
        children: [
          { id: "h3-2-1", label: "GET /users", icon: "document" },
          { id: "h3-2-2", label: "POST /users", icon: "document" },
          { id: "h3-2-3", label: "DELETE /users/:id", icon: "document" },
        ],
      },
    ],
  },
  { id: "h4", label: "Troubleshooting", icon: "document" },
  { id: "h5", label: "Changelog", icon: "document" },
];

function DocumentOutlineDemo() {
  return (
    <ComponentPreview>
      <div className="w-full max-w-sm">
        <ListTreeView data={documentData} showIcons />
      </div>
    </ComponentPreview>
  );
}

const navigationData: TreeNode[] = [
  {
    id: "home",
    label: "Home",
    icon: "folder",
    children: [
      { id: "features", label: "Features", icon: "file" },
      { id: "pricing", label: "Pricing", icon: "file" },
      { id: "testimonials", label: "Testimonials", icon: "file" },
    ],
  },
  {
    id: "products",
    label: "Products",
    icon: "folder",
    children: [
      {
        id: "software",
        label: "Software",
        icon: "folder",
        children: [
          { id: "analytics", label: "Analytics Suite", icon: "file" },
          { id: "crm", label: "CRM Platform", icon: "file" },
        ],
      },
      {
        id: "services",
        label: "Services",
        icon: "folder",
        children: [
          { id: "consulting", label: "Consulting", icon: "file" },
          { id: "support", label: "Support Plans", icon: "file" },
        ],
      },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    icon: "folder",
    children: [
      { id: "docs", label: "Documentation", icon: "file" },
      { id: "blog", label: "Blog", icon: "file" },
      { id: "changelog", label: "Changelog", icon: "file" },
    ],
  },
  { id: "contact", label: "Contact", icon: "file" },
];

function NavigationTreeDemo() {
  return (
    <ComponentPreview>
      <div className="w-full max-w-sm">
        <ListTreeView data={navigationData} showIcons selectable />
      </div>
    </ComponentPreview>
  );
}

const commentData: TreeNode[] = [
  {
    id: "c1",
    label: "Great article!",
    icon: "users",
    badge: "John D.",
    children: [
      {
        id: "c1-1",
        label: "Thanks! Glad you liked it.",
        icon: "users",
        badge: "Author",
        children: [
          {
            id: "c1-1-1",
            label: "Any plans for a follow-up?",
            icon: "users",
            badge: "John D.",
          },
        ],
      },
      {
        id: "c1-2",
        label: "I learned a lot from this.",
        icon: "users",
        badge: "Sarah M.",
      },
    ],
  },
  {
    id: "c2",
    label: "Very helpful, bookmarked!",
    icon: "users",
    badge: "Mike R.",
    children: [
      {
        id: "c2-1",
        label: "Same here, sharing with my team.",
        icon: "users",
        badge: "Lisa K.",
      },
    ],
  },
  {
    id: "c3",
    label: "Could you elaborate on section 3?",
    icon: "users",
    badge: "Alex T.",
    children: [
      {
        id: "c3-1",
        label: "Good point, I'll add more details.",
        icon: "users",
        badge: "Author",
      },
    ],
  },
];

function CommentThreadDemo() {
  return (
    <ComponentPreview>
      <div className="w-full max-w-sm">
        <ListTreeView data={commentData} showIcons selectable />
      </div>
    </ComponentPreview>
  );
}

const folderStructureData: TreeNode[] = [
  {
    id: "project-root",
    label: "my-saas-app",
    icon: "folder",
    children: [
      {
        id: "app-dir",
        label: "app",
        icon: "folder",
        children: [
          { id: "layout", label: "layout.tsx", icon: "file" },
          { id: "page", label: "page.tsx", icon: "file" },
          {
            id: "dashboard",
            label: "(dashboard)",
            icon: "folder",
            children: [
              { id: "dash-page", label: "page.tsx", icon: "file" },
              { id: "dash-layout", label: "layout.tsx", icon: "file" },
            ],
          },
          {
            id: "api-route",
            label: "api",
            icon: "folder",
            children: [
              {
                id: "auth-route",
                label: "auth",
                icon: "folder",
                children: [
                  { id: "callback", label: "callback/route.ts", icon: "file" },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "components-dir",
        label: "components",
        icon: "folder",
        children: [
          { id: "ui-dir", label: "ui/", icon: "folder", children: [] },
          { id: "forms-dir", label: "forms/", icon: "folder", children: [] },
          { id: "layout-dir", label: "layout/", icon: "folder", children: [] },
        ],
      },
      {
        id: "lib-dir",
        label: "lib",
        icon: "folder",
        children: [
          { id: "utils", label: "utils.ts", icon: "file" },
          { id: "db", label: "db.ts", icon: "file" },
          { id: "auth", label: "auth.ts", icon: "file" },
        ],
      },
      {
        id: "prisma-dir",
        label: "prisma",
        icon: "folder",
        children: [
          { id: "schema", label: "schema.prisma", icon: "file" },
          { id: "migrations", label: "migrations/", icon: "folder", children: [] },
        ],
      },
      { id: "config", label: "next.config.js", icon: "file" },
      { id: "tailwind", label: "tailwind.config.ts", icon: "file" },
    ],
  },
];

function FolderStructureDemo() {
  return (
    <ComponentPreview>
      <div className="w-full max-w-sm">
        <ListTreeView data={folderStructureData} showIcons />
      </div>
    </ComponentPreview>
  );
}

export default function ListViewTreePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-12 py-12">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <ListTree className="h-8 w-8" />
          <h1 className="text-3xl font-bold">List Tree View</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          A hierarchical tree component for displaying nested data with expand/collapse,
          selection, and icon support.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <CodeBlock code={installCommand} />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <CodeBlock code={usageCode} />
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Examples</h2>

        <div className="space-y-4">
          <h3 className="text-xl font-medium">File Explorer</h3>
          <FileExplorerDemo />
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-medium">Organization Chart</h3>
          <OrganizationChartDemo />
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-medium">Category Tree</h3>
          <CategoryTreeDemo />
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-medium">Document Outline</h3>
          <DocumentOutlineDemo />
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-medium">Navigation Tree</h3>
          <NavigationTreeDemo />
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-medium">Comment Thread</h3>
          <CommentThreadDemo />
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-medium">Folder Structure</h3>
          <FolderStructureDemo />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <div className="rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">data</td>
                <td className="px-4 py-3 text-muted-foreground">TreeNode[]</td>
                <td className="px-4 py-3 text-muted-foreground">required</td>
                <td className="px-4 py-3">The tree data to display</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">selectable</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">Enable node selection</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">showIcons</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">Show icons next to node labels</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">undefined</td>
                <td className="px-4 py-3">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
