"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Scale } from "lucide-react";

const installCommand = `npx component-library@latest add scale-balance`;
const usageCode = `import { ScaleBalance } from "@/components/scale-balance";

<ScaleBalance
  left={50}
  right={50}
  unit="kg"
/>`;

export default function ScaleBalancePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Scale Balance</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A balance scale component for comparing weights, values, and quantities with a classic scale visualization.</p>
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Balanced Scale</h2>
        <ComponentPreview>
          <div className="flex items-center justify-center p-8">
            <div className="relative">
              <div className="h-px w-40 bg-foreground" />
              <div className="absolute left-1/2 top-0 h-8 w-px -translate-x-1/2 -translate-y-full bg-foreground" />
              <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground" />
              <div className="absolute left-0 top-0 flex flex-col items-center">
                <div className="h-4 w-px bg-foreground" />
                <div className="w-12 h-6 rounded-b-lg border-x border-b bg-muted" />
                <span className="text-xs text-muted-foreground">50 kg</span>
              </div>
              <div className="absolute right-0 top-0 flex flex-col items-center">
                <div className="h-4 w-px bg-foreground" />
                <div className="w-12 h-6 rounded-b-lg border-x border-b bg-muted" />
                <span className="text-xs text-muted-foreground">50 kg</span>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Unbalanced</h2>
        <ComponentPreview>
          <div className="flex items-center justify-center p-8">
            <div className="relative">
              <div className="h-px w-40 bg-foreground rotate-[-5deg]" />
              <div className="absolute left-1/2 top-0 h-8 w-px -translate-x-1/2 -translate-y-full bg-foreground" />
              <div className="absolute left-[15%] top-2 flex flex-col items-center">
                <div className="h-4 w-px bg-foreground" />
                <div className="w-12 h-8 rounded-b-lg border-x border-b bg-muted" />
                <span className="text-xs text-muted-foreground">75 kg</span>
              </div>
              <div className="absolute right-[15%] top-0 flex flex-col items-center">
                <div className="h-6 w-px bg-foreground" />
                <div className="w-12 h-4 rounded-b-lg border-x border-b bg-muted" />
                <span className="text-xs text-muted-foreground">25 kg</span>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Comparison Cards</h2>
        <ComponentPreview>
          <div className="w-full max-w-sm rounded-lg border bg-card p-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 text-center">
                <p className="text-2xl font-bold">128</p>
                <p className="text-xs text-muted-foreground">Pros</p>
              </div>
              <Scale className="h-6 w-6 text-muted-foreground" />
              <div className="flex-1 text-center">
                <p className="text-2xl font-bold">96</p>
                <p className="text-xs text-muted-foreground">Cons</p>
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
                <td className="px-4 py-3 font-mono text-xs">left</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">0</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">right</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">0</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">unit</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">{'"kg"'}</td>
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
