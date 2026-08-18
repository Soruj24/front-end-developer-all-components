"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Sun } from "lucide-react";

const installCommand = `npx component-library@latest add brightness-control`;
const usageCode = `import { BrightnessControl } from "@/components/ui/brightness-control";

<BrightnessControl value={75} onChange={handleChange} />`;

export default function BrightnessControlPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Brightness Control</h1>
          <Badge variant="primary">Input</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A brightness adjustment control with slider, visual preview, and value display for media settings.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Slider Control</h2><p className="mt-1 text-sm text-muted-foreground">A slider with sun icon for brightness adjustment.</p></div>
        <ComponentPreview id="brightness-control-slider">
          <div className="w-full p-4">
            <div className="max-w-sm mx-auto space-y-4">
              <div className="flex items-center gap-4">
                <Sun className="h-5 w-5 text-yellow-500" />
                <div className="flex-1 h-2 rounded-full bg-muted relative">
                  <div className="absolute h-full rounded-full bg-yellow-500" style={{ width: "75%" }} />
                  <div className="absolute h-4 w-4 rounded-full bg-white border-2 border-yellow-500 top-1/2 -translate-y-1/2" style={{ left: "calc(75% - 8px)" }} />
                </div>
                <span className="text-sm font-medium w-10 text-right">75%</span>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Preset Levels</h2><p className="mt-1 text-sm text-muted-foreground">Quick preset buttons for common brightness levels.</p></div>
        <ComponentPreview id="brightness-control-presets">
          <div className="w-full p-4">
            <div className="flex gap-2 justify-center">
              {[25, 50, 75, 100].map((level) => (
                <button key={level} className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors">
                  {level === 100 ? "Max" : `${level}%`}
                </button>
              ))}
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Visual Preview</h2><p className="mt-1 text-sm text-muted-foreground">Brightness control with a live preview area.</p></div>
        <ComponentPreview id="brightness-control-preview">
          <div className="w-full p-4">
            <div className="max-w-sm mx-auto space-y-4">
              <div className="h-32 rounded-lg bg-gradient-to-br from-yellow-200 to-orange-300 dark:from-yellow-800 dark:to-orange-700 flex items-center justify-center" style={{ opacity: 0.75 }}>
                <Sun className="h-12 w-12 text-white/80" />
              </div>
              <div className="flex items-center gap-3">
                <Sun className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1 h-2 rounded-full bg-muted relative">
                  <div className="absolute h-full rounded-full bg-primary" style={{ width: "75%" }} />
                </div>
                <span className="text-xs text-muted-foreground">75%</span>
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
