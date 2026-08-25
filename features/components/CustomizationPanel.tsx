"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/cn";
import { CodeBlock } from "@/components/home/CodeBlock";
import { InlineSelect } from "@/components/ui/InlineSelect";
import { CUSTOMIZATION_GROUPS, type CustomizationOption } from "./customization-config";
import { generateTailwindClasses, generateComponentCode } from "./utils/tailwind-generator";

interface CustomizationPanelProps {
  componentSlug: string;
  baseClasses?: string;
  onCustomize: (styles: Record<string, string>) => void;
}

function OptionControl({
  option, value, onChange,
}: {
  option: CustomizationOption;
  value: string;
  onChange: (value: string) => void;
}) {
  if (option.type === "color") {
    return (
      <div className="flex items-center gap-2">
        <input type="color" value={value} onChange={(e) => onChange(e.target.value)}
          className="h-8 w-8 cursor-pointer rounded-md border border-border" />
        <span className="font-mono text-xs text-muted-foreground">{value}</span>
      </div>
    );
  }
  if (option.type === "select") {
    return (
      <InlineSelect
        options={option.options?.map((opt) => ({ value: opt, label: opt })) ?? []}
        value={value}
        onChange={(val) => onChange(val)}
        size="sm"
      />
    );
  }
  if (option.type === "range") {
    return (
      <div className="flex items-center gap-3">
        <input type="range" min={option.min} max={option.max} step={option.step}
          value={value} onChange={(e) => onChange(e.target.value)} className="flex-1" />
        <span className="w-10 text-right font-mono text-xs text-muted-foreground">{value}px</span>
      </div>
    );
  }
  return null;
}

export function CustomizationPanel({
  componentSlug,
  baseClasses = "",
  onCustomize,
}: CustomizationPanelProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [activeGroup, setActiveGroup] = useState<string | null>("Colors");
  const [showCode, setShowCode] = useState(false);

  const componentName = componentSlug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("");
  const generatedClasses = useMemo(() => generateTailwindClasses(values).join(" "), [values]);
  const generatedCode = useMemo(() => generateComponentCode(componentName, baseClasses, values), [componentName, baseClasses, values]);

  const handleChange = (label: string, value: string) => {
    const next = { ...values, [label]: value };
    setValues(next);
    onCustomize(next);
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Customization</h2>
          <p className="text-sm text-muted-foreground">Adjust the visual properties to see how the component adapts.</p>
        </div>
        <button type="button" onClick={() => setShowCode((v) => !v)}
          className={cn("rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
            showCode ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:bg-muted hover:text-foreground")}>
          {showCode ? "Hide Code" : "Show Generated Code"}
        </button>
      </div>

      {showCode && (
        <div className="overflow-hidden rounded-xl border border-border">
          <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-2">
            <span className="text-xs font-medium text-muted-foreground">Generated Tailwind Classes</span>
            {generatedClasses && (
              <code className="max-w-md truncate text-[11px] text-primary">{generatedClasses}</code>
            )}
          </div>
          <CodeBlock code={generatedCode} filename={`${componentName}.tsx`} label="tsx" />
        </div>
      )}

      <div className="flex flex-col gap-4 overflow-hidden rounded-xl border border-border sm:flex-row">
        <div className="flex gap-1 overflow-x-auto border-b border-border bg-muted/30 p-2 sm:flex-col sm:border-b-0 sm:border-r sm:border-border sm:overflow-y-auto sm:overflow-x-hidden">
          {CUSTOMIZATION_GROUPS.map((group) => (
            <button key={group.label} type="button" onClick={() => setActiveGroup(group.label)}
              className={cn("flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                activeGroup === group.label ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
              {group.icon}{group.label}
            </button>
          ))}
        </div>
        <div className="flex-1 p-4">
          {CUSTOMIZATION_GROUPS.map((group) =>
            activeGroup === group.label && (
              <div key={group.label} className="flex flex-col gap-4">
                {group.options.map((option) => (
                  <div key={option.label} className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-foreground">{option.label}</label>
                    <OptionControl option={option} value={values[option.label] ?? option.value}
                      onChange={(v) => handleChange(option.label, v)} />
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
