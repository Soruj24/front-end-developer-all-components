"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Radar } from "lucide-react";

const installCommand = `npx component-library@latest add radar-scan`;
const usageCode = `import { RadarScan } from "@/components/radar-scan";

<RadarScan
  targets={scanTargets}
  onDetect={(target) => handleTarget(target)}
/>`;

export default function RadarScanPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Radar Scan</h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">An animated radar scan visualization for detecting targets, monitoring activity, and real-time scanning displays.</p>
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Radar</h2>
        <ComponentPreview>
          <div className="flex items-center justify-center p-8">
            <div className="relative h-32 w-32">
              <div className="absolute inset-0 rounded-full border border-primary/30" />
              <div className="absolute inset-4 rounded-full border border-primary/20" />
              <div className="absolute inset-8 rounded-full border border-primary/10" />
              <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
              <div className="absolute left-1/2 top-0 h-1/2 w-0.5 origin-bottom -translate-x-1/2 bg-gradient-to-t from-primary to-transparent animate-spin" style={{ animationDuration: "3s" }} />
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">With Targets</h2>
        <ComponentPreview>
          <div className="flex items-center justify-center p-8">
            <div className="relative h-32 w-32">
              <div className="absolute inset-0 rounded-full border border-primary/30" />
              <div className="absolute inset-4 rounded-full border border-primary/20" />
              <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
              <div className="absolute left-1/2 top-0 h-1/2 w-0.5 origin-bottom -translate-x-1/2 bg-gradient-to-t from-primary to-transparent animate-spin" style={{ animationDuration: "3s" }} />
              <div className="absolute left-[30%] top-[25%] h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <div className="absolute right-[20%] top-[40%] h-2 w-2 rounded-full bg-yellow-500 animate-pulse" />
              <div className="absolute bottom-[30%] left-[60%] h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Scan Grid</h2>
        <ComponentPreview>
          <div className="flex items-center justify-center p-8">
            <div className="grid grid-cols-3 gap-2">
              {Array(9).fill(0).map((_, i) => (
                <div key={i} className={`flex h-12 w-12 items-center justify-center rounded border ${i === 4 ? "border-primary bg-primary/10" : "border-muted"}`}>
                  {i === 1 && <div className="h-2 w-2 rounded-full bg-green-500" />}
                  {i === 7 && <div className="h-2 w-2 rounded-full bg-yellow-500" />}
                </div>
              ))}
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
                <td className="px-4 py-3 font-mono text-xs">targets</td>
                <td className="px-4 py-3 text-muted-foreground">ScanTarget[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onDetect</td>
                <td className="px-4 py-3 text-muted-foreground">(target: ScanTarget) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">speed</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">3</td>
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
