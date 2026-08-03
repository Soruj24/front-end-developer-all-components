"use client";

import { Slider } from "@/components/_slider";

export default function SliderPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Slider</h1>
        <p className="mt-1 text-muted-foreground">Range slider input.</p>
      </header>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Description</h2>
        <p>Range slider input.</p>
      </div>
    </div>
  );
}
