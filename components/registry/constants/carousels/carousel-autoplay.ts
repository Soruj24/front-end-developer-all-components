import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { carouselData, carouselSource } from "./shared";

export const carouselAutoplay: RegistryEntry = entry({
    id: "carousel-autoplay",
    title: "Auto-Play",
    description: "Automatic rotation at 3s and fast 1.5s intervals.",
    source: `import { useCallback, useEffect, useState } from "react";

${carouselData}

${carouselSource}

export default function CarouselAutoPlay() {
  const autoplays = [
    { label: "Auto-Play", desc: "Automatic rotation every 3s", interval: 3000 },
    { label: "Fast Auto-Play", desc: "1.5s interval", interval: 1500 },
  ];
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2">
      {autoplays.map((a) => (
        <div key={a.label}>
          <p className="mb-1 text-sm font-medium">{a.label}</p>
          <p className="mb-2 text-xs text-zinc-500">{a.desc}</p>
          <Carousel slides={LABELS} colors={COLORS} autoPlay interval={a.interval} />
        </div>
      ))}
    </div>
  );
}`,
  });
