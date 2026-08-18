"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Box,
  Sun,
  Moon,
  Star,
  Heart,
  Zap,
  Settings,
  User,
} from "lucide-react";

const installCommand = `npx shadcn@latest add inner-shadow`;

const usageCode = `import { InnerShadow } from "@/components/inner-shadow";

<InnerShadow intensity="medium">
  <div>Content with inner shadow</div>
</InnerShadow>`;

function ButtonVariantsDemo() {
  const intensities = ["light", "medium", "strong"] as const;

  return (
    <div className="flex flex-wrap gap-4">
      {intensities.map((i) => (
        <button
          key={i}
          className={`rounded-lg px-6 py-3 font-medium text-white transition-all`}
          style={{
            background: "#3b82f6",
            boxShadow: `inset 0 ${i === "light" ? "2" : i === "medium" ? "4" : "6"}px ${i === "light" ? "4" : i === "medium" ? "8" : "12"}px rgba(0,0,0,0.${i === "light" ? "15" : i === "medium" ? "3" : "5"})`,
          }}
        >
          {i.charAt(0).toUpperCase() + i.slice(1)}
        </button>
      ))}
    </div>
  );
}

function CardDepthDemo() {
  return (
    <div
      className="rounded-xl p-6"
      style={{
        background: "linear-gradient(145deg, #1e293b, #0f172a)",
        boxShadow:
          "inset 2px 2px 6px rgba(0,0,0,0.4), inset -1px -1px 4px rgba(255,255,255,0.05)",
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <Box className="h-5 w-5 text-blue-400" />
        <h3 className="text-lg font-semibold text-white">Depth Card</h3>
      </div>
      <p className="text-sm text-slate-400">
        This card uses an inner shadow to create a recessed depth effect,
        simulating a carved surface.
      </p>
    </div>
  );
}

function InputFieldsDemo() {
  const [value, setValue] = useState("");

  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Default inset input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{
          boxShadow:
            "inset 2px 2px 5px rgba(0,0,0,0.4), inset -1px -1px 3px rgba(255,255,255,0.04)",
        }}
      />
      <input
        type="text"
        placeholder="Deep inset input"
        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
        style={{
          boxShadow:
            "inset 4px 4px 10px rgba(0,0,0,0.5), inset -2px -2px 6px rgba(255,255,255,0.05)",
        }}
      />
    </div>
  );
}

function BadgeStylesDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      {[
        { label: "Light", bg: "#1e3a5f", color: "#93c5fd" },
        { label: "Medium", bg: "#1e3a5f", color: "#60a5fa" },
        { label: "Strong", bg: "#1e3a5f", color: "#3b82f6" },
      ].map((b) => (
        <Badge
          key={b.label}
          variant="secondary"
          className="px-3 py-1"
          style={{
            background: b.bg,
            color: b.color,
            boxShadow:
              "inset 2px 2px 4px rgba(0,0,0,0.3), inset -1px -1px 2px rgba(255,255,255,0.05)",
          }}
        >
          {b.label}
        </Badge>
      ))}
    </div>
  );
}

function ProgressBarDemo() {
  const [progress, setProgress] = useState(65);

  return (
    <div className="space-y-4 w-full">
      <div
        className="h-4 w-full overflow-hidden rounded-full bg-slate-800"
        style={{
          boxShadow:
            "inset 2px 2px 5px rgba(0,0,0,0.5), inset -1px -1px 3px rgba(255,255,255,0.04)",
        }}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={progress}
        onChange={(e) => setProgress(Number(e.target.value))}
        className="w-full accent-blue-500"
      />
    </div>
  );
}

