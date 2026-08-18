"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Server } from "lucide-react";

const installCommand = `npx component-library@latest add server-rack`;
const usageCode = `import { ServerRack } from "@/components/server-rack";

<ServerRack
  servers={serverList}
  onStatusChange={(server) => handleStatus(server)}
/>`;

export default function ServerRackPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Server Rack</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A server rack display component for monitoring server status, resource usage, and infrastructure health.</p>
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Single Server</h2>
        <ComponentPreview>
          <div className="w-full max-w-sm rounded-lg border bg-card p-4">
            <div className="flex items-center gap-3">
              <Server className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Web Server 01</p>
                <p className="text-xs text-muted-foreground">Uptime: 99.9%</p>
              </div>
              <div className="ml-auto h-2 w-2 rounded-full bg-green-500" />
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Server List</h2>
        <ComponentPreview>
          <div className="w-full max-w-sm space-y-2">
            {[
              { name: "Web Server", status: "healthy", load: 45 },
              { name: "Database", status: "healthy", load: 72 },
              { name: "Cache Server", status: "warning", load: 89 },
            ].map((server) => (
              <div key={server.name} className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{server.name}</span>
                  </div>
                  <div className={`h-2 w-2 rounded-full ${server.status === "healthy" ? "bg-green-500" : "bg-yellow-500"}`} />
                </div>
                <div className="mt-2 h-1 w-full rounded-full bg-muted">
                  <div className={`h-1 rounded-full ${server.load > 80 ? "bg-red-500" : server.load > 60 ? "bg-yellow-500" : "bg-green-500"}`} style={{ width: `${server.load}%` }} />
                </div>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Rack View</h2>
        <ComponentPreview>
          <div className="flex justify-center p-8">
            <div className="w-32 rounded-lg border bg-card p-1">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="mb-1 flex items-center gap-1 rounded bg-muted/50 px-2 py-1">
                  <div className={`h-1.5 w-1.5 rounded-full ${i < 3 ? "bg-green-500" : "bg-red-500"}`} />
                  <div className="h-1 flex-1 rounded bg-muted" />
                </div>
              ))}
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
                <td className="px-4 py-3 font-mono text-xs">servers</td>
                <td className="px-4 py-3 text-muted-foreground">ServerInfo[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onStatusChange</td>
                <td className="px-4 py-3 text-muted-foreground">(server: ServerInfo) =&gt; void</td>
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
