import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { carouselData, carouselSource } from "./shared";

export const carouselInteractive: RegistryEntry = entry({
    id: "carousel-interactive",
    title: "Interactive Demo",
    description: "Configurable carousel with live transition and auto-play controls.",
    source: `import { useCallback, useEffect, useState } from "react";

${carouselData}

${carouselSource}

const TRANSITIONS = ["slide", "fade", "scale", "slide-3d"] as const;

export default function CarouselInteractive() {
  const [demoIdx, setDemoIdx] = useState(0);
  const [autoState, setAutoState] = useState(false);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setAutoState((v) => !v)}
          className={\`rounded-lg px-3 py-1.5 text-xs font-medium \${autoState ? "bg-success text-success-foreground" : "border border-zinc-300 dark:border-zinc-700"}\`}
        >
          {autoState ? "Auto-Play On" : "Auto-Play Off"}
        </button>
        {TRANSITIONS.map((t) => (
          <button
            key={t}
            onClick={() => setDemoIdx(TRANSITIONS.indexOf(t))}
            className={\`rounded-lg border px-3 py-1.5 text-xs font-medium \${TRANSITIONS[demoIdx] === t ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "border-zinc-300 dark:border-zinc-700"}\`}
          >
            {t}
          </button>
        ))}
      </div>
      <Carousel slides={LABELS} colors={COLORS} transition={TRANSITIONS[demoIdx]} autoPlay={autoState} />
    </div>
  );
}`,
  });
