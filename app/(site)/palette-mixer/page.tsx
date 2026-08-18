"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Palette } from "lucide-react";

const installCommand = `npx component-library@latest add palette-mixer`;
const usageCode = `import { PaletteMixer } from "@/components/palette-mixer";

<PaletteMixer
  baseColor="#3b82f6"
  onMix={(mixedColor) => handleColorChange(mixedColor)}
/>`;

export default function PaletteMixerPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Palette Mixer</h1>
          <Badge variant="primary">Input</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">An interactive color palette mixer for creating, blending, and managing color schemes in design applications.</p>
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Color Grid</h2>
        <ComponentPreview>
          <div className="w-full max-w-sm rounded-lg border bg-card p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">Color Palette</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6", "#ec4899", "#06b6d4", "#84cc16", "#f43f5e"].map((color) => (
                  <div
                    key={color}
                    className="aspect-square rounded-md cursor-pointer hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Color Sliders</h2>
        <ComponentPreview>
          <div className="w-full max-w-sm rounded-lg border bg-card p-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <label className="w-8 text-sm font-medium text-red-500">R</label>
                <div className="flex-1 h-2 rounded-full bg-gradient-to-r from-red-900 to-red-500" />
                <span className="w-8 text-sm text-muted-foreground">59</span>
              </div>
              <div className="flex items-center gap-3">
                <label className="w-8 text-sm font-medium text-green-500">G</label>
                <div className="flex-1 h-2 rounded-full bg-gradient-to-r from-green-900 to-green-500" />
                <span className="w-8 text-sm text-muted-foreground">130</span>
              </div>
              <div className="flex items-center gap-3">
                <label className="w-8 text-sm font-medium text-blue-500">B</label>
                <div className="flex-1 h-2 rounded-full bg-gradient-to-r from-blue-900 to-blue-500" />
                <span className="w-8 text-sm text-muted-foreground">246</span>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Harmony Colors</h2>
        <ComponentPreview>
          <div className="w-full max-w-sm rounded-lg border bg-card p-4">
            <div className="space-y-3">
              <span className="text-sm font-medium">Complementary</span>
              <div className="flex gap-2">
                <div className="h-12 w-12 rounded-lg bg-blue-500" />
                <div className="h-12 w-12 rounded-lg bg-yellow-500" />
              </div>
              <span className="text-sm font-medium">Triadic</span>
              <div className="flex gap-2">
                <div className="h-12 w-12 rounded-lg bg-red-500" />
                <div className="h-12 w-12 rounded-lg bg-green-500" />
                <div className="h-12 w-12 rounded-lg bg-blue-500" />
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
                <td className="px-4 py-3 font-mono text-xs">baseColor</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">{'"#3b82f6"'}</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onMix</td>
                <td className="px-4 py-3 text-muted-foreground">(color: string) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
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
