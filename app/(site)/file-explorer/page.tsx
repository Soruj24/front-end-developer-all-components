"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Folder, File, ChevronRight, ChevronDown } from "lucide-react";

const installCommand = `npx component-library@latest add file-explorer`;
const usageCode = `import { FileExplorer } from "@/components/ui/file-explorer";

<FileExplorer root={fileTree} />`;

export default function FileExplorerPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">File Explorer</h1>
          <Badge variant="primary">Navigation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A file explorer component with tree navigation, folder expand/collapse, and file type icons for browsing directory structures.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Tree</h2><p className="mt-1 text-sm text-muted-foreground">Simple file tree with folders and files.</p></div>
        <ComponentPreview id="file-explorer-basic">
          <div className="w-full p-4">
            <div className="max-w-xs rounded-xl border border-border bg-card p-3 text-sm">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 px-2 py-1 hover:bg-muted rounded cursor-pointer"><ChevronDown className="h-3 w-3 text-muted-foreground" /><Folder className="h-4 w-4 text-blue-500" /><span>src</span></div>
                <div className="flex items-center gap-2 px-2 py-1 hover:bg-muted rounded cursor-pointer ml-5"><File className="h-4 w-4 text-gray-500" /><span>index.tsx</span></div>
                <div className="flex items-center gap-2 px-2 py-1 hover:bg-muted rounded cursor-pointer ml-5"><File className="h-4 w-4 text-gray-500" /><span>App.tsx</span></div>
                <div className="flex items-center gap-2 px-2 py-1 hover:bg-muted rounded cursor-pointer"><ChevronRight className="h-3 w-3 text-muted-foreground" /><Folder className="h-4 w-4 text-yellow-500" /><span>components</span></div>
                <div className="flex items-center gap-2 px-2 py-1 hover:bg-muted rounded cursor-pointer"><File className="h-4 w-4 text-gray-500" /><span>package.json</span></div>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">With File Sizes</h2><p className="mt-1 text-sm text-muted-foreground">File tree showing file sizes and metadata.</p></div>
        <ComponentPreview id="file-explorer-sizes">
          <div className="w-full p-4">
            <div className="max-w-sm rounded-xl border border-border bg-card p-3 text-sm">
              <div className="space-y-0.5">
                {[
                  { name: "src", type: "folder", open: true },
                  { name: "components", type: "folder", indent: 1 },
                  { name: "Button.tsx", type: "file", indent: 2, size: "2.1 KB" },
                  { name: "Card.tsx", type: "file", indent: 2, size: "3.4 KB" },
                  { name: "index.tsx", type: "file", indent: 1, size: "0.8 KB" },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center gap-2 px-2 py-1 hover:bg-muted rounded cursor-pointer`} style={{ paddingLeft: item.indent ? `${item.indent * 20 + 8}px` : "8px" }}>
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
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Breadcrumb Path</h2><p className="mt-1 text-sm text-muted-foreground">File explorer with breadcrumb navigation.</p></div>
        <ComponentPreview id="file-explorer-breadcrumb">
          <div className="w-full p-4">
            <div className="max-w-md">
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
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr></tbody></table></div>
      </section>
    </div>
  );
}
