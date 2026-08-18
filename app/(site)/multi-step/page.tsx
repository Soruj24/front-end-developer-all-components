"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { ListOrdered } from "lucide-react";

const installCommand = `npx component-library@latest add multi-step`;
const usageCode = `// usage`;

export default function MultiStepPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Multi Step</h1>
          <Badge variant="primary">Forms</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A multi-step form/wizard component with progress indicator, step validation, and navigation controls.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Preview</h2><p className="mt-1 text-sm text-muted-foreground">Multi-step form wizard with progress tracking.</p></div>
        <ComponentPreview id="multi-step"><div className="w-full p-4"><div className="max-w-md mx-auto"><div className="flex items-center justify-between mb-8">{["Account","Profile","Confirm"].map((step,i)=>(<div key={i} className="flex items-center gap-2"><div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${i===0?"bg-primary text-primary-foreground":i===1?"bg-primary/20 text-primary":"bg-muted text-muted-foreground"}`}>{i<1?<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>:i+1}</div><span className={`text-sm ${i===0?"text-foreground font-medium":"text-muted-foreground"}`}>{step}</span>{i<2&&<div className={`hidden sm:block w-12 h-px ${i===0?"bg-primary":"bg-border"}`}></div>}</div>))}</div><div className="rounded-xl border bg-background p-6"><div className="flex flex-col gap-4"><div className="flex flex-col gap-1.5"><label className="text-sm font-medium text-foreground">Email</label><input className="px-3 py-2 rounded-lg border bg-background text-sm outline-none" placeholder="you@example.com" /></div><div className="flex flex-col gap-1.5"><label className="text-sm font-medium text-foreground">Password</label><input className="px-3 py-2 rounded-lg border bg-background text-sm outline-none" type="password" placeholder="Min 8 characters" /></div></div><div className="flex justify-between mt-6"><button className="px-4 py-2 rounded-lg border text-sm font-medium hover:bg-muted transition-colors" disabled>Back</button><button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">Next</button></div></div></div></div></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">steps</td><td className="px-4 py-3 text-muted-foreground">{"{title: string; content: ReactNode}[]"}</td><td className="px-4 py-3 text-muted-foreground">[]</td><td className="px-4 py-3">Yes</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">currentStep</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">0</td><td className="px-4 py-3">Yes</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">onNext</td><td className="px-4 py-3 text-muted-foreground">{"() => void"}</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">onBack</td><td className="px-4 py-3 text-muted-foreground">{"() => void"}</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
        </tbody></table></div>
      </section>
    </div>
  );
}
