"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Sun, Sunrise, Sunset, Cloud, Thermometer, Eye, Brightness } from "lucide-react";

const installCommand = `npx component-library@latest add sun-bright`;
const usageCode = `<SunBright size="lg" animated />`;

function BrightnessControl() {
  const [brightness, setBrightness] = useState(75);

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Brightness className="h-5 w-5 text-yellow-500" />
        <h3 className="font-medium">Brightness Control</h3>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Sun className="h-4 w-4 text-muted-foreground" />
          <input
            type="range"
            min="0"
            max="100"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="flex-1 accent-yellow-500"
          />
          <Sun className="h-6 w-6 text-yellow-500" />
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>0%</span>
          <span className="font-medium text-foreground">{brightness}%</span>
          <span>100%</span>
        </div>
        <div
          className="h-24 rounded-lg bg-gradient-to-r from-gray-900 via-yellow-500 to-yellow-300 flex items-center justify-center"
          style={{ opacity: brightness / 100 }}
        >
          <Sun className="h-10 w-10 text-white drop-shadow-lg" />
        </div>
      </div>
    </div>
  );
}

function SunCard() {
  const [selected, setSelected] = useState(false);

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Sun className="h-5 w-5 text-orange-500" />
        <h3 className="font-medium">Sun Card</h3>
      </div>
      <div
        onClick={() => setSelected(!selected)}
        className={`cursor-pointer rounded-lg border-2 p-6 text-center transition-all ${
          selected ? "border-orange-500 bg-orange-50 dark:bg-orange-950" : "border-border hover:border-orange-300"
        }`}
      >
        <Sun className="mx-auto h-12 w-12 text-orange-500 mb-2" />
        <p className="font-medium">Sunshine</p>
        <p className="text-sm text-muted-foreground">Click to toggle</p>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">Status: {selected ? "Active" : "Inactive"}</p>
    </div>
  );
}

function WeatherDisplay() {
  const [temp, setTemp] = useState(24);

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Cloud className="h-5 w-5 text-blue-500" />
        <h3 className="font-medium">Weather Display</h3>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950">
          <Sun className="mx-auto h-8 w-8 text-yellow-500 mb-2" />
          <p className="text-2xl font-bold">{temp}°C</p>
          <p className="text-xs text-muted-foreground">Temperature</p>
        </div>
        <div className="text-center p-4 rounded-lg bg-blue-50 dark:bg-blue-950">
          <Eye className="mx-auto h-8 w-8 text-blue-500 mb-2" />
          <p className="text-2xl font-bold">10km</p>
          <p className="text-xs text-muted-foreground">Visibility</p>
        </div>
        <div className="text-center p-4 rounded-lg bg-orange-50 dark:bg-orange-950">
          <Thermometer className="mx-auto h-8 w-8 text-orange-500 mb-2" />
          <p className="text-2xl font-bold">65%</p>
          <p className="text-xs text-muted-foreground">Humidity</p>
        </div>
      </div>
    </div>
  );
}

function SunriseAlarm() {
  const [alarmTime, setAlarmTime] = useState("06:30");
  const [isSet, setIsSet] = useState(false);

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Sunrise className="h-5 w-5 text-orange-400" />
        <h3 className="font-medium">Sunrise Alarm</h3>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium">Alarm Time:</label>
          <input
            type="time"
            value={alarmTime}
            onChange={(e) => setAlarmTime(e.target.value)}
            className="rounded-md border bg-background px-3 py-2 text-sm"
          />
        </div>
        <div className="flex items-center gap-3 p-4 rounded-lg bg-orange-50 dark:bg-orange-950">
          <Sunrise className="h-6 w-6 text-orange-400" />
          <div>
            <p className="font-medium">Sunrise at {alarmTime}</p>
            <p className="text-sm text-muted-foreground">Natural light simulation</p>
          </div>
        </div>
        <button
          onClick={() => setIsSet(!isSet)}
          className={`w-full rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            isSet ? "bg-orange-500 text-white" : "bg-muted hover:bg-muted/80"
          }`}
        >
          {isSet ? "Alarm Set" : "Set Alarm"}
        </button>
      </div>
    </div>
  );
}

