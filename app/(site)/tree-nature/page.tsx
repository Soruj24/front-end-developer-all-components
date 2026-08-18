"use client";
import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { TreePine, Leaf, Flower2, Sun, Droplet, Wind, Mountain } from "lucide-react";

const installCommand = "npx shadcn@latest add tree-nature";
const usageCode = "import { TreeCard } from \"@/components/tree-nature\";\n\nexport default function Page() {\n  return <TreeCard />;\n}";

function TreeCard() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-lg border overflow-hidden">
      <div className="h-32 bg-gradient-to-br from-green-100 to-emerald-200 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center">
        <TreePine className="h-16 w-16 text-green-600 dark:text-green-400" />
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Norway Spruce</h3>
          <Badge variant="secondary">Evergreen</Badge>
        </div>
        <p className="text-sm text-muted-foreground">Height: 25-35m · Lifespan: 300-600 years</p>
        <button onClick={() => setExpanded(!expanded)} className="text-sm text-primary underline">
          {expanded ? "Show less" : "Learn more"}
        </button>
        {expanded && (
          <div className="pt-2 text-sm text-muted-foreground space-y-1">
            <p>Native to Northern Europe. Widely used as a Christmas tree due to its conical shape.</p>
            <div className="flex gap-2 pt-1">
              <span className="flex items-center gap-1"><Sun className="h-3 w-3" /> Full Sun</span>
              <span className="flex items-center gap-1"><Droplet className="h-3 w-3" /> Moderate Water</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ForestView() {
  const [selectedTree, setSelectedTree] = useState<string | null>(null);
  const trees = [
    { id: "pine", name: "Pine", count: 45, color: "bg-green-500" },
    { id: "oak", name: "Oak", count: 30, color: "bg-amber-500" },
    { id: "birch", name: "Birch", count: 20, color: "bg-lime-500" },
    { id: "maple", name: "Maple", count: 15, color: "bg-red-500" },
  ];
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <TreePine className="h-5 w-5 text-green-600" />
        <h3 className="font-medium">Forest Composition</h3>
      </div>
      <div className="space-y-2">
        {trees.map((tree) => (
          <button key={tree.id} onClick={() => setSelectedTree(tree.id)} className={["w-full flex items-center gap-3 p-2 rounded-md text-left transition-colors", selectedTree === tree.id ? "bg-primary/10 ring-1 ring-primary" : "hover:bg-muted/50"].join(" ")}>
            <span className={["w-3 h-3 rounded-full", tree.color].join(" ")} />
            <span className="text-sm flex-1">{tree.name}</span>
            <span className="text-sm text-muted-foreground">{tree.count}%</span>
            <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
              <div className={["h-full rounded-full", tree.color].join(" ")} style={{ width: tree.count + "%" }} />
            </div>
          </button>
        ))}
      </div>
      <div className="pt-2 text-xs text-muted-foreground">Total trees: 110</div>
    </div>
  );
}

function NatureBadge() {
  const [activeBadge, setActiveBadge] = useState("forest");
  const badges = [
    { id: "forest", label: "Forest Guardian", icon: TreePine },
    { id: "planter", label: "Tree Planter", icon: Leaf },
    { id: "watershed", label: "Watershed Hero", icon: Droplet },
    { id: "climate", label: "Climate Champion", icon: Wind },
  ];
  return (
    <div className="space-y-3">
      <h3 className="font-medium flex items-center gap-2">
        <Leaf className="h-5 w-5 text-green-600" />
        Nature Badges
      </h3>
      <div className="flex flex-wrap gap-2">
        {badges.map((badge) => {
          const Icon = badge.icon;
          return (
            <button key={badge.id} onClick={() => setActiveBadge(badge.id)} className={["flex items-center gap-2 px-3 py-2 rounded-full border text-sm transition-all", activeBadge === badge.id ? "bg-primary text-primary-foreground border-primary" : "hover:border-primary"].join(" ")}>
              <Icon className="h-4 w-4" />
              {badge.label}
            </button>
          );
        })}
      </div>
      <div className="p-3 rounded-md bg-muted/50 text-sm">
        Active badge: <strong>{badges.find(b => b.id === activeBadge)?.label}</strong>
      </div>
    </div>
  );
}

function EcoIndicator() {
  const metrics = [
    { label: "Air Quality", value: 85, unit: "AQI", icon: Wind },
    { label: "UV Index", value: 4, unit: "", icon: Sun },
    { label: "Humidity", value: 62, unit: "%", icon: Droplet },
    { label: "Pollen Count", value: 3, unit: "Low", icon: Leaf },
  ];
  return (
    <div className="space-y-3">
      <h3 className="font-medium flex items-center gap-2">
        <Mountain className="h-5 w-5 text-primary" />
        Environmental Indicators
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="p-3 rounded-lg border space-y-1">
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{metric.label}</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold">{metric.value}</span>
                <span className="text-xs text-muted-foreground">{metric.unit}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PlantGrowth() {
  const [stage, setStage] = useState(0);
  const stages = ["Seed", "Sprout", "Sapling", "Young Tree", "Mature Tree"];
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium flex items-center gap-2">
          <Leaf className="h-5 w-5 text-green-600" />
          Plant Growth Tracker
        </h3>
        <Badge>{stages[stage]}</Badge>
      </div>
      <div className="flex gap-1">
        {stages.map((_, i) => (
          <button key={i} onClick={() => setStage(i)} className={["h-2 flex-1 rounded-full transition-colors", i <= stage ? "bg-green-500" : "bg-muted"].join(" ")} />
        ))}
      </div>
      <div className="flex gap-2">
        <button onClick={() => setStage(Math.max(0, stage - 1))} disabled={stage === 0} className="px-3 py-1.5 rounded-md border text-xs disabled:opacity-50">Previous</button>
        <button onClick={() => setStage(Math.min(4, stage + 1))} disabled={stage === 4} className="px-3 py-1.5 rounded-md border text-xs disabled:opacity-50">Next Stage</button>
      </div>
      <div className="p-3 rounded-md bg-green-50 dark:bg-green-950/20 text-sm text-green-700 dark:text-green-400">
        {stage === 0 && "A tiny seed holds the potential for a mighty tree."}
        {stage === 1 && "First leaves emerge, reaching toward the sunlight."}
        {stage === 2 && "The trunk strengthens, roots spread deeper."}
        {stage === 3 && "Branches extend, creating a canopy of life."}
        {stage === 4 && "A magnificent tree providing shelter and oxygen."}
      </div>
    </div>
  );
}

function SeasonalTree() {
  const [season, setSeason] = useState("spring");
  const seasonData = {
    spring: { icon: Flower2, color: "from-pink-100 to-green-100 dark:from-pink-950/20 dark:to-green-950/20", label: "Spring", leaves: "🌸" },
    summer: { icon: Sun, color: "from-green-100 to-yellow-100 dark:from-green-950/20 dark:to-yellow-950/20", label: "Summer", leaves: "🌿" },
    autumn: { icon: Leaf, color: "from-orange-100 to-red-100 dark:from-orange-950/20 dark:to-red-950/20", label: "Autumn", leaves: "🍂" },
    winter: { icon: Wind, color: "from-blue-100 to-gray-100 dark:from-blue-950/20 dark:to-gray-950/20", label: "Winter", leaves: "❄️" },
  };
  const current = seasonData[season as keyof typeof seasonData];
  return (
    <div className="space-y-3">
      <h3 className="font-medium flex items-center gap-2">
        <TreePine className="h-5 w-5 text-primary" />
        Seasonal Display
      </h3>
      <div className={["h-40 rounded-lg bg-gradient-to-br flex items-center justify-center text-6xl transition-all", current.color].join(" ")}>
        {current.leaves}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {(Object.entries(seasonData) as [string, typeof seasonData.spring][]).map(([key, s]) => (
          <button key={key} onClick={() => setSeason(key)} className={["p-2 rounded-md text-center text-sm transition-colors", season === key ? "bg-primary text-primary-foreground" : "border hover:bg-muted/50"].join(" ")}>
            <s.icon className="h-4 w-4 mx-auto mb-1" />
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function WildernessGuide() {
  const [selectedTrail, setSelectedTrail] = useState<string | null>(null);
  const trails = [
    { id: "alpine", name: "Alpine Trail", difficulty: "Hard", length: "12 km", elevation: "800m" },
    { id: "forest", name: "Forest Loop", difficulty: "Easy", length: "5 km", elevation: "120m" },
    { id: "ridge", name: "Mountain Ridge", difficulty: "Moderate", length: "8 km", elevation: "450m" },
  ];
  const difficultyColor: Record<string, string> = { Easy: "bg-green-500", Moderate: "bg-yellow-500", Hard: "bg-red-500" };
  return (
    <div className="space-y-3">
      <h3 className="font-medium flex items-center gap-2">
        <Mountain className="h-5 w-5 text-primary" />
        Trail Guide
      </h3>
      <div className="space-y-2">
        {trails.map((trail) => (
          <button key={trail.id} onClick={() => setSelectedTrail(trail.id)} className={["w-full p-3 rounded-lg border text-left transition-all", selectedTrail === trail.id ? "border-primary ring-1 ring-primary" : "hover:border-muted-foreground/50"].join(" ")}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">{trail.name}</span>
              <span className={["px-2 py-0.5 rounded-full text-xs text-white", difficultyColor[trail.difficulty]].join(" ")}>
                {trail.difficulty}
              </span>
            </div>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span>{trail.length}</span>
              <span>↑ {trail.elevation}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function TreeNaturePage() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <TreePine className="h-8 w-8 text-green-600" />
          <h1 className="text-3xl font-bold">Tree & Nature</h1>
          <Badge variant="secondary">New</Badge>
        </div>
        <p className="text-muted-foreground text-lg">
          Nature-inspired components for eco-friendly interfaces and environmental data display.
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
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold">Examples</h2>
        <div className="space-y-6">
          <h3 className="text-lg font-medium flex items-center gap-2"><TreePine className="h-5 w-5" /> Tree Card</h3>
          <ComponentPreview code={TreeCard.toString()} />
        </div>
        <div className="space-y-6">
          <h3 className="text-lg font-medium flex items-center gap-2"><TreePine className="h-5 w-5" /> Forest View</h3>
          <ComponentPreview code={ForestView.toString()} />
        </div>
        <div className="space-y-6">
          <h3 className="text-lg font-medium flex items-center gap-2"><Leaf className="h-5 w-5" /> Nature Badge</h3>
          <ComponentPreview code={NatureBadge.toString()} />
        </div>
        <div className="space-y-6">
          <h3 className="text-lg font-medium flex items-center gap-2"><Mountain className="h-5 w-5" /> Eco Indicator</h3>
          <ComponentPreview code={EcoIndicator.toString()} />
        </div>
        <div className="space-y-6">
          <h3 className="text-lg font-medium flex items-center gap-2"><Leaf className="h-5 w-5" /> Plant Growth</h3>
          <ComponentPreview code={PlantGrowth.toString()} />
        </div>
        <div className="space-y-6">
          <h3 className="text-lg font-medium flex items-center gap-2"><TreePine className="h-5 w-5" /> Seasonal Tree</h3>
          <ComponentPreview code={SeasonalTree.toString()} />
        </div>
        <div className="space-y-6">
          <h3 className="text-lg font-medium flex items-center gap-2"><Mountain className="h-5 w-5" /> Wilderness Guide</h3>
          <ComponentPreview code={WildernessGuide.toString()} />
        </div>
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-medium">Prop</th>
                <th className="text-left p-3 font-medium">Type</th>
                <th className="text-left p-3 font-medium">Default</th>
                <th className="text-left p-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t"><td className="p-3"><code>trees</code></td><td className="p-3">TreeData[]</td><td className="p-3">[]</td><td className="p-3">Array of tree species data for display</td></tr>
              <tr className="border-t"><td className="p-3"><code>season</code></td><td className="p-3">&quot;spring&quot; | &quot;summer&quot; | &quot;autumn&quot; | &quot;winter&quot;</td><td className="p-3">&quot;spring&quot;</td><td className="p-3">Current season for seasonal display</td></tr>
              <tr className="border-t"><td className="p-3"><code>metrics</code></td><td className="p-3">EcoMetric[]</td><td className="p-3">[]</td><td className="p-3">Environmental indicator data</td></tr>
              <tr className="border-t"><td className="p-3"><code>trails</code></td><td className="p-3">Trail[]</td><td className="p-3">[]</td><td className="p-3">Wilderness trail data for guide</td></tr>
              <tr className="border-t"><td className="p-3"><code>growthStage</code></td><td className="p-3">number</td><td className="p-3">0</td><td className="p-3">Current growth stage (0-4)</td></tr>
              <tr className="border-t"><td className="p-3"><code>onTreeSelect</code></td><td className="p-3">(treeId: string) =&gt; void</td><td className="p-3">-</td><td className="p-3">Callback when a tree is selected</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
