"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { SquareDashedBottom } from "lucide-react";

const installCommand = `npx component-library@latest add zigzag-border-v2`;
const usageCode = `// usage`;

export default function ZigzagBorderV2Page() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Zigzag Border V2</h1>
          <Badge variant="primary">Visual</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">An advanced zigzag border component with CSS mask support for applying zigzag edges on all four sides of any element.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Zigzag Border V2 Demo</h2><p className="mt-1 text-sm text-muted-foreground">Advanced zigzag borders with mask-based patterns.</p></div>
        <ComponentPreview id="zigzag-border-v2-demo"><div className="w-full p-4">
          <div className="flex flex-col gap-4">
            <div className="relative rounded-lg border-2 border-dashed border-primary/40 bg-primary/5 p-4">
              <p className="text-sm">Dashed border with zigzag corners</p>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-card p-4" style={{ clipPath: "polygon(0 0, 3% 4%, 6% 0, 9% 4, 12% 0, 15% 4, 18% 0, 21% 4, 24% 0, 27% 4, 30% 0, 100% 0, 100% 96%, 97% 100%, 94% 96%, 91% 100%, 88% 96%, 85% 100%, 82% 96%, 79% 100%, 76% 96%, 73% 100%, 70% 96%, 67% 100%, 0 100%, 0 4%, 3% 0)" }}>
              <p className="text-sm">Content with zigzag top and bottom edges</p>
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
