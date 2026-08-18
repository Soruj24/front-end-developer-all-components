"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Shield } from "lucide-react";

const installCommand = `npx component-library@latest add shield-secure`;
const usageCode = `import { ShieldSecure } from "@/components/shield-secure";

<ShieldSecure
  level="high"
  label="Data Encrypted"
/>`;

export default function ShieldSecurePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Shield Secure</h1>
          <Badge variant="primary">Feedback</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A security shield component for displaying protection status, encryption indicators, and security level feedback.</p>
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Security Levels</h2>
        <ComponentPreview>
          <div className="flex items-center gap-6 p-8">
            {[
              { level: "Low", color: "text-yellow-500" },
              { level: "Medium", color: "text-orange-500" },
              { level: "High", color: "text-green-500" },
            ].map(({ level, color }) => (
              <div key={level} className="flex flex-col items-center gap-2">
                <Shield className={`h-8 w-8 ${color}`} />
                <span className="text-xs text-muted-foreground">{level}</span>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Secure Badge</h2>
        <ComponentPreview>
          <div className="flex items-center gap-4 p-8">
            <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1.5">
              <Shield className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-600">Secured</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-muted px-3 py-1.5">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Unsecured</span>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Protection Status</h2>
        <ComponentPreview>
          <div className="w-full max-w-sm rounded-lg border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
                <Shield className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Protected</p>
                <p className="text-xs text-muted-foreground">All systems secure</p>
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
                <td className="px-4 py-3 font-mono text-xs">level</td>
                <td className="px-4 py-3 text-muted-foreground">{'"low" | "medium" | "high"'}</td>
                <td className="px-4 py-3 text-muted-foreground">{'"medium"'}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">label</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
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
