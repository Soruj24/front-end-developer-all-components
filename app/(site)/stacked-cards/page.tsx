"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Layers,
  CreditCard,
  Mail,
  Bell,
  FileText,
  Image,
  Star,
} from "lucide-react";

const installCommand = `npx component-library@latest add stacked-cards`;

const usageCode = `import { StackedCards } from "@/components/stacked-cards";

<StackedCards>
  <Card>First</Card>
  <Card>Second</Card>
  <Card>Third</Card>
</StackedCards>`;

function FanCards() {
  const [hovered, setHovered] = useState<number | null>(null);
  const cards = [
    { icon: CreditCard, label: "Payment", color: "from-blue-500 to-indigo-600" },
    { icon: Mail, label: "Messages", color: "from-emerald-500 to-teal-600" },
    { icon: Bell, label: "Alerts", color: "from-orange-500 to-red-500" },
  ];

  return (
    <div className="flex justify-center py-8">
      <div className="relative h-56 w-64">
        {cards.map((card, i) => {
          const offset = hovered === i ? 0 : i * 12;
          const rotate = hovered === i ? 0 : (i - 1) * 8;
          return (
            <div
              key={i}
              className="absolute bottom-0 left-0 right-0 h-44 rounded-xl border bg-gradient-to-br p-5 text-white shadow-lg transition-all duration-300"
              style={{
                transform: `translateY(-${offset}px) rotate(${rotate}deg)`,
                zIndex: hovered === i ? 30 : i,
                background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${card.color}`} />
              <div className="relative flex h-full flex-col justify-between">
                <card.icon className="h-7 w-7" />
                <p className="text-sm font-medium">{card.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DeckCards() {
  const [active, setActive] = useState(0);
  const cards = ["Design System", "Component Library", "Brand Guidelines", "UI Kit"];
  const colors = ["bg-violet-500", "bg-cyan-500", "bg-amber-500", "bg-rose-500"];

  return (
    <div className="flex justify-center py-8">
      <div className="relative h-48 w-56">
        {cards.map((label, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`absolute bottom-0 left-0 right-0 h-40 rounded-xl border-2 border-white/20 p-4 shadow-xl transition-all duration-500 ${colors[i]}`}
            style={{
              transform: `translateY(-${i === active ? 20 : i * 2}px) scale(${i === active ? 1 : 1 - i * 0.03})`,
              zIndex: i === active ? 10 : cards.length - i,
              opacity: i === active ? 1 : 0.7,
            }}
          >
            <p className="text-left text-sm font-bold text-white">{label}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function OverlapCards() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="flex justify-center py-8">
      <div className="flex flex-col items-center">
        <div className="flex gap-[-40px]">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`relative h-32 w-24 rounded-lg border bg-card shadow-md transition-all duration-300 ${expanded ? "" : ""}`}
              style={{
                marginLeft: i > 0 ? "-48px" : 0,
                transform: expanded
                  ? `translateX(${(i - 2) * 60}px) translateY(${Math.abs(i - 2) * -10}px)`
                  : "none",
                zIndex: 5 - i,
              }}
            >
              <div className="flex h-full items-center justify-center">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-6 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          {expanded ? "Stack" : "Fan Out"}
        </button>
      </div>
    </div>
  );
}

function PileCards() {
  const [selected, setSelected] = useState<number | null>(null);
  const items = [
    { title: "Wireframes", subtitle: "12 files", icon: Layers },
    { title: "Mockups", subtitle: "8 files", icon: Image },
    { title: "Prototypes", subtitle: "5 files", icon: Star },
  ];

  return (
    <div className="flex justify-center py-8">
      <div className="relative h-40 w-64">
        {items.map((item, i) => (
          <div
            key={i}
            onClick={() => setSelected(selected === i ? null : i)}
            className={`absolute cursor-pointer rounded-xl border bg-card p-4 shadow-md transition-all duration-300 ${
              selected === i ? "ring-2 ring-primary" : ""
            }`}
            style={{
              transform: `rotate(${(i - 1) * 3}deg) translateY(-${i * 4}px)`,
              zIndex: selected === i ? 10 : i,
            }}
          >
            <div className="flex items-center gap-3">
              <item.icon className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CardStack() {
  const [count, setCount] = useState(3);
  const colors = [
    "from-pink-400 to-rose-500",
    "from-violet-400 to-purple-500",
    "from-blue-400 to-indigo-500",
    "from-emerald-400 to-teal-500",
    "from-amber-400 to-orange-500",
  ];

  return (
    <div className="flex flex-col items-center py-8">
      <div className="relative h-48 w-56">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={`absolute inset-0 rounded-xl bg-gradient-to-br ${colors[i % colors.length]} shadow-lg transition-all duration-500`}
            style={{
              transform: `translateY(-${i * 6}px) scale(${1 - i * 0.04})`,
              zIndex: count - i,
              opacity: 1 - i * 0.1,
            }}
          />
        ))}
      </div>
      <div className="mt-6 flex gap-2">
        <button
          onClick={() => setCount(Math.max(1, count - 1))}
          className="rounded-md border bg-background px-3 py-1.5 text-sm hover:bg-accent"
        >
          Remove
        </button>
        <button
          onClick={() => setCount(Math.min(5, count + 1))}
          className="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary/90"
        >
          Add Card
        </button>
      </div>
    </div>
  );
}

function SpreadCards() {
  const [activeIndex, setActiveIndex] = useState(0);
  const items = [
    { label: "Mon", value: 65 },
    { label: "Tue", value: 82 },
    { label: "Wed", value: 47 },
    { label: "Thu", value: 93 },
    { label: "Fri", value: 71 },
  ];

  return (
    <div className="flex justify-center py-8">
      <div className="flex gap-3">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`flex h-40 w-14 flex-col items-center justify-end rounded-xl border bg-card p-2 shadow-sm transition-all duration-300 ${
              activeIndex === i ? "scale-110 shadow-lg ring-2 ring-primary" : "hover:scale-105"
            }`}
          >
            <div
              className="w-full rounded-md bg-primary transition-all duration-500"
              style={{ height: `${item.value}%` }}
            />
            <p className="mt-2 text-xs font-medium">{item.label}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function HoverFan() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const contacts = [
    { name: "Alice", initials: "A", color: "bg-blue-500" },
    { name: "Bob", initials: "B", color: "bg-emerald-500" },
    { name: "Carol", initials: "C", color: "bg-purple-500" },
    { name: "Dave", initials: "D", color: "bg-amber-500" },
    { name: "Eve", initials: "E", color: "bg-rose-500" },
  ];

  return (
    <div className="flex justify-center py-8">
      <div className="relative h-48 w-72">
        {contacts.map((c, i) => {
          const isActive = hoveredIndex !== null && i <= hoveredIndex;
          return (
            <div
              key={i}
              className="absolute bottom-0 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full border-2 border-background shadow-lg transition-all duration-300"
              style={{
                transform: isActive
                  ? `translateX(${(i - (hoveredIndex ?? 0)) * 32}px) translateY(-${isActive ? 40 : 0}px)`
                  : "none",
                backgroundColor: `var(--tw-bg-opacity, 1) ${c.color}`,
                zIndex: isActive ? 20 : contacts.length - i,
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span className="text-xs font-bold text-white">{c.initials}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function StackedCardsPage() {
  const [activeDemo, setActiveDemo] = useState(0);

  const demos = [
    { name: "Fan Cards", component: FanCards },
    { name: "Deck Cards", component: DeckCards },
    { name: "Overlap Cards", component: OverlapCards },
    { name: "Pile Cards", component: PileCards },
    { name: "Card Stack", component: CardStack },
    { name: "Spread Cards", component: SpreadCards },
    { name: "Hover Fan", component: HoverFan },
  ];

  const ActiveComponent = demos[activeDemo].component;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Stacked Cards
          </h1>
          <Badge variant="primary">Layout</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A collection of stacked card layouts with fan, deck, overlap, and interactive stacking effects.
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
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>
          <p className="mt-1 text-sm text-muted-foreground">Interactive stacked card layouts.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {demos.map((demo, i) => (
            <button
              key={i}
              onClick={() => setActiveDemo(i)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                activeDemo === i
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {demo.name}
            </button>
          ))}
        </div>
        <ComponentPreview id={`stacked-cards-${demos[activeDemo].name.toLowerCase().replace(/ /g, "-")}`}>
          <div className="w-full">
            <ActiveComponent />
          </div>
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
                <td className="px-4 py-3 font-mono text-xs">orientation</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;vertical&quot; | &quot;horizontal&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;vertical&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">offset</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">8</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">rotation</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">5</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">interactive</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">maxVisible</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">5</td>
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
