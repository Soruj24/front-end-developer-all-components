"use client";

import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Umbrella, CloudRain, Droplets, Cloud } from "lucide-react";

const installCommand = `npx component-library@latest add umbrella-rain`;
const usageCode = `import { UmbrellaRain } from "@/components/_umbrella-rain";

<UmbrellaRain intensity="heavy" />`;

function RainDrop({ delay, left }: { delay: string; left: string }) {
  return (
    <div
      className="absolute h-3 w-0.5 animate-[fall_0.8s_linear_infinite] rounded-full bg-primary/60"
      style={{ left, animationDelay: delay }}
    />
  );
}

function WeatherCard({ icon: Icon, label, temp, rain }: { icon: React.ElementType; label: string; temp: string; rain: string }) {
  return (
    <div className="rounded-lg border border-border p-4 text-center">
      <Icon className="mx-auto mb-2 h-6 w-6 text-primary" />
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-lg font-semibold">{temp}</p>
      <p className="text-xs text-muted-foreground">{rain}</p>
    </div>
  );
}

export default function UmbrellaRainPage() {
  const drops = Array.from({ length: 20 }, (_, i) => ({
    delay: `${(i * 0.1).toFixed(1)}s`,
    left: `${Math.random() * 100}%`,
  }));

  const forecasts = [
    { icon: CloudRain, label: "Mon", temp: "18°C", rain: "90%" },
    { icon: Cloud, label: "Tue", temp: "20°C", rain: "40%" },
    { icon: Droplets, label: "Wed", temp: "22°C", rain: "60%" },
    { icon: Umbrella, label: "Thu", temp: "19°C", rain: "75%" },
  ];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Umbrella Rain</h1>
          <Badge variant="primary">Visual</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Animated rain effects with umbrellas, weather cards, and precipitation overlays.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Rain Animation</h2>
        <div className="relative overflow-hidden rounded-lg border border-border bg-background/50 p-8">
          <div className="relative mx-auto h-32 w-32">
            {drops.map((d, i) => (
              <RainDrop key={i} {...d} />
            ))}
            <Umbrella className="absolute bottom-0 left-1/2 h-16 w-16 -translate-x-1/2 text-primary" />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Forecast Cards</h2>
        <div className="grid grid-cols-4 gap-3">
          {forecasts.map((f) => (
            <WeatherCard key={f.label} {...f} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Intensity Levels</h2>
        <div className="flex gap-4">
          {["light", "moderate", "heavy"].map((level) => (
            <div key={level} className="rounded-lg border border-border px-4 py-2 text-sm font-medium capitalize">
              {level}
            </div>
          ))}
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
                <td className="px-4 py-3 font-mono text-xs">intensity</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;light&quot; | &quot;moderate&quot; | &quot;heavy&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;moderate&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">animated</td>
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
