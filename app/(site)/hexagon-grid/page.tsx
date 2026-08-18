"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Hexagon,
  Grid3x3,
  Star,
  Heart,
  Zap,
  Award,
  Target,
} from "lucide-react";

const installCommand = `npx component-library@latest add hexagon-grid`;
const usageCode = `import { HexagonGrid } from "@/components/hexagon-grid";

<HexagonGrid columns={5} gap={4} size={64}>
  {items.map((item) => (
    <HexagonCard key={item.id} {...item} />
  ))}
</HexagonGrid>`;

const hexClip = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

function HexGrid() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <div className="flex gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className={`w-16 h-[72px] flex items-center justify-center text-xs font-medium transition-all duration-200 ${hovered === i ? "bg-primary text-primary-foreground scale-110 z-10" : "bg-primary/20 text-primary hover:bg-primary/30"}`}
            style={{ clipPath: hexClip }}
          >
            {i + 1}
          </div>
        ))}
      </div>
      <div className="flex gap-1 -mt-2">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(i + 5)}
            onMouseLeave={() => setHovered(null)}
            className={`w-16 h-[72px] flex items-center justify-center text-xs font-medium transition-all duration-200 ${hovered === i + 5 ? "bg-primary text-primary-foreground scale-110 z-10" : "bg-primary/30 text-primary hover:bg-primary/40"}`}
            style={{ clipPath: hexClip }}
          >
            {i + 6}
          </div>
        ))}
      </div>
      <div className="flex gap-1 -mt-2">
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(i + 9)}
            onMouseLeave={() => setHovered(null)}
            className={`w-16 h-[72px] flex items-center justify-center text-xs font-medium transition-all duration-200 ${hovered === i + 9 ? "bg-primary text-primary-foreground scale-110 z-10" : "bg-primary/20 text-primary hover:bg-primary/30"}`}
            style={{ clipPath: hexClip }}
          >
            {i + 10}
          </div>
        ))}
      </div>
    </div>
  );
}

