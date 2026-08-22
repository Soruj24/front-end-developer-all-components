"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Tent, TreePine, Compass, Map, Sun, Moon, FlameKindling,  } from "lucide-react";

const installCommand = `npx shadcn@latest add tent-camp`;

const usageCode = `import { TentCamp } from "@/components/tent-camp";

export default function Demo() {
  return (
    <TentCamp
      siteName="Mountain View"
      capacity={4}
      amenities={["fire pit", "water"]}
    />
  );
}`;

function CampsiteCard() {
  const [selectedSite, setSelectedSite] = useState("pine");

  const sites = [
    { id: "pine", name: "Pine Ridge", capacity: 4, price: "$25/night" },
    { id: "lake", name: "Lakeside", capacity: 6, price: "$35/night" },
    { id: "mountain", name: "Mountain View", capacity: 2, price: "$30/night" },
  ];

  const active = sites.find((s) => s.id === selectedSite);

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Tent className="h-5 w-5 text-green-600" />
        <h3 className="font-semibold">Campsite Cards</h3>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {sites.map((site) => (
          <button
            key={site.id}
            onClick={() => setSelectedSite(site.id)}
            className={`p-3 rounded-lg border text-left transition-all ${
              selectedSite === site.id
                ? "border-primary bg-primary/5"
                : "hover:border-primary/50"
            }`}
          >
            <div className="font-medium text-sm">{site.name}</div>
            <div className="text-xs text-muted-foreground">
              Up to {site.capacity} people
            </div>
          </button>
        ))}
      </div>
      {active && (
        <div className="p-4 rounded-lg bg-muted space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-medium">{active.name}</span>
            <Badge>{active.price}</Badge>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">Capacity: {active.capacity}</Badge>
          </div>
        </div>
      )}
    </div>
  );
}

function GearList() {
  const [checkedItems, setCheckedItems] = useState<string[]>(["tent"]);

  const gear = [
    { id: "tent", name: "Tent", essential: true },
    { id: "sleeping", name: "Sleeping Bag", essential: true },
    { id: "stove", name: "Camp Stove", essential: false },
    { id: "lantern", name: "Lantern", essential: false },
    { id: "cooler", name: "Cooler", essential: false },
  ];

  const toggleItem = (id: string) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <TreePine className="h-5 w-5 text-emerald-600" />
        <h3 className="font-semibold">Gear Checklist</h3>
      </div>
      <div className="space-y-2">
        {gear.map((item) => (
          <label
            key={item.id}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer"
          >
            <input
              type="checkbox"
              checked={checkedItems.includes(item.id)}
              onChange={() => toggleItem(item.id)}
              className="rounded border-gray-300"
            />
            <span
              className={`flex-1 text-sm ${
                checkedItems.includes(item.id)
                  ? "line-through text-muted-foreground"
                  : ""
              }`}
            >
              {item.name}
            </span>
            {item.essential && (
              <Badge variant="destructive" className="text-xs">
                Essential
              </Badge>
            )}
          </label>
        ))}
      </div>
      <div className="text-sm text-muted-foreground">
        {checkedItems.length}/{gear.length} items packed
      </div>
    </div>
  );
}

