"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Telescope,
  Eye,
  Star,
  Search,
  ZoomIn,
  Compass,
  Globe,
} from "lucide-react";

const installCommand = `npx shadcn@latest add telescope-view`;

const usageCode = `import { TelescopeView } from "@/components/telescope-view";

export default function Demo() {
  return (
    <TelescopeView
      magnification={100}
      onSearch={(target) => console.log(target)}
    />
  );
}`;

function SpaceViewer() {
  const [magnification, setMagnification] = useState(50);
  const [target, setTarget] = useState("Andromeda Galaxy");

  const celestialBodies = [
    { name: "Andromeda Galaxy", type: "Galaxy", distance: "2.5M ly" },
    { name: "Orion Nebula", type: "Nebula", distance: "1,344 ly" },
    { name: "Pleiades", type: "Star Cluster", distance: "444 ly" },
  ];

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Telescope className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Space Viewer</h3>
      </div>
      <div className="aspect-square rounded-lg bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="rounded-full bg-white/20 blur-sm"
            style={{
              width: `${magnification / 5}px`,
              height: `${magnification / 5}px`,
            }}
          />
        </div>
        <div className="absolute bottom-2 left-2 text-xs text-white/70">
          {target} | {magnification}x
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Magnification: {magnification}x</label>
        <input
          type="range"
          min={10}
          max={500}
          value={magnification}
          onChange={(e) => setMagnification(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {celestialBodies.map((body) => (
          <button
            key={body.name}
            onClick={() => setTarget(body.name)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              target === body.name
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {body.name}
          </button>
        ))}
      </div>
    </div>
  );
}

function StarGazing() {
  const [selectedStar, setSelectedStar] = useState<string | null>(null);

  const stars = [
    { name: "Sirius", magnitude: -1.46, constellation: "Canis Major" },
    { name: "Betelgeuse", magnitude: 0.42, constellation: "Orion" },
    { name: "Polaris", magnitude: 1.98, constellation: "Ursa Minor" },
    { name: "Vega", magnitude: 0.03, constellation: "Lyra" },
  ];

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Star className="h-5 w-5 text-yellow-500" />
        <h3 className="font-semibold">Star Gazing Guide</h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {stars.map((star) => (
          <button
            key={star.name}
            onClick={() => setSelectedStar(star.name)}
            className={`p-3 rounded-lg border text-left transition-all ${
              selectedStar === star.name
                ? "border-primary bg-primary/5"
                : "hover:border-primary/50"
            }`}
          >
            <div className="font-medium">{star.name}</div>
            <div className="text-xs text-muted-foreground">
              Magnitude: {star.magnitude}
            </div>
            <div className="text-xs text-muted-foreground">
              {star.constellation}
            </div>
          </button>
        ))}
      </div>
      {selectedStar && (
        <div className="p-3 rounded-lg bg-muted">
          <p className="text-sm">
            Viewing {selectedStar} - Best viewed during winter months in the
            Northern Hemisphere.
          </p>
        </div>
      )}
    </div>
  );
}

function PlanetFinder() {
  const [filter, setFilter] = useState("all");

  const planets = [
    { name: "Mercury", visible: true, bestTime: "Mar, Sep" },
    { name: "Venus", visible: true, bestTime: "Apr, Aug" },
    { name: "Mars", visible: false, bestTime: "Oct, Dec" },
    { name: "Jupiter", visible: true, bestTime: "Jun, Jul" },
    { name: "Saturn", visible: false, bestTime: "Aug, Sep" },
  ];

  const visiblePlanets = filter === "visible"
    ? planets.filter((p) => p.visible)
    : planets;

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Globe className="h-5 w-5 text-blue-500" />
        <h3 className="font-semibold">Planet Finder</h3>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded-md text-sm ${
            filter === "all" ? "bg-primary text-primary-foreground" : "bg-muted"
          }`}
        >
          All Planets
        </button>
        <button
          onClick={() => setFilter("visible")}
          className={`px-3 py-1 rounded-md text-sm ${
            filter === "visible" ? "bg-primary text-primary-foreground" : "bg-muted"
          }`}
        >
          Visible Now
        </button>
      </div>
      <div className="space-y-2">
        {visiblePlanets.map((planet) => (
          <div
            key={planet.name}
            className="flex items-center justify-between p-2 rounded-lg border"
          >
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span className="font-medium">{planet.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={planet.visible ? "default" : "secondary"}>
                {planet.visible ? "Visible" : "Not Visible"}
              </Badge>
              <span className="text-xs text-muted-foreground">
                Best: {planet.bestTime}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConstellationMap() {
  const [selected, setSelected] = useState("Orion");

  const constellations = [
    { name: "Orion", stars: 7, season: "Winter" },
    { name: "Ursa Major", stars: 7, season: "Spring" },
    { name: "Cassiopeia", stars: 5, season: "Fall" },
  ];

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Compass className="h-5 w-5 text-green-500" />
        <h3 className="font-semibold">Constellation Map</h3>
      </div>
      <div className="aspect-video rounded-lg bg-slate-950 relative">
        {constellations.map((c, i) => (
          <div
            key={c.name}
            className={`absolute w-3 h-3 rounded-full transition-all ${
              selected === c.name
                ? "bg-yellow-400 scale-150"
                : "bg-white/60"
            }`}
            style={{ top: `${30 + i * 25}%`, left: `${20 + i * 25}%` }}
            onClick={() => setSelected(c.name)}
          />
        ))}
        <div className="absolute bottom-2 left-2 text-xs text-white/70">
          Selected: {selected}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {constellations.map((c) => (
          <button
            key={c.name}
            onClick={() => setSelected(c.name)}
            className={`p-2 rounded-lg text-sm text-center ${
              selected === c.name
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            <div className="font-medium">{c.name}</div>
            <div className="text-xs opacity-80">{c.season}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function SkySearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const database = [
    "Andromeda Galaxy",
    "Orion Nebula",
    "Pleiades Star Cluster",
    "Milky Way",
    "Alpha Centauri",
  ];

  const handleSearch = () => {
    const filtered = database.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Search className="h-5 w-5 text-purple-500" />
        <h3 className="font-semibold">Sky Search</h3>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search celestial objects..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border bg-background text-sm"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm"
        >
          Search
        </button>
      </div>
      <div className="space-y-2">
        {results.length > 0 ? (
          results.map((r) => (
            <div key={r} className="p-2 rounded-lg border flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">{r}</span>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">
            {query ? "No results found" : "Enter a search term"}
          </p>
        )}
      </div>
    </div>
  );
}

function CosmicZoom() {
  const [zoomLevel, setZoomLevel] = useState(1);

  const zoomLevels = [
    { level: 1, label: "Naked Eye", description: "See thousands of stars" },
    { level: 10, label: "Binoculars", description: "Resolve star clusters" },
    { level: 50, label: "Small Telescope", description: "See planet details" },
    { level: 200, label: "Large Telescope", description: "Deep sky objects" },
  ];

  const current = zoomLevels.find((z) => z.level === zoomLevel) || zoomLevels[0];

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <ZoomIn className="h-5 w-5 text-orange-500" />
        <h3 className="font-semibold">Cosmic Zoom</h3>
      </div>
      <div className="flex gap-2 flex-wrap">
        {zoomLevels.map((z) => (
          <button
            key={z.level}
            onClick={() => setZoomLevel(z.level)}
            className={`px-3 py-1 rounded-full text-sm ${
              zoomLevel === z.level
                ? "bg-primary text-primary-foreground"
                : "bg-secondary"
            }`}
          >
            {z.label} ({z.level}x)
          </button>
        ))}
      </div>
      <div className="p-4 rounded-lg bg-muted space-y-2">
        <div className="font-medium">{current.label}</div>
        <div className="text-sm text-muted-foreground">{current.description}</div>
        <div className="w-full bg-background rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all"
            style={{ width: `${(zoomLevel / 200) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function AstronomyTool() {
  const [activeTab, setActiveTab] = useState("calculator");

  const tabs = [
    { id: "calculator", label: "Light Year Calc" },
    { id: "converter", label: "Unit Converter" },
    { id: "timer", label: "Exposure Timer" },
  ];

  const [distance, setDistance] = useState("");
  const lightYears = distance ? (Number(distance) * 3.26).toFixed(2) : "0";

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Eye className="h-5 w-5 text-cyan-500" />
        <h3 className="font-semibold">Astronomy Toolkit</h3>
      </div>
      <div className="flex gap-1 p-1 bg-muted rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-3 py-1.5 rounded-md text-sm transition-colors ${
              activeTab === tab.id
                ? "bg-background shadow-sm font-medium"
                : "text-muted-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {activeTab === "calculator" && (
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium">Distance (parsecs)</label>
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="Enter distance..."
              className="w-full mt-1 px-3 py-2 rounded-md border bg-background text-sm"
            />
          </div>
          <div className="p-3 rounded-lg bg-muted">
            <span className="text-sm">Equivalent: </span>
            <span className="font-medium">{lightYears} light years</span>
          </div>
        </div>
      )}
      {activeTab === "converter" && (
        <div className="p-4 text-sm text-muted-foreground text-center">
          Convert between AU, light years, parsecs, and more.
        </div>
      )}
      {activeTab === "timer" && (
        <div className="p-4 text-sm text-muted-foreground text-center">
          Calculate optimal exposure times for astrophotography.
        </div>
      )}
    </div>
  );
}

export default function TelescopeViewPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline">Components</Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Telescope View</h1>
        <p className="text-lg text-muted-foreground">
          Interactive astronomical viewer for exploring celestial objects,
          constellations, and deep-sky phenomena.
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

        <ComponentPreview name="SpaceViewer">
          <SpaceViewer />
        </ComponentPreview>

        <ComponentPreview name="StarGazing">
          <StarGazing />
        </ComponentPreview>

        <ComponentPreview name="PlanetFinder">
          <PlanetFinder />
        </ComponentPreview>

        <ComponentPreview name="ConstellationMap">
          <ConstellationMap />
        </ComponentPreview>

        <ComponentPreview name="SkySearch">
          <SkySearch />
        </ComponentPreview>

        <ComponentPreview name="CosmicZoom">
          <CosmicZoom />
        </ComponentPreview>

        <ComponentPreview name="AstronomyTool">
          <AstronomyTool />
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
                <td className="px-4 py-2 font-mono text-xs">magnification</td>
                <td className="px-4 py-2">number</td>
                <td className="px-4 py-2">50</td>
                <td className="px-4 py-2">Zoom level for the viewer</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-mono text-xs">target</td>
                <td className="px-4 py-2">string</td>
                <td className="px-4 py-2">—</td>
                <td className="px-4 py-2">Celestial object to display</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-mono text-xs">onSearch</td>
                <td className="px-4 py-2">{"(query: string) => void"}</td>
                <td className="px-4 py-2">—</td>
                <td className="px-4 py-2">Callback when search is performed</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-mono text-xs">showGrid</td>
                <td className="px-4 py-2">boolean</td>
                <td className="px-4 py-2">false</td>
                <td className="px-4 py-2">Show coordinate grid overlay</td>
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
