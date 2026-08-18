"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Webhook, CheckCircle, XCircle } from "lucide-react";

const installCommand = `npx component-library@latest add webhook-log`;
const usageCode = `// usage`;

export default function WebhookLogPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Webhook Log</h1>
          <Badge variant="primary">Tools</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A log viewer for inspecting webhook delivery history and status.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Webhook Log Demo</h2><p className="mt-1 text-sm text-muted-foreground">Webhook delivery history with status.</p></div>
        <ComponentPreview id="webhook-log-demo"><div className="w-full p-4"><div className="max-w-md divide-y rounded-lg border">
          {[{url:"api.example.com/webhook",status:200,time:"2s ago",ok:true},{url:"api.example.com/events",status:500,time:"1m ago",ok:false},{url:"api.example.com/hooks",status:200,time:"5m ago",ok:true}].map((log,i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3 text-sm">
              {log.ok ? <CheckCircle className="h-4 w-4 text-green-500 shrink-0" /> : <XCircle className="h-4 w-4 text-red-500 shrink-0" />}
              <div className="flex-1 truncate font-mono text-xs">{log.url}</div>
              <span className={`text-xs font-medium ${log.ok ? "text-green-600" : "text-red-600"}`}>{log.status}</span>
              <span className="text-xs text-muted-foreground">{log.time}</span>
            </div>
          ))}
        </div></div></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr></tbody></table></div>
      </section>
    </div>
  );
}
