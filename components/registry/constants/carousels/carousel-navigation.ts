import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { carouselData, carouselSource } from "./shared";

export const carouselNavigation: RegistryEntry = entry({
    id: "carousel-navigation",
    title: "Navigation Variants",
    description: "No arrows, no dots, minimal counter, and no-loop carousels.",
    source: `import { useCallback, useEffect, useState } from "react";

${carouselData}

${carouselSource}

export default function CarouselNavigation() {
  const variants = [
    { label: "No Arrows", desc: "Dots navigation only", arrows: false },
    { label: "No Dots", desc: "Arrows navigation only", dots: false },
    { label: "Minimal UI", desc: "Counter only, no arrows/dots", arrows: false, dots: false, counter: true },
    { label: "No Loop", desc: "Stops at first/last", loop: false },
  ];
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {variants.map((v) => (
        <div key={v.label}>
          <p className="mb-1 text-sm font-medium">{v.label}</p>
          <p className="mb-2 text-xs text-zinc-500">{v.desc}</p>
          <Carousel slides={LABELS} colors={COLORS} showArrows={v.arrows ?? true} showDots={v.dots ?? true} showCounter={v.counter ?? false} loop={v.loop ?? true} />
        </div>
      ))}
    </div>
  );
}`,
  });