function AvatarRingDemo() {
  return (
    <div className="flex gap-6 items-center">
      <div
        className="relative h-16 w-16 rounded-full flex items-center justify-center bg-slate-800"
        style={{
          boxShadow:
            "inset 3px 3px 8px rgba(0,0,0,0.5), inset -2px -2px 5px rgba(255,255,255,0.06)",
        }}
      >
        <User className="h-8 w-8 text-slate-400" />
      </div>
      <div
        className="relative h-16 w-16 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-900 to-slate-800"
        style={{
          boxShadow:
            "inset 4px 4px 10px rgba(0,0,0,0.6), inset -2px -2px 6px rgba(255,255,255,0.08)",
        }}
      >
        <Star className="h-8 w-8 text-purple-400" />
      </div>
      <div
        className="relative h-16 w-16 rounded-full flex items-center justify-center bg-gradient-to-br from-amber-900 to-slate-800"
        style={{
          boxShadow:
            "inset 5px 5px 12px rgba(0,0,0,0.7), inset -3px -3px 8px rgba(255,255,255,0.1)",
        }}
      >
        <Heart className="h-8 w-8 text-amber-400" />
      </div>
    </div>
  );
}

function StatCardDemo() {
  const stats = [
    { icon: Sun, label: "Revenue", value: "$48.2K", change: "+12.5%" },
    { icon: Zap, label: "Performance", value: "98.2%", change: "+3.1%" },
    { icon: Settings, label: "Uptime", value: "99.9%", change: "+0.4%" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-xl p-5 bg-slate-900"
          style={{
            boxShadow:
              "inset 2px 2px 6px rgba(0,0,0,0.4), inset -1px -1px 4px rgba(255,255,255,0.05)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <s.icon className="h-5 w-5 text-slate-400" />
            <span className="text-xs font-medium text-emerald-400">
              {s.change}
            </span>
          </div>
          <p className="text-2xl font-bold text-white">{s.value}</p>
          <p className="text-sm text-slate-500 mt-1">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

export default function InnerShadowPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-12 py-12 px-4">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Inner Shadow
        </h1>
        <p className="text-lg text-slate-400">
          Inset box-shadow utilities for creating recessed depth effects on
          surfaces, inputs, buttons, and cards.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Installation</h2>
        <CodeBlock code={installCommand} language="bash" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">Usage</h2>
        <CodeBlock code={usageCode} language="tsx" />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">Examples</h2>

        <ComponentPreview name="ButtonVariantsDemo" title="Button Variants">
          <ButtonVariantsDemo />
        </ComponentPreview>

        <ComponentPreview name="CardDepthDemo" title="Card Depth">
          <CardDepthDemo />
        </ComponentPreview>

        <ComponentPreview name="InputFieldsDemo" title="Input Fields">
          <InputFieldsDemo />
        </ComponentPreview>

        <ComponentPreview name="BadgeStylesDemo" title="Badge Styles">
          <BadgeStylesDemo />
        </ComponentPreview>

        <ComponentPreview name="ProgressBarDemo" title="Progress Bar">
          <ProgressBarDemo />
        </ComponentPreview>

        <ComponentPreview name="AvatarRingDemo" title="Avatar Ring">
          <AvatarRingDemo />
        </ComponentPreview>

        <ComponentPreview name="StatCardDemo" title="Stat Card">
          <StatCardDemo />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-white">API Reference</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="px-4 py-3 font-medium text-slate-300">Prop</th>
                <th className="px-4 py-3 font-medium text-slate-300">Type</th>
                <th className="px-4 py-3 font-medium text-slate-300">
                  Default
                </th>
                <th className="px-4 py-3 font-medium text-slate-300">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-800">
                <td className="px-4 py-3 font-mono text-blue-400">
                  intensity
                </td>
                <td className="px-4 py-3">string</td>
                <td className="px-4 py-3">"medium"</td>
                <td className="px-4 py-3">
                  Shadow depth — "light", "medium", or "strong"
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-blue-400">
                  className
                </td>
                <td className="px-4 py-3">string</td>
                <td className="px-4 py-3">"—"</td>
                <td className="px-4 py-3">
                  Additional CSS classes to apply to the element
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
