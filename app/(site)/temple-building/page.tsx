"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Building2,
  Landmark,
  MapPin,
  Users,
  Star,
  Clock,
  Ticket,
} from "lucide-react";

const installCommand = `npx shadcn@latest add temple-building`;

const usageCode = `import { TempleBuilding } from "@/components/temple-building";

export default function Demo() {
  return (
    <TempleBuilding
      name="Angkor Wat"
      location="Cambodia"
      rating={4.8}
    />
  );
}`;

function LandmarkCard() {
  const [selected, setSelected] = useState("angkor");

  const landmarks = [
    { id: "angkor", name: "Angkor Wat", country: "Cambodia", rating: 4.8 },
    { id: "taj", name: "Taj Mahal", country: "India", rating: 4.9 },
    { id: "colosseum", name: "Colosseum", country: "Italy", rating: 4.7 },
  ];

  const active = landmarks.find((l) => l.id === selected);

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Landmark className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Landmark Cards</h3>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {landmarks.map((l) => (
          <button
            key={l.id}
            onClick={() => setSelected(l.id)}
            className={`p-3 rounded-lg border text-left transition-all ${
              selected === l.id
                ? "border-primary bg-primary/5"
                : "hover:border-primary/50"
            }`}
          >
            <div className="font-medium text-sm">{l.name}</div>
            <div className="text-xs text-muted-foreground">{l.country}</div>
          </button>
        ))}
      </div>
      {active && (
        <div className="p-4 rounded-lg bg-muted space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-medium">{active.name}</span>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{active.rating}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {active.country}
          </div>
        </div>
      )}
    </div>
  );
}

