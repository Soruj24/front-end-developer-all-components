"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  RotateCw,
  Ticket,
  Users,
  Clock,
  Star,
  MapPin,
  Camera,
  Check,
} from "lucide-react";

const installCommand = `npx component-library@latest add ferris-wheel`;
const usageCode = `import { FerrisWheel } from "@/components/ferris-wheel";

<FerrisWheel
  cabins={8}
  size={250}
  autoRotate
/>`;

const cabinColors = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#8b5cf6", "#ec4899", "#06b6d4"];

function FerrisWheelRenderer({
  cabins = 8,
  radius = 100,
  rotation = 0,
  showBase = true,
  className = "",
}: {
  cabins?: number;
  radius?: number;
  rotation?: number;
  showBase?: boolean;
  className?: string;
}) {
  const size = radius * 2 + 60;
  const height = radius * 2 + 80;

  return (
    <div className={`flex items-center justify-center ${className}`} style={{ perspective: 800 }}>
      <div className="relative" style={{ width: size, height }}>
        <svg viewBox={`0 0 ${size} ${height}`} className="h-full w-full">
          <circle cx={size / 2} cy={radius + 30} r={radius} fill="none" stroke="currentColor" strokeWidth="3" className="text-primary/30" />
          <circle cx={size / 2} cy={radius + 30} r={radius - 15} fill="none" stroke="currentColor" strokeWidth="1" className="text-primary/15" />
          <circle cx={size / 2} cy={radius + 30} r="5" className="fill-primary" />
          {[...Array(cabins)].map((_, i) => {
            const angle = ((360 / cabins) * i + rotation) * (Math.PI / 180);
            const x = size / 2 + radius * Math.sin(angle);
            const y = radius + 30 - radius * Math.cos(angle);
            return (
              <g key={i}>
                <line x1={size / 2} y1={radius + 30} x2={x} y2={y} stroke="currentColor" strokeWidth="1" className="text-border" />
                <rect x={x - 10} y={y - 8} width="20" height="16" rx="3" fill={cabinColors[i % cabinColors.length]} opacity="0.85" />
              </g>
            );
          })}
          {showBase && (
            <>
              <line x1={size / 2} y1={radius + 30 + radius} x2={size / 2 - 40} y2={height - 10} stroke="currentColor" strokeWidth="3" className="text-foreground" />
              <line x1={size / 2} y1={radius + 30 + radius} x2={size / 2 + 40} y2={height - 10} stroke="currentColor" strokeWidth="3" className="text-foreground" />
              <rect x={size / 2 - 60} y={height - 12} width="120" height="6" rx="3" className="fill-foreground" />
            </>
          )}
        </svg>
      </div>
    </div>
  );
}

function AnimatedWheelDemo() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setRotation((r) => r + 0.3), 30);
    return () => clearInterval(interval);
  }, []);

  return <FerrisWheelRenderer rotation={rotation} />;
}

function CabinShowcaseDemo() {
  return (
    <div className="flex gap-3 flex-wrap justify-center">
      {cabinColors.map((c, i) => (
        <div key={i} className="flex flex-col items-center gap-1">
          <div className="relative">
            <svg width="40" height="50" viewBox="0 0 40 50">
              <line x1="20" y1="0" x2="20" y2="15" stroke="currentColor" strokeWidth="1" className="text-border" />
              <rect x="5" y="15" width="30" height="25" rx="4" fill={c} opacity="0.85" />
              <rect x="10" y="20" width="8" height="10" rx="1" fill="white" opacity="0.3" />
              <rect x="22" y="20" width="8" height="10" rx="1" fill="white" opacity="0.3" />
            </svg>
          </div>
          <span className="text-[10px] text-muted-foreground">Cabin {i + 1}</span>
        </div>
      ))}
    </div>
  );
}

