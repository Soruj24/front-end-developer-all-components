"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Magnet,
  Zap,
  ArrowUp,
  ArrowDown,
  Target,
  Activity,
  Sparkles,
} from "lucide-react";

const installCommand = "npx shadcn@latest add magnet-field";
const usageCode = `import { MagnetField } from "@/components/magnet-field";

export function MagneticExample() {
  return (
    <MagnetField strength={0.5}>
      <button>Pull me!</button>
    </MagnetField>
  );
}`;

function MagneticButton() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    setPosition({ x, y });
  };

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Magnet className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Magnetic Button</h3>
      </div>
      <div
        className="flex items-center justify-center h-40 bg-muted rounded-lg"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { setPosition({ x: 0, y: 0 }); setIsHovered(false); }}
        onMouseEnter={() => setIsHovered(true)}
      >
        <button
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-transform duration-200"
          style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        >
          <Zap className="inline h-4 w-4 mr-2" />
          Hover Near Me
        </button>
      </div>
      <p className="text-xs text-muted-foreground mt-2 text-center">
        Move your cursor near the button to see magnetic pull effect
      </p>
    </div>
  );
}

function DragDropZone() {
  const [isDragging, setIsDragging] = useState(false);
  const [items, setItems] = useState(["Item A", "Item B", "Item C"]);

  const handleDragStart = (index: number) => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Target className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Drag Drop Zone</h3>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div
            key={i}
            draggable
            onDragStart={() => handleDragStart(i)}
            onDragEnd={handleDragEnd}
            className={`flex items-center gap-3 p-3 border rounded-lg cursor-grab transition-all ${
              isDragging ? "opacity-50 scale-95" : "hover:border-primary"
            }`}
          >
            <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="5" r="1" /><circle cx="15" cy="5" r="1" />
              <circle cx="9" cy="12" r="1" /><circle cx="15" cy="12" r="1" />
              <circle cx="9" cy="19" r="1" /><circle cx="15" cy="19" r="1" />
            </svg>
            <span className="flex-1 text-sm">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AttractParticles() {
  const [active, setActive] = useState(false);
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 200 - 100,
    y: Math.random() * 200 - 100,
  }));

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Attract Particles</h3>
      </div>
      <div
        className="relative h-48 bg-muted rounded-lg overflow-hidden cursor-pointer"
        onClick={() => setActive(!active)}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold z-10">
            N
          </div>
        </div>
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute w-3 h-3 bg-primary/40 rounded-full transition-all duration-700"
            style={{
              left: `calc(50% + ${active ? 0 : p.x}px)`,
              top: `calc(50% + ${active ? 0 : p.y}px)`,
              transform: active ? "scale(0.5)" : "scale(1)",
              opacity: active ? 0.3 : 0.7,
            }}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-2 text-center">
        Click to {active ? "release" : "attract"} particles
      </p>
    </div>
  );
}

