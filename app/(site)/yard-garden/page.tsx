"use client";

import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Trees, Flower2, Shovel } from "lucide-react";

const installCommand = `npx component-library@latest add yard-garden`;
const usageCode = `import { YardGarden } from "@/components/_yard-garden";

<YardGarden zones={gardenZones} />`;

function GardenZone({ name, plants, status }: { name: string; plants: number; status: string }) {
  return (
    <div className="rounded-lg border border-border p-4">
      <div className="mb-2 flex items-center gap-2">
        <Flower2 className="h-4 w-4 text-success" />
        <p className="text-sm font-medium">{name}</p>
      </div>
      <p className="text-xs text-muted-foreground">{plants} plants</p>
      <span className="mt-2 inline-block rounded-full bg-success/10 px-2 py-0.5 text-xs text-success capitalize">{status}</span>
    </div>
  );
}

function PlantRow({ name, lastWatered, nextWater }: { name: string; lastWatered: string; nextWater: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border p-3">
      <div className="flex items-center gap-3">
        <Flower2 className="h-4 w-4 text-success" />
        <span className="text-sm font-medium">{name}</span>
      </div>
      <div className="text-right text-xs text-muted-foreground">
        <p>Last: {lastWatered}</p>
        <p>Next: {nextWater}</p>
      </div>
    </div>
  );
}

export default function YardGardenPage() {
  const zones = [
    { name: "Herb Garden", plants: 12, status: "thriving" },
    { name: "Vegetable Patch", plants: 8, status: "growing" },
    { name: "Flower Bed", plants: 24, status: "blooming" },
  ];

  const plants = [
    { name: "Basil", lastWatered: "2 hours ago", nextWater: "Tomorrow" },
    { name: "Tomatoes", lastWatered: "Yesterday", nextWater: "Today" },
    { name: "Lavender", lastWatered: "3 days ago", nextWater: "Today" },
  ];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Yard Garden</h1>
          <Badge variant="primary">Visual</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Garden management with zone layouts, plant tracking, and watering schedules.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Garden Zones</h2>
        <div className="grid grid-cols-3 gap-3">
          {zones.map((z) => (
            <GardenZone key={z.name} {...z} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Plant Care</h2>
        <div className="flex flex-col gap-2">
          {plants.map((p) => (
            <PlantRow key={p.name} {...p} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Quick Actions</h2>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted">
            <Shovel className="h-4 w-4" />
            Add Plant
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted">
            <Trees className="h-4 w-4" />
            View Layout
          </button>
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
                <td className="px-4 py-3 font-mono text-xs">zones</td>
                <td className="px-4 py-3 text-muted-foreground">Zone[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">showSchedule</td>
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
