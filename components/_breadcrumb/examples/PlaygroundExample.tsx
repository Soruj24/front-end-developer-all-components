"use client";

import { useState } from "react";
import { Breadcrumb } from "../Breadcrumb";
import type { BreadcrumbItem } from "../Breadcrumb.types";

const DEMO_ITEMS: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Website Redesign", href: "/projects/website" },
  { label: "Assets", href: "/projects/website/assets" },
  { label: "Images" },
];

export default function PlaygroundExample() {
  const [active, setActive] = useState<number | undefined>(undefined);
  const [variant, setVariant] = useState<"default" | "pill" | "muted">("default");

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Variant
        </span>
        {(["default", "pill", "muted"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setVariant(v)}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              variant === v
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {v}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Active Index
        </span>
        <button
          onClick={() => setActive(undefined)}
          className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
            active === undefined
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          Last
        </button>
        {DEMO_ITEMS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              active === i
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {i}
          </button>
        ))}
      </div>
      <div className="rounded-xl border border-border bg-card p-4">
        <Breadcrumb
          items={DEMO_ITEMS}
          variant={variant}
          activeIndex={active}
        />
      </div>
    </div>
  );
}
