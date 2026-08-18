"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add font-size`;
const usageCode = `import { FontSize } from "@/components/ui/font-size";

<FontSize value={size} onChange={setSize} />`;

export default function FontSizePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Font Size</h1>
          <Badge variant="primary">Typography</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A font size control component for adjusting text sizes with preview, presets, and custom value input.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Size Scale</h2><p className="mt-1 text-sm text-muted-foreground">Text displayed at different font sizes.</p></div>
        <ComponentPreview id="font-size-scale">
          <div className="w-full p-4">
            <div className="max-w-md space-y-3">
              {[
                { size: "text-xs", label: "12px", text: "The quick brown fox" },
                { size: "text-sm", label: "14px", text: "The quick brown fox" },
                { size: "text-base", label: "16px", text: "The quick brown fox" },
                { size: "text-lg", label: "18px", text: "The quick brown fox" },
                { size: "text-xl", label: "20px", text: "The quick brown fox" },
                { size: "text-2xl", label: "24px", text: "The quick brown fox" },
                { size: "text-3xl", label: "30px", text: "The quick brown fox" },
              ].map((item) => (
                <div key={item.label} className="flex items-baseline gap-3">
                  <span className="text-[10px] text-muted-foreground w-8 shrink-0">{item.label}</span>
                  <p className={`${item.size} text-foreground`}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Size Selector</h2><p className="mt-1 text-sm text-muted-foreground">Buttons for quick font size selection.</p></div>
        <ComponentPreview id="font-size-selector">
          <div className="w-full p-4">
            <div className="max-w-sm mx-auto space-y-3">
              <div className="flex items-center gap-2">
                {["S", "M", "L", "XL"].map((size, i) => (
                  <button key={size} className={`h-8 w-8 rounded-lg text-xs font-medium ${i === 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{size}</button>
                ))}
                <div className="flex-1" />
                <span className="text-xs text-muted-foreground">14px</span>
              </div>
              <p className="text-sm text-foreground">Preview text at selected size</p>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Slider Control</h2><p className="mt-1 text-sm text-muted-foreground">A slider for continuous font size adjustment.</p></div>
        <ComponentPreview id="font-size-slider">
          <div className="w-full p-4">
            <div className="max-w-sm mx-auto space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">A</span>
                <div className="flex-1 h-2 rounded-full bg-muted relative">
                  <div className="absolute h-full rounded-full bg-primary" style={{ width: "45%" }} />
                  <div className="absolute h-4 w-4 rounded-full bg-white border-2 border-primary top-1/2 -translate-y-1/2" style={{ left: "calc(45% - 8px)" }} />
                </div>
                <span className="text-lg text-foreground">A</span>
              </div>
              <p className="text-center text-sm">Sample text preview at current size</p>
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
