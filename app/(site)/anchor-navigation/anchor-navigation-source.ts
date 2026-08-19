export const ANCHOR_NAVIGATION_SOURCE = `"use client";

import { useState } from "react";

interface Anchor {
  id: string;
  label: string;
}

interface AnchorNavigationProps {
  anchors: Anchor[];
  variant?: "sidebar" | "pills" | "underline";
  offset?: number;
}

export function AnchorNavigation({
  anchors,
  variant = "pills",
  offset = 80,
}: AnchorNavigationProps) {
  const [active, setActive] = useState(anchors[0]?.id ?? "");

  const scrollTo = (id: string) => {
    setActive(id);
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (variant === "sidebar") {
    return (
      <nav className="flex w-full max-w-xs flex-col gap-0.5 rounded-lg border border-black/[.08] bg-card p-2 dark:border-white/[.145]">
        {anchors.map((anchor) => (
          <button
            key={anchor.id}
            type="button"
            onClick={() => scrollTo(anchor.id)}
            className={\`flex items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm font-medium transition-colors \${
              active === anchor.id
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            }\`}
          >
            {anchor.label}
          </button>
        ))}
      </nav>
    );
  }

  if (variant === "underline") {
    return (
      <nav className="flex w-full max-w-lg gap-0 border-b border-black/[.08] dark:border-white/[.145]">
        {anchors.map((anchor) => (
          <button
            key={anchor.id}
            type="button"
            onClick={() => scrollTo(anchor.id)}
            className={\`relative px-4 py-2.5 text-sm font-medium transition-colors \${
              active === anchor.id
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }\`}
          >
            {anchor.label}
            {active === anchor.id && (
              <span className="absolute inset-x-0 -bottom-px h-0.5 bg-foreground" />
            )}
          </button>
        ))}
      </nav>
    );
  }

  return (
    <nav className="flex w-full max-w-lg flex-wrap gap-1.5 rounded-lg border border-black/[.08] bg-muted/30 p-1.5 dark:border-white/[.145]">
      {anchors.map((anchor) => (
        <button
          key={anchor.id}
          type="button"
          onClick={() => scrollTo(anchor.id)}
          className={\`rounded-md px-3 py-1.5 text-sm font-medium transition-all \${
            active === anchor.id
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }\`}
        >
          {anchor.label}
        </button>
      ))}
    </nav>
  );
}`;

export const SIDEBAR_EXAMPLE = `<AnchorNavigation variant="sidebar" anchors={anchors} />`;

export const PILLS_EXAMPLE = `<AnchorNavigation variant="pills" anchors={anchors} />`;

export const UNDERLINE_EXAMPLE = `<AnchorNavigation variant="underline" anchors={anchors} />`;

export const TOC_EXAMPLE = `<div className="w-full max-w-md rounded-lg border border-border bg-card">
  <div className="border-b border-border px-4 py-3">
    <h3 className="text-sm font-semibold text-foreground">Table of Contents</h3>
  </div>
  {sections.map((section, index) => (
    <button key={section.id} onClick={() => scrollTo(section.id)}>
      <span>{index + 1}</span>
      {section.title}
    </button>
  ))}
</div>`;

export const STICKY_EXAMPLE = `<div className="flex w-full gap-6">
  <nav className="sticky top-4 w-48 shrink-0">...anchors...</nav>
  <div className="flex-1 rounded-lg border border-border bg-card p-4">...content...</div>
</div>`;

export const STEPS_EXAMPLE = `<div className="flex items-center">
  {steps.map((step, index) => (
    <button key={step.id} onClick={() => setActive(step.id)}>
      <span className="flex h-5 w-5 items-center justify-center rounded-full">{index + 1}</span>
      {step.label}
    </button>
  ))}
</div>`;

export const DROPDOWN_EXAMPLE = `<div className="relative inline-block">
  <button onClick={() => setOpen(!open)}>Jump to Section</button>
  {open && (
    <div className="absolute top-full left-0 z-10 mt-1 w-56 rounded-lg border border-border bg-card shadow-lg">
      {anchors.map((anchor) => (
        <button key={anchor.id} onClick={() => setOpen(false)}>{anchor.label}</button>
      ))}
    </div>
  )}
</div>`;