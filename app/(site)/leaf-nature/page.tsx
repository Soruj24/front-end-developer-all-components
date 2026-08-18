"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Leaf,
  TreePine,
  Flower2,
  Sprout,
  Mountain,
  Wind,
  Sun,
} from "lucide-react";

const installCommand = "npx shadcn@latest add leaf-nature";

const usageCode = `import { Badge } from "@/components/design-system/Badge";

// Eco-friendly certification badge
<Badge variant="primary">
  <Leaf className="w-4 h-4" />
  Eco Certified
</Badge>

// Sustainability meter
<Badge variant="success">
  <Sprout className="w-4 h-4" />
  Sustainable
</Badge>`;

function EcoBadgeDemo() {
  return (
    <ComponentPreview>
      <div className="flex flex-wrap gap-2">
        <Badge variant="primary">
          <Leaf className="w-4 h-4" />
          Eco Certified
        </Badge>
        <Badge variant="outline">
          <Leaf className="w-4 h-4" />
          Carbon Neutral
        </Badge>
        <Badge variant="green">
          <Leaf className="w-4 h-4" />
          100% Organic
        </Badge>
      </div>
    </ComponentPreview>
  );
}

function NatureCardDemo() {
  const [hovered, setHovered] = useState(false);

  return (
    <ComponentPreview>
      <div
        className="relative w-full max-w-sm overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all duration-300"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ transform: hovered ? "translateY(-4px)" : "none" }}
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
            <TreePine className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Forest Guardian</h3>
            <p className="text-sm text-muted-foreground">Protecting ecosystems</p>
          </div>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">
          Every purchase plants two trees and supports wildlife conservation
          efforts across endangered forest regions.
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">
            <Sprout className="h-3 w-3" />
            Growing
          </Badge>
          <Badge variant="outline">
            <Mountain className="h-3 w-3" />
            Wild
          </Badge>
        </div>
      </div>
    </ComponentPreview>
  );
}

function GreenStatsDemo() {
  const stats = [
    { label: "Trees Planted", value: "2.4M", icon: TreePine, color: "text-green-600" },
    { label: "CO2 Offset", value: "847K tons", icon: Leaf, color: "text-emerald-600" },
    { label: "Species Saved", value: "1,240", icon: Flower2, color: "text-pink-600" },
    { label: "Clean Energy", value: "98%", icon: Sun, color: "text-amber-600" },
  ];

  return (
    <ComponentPreview>
      <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border bg-card p-4 text-center shadow-sm"
          >
            <stat.icon className={`mx-auto mb-2 h-6 w-6 ${stat.color}`} />
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    </ComponentPreview>
  );
}

function PlantBadgeDemo() {
  return (
    <ComponentPreview>
      <div className="flex flex-wrap gap-2">
        <Badge variant="success">
          <Flower2 className="w-4 h-4" />
          Plant-Based
        </Badge>
        <Badge variant="eco">
          <Sprout className="w-4 h-4" />
          Vegan Friendly
        </Badge>
        <Badge variant="outline">
          <Leaf className="w-4 h-4" />
          Biodegradable
        </Badge>
      </div>
    </ComponentPreview>
  );
}

function SustainabilityMeterDemo() {
  const [level, setLevel] = useState(78);

  return (
    <ComponentPreview>
      <div className="w-full max-w-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">
            Sustainability Score
          </span>
          <Badge variant="success">
            <Leaf className="h-3 w-3" />
            {level}%
          </Badge>
        </div>
        <div className="relative h-3 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500"
            style={{ width: `${level}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Poor</span>
          <span>Good</span>
          <span>Excellent</span>
        </div>
        <div className="flex gap-2">
          {[40, 60, 80, 95].map((val) => (
            <button
              key={val}
              onClick={() => setLevel(val)}
              className={`rounded-md border px-3 py-1 text-xs transition-colors ${
                level === val
                  ? "border-green-500 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : "border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {val}%
            </button>
          ))}
        </div>
      </div>
    </ComponentPreview>
  );
}

