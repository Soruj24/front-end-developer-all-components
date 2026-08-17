"use client";

import { ComponentPreview } from "@/components/preview";

export default function HeatMapPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Heat Map
        </h1>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Description for Heat Map component.
        </p>
      </header>

      <ComponentPreview id="heat-map-default">
        <div className="flex w-full items-center justify-center py-10">
          <p className="text-sm text-subtle">Heat Map component preview</p>
        </div>
      </ComponentPreview>
    </div>
  );
}
