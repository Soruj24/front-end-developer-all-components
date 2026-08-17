"use client";

import { ComponentPreview } from "@/components/preview";

export default function MultiSelectPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Multi Select
        </h1>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Description for Multi Select component.
        </p>
      </header>

      <ComponentPreview id="multi-select-default">
        <div className="flex w-full items-center justify-center py-10">
          <p className="text-sm text-subtle">Multi Select component preview</p>
        </div>
      </ComponentPreview>
    </div>
  );
}
