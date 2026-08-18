"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Gauge } from "lucide-react";

const installCommand = `npx component-library@latest add meter-gauge`;
const usageCode = `// usage`;

export default function MeterGaugePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Meter Gauge</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A meter/gauge component that displays a value within a range with color-coded zones.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Preview</h2><p className="mt-1 text-sm text-muted-foreground">Meter gauge with color-coded performance zones.</p></div>
        <ComponentPreview id="meter-gauge"><div className="w-full p-4"><div className="flex flex-col gap-6 max-w-md"><div className="flex flex-col gap-2"><div className="flex justify-between text-sm"><span className="font-medium text-foreground">Server Load</span><span className="text-muted-foreground">72%</span></div><div className="relative h-4 rounded-full bg-muted overflow-hidden"><div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500" style={{width:"72%"}}></div></div><div className="flex justify-between text-xs text-muted-foreground"><span>0%</span><span>50%</span><span>100%</span></div></div><div className="flex flex-col gap-2"><div className="flex justify-between text-sm"><span className="font-medium text-foreground">Memory Usage</span><span className="text-muted-foreground">45%</span></div><div className="relative h-4 rounded-full bg-muted overflow-hidden"><div className="absolute inset-y-0 left-0 rounded-full bg-blue-500 transition-all duration-500" style={{width:"45%"}}></div></div></div><div className="flex flex-col gap-2"><div className="flex justify-between text-sm"><span className="font-medium text-foreground">Disk Space</span><span className="text-muted-foreground">89%</span></div><div className="relative h-4 rounded-full bg-muted overflow-hidden"><div className="absolute inset-y-0 left-0 rounded-full bg-red-500 transition-all duration-500" style={{width:"89%"}}></div></div></div></div></div></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">value</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">0</td><td className="px-4 py-3">Yes</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">min</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">0</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">max</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">100</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">label</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
        </tbody></table></div>
      </section>
    </div>
  );
}
