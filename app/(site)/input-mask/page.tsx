"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { TextCursorInput } from "lucide-react";

const installCommand = `npx component-library@latest add input-mask`;
const usageCode = `// usage`;

export default function InputMaskPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Input Mask</h1>
          <Badge variant="primary">Forms</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">An input masking component that formats user input in real-time for phone numbers, dates, and custom patterns.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Preview</h2><p className="mt-1 text-sm text-muted-foreground">Input masks for phone numbers, dates, and credit cards.</p></div>
        <ComponentPreview id="input-mask"><div className="w-full p-4"><div className="flex flex-col gap-4 max-w-md"><div className="flex flex-col gap-1.5"><label className="text-sm font-medium text-foreground">Phone Number</label><div className="flex items-center gap-2 px-3 py-2 rounded-lg border bg-background"><span className="text-sm text-muted-foreground">+1</span><div className="h-4 w-px bg-border"></div><input className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" placeholder="(555) 123-4567" defaultValue="(555) 123-4567" /></div></div><div className="flex flex-col gap-1.5"><label className="text-sm font-medium text-foreground">Expiry Date</label><div className="flex items-center gap-2 px-3 py-2 rounded-lg border bg-background"><input className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" placeholder="MM/YY" defaultValue="12/28" /></div></div><div className="flex flex-col gap-1.5"><label className="text-sm font-medium text-foreground">Credit Card</label><div className="flex items-center gap-2 px-3 py-2 rounded-lg border bg-background"><svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg><input className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground font-mono tracking-wider" placeholder="0000 0000 0000 0000" defaultValue="4242 4242 4242 4242" /></div></div></div></div></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">mask</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">value</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">{""}</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">onChange</td><td className="px-4 py-3 text-muted-foreground">{"(value: string) => void"}</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">placeholder</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">{""}</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
        </tbody></table></div>
      </section>
    </div>
  );
}
