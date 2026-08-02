"use client";

import { ComponentPreview } from "@/components/preview";
import { BentoGrid } from "@/components/ui";
import {
  analyticsCards,
  BentoNested,
  BentoPlayground,
} from "@/components/bento-grid/demo";

export default function BentoGridPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Bento Grid
        </h1>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A data-driven bento grid builder — cards pack into a compact,
          collision-free layout, drag to reorder, pull a corner to resize, and
          every move animates as the grid reshuffles. It collapses to fewer
          columns on small screens, nests grids inside grids, and is fully
          keyboard-operable.
        </p>
      </header>

      <ComponentPreview id="bento-grid-analytics">
        <div className="w-full py-6">
          <BentoGrid cards={analyticsCards} ariaLabel="Analytics bento grid" />
        </div>
      </ComponentPreview>

      <ComponentPreview id="bento-grid-playground">
        <BentoPlayground />
      </ComponentPreview>

      <ComponentPreview id="bento-grid-nested">
        <BentoNested />
      </ComponentPreview>
    </div>
  );
}