function TrailMap() {
  const [difficulty, setDifficulty] = useState("moderate");

  const trails = [
    { name: "Pine Loop", difficulty: "easy", distance: "2.5 mi", time: "1 hr" },
    { name: "Ridge Trail", difficulty: "moderate", distance: "5 mi", time: "2.5 hrs" },
    { name: "Summit Path", difficulty: "hard", distance: "8 mi", time: "5 hrs" },
  ];

  const filtered = trails.filter((t) => t.difficulty === difficulty);

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Map className="h-5 w-5 text-blue-600" />
        <h3 className="font-semibold">Trail Maps</h3>
      </div>
      <div className="flex gap-2">
        {["easy", "moderate", "hard"].map((d) => (
          <button
            key={d}
            onClick={() => setDifficulty(d)}
            className={`px-3 py-1 rounded-full text-sm capitalize ${
              difficulty === d
                ? "bg-primary text-primary-foreground"
                : "bg-secondary"
            }`}
          >
            {d}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {filtered.map((trail) => (
          <div key={trail.name} className="p-3 rounded-lg border">
            <div className="flex items-center justify-between">
              <span className="font-medium">{trail.name}</span>
              <Badge variant="outline" className="capitalize">
                {trail.difficulty}
              </Badge>
            </div>
            <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
              <span>{trail.distance}</span>
              <span>{trail.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WeatherCheck() {
  const [day, setDay] = useState(0);

  const forecast = [
    { day: "Today", temp: "72°F", condition: "Sunny", icon: Sun },
    { day: "Tomorrow", temp: "68°F", condition: "Cloudy", icon: Sun },
    { day: "Day 3", temp: "65°F", condition: "Rainy", icon: Sun },
  ];

  const WeatherIcon = forecast[day].condition === "Sunny" ? Sun : forecast[day].condition === "Cloudy" ? Sun : Sun;

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Sun className="h-5 w-5 text-yellow-500" />
        <h3 className="font-semibold">Weather Forecast</h3>
      </div>
      <div className="flex gap-2">
        {forecast.map((f, i) => (
          <button
            key={f.day}
            onClick={() => setDay(i)}
            className={`flex-1 p-3 rounded-lg border text-center transition-all ${
              day === i
                ? "border-primary bg-primary/5"
                : "hover:border-primary/50"
            }`}
          >
            <div className="text-sm font-medium">{f.day}</div>
            <div className="text-2xl font-bold mt-1">{f.temp}</div>
            <div className="text-xs text-muted-foreground">{f.condition}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function CampfireSetup() {
  const [stage, setStage] = useState<"prep" | "building" | "lit">("prep");

  const stages = [
    { id: "prep", label: "Preparation", desc: "Gather wood and kindling" },
    { id: "building", label: "Building", desc: "Arrange logs in teepee shape" },
    { id: "lit", label: "Lit", desc: "Fire is burning safely" },
  ];

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <FlameKindling className="h-5 w-5 text-orange-500" />
        <h3 className="font-semibold">Campfire Setup</h3>
      </div>
      <div className="space-y-2">
        {stages.map((s) => (
          <button
            key={s.id}
            onClick={() => setStage(s.id as typeof stage)}
            className={`w-full p-3 rounded-lg border text-left flex items-center gap-3 transition-all ${
              stage === s.id
                ? "border-primary bg-primary/5"
                : "hover:border-primary/50"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                stage === s.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              {stages.indexOf(s) + 1}
            </div>
            <div>
              <div className="font-medium">{s.label}</div>
              <div className="text-xs text-muted-foreground">{s.desc}</div>
            </div>
          </button>
        ))}
      </div>
      {stage === "lit" && (
        <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 text-sm">
          Keep fire attended at all times. Never leave unattended.
        </div>
      )}
    </div>
  );
}

function StarGazing() {
  const [constellation, setConstellation] = useState("orion");

  const constellations = {
    orion: { name: "Orion", visible: "Winter", stars: 7 },
    bigdipper: { name: "Big Dipper", visible: "Spring", stars: 7 },
    cassiopeia: { name: "Cassiopeia", visible: "Fall", stars: 5 },
  };

  const current = constellations[constellation as keyof typeof constellations];

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Moon className="h-5 w-5 text-indigo-400" />
        <h3 className="font-semibold">Night Sky Guide</h3>
      </div>
      <div className="flex gap-2">
        {Object.keys(constellations).map((c) => (
          <button
            key={c}
            onClick={() => setConstellation(c)}
            className={`px-3 py-1 rounded-full text-sm capitalize ${
              constellation === c
                ? "bg-primary text-primary-foreground"
                : "bg-secondary"
            }`}
          >
            {constellations[c as keyof typeof constellations].name}
          </button>
        ))}
      </div>
      <div className="p-4 rounded-lg bg-slate-950 text-white space-y-2">
        <div className="font-medium">{current.name}</div>
        <div className="text-sm text-white/70">
          Best viewing: {current.visible}
        </div>
        <div className="text-sm text-white/70">
          Number of main stars: {current.stars}
        </div>
      </div>
    </div>
  );
}

function OutdoorGear() {
  const [category, setCategory] = useState("shelter");

  const gearItems = {
    shelter: [
      { name: "3-Season Tent", weight: "4 lbs", price: "$200" },
      { name: "Tarp", weight: "1 lb", price: "$50" },
    ],
    sleeping: [
      { name: "Down Bag", weight: "2 lbs", price: "$150" },
      { name: "Sleeping Pad", weight: "1.5 lbs", price: "$80" },
    ],
    cooking: [
      { name: "Camp Stove", weight: "0.5 lbs", price: "$40" },
      { name: "Cookset", weight: "1 lb", price: "$60" },
    ],
  };

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Compass className="h-5 w-5 text-teal-600" />
        <h3 className="font-semibold">Outdoor Gear</h3>
      </div>
      <div className="flex gap-2">
        {(["shelter", "sleeping", "cooking"] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-3 py-1 rounded-full text-sm capitalize ${
              category === c
                ? "bg-primary text-primary-foreground"
                : "bg-secondary"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {gearItems[category].map((item) => (
          <div key={item.name} className="p-3 rounded-lg border flex items-center justify-between">
            <div>
              <div className="font-medium">{item.name}</div>
              <div className="text-xs text-muted-foreground">{item.weight}</div>
            </div>
            <Badge variant="outline">{item.price}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TentCampPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline">Components</Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Tent Camp</h1>
        <p className="text-lg text-muted-foreground">
          Complete camping companion with campsite selection, gear checklists,
          trail maps, and outdoor activity guides.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <CodeBlock code={installCommand} language="bash" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <CodeBlock code={usageCode} language="tsx" />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Examples</h2>

        <ComponentPreview name="CampsiteCard">
          <CampsiteCard />
        </ComponentPreview>

        <ComponentPreview name="GearList">
          <GearList />
        </ComponentPreview>

        <ComponentPreview name="TrailMap">
          <TrailMap />
        </ComponentPreview>

        <ComponentPreview name="WeatherCheck">
          <WeatherCheck />
        </ComponentPreview>

        <ComponentPreview name="CampfireSetup">
          <CampfireSetup />
        </ComponentPreview>

        <ComponentPreview name="StarGazing">
          <StarGazing />
        </ComponentPreview>

        <ComponentPreview name="OutdoorGear">
          <OutdoorGear />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <div className="rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-2 text-left font-medium">Prop</th>
                <th className="px-4 py-2 text-left font-medium">Type</th>
                <th className="px-4 py-2 text-left font-medium">Default</th>
                <th className="px-4 py-2 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2 font-mono text-xs">siteName</td>
                <td className="px-4 py-2">string</td>
                <td className="px-4 py-2">—</td>
                <td className="px-4 py-2">Name of the campsite</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-mono text-xs">capacity</td>
                <td className="px-4 py-2">number</td>
                <td className="px-4 py-2">4</td>
                <td className="px-4 py-2">Maximum number of campers</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-mono text-xs">amenities</td>
                <td className="px-4 py-2">string[]</td>
                <td className="px-4 py-2">[]</td>
                <td className="px-4 py-2">Available amenities</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-mono text-xs">difficulty</td>
                <td className="px-4 py-2">"easy" | "moderate" | "hard"</td>
                <td className="px-4 py-2">"moderate"</td>
                <td className="px-4 py-2">Trail difficulty level</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">className</td>
                <td className="px-4 py-2">string</td>
                <td className="px-4 py-2">—</td>
                <td className="px-4 py-2">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
