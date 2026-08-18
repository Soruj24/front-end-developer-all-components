"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { RotateCw } from "lucide-react";

const installCommand = `npx component-library@latest add zrotate-button`;
const usageCode = `// usage`;

export default function ZrotateButtonPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Z-rotate Button</h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A Z-rotate button that spins its icon on hover using a smooth 3D rotation animation around the Z axis.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Z-rotate Button Demo</h2><p className="mt-1 text-sm text-muted-foreground">Hover to trigger the icon rotation animation.</p></div>
        <ComponentPreview id="zrotate-button-demo"><div className="w-full p-4">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted group">
              <RotateCw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
              Refresh
            </button>
            <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 group">
              <RotateCw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
              Reload
            </button>
            <button className="flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted group">
              <RotateCw className="h-4 w-4 group-hover:-rotate-180 transition-transform duration-700" />
              Undo
            </button>
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
