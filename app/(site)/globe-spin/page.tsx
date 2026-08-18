"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Globe, MapPin, Clock, Users, Package, Languages } from "lucide-react";

const installCommand = `npx component-library@latest add globe-spin`;
const usageCode = `import { GlobeSpin } from "@/components/globe-spin";

<GlobeSpin />`;

function GlobeRenderer({ speed = 20, color = "#3b82f6", size = 120 }: { speed?: number; color?: string; size?: number }) {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setRotation((r) => (r >= 360 ? 0 : r + 1)), speed);
    return () => clearInterval(interval);
  }, [speed]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <circle cx="50" cy="50" r="45" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
        <ellipse cx="50" cy="50" rx="45" ry="20" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" transform={`rotate(${rotation} 50 50)`} />
        <ellipse cx="50" cy="50" rx="45" ry="20" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" transform={`rotate(${rotation + 60} 50 50)`} />
        <ellipse cx="50" cy="50" rx="45" ry="20" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" transform={`rotate(${rotation + 120} 50 50)`} />
        <ellipse cx="50" cy="50" rx="20" ry="45" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" />
        <circle cx="50" cy="50" r="45" fill={color} opacity="0.1" />
        <circle cx="50" cy="50" r="3" fill={color} opacity="0.8" />
      </svg>
    </div>
  );
}

function GlobeShowcaseDemo() {
  const globes = [
    { color: "#3b82f6", label: "Blue" },
    { color: "#22c55e", label: "Green" },
    { color: "#a855f7", label: "Purple" },
    { color: "#f97316", label: "Orange" },
  ];
  return (
    <div className="flex gap-4">
      {globes.map((g) => (
        <div key={g.label} className="flex flex-col items-center gap-1">
          <GlobeRenderer color={g.color} size={60} />
          <span className="text-[10px] text-muted-foreground">{g.label}</span>
        </div>
      ))}
    </div>
  );
}

function SpeedControlDemo() {
  const [speed, setSpeed] = useState(20);
  return (
    <div className="flex flex-col items-center gap-4">
      <GlobeRenderer speed={speed} size={100} />
      <div className="w-full max-w-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Speed</span>
          <span className="text-xs font-mono">{speed}ms</span>
        </div>
        <input
          type="range"
          min={5}
          max={50}
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-[9px] text-muted-foreground mt-1">
          <span>Fast</span>
          <span>Slow</span>
        </div>
      </div>
    </div>
  );
}

