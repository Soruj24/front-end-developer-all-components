"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react";

const installCommand = `npx component-library@latest add toast-alert`;
const usageCode = `// usage`;

export default function ToastAlertPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Toast Alert</h1>
          <Badge variant="primary">Feedback</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A toast notification for showing brief messages and alerts.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Toast Alert Demo</h2><p className="mt-1 text-sm text-muted-foreground">Different toast notification types.</p></div>
        <ComponentPreview id="toast-alert-demo"><div className="w-full p-4 space-y-3">
          <div className="flex items-center gap-3 rounded-lg border bg-background p-3"><CheckCircle className="h-5 w-5 text-green-500 shrink-0" /><p className="text-sm">Changes saved successfully.</p></div>
          <div className="flex items-center gap-3 rounded-lg border bg-background p-3"><AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" /><p className="text-sm">Please review before continuing.</p></div>
          <div className="flex items-center gap-3 rounded-lg border bg-background p-3"><XCircle className="h-5 w-5 text-red-500 shrink-0" /><p className="text-sm">Failed to save. Try again.</p></div>
          <div className="flex items-center gap-3 rounded-lg border bg-background p-3"><Info className="h-5 w-5 text-blue-500 shrink-0" /><p className="text-sm">New update available.</p></div>
        </div></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr></tbody></table></div>
      </section>
    </div>
  );
}
