"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add fabric-weave`;
const usageCode = `import { FabricWeave } from "@/components/ui/fabric-weave";

<FabricWeave pattern="checkerboard" />`;

export default function FabricWeavePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Fabric Weave</h1>
          <Badge variant="primary">Visual</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A fabric weave pattern component for creating textile-like backgrounds, decorative textures, and woven visual effects.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Checkerboard</h2><p className="mt-1 text-sm text-muted-foreground">A classic checkerboard weave pattern.</p></div>
        <ComponentPreview id="fabric-weave-checkerboard">
          <div className="w-full p-4">
            <div className="max-w-xs mx-auto h-32 rounded-xl overflow-hidden" style={{ backgroundImage: "repeating-conic-gradient(#808080 0% 25%, transparent 0% 50%)", backgroundSize: "20px 20px" }} />
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Herringbone</h2><p className="mt-1 text-sm text-muted-foreground">A herringbone weave pattern.</p></div>
        <ComponentPreview id="fabric-weave-herringbone">
          <div className="w-full p-4">
            <div className="max-w-xs mx-auto h-32 rounded-xl overflow-hidden border border-border" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(128,128,128,0.3) 5px, rgba(128,128,128,0.3) 10px), repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(128,128,128,0.3) 5px, rgba(128,128,128,0.3) 10px)" }} />
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Cross Hatch</h2><p className="mt-1 text-sm text-muted-foreground">A cross-hatch woven pattern.</p></div>
        <ComponentPreview id="fabric-weave-crosshatch">
          <div className="w-full p-4">
            <div className="max-w-xs mx-auto h-32 rounded-xl overflow-hidden border border-border" style={{ backgroundImage: "repeating-linear-gradient(0deg, rgba(128,128,128,0.2), rgba(128,128,128,0.2) 1px, transparent 1px, transparent 8px), repeating-linear-gradient(90deg, rgba(128,128,128,0.2), rgba(128,128,128,0.2) 1px, transparent 1px, transparent 8px)" }} />
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
