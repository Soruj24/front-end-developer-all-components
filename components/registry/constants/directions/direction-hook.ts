import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const directionHook: RegistryEntry = entry({
  id: "direction-hook",
  title: "useDirection Hook",
  description: "Using the useDirection hook to read current direction context.",
  source: `"use client";

import { useState } from "react";
import { DirectionProvider, useDirection } from "@/components/_direction";

export default function DirectionHook() {
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr");

  return (
    <DirectionProvider dir={direction}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDirection("ltr")}
            className={\`rounded px-3 py-1 text-sm \${
              direction === "ltr" ? "bg-zinc-900 text-white" : "border"
            }\`}
          >
            LTR
          </button>
          <button
            type="button"
            onClick={() => setDirection("rtl")}
            className={\`rounded px-3 py-1 text-sm \${
              direction === "rtl" ? "bg-zinc-900 text-white" : "border"
            }\`}
          >
            RTL
          </button>
        </div>
        <DirectionHookDemo />
      </div>
    </DirectionProvider>
  );
}

function DirectionHookDemo() {
  const dir = useDirection();
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium">
        useDirection() returns: <span className="text-blue-500">{dir}</span>
      </p>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="rounded border p-2">
          <span className="font-medium">Text align:</span>{" "}
          {dir === "ltr" ? "left" : "right"}
        </div>
        <div className="rounded border p-2">
          <span className="font-medium">Margin start:</span>{" "}
          {dir === "ltr" ? "margin-left" : "margin-right"}
        </div>
      </div>
    </div>
  );
}`,
});
