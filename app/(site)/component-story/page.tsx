"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { BookOpen, Play, Copy, Share2, Layers } from "lucide-react";

const installCommand = `npx component-library@latest add component-story`;
const usageCode = `import { ComponentStory } from "@/components/component-story";

<ComponentStory
  name="Button"
  variants={["primary", "secondary", "ghost"]}
  render={(variant) => <Button variant={variant}>Click</Button>}
/>`;

interface StoryVariant {
  name: string;
  props: Record<string, string | number | boolean>;
}

function StoryDemo() {
  const [activeVariant, setActiveVariant] = useState(0);
  const variants: StoryVariant[] = [
    { name: "Default", props: { size: "md", variant: "primary" } },
    { name: "Small", props: { size: "sm", variant: "primary" } },
    { name: "Large", props: { size: "lg", variant: "primary" } },
    { name: "Outline", props: { size: "md", variant: "outline" } },
  ];

  const v = variants[activeVariant];
  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <div className="flex gap-2">
        {variants.map((var_, i) => (
          <button
            key={var_.name}
            onClick={() => setActiveVariant(i)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              activeVariant === i ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {var_.name}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-center rounded-lg border bg-card p-8">
        <button className={`rounded-md bg-primary px-6 py-2 font-medium text-primary-foreground text-${v.props.size === "sm" ? "sm" : v.props.size === "lg" ? "lg" : "base"}`}>
          Button
        </button>
      </div>
      <div className="rounded-lg bg-muted/50 p-3">
        <p className="text-xs font-mono text-muted-foreground">{JSON.stringify(v.props, null, 2)}</p>
      </div>
    </div>
  );
}

function StoryControlsDemo() {
  const [controls, setControls] = useState({
    disabled: false,
    loading: false,
    variant: "primary",
    size: "md",
  });

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <div className="flex flex-col gap-2 rounded-lg border bg-card p-4">
        <span className="text-xs font-semibold uppercase text-muted-foreground">Controls</span>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={controls.disabled} onChange={(e) => setControls((c) => ({ ...c, disabled: e.target.checked }))} className="accent-primary" />
          Disabled
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={controls.loading} onChange={(e) => setControls((c) => ({ ...c, loading: e.target.checked }))} className="accent-primary" />
          Loading
        </label>
        <select value={controls.variant} onChange={(e) => setControls((c) => ({ ...c, variant: e.target.value }))} className="rounded-md border bg-background px-2 py-1 text-sm">
          <option value="primary">Primary</option>
          <option value="secondary">Secondary</option>
          <option value="outline">Outline</option>
        </select>
        <select value={controls.size} onChange={(e) => setControls((c) => ({ ...c, size: e.target.value }))} className="rounded-md border bg-background px-2 py-1 text-sm">
          <option value="sm">Small</option>
          <option value="md">Medium</option>
          <option value="lg">Large</option>
        </select>
      </div>
      <div className="flex items-center justify-center p-6">
        <button
          disabled={controls.disabled}
          className={`rounded-md px-6 py-2 font-medium text-primary-foreground ${
            controls.variant === "outline" ? "border border-primary bg-transparent text-primary" : "bg-primary"
          } ${controls.size === "sm" ? "text-sm px-4 py-1" : controls.size === "lg" ? "text-lg px-8 py-3" : ""} ${controls.disabled ? "opacity-50" : ""}`}
        >
          {controls.loading ? "Loading..." : "Button"}
        </button>
      </div>
    </div>
  );
}

function StoryTimelineDemo() {
  const steps = [
    { label: "Mount", icon: Layers, time: "0ms" },
    { label: "Render", icon: Play, time: "16ms" },
    { label: "Interact", icon: BookOpen, time: "150ms" },
    { label: "Update", icon: Copy, time: "200ms" },
  ];
  return (
    <div className="flex items-center gap-0">
      {steps.map((s, i) => (
        <div key={s.label} className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-card">
              <s.icon className="h-4 w-4 text-primary" />
            </div>
            <span className="text-[10px] font-medium">{s.label}</span>
            <span className="text-[10px] text-muted-foreground">{s.time}</span>
          </div>
          {i < steps.length - 1 && <div className="mx-1 h-0.5 w-12 bg-muted" />}
        </div>
      ))}
    </div>
  );
}

export default function ComponentStoryPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Component Story</h1>
          <Badge variant="primary">Tools</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Component story viewer with variant switching, interactive controls, and lifecycle timeline for development.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Variant Switching</h2>
        <ComponentPreview>
          <StoryDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Interactive Controls</h2>
        <ComponentPreview>
          <StoryControlsDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Lifecycle Timeline</h2>
        <ComponentPreview>
          <StoryTimelineDemo />
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
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">name</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">variants</td><td className="px-4 py-3 text-muted-foreground">string[]</td><td className="px-4 py-3 text-muted-foreground">[]</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