function HexCard() {
  const items = [
    { icon: Star, label: "Featured", color: "text-amber-500" },
    { icon: Heart, label: "Popular", color: "text-red-500" },
    { icon: Zap, label: "Fast", color: "text-yellow-500" },
  ];
  return (
    <div className="flex gap-4 justify-center w-full">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col items-center gap-2 group cursor-pointer">
          <div className="w-20 h-[90px] bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-200" style={{ clipPath: hexClip }}>
            <item.icon className={`h-6 w-6 ${item.color}`} />
          </div>
          <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function HexStats() {
  const stats = [
    { label: "Users", value: "12.4K", color: "from-blue-500/20 to-blue-600/10" },
    { label: "Revenue", value: "$89K", color: "from-green-500/20 to-green-600/10" },
    { label: "Growth", value: "+24%", color: "from-purple-500/20 to-purple-600/10" },
    { label: "Orders", value: "3.2K", color: "from-orange-500/20 to-orange-600/10" },
  ];
  return (
    <div className="flex gap-3 justify-center w-full">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col items-center">
          <div className={`w-24 h-[108px] bg-gradient-to-br ${stat.color} border border-border/50 flex flex-col items-center justify-center gap-1`} style={{ clipPath: hexClip }}>
            <span className="text-lg font-bold text-foreground">{stat.value}</span>
            <span className="text-[10px] text-muted-foreground">{stat.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function HexBadge() {
  const [selected, setSelected] = useState<number | null>(null);
  const badges = [
    { icon: Award, label: "Gold", ring: "ring-amber-400" },
    { icon: Star, label: "Silver", ring: "ring-gray-400" },
    { icon: Target, label: "Bronze", ring: "ring-orange-400" },
    { icon: Zap, label: "Platinum", ring: "ring-cyan-400" },
  ];
  return (
    <div className="flex gap-4 justify-center w-full">
      {badges.map((b, i) => (
        <button
          key={b.label}
          onClick={() => setSelected(selected === i ? null : i)}
          className={`flex flex-col items-center gap-2 transition-transform ${selected === i ? "scale-110" : ""}`}
        >
          <div className={`w-16 h-[72px] bg-primary/10 border-2 flex items-center justify-center transition-all ${selected === i ? `border-primary ring-2 ${b.ring}` : "border-primary/20 hover:border-primary/40"}`} style={{ clipPath: hexClip }}>
            <b.icon className="h-5 w-5 text-primary" />
          </div>
          <span className={`text-xs font-medium ${selected === i ? "text-primary" : "text-muted-foreground"}`}>{b.label}</span>
        </button>
      ))}
    </div>
  );
}

function HexMenu() {
  const [active, setActive] = useState(0);
  const menuItems = [
    { icon: Grid3x3, label: "Dashboard" },
    { icon: Star, label: "Favorites" },
    { icon: Heart, label: "Saved" },
    { icon: Zap, label: "Quick" },
    { icon: Target, label: "Goals" },
  ];
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="flex gap-1">
        {menuItems.map((item, i) => (
          <button
            key={item.label}
            onClick={() => setActive(i)}
            className={`flex flex-col items-center gap-1 p-1 rounded-lg transition-colors ${active === i ? "bg-primary/10" : "hover:bg-muted"}`}
          >
            <div className={`w-14 h-[62px] flex items-center justify-center transition-colors ${active === i ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"}`} style={{ clipPath: hexClip }}>
              <item.icon className="h-4 w-4" />
            </div>
            <span className={`text-[10px] font-medium ${active === i ? "text-primary" : "text-muted-foreground"}`}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function HexGallery() {
  const colors = ["from-rose-400 to-rose-600", "from-blue-400 to-blue-600", "from-green-400 to-green-600", "from-amber-400 to-amber-600", "from-purple-400 to-purple-600", "from-cyan-400 to-cyan-600", "from-pink-400 to-pink-600", "from-teal-400 to-teal-600", "from-orange-400 to-orange-600"];
  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <div className="flex gap-1">
        {colors.slice(0, 5).map((c, i) => (
          <div key={i} className={`w-16 h-[72px] bg-gradient-to-br ${c} opacity-80 hover:opacity-100 transition-opacity`} style={{ clipPath: hexClip }} />
        ))}
      </div>
      <div className="flex gap-1 -mt-2">
        {colors.slice(5, 9).map((c, i) => (
          <div key={i} className={`w-16 h-[72px] bg-gradient-to-br ${c} opacity-80 hover:opacity-100 transition-opacity`} style={{ clipPath: hexClip }} />
        ))}
      </div>
    </div>
  );
}

function HexProfile() {
  return (
    <div className="flex items-center gap-6 w-full max-w-md">
      <div className="relative">
        <div className="w-28 h-[124px] bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-primary/30 flex items-center justify-center" style={{ clipPath: hexClip }}>
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xl font-bold">JD</div>
        </div>
        <div className="absolute -bottom-1 right-2 w-5 h-5 rounded-full bg-green-500 border-2 border-background" />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-foreground">Jane Doe</h3>
        <p className="text-sm text-muted-foreground">Senior Designer</p>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-xs text-muted-foreground"><span className="font-semibold text-foreground">142</span> Projects</span>
          <span className="text-xs text-muted-foreground"><span className="font-semibold text-foreground">2.1K</span> Followers</span>
        </div>
      </div>
    </div>
  );
}

export default function HexagonGridPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Hexagon Grid
          </h1>
          <Badge variant="primary">Layout</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Honeycomb hexagonal grid layouts for dashboards, galleries, menus, and profile displays with interactive hover effects.
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

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Hex Grid</h3>
          <p className="text-sm text-muted-foreground">
            Interactive honeycomb grid with hover scale effect on individual cells.
          </p>
          <ComponentPreview id="hexagon-grid-basic">
            <HexGrid />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Hex Card</h3>
          <p className="text-sm text-muted-foreground">
            Hexagonal cards with gradient fills and icon labels for feature highlights.
          </p>
          <ComponentPreview id="hexagon-grid-card">
            <HexCard />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Hex Stats</h3>
          <p className="text-sm text-muted-foreground">
            Dashboard statistics displayed in large hexagonal tiles with colored gradients.
          </p>
          <ComponentPreview id="hexagon-grid-stats">
            <HexStats />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Hex Badge</h3>
          <p className="text-sm text-muted-foreground">
            Selectable hexagonal badges with ring highlight and selection state.
          </p>
          <ComponentPreview id="hexagon-grid-badge">
            <HexBadge />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Hex Menu</h3>
          <p className="text-sm text-muted-foreground">
            Bottom navigation menu with hexagonal active state indicators.
          </p>
          <ComponentPreview id="hexagon-grid-menu">
            <HexMenu />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Hex Gallery</h3>
          <p className="text-sm text-muted-foreground">
            Image gallery layout using hexagonal tiles with gradient placeholders.
          </p>
          <ComponentPreview id="hexagon-grid-gallery">
            <HexGallery />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Hex Profile</h3>
          <p className="text-sm text-muted-foreground">
            User profile card with hexagonal avatar frame and online status indicator.
          </p>
          <ComponentPreview id="hexagon-grid-profile">
            <HexProfile />
          </ComponentPreview>
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
                <td className="px-4 py-3 font-mono text-xs">columns</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">5</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">gap</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">4</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">64</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">offset</td>
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
