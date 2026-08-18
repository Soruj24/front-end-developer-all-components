"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add equalizer`;
const usageCode = `import { Equalizer } from "@/components/ui/equalizer";

<Equalizer bands={8} values={levels} />`;

export default function EqualizerPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Equalizer</h1>
          <Badge variant="primary">Media</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">An audio equalizer component with frequency bands, sliders, and visual frequency display for audio applications.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Vertical Bands</h2><p className="mt-1 text-sm text-muted-foreground">Vertical frequency band sliders.</p></div>
        <ComponentPreview id="equalizer-vertical">
          <div className="w-full p-4">
            <div className="flex items-end gap-3 justify-center h-40">
              {[65, 80, 45, 90, 55, 70, 35, 60].map((h, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="w-6 h-32 bg-muted rounded-full relative overflow-hidden">
                    <div className="absolute bottom-0 w-full bg-primary rounded-full transition-all" style={{ height: `${h}%` }} />
                  </div>
                  <span className="text-[9px] text-muted-foreground">{["32", "64", "125", "250", "500", "1K", "4K", "16K"][i]}</span>
                </div>
              ))}
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Horizontal Bars</h2><p className="mt-1 text-sm text-muted-foreground">Horizontal equalizer bands.</p></div>
        <ComponentPreview id="equalizer-horizontal">
          <div className="w-full p-4">
            <div className="max-w-sm space-y-2">
              {[{ label: "Bass", value: 80 }, { label: "Mid", value: 60 }, { label: "Treble", value: 45 }].map((band) => (
                <div key={band.label} className="flex items-center gap-3">
                  <span className="w-12 text-xs text-muted-foreground">{band.label}</span>
                  <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${band.value}%` }} />
                  </div>
                  <span className="w-8 text-xs text-right text-muted-foreground">{band.value}</span>
                </div>
              ))}
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Visualizer</h2><p className="mt-1 text-sm text-muted-foreground">Animated frequency visualizer bars.</p></div>
        <ComponentPreview id="equalizer-visualizer">
          <div className="w-full p-4">
            <div className="flex items-end gap-0.5 justify-center h-20">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="w-2 bg-primary rounded-t animate-pulse" style={{ height: `${20 + Math.random() * 60}%`, animationDelay: `${i * 0.05}s` }} />
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
