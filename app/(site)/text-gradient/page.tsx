"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Type,
  Palette,
  Sparkles,
  Wand2,
  Star,
  Zap,
  PenTool,
} from "lucide-react";

const installCommand = `npx component-library@latest add text-gradient`;

const usageCode = `import { GradientText } from "@/components/text-gradient";

<GradientText from="blue-600" to="purple-600">
  Hello World
</GradientText>`;

function GradientText() {
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Blue to Purple
      </h2>
      <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
        Emerald to Cyan
      </h2>
      <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
        Orange to Pink
      </h2>
    </div>
  );
}

function RainbowText() {
  return (
    <div className="flex justify-center py-8">
      <h2
        className="text-5xl font-bold bg-clip-text text-transparent"
        style={{
          backgroundImage: "linear-gradient(90deg, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #8b5cf6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Rainbow Text
      </h2>
    </div>
  );
}

function AnimatedGradient() {
  return (
    <div className="flex justify-center py-8">
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      <h2
        className="text-5xl font-bold bg-clip-text text-transparent animate-[gradientShift_3s_ease_infinite]"
        style={{
          backgroundImage: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
          backgroundSize: "400% 400%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Animated Gradient
      </h2>
    </div>
  );
}

function NeonGlow() {
  return (
    <div className="flex justify-center bg-gray-950 py-8 rounded-xl">
      <h2 className="text-5xl font-bold text-cyan-400" style={{ textShadow: "0 0 10px #22d3ee, 0 0 20px #22d3ee, 0 0 40px #22d3ee" }}>
        Neon Glow
      </h2>
    </div>
  );
}

function ShimmerText() {
  return (
    <div className="flex justify-center py-8">
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
      <h2
        className="text-5xl font-bold bg-clip-text text-transparent animate-[shimmer_2s_linear_infinite]"
        style={{
          backgroundImage: "linear-gradient(90deg, #1f2937 0%, #6b7280 25%, #1f2937 50%, #6b7280 75%, #1f2937 100%)",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Shimmer Effect
      </h2>
    </div>
  );
}

function BrandGradient() {
  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <h2
        className="text-4xl font-bold bg-clip-text text-transparent"
        style={{
          backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Brand Primary
      </h2>
      <h2
        className="text-4xl font-bold bg-clip-text text-transparent"
        style={{
          backgroundImage: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Brand Secondary
      </h2>
      <h2
        className="text-4xl font-bold bg-clip-text text-transparent"
        style={{
          backgroundImage: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Brand Accent
      </h2>
    </div>
  );
}

function CustomGradient() {
  const [angle, setAngle] = useState(90);
  const [color1, setColor1] = useState("#3b82f6");
  const [color2, setColor2] = useState("#8b5cf6");

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <h2
        className="text-5xl font-bold bg-clip-text text-transparent"
        style={{
          backgroundImage: `linear-gradient(${angle}deg, ${color1}, ${color2})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Custom Text
      </h2>
      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm">
          <span>Color 1:</span>
          <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="h-8 w-8 cursor-pointer" />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <span>Color 2:</span>
          <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="h-8 w-8 cursor-pointer" />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <span>Angle: {angle}deg</span>
          <input
            type="range"
            min={0}
            max={360}
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="w-24"
          />
        </label>
      </div>
    </div>
  );
}

export default function TextGradientPage() {
  const [activeDemo, setActiveDemo] = useState(0);

  const demos = [
    { name: "Gradient Text", component: GradientText },
    { name: "Rainbow Text", component: RainbowText },
    { name: "Animated Gradient", component: AnimatedGradient },
    { name: "Neon Glow", component: NeonGlow },
    { name: "Shimmer Text", component: ShimmerText },
    { name: "Brand Gradient", component: BrandGradient },
    { name: "Custom Gradient", component: CustomGradient },
  ];

  const ActiveComponent = demos[activeDemo].component;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Text Gradient
          </h1>
          <Badge variant="primary">Typography</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Text with gradient fill effects using CSS background-clip, including animated, neon, and shimmer styles.
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
          <p className="mt-1 text-sm text-muted-foreground">Gradient text styles and effects.</p>
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
        <ComponentPreview id={`text-gradient-${demos[activeDemo].name.toLowerCase().replace(/ /g, "-")}`}>
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
                <td className="px-4 py-3 font-mono text-xs">from</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">to</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">angle</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">90</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">animated</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
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
