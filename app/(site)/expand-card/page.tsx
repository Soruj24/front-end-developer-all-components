"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add expand-card`;
const usageCode = `import { ExpandCard } from "@/components/ui/expand-card";

<ExpandCard title="Details">
  <p>Expanded content here</p>
</ExpandCard>`;

export default function ExpandCardPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Expand Card</h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">An expandable card component with smooth height transitions for revealing additional content on demand.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Click to Expand</h2><p className="mt-1 text-sm text-muted-foreground">Cards that expand on click to reveal content.</p></div>
        <ComponentPreview id="expand-card-click">
          <div className="w-full p-4">
            <div className="max-w-sm space-y-2">
              {["Feature Overview", "Pricing Details", "Technical Specs"].map((title, i) => (
                <div key={title} className="rounded-xl border border-border bg-card overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-muted/50">
                    <span className="text-sm font-medium">{title}</span>
                    <span className="text-muted-foreground text-xs">{i === 0 ? "−" : "+"}</span>
                  </div>
                  {i === 0 && <div className="px-4 pb-4 text-sm text-muted-foreground border-t border-border pt-3">This component provides smooth expand and collapse animations with configurable transition speeds.</div>}
                </div>
              ))}
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Hover Expand</h2><p className="mt-1 text-sm text-muted-foreground">Cards that expand on hover.</p></div>
        <ComponentPreview id="expand-card-hover">
          <div className="w-full p-4">
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
              {["Project A", "Project B"].map((name) => (
                <div key={name} className="rounded-xl border border-border bg-card p-4 cursor-pointer hover:p-6 transition-all duration-300">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 mb-2" />
                  <p className="text-sm font-medium">{name}</p>
                  <p className="text-xs text-muted-foreground mt-1 hidden group-hover:block">Hover to see expanded details about this project.</p>
                </div>
              ))}
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Image Expand</h2><p className="mt-1 text-sm text-muted-foreground">Cards with images that expand on interaction.</p></div>
        <ComponentPreview id="expand-card-image">
          <div className="w-full p-4">
            <div className="max-w-sm rounded-xl border border-border bg-card overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-primary/20 to-primary/5" />
              <div className="p-4">
                <h3 className="font-medium text-sm">Photo Gallery</h3>
                <p className="text-xs text-muted-foreground mt-1">Click to expand and see more details about this gallery.</p>
                <div className="mt-3 flex gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted">12 photos</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted">Updated 2h ago</span>
                </div>
              </div>
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
