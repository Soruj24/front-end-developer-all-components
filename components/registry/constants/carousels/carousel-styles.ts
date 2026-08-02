import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { carouselData, carouselSource } from "./shared";

export const carouselStyles: RegistryEntry = entry({
    id: "carousel-styles",
    title: "Style Variants",
    description: "Rounded, shadow, square dots, and dark overlay styles.",
    source: `import { useCallback, useEffect, useState } from "react";

${carouselData}

${carouselSource}

export default function CarouselStyles() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2">
      <div>
        <p className="mb-1 text-sm font-medium">Rounded Corners</p>
        <p className="mb-2 text-xs text-zinc-500">Extra rounded with shadow</p>
        <Carousel slides={["Rounded", "Corners", "Demo"]} colors={["bg-indigo-400", "bg-violet-400", "bg-purple-400"]} transition="fade" />
      </div>
      <div>
        <p className="mb-1 text-sm font-medium">With Shadow</p>
        <p className="mb-2 text-xs text-zinc-500">Box shadow effect</p>
        <Carousel slides={["Shadow", "Effect", "Demo"]} colors={["bg-rose-400", "bg-pink-400", "bg-fuchsia-400"]} transition="scale" />
      </div>
      <div>
        <p className="mb-1 text-sm font-medium">Dot Style: Square</p>
        <p className="mb-2 text-xs text-zinc-500">Square navigation dots</p>
        <Carousel slides={["Square", "Dots", "Demo"]} colors={["bg-cyan-400", "bg-teal-400", "bg-emerald-400"]} transition="slide" />
      </div>
      <div className="relative overflow-hidden rounded-xl">
        <div className="absolute inset-0 z-10 rounded-xl bg-black/30 pointer-events-none" />
        <p className="mb-1 text-sm font-medium">Dark Overlay</p>
        <p className="mb-2 text-xs text-zinc-500">Darker overlay on slides</p>
        <Carousel slides={["Dark", "Overlay", "Demo"]} colors={["bg-warning", "bg-orange-500", "bg-yellow-500"]} transition="slide" height="h-56" />
      </div>
    </div>
  );
}`,
  });
