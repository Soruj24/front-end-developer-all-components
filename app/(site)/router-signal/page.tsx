"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Wifi } from "lucide-react";

const installCommand = `npx component-library@latest add router-signal`;
const usageCode = `import { RouterSignal } from "@/components/router-signal";

<RouterSignal
  strength={4}
  network="Home Network"
/>`;

export default function RouterSignalPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Router Signal</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A router signal strength indicator for displaying network connectivity status and Wi-Fi signal information.</p>
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Signal Strength</h2>
        <ComponentPreview>
          <div className="flex items-center gap-4 p-8">
            {[1, 2, 3, 4].map((strength) => (
              <div key={strength} className="flex flex-col items-center gap-2">
                <div className="flex items-end gap-0.5">
                  {[1, 2, 3, 4].map((bar) => (
                    <div key={bar} className={`w-1.5 rounded-sm ${bar <= strength ? "bg-primary" : "bg-muted"}`} style={{ height: `${bar * 4 + 4}px` }} />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">{strength}/4</span>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Network Status</h2>
        <ComponentPreview>
          <div className="w-full max-w-sm rounded-lg border bg-card p-4">
            <div className="flex items-center gap-3">
              <Wifi className="h-6 w-6 text-green-500" />
              <div>
                <p className="text-sm font-medium">Connected</p>
                <p className="text-xs text-muted-foreground">Home Network - 5 GHz</p>
              </div>
            </div>
            <div className="mt-3 flex justify-between text-xs text-muted-foreground">
              <span>Download: 450 Mbps</span>
              <span>Upload: 50 Mbps</span>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Multiple Networks</h2>
        <ComponentPreview>
          <div className="w-full max-w-sm space-y-2">
            {[
              { name: "Home Network", strength: 4, active: true },
              { name: "Office Wi-Fi", strength: 3, active: false },
              { name: "Guest Network", strength: 2, active: false },
            ].map((net) => (
              <div key={net.name} className={`flex items-center justify-between rounded-lg border p-3 ${net.active ? "border-primary bg-primary/5" : ""}`}>
                <div className="flex items-center gap-2">
                  <Wifi className={`h-4 w-4 ${net.active ? "text-primary" : "text-muted-foreground"}`} />
                  <span className="text-sm">{net.name}</span>
                </div>
                <div className="flex items-end gap-0.5">
                  {[1, 2, 3, 4].map((bar) => (
                    <div key={bar} className={`w-1 rounded-sm ${bar <= net.strength ? "bg-primary" : "bg-muted"}`} style={{ height: `${bar * 3 + 3}px` }} />
                  ))}
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
                <td className="px-4 py-3 font-mono text-xs">strength</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">0</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">network</td>
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
