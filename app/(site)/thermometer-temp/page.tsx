"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Thermometer,
  Sun,
  Snowflake,
  Cloud,
  Droplet,
  Wind,
  Gauge,
} from "lucide-react";

const installCommand = `npx shadcn@latest add thermometer-temp`;

const usageCode = `import { ThermometerTemp } from "@/components/thermometer-temp";

export default function Demo() {
  return (
    <ThermometerTemp
      value={72}
      unit="F"
      onValueChange={(val) => console.log(val)}
    />
  );
}`;

function TemperatureGauge() {
  const [temp, setTemp] = useState(72);

  const getColor = () => {
    if (temp < 32) return "text-blue-500";
    if (temp < 60) return "text-cyan-500";
    if (temp < 85) return "text-green-500";
    if (temp < 100) return "text-orange-500";
    return "text-red-500";
  };

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Thermometer className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Temperature Gauge</h3>
      </div>
      <div className="flex items-center justify-center py-8">
        <div className={`text-6xl font-bold ${getColor()}`}>{temp}°</div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Adjust Temperature</label>
        <input
          type="range"
          min={-20}
          max={120}
          value={temp}
          onChange={(e) => setTemp(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>-20°F</span>
          <span>120°F</span>
        </div>
      </div>
    </div>
  );
}

function WeatherDisplay() {
  const [unit, setUnit] = useState<"F" | "C">("F");

  const temps = { F: 72, C: 22 };

  const forecast = [
    { day: "Mon", high: 75, low: 58 },
    { day: "Tue", high: 68, low: 52 },
    { day: "Wed", high: 71, low: 55 },
  ];

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sun className="h-5 w-5 text-yellow-500" />
          <h3 className="font-semibold">Weather Display</h3>
        </div>
        <div className="flex gap-1 p-1 bg-muted rounded-lg">
          <button
            onClick={() => setUnit("F")}
            className={`px-2 py-1 rounded text-sm ${
              unit === "F" ? "bg-background shadow-sm" : ""
            }`}
          >
            °F
          </button>
          <button
            onClick={() => setUnit("C")}
            className={`px-2 py-1 rounded text-sm ${
              unit === "C" ? "bg-background shadow-sm" : ""
            }`}
          >
            °C
          </button>
        </div>
      </div>
      <div className="text-center py-4">
        <div className="text-4xl font-bold">
          {unit === "F" ? temps.F : temps.C}°{unit}
        </div>
        <div className="text-muted-foreground">Feels like {unit === "F" ? 70 : 21}°{unit}</div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {forecast.map((day) => (
          <div key={day.day} className="p-2 rounded-lg bg-muted text-center">
            <div className="text-sm font-medium">{day.day}</div>
            <div className="text-lg font-bold">
              {unit === "F" ? day.high : Math.round((day.high - 32) * 5/9)}°
            </div>
            <div className="text-xs text-muted-foreground">
              Low: {unit === "F" ? day.low : Math.round((day.low - 32) * 5/9)}°
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeatIndex() {
  const [temp, setTemp] = useState(85);
  const [humidity, setHumidity] = useState(50);

  const calculateHeatIndex = () => {
    if (temp < 80) return temp;
    const hi = -42.379 + 2.04901523 * temp + 10.14333127 * humidity;
    return Math.round(hi);
  };

  const heatIndex = calculateHeatIndex();
  const dangerLevel = heatIndex < 91 ? "low" : heatIndex < 104 ? "moderate" : "high";

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Sun className="h-5 w-5 text-orange-500" />
        <h3 className="font-semibold">Heat Index Calculator</h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Temperature: {temp}°F</label>
          <input
            type="range"
            min={60}
            max={120}
            value={temp}
            onChange={(e) => setTemp(Number(e.target.value))}
            className="w-full mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Humidity: {humidity}%</label>
          <input
            type="range"
            min={0}
            max={100}
            value={humidity}
            onChange={(e) => setHumidity(Number(e.target.value))}
            className="w-full mt-1"
          />
        </div>
      </div>
      <div className="p-4 rounded-lg bg-muted text-center">
        <div className="text-3xl font-bold">{heatIndex}°F</div>
        <div className="text-muted-foreground">Heat Index</div>
      </div>
      <Badge variant={dangerLevel === "low" ? "default" : dangerLevel === "moderate" ? "secondary" : "destructive"}>
        {dangerLevel === "low" ? "Caution" : dangerLevel === "moderate" ? "Danger" : "Extreme Danger"}
      </Badge>
    </div>
  );
}

function ColdAlert() {
  const [temp, setTemp] = useState(25);

  const warnings = [
    { min: -Infinity, max: 0, level: "Severe", color: "text-blue-600" },
    { min: 0, max: 20, level: "Warning", color: "text-cyan-600" },
    { min: 20, max: 32, level: "Watch", color: "text-teal-600" },
    { min: 32, max: Infinity, level: "Normal", color: "text-green-600" },
  ];

  const currentWarning = warnings.find((w) => temp >= w.min && temp < w.max);

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Snowflake className="h-5 w-5 text-cyan-500" />
        <h3 className="font-semibold">Cold Weather Alert</h3>
      </div>
      <div className="flex items-center justify-center py-4">
        <div className="text-5xl font-bold text-cyan-500">{temp}°F</div>
      </div>
      <input
        type="range"
        min={-20}
        max={50}
        value={temp}
        onChange={(e) => setTemp(Number(e.target.value))}
        className="w-full"
      />
      {currentWarning && (
        <div className={`p-3 rounded-lg border text-center font-medium ${currentWarning.color}`}>
          {currentWarning.level} Cold Advisory
        </div>
      )}
      <div className="text-sm text-muted-foreground text-center">
        Frostbite risk increases below 32°F
      </div>
    </div>
  );
}

function TempControl() {
  const [target, setTarget] = useState(70);
  const [current, setCurrent] = useState(68);

  const difference = target - current;
  const status = difference > 0 ? "heating" : difference < 0 ? "cooling" : "idle";

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Gauge className="h-5 w-5 text-green-500" />
        <h3 className="font-semibold">Thermostat Control</h3>
      </div>
      <div className="flex items-center justify-center gap-8 py-4">
        <div className="text-center">
          <div className="text-4xl font-bold">{current}°</div>
          <div className="text-sm text-muted-foreground">Current</div>
        </div>
        <div className="text-2xl text-muted-foreground">→</div>
        <div className="text-center">
          <div className="text-4xl font-bold text-primary">{target}°</div>
          <div className="text-sm text-muted-foreground">Target</div>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Set Target: {target}°F</label>
        <input
          type="range"
          min={60}
          max={85}
          value={target}
          onChange={(e) => setTarget(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <div className="flex justify-center">
        <Badge variant={status === "idle" ? "default" : "secondary"}>
          {status === "idle" ? "At Target" : `Currently ${status}`}
        </Badge>
      </div>
    </div>
  );
}

function ClimateChart() {
  const [metric, setMetric] = useState<"temp" | "precip">("temp");

  const monthlyData = [
    { month: "Jan", temp: 32, precip: 2.1 },
    { month: "Apr", temp: 55, precip: 3.5 },
    { month: "Jul", temp: 78, precip: 1.8 },
    { month: "Oct", temp: 58, precip: 2.9 },
  ];

  const maxValue = metric === "temp" ? 100 : 5;

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Cloud className="h-5 w-5 text-gray-500" />
        <h3 className="font-semibold">Climate Chart</h3>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setMetric("temp")}
          className={`px-3 py-1 rounded-full text-sm ${
            metric === "temp"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary"
          }`}
        >
          Temperature
        </button>
        <button
          onClick={() => setMetric("precip")}
          className={`px-3 py-1 rounded-full text-sm ${
            metric === "precip"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary"
          }`}
        >
          Precipitation
        </button>
      </div>
      <div className="space-y-3">
        {monthlyData.map((m) => (
          <div key={m.month} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>{m.month}</span>
              <span>
                {metric === "temp" ? `${m.temp}°F` : `${m.precip}"`}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  metric === "temp" ? "bg-orange-500" : "bg-blue-500"
                }`}
                style={{
                  width: `${((metric === "temp" ? m.temp : m.precip) / maxValue) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ThermalMap() {
  const [zone, setZone] = useState("living");

  const zones = {
    living: { name: "Living Room", temp: 72, humidity: 45 },
    bedroom: { name: "Bedroom", temp: 68, humidity: 40 },
    kitchen: { name: "Kitchen", temp: 75, humidity: 55 },
    garage: { name: "Garage", temp: 58, humidity: 35 },
  };

  const current = zones[zone as keyof typeof zones];

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Droplet className="h-5 w-5 text-blue-500" />
        <h3 className="font-semibold">Thermal Zone Map</h3>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(zones).map(([key, z]) => (
          <button
            key={key}
            onClick={() => setZone(key)}
            className={`p-3 rounded-lg border text-left transition-all ${
              zone === key
                ? "border-primary bg-primary/5"
                : "hover:border-primary/50"
            }`}
          >
            <div className="font-medium text-sm">{z.name}</div>
            <div className="text-lg font-bold">{z.temp}°F</div>
          </button>
        ))}
      </div>
      <div className="p-4 rounded-lg bg-muted grid grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-muted-foreground">Temperature</div>
          <div className="text-xl font-bold">{current.temp}°F</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Humidity</div>
          <div className="text-xl font-bold">{current.humidity}%</div>
        </div>
      </div>
    </div>
  );
}

export default function ThermometerTempPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline">Components</Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Thermometer Temp</h1>
        <p className="text-lg text-muted-foreground">
          Temperature monitoring and display components for weather apps,
          thermostats, and climate visualization.
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

        <ComponentPreview name="TemperatureGauge">
          <TemperatureGauge />
        </ComponentPreview>

        <ComponentPreview name="WeatherDisplay">
          <WeatherDisplay />
        </ComponentPreview>

        <ComponentPreview name="HeatIndex">
          <HeatIndex />
        </ComponentPreview>

        <ComponentPreview name="ColdAlert">
          <ColdAlert />
        </ComponentPreview>

        <ComponentPreview name="TempControl">
          <TempControl />
        </ComponentPreview>

        <ComponentPreview name="ClimateChart">
          <ClimateChart />
        </ComponentPreview>

        <ComponentPreview name="ThermalMap">
          <ThermalMap />
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
                <td className="px-4 py-2 font-mono text-xs">value</td>
                <td className="px-4 py-2">number</td>
                <td className="px-4 py-2">72</td>
                <td className="px-4 py-2">Current temperature value</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-mono text-xs">unit</td>
                <td className="px-4 py-2">"F" | "C"</td>
                <td className="px-4 py-2">"F"</td>
                <td className="px-4 py-2">Temperature unit</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-mono text-xs">onValueChange</td>
                <td className="px-4 py-2">{"(value: number) => void"}</td>
                <td className="px-4 py-2">—</td>
                <td className="px-4 py-2">Callback when value changes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-mono text-xs">min</td>
                <td className="px-4 py-2">number</td>
                <td className="px-4 py-2">-20</td>
                <td className="px-4 py-2">Minimum value</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">max</td>
                <td className="px-4 py-2">number</td>
                <td className="px-4 py-2">120</td>
                <td className="px-4 py-2">Maximum value</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
