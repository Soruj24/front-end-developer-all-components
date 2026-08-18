"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Compass,
  Navigation,
  MapPin,
  Target,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Locate,
  Gauge,
  Wind,
  Mountain,
} from "lucide-react";

const installCommand = `npx component-library@latest add compass-rose`;
const usageCode = `import { CompassRose } from "@/components/compass-rose";

<CompassRose heading={45} size="lg" />`;

function CompassRoseDemo() {
  const [heading, setHeading] = useState(0);
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

  return (
    <div className="flex items-center gap-8">
      <div className="relative h-52 w-52">
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-border" strokeDasharray="4 4" />
          {[...Array(36)].map((_, i) => {
            const angle = (i * 10 - 90) * (Math.PI / 180);
            const isMajor = i % 9 === 0;
            const inner = isMajor ? 65 : 75;
            const outer = 80;
            return (
              <line
                key={i}
                x1={100 + inner * Math.cos(angle)}
                y1={100 + inner * Math.sin(angle)}
                x2={100 + outer * Math.cos(angle)}
                y2={100 + outer * Math.sin(angle)}
                stroke="currentColor"
                strokeWidth={isMajor ? 1.5 : 0.5}
                className={isMajor ? "text-foreground" : "text-border"}
              />
            );
          })}
          {dirs.map((d, i) => {
            const angle = (i * 45 - 90) * (Math.PI / 180);
            const x = 100 + 88 * Math.cos(angle);
            const y = 100 + 88 * Math.sin(angle);
            return (
              <text key={d} x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="fill-foreground text-[10px] font-bold">
                {d}
              </text>
            );
          })}
          <g transform={`rotate(${heading} 100 100)`}>
            <polygon points="100,15 94,55 100,45 106,55" className="fill-red-500" />
            <polygon points="100,185 94,145 100,155 106,145" className="fill-muted-foreground" />
          </g>
          <circle cx="100" cy="100" r="5" className="fill-foreground" />
          <circle cx="100" cy="100" r="2" className="fill-card" />
        </svg>
      </div>
      <div className="flex flex-col gap-4">
        <div className="rounded-xl border border-black/[.08] bg-card px-5 py-4 shadow-sm dark:border-white/[.145]">
          <span className="text-[10px] font-medium text-muted-foreground">Heading</span>
          <div className="flex items-baseline gap-1">
            <span className="font-mono text-3xl font-bold tabular-nums">{heading}</span>
            <span className="text-lg text-muted-foreground">°</span>
          </div>
          <span className="text-xs text-muted-foreground">{dirs[Math.round(heading / 45) % 8]}</span>
        </div>
        <input
          type="range"
          min={0}
          max={360}
          value={heading}
          onChange={(e) => setHeading(Number(e.target.value))}
          className="w-48 accent-foreground"
        />
        <div className="flex gap-1.5">
          {dirs.filter((_, i) => i % 2 === 0).map((d) => (
            <button
              key={d}
              onClick={() => setHeading(["N", "E", "S", "W"].indexOf(d) * 90)}
              className="rounded-lg bg-muted px-3 py-1.5 text-[10px] font-medium text-muted-foreground hover:bg-muted/80 transition-colors"
            >
              {d}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function HeadingIndicatorDemo() {
  const [heading, setHeading] = useState(90);
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const dirIndex = Math.round(heading / 45) % 8;

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
              <Compass className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold">Heading</p>
              <p className="text-[10px] text-muted-foreground">Current direction</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-mono text-2xl font-bold tabular-nums">{heading}°</p>
            <p className="text-xs text-muted-foreground">{dirs[dirIndex]}</p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-1.5 mb-4">
          {["N", "E", "S", "W"].map((d, i) => (
            <button
              key={d}
              onClick={() => setHeading(i * 90)}
              className={`flex items-center justify-center gap-1 rounded-lg py-2 text-xs font-medium transition-colors ${
                dirs[dirIndex] === d
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {d === "N" && <ArrowUp className="h-3 w-3" />}
              {d === "E" && <ArrowRight className="h-3 w-3" />}
              {d === "S" && <ArrowDown className="h-3 w-3" />}
              {d === "W" && <ArrowLeft className="h-3 w-3" />}
              {d}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Target className="h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="range"
            min={0}
            max={360}
            value={heading}
            onChange={(e) => setHeading(Number(e.target.value))}
            className="flex-1 accent-foreground"
          />
        </div>
      </div>
    </div>
  );
}

function NavigationBarDemo() {
  const [current, setCurrent] = useState("N");
  const points = ["N", "E", "S", "W"];
  const coords = { N: "0, -1", E: "1, 0", S: "0, 1", W: "-1, 0" };
  const distances = { N: "120m", E: "85m", S: "200m", W: "150m" };

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="flex items-center justify-between border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Navigation className="h-4 w-4" />
            <span className="text-sm font-semibold">Navigate</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg bg-muted px-2 py-1">
            <MapPin className="h-3 w-3 text-muted-foreground" />
            <span className="font-mono text-[10px] text-muted-foreground">{coords[current as keyof typeof coords]}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-px bg-black/[.06] dark:bg-white/[.08]">
          {points.map((p) => (
            <button
              key={p}
              onClick={() => setCurrent(p)}
              className={`flex flex-col items-center gap-1 bg-card py-4 transition-colors ${
                current === p ? "bg-foreground/5" : "hover:bg-muted/30"
              }`}
            >
              {p === "N" && <ArrowUp className={`h-5 w-5 ${current === p ? "text-foreground" : "text-muted-foreground"}`} />}
              {p === "E" && <ArrowRight className={`h-5 w-5 ${current === p ? "text-foreground" : "text-muted-foreground"}`} />}
              {p === "S" && <ArrowDown className={`h-5 w-5 ${current === p ? "text-foreground" : "text-muted-foreground"}`} />}
              {p === "W" && <ArrowLeft className={`h-5 w-5 ${current === p ? "text-foreground" : "text-muted-foreground"}`} />}
              <span className={`text-sm font-medium ${current === p ? "text-foreground" : "text-muted-foreground"}`}>{p}</span>
              <span className="text-[10px] text-muted-foreground/60">{distances[p as keyof typeof distances]}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function MiniCompassDemo() {
  const [heading, setHeading] = useState(45);

  return (
    <div className="flex gap-4">
      {[
        { label: "Dashboard", size: "h-16 w-16" },
        { label: "Sidebar", size: "h-12 w-12" },
        { label: "Compact", size: "h-10 w-10" },
      ].map((variant) => (
        <div key={variant.label} className="flex flex-col items-center gap-2">
          <div className={`relative ${variant.size}`}>
            <svg viewBox="0 0 200 200" className="h-full w-full">
              <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="2" className="text-border" />
              {["N", "E", "S", "W"].map((d, i) => {
                const angle = (i * 90 - 90) * (Math.PI / 180);
                const x = 100 + 75 * Math.cos(angle);
                const y = 100 + 75 * Math.sin(angle);
                return (
                  <text key={d} x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="fill-foreground text-[16px] font-bold">
                    {d}
                  </text>
                );
              })}
              <g transform={`rotate(${heading} 100 100)`}>
                <polygon points="100,25 95,65 100,55 105,65" className="fill-red-500" />
                <polygon points="100,175 95,135 100,145 105,135" className="fill-muted-foreground" />
              </g>
              <circle cx="100" cy="100" r="6" className="fill-foreground" />
            </svg>
          </div>
          <span className="text-[10px] text-muted-foreground">{variant.label}</span>
        </div>
      ))}
      <div className="ml-4 flex flex-col gap-2">
        <input
          type="range"
          min={0}
          max={360}
          value={heading}
          onChange={(e) => setHeading(Number(e.target.value))}
          className="w-32 accent-foreground"
        />
        <span className="font-mono text-xs text-muted-foreground">{heading}°</span>
      </div>
    </div>
  );
}

function GPSTrackerDemo() {
  const [lat, setLat] = useState(40.7128);
  const [lng, setLng] = useState(-74.006);
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLat((l) => l + (Math.random() - 0.5) * 0.001);
      setLng((l) => l + (Math.random() - 0.5) * 0.001);
      setSpeed((s) => Math.max(0, Math.min(120, s + (Math.random() - 0.5) * 10)));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card p-4 shadow-sm dark:border-white/[.145]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white">
              <Locate className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold">GPS Tracker</p>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400">Live</p>
            </div>
          </div>
          <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="rounded-lg bg-muted/50 p-3">
            <span className="text-[10px] font-medium text-muted-foreground">Latitude</span>
            <p className="font-mono text-sm font-bold tabular-nums">{lat.toFixed(4)}</p>
          </div>
          <div className="rounded-lg bg-muted/50 p-3">
            <span className="text-[10px] font-medium text-muted-foreground">Longitude</span>
            <p className="font-mono text-sm font-bold tabular-nums">{lng.toFixed(4)}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4 text-muted-foreground" />
            <div>
              <span className="text-[10px] text-muted-foreground">Speed</span>
              <p className="font-mono text-lg font-bold tabular-nums">{Math.round(speed)} <span className="text-xs text-muted-foreground">km/h</span></p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Compass className="h-4 w-4 text-muted-foreground" />
            <div>
              <span className="text-[10px] text-muted-foreground">Heading</span>
              <p className="font-mono text-lg font-bold tabular-nums">{Math.round(Math.atan2(lng, lat) * 180 / Math.PI + 180)}°</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BearingCalculatorDemo() {
  const [from, setFrom] = useState({ lat: 40.7128, lng: -74.006 });
  const [to, setTo] = useState({ lat: 51.5074, lng: -0.1278 });

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;

  const dLng = toRad(to.lng - from.lng);
  const y = Math.sin(dLng) * Math.cos(toRad(to.lat));
  const x = Math.cos(toRad(from.lat)) * Math.sin(toRad(to.lat)) - Math.sin(toRad(from.lat)) * Math.cos(toRad(to.lat)) * Math.cos(dLng);
  const bearing = Math.round((toDeg(Math.atan2(y, x)) + 360) % 360);

  const R = 6371;
  const dLat = toRad(to.lat - from.lat);
  const dLngDist = toRad(to.lng - from.lng);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(from.lat)) * Math.cos(toRad(to.lat)) * Math.sin(dLngDist / 2) ** 2;
  const distance = Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));

  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const dirLabel = dirs[Math.round(bearing / 45) % 8];

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card p-4 shadow-sm dark:border-white/[.145]">
        <div className="flex items-center gap-2 mb-4">
          <Target className="h-4 w-4" />
          <span className="text-sm font-semibold">Bearing Calculator</span>
        </div>
        <div className="space-y-3 mb-4">
          <div className="rounded-lg bg-muted/50 p-3">
            <span className="text-[10px] font-medium text-muted-foreground">From (New York)</span>
            <p className="font-mono text-xs">{from.lat.toFixed(4)}, {from.lng.toFixed(4)}</p>
          </div>
          <div className="rounded-lg bg-muted/50 p-3">
            <span className="text-[10px] font-medium text-muted-foreground">To (London)</span>
            <p className="font-mono text-xs">{to.lat.toFixed(4)}, {to.lng.toFixed(4)}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-black/[.06] p-3 text-center dark:border-white/[.08]">
            <span className="text-[10px] text-muted-foreground">Bearing</span>
            <p className="font-mono text-2xl font-bold">{bearing}°</p>
            <span className="text-xs text-muted-foreground">{dirLabel}</span>
          </div>
          <div className="rounded-lg border border-black/[.06] p-3 text-center dark:border-white/[.08]">
            <span className="text-[10px] text-muted-foreground">Distance</span>
            <p className="font-mono text-2xl font-bold">{distance}</p>
            <span className="text-xs text-muted-foreground">km</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function WindRoseDemo() {
  const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  const [windData] = useState(() =>
    directions.map((_, i) => ({
      speed: Math.random() * 30 + 5,
      gust: Math.random() * 15 + 5,
    }))
  );

  const maxSpeed = Math.max(...windData.map((d) => d.speed + d.gust));

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card p-4 shadow-sm dark:border-white/[.145]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4" />
            <span className="text-sm font-semibold">Wind Rose</span>
          </div>
          <span className="text-[10px] text-muted-foreground">Last 24h</span>
        </div>
        <div className="relative mx-auto h-48 w-48">
          <svg viewBox="0 0 200 200" className="h-full w-full">
            <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-border" strokeDasharray="2 2" />
            <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-border" strokeDasharray="2 2" />
            {directions.map((d, i) => {
              const angle = (i * 22.5 - 90) * (Math.PI / 180);
              const x = 100 + 85 * Math.cos(angle);
              const y = 100 + 85 * Math.sin(angle);
              return (
                <text key={d} x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="fill-foreground text-[7px] font-medium">
                  {d}
                </text>
              );
            })}
            {windData.map((d, i) => {
              const angle = (i * 22.5 - 90) * (Math.PI / 180);
              const barLen = (d.speed / maxSpeed) * 70;
              const gustLen = (d.gust / maxSpeed) * 70;
              const inner = 90 - barLen;
              const outer = 90;
              return (
                <g key={i}>
                  <line
                    x1={100 + inner * Math.cos(angle)}
                    y1={100 + inner * Math.sin(angle)}
                    x2={100 + outer * Math.cos(angle)}
                    y2={100 + outer * Math.sin(angle)}
                    stroke="currentColor"
                    strokeWidth="4"
                    className="text-blue-500"
                    strokeLinecap="round"
                  />
                  <line
                    x1={100 + (inner - gustLen * 0.3) * Math.cos(angle)}
                    y1={100 + (inner - gustLen * 0.3) * Math.sin(angle)}
                    x2={100 + inner * Math.cos(angle)}
                    y2={100 + inner * Math.sin(angle)}
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-blue-300"
                    strokeLinecap="round"
                  />
                </g>
              );
            })}
          </svg>
        </div>
        <div className="mt-3 flex items-center justify-center gap-4 text-[10px] text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-6 rounded-full bg-blue-500" />
            <span>Speed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-6 rounded-full bg-blue-300" />
            <span>Gusts</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CompassRosePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Compass Rose
          </h1>
          <Badge variant="primary">Navigation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Interactive compass rose with heading control, cardinal directions, and navigation
          indicators for wayfinding UIs.
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

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Interactive Compass</h3>
          <p className="text-sm text-muted-foreground">
            Full compass with tick marks, cardinal labels, and heading slider.
          </p>
          <ComponentPreview id="compass-interactive">
            <CompassRoseDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Heading Indicator</h3>
          <p className="text-sm text-muted-foreground">
            Digital heading display with quick-set direction buttons.
          </p>
          <ComponentPreview id="compass-heading">
            <HeadingIndicatorDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Navigation Bar</h3>
          <p className="text-sm text-muted-foreground">
            Direction selector with distance and coordinate display.
          </p>
          <ComponentPreview id="compass-nav">
            <NavigationBarDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Mini Compass</h3>
          <p className="text-sm text-muted-foreground">
            Compact variants for dashboards and sidebars.
          </p>
          <ComponentPreview id="compass-mini">
            <MiniCompassDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">GPS Tracker</h3>
          <p className="text-sm text-muted-foreground">
            Live location tracker with coordinates, speed, and heading.
          </p>
          <ComponentPreview id="compass-gps">
            <GPSTrackerDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Bearing Calculator</h3>
          <p className="text-sm text-muted-foreground">
            Calculate bearing and distance between two coordinates.
          </p>
          <ComponentPreview id="compass-bearing">
            <BearingCalculatorDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Wind Rose</h3>
          <p className="text-sm text-muted-foreground">
            Wind direction and speed visualization with gust indicators.
          </p>
          <ComponentPreview id="compass-wind">
            <WindRoseDemo />
          </ComponentPreview>
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
                <td className="px-4 py-3 font-mono text-xs">heading</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">0</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"sm\" | \"md\" | \"lg\""}</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"md\""}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">showLabels</td>
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
