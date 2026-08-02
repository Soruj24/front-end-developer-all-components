import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { carouselData, carouselSource } from "./shared";

export const carouselControlled: RegistryEntry = entry({
    id: "carousel-controlled",
    title: "Controlled via External",
    description: "Prev/next buttons drive an external index counter.",
    source: `import { useCallback, useEffect, useState } from "react";

${carouselData}

${carouselSource}

export default function CarouselControlled() {
  const [external, setExternal] = useState(0);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center gap-2">
        <button onClick={() => setExternal((i) => Math.max(0, i - 1))} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium dark:border-zinc-700">Prev</button>
        <button onClick={() => setExternal((i) => Math.min(5, i + 1))} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium dark:border-zinc-700">Next</button>
        <span className="text-xs text-zinc-500 self-center">External index: {external + 1}/6</span>
      </div>
      <Carousel slides={LABELS} colors={COLORS} showArrows={false} showDots={false} showCounter />
    </div>
  );
}`,
  });
