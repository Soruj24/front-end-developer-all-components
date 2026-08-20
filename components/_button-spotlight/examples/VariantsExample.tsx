"use client";

import { ButtonSpotlight } from "../ButtonSpotlight";

export default function VariantsExample() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4 py-10">
      <ButtonSpotlight variant="default">Primary</ButtonSpotlight>
      <ButtonSpotlight variant="outline">Outline</ButtonSpotlight>
      <ButtonSpotlight variant="ghost">Ghost</ButtonSpotlight>
    </div>
  );
}
