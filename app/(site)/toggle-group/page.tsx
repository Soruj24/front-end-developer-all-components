"use client";

import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/ToggleGroup";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const TOGGLEGROUP_SOURCE = `"use client";

import { Children, cloneElement, isValidElement, useState, type ReactElement } from "react";
import { cn } from "@/lib/cn";

export type ToggleGroupSize = "sm" | "md" | "lg";
export type ToggleGroupVariant = "default" | "outline" | "ghost";

const GROUP_SIZES = { sm: "gap-0.5 p-0.5", md: "gap-1 p-1", lg: "gap-1.5 p-1.5" };
const GROUP_VARIANTS = {
  default: "bg-muted/50 backdrop-blur-sm",
  outline: "bg-transparent ring-1 ring-border/60",
  ghost: "bg-transparent",
};
const ITEM_SIZES = { sm: "h-8 px-2.5 text-xs", md: "h-9 px-3.5 text-sm", lg: "h-10 px-4.5 text-sm" };
const ITEM_VARIANTS = {
  default: "text-muted-foreground hover:text-foreground data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm",
  outline: "border border-border/60 text-muted-foreground hover:bg-muted/60 data-[state=on]:border-primary/30 data-[state=on]:bg-primary/10 data-[state=on]:text-primary",
  ghost: "text-muted-foreground hover:bg-muted/60 data-[state=on]:bg-muted data-[state=on]:text-foreground",
};
const ITEM_BASE = "inline-flex items-center justify-center gap-1.5 rounded-lg font-medium transition-all duration-150 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40";

export function ToggleGroupItem({ value, children, disabled, className }) {
  return <button type="button" value={value} disabled={disabled} className={className} data-value={value}>{children}</button>;
}

export default function ToggleGroup({ value, defaultValue, onValueChange, type = "single", orientation = "horizontal", size = "md", variant = "default", className, children }) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? (type === "single" ? "" : []));
  const isControlled = value !== undefined;
  const current = isControlled ? value : internalValue;
  const isSelected = (v) => type === "single" ? current === v : Array.isArray(current) && current.includes(v);
  const handleClick = (v) => {
    let next;
    if (type === "single") next = current === v ? "" : v;
    else { const arr = Array.isArray(current) ? current : []; next = arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]; }
    if (!isControlled) setInternalValue(next);
    onValueChange?.(next);
  };
  return (
    <div role={type === "single" ? "radiogroup" : "group"} aria-label="Toggle group" className={cn("inline-flex rounded-xl", orientation === "vertical" ? "flex-col" : "flex-row flex-wrap", GROUP_SIZES[size], GROUP_VARIANTS[variant], className)}>
      {Children.map(children, (child) => {
        if (!isValidElement(child)) return child;
        const childProps = child.props;
        if (!childProps.value) return child;
        const active = isSelected(childProps.value);
        return cloneElement(child, { "data-state": active ? "on" : "off", "aria-pressed": type === "multiple" ? active : undefined, "aria-checked": type === "single" ? active : undefined, role: type === "single" ? "radio" : undefined, tabIndex: active ? 0 : -1, onClick: () => handleClick(childProps.value), className: cn(ITEM_BASE, ITEM_SIZES[size], ITEM_VARIANTS[variant], childProps.className) });
      })}
    </div>
  );
}`;

const SINGLE_CODE = `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/ToggleGroup";

<ToggleGroup type="single" defaultValue="center">
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>`;

const MULTIPLE_CODE = `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/ToggleGroup";

<ToggleGroup type="multiple" defaultValue={["bold"]}>
  <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
  <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
  <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
