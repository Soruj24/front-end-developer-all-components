"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Tag } from "lucide-react";

const installCommand = `npx component-library@latest add tag-cloud`;
const usageCode = `// usage`;

export default function TagCloudPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Tag Cloud</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A visual representation of tags with varying sizes based on frequency.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Tag Cloud Demo</h2><p className="mt-1 text-sm text-muted-foreground">Tags displayed with different sizes.</p></div>
        <ComponentPreview id="tag-cloud-demo"><div className="w-full p-4"><div className="flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">React</span>
          <span className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">TypeScript</span>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Next.js</span>
          <span className="rounded-full bg-primary/10 px-5 py-2 text-base font-medium text-primary">JavaScript</span>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">CSS</span>
          <span className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">Node.js</span>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">GraphQL</span>
          <span className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">Tailwind</span>
        </div></div></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr></tbody></table></div>
      </section>
    </div>
  );
}
