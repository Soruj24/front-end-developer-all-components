"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Power } from "lucide-react";

const installCommand = `npx component-library@latest add power-switch`;
const usageCode = `import { PowerSwitch } from "@/components/power-switch";

<PowerSwitch
  enabled={isOn}
  onToggle={(state) => setPower(state)}
/>`;

export default function PowerSwitchPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Power Switch</h1>
          <Badge variant="primary">Input</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A power toggle switch component with on/off states, visual feedback, and a classic power button design.</p>
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Toggle</h2>
        <ComponentPreview>
          <div className="flex items-center justify-center gap-8 p-8">
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <Power className="h-6 w-6" />
              </div>
              <span className="text-xs text-muted-foreground">Off</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white">
                <Power className="h-6 w-6" />
              </div>
              <span className="text-xs text-green-600">On</span>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Switch Style</h2>
        <ComponentPreview>
          <div className="flex items-center justify-center gap-6 p-8">
            <div className="h-6 w-12 rounded-full bg-muted">
              <div className="h-5 w-5 translate-x-0.5 translate-y-0.5 rounded-full bg-white shadow" />
            </div>
            <div className="h-6 w-12 rounded-full bg-primary">
              <div className="h-5 w-5 translate-x-6 translate-y-0.5 rounded-full bg-white shadow" />
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">With Label</h2>
        <ComponentPreview>
          <div className="w-full max-w-sm space-y-3 rounded-lg border bg-card p-4">
            {["Power", "Wi-Fi", "Bluetooth"].map((label, i) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-sm">{label}</span>
                <div className={`h-5 w-9 rounded-full ${i < 2 ? "bg-primary" : "bg-muted"}`}>
                  <div className={`h-4 w-4 translate-y-0.5 rounded-full bg-white shadow transition-transform ${i < 2 ? "translate-x-4" : "translate-x-0.5"}`} />
                </div>
              </div>
            ))}
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
                <td className="px-4 py-3 font-mono text-xs">enabled</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onToggle</td>
                <td className="px-4 py-3 text-muted-foreground">(enabled: boolean) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
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
