"use client";

import { useState } from "react";
import {
  BookOpen,
  Play,
  Copy,
  Share2,
  Layers,
  Eye,
  Code2,
  Palette,
  Settings,
  Check,
  X,
  ChevronDown,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";

export function VariantSwitchingDemo() {
  const [activeVariant, setActiveVariant] = useState(0);
  const variants = [
    { name: "Default", props: { size: "md", variant: "primary" } },
    { name: "Small", props: { size: "sm", variant: "primary" } },
    { name: "Large", props: { size: "lg", variant: "primary" } },
    { name: "Outline", props: { size: "md", variant: "outline" } },
    { name: "Ghost", props: { size: "md", variant: "ghost" } },
    { name: "Destructive", props: { size: "md", variant: "destructive" } },
  ];

  const v = variants[activeVariant];

  const sizeClasses = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-6 py-2.5",
  };

  const variantClasses = {
    primary: "bg-foreground text-background hover:bg-foreground/90",
    outline: "border border-black/[.08] bg-transparent hover:bg-muted dark:border-white/[.145]",
    ghost: "bg-transparent hover:bg-muted",
    destructive: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">Button</span>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              {variants.length} variants
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 border-b border-black/[.06] px-4 py-2 dark:border-white/[.1]">
          {variants.map((var_, i) => (
            <button
              key={var_.name}
              onClick={() => setActiveVariant(i)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                activeVariant === i
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {var_.name}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-center p-10">
          <button className={`rounded-lg font-medium transition-colors ${
            sizeClasses[v.props.size as keyof typeof sizeClasses]
          } ${variantClasses[v.props.variant as keyof typeof variantClasses]}`}>
            Button
          </button>
        </div>
        <div className="border-t border-black/[.06] bg-muted/30 px-4 py-3 dark:border-white/[.08]">
          <p className="font-mono text-[11px] text-muted-foreground">{JSON.stringify(v.props, null, 2)}</p>
        </div>
      </div>
    </div>
  );
}

export function InteractiveControlsDemo() {
  const [controls, setControls] = useState({
    disabled: false,
    loading: false,
    variant: "primary",
    size: "md",
    icon: false,
  });

  const sizeClasses = {
    sm: "text-xs px-3 py-1.5 gap-1",
    md: "text-sm px-4 py-2 gap-1.5",
    lg: "text-base px-6 py-2.5 gap-2",
  };

  const variantClasses = {
    primary: "bg-foreground text-background hover:bg-foreground/90",
    secondary: "bg-muted text-foreground hover:bg-muted/80",
    outline: "border border-black/[.08] bg-transparent hover:bg-muted dark:border-white/[.145]",
    ghost: "bg-transparent hover:bg-muted",
  };

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="text-sm font-semibold">Controls</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-px bg-black/[.06] dark:bg-white/[.08]">
          <div className="bg-card p-3">
            <label className="text-[10px] font-medium text-muted-foreground">Variant</label>
            <select
              value={controls.variant}
              onChange={(e) => setControls((c) => ({ ...c, variant: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-black/[.08] bg-background px-2.5 py-1.5 text-xs dark:border-white/[.145]"
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="outline">Outline</option>
              <option value="ghost">Ghost</option>
            </select>
          </div>
          <div className="bg-card p-3">
            <label className="text-[10px] font-medium text-muted-foreground">Size</label>
            <select
              value={controls.size}
              onChange={(e) => setControls((c) => ({ ...c, size: e.target.value }))}
              className="mt-1 w-full rounded-lg border border-black/[.08] bg-background px-2.5 py-1.5 text-xs dark:border-white/[.145]"
            >
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
            </select>
          </div>
          <div className="bg-card p-3">
            <label className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setControls((c) => ({ ...c, disabled: !c.disabled }))}
                className={`flex h-5 w-9 items-center rounded-full p-0.5 transition-colors ${
                  controls.disabled ? "bg-foreground" : "bg-muted"
                }`}
              >
                <div className={`h-4 w-4 rounded-full bg-background shadow-sm transition-transform ${
                  controls.disabled ? "translate-x-4" : ""
                }`} />
              </button>
              Disabled
            </label>
          </div>
          <div className="bg-card p-3">
            <label className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setControls((c) => ({ ...c, loading: !c.loading }))}
                className={`flex h-5 w-9 items-center rounded-full p-0.5 transition-colors ${
                  controls.loading ? "bg-foreground" : "bg-muted"
                }`}
              >
                <div className={`h-4 w-4 rounded-full bg-background shadow-sm transition-transform ${
                  controls.loading ? "translate-x-4" : ""
                }`} />
              </button>
              Loading
            </label>
          </div>
        </div>
        <div className="flex items-center justify-center p-8">
          <button
            disabled={controls.disabled || controls.loading}
            className={`flex items-center rounded-lg font-medium transition-all ${
              sizeClasses[controls.size as keyof typeof sizeClasses]
            } ${variantClasses[controls.variant as keyof typeof variantClasses]} ${
              (controls.disabled || controls.loading) ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {controls.loading && (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            )}
            {controls.loading ? "Loading..." : "Button"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function LifecycleTimelineDemo() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    { label: "Mount", time: "0ms", desc: "Component enters DOM", color: "bg-emerald-500" },
    { label: "Render", time: "16ms", desc: "Initial paint complete", color: "bg-blue-500" },
    { label: "Hydrate", time: "45ms", desc: "Event listeners attached", color: "bg-purple-500" },
    { label: "Interact", time: "150ms", desc: "User input processed", color: "bg-amber-500" },
    { label: "Update", time: "200ms", desc: "State change re-render", color: "bg-pink-500" },
    { label: "Unmount", time: "∞", desc: "Cleanup and remove", color: "bg-red-500" },
  ];

  return (
    <div className="w-full max-w-lg">
      <div className="rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold">Lifecycle Timeline</span>
          <span className="text-[10px] text-muted-foreground">Step {activeStep + 1}/{steps.length}</span>
        </div>
        <div className="flex items-start gap-0 mb-4">
          {steps.map((s, i) => (
            <div key={s.label} className="flex items-start">
              <button
                onClick={() => setActiveStep(i)}
                className="flex flex-col items-center gap-1.5"
              >
                <div className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${
                  i <= activeStep
                    ? `${s.color} text-white`
                    : "bg-muted text-muted-foreground"
                }`}>
                  {i < activeStep ? <Check className="h-4 w-4" /> : <span className="text-xs font-bold">{i + 1}</span>}
                </div>
                <span className={`text-[10px] font-medium ${
                  i === activeStep ? "text-foreground" : "text-muted-foreground"
                }`}>{s.label}</span>
              </button>
              {i < steps.length - 1 && (
                <div className={`mx-1 mt-4 h-0.5 w-8 ${
                  i < activeStep ? "bg-foreground/30" : "bg-muted"
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="rounded-lg bg-muted/50 p-4">
          <div className="flex items-center gap-2 mb-1">
            <div className={`h-2 w-2 rounded-full ${steps[activeStep].color}`} />
            <span className="text-sm font-semibold">{steps[activeStep].label}</span>
            <span className="ml-auto font-mono text-xs text-muted-foreground">{steps[activeStep].time}</span>
          </div>
          <p className="text-xs text-muted-foreground">{steps[activeStep].desc}</p>
        </div>
      </div>
    </div>
  );
}

export function ThemePreviewDemo() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
  const themes = [
    { id: "light" as const, label: "Light", icon: Sun },
    { id: "dark" as const, label: "Dark", icon: Moon },
    { id: "system" as const, label: "System", icon: Monitor },
  ];

  const isDark = theme === "dark" || (theme === "system" && false);

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="flex items-center justify-between border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <span className="text-sm font-semibold">Theme Preview</span>
          <div className="flex gap-1">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[10px] font-medium transition-colors ${
                  theme === t.id ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <t.icon className="h-3 w-3" />
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div className={`p-6 ${
          isDark ? "bg-zinc-900" : "bg-zinc-50"
        }`}>
          <div className={`rounded-xl border p-4 shadow-sm ${
            isDark ? "border-white/[.145] bg-zinc-800" : "border-black/[.08] bg-white"
          }`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`h-10 w-10 rounded-full ${
                isDark ? "bg-zinc-700" : "bg-zinc-200"
              }`} />
              <div>
                <p className={`text-sm font-semibold ${
                  isDark ? "text-white" : "text-zinc-900"
                }`}>John Doe</p>
                <p className={`text-xs ${
                  isDark ? "text-zinc-400" : "text-zinc-500"
                }`}>john@example.com</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
                isDark ? "bg-white text-zinc-900" : "bg-zinc-900 text-white"
              }`}>Follow</button>
              <button className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
                isDark ? "border border-white/[.145] text-zinc-300" : "border border-black/[.08] text-zinc-600"
              }`}>Message</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PropsTableDemo() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ variant: true });
  const props = [
    { name: "variant", type: '"primary" | "secondary" | "ghost" | "outline"', default: '"primary"', required: false, desc: "Button style variant" },
    { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', required: false, desc: "Button size" },
    { name: "disabled", type: "boolean", default: "false", required: false, desc: "Disable interactions" },
    { name: "loading", type: "boolean", default: "false", required: false, desc: "Show loading spinner" },
    { name: "onClick", type: "() => void", default: "-", required: false, desc: "Click handler" },
    { name: "children", type: "ReactNode", default: "-", required: true, desc: "Button content" },
  ];

  return (
    <div className="w-full max-w-lg">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <span className="text-sm font-semibold">Props Documentation</span>
        </div>
        <div className="divide-y divide-black/[.06] dark:divide-white/[.08]">
          {props.map((p) => (
            <div key={p.name}>
              <button
                onClick={() => setExpanded((e) => ({ ...e, [p.name]: !e[p.name] }))}
                className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-muted/30 transition-colors"
              >
                <code className="font-mono text-xs font-semibold text-foreground">{p.name}</code>
                {p.required && (
                  <span className="rounded bg-red-50 px-1.5 py-0.5 text-[9px] font-bold text-red-600 dark:bg-red-950/50 dark:text-red-400">required</span>
                )}
                <span className="ml-auto text-[10px] text-muted-foreground">{p.default}</span>
                <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${
                  expanded[p.name] ? "rotate-180" : ""
                }`} />
              </button>
              {expanded[p.name] && (
                <div className="border-t border-black/[.04] bg-muted/20 px-4 py-3 dark:border-white/[.06]">
                  <p className="text-xs text-muted-foreground mb-2">{p.desc}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-medium text-muted-foreground">Type:</span>
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-foreground">{p.type}</code>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ComponentGridDemo() {
  const variants = [
    { name: "Primary", class: "bg-foreground text-background" },
    { name: "Secondary", class: "bg-muted text-foreground" },
    { name: "Outline", class: "border border-black/[.08] dark:border-white/[.145]" },
    { name: "Ghost", class: "hover:bg-muted" },
    { name: "Link", class: "text-foreground underline" },
    { name: "Destructive", class: "bg-red-500 text-white" },
  ];

  const sizes = ["sm", "md", "lg"];

  return (
    <div className="w-full max-w-lg">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">All Variants</span>
            <span className="text-[10px] text-muted-foreground">{variants.length} variants × {sizes.length} sizes</span>
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div />
            {sizes.map((s) => (
              <div key={s} className="text-center text-[10px] font-medium text-muted-foreground capitalize">{s}</div>
            ))}
          </div>
{variants.map((v) => (
            <div key={v.name} className="grid grid-cols-3 gap-2 mb-2 items-center">
              <span className="text-xs font-medium text-muted-foreground">{v.name}</span>
              {sizes.map((s) => (
                <div key={s} className="flex justify-center">
                  <ButtonSize s={s} v={v} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ButtonSize({ s, v }: { s: string; v: any }) {
  const cls = "rounded-lg font-medium transition-colors " +
    (s === "sm" ? "px-3 py-1 text-[10px]" : s === "lg" ? "px-5 py-2 text-sm" : "px-4 py-1.5 text-xs") + " " + v.class;
  return (
    <button className={cls}>Button</button>
  );
}

export function CodePreviewDemo() {
  const [showCode, setShowCode] = useState(false);
  const [activeVariant, setActiveVariant] = useState(0);
  const variants = [
    { name: "Default", code: '<Button>Click me</Button>' },
    { name: "With Icon", code: '<Button><Plus /> Add item</Button>' },
    { name: "Loading", code: '<Button loading>Saving...</Button>' },
    { name: "Destructive", code: '<Button variant="destructive">Delete</Button>' },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="flex items-center justify-between border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <span className="text-sm font-semibold">Code Preview</span>
          <button
            onClick={() => setShowCode(!showCode)}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[10px] font-medium transition-colors ${
              showCode ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {showCode ? <Eye className="h-3 w-3" /> : <Code2 className="h-3 w-3" />}
            {showCode ? "Preview" : "Code"}
          </button>
        </div>
        <div className="flex gap-1 border-b border-black/[.06] px-4 py-2 dark:border-white/[.1]">
          {variants.map((v, i) => (
            <button
              key={v.name}
              onClick={() => setActiveVariant(i)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                activeVariant === i ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {v.name}
            </button>
          ))}
        </div>
        {showCode ? (
          <div className="bg-[#0d1117] p-4">
            <pre className="font-mono text-[12px] leading-5 text-white/80">
              <span className="text-purple-400">import</span> {'{'} <span className="text-green-300">Button</span> {'}'} <span className="text-purple-400">from</span> <span className="text-amber-300">"@/components/ui/button"</span>;{'\n\n'}
              <span className="text-purple-400">export default function</span> <span className="text-blue-300">Page</span>() {'{'}{'\n'}
              {'  '}<span className="text-purple-400">return</span> ({'\n'}
              {'    '}{variants[activeVariant].code}{'\n'}
              {'  '});{'\n'}
              {'{}'}</pre>
          </div>
        ) : (
          <div className="flex items-center justify-center p-8">
            <button className="rounded-lg bg-foreground px-5 py-2 text-sm font-medium text-background">
              Button
            </button>
          </div>
        )}
      </div>
    </div>
  );
}