import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { carouselData, carouselSource } from "./shared";

export const carouselTransitions: RegistryEntry = entry({
    id: "carousel-transitions",
    title: "Transition Variants",
    description: "Slide, fade, scale, and 3D perspective transitions.",
    source: `import { useCallback, useEffect, useState } from "react";

${carouselData}

${carouselSource}

export default function CarouselTransitions() {
  const transitions = [
    { label: "Slide Transition", desc: "Standard horizontal slide", trans: "slide" as const },
    { label: "Fade Transition", desc: "Cross-fade between slides", trans: "fade" as const },
    { label: "Scale Transition", desc: "Zoom in/out effect", trans: "scale" as const },
    { label: "Slide 3D Effect", desc: "Perspective slide", trans: "slide-3d" as const },
  ];
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2">
      {transitions.map((t) => (
        <div key={t.label}>
          <p className="mb-1 text-sm font-medium">{t.label}</p>
          <p className="mb-2 text-xs text-zinc-500">{t.desc}</p>
          <Carousel slides={LABELS} colors={COLORS} transition={t.trans} />
        </div>
      ))}
    </div>
  );
}`,
  });
