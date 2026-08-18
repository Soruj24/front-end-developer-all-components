"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { FolderTree } from "lucide-react";

const installCommand = `npx component-library@latest add tree-view`;
const usageCode = `// usage`;

export default function TreeViewPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Tree View</h1>
          <Badge variant="primary">Navigation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A hierarchical tree view for navigating nested data structures.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Tree View Demo</h2><p className="mt-1 text-sm text-muted-foreground">Expandable file tree navigation.</p></div>
        <ComponentPreview id="tree-view-demo"><div className="w-full p-4"><div className="max-w-xs font-mono text-sm">
          <div className="flex items-center gap-2 py-1"><span>▾</span><FolderTree className="h-4 w-4 text-amber-500" /><span>src</span></div>
          <div className="ml-4 flex items-center gap-2 py-1"><FolderTree className="h-4 w-4 text-amber-500" /><span>components</span></div>
          <div className="ml-8 flex items-center gap-2 py-1"><span className="text-blue-500">○</span><span>Button.tsx</span></div>
          <div className="ml-8 flex items-center gap-2 py-1"><span className="text-blue-500">○</span><span>Card.tsx</span></div>
          <div className="ml-4 flex items-center gap-2 py-1"><FolderTree className="h-4 w-4 text-amber-500" /><span>utils</span></div>
          <div className="ml-8 flex items-center gap-2 py-1"><span className="text-blue-500">○</span><span>helpers.ts</span></div>
        </div></div></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr></tbody></table></div>
      </section>
    </div>
  );
}
