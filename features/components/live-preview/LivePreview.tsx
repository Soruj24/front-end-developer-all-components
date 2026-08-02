"use client";

import { useMemo } from "react";
import type { ReactNode } from "react";
import type { RegistryComponent } from "@/features/registry";
import { categoryBySlug } from "@/features/registry";
import { ComponentRenderer } from "@/components/preview/ComponentRenderer";
import { thumbnailGradient } from "../thumbnail";
import { elements } from "./elements";
import { dataDisplay } from "./data-display";
import { feedback } from "./feedback";
import { overlays } from "./overlays";
import { navigation } from "./navigation";
import { surfaces } from "./surfaces";
import { apps } from "./apps";
import { misc } from "./misc";

const demos: Record<string, () => ReactNode> = {
  ...elements,
  ...dataDisplay,
  ...feedback,
  ...overlays,
  ...navigation,
  ...surfaces,
  ...apps,
  ...misc,
};

/** Renders a live demo for a registry component, falling back to a placeholder. */
export function LivePreview({ component }: { component: RegistryComponent }) {
  const render = demos[component.slug];
  const node = useMemo(() => (render ? render() : null), [render]);

  if (!render) {
    return (
      <Fallback
        name={component.name}
        category={component.category}
        categoryIcon={categoryBySlug[component.category]?.icon}
        variants={component.variants}
      />
    );
  }

  return <ComponentRenderer>{node}</ComponentRenderer>;
}

function Fallback({
  name,
  category,
  categoryIcon,
  variants,
}: {
  name: string;
  category: string;
  categoryIcon?: string;
  variants: string[];
}) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div
        className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${thumbnailGradient(category)} text-2xl font-bold text-white shadow-card`}
      >
        {categoryIcon}
      </div>
      <p className="text-sm font-medium text-foreground">{name}</p>
      <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
        This component needs user interaction. Copy the source below to run it in your own
        project.
      </p>
      {variants.length > 0 && (
        <div className="mt-1 flex flex-wrap justify-center gap-1.5">
          {variants.map((variant) => (
            <span key={variant} className="rounded-full bg-background px-2.5 py-1 text-[11px] text-muted-foreground shadow-sm">
              {variant}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
