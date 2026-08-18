"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { FlipHorizontal } from "lucide-react";

const installCommand = `npx component-library@latest add zaxis-flip`;
const usageCode = `// usage`;

export default function ZaxisFlipPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Z-axis Flip</h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A Z-axis flip component that creates smooth 3D flip animations around the vertical axis for card reveals and transitions.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Z-axis Flip Demo</h2><p className="mt-1 text-sm text-muted-foreground">Hover to trigger a 3D flip animation around the Z axis.</p></div>
        <ComponentPreview id="zaxis-flip-demo"><div className="w-full p-4">
          <div className="flex justify-center">
            <div className="group h-32 w-48 cursor-pointer perspective-500" style={{ perspective: "500px" }}>
              <div className="relative h-full w-full transition-transform duration-500" style={{ transformStyle: "preserve-3d" }}>
                <div className="absolute inset-0 flex items-center justify-center rounded-lg border bg-gradient-to-br from-primary/20 to-primary/10" style={{ backfaceVisibility: "hidden" }}>
                  <div className="text-center"><FlipHorizontal className="mx-auto h-6 w-6 text-primary" /><p className="mt-2 text-sm font-medium">Front</p></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center rounded-lg border bg-primary text-primary-foreground" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                  <div className="text-center"><FlipHorizontal className="mx-auto h-6 w-6" /><p className="mt-2 text-sm font-medium">Back</p></div>
                </div>
              </div>
            </div>
          </div>
          <style>{`.group:hover > div { transform: rotateY(180deg); }`}</style>
        </div></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr></tbody></table></div>
      </section>
    </div>
  );
}
