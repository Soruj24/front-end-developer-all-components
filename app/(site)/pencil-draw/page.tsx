"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Pencil } from "lucide-react";

const installCommand = `npx component-library@latest add pencil-draw`;
const usageCode = `import { PencilDraw } from "@/components/pencil-draw";

<PencilDraw
  width={400}
  height={300}
  onDraw={(canvas) => handleCanvas(canvas)}
/>`;

export default function PencilDrawPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Pencil Draw</h1>
          <Badge variant="primary">Tools</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A drawing canvas component with pencil-like tools for sketching, annotations, and freeform illustrations.</p>
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Canvas</h2>
        <ComponentPreview>
          <div className="w-full max-w-sm">
            <div className="rounded-lg border bg-white p-1">
              <div className="flex h-48 items-center justify-center border bg-white">
                <Pencil className="h-8 w-8 text-gray-300" />
              </div>
            </div>
            <div className="mt-2 flex gap-2">
              <button className="rounded bg-primary px-3 py-1 text-xs text-primary-foreground">Pen</button>
              <button className="rounded bg-muted px-3 py-1 text-xs text-muted-foreground">Eraser</button>
              <button className="rounded bg-muted px-3 py-1 text-xs text-muted-foreground">Clear</button>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">With Tools Panel</h2>
        <ComponentPreview>
          <div className="w-full max-w-sm">
            <div className="flex gap-2 rounded-t-lg border border-b-0 bg-muted/50 p-2">
              {["Pencil", "Line", "Circle", "Rect"].map((tool, i) => (
                <button key={tool} className={`rounded px-2 py-1 text-xs ${i === 0 ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground"}`}>{tool}</button>
              ))}
            </div>
            <div className="rounded-b-lg border bg-white">
              <div className="flex h-48 items-center justify-center">
                <p className="text-sm text-gray-300">Drawing area</p>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">With Color Picker</h2>
        <ComponentPreview>
          <div className="w-full max-w-sm">
            <div className="flex items-center gap-2 rounded-lg border bg-card p-2">
              {["#000000", "#ef4444", "#3b82f6", "#22c55e"].map((color) => (
                <div key={color} className="h-6 w-6 rounded-full border-2 border-transparent hover:border-foreground cursor-pointer" style={{ backgroundColor: color }} />
              ))}
              <div className="ml-auto flex items-center gap-1">
                <span className="text-xs text-muted-foreground">Size:</span>
                <div className="h-4 w-4 rounded bg-foreground" />
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
                <td className="px-4 py-3 font-mono text-xs">width</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">400</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">height</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">300</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onDraw</td>
                <td className="px-4 py-3 text-muted-foreground">(canvas: HTMLCanvasElement) =&gt; void</td>
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
