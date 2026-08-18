"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Mountain, Sun, Cloud, Compass, Map, Tent, TreePine } from "lucide-react";

const installCommand = `npx component-library@latest add mountain-scene`;

const usageCode = `import { MountainScene } from "@/components/mountain-scene";

export default function Page() {
  return <MountainScene />;
}`;

function LandscapeCardDemo() {
  const [elevation, setElevation] = useState(2400);
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="relative mb-4 h-32 overflow-hidden rounded-md bg-gradient-to-b from-sky-300 via-sky-100 to-emerald-200">
        <Mountain className="absolute bottom-2 left-1/2 h-20 w-20 -translate-x-1/2 text-emerald-700" strokeWidth={1} />
        <Sun className="absolute top-2 right-4 h-6 w-6 text-yellow-500" />
        <Cloud className="absolute top-4 left-6 h-5 w-5 text-white/80" />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">Elevation</p>
          <p className="text-2xl font-bold text-foreground">{elevation.toLocaleString()}m</p>
        </div>
        <input
          type="range"
          min={500}
          max={5000}
          value={elevation}
          onChange={(e) => setElevation(Number(e.target.value))}
          className="w-32 accent-emerald-500"
        />
      </div>
    </div>
  );
}

function HikingTrailDemo() {
  const [activeTrail, setActiveTrail] = useState(0);
  const trails = [
    { name: "Pine Ridge", distance: "8.2 km", difficulty: "Moderate", color: "bg-emerald-500" },
    { name: "Summit Path", distance: "14.5 km", difficulty: "Hard", color: "bg-orange-500" },
    { name: "Valley Loop", distance: "5.1 km", difficulty: "Easy", color: "bg-blue-500" },
  ];
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center gap-2">
        <Compass className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Hiking Trails</span>
      </div>
      <div className="flex flex-col gap-2">
        {trails.map((trail, i) => (
          <button
            key={trail.name}
            onClick={() => setActiveTrail(i)}
            className={`flex items-center gap-3 rounded-md border p-3 text-left transition-all ${activeTrail === i ? "border-primary bg-primary/5" : "border-transparent bg-muted/30 hover:bg-muted/50"}`}
          >
            <span className={`h-2 w-2 rounded-full ${trail.color}`} />
            <div className="flex-1">
              <p className="text-xs font-medium">{trail.name}</p>
              <p className="text-[10px] text-muted-foreground">{trail.distance} · {trail.difficulty}</p>
            </div>
            <TreePine className="h-3 w-3 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  );
}

function SunriseViewDemo() {
  const [time, setTime] = useState(6);
  const sunPosition = ((time - 5) / 3) * 100;
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="relative mb-4 h-28 overflow-hidden rounded-md" style={{ background: `linear-gradient(to top, #854d0e ${time < 7 ? "80%" : "40%"}, #fbbf24 ${time < 7 ? "90%" : "50%"}, #7dd3fc 100%)` }}>
        <Sun className="absolute text-yellow-400 transition-all duration-500" style={{ bottom: `${Math.min(sunPosition, 80)}%`, left: "50%", transform: "translateX(-50%)" }} />
      </div>
      <div className="flex items-center gap-3">
        <Sun className="h-4 w-4 text-yellow-500" />
        <input
          type="range"
          min={5}
          max={8}
          step={0.5}
          value={time}
          onChange={(e) => setTime(Number(e.target.value))}
          className="flex-1 accent-yellow-500"
        />
        <span className="w-12 text-right text-xs text-muted-foreground">{time}:00</span>
      </div>
    </div>
  );
}

function WeatherWidgetDemo() {
  const [condition, setCondition] = useState("sunny");
  const conditions = [
    { id: "sunny", icon: Sun, label: "Sunny", temp: "24°C" },
    { id: "cloudy", icon: Cloud, label: "Cloudy", temp: "18°C" },
    { id: "mountain", icon: Mountain, label: "Alpine", temp: "8°C" },
  ];
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-medium">Mountain Weather</span>
        <span className="text-xs text-muted-foreground">Base Camp</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {conditions.map((c) => (
          <button
            key={c.id}
            onClick={() => setCondition(c.id)}
            className={`flex flex-col items-center gap-2 rounded-md border p-3 transition-all ${condition === c.id ? "border-primary bg-primary/5" : "border-transparent bg-muted/30 hover:bg-muted/50"}`}
          >
            <c.icon className="h-5 w-5" />
            <span className="text-xs font-medium">{c.label}</span>
            <span className="text-lg font-bold">{c.temp}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function TrailMapDemo() {
  const [zoom, setZoom] = useState(1);
  const waypoints = [
    { x: 20, y: 30, label: "Start" },
    { x: 50, y: 55, label: "Camp" },
    { x: 80, y: 40, label: "Summit" },
  ];
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Map className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Trail Map</span>
        </div>
        <span className="text-xs text-muted-foreground">Zoom: {zoom.toFixed(1)}x</span>
      </div>
      <div className="relative h-40 overflow-hidden rounded-md bg-emerald-50 dark:bg-emerald-950/30" style={{ transform: `scale(${zoom})`, transformOrigin: "center" }}>
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
          <path d="M20,30 Q40,20 50,55 Q60,80 80,40" fill="none" stroke="currentColor" className="text-emerald-600" strokeWidth={1.5} strokeDasharray="4,2" />
        </svg>
        {waypoints.map((wp) => (
          <div key={wp.label} className="absolute flex flex-col items-center" style={{ left: `${wp.x}%`, top: `${wp.y}%`, transform: "translate(-50%, -50%)" }}>
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
            <span className="mt-0.5 text-[8px] font-medium text-emerald-700 dark:text-emerald-400">{wp.label}</span>
          </div>
        ))}
      </div>
      <input
        type="range"
        min={0.5}
        max={3}
        step={0.1}
        value={zoom}
        onChange={(e) => setZoom(Number(e.target.value))}
        className="mt-3 w-full accent-emerald-500"
      />
    </div>
  );
}

function CampsiteFinderDemo() {
  const [selected, setSelected] = useState<number | null>(null);
  const campsites = [
    { name: "Ridge Camp", spots: 8, elevation: "2,100m", rating: 4.8 },
    { name: "Lake Shore", spots: 12, elevation: "1,850m", rating: 4.6 },
    { name: "Forest Clearing", spots: 5, elevation: "1,600m", rating: 4.9 },
  ];
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center gap-2">
        <Tent className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Campsite Finder</span>
      </div>
      <div className="flex flex-col gap-2">
        {campsites.map((camp, i) => (
          <button
            key={camp.name}
            onClick={() => setSelected(selected === i ? null : i)}
            className={`flex items-center justify-between rounded-md border p-3 text-left transition-all ${selected === i ? "border-primary bg-primary/5" : "border-transparent bg-muted/30 hover:bg-muted/50"}`}
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-medium">{camp.name}</span>
              <span className="text-[10px] text-muted-foreground">{camp.spots} spots · {camp.elevation}</span>
            </div>
            <span className="text-xs font-bold text-yellow-500">★ {camp.rating}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function AltitudeMeterDemo() {
  const [altitude, setAltitude] = useState(3200);
  const maxAltitude = 5000;
  const percentage = (altitude / maxAltitude) * 100;
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center gap-2">
        <Mountain className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Altitude Meter</span>
      </div>
      <div className="flex items-end gap-4">
        <div className="relative h-40 w-8 overflow-hidden rounded-full bg-muted">
          <div
            className="absolute bottom-0 w-full rounded-full bg-gradient-to-t from-emerald-500 to-emerald-300 transition-all duration-300"
            style={{ height: `${percentage}%` }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-3xl font-bold text-foreground">{altitude.toLocaleString()}</span>
          <span className="text-xs text-muted-foreground">meters</span>
          <input
            type="range"
            min={0}
            max={5000}
            value={altitude}
            onChange={(e) => setAltitude(Number(e.target.value))}
            className="mt-2 w-24 accent-emerald-500"
          />
        </div>
      </div>
    </div>
  );
}

export default function MountainScenePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Mountain Scene</h1>
          <Badge variant="primary">Visual</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Nature-inspired components for outdoor and adventure interfaces with trails, weather, and altitude displays.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">LandscapeCard</h2>
        <LandscapeCardDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">HikingTrail</h2>
        <HikingTrailDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">SunriseView</h2>
        <SunriseViewDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">WeatherWidget</h2>
        <WeatherWidgetDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">TrailMap</h2>
        <TrailMapDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">CampsiteFinder</h2>
        <CampsiteFinderDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">AltitudeMeter</h2>
        <AltitudeMeterDemo />
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
                <td className="px-4 py-3 font-mono text-xs">elevation</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">2000</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">variant</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;landscape&quot; | &quot;trail&quot; | &quot;sunset&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;landscape&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">showWeather</td>
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
