"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { FileArchive } from "lucide-react";

const installCommand = `npx component-library@latest add zip-card`;
const usageCode = `// usage`;

export default function ZipCardPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Zip Card</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A zip card component for displaying zip file information including name, size, file count, and download options.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Zip Card Demo</h2><p className="mt-1 text-sm text-muted-foreground">Display zip file information in a card format.</p></div>
        <ComponentPreview id="zip-card-demo"><div className="w-full p-4">
          <div className="flex items-start gap-4 rounded-lg border p-4">
            <div className="rounded-lg bg-primary/10 p-3"><FileArchive className="h-6 w-6 text-primary" /></div>
            <div className="flex-1">
              <h3 className="text-sm font-medium">release-v2.1.0.zip</h3>
              <div className="mt-1 flex gap-4 text-xs text-muted-foreground">
                <span>24 files</span>
                <span>1.8 MB</span>
                <span>Modified 2h ago</span>
              </div>
            </div>
            <button className="rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-muted">Download</button>
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
