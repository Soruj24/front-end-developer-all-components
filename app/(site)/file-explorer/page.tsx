"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { Folder, File, ChevronRight, ChevronDown } from "lucide-react";
import { FILE_EXPLORER_SOURCE } from "./file-explorer-source";

const BASIC_CODE = `const tree = [
  { name: "src", type: "folder", open: true },
  { name: "index.tsx", type: "file", indent: 1 },
  { name: "App.tsx", type: "file", indent: 1 },
  { name: "components", type: "folder" },
  { name: "package.json", type: "file" },
];`;

const SIZES_CODE = `const files = [
  { name: "src", type: "folder", open: true },
  { name: "components", type: "folder", indent: 1 },
  { name: "Button.tsx", type: "file", indent: 2, size: "2.1 KB" },
  { name: "Card.tsx", type: "file", indent: 2, size: "3.4 KB" },
  { name: "index.tsx", type: "file", indent: 1, size: "0.8 KB" },
];`;

const BREADCRUMB_CODE = `<div className="flex items-center gap-1.5 text-sm">
  {["home", "projects", "src", "components"].map((crumb, i) => (
    <span key={crumb} className="flex items-center gap-1.5">
      {i > 0 && <ChevronRight className="h-3 w-3 text-muted-foreground" />}
      <span className={i === 3 ? "font-medium" : "text-muted-foreground"}>{crumb}</span>
    </span>
  ))}
</div>`;

type DemoNode = { name: string; children?: DemoNode[] };

function TreeDemo() {
  const tree: DemoNode = {
    name: "src",
    children: [
      { name: "components", children: [{ name: "Button.tsx" }, { name: "Card.tsx" }] },
      { name: "index.tsx" },
      { name: "App.tsx" },
    ],
  };

  function TreeNode({ node, depth }: { node: DemoNode; depth: number }) {
    const [open, setOpen] = useState(depth === 0);
    const isFolder = !!node.children;
    return (
      <div>
        <button
          type="button"
          onClick={() => isFolder && setOpen((v) => !v)}
          className="flex w-full items-center gap-2 rounded px-2 py-1 text-left hover:bg-muted"
          style={{ paddingLeft: depth * 20 + 8 }}
        >
          {isFolder ? (
            open ? <ChevronDown className="h-3 w-3 text-muted-foreground" /> : <ChevronRight className="h-3 w-3 text-muted-foreground" />
          ) : (
            <div className="w-3" />
          )}
          {isFolder ? <Folder className="h-4 w-4 text-blue-500" /> : <File className="h-4 w-4 text-gray-500" />}
          <span>{node.name}</span>
        </button>
        {isFolder && open && node.children?.map((child) => <TreeNode key={child.name} node={child} depth={depth + 1} />)}
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <div className="mx-auto max-w-xs rounded-xl border border-border bg-card p-3 text-sm">
        <TreeNode node={tree} depth={0} />
      </div>
    </div>
  );
}

export default function FileExplorerPage() {
  return (
    <ComponentDocPage
      name="File Explorer"
      category="Navigation"
      description="A file explorer component with tree navigation, folder expand/collapse, and file type icons for browsing directory structures."
    >
      <PreviewPanel filename="file-explorer.tsx">
        <TreeDemo />
      </PreviewPanel>

      <SourceCodeViewer source={FILE_EXPLORER_SOURCE} filename="components/ui/FileExplorer/FileExplorer.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Basic Tree" description="Simple file tree with folders and files." code={BASIC_CODE} filename="basic-tree.tsx">
          <div className="w-full p-4">
            <div className="mx-auto max-w-xs rounded-xl border border-border bg-card p-3 text-sm">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 px-2 py-1 hover:bg-muted rounded cursor-pointer"><ChevronDown className="h-3 w-3 text-muted-foreground" /><Folder className="h-4 w-4 text-blue-500" /><span>src</span></div>
                <div className="flex items-center gap-2 px-2 py-1 hover:bg-muted rounded cursor-pointer ml-5"><File className="h-4 w-4 text-gray-500" /><span>index.tsx</span></div>
                <div className="flex items-center gap-2 px-2 py-1 hover:bg-muted rounded cursor-pointer ml-5"><File className="h-4 w-4 text-gray-500" /><span>App.tsx</span></div>
                <div className="flex items-center gap-2 px-2 py-1 hover:bg-muted rounded cursor-pointer"><ChevronRight className="h-3 w-3 text-muted-foreground" /><Folder className="h-4 w-4 text-yellow-500" /><span>components</span></div>
                <div className="flex items-center gap-2 px-2 py-1 hover:bg-muted rounded cursor-pointer"><File className="h-4 w-4 text-gray-500" /><span>package.json</span></div>
              </div>
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock title="With File Sizes" description="File tree showing file sizes and metadata." code={SIZES_CODE} filename="file-sizes.tsx">
          <div className="w-full p-4">
            <div className="mx-auto max-w-sm rounded-xl border border-border bg-card p-3 text-sm">
              <div className="space-y-0.5">
                {[
                  { name: "src", type: "folder", open: true },
                  { name: "components", type: "folder", indent: 1 },
                  { name: "Button.tsx", type: "file", indent: 2, size: "2.1 KB" },
                  { name: "Card.tsx", type: "file", indent: 2, size: "3.4 KB" },
                  { name: "index.tsx", type: "file", indent: 1, size: "0.8 KB" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 px-2 py-1 hover:bg-muted rounded cursor-pointer" style={{ paddingLeft: item.indent ? `${item.indent * 20 + 8}px` : "8px" }}>
                    {item.type === "folder" ? (
                      <>{item.open ? <ChevronDown className="h-3 w-3 text-muted-foreground" /> : <ChevronRight className="h-3 w-3 text-muted-foreground" />}<Folder className="h-4 w-4 text-blue-500" /></>
                    ) : (
                      <><div className="w-3" /><File className="h-4 w-4 text-gray-500" /></>
                    )}
                    <span className="flex-1">{item.name}</span>
                    {item.size && <span className="text-xs text-muted-foreground">{item.size}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Breadcrumb Path" description="File explorer with breadcrumb navigation." code={BREADCRUMB_CODE} filename="breadcrumb-path.tsx">
          <div className="w-full p-4">
            <div className="mx-auto max-w-md">
              <div className="flex items-center gap-1.5 text-sm mb-3 px-1">
                {["home", "projects", "src", "components"].map((crumb, i) => (
                  <span key={crumb} className="flex items-center gap-1.5">
                    {i > 0 && <ChevronRight className="h-3 w-3 text-muted-foreground" />}
                    <span className={i === 3 ? "font-medium" : "text-muted-foreground cursor-pointer hover:text-foreground"}>{crumb}</span>
                  </span>
                ))}
              </div>
              <div className="rounded-xl border border-border bg-card p-3">
                <div className="grid grid-cols-2 gap-2">
                  {["Button.tsx", "Card.tsx", "Input.tsx", "Modal.tsx"].map((file) => (
                    <div key={file} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted cursor-pointer"><File className="h-4 w-4 text-gray-500" /><span className="text-sm">{file}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}