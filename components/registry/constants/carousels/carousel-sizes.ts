import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { carouselData, carouselSource } from "./shared";

export const carouselSizes: RegistryEntry = entry({
    id: "carousel-sizes",
    title: "Slide Count & Height",
    description: "Short, long, tall, and compact slide sets.",
    source: `import { useCallback, useEffect, useState } from "react";

${carouselData}

${carouselSource}

export default function CarouselSizes() {
  const sizes = [
    { label: "Short (3 slides)", desc: "Minimal set", slides: ["A", "B", "C"] },
    { label: "Long (8 slides)", desc: "Extended set", slides: ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight"] },
    { label: "Tall Slides", desc: "Increased height", height: "h-96" },
    { label: "Compact", desc: "Small height", height: "h-40" },
  ];
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2">
      {sizes.map((s) => (
        <div key={s.label}>
          <p className="mb-1 text-sm font-medium">{s.label}</p>
          <p className="mb-2 text-xs text-zinc-500">{s.desc}</p>
          <Carousel slides={s.slides || LABELS} colors={COLORS} height={s.height || "h-64"} showDots={!s.slides || s.slides.length <= 6} />
        </div>
      ))}
    </div>
  );
}`,
  });