</ToggleGroup>`;

export default function ToggleGroupPage() {
  const [singleValue, setSingleValue] = useState("center");
  const [multiValue, setMultiValue] = useState<string[]>(["bold"]);

  return (
    <ComponentDocPage
      name="Toggle Group"
      category="Forms"
      description="A set of two-state buttons that can be toggled on or off. Supports single and multiple selection, sizes, variants, and keyboard navigation."
    >
      <PreviewPanel filename="toggle-group-demo.tsx">
        <ToggleGroup type="single" defaultValue="center">
          <ToggleGroupItem value="left">Left</ToggleGroupItem>
          <ToggleGroupItem value="center">Center</ToggleGroupItem>
          <ToggleGroupItem value="right">Right</ToggleGroupItem>
        </ToggleGroup>
      </PreviewPanel>

      <SourceCodeViewer
        source={TOGGLEGROUP_SOURCE}
        filename="components/ui/ToggleGroup/ToggleGroup.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Examples</h2>

        <ExampleBlock title="Single Select" description="Only one item can be active at a time." code={SINGLE_CODE} filename="single.tsx">
          <ToggleGroup type="single" defaultValue="center">
            <ToggleGroupItem value="left">Left</ToggleGroupItem>
            <ToggleGroupItem value="center">Center</ToggleGroupItem>
            <ToggleGroupItem value="right">Right</ToggleGroupItem>
          </ToggleGroup>
        </ExampleBlock>

        <ExampleBlock title="Multiple Select" description="Multiple items can be active simultaneously." code={MULTIPLE_CODE} filename="multiple.tsx">
          <ToggleGroup type="multiple" defaultValue={["bold"]}>
            <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
            <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
            <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
          </ToggleGroup>
        </ExampleBlock>

        <ExampleBlock title="Sizes" description="Three sizes: sm, md (default), and lg." code={`<ToggleGroup type="single" size="sm">...</ToggleGroup>`} filename="sizes.tsx">
          <div className="flex flex-col gap-4">
            <div>
              <p className="mb-1.5 text-xs font-medium text-muted-foreground">Small</p>
              <ToggleGroup type="single" size="sm" defaultValue="a">
                <ToggleGroupItem value="a">Option A</ToggleGroupItem>
                <ToggleGroupItem value="b">Option B</ToggleGroupItem>
                <ToggleGroupItem value="c">Option C</ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div>
              <p className="mb-1.5 text-xs font-medium text-muted-foreground">Medium (default)</p>
              <ToggleGroup type="single" size="md" defaultValue="a">
                <ToggleGroupItem value="a">Option A</ToggleGroupItem>
                <ToggleGroupItem value="b">Option B</ToggleGroupItem>
                <ToggleGroupItem value="c">Option C</ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div>
              <p className="mb-1.5 text-xs font-medium text-muted-foreground">Large</p>
              <ToggleGroup type="single" size="lg" defaultValue="a">
                <ToggleGroupItem value="a">Option A</ToggleGroupItem>
                <ToggleGroupItem value="b">Option B</ToggleGroupItem>
                <ToggleGroupItem value="c">Option C</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Variants" description="Three visual variants: default (filled), outline, and ghost." code={`<ToggleGroup type="single" variant="outline">...</ToggleGroup>`} filename="variants.tsx">
          <div className="flex flex-col gap-4">
            <div>
              <p className="mb-1.5 text-xs font-medium text-muted-foreground">Default</p>
              <ToggleGroup type="single" variant="default" defaultValue="a">
                <ToggleGroupItem value="a">Option A</ToggleGroupItem>
                <ToggleGroupItem value="b">Option B</ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div>
              <p className="mb-1.5 text-xs font-medium text-muted-foreground">Outline</p>
              <ToggleGroup type="single" variant="outline" defaultValue="a">
                <ToggleGroupItem value="a">Option A</ToggleGroupItem>
                <ToggleGroupItem value="b">Option B</ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div>
              <p className="mb-1.5 text-xs font-medium text-muted-foreground">Ghost</p>
              <ToggleGroup type="single" variant="ghost" defaultValue="a">
                <ToggleGroupItem value="a">Option A</ToggleGroupItem>
                <ToggleGroupItem value="b">Option B</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Vertical" description="Stack items vertically." code={`<ToggleGroup type="single" orientation="vertical">...</ToggleGroup>`} filename="vertical.tsx">
          <ToggleGroup type="single" orientation="vertical" defaultValue="a">
            <ToggleGroupItem value="a">First</ToggleGroupItem>
            <ToggleGroupItem value="b">Second</ToggleGroupItem>
            <ToggleGroupItem value="c">Third</ToggleGroupItem>
          </ToggleGroup>
        </ExampleBlock>

        <ExampleBlock title="Controlled" description="Controlled toggle group with external state." code={`const [value, setValue] = useState("center");`} filename="controlled.tsx">
          <div className="flex flex-col gap-3">
            <ToggleGroup type="single" value={singleValue} onValueChange={(v) => setSingleValue(typeof v === "string" ? v : v[0] ?? "")}>
              <ToggleGroupItem value="left">Left</ToggleGroupItem>
              <ToggleGroupItem value="center">Center</ToggleGroupItem>
              <ToggleGroupItem value="right">Right</ToggleGroupItem>
            </ToggleGroup>
            <p className="text-sm text-muted-foreground">
              Selected: <span className="font-medium text-foreground">{singleValue || "none"}</span>
            </p>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Controlled Multiple" description="Controlled multi-select toggle group." code={`const [value, setValue] = useState(["bold"]);`} filename="controlled-multiple.tsx">
          <div className="flex flex-col gap-3">
            <ToggleGroup type="multiple" value={multiValue} onValueChange={(v) => setMultiValue(Array.isArray(v) ? v : [v])}>
              <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
              <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
              <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
              <ToggleGroupItem value="strikethrough">Strike</ToggleGroupItem>
            </ToggleGroup>
            <p className="text-sm text-muted-foreground">
              Active: <span className="font-medium text-foreground">{multiValue.length ? multiValue.join(", ") : "none"}</span>
            </p>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Disabled Item" description="Individual items can be disabled." code={`<ToggleGroupItem value="b" disabled>Disabled</ToggleGroupItem>`} filename="disabled.tsx">
          <ToggleGroup type="single" defaultValue="a">
            <ToggleGroupItem value="a">Active</ToggleGroupItem>
            <ToggleGroupItem value="b" disabled>Disabled</ToggleGroupItem>
            <ToggleGroupItem value="c">Also Active</ToggleGroupItem>
          </ToggleGroup>
        </ExampleBlock>

        <ExampleBlock title="With Icons" description="Toggle items with SVG icons." code={`<ToggleGroupItem value="bold"><BoldIcon /> Bold</ToggleGroupItem>`} filename="icons.tsx">
          <ToggleGroup type="multiple" defaultValue={["bold"]}>
            <ToggleGroupItem value="bold">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" /><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" /></svg>
              Bold
            </ToggleGroupItem>
            <ToggleGroupItem value="italic">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="4" x2="10" y2="4" /><line x1="14" y1="20" x2="5" y2="20" /><line x1="15" y1="4" x2="9" y2="20" /></svg>
              Italic
            </ToggleGroupItem>
            <ToggleGroupItem value="underline">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" /><line x1="4" y1="21" x2="20" y2="21" /></svg>
              Underline
            </ToggleGroupItem>
          </ToggleGroup>
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}
