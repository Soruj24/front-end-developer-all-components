"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Shrub,
  Leaf,
  TreePine,
  Flower2,
  Sun,
  Droplet,
  Sprout,
} from "lucide-react";

const installCommand = `npx component-library@latest add shrub-garden`;

const usageCode = `import { ShrubGarden } from "@/components/ui";

<ShrubGarden plants={gardenData} layout="grid" />`;

function GardenCardDemo() {
  const [watered, setWatered] = useState(false);
  return (
    <div className="w-full max-w-xs overflow-hidden rounded-lg border">
      <div className="flex h-32 items-center justify-center bg-emerald-50 dark:bg-emerald-950/30">
        <Shrub className="h-16 w-16 text-emerald-600" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Boxwood Hedge</h3>
          <span className="flex items-center gap-1 text-xs text-emerald-600"><Sprout className="h-3 w-3" /> Growing</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">Evergreen shrub, low maintenance</p>
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <Sun className="h-3 w-3" /> Full Sun
          <Droplet className="h-3 w-3" /> Weekly
        </div>
        <button onClick={() => setWatered(true)} className="mt-3 w-full rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700">
          {watered ? "Watered!" : "Water Now"}
        </button>
      </div>
    </div>
  );
}

function PlantGridDemo() {
  const plants = [
    { name: "Lavender", Icon: Flower2, color: "text-purple-600" },
    { name: "Fern", Icon: Leaf, color: "text-green-600" },
    { name: "Pine", Icon: TreePine, color: "text-green-800" },
    { name: "Shrub", Icon: Shrub, color: "text-emerald-600" },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {plants.map((p) => (
        <div key={p.name} className="flex flex-col items-center gap-2 rounded-lg border p-4 hover:bg-muted/50">
          <p.Icon className={`h-8 w-8 ${p.color}`} />
          <span className="text-sm font-medium">{p.name}</span>
        </div>
      ))}
    </div>
  );
}

function WateringScheduleDemo() {
  const schedule = [
    { day: "Mon", plant: "Lavender", done: true },
    { day: "Wed", plant: "Boxwood", done: true },
    { day: "Fri", plant: "Fern", done: false },
    { day: "Sun", plant: "Pine", done: false },
  ];
  return (
    <div className="w-full max-w-sm space-y-2">
      <h3 className="text-sm font-medium">Watering Schedule</h3>
      {schedule.map((s) => (
        <div key={s.day} className="flex items-center justify-between rounded-md border px-3 py-2">
          <div className="flex items-center gap-2">
            <Droplet className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">{s.day}</span>
            <span className="text-sm text-muted-foreground">- {s.plant}</span>
          </div>
          <span className={`text-xs font-medium ${s.done ? "text-emerald-600" : "text-orange-500"}`}>
            {s.done ? "Done" : "Pending"}
          </span>
        </div>
      ))}
    </div>
  );
}

function GrowthTrackerDemo() {
  const [weeks, setWeeks] = useState(4);
  const height = weeks * 2.5;
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-end gap-1" style={{ height: 120 }}>
        {Array.from({ length: weeks }, (_, i) => (
          <div key={i} className="w-6 rounded-t bg-emerald-500 transition-all" style={{ height: (i + 1) * 20 }} />
        ))}
      </div>
      <p className="text-sm text-muted-foreground">Growth: {height.toFixed(1)} cm over {weeks} weeks</p>
      <button onClick={() => setWeeks(Math.min(12, weeks + 1))} className="rounded-md border px-3 py-1 text-sm hover:bg-muted">
        Add Week
      </button>
    </div>
  );
}

function SeasonalGuideDemo() {
  const seasons = [
    { name: "Spring", Icon: Sprout, color: "text-pink-500", tip: "Prune and fertilize" },
    { name: "Summer", Icon: Sun, color: "text-yellow-500", tip: "Water deeply" },
    { name: "Autumn", Icon: Leaf, color: "text-orange-500", tip: "Mulch roots" },
    { name: "Winter", Icon: TreePine, color: "text-blue-500", tip: "Protect from frost" },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {seasons.map((s) => (
        <div key={s.name} className="rounded-lg border p-3 text-center">
          <s.Icon className={`mx-auto mb-2 h-6 w-6 ${s.color}`} />
          <p className="text-sm font-medium">{s.name}</p>
          <p className="mt-1 text-xs text-muted-foreground">{s.tip}</p>
        </div>
      ))}
    </div>
  );
}

function PlantTagDemo() {
  const [selected, setSelected] = useState<string | null>(null);
  const tags = ["Full Sun", "Shade", "Drought Tolerant", "Flowering", "Evergreen"];
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <button key={t} onClick={() => setSelected(selected === t ? null : t)} className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${selected === t ? "bg-emerald-600 text-white" : "bg-background hover:bg-muted"}`}>
          {t}
        </button>
      ))}
    </div>
  );
}

function GardenStatsDemo() {
  const stats = [
    { label: "Total Plants", value: "24", Icon: Shrub },
    { label: "Watered Today", value: "8", Icon: Droplet },
    { label: "Sunlight Hours", value: "6.5h", Icon: Sun },
    { label: "New Sprouts", value: "3", Icon: Sprout },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="rounded-lg border p-3">
          <s.Icon className="mb-1 h-4 w-4 text-emerald-600" />
          <p className="text-2xl font-bold">{s.value}</p>
          <p className="text-xs text-muted-foreground">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

export default function ShrubGardenPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Shrub Garden</h1>
          <Badge variant="primary">Gardening</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A comprehensive garden management system with plant tracking, watering schedules, growth monitoring, and seasonal care guides.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Garden Card</h2>
        <ComponentPreview component="ShrubGardenCardDemo">
          <GardenCardDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Plant Grid</h2>
        <ComponentPreview component="ShrubGardenPlantGridDemo">
          <PlantGridDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Watering Schedule</h2>
        <ComponentPreview component="ShrubGardenWateringScheduleDemo">
          <WateringScheduleDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Growth Tracker</h2>
        <ComponentPreview component="ShrubGardenGrowthTrackerDemo">
          <GrowthTrackerDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Seasonal Guide</h2>
        <ComponentPreview component="ShrubGardenSeasonalGuideDemo">
          <SeasonalGuideDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Plant Tags</h2>
        <ComponentPreview component="ShrubGardenPlantTagDemo">
          <PlantTagDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Garden Stats</h2>
        <ComponentPreview component="ShrubGardenStatsDemo">
          <GardenStatsDemo />
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
                <td className="px-4 py-3 font-mono text-xs">plants</td>
                <td className="px-4 py-3 text-muted-foreground">Plant[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">layout</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"grid\" | \"list\" | \"freeform\""}</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"grid\""}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">showSchedule</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onWater</td>
                <td className="px-4 py-3 text-muted-foreground">(plantId: string) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">season</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"spring\" | \"summer\" | \"autumn\" | \"winter\""}</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"spring\""}</td>
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
