"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { ArrowRight } from "lucide-react";

const installCommand = `npx component-library@latest add arrow-cursor`;
const usageCode = `import { ArrowCursor } from "@/components/ui/arrow-cursor";

<ArrowCursor direction="right" size="md" />`;

export default function ArrowCursorPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Arrow Cursor</h1>
          <Badge variant="primary">Input</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">Custom arrow cursor indicators for navigation hints, directional cues, and interactive pointer elements.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Arrow Directions</h2><p className="mt-1 text-sm text-muted-foreground">Arrow cursors pointing in different directions.</p></div>
        <ComponentPreview id="arrow-cursor-directions">
          <div className="w-full p-4">
            <div className="flex items-center gap-8 justify-center">
              {["left", "up", "right", "down"].map((dir) => (
                <div key={dir} className="flex flex-col items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <ArrowRight className={`h-5 w-5 text-primary ${dir === "left" ? "rotate-180" : dir === "up" ? "-rotate-90" : dir === "down" ? "rotate-90" : ""}`} />
                  </div>
                  <span className="text-xs text-muted-foreground capitalize">{dir}</span>
                </div>
              ))}
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Cursor Sizes</h2><p className="mt-1 text-sm text-muted-foreground">Different sizes of arrow cursors.</p></div>
        <ComponentPreview id="arrow-cursor-sizes">
          <div className="w-full p-4">
            <div className="flex items-end gap-6 justify-center">
              {["sm", "md", "lg", "xl"].map((size) => (
                <div key={size} className="flex flex-col items-center gap-2">
                  <div className={`rounded-full bg-primary/10 flex items-center justify-center ${size === "sm" ? "h-8 w-8" : size === "md" ? "h-10 w-10" : size === "lg" ? "h-12 w-12" : "h-16 w-16"}`}>
                    <ArrowRight className={`text-primary ${size === "sm" ? "h-4 w-4" : size === "md" ? "h-5 w-5" : size === "lg" ? "h-6 w-6" : "h-8 w-8"}`} />
                  </div>
                  <span className="text-xs text-muted-foreground">{size}</span>
                </div>
              ))}
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Interactive Cursor Card</h2><p className="mt-1 text-sm text-muted-foreground">Arrow cursors used as navigation indicators on cards.</p></div>
        <ComponentPreview id="arrow-cursor-interactive">
          <div className="w-full p-4">
            <div className="grid grid-cols-2 gap-4">
              {["Previous", "Next"].map((label, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg border border-border p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                  {i === 0 && <ArrowRight className="h-5 w-5 text-muted-foreground rotate-180" />}
                  <span className="text-sm font-medium flex-1 text-center">{label}</span>
                  {i === 1 && <ArrowRight className="h-5 w-5 text-muted-foreground" />}
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
