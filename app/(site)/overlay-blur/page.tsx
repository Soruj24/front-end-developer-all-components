"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Eye } from "lucide-react";

const installCommand = `npx component-library@latest add overlay-blur`;
const usageCode = `// usage`;

export default function OverlayBlurPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Overlay Blur</h1>
          <Badge variant="primary">Visual</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A blur overlay component that creates a frosted glass effect over content with adjustable blur intensity.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Preview</h2><p className="mt-1 text-sm text-muted-foreground">Blur overlay with frosted glass effect.</p></div>
        <ComponentPreview id="overlay-blur"><div className="w-full p-4"><div className="flex flex-col gap-6"><div className="relative rounded-xl overflow-hidden h-48"><div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/20 to-pink-500/20"></div><div className="absolute inset-0 backdrop-blur-sm bg-background/30 flex items-center justify-center"><span className="text-lg font-semibold text-foreground">Blurred Content</span></div></div><div className="relative rounded-xl overflow-hidden h-48"><div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-green-500/30"></div><div className="absolute inset-0 backdrop-blur-md bg-background/20 flex items-center justify-center"><span className="text-lg font-semibold text-foreground">Heavy Blur</span></div></div><div className="grid grid-cols-3 gap-3">{["Light","Medium","Heavy"].map((l,i)=>(<div key={i} className="relative h-24 rounded-lg overflow-hidden"><div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/10"></div><div className={`absolute inset-0 bg-background/${i===0?"10":i===1?"20":"30"} backdrop-blur-${i===0?"sm":i===1?"md":"lg"} flex items-center justify-center`}><span className="text-xs font-medium text-foreground">{l}</span></div></div>))}</div></div></div></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">children</td><td className="px-4 py-3 text-muted-foreground">ReactNode</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">blur</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">4</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">opacity</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">0.5</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
        </tbody></table></div>
      </section>
    </div>
  );
}