function NatureHeaderDemo() {
  return (
    <ComponentPreview>
      <div className="relative w-full overflow-hidden rounded-xl border bg-gradient-to-br from-green-50 to-emerald-50 p-8 dark:from-green-950/30 dark:to-emerald-950/30">
        <div className="absolute -right-8 -top-8 opacity-10">
          <TreePine className="h-40 w-40 text-green-600" />
        </div>
        <div className="relative z-10">
          <Badge variant="primary" className="mb-4">
            <Wind className="h-3 w-3" />
            Climate Action
          </Badge>
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
            Building a Greener Future
          </h2>
          <p className="mb-4 max-w-md text-muted-foreground">
            Every component we create is designed with sustainability in mind.
            From eco-friendly materials to carbon-neutral shipping.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="green">
              <Sprout className="h-3 w-3" />
              Sustainable
            </Badge>
            <Badge variant="outline">
              <Mountain className="h-3 w-3" />
              Earth First
            </Badge>
            <Badge variant="outline">
              <Sun className="h-3 w-3" />
              Solar Powered
            </Badge>
          </div>
        </div>
      </div>
    </ComponentPreview>
  );
}

function EcoIconSetDemo() {
  const icons = [
    { icon: Leaf, label: "Leaf", color: "text-green-500" },
    { icon: TreePine, label: "Tree", color: "text-emerald-600" },
    { icon: Flower2, label: "Flower", color: "text-pink-500" },
    { icon: Sprout, label: "Sprout", color: "text-lime-500" },
    { icon: Mountain, label: "Mountain", color: "text-stone-500" },
    { icon: Wind, label: "Wind", color: "text-sky-500" },
    { icon: Sun, label: "Sun", color: "text-amber-500" },
  ];

  return (
    <ComponentPreview>
      <div className="flex flex-wrap justify-center gap-6">
        {icons.map(({ icon: Icon, label, color }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border bg-card shadow-sm transition-transform hover:scale-110">
              <Icon className={`h-7 w-7 ${color}`} />
            </div>
            <span className="text-xs text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </ComponentPreview>
  );
}

export default function LeafNaturePage() {
  return (
    <div className="mx-auto max-w-4xl space-y-12 py-10">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/30">
            <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Leaf Nature
            </h1>
            <p className="text-muted-foreground">
              Eco-friendly UI components for sustainable web applications
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Installation</h2>
        <CodeBlock code={installCommand} language="bash" />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Usage</h2>
        <CodeBlock code={usageCode} language="tsx" />
      </div>

      <div className="space-y-8">
        <h2 className="text-xl font-semibold text-foreground">Examples</h2>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Eco Badge</h3>
          <p className="text-sm text-muted-foreground">
            Certification badges for eco-friendly products and services.
          </p>
          <EcoBadgeDemo />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Nature Card</h3>
          <p className="text-sm text-muted-foreground">
            Themed card with nature illustrations and hover effects.
          </p>
          <NatureCardDemo />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Green Stats</h3>
          <p className="text-sm text-muted-foreground">
            Environmental statistics and impact metrics display.
          </p>
          <GreenStatsDemo />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Plant Badge</h3>
          <p className="text-sm text-muted-foreground">
            Badges for plant-based and vegan product identification.
          </p>
          <PlantBadgeDemo />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">
            Sustainability Meter
          </h3>
          <p className="text-sm text-muted-foreground">
            Interactive sustainability score indicator with level controls.
          </p>
          <SustainabilityMeterDemo />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Nature Header</h3>
          <p className="text-sm text-muted-foreground">
            Hero section with nature-themed gradient backgrounds.
          </p>
          <NatureHeaderDemo />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">Eco Icon Set</h3>
          <p className="text-sm text-muted-foreground">
            Collection of nature and environment icons with hover effects.
          </p>
          <EcoIconSetDemo />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">API Reference</h2>
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50 text-left">
                <th className="px-4 py-3 font-medium text-foreground">Prop</th>
                <th className="px-4 py-3 font-medium text-foreground">Type</th>
                <th className="px-4 py-3 font-medium text-foreground">Default</th>
                <th className="px-4 py-3 font-medium text-foreground">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs text-foreground">variant</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">"default"</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Visual variant of the badge
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs text-foreground">color</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">"green"</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Color theme for the badge
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">undefined</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Additional CSS classes
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}