"use client";

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
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />
        {locations.map((loc) => {
          const Icon = loc.icon;
          return (
            <button
              key={loc.id}
              onClick={() => setSelected(loc.id)}
              className={`absolute z-0 transform -translate-x-1/2 -translate-y-full transition-all ${
                selected === loc.id ? "z-10 scale-125" : "hover:scale-110"
              }`}
              style={{
                left: loc.id === "home" ? "30%" : loc.id === "office" ? "60%" : "45%",
                top: loc.id === "home" ? "40%" : loc.id === "office" ? "30%" : "65%",
              }}
            >
              <div className="flex flex-col items-center">
                <div className={`${loc.color} flex h-8 w-8 items-center justify-center rounded-full text-white shadow-lg`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="h-0 w-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-zinc-400 dark:border-t-zinc-600" />
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex gap-1.5">
        {locations.map((loc) => (
          <button
            key={loc.id}
            onClick={() => setSelected(loc.id)}
            className={`flex-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              selected === loc.id
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            }`}
          >
            {loc.label}
          </button>
        ))}
      </div>
    </div>
  );
}
