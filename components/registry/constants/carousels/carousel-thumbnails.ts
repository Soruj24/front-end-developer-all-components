import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { carouselData, carouselSource } from "./shared";

export const carouselThumbnails: RegistryEntry = entry({
    id: "carousel-thumbnails",
    title: "Thumbnails",
    description: "Bottom thumbnails, with and without autoplay.",
    source: `import { useCallback, useEffect, useState } from "react";

${carouselData}

${carouselSource}

export default function CarouselThumbnails() {
  const thumbnails = [
    { label: "With Thumbnails", desc: "Bottom thumb strip", auto: false },
    { label: "Thumbnails + Auto", desc: "Thumbs with autoplay", auto: true },
  ];
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2">
      {thumbnails.map((t) => (
        <div key={t.label}>
          <p className="mb-1 text-sm font-medium">{t.label}</p>
          <p className="mb-2 text-xs text-zinc-500">{t.desc}</p>
          <Carousel slides={LABELS} colors={COLORS} showThumbs showCounter={false} autoPlay={t.auto} />
        </div>
      ))}
    </div>
  );
}`,
  });
