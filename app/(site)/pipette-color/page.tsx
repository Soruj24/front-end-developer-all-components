"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Pipette } from "lucide-react";

const installCommand = `npx component-library@latest add pipette-color`;
const usageCode = `import { PipetteColor } from "@/components/pipette-color";

<PipetteColor
  onColorPick={(color) => setSelectedColor(color)}
/>`;

export default function PipetteColorPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Pipette Color</h1>
          <Badge variant="primary">Input</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A color picker input component with an eyedropper/pipette tool for selecting colors from any source or visual element.</p>
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Pipette</h2>
        <ComponentPreview>
          <div className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-muted">
              <Pipette className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <div className="h-8 w-24 rounded-md bg-blue-500" />
              <p className="mt-1 font-mono text-sm text-muted-foreground">#3b82f6</p>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Color Palette</h2>
        <ComponentPreview>
          <div className="w-full max-w-sm rounded-lg border bg-card p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Pipette className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Pick a color</span>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6", "#ec4899", "#06b6d4", "#84cc16", "#f43f5e", "#14b8a6", "#6366f1"].map((color) => (
                  <div key={color} className="aspect-square rounded-md cursor-pointer hover:scale-110 transition-transform" style={{ backgroundColor: color }} />
                ))}
              </div>
              <div className="flex items-center gap-2 rounded-md border p-2">
                <div className="h-6 w-6 rounded bg-blue-500" />
                <span className="font-mono text-xs text-muted-foreground">#3b82f6</span>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">RGB Sliders</h2>
        <ComponentPreview>
          <div className="w-full max-w-sm rounded-lg border bg-card p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-4 text-xs text-red-500">R</span>
                <input type="range" min="0" max="255" defaultValue="59" className="flex-1 accent-red-500" />
                <span className="w-8 text-xs text-muted-foreground">59</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-4 text-xs text-green-500">G</span>
                <input type="range" min="0" max="255" defaultValue="130" className="flex-1 accent-green-500" />
                <span className="w-8 text-xs text-muted-foreground">130</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-4 text-xs text-blue-500">B</span>
                <input type="range" min="0" max="255" defaultValue="246" className="flex-1 accent-blue-500" />
                <span className="w-8 text-xs text-muted-foreground">246</span>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onColorPick</td>
                <td className="px-4 py-3 text-muted-foreground">(color: string) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">defaultValue</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">{'"#000000"'}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
