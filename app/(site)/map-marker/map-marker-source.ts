export const MAP_MARKER_SOURCE = `"use client";

import { useState } from "react";
import { Home, Building2, Star } from "lucide-react";

export function LocationPin() {
  const [selected, setSelected] = useState<string | null>(null);
  const locations = [
    { id: "home", label: "Home", icon: Home, color: "bg-zinc-900 dark:bg-zinc-100" },
    { id: "office", label: "Office", icon: Building2, color: "bg-zinc-700 dark:bg-zinc-300" },
    { id: "gym", label: "Gym", icon: Star, color: "bg-zinc-500 dark:bg-zinc-400" },
  ];

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800">
          <Home className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Location Pin</h3>
      </div>
      <div className="relative h-48 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900">
        {locations.map((loc) => {
          const Icon = loc.icon;
          return (
            <button
              key={loc.id}
              onClick={() => setSelected(loc.id)}
              className={\`absolute z-0 transform -translate-x-1/2 -translate-y-full transition-all \${
                selected === loc.id ? "z-10 scale-125" : "hover:scale-110"
              }\`}
            >
              <div className="flex flex-col items-center">
                <div className={\`\${loc.color} flex h-8 w-8 items-center justify-center rounded-full text-white shadow-lg\`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}`;