function SizeVariantsDemo() {
  return (
    <div className="flex gap-6 items-end justify-center">
      {[
        { size: "sm", r: 30, label: "Small" },
        { size: "md", r: 50, label: "Medium" },
        { size: "lg", r: 70, label: "Large" },
      ].map((s) => (
        <div key={s.size} className="flex flex-col items-center gap-1">
          <svg viewBox="0 0 160 160" className="h-20 w-20" style={{ width: s.r * 2.4, height: s.r * 2.4 }}>
            <circle cx="80" cy="80" r={s.r} fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary/30" />
            {[...Array(6)].map((_, i) => {
              const angle = (i * 60) * (Math.PI / 180);
              return <circle key={i} cx={80 + s.r * Math.sin(angle)} cy={80 - s.r * Math.cos(angle)} r={4} className="fill-primary" opacity="0.7" />;
            })}
          </svg>
          <span className="text-[10px] text-muted-foreground">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

function ThemeParkCardDemo() {
  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="relative h-40 bg-gradient-to-br from-sky-400 to-blue-600">
          <div className="absolute inset-0 flex items-center justify-center opacity-80">
            <FerrisWheelRenderer cabins={8} radius={60} showBase={false} />
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Sky View Wheel</h3>
            <Badge variant="secondary" className="text-[10px]">Popular</Badge>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            120ft tall Ferris wheel with panoramic city views. 30-minute ride.
          </p>
          <div className="mt-3 flex items-center gap-4 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 30 min</span>
            <span className="flex items-center gap-1"><Users className="h-3 w-3" /> 6 per cabin</span>
            <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> 4.9</span>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xl font-extrabold">$25</span>
            <button className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-xs font-medium text-background hover:bg-foreground/90">
              <Ticket className="h-3.5 w-3.5" />
              Buy Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TicketBoothDemo() {
  const [selected, setSelected] = useState("standard");
  const tickets = [
    { id: "standard", label: "Standard", price: 25, features: ["30 min ride", "General seating"] },
    { id: "vip", label: "VIP", price: 45, features: ["45 min ride", "Priority boarding", "Photo included"] },
    { id: "family", label: "Family Pack", price: 80, features: ["4 tickets", "60 min ride", "Snacks included"] },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
        <h3 className="mb-4 text-sm font-semibold">Select Tickets</h3>
        <div className="space-y-2">
          {tickets.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelected(t.id)}
              className={`flex w-full items-center justify-between rounded-lg border p-3 text-left transition-all ${
                selected === t.id
                  ? "border-foreground bg-foreground/5 shadow-sm"
                  : "border-black/[.08] hover:border-black/[.15] dark:border-white/[.145]"
              }`}
            >
              <div>
                <p className="text-sm font-bold">{t.label}</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {t.features.map((f) => (
                    <span key={f} className="text-[9px] text-muted-foreground">· {f}</span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-extrabold">${t.price}</p>
                {selected === t.id && <Check className="ml-auto mt-1 h-4 w-4 text-primary" />}
              </div>
            </button>
          ))}
        </div>
        <button className="mt-4 w-full rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background shadow-sm hover:bg-foreground/90">
          Purchase Tickets
        </button>
      </div>
    </div>
  );
}

function RideStatusDemo() {
  const [status, setStatus] = useState<"running" | "loading" | "maintenance">("running");

  const statusConfig = {
    running: { label: "Operating", color: "bg-emerald-500", textColor: "text-emerald-600 dark:text-emerald-400", wait: "15 min" },
    loading: { label: "Loading", color: "bg-yellow-500", textColor: "text-yellow-600 dark:text-yellow-400", wait: "5 min" },
    maintenance: { label: "Maintenance", color: "bg-red-500", textColor: "text-red-600 dark:text-red-400", wait: "Closed" },
  };

  const config = statusConfig[status];

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold">Ride Status</h3>
          <div className="flex gap-1">
            {(["running", "loading", "maintenance"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`rounded-md px-2 py-1 text-[10px] font-medium transition-all ${
                  status === s ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {statusConfig[s].label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="shrink-0">
            <FerrisWheelRenderer cabins={6} radius={40} showBase={false} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <div className={`h-2 w-2 rounded-full ${config.color}`} />
              <span className={`text-sm font-bold ${config.textColor}`}>{config.label}</span>
            </div>
            <p className="text-xs text-muted-foreground">Sky View Wheel</p>
            <div className="mt-2 flex items-center gap-1 text-xs">
              <Clock className="h-3 w-3 text-muted-foreground" />
              <span>Wait: {config.wait}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhotoGalleryDemo() {
  const photos = [
    { cabin: 1, color: "#ef4444", caption: "Sunset View" },
    { cabin: 4, color: "#22c55e", caption: "City Skyline" },
    { cabin: 6, color: "#8b5cf6", caption: "Night Lights" },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Camera className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Cabin Photos</h3>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1 p-2">
          {photos.map((p) => (
            <div key={p.cabin} className="group relative aspect-square overflow-hidden rounded-lg" style={{ backgroundColor: p.color + "20" }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-8 w-8 rounded-full" style={{ backgroundColor: p.color }} />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                <p className="text-[10px] font-medium text-white">{p.caption}</p>
                <p className="text-[8px] text-white/70">Cabin {p.cabin}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 py-3">
          <p className="text-[10px] text-muted-foreground">Photos taken from different cabins during the ride.</p>
        </div>
      </div>
    </div>
  );
}

export default function FerrisWheelPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Ferris Wheel
          </h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Animated Ferris wheel with colored cabins, auto-rotation, and multiple size variants
          for amusement-themed UIs.
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
          <h3 className="text-lg font-medium text-foreground">Animated Wheel</h3>
          <p className="text-sm text-muted-foreground">
            Continuously rotating Ferris wheel with colored cabins.
          </p>
          <ComponentPreview id="fw-animated">
            <AnimatedWheelDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Cabin Colors</h3>
          <p className="text-sm text-muted-foreground">
            Individual cabin color showcase.
          </p>
          <ComponentPreview id="fw-cabins">
            <CabinShowcaseDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Size Variants</h3>
          <p className="text-sm text-muted-foreground">
            Small, medium, and large wheel sizes.
          </p>
          <ComponentPreview id="fw-sizes">
            <SizeVariantsDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Theme Park Card</h3>
          <p className="text-sm text-muted-foreground">
            Attraction card with wheel visual and ticket pricing.
          </p>
          <ComponentPreview id="fw-park">
            <ThemeParkCardDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Ticket Booth</h3>
          <p className="text-sm text-muted-foreground">
            Ticket tier selection with features and pricing.
          </p>
          <ComponentPreview id="fw-tickets">
            <TicketBoothDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Ride Status</h3>
          <p className="text-sm text-muted-foreground">
            Real-time ride status indicator with wait times.
          </p>
          <ComponentPreview id="fw-status">
            <RideStatusDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Photo Gallery</h3>
          <p className="text-sm text-muted-foreground">
            Photos from different cabin viewpoints.
          </p>
          <ComponentPreview id="fw-photos">
            <PhotoGalleryDemo />
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
                <td className="px-4 py-3 font-mono text-xs">cabins</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">8</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">radius</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">100</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">autoRotate</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">showBase</td>
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
