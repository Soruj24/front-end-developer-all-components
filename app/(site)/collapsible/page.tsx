"use client";

import { Collapsible } from "@/components/_collapsible";

export default function CollapsiblePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Collapsible</h1>
        <p className="mt-1 text-muted-foreground">Expandable/collapsible content.</p>
      </header>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Description</h2>
        <p>Expandable/collapsible content.</p>
      </div>
    </div>
  );
}
