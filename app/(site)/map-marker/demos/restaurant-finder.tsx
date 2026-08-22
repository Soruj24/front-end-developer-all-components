"use client";

import { useState } from "react";
import { Utensils, Star } from "lucide-react";

export function RestaurantFinder() {
  const [cuisine, setCuisine] = useState<string | null>(null);
  const restaurants = [
    { id: 1, name: "Spice Garden", cuisine: "indian", rating: 4.5, delivery: "30 min" },
    { id: 2, name: "Pizza Palace", cuisine: "italian", rating: 4.2, delivery: "25 min" },
    { id: 3, name: "Dragon Wok", cuisine: "chinese", rating: 4.7, delivery: "35 min" },
    { id: 4, name: "Taco Fiesta", cuisine: "mexican", rating: 4.0, delivery: "20 min" },
  ];

  const filtered = cuisine ? restaurants.filter((r) => r.cuisine === cuisine) : restaurants;

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 dark:bg-orange-950/30">
          <Utensils className="h-4 w-4 text-orange-500" />
        </div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Restaurant Finder</h3>
      </div>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {["indian", "italian", "chinese", "mexican"].map((c) => (
          <button
            key={c}
            onClick={() => setCuisine(cuisine === c ? null : c)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-all ${
              cuisine === c
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="space-y-1.5">
        {filtered.map((rest) => (
          <div key={rest.id} className="flex items-center gap-3 rounded-lg border border-zinc-200 p-3 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 dark:bg-orange-950/30">
              <Utensils className="h-4 w-4 text-orange-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{rest.name}</p>
              <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                <span className="capitalize">{rest.cuisine}</span>
                <span className="text-zinc-300 dark:text-zinc-600">&middot;</span>
                <span className="flex items-center gap-0.5">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {rest.rating}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{rest.delivery}</p>
              <button className="text-xs font-medium text-zinc-900 transition-colors hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-400">
                Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
