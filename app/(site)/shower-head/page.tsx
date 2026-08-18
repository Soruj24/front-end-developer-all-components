"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { ShowerHead, Droplet, Thermometer, Timer, Power, Settings, Cloud } from "lucide-react";

const installCommand = `npx component-library@latest add shower-head`;

const usageCode = `import { ShowerHead } from "@/components/shower-head";

export default function Page() {
  return <ShowerHead pressure={2} temperature={38} />;
}`;

function WaterFlowDemo() {
  const [flow, setFlow] = useState(50);
  const drops = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: 10 + i * 12,
    delay: i * 0.15,
    height: 20 + Math.random() * 30,
  }));
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center gap-2">
        <Droplet className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Water Flow</span>
      </div>
      <div className="relative h-32 overflow-hidden rounded-md bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-3 rounded-b-full bg-slate-400 dark:bg-slate-500" />
        {flow > 10 && drops.map((d) => (
          <div
            key={d.id}
            className="absolute w-1 rounded-full bg-blue-400"
            style={{
              left: `${d.left}%`,
              top: "12px",
              height: `${(flow / 100) * d.height}px`,
              opacity: flow / 100,
              animation: `pulse ${1 + d.delay}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
      <div className="mt-3 flex items-center gap-3">
        <Droplet className="h-3 w-3 text-blue-500" />
        <input type="range" min={0} max={100} value={flow} onChange={(e) => setFlow(Number(e.target.value))} className="flex-1 accent-blue-500" />
        <span className="w-8 text-right text-xs text-muted-foreground">{flow}%</span>
      </div>
    </div>
  );
}

function TemperatureControlDemo() {
  const [temp, setTemp] = useState(38);
  const color = temp < 35 ? "text-blue-500" : temp < 40 ? "text-green-500" : "text-red-500";
  const label = temp < 35 ? "Cold" : temp < 37 ? "Cool" : temp < 40 ? "Warm" : temp < 43 ? "Hot" : "Scalding";
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center gap-2">
        <Thermometer className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Temperature Control</span>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative h-32 w-8 overflow-hidden rounded-full bg-muted">
          <div
            className="absolute bottom-0 w-full rounded-full transition-all duration-300"
            style={{
              height: `${((temp - 20) / 30) * 100}%`,
              backgroundColor: temp < 35 ? "#3b82f6" : temp < 40 ? "#22c55e" : "#ef4444",
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className={`text-3xl font-bold ${color}`}>{temp}°C</span>
          <span className={`text-xs font-medium ${color}`}>{label}</span>
          <input
            type="range"
            min={20}
            max={50}
            value={temp}
            onChange={(e) => setTemp(Number(e.target.value))}
            className="w-32 accent-primary"
          />
        </div>
      </div>
    </div>
  );
}

function ShowerTimerDemo() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [target] = useState(300);
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const progress = (seconds / target) * 100;
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center gap-2">
        <Timer className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Shower Timer</span>
      </div>
      <div className="flex h-32 items-center justify-center rounded-md bg-muted/30 mb-4">
        <div className="relative flex flex-col items-center">
          <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" className="text-muted" strokeWidth={6} />
            <circle
              cx="50" cy="50" r="42" fill="none" stroke="currentColor"
              className={`transition-all ${progress > 80 ? "text-red-500" : "text-primary"}`}
              strokeWidth={6} strokeLinecap="round"
              strokeDasharray={264} strokeDashoffset={264 - (264 * progress) / 100}
            />
          </svg>
          <span className="absolute text-lg font-bold text-foreground">
            {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setRunning(!running)}
          className={`flex-1 flex items-center justify-center gap-2 rounded-md px-4 py-2 text-xs font-medium transition-colors ${running ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground"}`}
        >
          <Power className="h-3 w-3" />
          {running ? "Stop" : "Start"}
        </button>
        <button
          onClick={() => { setSeconds(0); setRunning(false); }}
          className="rounded-md bg-muted px-4 py-2 text-xs font-medium text-muted-foreground hover:bg-muted/80"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

function WaterPressureDemo() {
  const [pressure, setPressure] = useState(3);
  const maxBars = 5;
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center gap-2">
        <Droplet className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Water Pressure</span>
      </div>
      <div className="flex items-end gap-2 h-24 mb-4">
        {Array.from({ length: maxBars }, (_, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div
              className={`w-full rounded-t transition-all duration-300 ${i < pressure ? "bg-blue-500" : "bg-muted"}`}
              style={{ height: `${20 + i * 16}px` }}
            />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground">Low</span>
        <input type="range" min={1} max={5} value={pressure} onChange={(e) => setPressure(Number(e.target.value))} className="flex-1 accent-blue-500" />
        <span className="text-xs text-muted-foreground">High</span>
      </div>
      <p className="mt-2 text-center text-sm font-bold text-foreground">{pressure} / {maxBars} bar</p>
    </div>
  );
}

function EcoShowerDemo() {
  const [enabled, setEnabled] = useState(true);
  const [savedLiters, setSavedLiters] = useState(42);
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center gap-2">
        <Cloud className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Eco Shower</span>
      </div>
      <div className="rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20">
              <Cloud className="h-4 w-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-foreground">Water Saving Mode</p>
              <p className="text-[10px] text-muted-foreground">Reduce water usage by 40%</p>
            </div>
          </div>
          <button
            onClick={() => setEnabled(!enabled)}
            className={`relative h-6 w-11 rounded-full transition-colors ${enabled ? "bg-emerald-500" : "bg-muted"}`}
          >
            <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${enabled ? "left-[22px]" : "left-0.5"}`} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-background/50 p-3 text-center">
            <p className="text-lg font-bold text-emerald-600">{savedLiters}L</p>
            <p className="text-[10px] text-muted-foreground">Saved this month</p>
          </div>
          <div className="rounded-lg bg-background/50 p-3 text-center">
            <p className="text-lg font-bold text-emerald-600">40%</p>
            <p className="text-[10px] text-muted-foreground">Usage reduction</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SmartShowerDemo() {
  const [settings, setSettings] = useState({ temp: 38, pressure: 3, timer: 10 });
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center gap-2">
        <Settings className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Smart Shower</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col items-center gap-2 rounded-lg border p-3">
          <Thermometer className="h-5 w-5 text-orange-500" />
          <span className="text-lg font-bold text-foreground">{settings.temp}°</span>
          <span className="text-[10px] text-muted-foreground">Temperature</span>
          <input
            type="range" min={20} max={50} value={settings.temp}
            onChange={(e) => setSettings((p) => ({ ...p, temp: Number(e.target.value) }))}
            className="w-full accent-orange-500"
          />
        </div>
        <div className="flex flex-col items-center gap-2 rounded-lg border p-3">
          <Droplet className="h-5 w-5 text-blue-500" />
          <span className="text-lg font-bold text-foreground">{settings.pressure}</span>
          <span className="text-[10px] text-muted-foreground">Pressure</span>
          <input
            type="range" min={1} max={5} value={settings.pressure}
            onChange={(e) => setSettings((p) => ({ ...p, pressure: Number(e.target.value) }))}
            className="w-full accent-blue-500"
          />
        </div>
        <div className="flex flex-col items-center gap-2 rounded-lg border p-3">
          <Timer className="h-5 w-5 text-primary" />
          <span className="text-lg font-bold text-foreground">{settings.timer}m</span>
          <span className="text-[10px] text-muted-foreground">Timer</span>
          <input
            type="range" min={5} max={30} value={settings.timer}
            onChange={(e) => setSettings((p) => ({ ...p, timer: Number(e.target.value) }))}
            className="w-full accent-primary"
          />
        </div>
      </div>
    </div>
  );
}

function RainfallModeDemo() {
  const [mode, setMode] = useState("rain");
  const modes = [
    { id: "rain", label: "Rain", icon: Cloud, desc: "Gentle rainfall pattern" },
    { id: "mist", label: "Mist", icon: Droplet, desc: "Fine mist spray" },
    { id: "jet", label: "Jet", icon: Settings, desc: "Focused high-pressure" },
  ];
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center gap-2">
        <Cloud className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Rainfall Mode</span>
      </div>
      <div className="flex flex-col gap-2">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`flex items-center gap-3 rounded-md border p-3 text-left transition-all ${mode === m.id ? "border-primary bg-primary/5" : "border-transparent bg-muted/30 hover:bg-muted/50"}`}
          >
            <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${mode === m.id ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
              <m.icon className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium">{m.label}</p>
              <p className="text-[10px] text-muted-foreground">{m.desc}</p>
            </div>
            {mode === m.id && <span className="text-xs text-primary">Active</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ShowerHeadPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Shower Head</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Water flow, temperature, timer, and pressure controls with eco-friendly and smart shower modes.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">WaterFlow</h2>
        <WaterFlowDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">TemperatureControl</h2>
        <TemperatureControlDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">ShowerTimer</h2>
        <ShowerTimerDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">WaterPressure</h2>
        <WaterPressureDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">EcoShower</h2>
        <EcoShowerDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">SmartShower</h2>
        <SmartShowerDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">RainfallMode</h2>
        <RainfallModeDemo />
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
                <td className="px-4 py-3 font-mono text-xs">pressure</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">3</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">temperature</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">38</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">mode</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;rain&quot; | &quot;mist&quot; | &quot;jet&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;rain&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">ecoMode</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
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
