"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { RotateCcw } from "lucide-react";

const installCommand = `npx component-library@latest add rotate-ccw`;
const usageCode = `import { RotateCcw } from "@/components/rotate-ccw";

<RotateCcw
  onRotate={() => handleRotate()}
  duration={1000}
/>`;

export default function RotateCcwPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Rotate Ccw</h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A counter-clockwise rotation animation component for refreshing, undoing, and rotating visual elements.</p>
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Rotation</h2>
        <ComponentPreview>
          <div className="flex items-center justify-center gap-8 p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border text-muted-foreground">
              <RotateCcw className="h-5 w-5" />
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full border text-muted-foreground">
              <RotateCcw className="h-5 w-5 animate-spin" />
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Speed Variants</h2>
        <ComponentPreview>
          <div className="flex items-center justify-center gap-6 p-8">
            {[
              { speed: "Slow", duration: "3s" },
              { speed: "Normal", duration: "1s" },
              { speed: "Fast", duration: "0.5s" },
            ].map(({ speed, duration }) => (
              <div key={speed} className="flex flex-col items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border text-muted-foreground">
                  <RotateCcw className="h-5 w-5 animate-spin" style={{ animationDuration: duration }} />
                </div>
                <span className="text-xs text-muted-foreground">{speed}</span>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Loading State</h2>
        <ComponentPreview>
          <div className="flex items-center justify-center gap-4 p-8">
            <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground">
              <RotateCcw className="h-4 w-4 animate-spin" />
              Loading...
            </button>
            <button className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm">
              <RotateCcw className="h-4 w-4" />
              Refresh
            </button>
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
                <td className="px-4 py-3 font-mono text-xs">onRotate</td>
                <td className="px-4 py-3 text-muted-foreground">() =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">duration</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">1000</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">spinning</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
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
