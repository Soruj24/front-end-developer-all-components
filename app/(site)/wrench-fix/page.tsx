"use client";

import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Wrench, Settings, Hammer, Toolbox } from "lucide-react";

const installCommand = `npx component-library@latest add wrench-fix`;
const usageCode = `import { WrenchFix } from "@/components/_wrench-fix";

<WrenchFix status="fixed" />`;

function RepairStatus({ label, done }: { label: string; done: boolean }) {
  return (
    <div className={`flex items-center gap-2 rounded-lg border p-3 ${done ? "border-success/30 bg-success/5" : "border-border"}`}>
      <div className={`h-4 w-4 rounded-full ${done ? "bg-success" : "bg-muted"}`} />
      <span className={`text-sm ${done ? "font-medium text-foreground" : "text-muted-foreground"}`}>{label}</span>
    </div>
  );
}

export default function WrenchFixPage() {
  const repairs = [
    { label: "Diagnose issue", done: true },
    { label: "Apply fix", done: true },
    { label: "Run tests", done: true },
    { label: "Deploy update", done: false },
  ];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Wrench Fix</h1>
          <Badge variant="primary">Tools</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Maintenance and repair tools with status tracking, diagnostics, and fix workflows.
        </p>
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Repair Checklist</h2>
        <div className="flex flex-col gap-2">
          {repairs.map((r) => (
            <RepairStatus key={r.label} {...r} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Tool Icons</h2>
        <div className="flex items-center gap-6">
          {[
            { icon: Wrench, label: "Wrench" },
            { icon: Settings, label: "Settings" },
            { icon: Hammer, label: "Hammer" },
            { icon: Toolbox, label: "Toolbox" },
          ].map((t) => (
            <div key={t.label} className="flex flex-col items-center gap-1">
              <t.icon className="h-6 w-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{t.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Fix Progress</h2>
        <div className="overflow-hidden rounded-full bg-muted">
          <div className="h-3 w-[75%] rounded-full bg-success" />
        </div>
        <p className="text-sm text-muted-foreground">3 of 4 steps complete</p>
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
                <td className="px-4 py-3 font-mono text-xs">status</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;pending&quot; | &quot;in-progress&quot; | &quot;fixed&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;pending&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">progress</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">0</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
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
