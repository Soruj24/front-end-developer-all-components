"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";

const EXPAND_CARD_SOURCE = `"use client";

import { useState } from "react";
import type { ReactNode } from "react";

interface ExpandCardProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function ExpandCard({ title, children, defaultOpen = false }: ExpandCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3 cursor-pointer hover:bg-muted/50"
      >
        <span className="text-sm font-medium">{title}</span>
        <span className="text-muted-foreground text-xs">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="px-4 pb-4 text-sm text-muted-foreground border-t border-border pt-3">
          {children}
        </div>
      )}
    </div>
  );
}`;

function ClickExpandDemo() {
  const [open, setOpen] = useState(0);
  const items = ["Feature Overview", "Pricing Details", "Technical Specs"];
  return (
    <div className="w-full max-w-sm space-y-2">
      {items.map((title, i) => (
        <div key={title} className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-muted/50" onClick={() => setOpen(open === i ? -1 : i)}>
            <span className="text-sm font-medium">{title}</span>
            <span className="text-muted-foreground text-xs">{open === i ? "−" : "+"}</span>
          </div>
          {open === i && (
            <div className="px-4 pb-4 text-sm text-muted-foreground border-t border-border pt-3">
              This component provides smooth expand and collapse animations with configurable transition speeds.
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function HoverExpandDemo() {
  return (
    <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
      {["Project A", "Project B"].map((name) => (
        <div key={name} className="group rounded-xl border border-border bg-card p-4 cursor-pointer hover:p-6 transition-all duration-300">
          <div className="h-8 w-8 rounded-lg bg-primary/10 mb-2" />
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-muted-foreground mt-1 hidden group-hover:block">Hover to see expanded details about this project.</p>
        </div>
      ))}
    </div>
  );
}

function ImageExpandDemo() {
  return (
    <div className="w-full max-w-sm rounded-xl border border-border bg-card overflow-hidden">
      <div className="h-32 bg-gradient-to-br from-primary/20 to-primary/5" />
      <div className="p-4">
        <h3 className="font-medium text-sm">Photo Gallery</h3>
        <p className="text-xs text-muted-foreground mt-1">Click to expand and see more details about this gallery.</p>
        <div className="mt-3 flex gap-2">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted">12 photos</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted">Updated 2h ago</span>
        </div>
      </div>
    </div>
  );
}

export default function ExpandCardPage() {
  return (
    <ComponentDocPage
      name="Expand Card"
      category="Animation"
      description="An expandable card component with smooth height transitions for revealing additional content on demand."
    >
      <PreviewPanel filename="expand-card.tsx">
        <ClickExpandDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={EXPAND_CARD_SOURCE}
        filename="components/ui/ExpandCard/ExpandCard.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock
          title="Hover Expand"
          description="Cards that expand on hover."
          code={`<div className="group rounded-xl border border-border bg-card p-4 hover:p-6 transition-all duration-300">
  <div className="h-8 w-8 rounded-lg bg-primary/10 mb-2" />
  <p className="text-sm font-medium">Project A</p>
  <p className="text-xs text-muted-foreground mt-1 hidden group-hover:block">Hover to expand</p>
</div>`}
        >
          <HoverExpandDemo />
        </ExampleBlock>

        <ExampleBlock
          title="Image Expand"
          description="Cards with images that expand on interaction."
          code={`<div className="max-w-sm rounded-xl border border-border bg-card overflow-hidden">
  <div className="h-32 bg-gradient-to-br from-primary/20 to-primary/5" />
  <div className="p-4">
    <h3 className="font-medium text-sm">Photo Gallery</h3>
    <p className="text-xs text-muted-foreground mt-1">Click to expand.</p>
  </div>
</div>`}
        >
          <ImageExpandDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}