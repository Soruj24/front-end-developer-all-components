"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Snowflake,
  Thermometer,
  Cloud,
  Wind,
  Sun,
  CloudSnow,
  Droplet,
} from "lucide-react";

const installCommand = `npx component-library@latest add snowflake-winter`;

const usageCode = `import { SnowflakeWinter } from "@/components/ui";

<SnowflakeWinter intensity="medium" />`;

function WinterCardDemo() {
  return (
    <div className="w-full max-w-xs overflow-hidden rounded-lg border border-blue-200 dark:border-blue-900/50">
      <div className="flex h-28 items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30">
        <Snowflake className="h-14 w-14 text-blue-500" />
      </div>
      <div className="p-4">
        <h3 className="font-medium">Winter Wonderland</h3>
        <p className="mt-1 text-sm text-muted-foreground">2 inches of fresh snow expected overnight.</p>
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <Thermometer className="h-3 w-3" /> 28°F
          <Wind className="h-3 w-3" /> 12 mph
        </div>
      </div>
    </div>
  );
}

function TemperatureDisplayDemo() {
  const [temp, setTemp] = useState(-5);
  const color = temp <= 0 ? "text-blue-500" : temp <= 15 ? "text-cyan-500" : "text-orange-500";
  return (
    <div className="flex flex-col items-center gap-2">
      <Thermometer className={`h-12 w-12 ${color}`} />
      <span className={`text-4xl font-bold ${color}`}>{temp}°C</span>
      <input type="range" min={-20} max={30} value={temp} onChange={(e) => setTemp(Number(e.target.value))} className="w-48" />
      <p className="text-xs text-muted-foreground">{temp <= 0 ? "Below freezing" : "Above freezing"}</p>
    </div>
  );
}

