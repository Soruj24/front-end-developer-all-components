"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Circle } from "lucide-react";

const installCommand = `npx component-library@latest add half-circle`;
const usageCode = `// usage`;

export default function HalfCirclePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Half Circle</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A visually appealing half circle component for displaying progress or data in a semicircular gauge format.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Preview</h2><p className="mt-1 text-sm text-muted-foreground">Interactive half circle gauge with animated fill.</p></div>
        <ComponentPreview id="half-circle"><div className="w-full p-4"><div className="flex items-center justify-center gap-8"><div className="relative w-48 h-24 overflow-hidden"><svg viewBox="0 0 200 100" className="w-full h-full"><path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="#e5e7eb" strokeWidth="12" strokeLinecap="round"/><path d="M 10 100 A 90 90 0 0 1 155 35" fill="none" stroke="#3b82f6" strokeWidth="12" strokeLinecap="round" className="transition-all duration-1000"/></svg><span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-2xl font-bold text-foreground">75%</span></div><div className="relative w-48 h-24 overflow-hidden"><svg viewBox="0 0 200 100" className="w-full h-full"><path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="#e5e7eb" strokeWidth="12" strokeLinecap="round"/><path d="M 10 100 A 90 90 0 0 1 45 35" fill="none" stroke="#22c55e" strokeWidth="12" strokeLinecap="round" className="transition-all duration-1000"/></svg><span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-2xl font-bold text-foreground">30%</span></div><div className="relative w-48 h-24 overflow-hidden"><svg viewBox="0 0 200 100" className="w-full h-full"><path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="#e5e7eb" strokeWidth="12" strokeLinecap="round"/><path d="M 10 100 A 90 90 0 0 1 175 80" fill="none" stroke="#f59e0b" strokeWidth="12" strokeLinecap="round" className="transition-all duration-1000"/></svg><span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-2xl font-bold text-foreground">90%</span></div></div></div></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">value</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">0</td><td className="px-4 py-3">Yes</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">size</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">150</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">strokeWidth</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">10</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">color</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">#3b82f6</td><td className="px-4 py-3">No</td></tr>
        </tbody></table></div>
      </section>
    </div>
  );
}