function WorldLocationsDemo() {
  const locations = [
    { city: "New York", country: "USA", x: 25, y: 35 },
    { city: "London", country: "UK", x: 48, y: 28 },
    { city: "Tokyo", country: "Japan", x: 82, y: 35 },
    { city: "Sydney", country: "Australia", x: 85, y: 70 },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Global Offices</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="relative h-32 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/10 rounded-lg mb-4">
            <GlobeRenderer size={128} color="#3b82f6" />
            {locations.map((loc) => (
              <div
                key={loc.city}
                className="absolute h-2 w-2 rounded-full bg-red-500 animate-pulse"
                style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
              />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {locations.map((loc) => (
              <div key={loc.city} className="flex items-center gap-2 rounded-lg bg-muted/30 px-3 py-2">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <div>
                  <p className="text-xs font-medium">{loc.city}</p>
                  <p className="text-[9px] text-muted-foreground">{loc.country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function LanguageSelectorDemo() {
  const [selected, setSelected] = useState("en");
  const languages = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "es", label: "Español", flag: "🇪🇸" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "ja", label: "日本語", flag: "🇯🇵" },
    { code: "de", label: "Deutsch", flag: "🇩🇪" },
  ];

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Languages className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Language</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-center mb-4">
            <GlobeRenderer size={80} color="#a855f7" />
          </div>
          <div className="space-y-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelected(lang.code)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                  selected === lang.code ? "bg-primary/10 text-primary" : "hover:bg-muted/50"
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="text-xs font-medium">{lang.label}</span>
                {selected === lang.code && <span className="ml-auto text-xs">✓</span>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ShippingZonesDemo() {
  const [zone, setZone] = useState("domestic");
  const zones = {
    domestic: { label: "Domestic", time: "2-3 days", price: "$5.99", color: "#22c55e" },
    international: { label: "International", time: "5-10 days", price: "$14.99", color: "#3b82f6" },
    express: { label: "Express Global", time: "1-2 days", price: "$29.99", color: "#a855f7" },
  };

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Shipping Zone</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-center mb-4">
            <GlobeRenderer size={80} color={zones[zone as keyof typeof zones].color} />
          </div>
          <div className="flex gap-2 mb-4">
            {(Object.keys(zones) as Array<keyof typeof zones>).map((z) => (
              <button
                key={z}
                onClick={() => setZone(z)}
                className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                  zone === z ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {zones[z].label}
              </button>
            ))}
          </div>
          <div className="rounded-lg bg-muted/30 p-3 text-center">
            <p className="text-lg font-extrabold">{zones[zone as keyof typeof zones].price}</p>
            <p className="text-[10px] text-muted-foreground">Estimated delivery: {zones[zone as keyof typeof zones].time}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserDistributionDemo() {
  const regions = [
    { name: "North America", users: "1.2M", percentage: 35, color: "#3b82f6" },
    { name: "Europe", users: "890K", percentage: 28, color: "#22c55e" },
    { name: "Asia Pacific", users: "650K", percentage: 22, color: "#a855f7" },
    { name: "Other", users: "230K", percentage: 15, color: "#f97316" },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">User Distribution</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-4 mb-4">
            <GlobeRenderer size={80} color="#3b82f6" />
            <div>
              <p className="text-2xl font-extrabold">2.97M</p>
              <p className="text-xs text-muted-foreground">Total Users</p>
            </div>
          </div>
          <div className="space-y-3">
            {regions.map((r) => (
              <div key={r.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium">{r.name}</span>
                  <span className="text-[10px] text-muted-foreground">{r.users}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${r.percentage}%`, backgroundColor: r.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TimeZoneClockDemo() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const zones = [
    { city: "New York", offset: -5, flag: "🇺🇸" },
    { city: "London", offset: 0, flag: "🇬🇧" },
    { city: "Tokyo", offset: 9, flag: "🇯🇵" },
    { city: "Sydney", offset: 11, flag: "🇦🇺" },
  ];

  const formatTime = (offset: number) => {
    const utc = time.getTime() + time.getTimezoneOffset() * 60000;
    const local = new Date(utc + offset * 3600000);
    return local.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">World Clock</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-center mb-4">
            <GlobeRenderer size={80} color="#06b6d4" />
          </div>
          <div className="space-y-2">
            {zones.map((z) => (
              <div key={z.city} className="flex items-center gap-3 rounded-lg bg-muted/30 px-3 py-2">
                <span className="text-lg">{z.flag}</span>
                <div className="flex-1">
                  <p className="text-xs font-medium">{z.city}</p>
                </div>
                <p className="font-mono text-xs font-bold">{formatTime(z.offset)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GlobeSpinPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Globe Spin
          </h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          An animated spinning globe component with customizable rotation speed and style.
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
          <h3 className="text-lg font-medium text-foreground">Globe Showcase</h3>
          <p className="text-sm text-muted-foreground">
            Different globe color variants.
          </p>
          <ComponentPreview id="globe-showcase">
            <GlobeShowcaseDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Speed Control</h3>
          <p className="text-sm text-muted-foreground">
            Adjustable rotation speed with slider.
          </p>
          <ComponentPreview id="globe-speed">
            <SpeedControlDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">World Locations</h3>
          <p className="text-sm text-muted-foreground">
            Global office locations with markers.
          </p>
          <ComponentPreview id="globe-locations">
            <WorldLocationsDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Language Selector</h3>
          <p className="text-sm text-muted-foreground">
            Internationalization language picker.
          </p>
          <ComponentPreview id="globe-language">
            <LanguageSelectorDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Shipping Zones</h3>
          <p className="text-sm text-muted-foreground">
            E-commerce global shipping options.
          </p>
          <ComponentPreview id="globe-shipping">
            <ShippingZonesDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">User Distribution</h3>
          <p className="text-sm text-muted-foreground">
            Analytics display by region.
          </p>
          <ComponentPreview id="globe-users">
            <UserDistributionDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Time Zone Clock</h3>
          <p className="text-sm text-muted-foreground">
            Live world clock with multiple time zones.
          </p>
          <ComponentPreview id="globe-clock">
            <TimeZoneClockDemo />
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
                <td className="px-4 py-3 font-mono text-xs">speed</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">20</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">color</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">"#3b82f6"</td>
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
