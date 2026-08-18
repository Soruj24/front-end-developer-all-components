"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add gallery-grid`;
const usageCode = `import { GalleryGrid } from "@/components/ui/gallery-grid";

<GalleryGrid images={images} />`;

export default function GalleryGridPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Gallery Grid</h1>
          <Badge variant="primary">Layout</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A responsive gallery grid layout for displaying images, photos, and media in masonry or uniform grid patterns.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Uniform Grid</h2><p className="mt-1 text-sm text-muted-foreground">Equal-sized image grid layout.</p></div>
        <ComponentPreview id="gallery-grid-uniform">
          <div className="w-full p-4">
            <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-border" />
              ))}
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Masonry Layout</h2><p className="mt-1 text-sm text-muted-foreground">Variable-height items in a masonry grid.</p></div>
        <ComponentPreview id="gallery-grid-masonry">
          <div className="w-full p-4">
            <div className="columns-3 gap-2 max-w-md mx-auto">
              {[64, 80, 48, 72, 56, 96, 60, 44].map((h, i) => (
                <div key={i} className="mb-2 break-inside-avoid rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-border" style={{ height: h }} />
              ))}
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">With Overlay</h2><p className="mt-1 text-sm text-muted-foreground">Grid items with hover overlay info.</p></div>
        <ComponentPreview id="gallery-grid-overlay">
          <div className="w-full p-4">
            <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
              {["Photo 1", "Photo 2", "Photo 3", "Photo 4"].map((label) => (
                <div key={label} className="relative aspect-square rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-border group cursor-pointer">
                  <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-sm font-medium">{label}</span>
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
