"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add color-wheel`;
const usageCode = `import { ColorWheel } from "@/components/ui/color-wheel";

<ColorWheel value={color} onChange={setColor} />`;

export default function ColorWheelPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Color Wheel</h1>
          <Badge variant="primary">Input</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A color picker wheel component for selecting colors visually with hue, saturation, and brightness controls.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Color Wheel</h2><p className="mt-1 text-sm text-muted-foreground">A circular color wheel for visual color selection.</p></div>
        <ComponentPreview id="color-wheel-basic">
          <div className="w-full p-4">
            <div className="flex flex-col items-center gap-4">
              <div className="h-40 w-40 rounded-full" style={{ background: "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)" }}>
                <div className="m-[30%] h-[40%] w-[40%] rounded-full bg-card border-2 border-white shadow-lg" />
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-blue-500 border border-border" />
                <span className="text-sm font-mono">#3B82F6</span>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Swatches</h2><p className="mt-1 text-sm text-muted-foreground">Quick color selection from predefined swatches.</p></div>
        <ComponentPreview id="color-wheel-swatches">
          <div className="w-full p-4">
            <div className="max-w-sm mx-auto space-y-3">
              <div className="grid grid-cols-8 gap-2">
                {["#ef4444", "#f97316", "#eab308", "#22c55e", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899", "#f43f5e", "#fb923c", "#facc15", "#4ade80", "#22d3ee", "#60a5fa", "#a78bfa", "#f472b6"].map((c) => (
                  <button key={c} className="h-8 w-8 rounded-lg border border-border" style={{ backgroundColor: c }} />
                ))}
              </div>
              <div className="flex items-center gap-2">
                {["#ef4444", "#3b82f6", "#22c55e"].map((c) => (
                  <div key={c} className="flex items-center gap-1 px-2 py-1 rounded-md bg-muted">
                    <div className="h-4 w-4 rounded" style={{ backgroundColor: c }} />
                    <span className="text-[10px] font-mono">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Color Picker with Input</h2><p className="mt-1 text-sm text-muted-foreground">Wheel combined with hex input and recent colors.</p></div>
        <ComponentPreview id="color-wheel-input">
          <div className="w-full p-4">
            <div className="max-w-xs mx-auto rounded-xl border border-border bg-card p-4">
              <div className="h-32 rounded-lg mb-3" style={{ background: "linear-gradient(to bottom, transparent, #000), linear-gradient(to right, #fff, hsl(210, 100%, 50%))" }} />
              <div className="h-3 rounded-full" style={{ background: "linear-gradient(to right, hsl(0,100%,50%), hsl(60,100%,50%), hsl(120,100%,50%), hsl(180,100%,50%), hsl(240,100%,50%), hsl(300,100%,50%), hsl(360,100%,50%))" }} />
              <div className="flex gap-2 mt-3">
                <div className="flex-1 px-2 py-1.5 rounded-md border border-border bg-background text-xs font-mono">#3B82F6</div>
                <div className="h-8 w-8 rounded-md bg-blue-500 border border-border" />
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
