"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Zap, ZapOff, Battery, BatteryLow, BatteryFull } from "lucide-react";

const installCommand = `npx component-library@latest add zap-lightning`;
const usageCode = `import { ZapLightning } from "@/components/_zap-lightning";

<ZapLightning power={85} />`;

function PowerBar({ level, label }: { level: number; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-12 text-right text-xs text-muted-foreground">{label}</span>
      <div className="flex-1 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-2 rounded-full ${level > 60 ? "bg-success" : level > 30 ? "bg-warning" : "bg-danger"}`}
          style={{ width: `${level}%` }}
        />
      </div>
      <span className="w-8 text-xs text-muted-foreground">{level}%</span>
    </div>
  );
}

function BatteryIndicator({ level }: { level: number }) {
  const Icon = level > 75 ? BatteryFull : level > 25 ? Battery : BatteryLow;
  const color = level > 60 ? "text-success" : level > 30 ? "text-warning" : "text-danger";
  return (
    <div className="flex flex-col items-center gap-1">
      <Icon className={`h-8 w-8 ${color}`} />
      <span className="text-xs text-muted-foreground">{level}%</span>
    </div>
  );
}

export default function ZapLightningPage() {
  const [active, setActive] = useState(true);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Zap Lightning</h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Lightning bolt animations with power indicators, battery states, and energy effects.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Zap Toggle</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActive(!active)}
            className={`flex h-12 w-12 items-center justify-center rounded-full ${active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
          >
            {active ? <Zap className="h-6 w-6" /> : <ZapOff className="h-6 w-6" />}
          </button>
          <span className="text-sm font-medium">{active ? "Powered On" : "Powered Off"}</span>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Battery Levels</h2>
        <div className="flex items-center gap-6">
          {[100, 75, 50, 25, 10].map((l) => (
            <BatteryIndicator key={l} level={l} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Power Bars</h2>
        <div className="flex flex-col gap-3">
          <PowerBar level={100} label="Full" />
          <PowerBar level={65} label="Medium" />
          <PowerBar level={30} label="Low" />
          <PowerBar level={10} label="Critical" />
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
                <td className="px-4 py-3 font-mono text-xs">power</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">100</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">animated</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
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
