"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Plug, Unplug, Wifi, WifiOff, Cable, CableOff } from "lucide-react";

const installCommand = `npx component-library@latest add unplug-disconnect`;
const usageCode = `import { UnplugDisconnect } from "@/components/_unplug-disconnect";

<UnplugDisconnect status="disconnected" />`;

function ConnectionStatus({ label, connected, icon: Icon }: { label: string; connected: boolean; icon: React.ElementType }) {
  return (
    <div className={`flex items-center gap-3 rounded-lg border p-3 ${connected ? "border-success/30 bg-success/5" : "border-danger/30 bg-danger/5"}`}>
      <Icon className={`h-5 w-5 ${connected ? "text-success" : "text-danger"}`} />
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{connected ? "Connected" : "Disconnected"}</p>
      </div>
    </div>
  );
}

export default function UnplugDisconnectPage() {
  const [connected, setConnected] = useState(true);
  const connections = [
    { label: "Wi-Fi", connected: true, icon: Wifi },
    { label: "Bluetooth", connected: false, icon: Cable },
    { label: "USB", connected: true, icon: Plug },
    { label: "Ethernet", connected: false, icon: WifiOff },
  ];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Unplug Disconnect</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Display connection states with plug/unplug icons and status indicators for devices and networks.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Connection List</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {connections.map((c) => (
            <ConnectionStatus key={c.label} {...c} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Toggle Connection</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setConnected(!connected)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ${connected ? "bg-success/10 text-success" : "bg-danger/10 text-danger"}`}
          >
            {connected ? <Plug className="h-4 w-4" /> : <Unplug className="h-4 w-4" />}
            {connected ? "Disconnect" : "Connect"}
          </button>
          <span className="text-sm text-muted-foreground">{connected ? "Device connected" : "Device disconnected"}</span>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Icon Sizes</h2>
        <div className="flex items-end gap-4">
          <Unplug className="h-4 w-4 text-muted-foreground" />
          <Unplug className="h-5 w-5 text-muted-foreground" />
          <Unplug className="h-6 w-6 text-muted-foreground" />
          <Unplug className="h-8 w-8 text-muted-foreground" />
          <Unplug className="h-10 w-10 text-muted-foreground" />
        </div>
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
                <td className="px-4 py-3 text-muted-foreground">&quot;connected&quot; | &quot;disconnected&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;disconnected&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onToggle</td>
                <td className="px-4 py-3 text-muted-foreground">(connected: boolean) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
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
