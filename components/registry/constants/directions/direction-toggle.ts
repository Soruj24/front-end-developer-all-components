import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const directionToggle: RegistryEntry = entry({
  id: "direction-toggle",
  title: "Direction Toggle",
  description: "Toggle between LTR and RTL directions with live preview.",
  source: `"use client";

import { useState } from "react";
import { DirectionProvider, useDirection } from "@/components/_direction";

export default function DirectionToggle() {
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setDirection("ltr")}
          className={\`rounded-md px-4 py-2 text-sm font-medium \${
            direction === "ltr"
              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
              : "border hover:bg-zinc-100 dark:hover:bg-zinc-800"
          }\`}
        >
          LTR (Left to Right)
        </button>
        <button
          type="button"
          onClick={() => setDirection("rtl")}
          className={\`rounded-md px-4 py-2 text-sm font-medium \${
            direction === "rtl"
              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
              : "border hover:bg-zinc-100 dark:hover:bg-zinc-800"
          }\`}
        >
          RTL (Right to Left)
        </button>
      </div>
      <DirectionProvider dir={direction}>
        <div className="rounded-lg border p-4">
          <DirectionDemo />
        </div>
      </DirectionProvider>
    </div>
  );
}

function DirectionDemo() {
  const dir = useDirection();
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium">
        Current direction: <span className="text-blue-500">{dir.toUpperCase()}</span>
      </p>
      <div className="flex items-center gap-2">
        <span className="text-sm">{dir === "ltr" ? "←" : "→"}</span>
        <span className="text-sm">{dir === "ltr" ? "Back" : "Forward"}</span>
        <span className="mx-2">|</span>
        <span className="text-sm">{dir === "ltr" ? "Forward" : "Back"}</span>
        <span className="text-sm">{dir === "ltr" ? "→" : "←"}</span>
      </div>
    </div>
  );
}`,
});
