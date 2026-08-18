"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { HelpCircle } from "lucide-react";

const installCommand = `npx component-library@latest add tooltip-hint`;
const usageCode = `// usage`;

export default function TooltipHintPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Tooltip Hint</h1>
          <Badge variant="primary">Feedback</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A tooltip that provides contextual hints and additional information.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Tooltip Hint Demo</h2><p className="mt-1 text-sm text-muted-foreground">Hover to see tooltip hints.</p></div>
        <ComponentPreview id="tooltip-hint-demo"><div className="w-full p-4"><div className="flex items-center gap-4">
          <div className="relative group">
            <button className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">Password <HelpCircle className="h-4 w-4" /></button>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block"><div className="rounded-lg bg-foreground px-3 py-1.5 text-xs text-background whitespace-nowrap shadow-lg">At least 8 characters</div></div>
          </div>
          <div className="relative group">
            <button className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">Email <HelpCircle className="h-4 w-4" /></button>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block"><div className="rounded-lg bg-foreground px-3 py-1.5 text-xs text-background whitespace-nowrap shadow-lg">We'll never share your email</div></div>
          </div>
        </div></div></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr></tbody></table></div>
      </section>
    </div>
  );
}
