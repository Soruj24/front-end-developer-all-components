"use client";

import type { RegistryComponent } from "@/features/registry";
import { categoryBySlug } from "@/features/registry";
import { useRegistryActions } from "@/hooks";
import { cn } from "@/lib/cn";
import {
  HeartIcon,
  BookmarkIcon,
  ShareIcon,
  TagIcon,
} from "./icons";

export function ComponentHeader({
  component,
}: {
  component: RegistryComponent;
}) {
  const category = categoryBySlug[component.category];
  const { getActionState, toggleAction } = useRegistryActions();
  const action = getActionState(component.slug);

  const handleShare = async () => {
    const url = `${window.location.origin}/components/${component.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: component.name, url });
      } catch {
        await navigator.clipboard.writeText(url);
      }
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {component.name}
        </h1>
        {category && (
          <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
            {category.label}
          </span>
        )}
      </div>

      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {component.description}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {component.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
            >
              <TagIcon className="h-3 w-3" />
              {tag}
            </span>
          ))}
        </div>

        <span className="h-4 w-px bg-border" aria-hidden="true" />

        <button
          type="button"
          onClick={() => toggleAction(component.slug, "liked")}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted",
            action.liked && "border-danger/40 text-danger"
          )}
        >
          <HeartIcon className="h-3.5 w-3.5" filled={action.liked} />
          Favorite
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ShareIcon className="h-3.5 w-3.5" />
          Share
        </button>
      </div>
    </div>
  );
}