function MagneticScroll() {
  const [scrollY, setScrollY] = useState(0);

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <ArrowUp className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Magnetic Scroll</h3>
      </div>
      <div
        className="h-40 overflow-y-auto bg-muted rounded-lg relative"
        onScroll={(e) => setScrollY(e.currentTarget.scrollTop)}
      >
        <div className="p-4 space-y-8">
          {[1, 2, 3, 4, 5].map((n) => (
            <div
              key={n}
              className="p-4 bg-background border rounded-lg transition-all duration-300"
              style={{
                transform: `translateX(${Math.sin(scrollY * 0.01 + n) * 10}px)`,
              }}
            >
              <p className="text-sm font-medium">Section {n}</p>
              <p className="text-xs text-muted-foreground">Scroll to see magnetic effect</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ToggleSwitch() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Toggle Switch</h3>
      </div>
      <div className="flex items-center justify-center h-32 bg-muted rounded-lg">
        <button
          onClick={() => setEnabled(!enabled)}
          className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
            enabled ? "bg-primary" : "bg-muted-foreground/30"
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
              enabled ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
        <span className="ml-3 text-sm font-medium">
          {enabled ? "On" : "Off"}
        </span>
      </div>
    </div>
  );
}

function FormField() {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Form Field</h3>
      </div>
      <div className="space-y-4">
        <div className={`relative transition-all duration-200 ${focused ? "scale-[1.02]" : ""}`}>
          <label className="text-sm text-muted-foreground block mb-1">Email</label>
          <input
            type="email"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="you@example.com"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {value && (
            <span className="absolute right-3 top-8 text-xs text-green-600">Valid</span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Field scales slightly when focused for a magnetic pull effect
        </p>
      </div>
    </div>
  );
}

function PullEffect() {
  const [pulling, setPulling] = useState(false);
  const [stretch, setStretch] = useState(0);

  const handleMouseDown = () => {
    setPulling(true);
    let count = 0;
    const interval = setInterval(() => {
      count += 2;
      if (count >= 20) {
        clearInterval(interval);
        return;
      }
      setStretch(count);
    }, 30);
  };

  const handleMouseUp = () => {
    setPulling(false);
    setStretch(0);
  };

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <ArrowDown className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Pull Effect</h3>
      </div>
      <div className="flex items-center justify-center h-40 bg-muted rounded-lg">
        <div className="relative">
          <div
            className="w-32 h-2 bg-primary/30 rounded-full transition-all duration-100"
            style={{ transform: `scaleX(${1 + stretch * 0.02})` }}
          />
          <button
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg cursor-grab active:cursor-grabbing transition-transform"
            style={{ transform: `translate(-50%, ${stretch * 0.5}px)` }}
          >
            <Magnet className="h-5 w-5" />
          </button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-2 text-center">
        Click and hold to pull the magnet down
      </p>
    </div>
  );
}

export default function MagnetFieldPage() {
  return (
    <div className="container max-w-4xl py-12">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Magnet className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Magnet Field</h1>
          <Badge>Components</Badge>
        </div>
        <p className="text-muted-foreground">
          Interactive magnetic field effects including draggable elements, attraction
          particles, pull effects, and magnetic scroll animations.
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Installation</h2>
        <CodeBlock code={installCommand} language="bash" />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Usage</h2>
        <CodeBlock code={usageCode} language="tsx" />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Examples</h2>
        <div className="grid gap-6">
          <ComponentPreview name="MagneticButton">
            <MagneticButton />
          </ComponentPreview>
          <ComponentPreview name="DragDropZone">
            <DragDropZone />
          </ComponentPreview>
          <ComponentPreview name="AttractParticles">
            <AttractParticles />
          </ComponentPreview>
          <ComponentPreview name="MagneticScroll">
            <MagneticScroll />
          </ComponentPreview>
          <ComponentPreview name="ToggleSwitch">
            <ToggleSwitch />
          </ComponentPreview>
          <ComponentPreview name="FormField">
            <FormField />
          </ComponentPreview>
          <ComponentPreview name="PullEffect">
            <PullEffect />
          </ComponentPreview>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">API Reference</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left font-medium">Prop</th>
                <th className="p-2 text-left font-medium">Type</th>
                <th className="p-2 text-left font-medium">Default</th>
                <th className="p-2 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2 font-mono text-xs">strength</td>
                <td className="p-2 font-mono text-xs">number</td>
                <td className="p-2 font-mono text-xs">0.5</td>
                <td className="p-2">Magnetic pull strength (0-1)</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-mono text-xs">enabled</td>
                <td className="p-2 font-mono text-xs">boolean</td>
                <td className="p-2 font-mono text-xs">true</td>
                <td className="p-2">Enable or disable the effect</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-mono text-xs">range</td>
                <td className="p-2 font-mono text-xs">number</td>
                <td className="p-2 font-mono text-xs">100</td>
                <td className="p-2">Pixel range for magnetic attraction</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-mono text-xs">duration</td>
                <td className="p-2 font-mono text-xs">number</td>
                <td className="p-2 font-mono text-xs">200</td>
                <td className="p-2">Animation duration in ms</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 font-mono text-xs">axis</td>
                <td className="p-2 font-mono text-xs">"x" | "y" | "both"</td>
                <td className="p-2 font-mono text-xs">"both"</td>
                <td className="p-2">Allowed axes of movement</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
