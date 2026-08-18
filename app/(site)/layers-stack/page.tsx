"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Layers,
  SquareStack,
  ArrowUp,
  ArrowDown,
  Eye,
  Layout,
  Grid,
} from "lucide-react";

const installCommand = "npx shadcn@latest add layers-stack";

const usageCode = `import { LayersStack } from "@/components/layers-stack";

export default function Page() {
  return (
    <LayersStack stacked depth={3} gap="md">
      <div>Layer 1</div>
      <div>Layer 2</div>
      <div>Layer 3</div>
    </LayersStack>
  );
}`;

function CardStackDemo() {
  const [hovered, setHovered] = useState<number | null>(null);

  const cards = [
    { id: 1, color: "bg-blue-500", title: "Card One" },
    { id: 2, color: "bg-purple-500", title: "Card Two" },
    { id: 3, color: "bg-pink-500", title: "Card Three" },
    { id: 4, color: "bg-amber-500", title: "Card Four" },
  ];

  return (
    <div className="flex justify-center py-10">
      <div className="relative h-64 w-48">
        {cards.map((card, index) => {
          const isHovered = hovered === index;
          const fanAngle = hovered !== null ? (index - 1.5) * 8 : 0;
          const fanY = hovered !== null ? Math.abs(index - 1.5) * 4 : 0;
          const zIndex = isHovered ? 50 : cards.length - index;

          return (
            <div
              key={card.id}
              className={`absolute inset-0 rounded-xl shadow-lg transition-all duration-300 cursor-pointer \${card.color}`}
              style={{
                zIndex,
                transform: `rotate(\${fanAngle}deg) translateY(\${fanY}px) translateY(\${index * -2}px)`,
                opacity: 1 - index * 0.05,
              }}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="flex h-full items-center justify-center text-white font-semibold">
                {card.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ZIndexVisualizerDemo() {
  const layers = [
    { level: 0, label: "Background", color: "bg-slate-300", icon: Layers },
    { level: 1, label: "Content", color: "bg-slate-400", icon: Layout },
    { level: 2, label: "Sidebar", color: "bg-slate-500", icon: Grid },
    { level: 3, label: "Modal", color: "bg-slate-600", icon: Eye },
    { level: 4, label: "Tooltip", color: "bg-slate-700", icon: SquareStack },
  ];

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <div className="relative h-72 w-64">
        {layers.map((layer, index) => {
          const Icon = layer.icon;
          return (
            <div
              key={layer.level}
              className={`absolute rounded-lg border-2 border-white/30 shadow-xl transition-all duration-500 \${layer.color}`}
              style={{
                bottom: `\${index * 12}px`,
                left: `\${index * 8}px`,
                right: `\${index * 8}px`,
                height: `\${56 + index * 4}px`,
                zIndex: layer.level * 10,
              }}
            >
              <div className="flex items-center gap-2 px-4 h-full text-white">
                <Icon size={16} />
                <span className="text-sm font-medium">{layer.label}</span>
                <Badge className="ml-auto text-xs">z-index: {layer.level * 10}</Badge>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LayerCompositionDemo() {
  const [activeLayer, setActiveLayer] = useState<string>("all");

  const uiLayers = [
    {
      id: "base",
      label: "Base Layer",
      color: "bg-indigo-500/90",
      description: "Page background and grid",
    },
    {
      id: "content",
      label: "Content Layer",
      color: "bg-violet-500/90",
      description: "Text, images, and media",
    },
    {
      id: "interactive",
      label: "Interactive Layer",
      color: "bg-purple-500/90",
      description: "Buttons, inputs, and controls",
    },
    {
      id: "overlay",
      label: "Overlay Layer",
      color: "bg-fuchsia-500/90",
      description: "Modals, drawers, and popovers",
    },
  ];

  const visibleLayers =
    activeLayer === "all"
      ? uiLayers
      : uiLayers.filter((l) => l.id === activeLayer);

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="flex gap-2">
        <button
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors \${
            activeLayer === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
          onClick={() => setActiveLayer("all")}
        >
          All Layers
        </button>
        {uiLayers.map((layer) => (
          <button
            key={layer.id}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors \${
              activeLayer === layer.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
            onClick={() => setActiveLayer(layer.id)}
          >
            {layer.label}
          </button>
        ))}
      </div>

      <div className="relative h-56 w-full max-w-sm">
        {visibleLayers.map((layer, index) => (
          <div
            key={layer.id}
            className={`absolute inset-x-0 rounded-xl border border-white/20 shadow-2xl transition-all duration-500 \${layer.color}`}
            style={{
              bottom: `\${index * 14}px`,
              height: "80px",
              zIndex: index * 10,
            }}
          >
            <div className="flex flex-col justify-center h-full px-5 text-white">
              <span className="text-sm font-bold">{layer.label}</span>
              <span className="text-xs opacity-80">{layer.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StackLayoutDemo() {
  const items = [
    { id: 1, label: "Header", height: "h-12", icon: ArrowUp },
    { id: 2, label: "Navigation", height: "h-10", icon: Grid },
    { id: 3, label: "Content", height: "h-20", icon: Layout },
    { id: 4, label: "Footer", height: "h-10", icon: ArrowDown },
  ];

  return (
    <div className="flex justify-center py-8">
      <div className="w-full max-w-sm space-y-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`flex items-center gap-3 rounded-lg border bg-card px-4 shadow-sm transition-all hover:shadow-md \${item.height}`}
            >
              <Icon size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium">{item.label}</span>
              <Badge variant="outline" className="ml-auto text-xs">
                {item.height.replace("h-", "")} units
              </Badge>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function OverlapEffectDemo() {
  const [offset, setOffset] = useState(16);

  const colors = [
    "bg-rose-400",
    "bg-amber-400",
    "bg-emerald-400",
    "bg-sky-400",
    "bg-violet-400",
  ];

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">Overlap:</span>
        <input
          type="range"
          min={0}
          max={48}
          value={offset}
          onChange={(e) => setOffset(Number(e.target.value))}
          className="w-48"
        />
        <Badge>{offset}px</Badge>
      </div>

      <div className="flex justify-center">
        <div className="flex">
          {colors.map((color, index) => (
            <div
              key={index}
              className={`h-20 w-20 rounded-xl shadow-lg transition-all duration-300 \${color}`}
              style={{
                marginLeft: index === 0 ? 0 : `-\${offset}px`,
                zIndex: colors.length - index,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function DepthIndicatorDemo() {
  const depths = [
    { level: 1, label: "Flat", shadow: "shadow-none" },
    { level: 2, label: "Raised", shadow: "shadow-sm" },
    { level: 3, label: "Elevated", shadow: "shadow-md" },
    { level: 4, label: "Floating", shadow: "shadow-lg" },
    { level: 5, label: "Prominent", shadow: "shadow-xl" },
  ];

  return (
    <div className="flex justify-center py-8">
      <div className="flex items-end gap-6">
        {depths.map((depth) => (
          <div key={depth.level} className="flex flex-col items-center gap-3">
            <div
              className={`h-16 w-16 rounded-xl bg-card border transition-all \${depth.shadow}`}
            />
            <div className="text-center">
              <p className="text-xs font-semibold">{depth.label}</p>
              <p className="text-xs text-muted-foreground">Level {depth.level}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StackedNavigationDemo() {
  const [activeIndex, setActiveIndex] = useState(0);

  const navItems = [
    { id: 0, label: "Home", icon: Layout },
    { id: 1, label: "Explore", icon: Grid },
    { id: 2, label: "Layers", icon: Layers },
    { id: 3, label: "Stack", icon: SquareStack },
    { id: 4, label: "View", icon: Eye },
  ];

  return (
    <div className="flex justify-center py-8">
      <div className="relative w-full max-w-sm">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeIndex === item.id;
          const offset = item.id * 2;

          return (
            <div
              key={item.id}
              className={`flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-all duration-300 \${
                isActive
                  ? "bg-primary text-primary-foreground border-primary shadow-lg"
                  : "bg-card text-card-foreground border-border hover:bg-muted"
              }`}
              style={{
                marginTop: `\${item.id === 0 ? 0 : -offset}px`,
                zIndex: isActive ? 50 : navItems.length - item.id,
                transform: isActive ? "scale(1.02)" : "scale(1)",
              }}
              onClick={() => setActiveIndex(item.id)}
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
              {isActive && (
                <Badge className="ml-auto text-xs" variant="secondary">
                  Active
                </Badge>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function LayersStackPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-12 py-12">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Layers className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">Layers Stack</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Create visually rich layered interfaces with stacking, depth, and
          overlap effects for modern UI compositions.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <CodeBlock code={installCommand} language="bash" />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <CodeBlock code={usageCode} language="tsx" />
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl font-semibold">Examples</h2>

        <ComponentPreview
          name="CardStackDemo"
          title="Card Stack with Hover Fan"
          description="Stacked cards that fan out on hover for an interactive effect."
        >
          <CardStackDemo />
        </ComponentPreview>

        <ComponentPreview
          name="ZIndexVisualizerDemo"
          title="Z-Index Visualizer"
          description="Visualize how z-index affects element stacking order."
        >
          <ZIndexVisualizerDemo />
        </ComponentPreview>

        <ComponentPreview
          name="LayerCompositionDemo"
          title="Layer Composition"
          description="Compose UI layers with toggleable visibility controls."
        >
          <LayerCompositionDemo />
        </ComponentPreview>

        <ComponentPreview
          name="StackLayoutDemo"
          title="Stack Layout"
          description="Vertical stack with consistent spacing between items."
        >
          <StackLayoutDemo />
        </ComponentPreview>

        <ComponentPreview
          name="OverlapEffectDemo"
          title="Overlap Effect"
          description="Adjustable overlapping element effect with slider control."
        >
          <OverlapEffectDemo />
        </ComponentPreview>

        <ComponentPreview
          name="DepthIndicatorDemo"
          title="Depth Indicator"
          description="Visual depth levels with varying shadow intensities."
        >
          <DepthIndicatorDemo />
        </ComponentPreview>

        <ComponentPreview
          name="StackedNavigationDemo"
          title="Stacked Navigation"
          description="Navigation items with stacked appearance and active state."
        >
          <StackedNavigationDemo />
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">stacked</td>
                <td className="px-4 py-3 font-mono text-xs">boolean</td>
                <td className="px-4 py-3 font-mono text-xs">false</td>
                <td className="px-4 py-3">Enables stacked layout mode</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">depth</td>
                <td className="px-4 py-3 font-mono text-xs">number</td>
                <td className="px-4 py-3 font-mono text-xs">1</td>
                <td className="px-4 py-3">Number of depth layers</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">gap</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3 font-mono text-xs">"md"</td>
                <td className="px-4 py-3">Spacing between layers</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3 font-mono text-xs">undefined</td>
                <td className="px-4 py-3">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
