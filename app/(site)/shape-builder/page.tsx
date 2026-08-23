"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Square, Circle, Triangle, Hexagon, Star, Pentagon, Diamond } from "lucide-react";

const installCommand = "npx ui-add shape-builder";
const usageCode = `import { ShapeBuilder } from "@/components/ui/shape-builder";

<ShapeBuilder shape="circle" size="md" />
`;

const shapes = [
  { name: "Square", icon: Square },
  { name: "Circle", icon: Circle },
  { name: "Triangle", icon: Triangle },
  { name: "Hexagon", icon: Hexagon },
  { name: "Star", icon: Star },
  { name: "Pentagon", icon: Pentagon },
  { name: "Diamond", icon: Diamond },
];

function ShapeGrid() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-4 gap-3">
      {shapes.map((shape) => {
        const Icon = shape.icon;
        return (
          <button
            key={shape.name}
            onClick={() => setSelected(shape.name)}
            className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-colors ${
              selected === shape.name
                ? "border-primary bg-primary/10"
                : "border-input hover:bg-accent"
            }`}
          >
            <Icon className="h-6 w-6" />
            <span className="text-xs">{shape.name}</span>
          </button>
        );
      })}
    </div>
  );
}

function CustomShape() {
  const [color, setColor] = useState("#3b82f6");
  const [size, setSize] = useState(64);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="rounded-lg bg-primary flex items-center justify-center"
        style={{ width: size, height: size, backgroundColor: color }}
      >
        <Square className="h-8 w-8 text-white" />
      </div>
      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm">Color:</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-8 w-12 rounded cursor-pointer"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm">Size:</label>
          <input
            type="range"
            min="32"
            max="128"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
}

function ShapeCombination() {
  const [rotation, setRotation] = useState(0);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative w-32 h-32"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <Circle className="h-16 w-16 text-blue-500" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Square className="h-12 w-12 text-green-500" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Triangle className="h-8 w-8 text-red-500" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <label className="text-sm">Rotation:</label>
        <input
          type="range"
          min="0"
          max="360"
          value={rotation}
          onChange={(e) => setRotation(Number(e.target.value))}
          className="w-48"
        />
        <span className="text-sm text-muted-foreground">{rotation}°</span>
      </div>
    </div>
  );
}

function ShapePicker() {
  const [selected, setSelected] = useState("Circle");

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        {shapes.slice(0, 5).map((shape) => {
          const Icon = shape.icon;
          return (
            <button
              key={shape.name}
              onClick={() => setSelected(shape.name)}
              className={`h-10 w-10 rounded-lg flex items-center justify-center transition-colors ${
                selected === shape.name
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-accent"
              }`}
            >
              <Icon className="h-5 w-5" />
            </button>
          );
        })}
      </div>
      <div className="p-8 rounded-xl border bg-card">
        <div className="flex items-center justify-center">
          {shapes.find((s) => s.name === selected) && (
            <div className="flex flex-col items-center gap-2">
              {(() => {
                const shape = shapes.find((s) => s.name === selected)!;
                const Icon = shape.icon;
                return (
                  <>
                    <Icon className="h-12 w-12 text-primary" />
                    <span className="text-sm font-medium">{shape.name}</span>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function IconShape() {
  const [shape, setShape] = useState("circle");

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2 mb-4">
        {["circle", "square", "rounded"].map((s) => (
          <button
            key={s}
            onClick={() => setShape(s)}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              shape === s ? "bg-primary text-primary-foreground" : "bg-muted"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[Star, Diamond, Hexagon].map((Icon, i) => (
          <div
            key={i}
            className={`h-20 w-20 flex items-center justify-center bg-primary/10 ${
              shape === "circle"
                ? "rounded-full"
                : shape === "rounded"
                ? "rounded-lg"
                : ""
            }`}
          >
            <Icon className="h-8 w-8 text-primary" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ShapePattern() {
  const [pattern, setPattern] = useState("grid");

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2 mb-4">
        {["grid", "circle", "diamond"].map((p) => (
          <button
            key={p}
            onClick={() => setPattern(p)}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              pattern === p ? "bg-primary text-primary-foreground" : "bg-muted"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
      <div className={`p-6 border rounded-xl ${
        pattern === "grid" ? "grid grid-cols-3 gap-4" : ""
      }`}>
        {pattern === "grid" &&
          Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="h-10 w-10 bg-primary/20 rounded flex items-center justify-center">
              <Pentagon className="h-5 w-5 text-primary" />
            </div>
          ))}
        {pattern === "circle" && (
          <div className="flex items-center justify-center h-32">
            <div className="relative">
              <Circle className="h-20 w-20 text-primary/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Star className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>
        )}
        {pattern === "diamond" && (
          <div className="flex items-center justify-center h-32">
            <div className="grid grid-cols-3 gap-2">
              <div />
              <Hexagon className="h-6 w-6 text-primary" />
              <div />
              <Triangle className="h-6 w-6 text-primary" />
              <Square className="h-6 w-6 text-primary" />
              <Triangle className="h-6 w-6 text-primary rotate-180" />
              <div />
              <Pentagon className="h-6 w-6 text-primary" />
              <div />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ShapeAnimation() {
  const [animate, setAnimate] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-32 w-full flex items-center justify-center">
        <div className={`flex items-center gap-4 ${
          animate ? "animate-bounce" : ""
        }`}>
          <Star className="h-8 w-8 text-yellow-500" />
          <Hexagon className="h-8 w-8 text-purple-500" />
          <Pentagon className="h-8 w-8 text-green-500" />
        </div>
      </div>
      <button
        onClick={() => setAnimate(!animate)}
        className={`px-4 py-2 rounded-lg transition-colors ${
          animate
            ? "bg-primary text-primary-foreground"
            : "bg-muted hover:bg-accent"
        }`}
      >
        {animate ? "Stop Animation" : "Start Animation"}
      </button>
    </div>
  );
}

export default function ShapeBuilderPage() {
  return (
    <div className="container max-w-4xl py-12 space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-4xl font-bold">Shape Builder</h1>
          <Badge variant="secondary">UI Component</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Create and customize geometric shapes with interactive controls.
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
        
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Shape Grid</h3>
            <ComponentPreview>
              <ShapeGrid />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Custom Shape</h3>
            <ComponentPreview>
              <CustomShape />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Shape Combination</h3>
            <ComponentPreview>
              <ShapeCombination />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Shape Picker</h3>
            <ComponentPreview>
              <ShapePicker />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Icon Shape</h3>
            <ComponentPreview>
              <IconShape />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Shape Pattern</h3>
            <ComponentPreview>
              <ShapePattern />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Shape Animation</h3>
            <ComponentPreview>
              <ShapeAnimation />
            </ComponentPreview>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 font-medium">Prop</th>
                <th className="text-left py-2 font-medium">Type</th>
                <th className="text-left py-2 font-medium">Default</th>
                <th className="text-left py-2 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">shape</td>
                <td className="py-2">"square" | "circle" | "triangle" | "hexagon" | "star"</td>
                <td className="py-2">"square"</td>
                <td className="py-2">The shape type to display</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">size</td>
                <td className="py-2">"sm" | "md" | "lg"</td>
                <td className="py-2">"md"</td>
                <td className="py-2">Size of the shape</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">color</td>
                <td className="py-2">string</td>
                <td className="py-2">"currentColor"</td>
                <td className="py-2">Fill color for the shape</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">animate</td>
                <td className="py-2">boolean</td>
                <td className="py-2">false</td>
                <td className="py-2">Enable shape animation</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
