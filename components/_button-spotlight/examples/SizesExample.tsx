"use client";

import { ButtonSpotlight } from "../ButtonSpotlight";

export default function SizesExample() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4 py-10">
      <ButtonSpotlight variant="outline" className="px-4 py-2 text-xs font-medium">Small</ButtonSpotlight>
      <ButtonSpotlight variant="outline" className="px-6 py-3 text-sm font-semibold">Medium</ButtonSpotlight>
      <ButtonSpotlight variant="outline" className="px-8 py-3.5 text-base font-semibold">Large</ButtonSpotlight>
    </div>
  );
}