function SnowfallEffectDemo() {
  const [intensity, setIntensity] = useState<"light" | "medium" | "heavy">("medium");
  const counts = { light: 8, medium: 16, heavy: 30 };
  const flakeCount = counts[intensity];
  return (
    <div className="relative flex h-40 w-full items-end justify-center overflow-hidden rounded-lg bg-gradient-to-b from-slate-800 to-slate-900">
      {Array.from({ length: flakeCount }, (_, i) => (
        <span key={i} className="absolute text-white animate-pulse" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 80}%`, fontSize: `${8 + Math.random() * 8}px`, opacity: 0.5 + Math.random() * 0.5 }}>
          <Snowflake className="h-3 w-3" />
        </span>
      ))}
      <div className="mb-3 flex gap-1 z-10">
        {(["light", "medium", "heavy"] as const).map((i) => (
          <button key={i} onClick={() => setIntensity(i)} className={`rounded px-2 py-0.5 text-xs ${intensity === i ? "bg-white text-slate-900" : "bg-white/20 text-white"}`}>{i}</button>
        ))}
      </div>
    </div>
  );
}

function WeatherForecastDemo() {
  const days = [
    { day: "Mon", Icon: Cloud, temp: "-2", condition: "Cloudy" },
    { day: "Tue", Icon: CloudSnow, temp: "-5", condition: "Snow" },
    { day: "Wed", Icon: Snowflake, temp: "-8", condition: "Blizzard" },
    { day: "Thu", Icon: Sun, temp: "2", condition: "Sunny" },
    { day: "Fri", Icon: Wind, temp: "-1", condition: "Windy" },
  ];
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {days.map((d) => (
        <div key={d.day} className="flex flex-col items-center gap-1 rounded-lg border p-3 min-w-[70px]">
          <span className="text-xs font-medium text-muted-foreground">{d.day}</span>
          <d.Icon className="h-5 w-5 text-blue-500" />
          <span className="text-sm font-bold">{d.temp}°</span>
          <span className="text-[10px] text-muted-foreground">{d.condition}</span>
        </div>
      ))}
    </div>
  );
}

function FreezeWarningDemo() {
  const [acknowledged, setAcknowledged] = useState(false);
  return (
    <div className={`rounded-lg border p-4 ${acknowledged ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-950/30" : "border-orange-200 bg-orange-50 dark:border-orange-900/50 dark:bg-orange-950/30"}`}>
      <div className="flex items-start gap-3">
        <Thermometer className={`mt-0.5 h-5 w-5 ${acknowledged ? "text-emerald-600" : "text-orange-600"}`} />
        <div className="flex-1">
          <p className="text-sm font-medium">{acknowledged ? "Freeze Warning Acknowledged" : "Freeze Warning"}</p>
          <p className="mt-1 text-sm text-muted-foreground">Temps expected below 32°F. Protect outdoor pipes and plants.</p>
        </div>
        {!acknowledged && (
          <button onClick={() => setAcknowledged(true)} className="rounded-md bg-orange-600 px-3 py-1 text-xs font-medium text-white hover:bg-orange-700">Acknowledge</button>
        )}
      </div>
    </div>
  );
}

function IceCrystalDemo() {
  const [size, setSize] = useState(48);
  return (
    <div className="flex flex-col items-center gap-3">
      <Snowflake style={{ width: size, height: size }} className="text-blue-500" />
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Size:</span>
        <input type="range" min={16} max={96} value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-32" />
        <span className="w-8 text-sm">{size}px</span>
      </div>
    </div>
  );
}

function WinterThemeDemo() {
  const [theme, setTheme] = useState<"frost" | "aurora" | "midnight">("frost");
  const themes = {
    frost: "from-blue-100 to-cyan-50 text-blue-900",
    aurora: "from-green-100 to-emerald-50 text-green-900",
    midnight: "from-indigo-900 to-slate-900 text-indigo-100",
  };
  return (
    <div className="flex flex-col gap-3">
      <div className={`rounded-lg bg-gradient-to-br p-6 ${themes[theme]}`}>
        <Snowflake className="mb-2 h-6 w-6" />
        <p className="font-medium capitalize">{theme} Theme</p>
        <p className="text-sm opacity-80">Winter dashboard preview</p>
      </div>
      <div className="flex gap-1">
        {(["frost", "aurora", "midnight"] as const).map((t) => (
          <button key={t} onClick={() => setTheme(t)} className={`rounded-md px-3 py-1 text-xs ${theme === t ? "bg-primary text-primary-foreground" : "border hover:bg-muted"}`}>{t}</button>
        ))}
      </div>
    </div>
  );
}

export default function SnowflakeWinterPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Snowflake Winter</h1>
          <Badge variant="primary">Seasonal</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Winter-themed components for weather displays, snowfall animations, temperature gauges, and seasonal UI elements.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Winter Card</h2>
        <ComponentPreview component="SnowflakeWinterCardDemo">
          <WinterCardDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Temperature Display</h2>
        <ComponentPreview component="SnowflakeWinterTemperatureDemo">
          <TemperatureDisplayDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Snowfall Effect</h2>
        <ComponentPreview component="SnowflakeWinterSnowfallDemo">
          <SnowfallEffectDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Weather Forecast</h2>
        <ComponentPreview component="SnowflakeWinterForecastDemo">
          <WeatherForecastDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Freeze Warning</h2>
        <ComponentPreview component="SnowflakeWinterFreezeWarningDemo">
          <FreezeWarningDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Ice Crystal</h2>
        <ComponentPreview component="SnowflakeWinterIceCrystalDemo">
          <IceCrystalDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Winter Theme</h2>
        <ComponentPreview component="SnowflakeWinterThemeDemo">
          <WinterThemeDemo />
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
                <td className="px-4 py-3 font-mono text-xs">intensity</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"light\" | \"medium\" | \"heavy\""}</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"medium\""}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">speed</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">1</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">showGround</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">temperature</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">0</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onFreeze</td>
                <td className="px-4 py-3 text-muted-foreground">() =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
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
