import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { carouselData, carouselSource } from "./shared";

export const carouselFullFeatured: RegistryEntry = entry({
    id: "carousel-full-featured",
    title: "Full Featured",
    description: "Every control enabled — arrows, dots, thumbs, counter, auto-play.",
    source: `import { useCallback, useEffect, useState } from "react";

${carouselData}

${carouselSource}

export default function CarouselFullFeatured() {
  return (
    <div className="flex w-full justify-center">
      <Carousel slides={LABELS} colors={COLORS} transition="slide" autoPlay interval={2500} showThumbs showArrows showDots showCounter />
    </div>
  );
}`,
  });