function TouristSpot() {
  const [category, setCategory] = useState("all");

  const spots = [
    { name: "Machu Picchu", category: "ruins", visitors: "1.5M/year" },
    { name: "Great Wall", category: "monument", visitors: "10M/year" },
    { name: "Petra", category: "ruins", visitors: "1M/year" },
    { name: "Chichen Itza", category: "ruins", visitors: "2.5M/year" },
  ];

  const filtered = category === "all" ? spots : spots.filter((s) => s.category === category);

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5 text-red-500" />
        <h3 className="font-semibold">Tourist Spots</h3>
      </div>
      <div className="flex gap-2">
        {["all", "ruins", "monument"].map((c) => (
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
        {filtered.map((spot) => (
          <div key={spot.name} className="flex items-center justify-between p-3 rounded-lg border">
            <div>
              <div className="font-medium">{spot.name}</div>
              <div className="text-xs text-muted-foreground capitalize">{spot.category}</div>
            </div>
            <div className="text-sm text-muted-foreground">{spot.visitors}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MuseumGuide() {
  const [currentExhibit, setCurrentExhibit] = useState(0);

  const exhibits = [
    { name: "Ancient Egypt", duration: "45 min", artifacts: 120 },
    { name: "Medieval Europe", duration: "60 min", artifacts: 85 },
    { name: "Asian Art", duration: "30 min", artifacts: 200 },
  ];

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Building2 className="h-5 w-5 text-blue-500" />
        <h3 className="font-semibold">Museum Guide</h3>
      </div>
      <div className="space-y-2">
        {exhibits.map((exhibit, i) => (
          <button
            key={exhibit.name}
            onClick={() => setCurrentExhibit(i)}
            className={`w-full p-3 rounded-lg border text-left flex items-center justify-between transition-all ${
              currentExhibit === i
                ? "border-primary bg-primary/5"
                : "hover:border-primary/50"
            }`}
          >
            <div>
              <div className="font-medium">{exhibit.name}</div>
              <div className="text-xs text-muted-foreground">{exhibit.artifacts} artifacts</div>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {exhibit.duration}
            </div>
          </button>
        ))}
      </div>
      <div className="p-4 rounded-lg bg-muted">
        <div className="text-sm font-medium">Current Tour</div>
        <div className="text-2xl font-bold mt-1">{exhibits[currentExhibit].name}</div>
        <div className="text-sm text-muted-foreground mt-1">
          {exhibits[currentExhibit].artifacts} artifacts to explore
        </div>
      </div>
    </div>
  );
}

function HistoricSite() {
  const [status, setStatus] = useState<"open" | "closed" | "maintenance">("open");

  const sites = [
    { name: "Parthenon", hours: "8AM - 6PM", status: "open" },
    { name: "Stonehenge", hours: "9AM - 5PM", status: "maintenance" },
    { name: "Petra", hours: "6AM - 6PM", status: "open" },
  ];

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-green-500" />
        <h3 className="font-semibold">Historic Sites</h3>
      </div>
      <div className="space-y-2">
        {sites.map((site) => (
          <div key={site.name} className="flex items-center justify-between p-3 rounded-lg border">
            <div>
              <div className="font-medium">{site.name}</div>
              <div className="text-xs text-muted-foreground">{site.hours}</div>
            </div>
            <Badge variant={site.status === "open" ? "default" : "secondary"}>
              {site.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

function TravelDestination() {
  const [budget, setBudget] = useState("medium");

  const destinations = {
    low: [
      { name: "Bali", cost: "$50/day", highlight: "Beaches" },
      { name: "Vietnam", cost: "$30/day", highlight: "Street Food" },
    ],
    medium: [
      { name: "Japan", cost: "$100/day", highlight: "Culture" },
      { name: "Italy", cost: "$120/day", highlight: "History" },
    ],
    high: [
      { name: "Maldives", cost: "$300/day", highlight: "Luxury" },
      { name: "Switzerland", cost: "$250/day", highlight: "Scenery" },
    ],
  };

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5 text-purple-500" />
        <h3 className="font-semibold">Travel Destinations</h3>
      </div>
      <div className="flex gap-2">
        {(["low", "medium", "high"] as const).map((b) => (
          <button
            key={b}
            onClick={() => setBudget(b)}
            className={`px-3 py-1 rounded-full text-sm capitalize ${
              budget === b
                ? "bg-primary text-primary-foreground"
                : "bg-secondary"
            }`}
          >
            {b} Budget
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {destinations[budget].map((d) => (
          <div key={d.name} className="p-3 rounded-lg border flex items-center justify-between">
            <div>
              <div className="font-medium">{d.name}</div>
              <div className="text-xs text-muted-foreground">{d.highlight}</div>
            </div>
            <Badge variant="outline">{d.cost}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

function CulturalGuide() {
  const [region, setRegion] = useState("asia");

  const traditions = {
    asia: [
      { name: "Tea Ceremony", origin: "Japan", type: "Ritual" },
      { name: "Diwali", origin: "India", type: "Festival" },
    ],
    europe: [
      { name: "Oktoberfest", origin: "Germany", type: "Festival" },
      { name: "Fiesta", origin: "Spain", type: "Celebration" },
    ],
    americas: [
      { name: "Carnival", origin: "Brazil", type: "Festival" },
      { name: "Day of Dead", origin: "Mexico", type: "Holiday" },
    ],
  };

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Ticket className="h-5 w-5 text-orange-500" />
        <h3 className="font-semibold">Cultural Guide</h3>
      </div>
      <div className="flex gap-2">
        {(["asia", "europe", "americas"] as const).map((r) => (
          <button
            key={r}
            onClick={() => setRegion(r)}
            className={`px-3 py-1 rounded-full text-sm capitalize ${
              region === r
                ? "bg-primary text-primary-foreground"
                : "bg-secondary"
            }`}
          >
            {r}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {traditions[region].map((t) => (
          <div key={t.name} className="p-3 rounded-lg border">
            <div className="flex items-center justify-between">
              <span className="font-medium">{t.name}</span>
              <Badge>{t.type}</Badge>
            </div>
            <div className="text-xs text-muted-foreground mt-1">Origin: {t.origin}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ArchitectureView() {
  const [style, setStyle] = useState("gothic");

  const styles = {
    gothic: { name: "Gothic", period: "12th-16th century", features: ["Pointed arches", "Flying buttresses", "Rose windows"] },
    modern: { name: "Modern", period: "20th century", features: ["Clean lines", "Open spaces", "Industrial materials"] },
    classical: { name: "Classical", period: "Ancient Greece/Rome", features: ["Columns", "Symmetry", "Domed roofs"] },
  };

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Building2 className="h-5 w-5 text-indigo-500" />
        <h3 className="font-semibold">Architecture Styles</h3>
      </div>
      <div className="flex gap-2">
        {(["gothic", "modern", "classical"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStyle(s)}
            className={`px-3 py-1 rounded-full text-sm capitalize ${
              style === s
                ? "bg-primary text-primary-foreground"
                : "bg-secondary"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="p-4 rounded-lg bg-muted space-y-3">
        <div>
          <div className="font-medium">{styles[style].name}</div>
          <div className="text-xs text-muted-foreground">{styles[style].period}</div>
        </div>
        <div className="space-y-1">
          <div className="text-sm font-medium">Key Features:</div>
          {styles[style].features.map((f) => (
            <div key={f} className="flex items-center gap-2 text-sm">
              <Star className="h-3 w-3 text-yellow-500" />
              {f}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TempleBuildingPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline">Components</Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Temple Building</h1>
        <p className="text-lg text-muted-foreground">
          Showcase architectural landmarks, cultural heritage sites, and travel
          destinations with rich interactive displays.
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

        <ComponentPreview name="LandmarkCard">
          <LandmarkCard />
        </ComponentPreview>

        <ComponentPreview name="TouristSpot">
          <TouristSpot />
        </ComponentPreview>

        <ComponentPreview name="MuseumGuide">
          <MuseumGuide />
        </ComponentPreview>

        <ComponentPreview name="HistoricSite">
          <HistoricSite />
        </ComponentPreview>

        <ComponentPreview name="TravelDestination">
          <TravelDestination />
        </ComponentPreview>

        <ComponentPreview name="CulturalGuide">
          <CulturalGuide />
        </ComponentPreview>

        <ComponentPreview name="ArchitectureView">
          <ArchitectureView />
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
                <td className="px-4 py-2 font-mono text-xs">name</td>
                <td className="px-4 py-2">string</td>
                <td className="px-4 py-2">—</td>
                <td className="px-4 py-2">Landmark or site name</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-mono text-xs">location</td>
                <td className="px-4 py-2">string</td>
                <td className="px-4 py-2">—</td>
                <td className="px-4 py-2">Geographic location</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-mono text-xs">rating</td>
                <td className="px-4 py-2">number</td>
                <td className="px-4 py-2">0</td>
                <td className="px-4 py-2">Rating from 0 to 5</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-mono text-xs">category</td>
                <td className="px-4 py-2">string</td>
                <td className="px-4 py-2">—</td>
                <td className="px-4 py-2">Site category (temple, museum, etc.)</td>
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
