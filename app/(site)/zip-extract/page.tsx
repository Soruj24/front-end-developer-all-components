"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { FileArchive } from "lucide-react";

const installCommand = `npx component-library@latest add zip-extract`;
const usageCode = `// usage`;

export default function ZipExtractPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Zip Extract</h1>
          <Badge variant="primary">Tools</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A zip extraction component for extracting and previewing contents of zip archives with file tree visualization.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Zip Extract Demo</h2><p className="mt-1 text-sm text-muted-foreground">Extract and preview zip archive contents.</p></div>
        <ComponentPreview id="zip-extract-demo"><div className="w-full p-4">
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2 mb-3">
              <FileArchive className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">archive.zip</span>
            </div>
            <div className="flex flex-col gap-1 text-xs">
              <div className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-muted"><span className="text-muted-foreground">📁</span> src/</div>
              <div className="flex items-center gap-2 rounded-md px-2 py-1 pl-6 hover:bg-muted"><span className="text-muted-foreground">📄</span> index.ts</div>
              <div className="flex items-center gap-2 rounded-md px-2 py-1 pl-6 hover:bg-muted"><span className="text-muted-foreground">📄</span> utils.ts</div>
              <div className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-muted"><span className="text-muted-foreground">📄</span> package.json</div>
            </div>
          </div>
        </div></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr></tbody></table></div>
      </section>
    </div>
  );
}
