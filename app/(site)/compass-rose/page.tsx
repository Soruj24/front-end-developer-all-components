"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Compass, Navigation, MapPin } from "lucide-react";

const installCommand = `npx component-library@latest add compass-rose`;
const usageCode = `import { CompassRose } from "@/components/compass-rose";

<CompassRose heading={45} size="lg" />`;

function CompassRoseDemo() {
  const [heading, setHeading] = useState(0);
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-48 w-48">
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1" className="text-border" />
          <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
          {dirs.map((d, i) => {
            const angle = (i * 45 - 90) * (Math.PI / 180);
            const x = 100 + 80 * Math.cos(angle);
            const y = 100 + 80 * Math.sin(angle);
            return (
              <text key={d} x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="fill-foreground text-[10px] font-medium">
                {d}
              </text>
            );
          })}
          <g transform={`rotate(${heading} 100 100)`}>
            <polygon points="100,20 95,60 100,50 105,60" className="fill-red-500" />
            <polygon points="100,180 95,140 100,150 105,140" className="fill-foreground" />
          </g>
          <circle cx="100" cy="100" r="4" className="fill-foreground" />
        </svg>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-mono">{heading}°</span>
        <input type="range" min={0} max={360} value={heading} onChange={(e) => setHeading(Number(e.target.value))} className="w-48 accent-primary" />
      </div>
    </div>
  );
}

function HeadingIndicatorDemo() {
  const [heading, setHeading] = useState(90);
  const dirs = ["N", "E", "S", "W"];
  const dirIndex = Math.round(heading / 90) % 4;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2 rounded-lg border bg-card px-4 py-2">
        <Compass className="h-5 w-5 text-primary" />
        <span className="text-2xl font-bold font-mono">{heading}°</span>
        <span className="text-sm text-muted-foreground">{dirs[dirIndex]}</span>
      </div>
      <div className="flex gap-2">
        {[0, 90, 180, 270].map((h) => (
          <button key={h} onClick={() => setHeading(h)} className="rounded-md bg-muted px-3 py-1 text-xs font-medium hover:bg-muted/80">
            {dirs[Math.round(h / 90) % 4]}
          </button>
        ))}
      </div>
    </div>
  );
}

function NavigationBarDemo() {
  const [current, setCurrent] = useState("N");
  const points = ["N", "E", "S", "W"];
  const coords = { N: "0, -1", E: "1, 0", S: "0, 1", W: "-1, 0" };

  return (
    <div className="flex flex-col gap-2 w-full max-w-xs">
      <div className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2">
        <Navigation className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium">Navigate to:</span>
        <span className="ml-auto font-mono text-sm">{coords[current as keyof typeof coords]}</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {points.map((p) => (
          <button
            key={p}
            onClick={() => setCurrent(p)}
            className={`flex items-center justify-center gap-2 rounded-lg border py-3 text-sm font-medium transition-colors ${
              current === p ? "border-primary bg-primary/10 text-primary" : "hover:bg-muted"
            }`}
          >
            <MapPin className="h-3 w-3" />
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function CompassRosePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Compass Rose</h1>
          <Badge variant="primary">Navigation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Interactive compass rose with heading control, cardinal directions, and navigation indicators for wayfinding UIs.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Interactive Compass</h2>
        <ComponentPreview>
          <CompassRoseDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Heading Indicator</h2>
        <ComponentPreview>
          <HeadingIndicatorDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Navigation Bar</h2>
        <ComponentPreview>
          <NavigationBarDemo />
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
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">heading</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">0</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">size</td><td className="px-4 py-3 text-muted-foreground">{'"sm" | "md" | "lg"'}</td><td className="px-4 py-3 text-muted-foreground">{'"md"'}</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
