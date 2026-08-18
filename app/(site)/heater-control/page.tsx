"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Thermometer, Sun, Snowflake, Clock, Zap, Home, Settings, TrendingUp } from "lucide-react";

const installCommand = `npx component-library@latest add heater-control`;
const usageCode = `import { HeaterControl } from "@/components/heater-control";

<HeaterControl value={22} />`;

function ThermostatDemo() {
  const [temp, setTemp] = useState(22);
  const [mode, setMode] = useState<"heat" | "cool" | "auto">("heat");

  const getColor = (t: number) => {
    if (t < 18) return "#3b82f6";
    if (t < 22) return "#22c55e";
    if (t < 26) return "#f97316";
    return "#ef4444";
  };

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm p-6 dark:border-white/[.145]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Thermostat</h3>
          </div>
          <div className="flex gap-1">
            {(["heat", "cool", "auto"] as const).map((m) => (
              <button key={m} onClick={() => setMode(m)} className={`rounded-md px-2 py-1 text-[10px] font-medium transition-colors ${mode === m ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>
                {m === "heat" ? "🔥" : m === "cool" ? "❄️" : "🔄"} {m}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-center mb-6">
          <div className="relative h-40 w-40">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="6" className="text-muted" />
              <circle cx="50" cy="50" r="40" fill="none" stroke={getColor(temp)} strokeWidth="6" strokeLinecap="round" strokeDasharray={`${((temp - 10) / 30) * 251} 251`} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-4xl font-extrabold" style={{ color: getColor(temp) }}>{temp}°</p>
              <p className="text-[10px] text-muted-foreground">Celsius</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setTemp((t) => Math.max(10, t - 1))} className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-lg font-bold hover:bg-muted/80">-</button>
          <input type="range" min={10} max={40} value={temp} onChange={(e) => setTemp(Number(e.target.value))} className="flex-1 accent-primary" />
          <button onClick={() => setTemp((t) => Math.min(40, t + 1))} className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-lg font-bold hover:bg-muted/80">+</button>
        </div>
        <div className="flex justify-between text-[9px] text-muted-foreground">
          <span>10°C</span>
          <span>Target: {temp}°C</span>
          <span>40°C</span>
        </div>
      </div>
    </div>
  );
}

function RoomTemperaturesDemo() {
  const [selected, setSelected] = useState("living");
  const rooms = [
    { id: "living", name: "Living Room", temp: 22, target: 22, icon: "🛋️" },
    { id: "bedroom", name: "Bedroom", temp: 20, target: 21, icon: "🛏️" },
    { id: "kitchen", name: "Kitchen", temp: 24, target: 23, icon: "🍳" },
    { id: "bathroom", name: "Bathroom", temp: 25, target: 24, icon: "🚿" },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Home className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Room Temperatures</h3>
          </div>
        </div>
        <div className="p-4 grid grid-cols-2 gap-2">
          {rooms.map((r) => (
            <button key={r.id} onClick={() => setSelected(r.id)} className={`rounded-lg border p-3 text-left transition-all ${selected === r.id ? "border-primary bg-primary/5" : "border-black/[.08] dark:border-white/[.145]"}`}>
              <span className="text-xl">{r.icon}</span>
              <p className="text-[10px] text-muted-foreground mt-1">{r.name}</p>
              <p className="text-lg font-extrabold">{r.temp}°</p>
              <p className="text-[9px] text-muted-foreground">Target: {r.target}°</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScheduleTimerDemo() {
  const [active, setActive] = useState(true);
  const schedule = [
    { time: "06:00", temp: 21, label: "Wake Up" },
    { time: "08:30", temp: 18, label: "Leave" },
    { time: "17:00", temp: 22, label: "Return" },
    { time: "22:00", temp: 19, label: "Sleep" },
  ];

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Heating Schedule</h3>
            <button onClick={() => setActive(!active)} className={`ml-auto rounded-full px-2 py-0.5 text-[9px] font-medium ${active ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400" : "bg-muted text-muted-foreground"}`}>
              {active ? "Active" : "Paused"}
            </button>
          </div>
        </div>
        <div className="p-4 space-y-2">
          {schedule.map((s) => (
            <div key={s.time} className="flex items-center gap-3 rounded-lg bg-muted/30 px-3 py-2">
              <span className="text-sm font-mono font-bold">{s.time}</span>
              <div className="flex-1"><p className="text-xs font-medium">{s.label}</p></div>
              <div className="flex items-center gap-1">
                <Thermometer className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs font-bold">{s.temp}°</span>
              </div>
              <div className={`h-2 w-2 rounded-full ${active ? "bg-emerald-500" : "bg-muted"}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EnergyUsageDemo() {
  const [period, setPeriod] = useState("today");
  const usage = {
    today: { kwh: 12.5, cost: 2.50, peak: "6-9 PM" },
    week: { kwh: 87.5, cost: 17.50, peak: "Evenings" },
    month: { kwh: 350, cost: 70.00, peak: "Weekends" },
  };
  const data = usage[period as keyof typeof usage];

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Energy Usage</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="flex gap-2 mb-4">
            {["today", "week", "month"].map((p) => (
              <button key={p} onClick={() => setPeriod(p)} className={`flex-1 rounded-lg px-3 py-2 text-[10px] font-medium capitalize transition-colors ${period === p ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>{p}</button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="rounded-lg bg-muted/30 p-3 text-center">
              <p className="text-xl font-extrabold">{data.kwh}</p>
              <p className="text-[9px] text-muted-foreground">kWh</p>
            </div>
            <div className="rounded-lg bg-muted/30 p-3 text-center">
              <p className="text-xl font-extrabold">${data.cost.toFixed(2)}</p>
              <p className="text-[9px] text-muted-foreground">Cost</p>
            </div>
            <div className="rounded-lg bg-muted/30 p-3 text-center">
              <p className="text-[10px] font-bold">{data.peak}</p>
              <p className="text-[9px] text-muted-foreground">Peak</p>
            </div>
          </div>
          <div className="h-20 bg-muted/20 rounded-lg flex items-end justify-between gap-1 p-2">
            {[40, 65, 45, 80, 55, 70, 90, 60, 75, 50, 85, 45].map((h, i) => (
              <div key={i} className="flex-1 bg-primary rounded-t" style={{ height: `${h}%`, opacity: 0.5 + (h / 180) }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickPresetsDemo() {
  const [selected, setSelected] = useState("comfort");
  const presets = [
    { id: "eco", name: "Eco", temp: 18, icon: "🌱", color: "bg-emerald-100 text-emerald-700" },
    { id: "comfort", name: "Comfort", temp: 22, icon: "😌", color: "bg-blue-100 text-blue-700" },
    { id: "boost", name: "Boost", temp: 26, icon: "🔥", color: "bg-orange-100 text-orange-700" },
    { id: "night", name: "Night", temp: 19, icon: "🌙", color: "bg-indigo-100 text-indigo-700" },
  ];

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm p-4 dark:border-white/[.145]">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Quick Presets</h3>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {presets.map((p) => (
            <button key={p.id} onClick={() => setSelected(p.id)} className={`rounded-lg border p-4 text-left transition-all ${selected === p.id ? "border-primary bg-primary/5" : "border-black/[.08] dark:border-white/[.145]"}`}>
              <span className="text-2xl">{p.icon}</span>
              <p className="text-sm font-bold mt-2">{p.name}</p>
              <p className="text-lg font-extrabold">{p.temp}°C</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function HeatingZonesDemo() {
  const [zones, setZones] = useState([
    { id: 1, name: "Ground Floor", temp: 22, active: true },
    { id: 2, name: "First Floor", temp: 20, active: true },
    { id: 3, name: "Basement", temp: 18, active: false },
  ]);

  const toggle = (id: number) => {
    setZones((prev) => prev.map((z) => z.id === id ? { ...z, active: !z.active } : z));
  };

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Home className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Heating Zones</h3>
          </div>
        </div>
        <div className="p-4 space-y-2">
          {zones.map((z) => (
            <button key={z.id} onClick={() => toggle(z.id)} className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all ${z.active ? "border-primary/30 bg-primary/5" : "border-black/[.08] dark:border-white/[.145]"}`}>
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${z.active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                <Thermometer className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold">{z.name}</p>
                <p className="text-[10px] text-muted-foreground">{z.temp}°C target</p>
              </div>
              <span className={`text-[10px] font-medium ${z.active ? "text-primary" : "text-muted-foreground"}`}>{z.active ? "ON" : "OFF"}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ClimateHistoryDemo() {
  const hours = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i.toString().padStart(2, "0")}:00`,
    temp: 20 + Math.sin(i * 0.3) * 3 + Math.random() * 2,
  }));

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Climate History</h3>
            <span className="ml-auto text-[10px] text-muted-foreground">Last 24h</span>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-end gap-0.5 h-24">
            {hours.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-primary rounded-t" style={{ height: `${((h.temp - 15) / 15) * 100}%`, opacity: 0.4 + (h.temp / 30) * 0.6 }} />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[8px] text-muted-foreground">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>23:00</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeaterControlPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Heater Control</h1>
          <Badge variant="primary">Input</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A heater control input component for temperature regulation and thermostat interfaces.</p>
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
          <h3 className="text-lg font-medium text-foreground">Thermostat Control</h3>
          <p className="text-sm text-muted-foreground">Interactive temperature dial with mode selector.</p>
          <ComponentPreview id="heater-thermostat"><ThermostatDemo /></ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Room Temperatures</h3>
          <p className="text-sm text-muted-foreground">Multi-room temperature display.</p>
          <ComponentPreview id="heater-rooms"><RoomTemperaturesDemo /></ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Schedule Timer</h3>
          <p className="text-sm text-muted-foreground">Heating schedule with time slots.</p>
          <ComponentPreview id="heater-schedule"><ScheduleTimerDemo /></ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Energy Usage</h3>
          <p className="text-sm text-muted-foreground">Power consumption tracker.</p>
          <ComponentPreview id="heater-energy"><EnergyUsageDemo /></ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Quick Presets</h3>
          <p className="text-sm text-muted-foreground">Temperature preset buttons.</p>
          <ComponentPreview id="heater-presets"><QuickPresetsDemo /></ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Heating Zones</h3>
          <p className="text-sm text-muted-foreground">Zone-based heating control.</p>
          <ComponentPreview id="heater-zones"><HeatingZonesDemo /></ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Climate History</h3>
          <p className="text-sm text-muted-foreground">24-hour temperature history.</p>
          <ComponentPreview id="heater-history"><ClimateHistoryDemo /></ComponentPreview>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead>
            <tbody>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">value</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">22</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">min</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">10</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">max</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">40</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