function UVIndex() {
  const [uvLevel, setUvLevel] = useState(6);

  const getUVColor = (level: number) => {
    if (level <= 2) return "text-green-500";
    if (level <= 5) return "text-yellow-500";
    if (level <= 7) return "text-orange-500";
    return "text-red-500";
  };

  const getUVLabel = (level: number) => {
    if (level <= 2) return "Low";
    if (level <= 5) return "Moderate";
    if (level <= 7) return "High";
    return "Very High";
  };

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Sun className="h-5 w-5 text-yellow-500" />
        <h3 className="font-medium">UV Index</h3>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className={`text-4xl font-bold ${getUVColor(uvLevel)}`}>{uvLevel}</span>
          <span className={`text-lg font-medium ${getUVColor(uvLevel)}`}>{getUVLabel(uvLevel)}</span>
        </div>
        <input
          type="range"
          min="0"
          max="11"
          value={uvLevel}
          onChange={(e) => setUvLevel(Number(e.target.value))}
          className="w-full accent-yellow-500"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0</span>
          <span>3</span>
          <span>6</span>
          <span>8</span>
          <span>11+</span>
        </div>
        <div className="rounded-lg bg-yellow-50 dark:bg-yellow-950 p-3 text-sm">
          <p className="font-medium">Protection Needed</p>
          <p className="text-muted-foreground">Wear sunscreen and seek shade</p>
        </div>
      </div>
    </div>
  );
}

function DayMode() {
  const [mode, setMode] = useState<"day" | "night">("day");

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Brightness className="h-5 w-5 text-yellow-500" />
        <h3 className="font-medium">Day Mode</h3>
      </div>
      <div className={`rounded-lg p-6 text-center transition-all ${
        mode === "day" ? "bg-yellow-100 dark:bg-yellow-900" : "bg-gray-900 text-white"
      }`}>
        {mode === "day" ? (
          <Sun className="mx-auto h-16 w-16 text-yellow-500 mb-3" />
        ) : (
          <div className="mx-auto h-16 w-16 rounded-full bg-gray-700 mb-3 flex items-center justify-center">
            <Eye className="h-8 w-8 text-gray-300" />
          </div>
        )}
        <p className="text-lg font-medium">{mode === "day" ? "Day Mode" : "Night Mode"}</p>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setMode("day")}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            mode === "day" ? "bg-yellow-500 text-white" : "bg-muted hover:bg-muted/80"
          }`}
        >
          Day
        </button>
        <button
          onClick={() => setMode("night")}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            mode === "night" ? "bg-gray-800 text-white" : "bg-muted hover:bg-muted/80"
          }`}
        >
          Night
        </button>
      </div>
    </div>
  );
}

function SolarPanel() {
  const [efficiency, setEfficiency] = useState(82);

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Sun className="h-5 w-5 text-yellow-500" />
        <h3 className="font-medium">Solar Panel</h3>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 16 }, (_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-md border transition-colors ${
                i < Math.floor((efficiency / 100) * 16)
                  ? "bg-blue-500 border-blue-600"
                  : "bg-muted border-border"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Efficiency</span>
          <span className="font-medium">{efficiency}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={efficiency}
          onChange={(e) => setEfficiency(Number(e.target.value))}
          className="w-full accent-yellow-500"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0%</span>
          <span>Power Output: {Math.floor(efficiency * 0.4)}W</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}

export default function SunBrightPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Sun Bright</h1>
          <Badge variant="primary">Visual</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A visual component for displaying a bright sun with customizable rays, glow effects, and animation for weather or time-of-day indicators.
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
        <div className="grid gap-6 md:grid-cols-2">
          <ComponentPreview component="SunBrightBrightnessControl" />
          <ComponentPreview component="SunBrightSunCard" />
          <ComponentPreview component="SunBrightWeatherDisplay" />
          <ComponentPreview component="SunBrightSunriseAlarm" />
        </div>
        <ComponentPreview component="SunBrightUVIndex" />
        <div className="grid gap-6 md:grid-cols-2">
          <ComponentPreview component="SunBrightDayMode" />
          <ComponentPreview component="SunBrightSolarPanel" />
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
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">{'"sm" | "md" | "lg"'}</td>
                <td className="px-4 py-3 text-muted-foreground">{'"md"'}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">animated</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">brightness</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">100</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">glow</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
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
