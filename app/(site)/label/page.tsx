"use client";

import { Label } from "@/components/_label";

export default function LabelPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Label</h1>
        <p className="mt-1 text-muted-foreground">Form label with required indicator.</p>
      </header>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Description</h2>
        <p>Form label with required indicator.</p>
      </div>
    </div>
  );
}
