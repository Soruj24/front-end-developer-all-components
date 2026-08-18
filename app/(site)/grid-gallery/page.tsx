"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add grid-gallery`;
const usageCode = `import { GridGallery } from "@/components/ui/grid-gallery";

<GridGallery items={items} columns={3} />`;

export default function GridGalleryPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Grid Gallery</h1>
          <Badge variant="primary">Layout</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A grid gallery component for displaying media collections with responsive layouts and interactive hover states.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">3-Column Grid</h2><p className="mt-1 text-sm text-muted-foreground">Standard three-column gallery layout.</p></div>
        <ComponentPreview id="grid-gallery-3col">
          <div className="w-full p-4">
            <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 border border-border hover:scale-105 transition-transform cursor-pointer" />
              ))}
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Mixed Sizes</h2><p className="mt-1 text-sm text-muted-foreground">Gallery with varying item sizes.</p></div>
        <ComponentPreview id="grid-gallery-mixed">
          <div className="w-full p-4">
            <div className="grid grid-cols-3 gap-2 max-w-lg mx-auto auto-rows-[80px]">
              <div className="col-span-2 row-span-2 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-border" />
              <div className="rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-border" />
              <div className="rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-border" />
              <div className="rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-border" />
              <div className="rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-border" />
              <div className="col-span-2 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 border border-border" />
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">With Captions</h2><p className="mt-1 text-sm text-muted-foreground">Gallery items with caption overlays.</p></div>
        <ComponentPreview id="grid-gallery-captions">
          <div className="w-full p-4">
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
              {["Mountains", "Ocean", "Forest", "Desert"].map((name) => (
                <div key={name} className="relative aspect-square rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 border border-border group cursor-pointer overflow-hidden">
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-sm font-medium">{name}</p>
                  </div>
                </div>
              ))}
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
