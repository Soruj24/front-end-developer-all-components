export const COMPONENT_STORY_SOURCE = `"use client";

import { useState } from "react";

interface StoryVariant {
  name: string;
  props: Record<string, string | number | boolean>;
}

interface ComponentStoryProps {
  name: string;
  variants: StoryVariant[];
  render: (props: Record<string, string | number | boolean>) => React.ReactNode;
  className?: string;
}

export function ComponentStory({ name, variants, render, className = "" }: ComponentStoryProps) {
  const [active, setActive] = useState(0);
  const variant = variants[active];

  return (
    <div className={\`overflow-hidden rounded-xl border border-border bg-card shadow-sm \${className}\`}>
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-semibold">{name}</span>
        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
          {variants.length} variants
        </span>
      </div>
      <div className="flex flex-wrap gap-1 border-b border-border px-4 py-2">
        {variants.map((v, i) => (
          <button
            key={v.name}
            onClick={() => setActive(i)}
            className={\`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors \${active === i ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted"}\`}
          >
            {v.name}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-center p-10">{render(variant.props)}</div>
      <div className="border-t border-border bg-muted/30 px-4 py-3">
        <pre className="font-mono text-[11px] text-muted-foreground">{JSON.stringify(variant.props, null, 2)}</pre>
      </div>
    </div>
  );
}`;

export const VARIANT_EXAMPLE = `<ComponentStory
  name="Button"
  variants={[
    { name: "Default", props: { size: "md", variant: "primary" } },
    { name: "Small", props: { size: "sm", variant: "primary" } },
    { name: "Large", props: { size: "lg", variant: "primary" } },
    { name: "Outline", props: { size: "md", variant: "outline" } },
    { name: "Ghost", props: { size: "md", variant: "ghost" } },
    { name: "Destructive", props: { size: "md", variant: "destructive" } },
  ]}
  render={(props) => <Button {...props}>Button</Button>}
/>`;

export const CONTROLS_EXAMPLE = `<div className="grid grid-cols-2 gap-px bg-border">
  <div className="bg-card p-3">
    <label className="text-[10px] font-medium text-muted-foreground">Variant</label>
    <select
      value={controls.variant}
      onChange={(e) => setControls((c) => ({ ...c, variant: e.target.value }))}
      className="mt-1 w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs"
    >
      <option value="primary">Primary</option>
      <option value="outline">Outline</option>
    </select>
  </div>
  <label className="flex items-center gap-2 text-xs">
    <button onClick={() => setControls((c) => ({ ...c, disabled: !c.disabled }))} className="h-5 w-9 rounded-full bg-muted">
      <div className="h-4 w-4 rounded-full bg-background" />
    </button>
    Disabled
  </label>
</div>`;

export const LIFECYCLE_EXAMPLE = `<div className="flex items-start">
  {steps.map((s, i) => (
    <button key={s.label} onClick={() => setActiveStep(i)} className="flex flex-col items-center gap-1.5">
      <div className={\`flex h-8 w-8 items-center justify-center rounded-full \${i <= activeStep ? s.color : "bg-muted"}\`}>
        {i < activeStep ? <Check className="h-4 w-4" /> : <span>{i + 1}</span>}
      </div>
      <span>{s.label}</span>
    </button>
  ))}
</div>`;

export const THEME_EXAMPLE = `<div className="flex gap-1">
  {themes.map((t) => (
    <button
      key={t.id}
      onClick={() => setTheme(t.id)}
      className={\`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[10px] font-medium \${theme === t.id ? "bg-foreground text-background" : "text-muted-foreground"}\`}
    >
      <t.icon className="h-3 w-3" />
      {t.label}
    </button>
  ))}
</div>`;

export const PROPS_EXAMPLE = `{props.map((p) => (
  <div key={p.name} className="divide-y divide-border">
    <button
      onClick={() => setExpanded((e) => ({ ...e, [p.name]: !e[p.name] }))}
      className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-muted/30"
    >
      <code className="font-mono text-xs font-semibold">{p.name}</code>
      {p.required && (
        <span className="rounded bg-red-50 px-1.5 py-0.5 text-[9px] font-bold text-red-600 dark:bg-red-950/50 dark:text-red-400">
          required
        </span>
      )}
      <ChevronDown className={\`h-3.5 w-3.5 \${expanded[p.name] ? "rotate-180" : ""}\`} />
    </button>
  </div>
))}`;

export const GRID_EXAMPLE = `<div className="grid grid-cols-3 gap-2">
  {sizes.map((s) => (
    <div key={s} className="text-center text-[10px] font-medium text-muted-foreground capitalize">{s}</div>
  ))}
  {variants.map((v) => (
    <button key={v.name} className={\`rounded-lg px-4 py-1.5 text-xs font-medium \${v.class}\`}>
      Button
    </button>
  ))}
</div>`;

export const CODE_EXAMPLE = `<div className="bg-[#0d1117] p-4">
  <pre className="font-mono text-[12px] leading-5 text-white/80">
    {variants[activeVariant].code}
  </pre>
</div>`;