"use client";

import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Wheat, Sun, Droplets, Thermometer } from "lucide-react";

const installCommand = `npx component-library@latest add wheat-harvest`;
const usageCode = `import { WheatHarvest } from "@/components/_wheat-harvest";

<WheatHarvest progress={78} />`;

function HarvestStat({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border p-3 text-center">
      <Icon className="mx-auto mb-1 h-5 w-5 text-warning" />
      <p className="text-lg font-semibold">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function CropRow({ name, field, status, yield_: yield_ }: { name: string; field: string; status: string; yield_: string }) {
  const colors: Record<string, string> = {
    ready: "bg-success/10 text-success",
    growing: "bg-primary/10 text-primary",
    pending: "bg-warning/10 text-warning",
  };
  return (
    <div className="flex items-center justify-between rounded-lg border border-border p-3">
      <div>
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs text-muted-foreground">{field}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground">{yield_}</span>
        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${colors[status] || colors.pending}`}>{status}</span>
      </div>
    </div>
  );
}

export default function WheatHarvestPage() {
  const crops = [
    { name: "Winter Wheat", field: "North Acreage", status: "ready", yield_: "4.2 tons" },
    { name: "Spring Barley", field: "South Field", status: "growing", yield_: "3.1 tons" },
    { name: "Oats", field: "East Plot", status: "pending", yield_: "2.8 tons" },
  ];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Wheat Harvest</h1>
          <Badge variant="primary">Visual</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Harvest tracking with crop stats, field status, and yield indicators.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Harvest Stats</h2>
        <div className="grid grid-cols-4 gap-3">
          <HarvestStat icon={Wheat} label="Total Yield" value="12.4t" />
          <HarvestStat icon={Sun} label="Sunny Days" value="18" />
          <HarvestStat icon={Droplets} label="Rainfall" value="2.3in" />
          <HarvestStat icon={Thermometer} label="Avg Temp" value="72°F" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Crop Status</h2>
        <div className="flex flex-col gap-2">
          {crops.map((c) => (
            <CropRow key={c.name} {...c} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Harvest Progress</h2>
        <div className="overflow-hidden rounded-full bg-muted">
          <div className="h-3 w-[78%] rounded-full bg-warning" />
        </div>
        <p className="text-sm text-muted-foreground">78% complete</p>
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
                <td className="px-4 py-3 font-mono text-xs">progress</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">0</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">crops</td>
                <td className="px-4 py-3 text-muted-foreground">CropData[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
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
